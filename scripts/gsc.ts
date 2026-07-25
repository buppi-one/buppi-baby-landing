/**
 * Google Search Console puller for the Buppi Baby blog.
 *
 * Self-contained: signs a service-account JWT with Node's crypto (no extra deps)
 * and queries the Search Console API. The key lives in
 * `credentials/ga4-service-account.json` (gitignored) — the SAME service account
 * used for GA4, granted `siteFullUser` on the `sc-domain:buppi.baby` property.
 *
 * Usage (via tsx):
 *   npx tsx scripts/gsc.ts overview [days]      # totals, top queries/pages/countries
 *   npx tsx scripts/gsc.ts opportunities [days]  # striking-distance queries → NEW article ideas
 *   npx tsx scripts/gsc.ts ctr [days]            # high-impression low-CTR pages → REWRITE title/meta
 *   npx tsx scripts/gsc.ts page <url-substr> [days]  # queries a specific post ranks for
 *
 * `days` defaults to 28. Data lags ~2 days, so the window ends 2 days ago.
 */
import { createSign } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const SITE = 'sc-domain:buppi.baby';
const KEY_PATH = fileURLToPath(new URL('../credentials/ga4-service-account.json', import.meta.url));
const SCOPE = 'https://www.googleapis.com/auth/webmasters.readonly';

interface Row {
  keys?: string[];
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

function b64url(input: Buffer | string): string {
  return Buffer.from(input).toString('base64').replace(/=+$/, '').replace(/\+/g, '-').replace(/\//g, '_');
}

async function getAccessToken(): Promise<string> {
  const sa = JSON.parse(readFileSync(KEY_PATH, 'utf8')) as { client_email: string; private_key: string };
  const now = Math.floor(Date.now() / 1000);
  const header = b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claim = b64url(
    JSON.stringify({ iss: sa.client_email, scope: SCOPE, aud: 'https://oauth2.googleapis.com/token', exp: now + 3600, iat: now }),
  );
  const signature = b64url(createSign('RSA-SHA256').update(`${header}.${claim}`).sign(sa.private_key));
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: `${header}.${claim}.${signature}` }),
  });
  const json = (await res.json()) as { access_token?: string; error_description?: string };
  if (!json.access_token) throw new Error(`GSC auth failed: ${json.error_description ?? JSON.stringify(json)}`);
  return json.access_token;
}

function ymd(daysAgo: number): string {
  const d = new Date(Date.now() - daysAgo * 86400_000);
  return d.toISOString().slice(0, 10);
}

async function query(
  token: string,
  body: Record<string, unknown>,
): Promise<Row[]> {
  const res = await fetch(
    `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE)}/searchAnalytics/query`,
    { method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify(body) },
  );
  const json = (await res.json()) as { rows?: Row[]; error?: { message: string } };
  if (json.error) throw new Error(`GSC query failed: ${json.error.message}`);
  return json.rows ?? [];
}

/** Rough expected CTR by average position — used to flag underperforming titles. */
function expectedCtr(position: number): number {
  if (position <= 1) return 0.28;
  if (position <= 2) return 0.15;
  if (position <= 3) return 0.1;
  if (position <= 5) return 0.06;
  if (position <= 10) return 0.025;
  return 0.01;
}

function fmt(r: Row, keyWidth = 52): string {
  const key = (r.keys?.join(' | ') ?? '').slice(0, keyWidth).padEnd(keyWidth);
  return `${key} clk ${String(r.clicks).padStart(4)} | imp ${String(r.impressions).padStart(6)} | pos ${r.position.toFixed(1).padStart(5)} | ctr ${(r.ctr * 100).toFixed(1)}%`;
}

async function main() {
  const [cmd = 'overview', arg1, arg2] = process.argv.slice(2);
  const days = Number(cmd === 'page' ? arg2 : arg1) || 28;
  const range = { startDate: ymd(days + 2), endDate: ymd(2) };
  const token = await getAccessToken();

  if (cmd === 'overview') {
    const [tot] = await query(token, { ...range, dimensions: [] });
    if (tot) console.log(`TOTAL (${days}d) — clicks ${tot.clicks} · impressions ${tot.impressions} · avg pos ${tot.position.toFixed(1)} · CTR ${(tot.ctr * 100).toFixed(2)}%\n`);
    for (const [title, dims, n] of [['TOP QUERIES', ['query'], 20], ['TOP PAGES', ['page'], 15], ['BY COUNTRY', ['country'], 10]] as const) {
      console.log(`=== ${title} ===`);
      const rows = await query(token, { ...range, dimensions: [...dims], rowLimit: n });
      rows.forEach((r) => console.log('  ' + fmt(r)));
      console.log();
    }
    return;
  }

  if (cmd === 'opportunities') {
    // Queries where we already rank on page 1–2 but not at the top: the cheapest
    // wins. High impressions + position 5–20 → sharpen an existing post or write
    // a dedicated one. Sorted by lost-click potential.
    const rows = await query(token, { ...range, dimensions: ['query'], rowLimit: 500 });
    const scored = rows
      .filter((r) => r.position >= 5 && r.position <= 20 && r.impressions >= 10)
      .map((r) => ({ r, potential: r.impressions * Math.max(0, expectedCtr(Math.max(1, r.position - 4)) - r.ctr) }))
      .sort((a, b) => b.potential - a.potential)
      .slice(0, 30);
    console.log(`=== OPORTUNIDADES (${days}d) — queries pos 5–20, ordenadas por cliques potenciais ===`);
    console.log('(alta impressão + posição mediana = pauta nova ou reforço de post existente)\n');
    scored.forEach(({ r, potential }) => console.log('  ' + fmt(r) + ` | ~+${Math.round(potential)} clk/potencial`));
    return;
  }

  if (cmd === 'ctr') {
    // Pages that GET impressions but UNDER-convert for their position — the title
    // and meta description are the fix, not new content. Sorted by lost clicks.
    const rows = await query(token, { ...range, dimensions: ['page'], rowLimit: 200 });
    const scored = rows
      .filter((r) => r.impressions >= 50)
      .map((r) => ({ r, gap: (expectedCtr(r.position) - r.ctr) * r.impressions }))
      .filter((x) => x.gap > 0)
      .sort((a, b) => b.gap - a.gap)
      .slice(0, 20);
    console.log(`=== TÍTULOS A REVISAR (${days}d) — páginas com CTR abaixo do esperado p/ a posição ===`);
    console.log('(muita impressão, poucos cliques → reescrever title/meta description)\n');
    scored.forEach(({ r, gap }) => console.log('  ' + fmt(r, 60) + ` | ~+${Math.round(gap)} clk se corrigir`));
    return;
  }

  if (cmd === 'page') {
    if (!arg1) { console.error('uso: npx tsx scripts/gsc.ts page <url-substr> [days]'); process.exit(1); }
    const rows = await query(token, {
      ...range,
      dimensions: ['query'],
      rowLimit: 50,
      dimensionFilterGroups: [{ filters: [{ dimension: 'page', operator: 'contains', expression: arg1 }] }],
    });
    console.log(`=== QUERIES para páginas contendo "${arg1}" (${days}d) ===`);
    console.log('(o que as pessoas buscam quando caem nessa página — use pra afinar título e conteúdo)\n');
    rows.forEach((r) => console.log('  ' + fmt(r)));
    return;
  }

  console.error(`comando desconhecido: ${cmd}\nuse: overview | opportunities | ctr | page <url-substr>`);
  process.exit(1);
}

main().catch((e) => { console.error(e.message); process.exit(1); });
