import type { FaqItem } from "@/lib/blog/types";
import { getMessages, type Locale } from "@/i18n";

export function Faq({ items, locale }: { items: FaqItem[]; locale: Locale }) {
  if (items.length === 0) return null;
  const m = getMessages(locale).blog;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.question,
      acceptedAnswer: { "@type": "Answer", text: it.answer },
    })),
  };
  return (
    <section className="mt-16 not-prose">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h2 className="text-2xl lg:text-3xl font-bold font-display mb-6">
        {m.faqHeading}
      </h2>
      <div className="divide-y divide-slate-200 dark:divide-slate-700 border-y border-slate-200 dark:border-slate-700">
        {items.map((item, i) => (
          <details key={i} className="group py-4">
            <summary className="cursor-pointer list-none flex items-start justify-between gap-4 text-base font-semibold text-slate-900 dark:text-white">
              <span>{item.question}</span>
              <span
                aria-hidden
                className="shrink-0 text-primary text-xl leading-none transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <div className="pt-3 text-base leading-relaxed text-slate-600 dark:text-slate-300">
              {item.answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
