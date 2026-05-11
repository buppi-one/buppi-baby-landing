#!/usr/bin/env tsx
/**
 * Audits every URL in `references:` frontmatter across all blog articles.
 *
 * For each unique URL:
 *  - HEAD/GET with a browser UA, follows redirects
 *  - Compares final URL to original (flags if redirected to homepage or other
 *    different path — common soft-404 pattern)
 *  - Pulls <title> and checks for "404", "not found", "página não encontrada",
 *    "no encontrado", "introuvable", "não localizado" etc.
 *  - Reports content length (very small body = suspicious error page)
 */
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const ROOT = new URL("../content/blog/", import.meta.url);
const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";
const TIMEOUT_MS = 25_000;
const CONCURRENCY = 6;

type Source = { article: string; locale: string };
type Verdict =
  | { status: "ok"; httpStatus: number; finalUrl: string; title: string }
  | { status: "redirect_homepage"; httpStatus: number; finalUrl: string; title: string }
  | { status: "soft_404"; httpStatus: number; finalUrl: string; title: string; reason: string }
  | { status: "broken"; httpStatus: number | null; finalUrl: string | null; error?: string };

const SOFT_404_PATTERNS = [
  /\b404\b/i,
  /not found/i,
  /page not found/i,
  /página não (encontrada|localizada)/i,
  /no encontrado/i,
  /no encontrada/i,
  /página no existe/i,
  /introuvable/i,
  /page non trouvée/i,
  /erro 404/i,
  /error 404/i,
  /this page (doesn't exist|isn't available|cannot be found)/i,
  /sorry, we can(?:'|')t find/i,
  /pagina non trovata/i,
];

const HOMEPAGE_PATHS = ["/", "", "/home", "/index", "/index.html"];

async function* walkArticles(): AsyncGenerator<{ article: string; locale: string; path: string }> {
  const articleDirs = await readdir(ROOT, { withFileTypes: true });
  for (const dir of articleDirs) {
    if (!dir.isDirectory()) continue;
    const articleDir = new URL(`${dir.name}/`, ROOT);
    const files = await readdir(articleDir);
    for (const f of files) {
      if (!f.endsWith(".mdx")) continue;
      const locale = f.replace(".mdx", "");
      yield { article: dir.name, locale, path: new URL(f, articleDir).pathname };
    }
  }
}

function extractRefs(mdx: string): Array<{ title?: string; source?: string; url: string }> {
  const fmMatch = mdx.match(/^---\n([\s\S]*?)\n---/);
  if (!fmMatch) return [];
  const fm = fmMatch[1];
  const refsMatch = fm.match(/(?:^|\n)references:\n([\s\S]*?)(?=\n[a-zA-Z_]+:|$)/);
  if (!refsMatch) return [];
  const block = refsMatch[1];
  const items = block.split(/\n(?=  - )/);
  const out: Array<{ title?: string; source?: string; url: string }> = [];
  for (const item of items) {
    const url = item.match(/url:\s*"?([^"\n]+)"?/)?.[1]?.trim();
    if (!url) continue;
    const title = item.match(/title:\s*"([^"]+)"/)?.[1];
    const source = item.match(/source:\s*"([^"]+)"/)?.[1];
    out.push({ title, source, url });
  }
  return out;
}

async function fetchWithTimeout(url: string): Promise<Response | null> {
  const ctrl = new AbortController();
  const id = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      redirect: "follow",
      signal: ctrl.signal,
      headers: {
        "User-Agent": UA,
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9,pt;q=0.8,es;q=0.7,fr;q=0.6",
      },
    });
    return res;
  } catch {
    return null;
  } finally {
    clearTimeout(id);
  }
}

function looksLikeHomepageRedirect(originalUrl: string, finalUrl: string): boolean {
  try {
    const orig = new URL(originalUrl);
    const fin = new URL(finalUrl);
    if (orig.origin !== fin.origin) return false;
    if (orig.pathname.replace(/\/$/, "") === fin.pathname.replace(/\/$/, "")) return false;
    const finPath = fin.pathname.replace(/\/$/, "") || "/";
    return HOMEPAGE_PATHS.includes(finPath);
  } catch {
    return false;
  }
}

