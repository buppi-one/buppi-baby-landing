import Link from "next/link";
import { BIcon } from "@/components/BIcon";
import type { Tool } from "@/lib/tools/registry";
import { getMessages, localePath, type Locale } from "@/i18n";

const SITE_URL = "https://buppi.baby";

export function ToolPage({ locale, tool }: { locale: Locale; tool: Tool }) {
  const m = getMessages(locale).tools;
  const c = tool.content[locale];
  const related = localePath(locale, `/blog/${tool.relatedSlug[locale]}`);
  const url = `${SITE_URL}${localePath(locale, `/ferramentas/${tool.slug[locale]}`)}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: c.title,
    description: c.description,
    url,
    applicationCategory: "HealthApplication",
    operatingSystem: "Web",
    inLanguage: locale,
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    publisher: {
      "@type": "Organization",
      name: "Buppi Baby",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo-full.webp` },
    },
  };

  return (
    <article className="bg-[var(--color-background-light)] dark:bg-[var(--color-background-dark)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-3xl mx-auto px-6 lg:px-14 pt-12 lg:pt-16 pb-16">
        <nav
          aria-label="breadcrumb"
          className="flex items-center gap-2 text-[13px] text-[var(--color-fg-secondary)] dark:text-slate-400 mb-5"
        >
          <Link
            href={localePath(locale, "/ferramentas")}
            className="hover:text-[var(--color-ink)] dark:hover:text-white transition-colors"
          >
            {m.badge}
          </Link>
          <BIcon name="chev" size={11} className="text-[var(--color-fg-muted)]" />
          <span className="text-[var(--color-fg)] dark:text-white">{c.heading}</span>
        </nav>

        <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[var(--color-lavender)] dark:bg-[var(--color-surface-elevated-dark)]">
          <BIcon name={tool.icon} size={22} className="text-[var(--color-primary-dark)] dark:text-[var(--color-primary)]" />
        </span>

        <h1 className="font-display font-bold tracking-tight leading-[1.1] mt-5 mb-4 text-3xl lg:text-[44px] text-[var(--color-ink)] dark:text-white">
          {c.heading}
        </h1>
        <p className="text-[19px] leading-relaxed text-[var(--color-fg-secondary)] dark:text-slate-400">
          {c.intro}
        </p>

        {tool.render(locale)}

        <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-6 border-t border-[var(--color-border-warm)] dark:border-[var(--color-border-dark)]">
          <Link
            href={related}
            className="inline-flex items-center gap-2 text-[15px] font-semibold text-[var(--color-primary-dark)] dark:text-[var(--color-primary)] hover:opacity-80"
          >
            <BIcon name="link" size={15} />
            {m.relatedArticle}
          </Link>
          <Link
            href={localePath(locale, "/ferramentas")}
            className="inline-flex items-center gap-2 text-[14px] text-[var(--color-fg-secondary)] dark:text-slate-400 hover:text-[var(--color-ink)] dark:hover:text-white transition-colors"
          >
            <BIcon name="chev" size={13} className="rotate-90" />
            {m.backToTools}
          </Link>
        </div>
      </div>
    </article>
  );
}
