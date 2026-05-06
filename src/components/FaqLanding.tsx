import { SectionTag } from "@/components/Features";
import { getMessages, type Locale } from "@/i18n";

export function FaqLanding({ locale }: { locale: Locale }) {
  const m = getMessages(locale).faq;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: m.items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };

  return (
    <section className="py-20 lg:py-28 bg-[var(--color-background-light)] dark:bg-[var(--color-background-dark)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-3xl mx-auto px-6 lg:px-14">
        <div className="text-center mb-12">
          <SectionTag color="var(--color-fg-secondary)" bg="var(--color-background-soft)">
            {m.tag}
          </SectionTag>
          <h2 className="font-display font-bold tracking-tight leading-[1.05] mt-4 text-3xl lg:text-[44px] text-[var(--color-ink)] dark:text-white">
            {m.title}
          </h2>
        </div>
        <div className="flex flex-col gap-3">
          {m.items.map((it, i) => (
            <details
              key={i}
              className="group rounded-2xl bg-white dark:bg-[var(--color-surface-dark)] border border-[var(--color-border-warm)] dark:border-[var(--color-border-dark)] p-5 lg:p-6 [&[open]_.faq-mark]:rotate-45"
            >
              <summary className="cursor-pointer list-none flex items-start justify-between gap-4">
                <span className="text-base font-bold text-[var(--color-ink)] dark:text-white">
                  {it.q}
                </span>
                <span
                  aria-hidden
                  className="faq-mark text-[var(--color-fg-secondary)] text-xl leading-none transition-transform shrink-0"
                >
                  +
                </span>
              </summary>
              <div className="pt-3 text-sm leading-relaxed text-[var(--color-fg-secondary)] dark:text-slate-400">
                {it.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