async function check(url: string): Promise<Verdict> {
  const res = await fetchWithTimeout(url);
  if (!res) {
    return { status: "broken", httpStatus: null, finalUrl: null, error: "timeout/network" };
  }
  const finalUrl = res.url;
  const httpStatus = res.status;
  if (httpStatus >= 400) {
    return { status: "broken", httpStatus, finalUrl };
  }
  const buf = await res.arrayBuffer().catch(() => null);
  const body = buf ? new TextDecoder("utf-8", { fatal: false }).decode(buf) : "";
  const titleMatch = body.match(/<title[^>]*>([^<]+)<\/title>/i);
  const title = titleMatch?.[1]?.trim().replace(/\s+/g, " ") ?? "(no title)";

  if (looksLikeHomepageRedirect(url, finalUrl)) {
    return {
      status: "redirect_homepage",
      httpStatus,
      finalUrl,
      title,
    };
  }

  for (const pat of SOFT_404_PATTERNS) {
    if (pat.test(title)) {
      return { status: "soft_404", httpStatus, finalUrl, title, reason: `title matches /${pat.source}/i` };
    }
  }
  const bodyText = body.length > 50_000 ? body.slice(0, 50_000) : body;
  if (body.length < 1500) {
    return {
      status: "soft_404",
      httpStatus,
      finalUrl,
      title,
      reason: `body too small (${body.length} bytes)`,
    };
  }
  // Body-pattern soft-404 check: only fire if body is short AND the pattern matches.
  // Big pages often have "404" or "not found" anywhere in nav/JS, which is noise.
  if (body.length < 8000) {
    for (const pat of SOFT_404_PATTERNS) {
      if (pat.test(bodyText)) {
        const isWeakMatch =
          pat.source.includes("404") &&
          /href="[^"]*\/404"/.test(bodyText);
        if (isWeakMatch) continue;
        return {
          status: "soft_404",
          httpStatus,
          finalUrl,
          title,
          reason: `body matches /${pat.source}/i (body ${body.length}b)`,
        };
      }
    }
  }
  return { status: "ok", httpStatus, finalUrl, title };
}

async function main(): Promise<void> {
  const urls = new Map<string, Source[]>();
  for await (const file of walkArticles()) {
    const mdx = await readFile(file.path, "utf8");
    for (const ref of extractRefs(mdx)) {
      const list = urls.get(ref.url) ?? [];
      list.push({ article: file.article, locale: file.locale });
      urls.set(ref.url, list);
    }
  }

  console.log(`Discovered ${urls.size} unique URLs across ${[...urls.values()].reduce((n, l) => n + l.length, 0)} references in ${(await readdir(ROOT)).length} articles.\n`);

  const entries = [...urls.entries()];
  const results = new Map<string, Verdict>();
  let i = 0;
  async function worker() {
    while (i < entries.length) {
      const idx = i++;
      const [url] = entries[idx];
      process.stdout.write(`  [${idx + 1}/${entries.length}] ${url}\n`);
      results.set(url, await check(url));
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));

  console.log("\n\n========== AUDIT REPORT ==========\n");

  const bad: Array<[string, Verdict]> = [];
  const suspect: Array<[string, Verdict]> = [];
  const okList: Array<[string, Verdict]> = [];

  for (const [url, v] of results) {
    if (v.status === "broken" || v.status === "soft_404") bad.push([url, v]);
    else if (v.status === "redirect_homepage") suspect.push([url, v]);
    else okList.push([url, v]);
  }

  if (bad.length) {
    console.log(`❌ BROKEN / SOFT 404 (${bad.length})\n`);
    for (const [url, v] of bad) {
      console.log(`URL: ${url}`);
      if (v.status === "broken") {
        console.log(`  ${v.error ? `error: ${v.error}` : `http ${v.httpStatus}`}`);
        if (v.finalUrl && v.finalUrl !== url) console.log(`  finalUrl: ${v.finalUrl}`);
      } else if (v.status === "soft_404") {
        console.log(`  reason: ${v.reason}`);
        console.log(`  title: ${v.title}`);
        if (v.finalUrl !== url) console.log(`  finalUrl: ${v.finalUrl}`);
      }
      console.log(`  used in:`);
      for (const src of urls.get(url) ?? []) {
        console.log(`    - ${src.article} (${src.locale})`);
      }
      console.log();
    }
  }

  if (suspect.length) {
    console.log(`⚠️  REDIRECTED TO HOMEPAGE (${suspect.length})\n`);
    for (const [url, v] of suspect) {
      if (v.status !== "redirect_homepage") continue;
      console.log(`URL: ${url}`);
      console.log(`  → ${v.finalUrl}`);
      console.log(`  title: ${v.title}`);
      console.log(`  used in:`);
      for (const src of urls.get(url) ?? []) {
        console.log(`    - ${src.article} (${src.locale})`);
      }
      console.log();
    }
  }

  console.log(`\n✅ OK: ${okList.length} URLs\n`);
  console.log(`Summary: ${okList.length} ok · ${suspect.length} suspect · ${bad.length} broken`);

  if (bad.length > 0) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(2);
});
