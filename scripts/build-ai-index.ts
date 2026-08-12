/**
 * Emits a compact per-locale blog index for the in-app AI assistant.
 *
 * The Buppi chat (Supabase `ai-chat` function) fetches these files to search
 * and recommend posts. Writing them here means the index is ALWAYS a byproduct
 * of the normal build — every publish or correction regenerates it on deploy,
 * with zero separate sync and the MDX files as the single source of truth.
 *
 * Output: public/ai/blog-index.<locale>.json  (shipped as /ai/blog-index.<locale>.json)
 * Runs via `npm run build-ai-index` (wired into prepare-blog).
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { getAllArticles } from "@/lib/blog/loader";
import { LOCALES, type Locale } from "@/i18n";

const SITE_URL = "https://buppi.baby";

// Mirrors src/lib/blog/metadata.ts pathFor (not exported there).
function urlFor(locale: Locale, slug: string): string {
  const path = locale === "pt-BR" ? `/blog/${slug}/` : `/${locale}/blog/${slug}/`;
  return `${SITE_URL}${path}`;
}

interface AiIndexEntry {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  url: string;
  publishedAt: string;
  updatedAt?: string;
  faq: { question: string; answer: string }[];
  references: { title: string; source: string; url?: string }[];
}

function build() {
  const articles = getAllArticles().filter((a) => !a.frontmatter.draft);
  const outDir = join(process.cwd(), "public", "ai");
  mkdirSync(outDir, { recursive: true });

  let total = 0;
  for (const locale of LOCALES as readonly Locale[]) {
    const entries: AiIndexEntry[] = articles
      .filter((a) => a.locale === locale)
      .sort((a, b) => b.frontmatter.publishedAt.localeCompare(a.frontmatter.publishedAt))
      .map((a) => ({
        slug: a.slug,
        title: a.frontmatter.title,
        description: a.frontmatter.description,
        category: a.frontmatter.category,
        tags: a.frontmatter.tags ?? [],
        url: urlFor(locale, a.slug),
        publishedAt: a.frontmatter.publishedAt,
        updatedAt: a.frontmatter.updatedAt,
        faq: a.frontmatter.faq ?? [],
        references: a.frontmatter.references ?? [],
      }));

    const payload = { generatedAt: new Date().toISOString(), locale, count: entries.length, posts: entries };
    writeFileSync(join(outDir, `blog-index.${locale}.json`), JSON.stringify(payload));
    total += entries.length;
    console.log(`[build-ai-index] ${locale}: ${entries.length} posts`);
  }
  console.log(`[build-ai-index] wrote ${LOCALES.length} files, ${total} entries → public/ai/`);
}

build();
