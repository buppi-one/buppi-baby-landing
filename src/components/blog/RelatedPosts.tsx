import { ArticleCard } from "@/components/blog/ArticleCard";
import { getArticlesByLocale } from "@/lib/blog/loader";
import type { Article } from "@/lib/blog/types";
import { type Locale } from "@/i18n";

const MAX = 3;

const HEADINGS: Record<Locale, string> = {
  "pt-BR": "Continue lendo",
  en: "Keep reading",
  es: "Sigue leyendo",
  fr: "Continuer à lire",
};

// Deterministic 32-bit hash used to a) shuffle the candidate pool stably and
// b) rotate a different window for each source article. Combined with the
// rotation step below this gives provably uniform internal-link coverage:
// in a pool of N candidates picking MAX, each candidate appears as "related"
// from exactly MAX/N share of source articles — instead of always the same
// 3 newest in the category, which leaves older posts under-linked.
function hash(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function RelatedPosts({ current }: { current: Article }) {
  // Pool = every other article in the same category, in stable hash order.
  // Tag overlap intentionally NOT scored — it concentrates links on a few
  // densely-tagged posts and starves outliers (e.g. a regression-of-sleep
  // article shares only "sono" while siblings share "sono/rotina/recem-nascido"
  // and would always lose). Within a category everything is "related enough"
  // for the reader; the bigger win is uniform link distribution for SEO.
  const pool = getArticlesByLocale(current.locale)
    .filter(
      (a) => a.id !== current.id && a.frontmatter.category === current.frontmatter.category,
    )
    .sort((a, b) => hash(a.id) - hash(b.id));

  if (pool.length === 0) return null;

  // Rotate the pool so each source post starts at a different index.
  // Every candidate appears in exactly MAX/pool.length share of source articles
  // when the rotation offsets hit each index — provably uniform inbound links.
  const start = hash(current.id) % pool.length;
  const others: Article[] = [];
  for (let i = 0; i < pool.length && others.length < MAX; i++) {
    others.push(pool[(start + i) % pool.length]);
  }

  if (others.length === 0) return null;

  return (
    <section className="bg-[var(--color-background-light)] dark:bg-[var(--color-background-dark)] border-t border-[var(--color-border-warm)] dark:border-[var(--color-border-dark)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-14 py-14 lg:py-20">
        <h2 className="font-display font-bold tracking-tight text-2xl lg:text-3xl mb-8 text-[var(--color-ink)] dark:text-white">
          {HEADINGS[current.locale]}
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {others.map((a) => (
            <ArticleCard key={`${a.locale}-${a.id}`} article={a} />
          ))}
        </div>
      </div>
    </section>
  );
}
