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
      <h2 className="font-display font-bold tracking-tight text-2xl lg:text-3xl mb-5 text-[var(--color-ink)] dark:text-white">
        {m.faqHeading}
      </h2>
      <div className="flex flex-col gap-2.5">
        {items.map((item, i) => (
          <details
            key={i}
            className="group rounded-2xl bg-white dark:bg-[var(--color-surface-dark)] border border-[var(--color-border-warm)] dark:border-[var(--color-border-dark)] p-5 [&[open]_.faq-mark]:rotate-45"
          >
            <summary className="cursor-pointer list-none flex items-start justify-between gap-4">
              <span className="text-[15px] font-bold text-[var(--color-ink)] dark:text-white">
                {item.question}
              </span>
              <span
                aria-hidden
                className="faq-mark text-[var(--color-fg-secondary)] text-lg leading-none transition-transform shrink-0"
              >
                +
              </span>
            </summary>
            <div className="pt-3 text-[14px] leading-relaxed text-[var(--color-fg-secondary)] dark:text-slate-400">
              {item.answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
