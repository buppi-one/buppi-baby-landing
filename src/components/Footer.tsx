import {
  getMessages,
  LOCALES,
  LOCALE_LABELS,
  localePath,
  type Locale,
} from "@/i18n";

/**
 * `alternates` maps each locale to the equivalent path of the current page.
 * When a page does not pass it, the links fall back to `path` (default: home)
 * in every locale. These are plain anchors in the static HTML so crawlers can
 * follow them — the header language menu only renders its links after a click.
 */
export function Footer({
  locale,
  path = "/",
  alternates,
}: {
  locale: Locale;
  path?: string;
  alternates?: Partial<Record<Locale, string>>;
}) {
  const languageLinks = LOCALES.filter(
    (l) => !alternates || alternates[l] !== undefined,
  ).map((l) => ({
    locale: l,
    href: alternates?.[l] ?? localePath(l, path),
  }));
  const m = getMessages(locale).footer;
  const blogTitle = getMessages(locale).blog.title;

  return (
    <footer className="bg-[var(--color-background-light)] dark:bg-[var(--color-background-dark)] border-t border-[var(--color-border-warm)] dark:border-[var(--color-border-dark)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-14 pt-14 pb-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr] gap-10 lg:gap-12 mb-12">
          <div>
            <div className="mb-4">
              <picture>
                <source
                  type="image/webp"
                  srcSet="/logo-full.webp 1x, /logo-full-2x.webp 2x"
                />
                <img
                  src="/logo-full-fallback.png"
                  alt="Buppi Baby"
                  width={140}
                  height={73}
                  loading="lazy"
                  className="h-8 w-auto"
                />
              </picture>
            </div>
            <p className="text-sm text-[var(--color-fg-secondary)] dark:text-slate-400 leading-relaxed max-w-xs">
              {m.description}
            </p>
          </div>
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-[var(--color-ink)] dark:text-white mb-4">
              {m.quickLinks}
            </h2>
            <ul className="flex flex-col gap-2 text-sm text-[var(--color-fg-secondary)] dark:text-slate-400">
              <li>
                <a
                  className="hover:text-[var(--color-primary-dark)] dark:hover:text-[var(--color-primary)] transition-colors"
                  href={localePath(locale, "/")}
                >
                  {m.home}
                </a>
              </li>
              <li>
                <a
                  className="hover:text-[var(--color-primary-dark)] dark:hover:text-[var(--color-primary)] transition-colors"
                  href={localePath(locale, "/blog")}
                >
                  {blogTitle}
                </a>
              </li>
              <li>
                <a
                  className="hover:text-[var(--color-primary-dark)] dark:hover:text-[var(--color-primary)] transition-colors"
                  href={localePath(locale, "/support")}
                >
                  {m.support}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-[var(--color-ink)] dark:text-white mb-4">
              Legal
            </h2>
            <ul className="flex flex-col gap-2 text-sm text-[var(--color-fg-secondary)] dark:text-slate-400">
              <li>
                <a
                  className="hover:text-[var(--color-primary-dark)] dark:hover:text-[var(--color-primary)] transition-colors"
                  href={localePath(locale, "/about")}
                >
                  {m.about}
                </a>
              </li>
              <li>
                <a
                  className="hover:text-[var(--color-primary-dark)] dark:hover:text-[var(--color-primary)] transition-colors"
                  href={localePath(locale, "/privacy")}
                >
                  {m.privacy}
                </a>
              </li>
              <li>
                <a
                  className="hover:text-[var(--color-primary-dark)] dark:hover:text-[var(--color-primary)] transition-colors"
                  href={localePath(locale, "/terms")}
                >
                  {m.terms}
                </a>
              </li>
              <li>
                <a
                  className="hover:text-[var(--color-primary-dark)] dark:hover:text-[var(--color-primary)] transition-colors"
                  href={localePath(locale, "/delete-account")}
                >
                  {m.deleteAccount}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-6 border-t border-[var(--color-border-warm)] dark:border-[var(--color-border-dark)] flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-[var(--color-fg-secondary)] dark:text-slate-400">
          <span>{m.copyright}</span>
          <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            {languageLinks.map(({ locale: l, href }) => (
              <li key={l}>
                <a
                  href={href}
                  hrefLang={l}
                  lang={l}
                  aria-current={l === locale ? "true" : undefined}
                  className={`inline-block py-2 hover:text-[var(--color-primary-dark)] dark:hover:text-[var(--color-primary)] transition-colors ${
                    l === locale ? "font-semibold text-[var(--color-ink)] dark:text-white" : ""
                  }`}
                >
                  {LOCALE_LABELS[l]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
