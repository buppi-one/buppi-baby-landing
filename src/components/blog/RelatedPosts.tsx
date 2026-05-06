import { ArticleCard } from "@/components/blog/ArticleCard";
import { getArticlesByLocale } from "@/lib/blog/loader";
import type { Article } from "@/lib/blog/types";
import { getMessages } from "@/i18n";

const MAX = 3;

export function RelatedPosts({ current }: { current: Article }) {
  const m = getMessages(current.locale).blog;
  const others = getArticlesByLocale(current.locale)
    .filter(
      (a) => a.id !== current.id && a.frontmatter.category === current.frontmatter.category,
    )
    .slice(0, MAX);

  if (others.length === 0) return null;

  return (
    <section className="bg-white dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-20">
        <h2 className="text-3xl font-bold font-display mb-10">{m.relatedPosts}</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {others.map((a) => (
            <ArticleCard key={`${a.locale}-${a.id}`} article={a} />
          ))}
        </div>
      </div>
    </section>
  );
}
