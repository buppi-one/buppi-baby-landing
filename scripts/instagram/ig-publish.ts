/**
 * Instagram carousel publisher (Graph API content publishing).
 *
 * Publishes a carousel of already-public image URLs with a caption to the
 * @buppi.baby Instagram Business account.
 *
 * The Graph API can ONLY fetch images from public HTTPS URLs — it has no binary
 * image upload for feed posts. So the slides must be hosted somewhere public
 * (Cloudflare R2, the site's /public, etc.) BEFORE calling this.
 *
 * Env (from ~/.zshrc, like CLOUDFLARE_TOKEN — never committed):
 *   IG_BUSINESS_ACCOUNT_ID, IG_ACCESS_TOKEN
 *
 * Usage (caption on stdin, image URLs as args):
 *   npx tsx scripts/instagram/caption.ts sono-bebe-4-meses pt-BR \
 *     | npx tsx scripts/instagram/ig-publish.ts \
 *         https://.../slide-01.png https://.../slide-02.png ...
 *
 * Add --dry-run to build the containers and stop before publishing.
 */
const V = "v21.0";
const BASE = `https://graph.facebook.com/${V}`;

async function post(path: string, body: Record<string, string>): Promise<any> {
  const res = await fetch(`${BASE}/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(body).toString(),
  });
  const json = await res.json();
  if (json.error) throw new Error(`Graph API: ${json.error.message} (code ${json.error.code})`);
  return json;
}

async function get(path: string, params: Record<string, string>): Promise<any> {
  const res = await fetch(`${BASE}/${path}?${new URLSearchParams(params).toString()}`);
  const json = await res.json();
  if (json.error) throw new Error(`Graph API: ${json.error.message} (code ${json.error.code})`);
  return json;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * A carousel container must finish processing before it can be published;
 * publishing too early throws "Media ID is not available (code 9007)". Poll its
 * status_code until FINISHED (throwing on ERROR/EXPIRED).
 */
async function waitForFinished(
  containerId: string,
  token: string,
  log: (m: string) => void,
  tries = 20,
  delayMs = 3000,
): Promise<void> {
  for (let i = 0; i < tries; i++) {
    const r = await get(containerId, { fields: "status_code", access_token: token });
    if (r.status_code === "FINISHED") return;
    if (r.status_code === "ERROR" || r.status_code === "EXPIRED") {
      throw new Error(`Container ${containerId} ficou com status ${r.status_code}.`);
    }
    log(`  … processando (${r.status_code ?? "?"}) [${i + 1}/${tries}]`);
    await sleep(delayMs);
  }
  throw new Error(`Container ${containerId} não ficou pronto a tempo.`);
}

/**
 * Publish a carousel of public image URLs + caption to an IG Business account.
 * Returns { id, permalink } (permalink best-effort). Reusable from other scripts.
 */
export async function publishCarousel(
  igId: string,
  token: string,
  images: string[],
  caption: string,
  opts: { dryRun?: boolean; log?: (m: string) => void } = {},
): Promise<{ id: string; permalink?: string }> {
  const log = opts.log ?? (() => {});
  if (images.length < 2 || images.length > 10) {
    throw new Error(`Um carrossel precisa de 2 a 10 imagens (recebi ${images.length}).`);
  }
  const childIds: string[] = [];
  for (let i = 0; i < images.length; i++) {
    const r = await post(`${igId}/media`, { image_url: images[i], is_carousel_item: "true", access_token: token });
    childIds.push(r.id);
    log(`  ✓ item ${i + 1}/${images.length} (container ${r.id})`);
  }
  const carousel = await post(`${igId}/media`, {
    media_type: "CAROUSEL",
    children: childIds.join(","),
    caption,
    access_token: token,
  });
  log(`  ✓ carrossel montado (container ${carousel.id})`);
  if (opts.dryRun) {
    log(`  --dry-run: parei antes de publicar. Container: ${carousel.id}`);
    return { id: carousel.id };
  }
  log(`  ⏳ aguardando o Instagram processar o carrossel…`);
  await waitForFinished(carousel.id, token, log);
  // Even after FINISHED, publish can briefly race (9007) — retry a few times.
  let published: any;
  for (let attempt = 0; ; attempt++) {
    try {
      published = await post(`${igId}/media_publish`, { creation_id: carousel.id, access_token: token });
      break;
    } catch (e) {
      const msg = (e as Error).message;
      if (attempt < 4 && /9007|not available/i.test(msg)) {
        log(`  … ainda não publicável, tentando de novo [${attempt + 1}/4]`);
        await sleep(4000);
        continue;
      }
      throw e;
    }
  }
  const link = await fetch(`${BASE}/${published.id}?fields=permalink&access_token=${token}`)
    .then((r) => r.json())
    .catch(() => null);
  return { id: published.id, permalink: link?.permalink };
}

function readStdin(): Promise<string> {
  return new Promise((resolve) => {
    let data = "";
    if (process.stdin.isTTY) return resolve("");
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", (c) => (data += c));
    process.stdin.on("end", () => resolve(data));
  });
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const images = args.filter((a) => /^https:\/\//.test(a));
  const igId = process.env.IG_BUSINESS_ACCOUNT_ID;
  const token = process.env.IG_ACCESS_TOKEN;

  if (!igId || !token) {
    console.error("Faltam IG_BUSINESS_ACCOUNT_ID e/ou IG_ACCESS_TOKEN no ambiente (source ~/.zshrc).");
    process.exit(1);
  }
  if (images.length < 2 || images.length > 10) {
    console.error(`Um carrossel precisa de 2 a 10 imagens (recebi ${images.length}). Passe as URLs públicas como argumentos.`);
    process.exit(1);
  }
  const caption = (await readStdin()).trim();
  if (!caption) console.warn("⚠️  Sem legenda (stdin vazio) — vai postar sem texto.");

  console.log(`Publicando carrossel de ${images.length} imagens em @buppi.baby…\n`);
  const r = await publishCarousel(igId, token, images, caption, { dryRun, log: (m) => console.log(m) });
  if (!dryRun) {
    console.log(`\n✅ Publicado! media id: ${r.id}`);
    if (r.permalink) console.log(`🔗 ${r.permalink}`);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((e) => {
    console.error("\n❌ " + e.message);
    process.exit(1);
  });
}
