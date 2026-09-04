import { getMessages, localePath, type Locale } from "@/i18n";

export function Footer({ locale }: { locale: Locale }) {
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
          <span>buppi.baby</span>
        </div>
      </div>
    </footer>
  );
}
