import { BIcon } from "@/components/BIcon";
import type { Reference } from "@/lib/blog/types";
import { getMessages, type Locale } from "@/i18n";

export function References({
  items,
  locale,
}: {
  items: Reference[];
  locale: Locale;
}) {
  if (items.length === 0) return null;
  const m = getMessages(locale).blog;
  return (
    <section className="mt-12 rounded-3xl p-7 lg:p-8 bg-[var(--color-background-soft)] dark:bg-[var(--color-surface-elevated-dark)] border border-[var(--color-border-warm)] dark:border-[var(--color-border-dark)]">
      <div className="flex items-center gap-2.5 mb-5">
        <BIcon
          name="sparkle"
          size={16}
          className="text-[var(--color-fg-secondary)]"
        />
        <h2 className="font-display font-bold tracking-tight text-base text-[var(--color-ink)] dark:text-white">
          {m.referencesHeading}
        </h2>
      </div>
      <ol className="list-none p-0 m-0 flex flex-col">
        {items.map((ref, i) => (
          <li
            key={i}
            className={`grid grid-cols-[28px_1fr] gap-3 items-baseline text-[13px] py-2.5 ${
              i < items.length - 1
                ? "border-b border-[var(--color-border-warm)] dark:border-[var(--color-border-dark)]"
                : ""
            }`}
          >
            <span className="font-mono font-bold text-[var(--color-fg-muted)]">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              {ref.url ? (
                <a
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[var(--color-ink)] dark:text-white hover:text-[var(--color-primary-dark)] dark:hover:text-[var(--color-primary)] transition-colors inline-flex items-center gap-1"
                >
                  {ref.title}
                  <BIcon name="chev" size={11} className="opacity-60" />
                </a>
              ) : (
                <span className="font-semibold text-[var(--color-ink)] dark:text-white">
                  {ref.title}
                </span>
              )}
              <div className="text-[var(--color-fg-secondary)] dark:text-slate-400 mt-1 leading-relaxed">
                {ref.source}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
