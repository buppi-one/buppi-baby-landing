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

export function RelatedPosts({ current }: { current: Article }) {
  const others = getArticlesByLocale(current.locale)
    .filter(
      (a) => a.id !== current.id && a.frontmatter.category === current.frontmatter.category,
    )
    .slice(0, MAX);

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
