/**
 * Cloudflare Web Analytics (RUM) puller for the Buppi Baby site.
 *
 * Self-contained: queries the Cloudflare GraphQL Analytics API using the token
 * in `$CLOUDFLARE_TOKEN` (the same token the deploy uses to purge cache; it
 * needs the "Account Analytics · Read" permission on the account below).
 *
 * This complements `scripts/gsc.ts`: Search Console tells you how people ARRIVE
 * (query, position, impressions); Cloudflare tells you what they do ON the site
 * (pageviews, visits, top pages, referrers, countries, devices). The beacon is
 * auto-injected by Cloudflare at the edge — there is nothing to install.
 *
 * Usage (via tsx):
 *   npx tsx scripts/cf-analytics.ts overview [days]    # totals + top pages/referrers/countries/devices
 *   npx tsx scripts/cf-analytics.ts pages [days]       # top pages by views
 *   npx tsx scripts/cf-analytics.ts referrers [days]   # where visits come from
 *   npx tsx scripts/cf-analytics.ts countries [days]   # by country
 *
 * `days` defaults to 7. RUM data is near-real-time (no multi-day lag like GSC).
 */
const TOKEN = process.env.CLOUDFLARE_TOKEN;
const ACCOUNT = '005da981cdc35418581ebba0f3cc3121'; // Búzios Homes (zone buppi.baby lives here)
const HOST = 'buppi.baby';
const ENDPOINT = 'https://api.cloudflare.com/client/v4/graphql';

interface Group {
  count: number;
  sum?: { visits: number };
  dimensions?: Record<string, string>;
}

function iso(daysAgo: number): string {
  return new Date(Date.now() - daysAgo * 86400_000).toISOString();
}

async function gql(query: string): Promise<{ rumPageloadEventsAdaptiveGroups: Group[] }> {
  if (!TOKEN) throw new Error('CLOUDFLARE_TOKEN não definido no ambiente (export no ~/.zshrc).');
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  });
  const json = (await res.json()) as {
    data?: { viewer: { accounts: { rumPageloadEventsAdaptiveGroups: Group[] }[] } };
    errors?: unknown;
  };
  if (json.errors) throw new Error('CF GraphQL: ' + JSON.stringify(json.errors));
  const acct = json.data?.viewer.accounts[0];
  if (!acct) throw new Error('CF GraphQL: conta não encontrada (verifique a permissão Account Analytics: Read).');
  return acct;
}

/** Pull grouped RUM rows for the window, optionally broken down by `dims`. */
async function groups(days: number, dims: string[], limit: number): Promise<Group[]> {
  const dimSel = dims.length ? `dimensions { ${dims.join(' ')} }` : '';
  const q = `query {
    viewer { accounts(filter:{accountTag:"${ACCOUNT}"}) {
      rumPageloadEventsAdaptiveGroups(
        limit:${limit}, orderBy:[count_DESC],
        filter:{datetime_geq:"${iso(days)}", datetime_leq:"${iso(0)}", requestHost:"${HOST}"}
      ) { count sum { visits } ${dimSel} }
    } }
  }`;
  return (await gql(q)).rumPageloadEventsAdaptiveGroups;
}

function line(label: string, g: Group, width = 44): string {
  const l = (label || '(vazio)').slice(0, width).padEnd(width);
  const views = String(g.count).padStart(5);
  const visits = String(g.sum?.visits ?? 0).padStart(5);
  return `  ${l} views ${views} | visits ${visits}`;
}

async function section(title: string, days: number, dim: string, limit: number, empty = '(direto)'): Promise<void> {
  const rows = await groups(days, [dim], limit);
  console.log(`=== ${title} ===`);
  rows.forEach((g) => console.log(line(g.dimensions?.[dim] || empty, g)));
  console.log();
}

async function main() {
  const [cmd = 'overview', arg1] = process.argv.slice(2);
  const days = Number(arg1) || 7;

  if (cmd === 'overview') {
    const [tot] = await groups(days, [], 1);
    if (tot) console.log(`TOTAL (${days}d) — pageviews ${tot.count} · visits ${tot.sum?.visits ?? 0}\n`);
    await section('TOP PÁGINAS', days, 'requestPath', 20, '(vazio)');
    await section('REFERRERS (de onde vêm)', days, 'refererHost', 12);
    await section('POR PAÍS', days, 'countryName', 12, '(desconhecido)');
    await section('DISPOSITIVO', days, 'deviceType', 5, '(desconhecido)');
    return;
  }
  if (cmd === 'pages') return void (await section('TOP PÁGINAS', days, 'requestPath', 40, '(vazio)'));
  if (cmd === 'referrers') return void (await section('REFERRERS', days, 'refererHost', 30));
  if (cmd === 'countries') return void (await section('POR PAÍS', days, 'countryName', 30, '(desconhecido)'));

  console.error(`comando desconhecido: ${cmd}\nuse: overview | pages | referrers | countries [days]`);
  process.exit(1);
}

main().catch((e) => { console.error(e.message); process.exit(1); });

export {};
