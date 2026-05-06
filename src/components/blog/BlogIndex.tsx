import { ArticleCard } from "@/components/blog/ArticleCard";
import { CategoryFilter } from "@/components/blog/CategoryFilter";
import { getArticlesByLocale } from "@/lib/blog/loader";
import type { CategorySlug } from "@/lib/blog/types";
import { getMessages, type Locale } from "@/i18n";

export function BlogIndex({
  locale,
  category = null,
  heading,
}: {
  locale: Locale;
  category?: CategorySlug | null;
  heading?: string;
}) {
  const m = getMessages(locale).blog;
  const all = getArticlesByLocale(locale);
  const available = new Set<CategorySlug>(all.map((a) => a.frontmatter.category));
  const list = category ? all.filter((a) => a.frontmatter.category === category) : all;

  return (
    <section className="bg-background-light dark:bg-background-dark min-h-[60vh]">
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
        <div className="max-w-3xl mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold font-display mb-4">
            {heading ?? m.title}
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            {m.description}
          </p>
        </div>

        <CategoryFilter
          locale={locale}
          active={category}
          availableCategories={available}
        />

        {list.length === 0 ? (
          <p className="text-slate-500 dark:text-slate-400">{m.empty}</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {list.map((article) => (
              <ArticleCard key={`${article.locale}-${article.id}`} article={article} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
