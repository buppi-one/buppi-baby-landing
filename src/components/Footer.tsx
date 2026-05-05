import { getMessages, localePath, type Locale } from "@/i18n";

export function Footer({ locale }: { locale: Locale }) {
  const m = getMessages(locale).footer;
  return (
    <footer className="bg-white dark:bg-slate-950 pt-20 pb-10 border-t border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-20">
          <div className="col-span-2">
            <div className="mb-6">
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
            <p className="text-slate-600 dark:text-slate-400 max-w-sm">
              {m.description}
            </p>
          </div>
          <div>
            <h2 className="font-bold mb-6">{m.quickLinks}</h2>
            <ul className="space-y-4 text-slate-600 dark:text-slate-400">
              <li>
                <a
                  className="hover:text-primary transition-colors"
                  href={localePath(locale, "/")}
                >
                  {m.home}
                </a>
              </li>
              <li>
                <a
                  className="hover:text-primary transition-colors"
                  href={localePath(locale, "/privacy")}
                >
                  {m.privacy}
                </a>
              </li>
              <li>
                <a
                  className="hover:text-primary transition-colors"
                  href={localePath(locale, "/terms")}
                >
                  {m.terms}
                </a>
              </li>
              <li>
                <a
                  className="hover:text-primary transition-colors"
                  href={localePath(locale, "/support")}
                >
                  {m.support}
                </a>
              </li>
              <li>
                <a
                  className="hover:text-primary transition-colors"
                  href={localePath(locale, "/delete-account")}
                >
                  {m.deleteAccount}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-10 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            {m.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
