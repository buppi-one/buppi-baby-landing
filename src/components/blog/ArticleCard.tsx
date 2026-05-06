import Link from "next/link";
import { CatPill, CoverPlaceholder } from "@/components/blog/CatPill";
import { formatDate } from "@/lib/blog/format";
import type { Article } from "@/lib/blog/types";
import { getMessages, localePath } from "@/i18n";

export function ArticleCard({
  article,
  size = "md",
}: {
  article: Article;
  size?: "md" | "lg";
}) {
  const m = getMessages(article.locale).blog;
  const cover = article.frontmatter.cover
    ? `/blog/${article.id}/${article.frontmatter.cover.replace(/^\.\//, "")}`
    : null;
  const href = localePath(article.locale, `/blog/${article.slug}`);
  const big = size === "lg";

  return (
    <Link
      href={href}
      className="group flex flex-col rounded-2xl bg-white dark:bg-[var(--color-surface-dark)] border border-[var(--color-border-warm)] dark:border-[var(--color-border-dark)] overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="p-3.5 pb-0">
        {cover ? (
          <div
            className="rounded-xl overflow-hidden bg-[var(--color-background-soft)] dark:bg-[var(--color-surface-elevated-dark)]"
            style={{ height: big ? 240 : 180 }}
          >
            <img
              src={cover}
              alt={article.frontmatter.title}
              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
              loading="lazy"
              decoding="async"
            />
          </div>
        ) : (
          <CoverPlaceholder
            category={article.frontmatter.category}
            height={big ? 240 : 180}
          />
        )}
      </div>
      <div className="p-5 flex flex-col gap-3 flex-1">
        <CatPill
          category={article.frontmatter.category}
          locale={article.locale}
          asLink={false}
          size="sm"
        />
        <h3
          className={`font-display font-bold tracking-tight leading-snug text-[var(--color-ink)] dark:text-white ${
            big ? "text-2xl" : "text-lg"
          } group-hover:text-[var(--color-primary-dark)] dark:group-hover:text-[var(--color-primary)] transition-colors`}
        >
          {article.frontmatter.title}
        </h3>
        <p className="text-[13px] text-[var(--color-fg-secondary)] dark:text-slate-400 leading-relaxed line-clamp-3 flex-1">
          {article.frontmatter.description}
        </p>
        <div className="flex items-center gap-2 text-[11px] text-[var(--color-fg-secondary)] dark:text-slate-400 pt-2 border-t border-[var(--color-border-warm)] dark:border-[var(--color-border-dark)]">
          <time dateTime={article.frontmatter.publishedAt}>
            {formatDate(article.frontmatter.publishedAt, article.locale)}
          </time>
          <span
            aria-hidden
            className="w-1 h-1 rounded-full bg-[var(--color-fg-muted)]"
          />
          <span>{m.readingTime(article.readingTimeMinutes)}</span>
        </div>
      </div>
    </Link>
  );
}
