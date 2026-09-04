/**
 * Agent-readiness assertions over the built site (out/). Runs at the end of
 * `npm run build` — fails the build (and the deploy) if any regresses:
 * 404 recovery links, llms.txt, identity JSON-LD, /about depth, md mirrors.
 */
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";

const ROOT = join(dirname(new URL(import.meta.url).pathname), "..");
const OUT = join(ROOT, "out");
const errors: string[] = [];
const read = (p: string) => readFileSync(join(OUT, p), "utf8");
const must = (cond: boolean, msg: string) => { if (!cond) errors.push(msg); };

// 1. 404 page: real recovery links for agents
{
  const html = read("404.html");
  must(html.includes("/sitemap.xml"), "404.html sem link para /sitemap.xml");
  must(html.includes("/llms.txt"), "404.html sem link para /llms.txt");
  must(existsSync(join(OUT, "404.md")), "out/404.md ausente (corpo markdown do 404)");
}

// 2. llms.txt with when-to-use guidance
{
  must(existsSync(join(OUT, "llms.txt")), "llms.txt ausente em out/");
  const txt = read("llms.txt");
  must(txt.startsWith("# Buppi Baby"), "llms.txt não começa com o H1 do formato llmstxt.org");
  must(/^> /m.test(txt), "llms.txt sem blockquote de resumo");
  must(txt.includes("## When to use this site"), "llms.txt sem seção 'When to use'");
}

// 3+4. Homepage JSON-LD: Organization (contactPoint) + SoftwareApplication
{
  const html = read("index.html");
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  must(blocks.length > 0, "homepage sem blocos JSON-LD");
  const nodes = blocks.flatMap((b) => {
    try { const j = JSON.parse(b); return j["@graph"] ?? [j]; } catch { errors.push("JSON-LD inválido na homepage"); return []; }
  });
  const types = nodes.flatMap((n: { "@type"?: string | string[] }) => [n["@type"]].flat());
  must(types.includes("Organization"), "JSON-LD sem Organization");
  must(types.includes("SoftwareApplication"), "JSON-LD sem SoftwareApplication");
  const org = nodes.find((n: Record<string, unknown>) => [n["@type"]].flat().includes("Organization")) as Record<string, unknown> | undefined;
  must(Boolean(org && Array.isArray(org.contactPoint) && (org.contactPoint as Array<Record<string, unknown>>).some((c) => c.email && c.contactType)), "Organization sem contactPoint com email+contactType");
  const app = nodes.find((n: Record<string, unknown>) => [n["@type"]].flat().includes("SoftwareApplication")) as Record<string, unknown> | undefined;
  must(Boolean(app && app.name && app.description && app.url && app.offers), "SoftwareApplication incompleto (name/description/url/offers)");
}

// 5. Trust anchor: /about with real content, all locales
for (const p of ["about", "en/about", "es/about", "fr/about"]) {
  const f = join(OUT, p, "index.html");
  if (!existsSync(f)) { errors.push(`${p}/index.html ausente`); continue; }
  const text = readFileSync(f, "utf8").replace(/<script[\s\S]*?<\/script>/g, "").replace(/<style[\s\S]*?<\/style>/g, "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
  must(text.length >= 500, `${p} com menos de 500 caracteres de conteúdo (${text.length})`);
}

// 6. Markdown mirrors
for (const p of ["index.md", "en/index.md", "blog/quantidade-de-formula-por-idade/index.md", "en/blog/how-much-formula-by-age/index.md", "blog/index.md", "en/blog/index.md", "ferramentas/index.md", "privacy/index.md"]) {
  const f = join(OUT, p);
  if (!existsSync(f)) { errors.push(`md mirror ausente: ${p}`); continue; }
  const md = readFileSync(f, "utf8");
  must(md.startsWith("---\n"), `md mirror sem frontmatter: ${p}`);
  must(/\n---\n\n# /.test(md), `md mirror sem H1 após frontmatter: ${p}`);
}
must(existsSync(join(OUT, "blog", "llms.txt")), "blog/llms.txt seccional ausente");
{
  const robots = readFileSync(join(OUT, "robots.txt"), "utf8");
  must(/User-agent: GPTBot\nAllow: \//.test(robots), "robots.txt sem Allow explícito p/ GPTBot");
  must(robots.includes("Content-Signal:"), "robots.txt sem Content-Signal");
}

if (errors.length) {
  console.error(`\n✗ Agent-readiness falhou (${errors.length}):\n` + errors.map((e) => `  - ${e}`).join("\n"));
  process.exit(1);
}
console.log("✓ Agent-readiness: 404, llms.txt, JSON-LD, /about e md mirrors OK");
