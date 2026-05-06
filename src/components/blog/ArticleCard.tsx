import Link from "next/link";
import { CATEGORIES } from "@/lib/blog/categories";
import { formatDate } from "@/lib/blog/format";
import type { Article } from "@/lib/blog/types";
import { getMessages, localePath } from "@/i18n";

const FALLBACK_GRADIENTS = [
  "from-primary/40 to-secondary/40",
  "from-secondary/40 to-accent/40",
  "from-accent/40 to-primary/40",
  "from-primary/40 to-accent/40",
] as const;

function gradientFor(id: string): string {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  return FALLBACK_GRADIENTS[hash % FALLBACK_GRADIENTS.length];
}

export function ArticleCard({ article }: { article: Article }) {
  const m = getMessages(article.locale);
  const cat = CATEGORIES[article.frontmatter.category];
  const cover = article.frontmatter.cover
    ? `/blog/${article.id}/${article.frontmatter.cover.replace(/^\.\//, "")}`
    : null;
  const href = localePath(article.locale, `/blog/${article.slug}`);

  return (
    <Link
      href={href}
      className="group block rounded-3xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 overflow-hidden shadow-sm hover:shadow-xl transition-shadow"
    >
      <div className="aspect-video overflow-hidden bg-slate-100 dark:bg-slate-900">
        {cover ? (
          <img
            src={cover}
            alt={article.frontmatter.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div
            aria-hidden
            className={`w-full h-full bg-gradient-to-br ${gradientFor(article.id)}`}
          />
        )}
      </div>
      <div className="p-6">
        <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-wider mb-3">
          {cat.label[article.locale]}
        </span>
        <h3 className="text-xl font-bold leading-snug mb-2 group-hover:text-primary transition-colors">
          {article.frontmatter.title}
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-4">
          {article.frontmatter.description}
        </p>
        <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
          <time dateTime={article.frontmatter.publishedAt}>
            {formatDate(article.frontmatter.publishedAt, article.locale)}
          </time>
          <span aria-hidden>·</span>
          <span>{m.blog.readingTime(article.readingTimeMinutes)}</span>
        </div>
      </div>
    </Link>
  );
}
