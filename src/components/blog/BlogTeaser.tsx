import { ArticleCard } from "@/components/blog/ArticleCard";
import { BIcon } from "@/components/BIcon";
import { getArticlesByLocale } from "@/lib/blog/loader";
import { getMessages, localePath, type Locale } from "@/i18n";

/* Home section: the 6 most recent blog articles for the current locale.
 * Server component — reads MDX at build time and renders static HTML. */
export function BlogTeaser({ locale }: { locale: Locale }) {
  const m = getMessages(locale).blogTeaser;
  const articles = getArticlesByLocale(locale).slice(0, 6);
  if (articles.length === 0) return null;

  return (
    <section className="bg-[var(--color-background-light)] dark:bg-[var(--color-background-dark)] border-t border-[var(--color-border-warm)] dark:border-[var(--color-border-dark)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-14 py-20 lg:py-28">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-10">
          <div>
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-widest mb-5"
              style={{
                background: "var(--color-lavender)",
                color: "var(--color-primary-dark)",
              }}
            >
              <BIcon name="sparkle" size={13} />
              {m.tag}
            </div>
            <h2 className="font-display font-bold tracking-tight leading-[1.1] text-3xl lg:text-[42px] text-[var(--color-ink)] dark:text-white">
              {m.title}
            </h2>
            <p className="mt-4 text-[15px] lg:text-base text-[var(--color-fg-secondary)] dark:text-slate-400 max-w-2xl leading-relaxed">
              {m.description}
            </p>
          </div>
          <a
            href={localePath(locale, "/blog")}
            className="inline-flex items-center self-start sm:self-auto shrink-0 gap-2 px-5 py-3 rounded-xl text-[14px] font-semibold text-[var(--color-ink)] dark:text-white bg-white dark:bg-[var(--color-surface-dark)] border border-[var(--color-border-warm)] dark:border-[var(--color-border-dark)] hover:bg-[var(--color-surface-elevated)] dark:hover:bg-[var(--color-surface-elevated-dark)] transition-colors"
          >
            {m.viewAll}
            <BIcon name="chev" size={12} />
          </a>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {articles.map((article) => (
            <ArticleCard
              key={`${article.locale}-${article.id}`}
              article={article}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
