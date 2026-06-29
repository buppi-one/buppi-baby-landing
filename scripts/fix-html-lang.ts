import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join, relative, sep } from "node:path";

/* ─────────────────────────────────────────────────────────────
 * Post-build: set the correct <html lang> per locale.
 *
 * The root layout renders <html lang="pt-BR"> for every page (a single
 * shared layout can't know the nested [locale] param in a static export).
 * Here we rewrite the generated HTML in out/ based on the URL prefix:
 *   out/en/...   -> en
 *   out/es/...   -> es
 *   out/fr/...   -> fr
 *   everything else (default locale) -> pt-BR (already correct)
 *
 * Runs AFTER `next build` and BEFORE `pagefind` so Pagefind detects all
 * four languages and builds a proper per-language index. Also fixes the
 * accessibility / correctness bug (screen readers, browser translate).
 * ───────────────────────────────────────────────────────────── */

const OUT = join(process.cwd(), "out");
const PREFIX_LOCALE: Record<string, string> = { en: "en", es: "es", fr: "fr" };

function localeForPath(rel: string): string {
  const first = rel.split(sep)[0];
  return PREFIX_LOCALE[first] ?? "pt-BR";
}

function htmlFiles(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      out.push(...htmlFiles(full));
    } else if (entry.endsWith(".html")) {
      out.push(full);
    }
  }
  return out;
}

function main() {
  let entries: string[];
  try {
    entries = htmlFiles(OUT);
  } catch {
    console.log("✓ html lang: no out/ directory, skipping");
    return;
  }
  let changed = 0;
  for (const file of entries) {
    const locale = localeForPath(relative(OUT, file));
    if (locale === "pt-BR") continue; // root layout already emits pt-BR
    const html = readFileSync(file, "utf8");
    const next = html.replace('<html lang="pt-BR"', `<html lang="${locale}"`);
    if (next !== html) {
      writeFileSync(file, next);
      changed += 1;
    }
  }
  console.log(`✓ html lang: rewrote ${changed} of ${entries.length} pages`);
}

main();
