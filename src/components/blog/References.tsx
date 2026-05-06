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
    <section className="mt-16">
      <h2 className="text-2xl lg:text-3xl font-bold font-display mb-6">
        {m.referencesHeading}
      </h2>
      <ol className="list-decimal pl-5 space-y-3 text-sm text-slate-600 dark:text-slate-400">
        {items.map((ref, i) => (
          <li key={i} className="leading-relaxed">
            {ref.url ? (
              <a
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-2 hover:no-underline font-medium"
              >
                {ref.title}
              </a>
            ) : (
              <span className="font-medium text-slate-700 dark:text-slate-300">
                {ref.title}
              </span>
            )}
            <span className="text-slate-500 dark:text-slate-500"> — {ref.source}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
