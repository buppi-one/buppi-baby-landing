import { BIcon, type BIconName } from "@/components/BIcon";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { getMessages, localePath, type Locale } from "@/i18n";

export type LegalSection = {
  /** Anchor id; auto-derived from index when not given. */
  id?: string;
  heading: string;
  intro?: string;
  items?: Array<{ bold?: string; text: string }>;
};

const TOC_LABEL: Record<Locale, string> = {
  "pt-BR": "Nesta página",
  en: "On this page",
  es: "En esta página",
  fr: "Sur cette page",
};

const HELP_LABEL: Record<Locale, string> = {
  "pt-BR": "Precisa de ajuda?",
  en: "Need help?",
  es: "¿Necesitas ayuda?",
  fr: "Besoin d'aide ?",
};

const HELP_BODY: Record<Locale, string> = {
  "pt-BR": "Fale com a gente sobre seus direitos ou dados.",
  en: "Talk to us about your rights or data.",
  es: "Habla con nosotros sobre tus derechos o datos.",
  fr: "Parlez-nous de vos droits ou de vos données.",
};

const HOME_LABEL: Record<Locale, string> = {
  "pt-BR": "Início",
  en: "Home",
  es: "Inicio",
  fr: "Accueil",
};

export function PolicyShell({
  locale,
  badge,
  badgeIcon = "lock",
  title,
  updated,
  intro,
  contact,
  sections,
}: {
  locale: Locale;
  badge: string;
  badgeIcon?: BIconName;
  title: string;
  updated?: string;
  intro?: string;
  contact?: { heading: string; text: string; email: string };
  sections: LegalSection[];
}) {
  const allSections: Array<LegalSection & { id: string }> = sections.map(
    (s, i) => ({
      ...s,
      id: s.id ?? `s-${i + 1}`,
    }),
  );
  if (contact) {
    allSections.push({
      id: "contact",
      heading: contact.heading,
      intro: undefined,
      items: undefined,
    });
  }

  return (
    <>
      <Nav locale={locale} />
      <main className="bg-[var(--color-background-light)] dark:bg-[var(--color-background-dark)]">
        {/* Hero */}
        <section className="bg-[var(--color-background-soft)] dark:bg-[var(--color-surface-dark)] border-b border-[var(--color-border-warm)] dark:border-[var(--color-border-dark)]">
          <div className="max-w-5xl mx-auto px-6 lg:px-14 pt-14 pb-12 lg:pt-20 lg:pb-14">
            <nav
              aria-label="breadcrumb"
              className="flex items-center gap-2 text-[13px] text-[var(--color-fg-secondary)] dark:text-slate-400 mb-5"
            >
              <a
                href={localePath(locale, "/")}
                className="hover:text-[var(--color-ink)] dark:hover:text-white transition-colors"
              >
                {HOME_LABEL[locale]}
              </a>
              <BIcon
                name="chev"
                size={11}
                className="text-[var(--color-fg-muted)]"
              />
              <span className="text-[var(--color-fg)] dark:text-white font-semibold">
                {title}
              </span>
            </nav>
            <span
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-widest mb-5"
              style={{
                background: "var(--color-lavender)",
                color: "var(--color-primary-dark)",
              }}
            >
              <BIcon name={badgeIcon} size={13} />
              {badge}
            </span>
            <h1 className="font-display font-bold tracking-tight leading-[1.05] text-3xl lg:text-[52px] text-[var(--color-ink)] dark:text-white">
              {title}
            </h1>
            {updated && (
              <div className="inline-flex items-center gap-2 mt-6 px-3.5 py-1.5 rounded-full bg-white dark:bg-[var(--color-surface-dark)] border border-[var(--color-border-warm)] dark:border-[var(--color-border-dark)] text-[13px] text-[var(--color-fg-secondary)] dark:text-slate-400">
                <BIcon name="bell" size={13} />
                {updated}
              </div>
            )}
            {intro && (
              <p className="mt-7 max-w-3xl text-lg text-[var(--color-fg-secondary)] dark:text-slate-400 leading-relaxed">
                {intro}
              </p>
            )}
          </div>
        </section>

        {/* Body — TOC + content */}
        <div className="max-w-5xl mx-auto px-6 lg:px-14 py-14 lg:py-20 grid lg:grid-cols-[240px_1fr] gap-10 lg:gap-16">
          {/* TOC */}
          <aside className="lg:sticky lg:top-24 lg:self-start lg:max-h-[calc(100vh-7rem)] order-2 lg:order-1">
            <div className="text-[11px] font-bold tracking-widest uppercase text-[var(--color-fg-muted)] mb-4">
              {TOC_LABEL[locale]}
            </div>
            <nav className="flex flex-col gap-0.5 border-l border-[var(--color-border-warm)] dark:border-[var(--color-border-dark)]">
              {allSections.map((s, i) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="px-3.5 py-2 text-[13px] leading-snug text-[var(--color-fg-secondary)] dark:text-slate-400 hover:text-[var(--color-ink)] dark:hover:text-white transition-colors -ml-px border-l-2 border-transparent hover:border-[var(--color-primary)]"
                >
                  <span className="font-mono text-[11px] text-[var(--color-fg-muted)] mr-1.5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {s.heading.replace(/^\d+\.\s*/, "")}
                </a>
              ))}
            </nav>

            {contact && (
              <div className="mt-8 p-4 rounded-2xl bg-white dark:bg-[var(--color-surface-dark)] border border-[var(--color-border-warm)] dark:border-[var(--color-border-dark)]">
                <div className="text-[12px] font-bold text-[var(--color-ink)] dark:text-white mb-1.5">
                  {HELP_LABEL[locale]}
                </div>
                <p className="text-[12px] text-[var(--color-fg-secondary)] dark:text-slate-400 leading-relaxed mb-3">
                  {HELP_BODY[locale]}
                </p>
                <a
                  href={`mailto:${contact.email}`}
                  className="inline-flex items-center gap-1 text-[12px] font-semibold text-[var(--color-primary-dark)] dark:text-[var(--color-primary)] hover:underline"
                >
                  {contact.email}
                  <BIcon name="chev" size={11} />
                </a>
              </div>
            )}
          </aside>

          {/* Content */}
          <div className="order-1 lg:order-2">
            {sections.map((s, i) => (
              <section
                key={i}
                id={s.id ?? `s-${i + 1}`}
                className="mb-14 scroll-mt-24"
              >
                <div className="flex items-baseline gap-3.5 mb-4">
                  <span className="font-mono text-[13px] font-bold tracking-wider text-[var(--color-fg-muted)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="font-display font-bold tracking-tight text-2xl lg:text-[28px] text-[var(--color-ink)] dark:text-white leading-tight m-0">
                    {s.heading.replace(/^\d+\.\s*/, "")}
                  </h2>
                </div>
                <div className="lg:pl-9 text-[var(--color-fg)] dark:text-slate-200 leading-relaxed">
                  {s.intro && (
                    <p className="text-[16px] mb-4 leading-[1.65]">{s.intro}</p>
                  )}
                  {s.items && (
                    <ul className="list-none p-0 my-3 flex flex-col gap-3">
                      {s.items.map((item, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-3 text-[15px] leading-[1.6]"
                        >
                          <span
                            aria-hidden
                            className="w-1.5 h-1.5 rounded-full mt-[10px] shrink-0"
                            style={{ background: "var(--color-primary)" }}
                          />
                          <span>
                            {item.bold && (
                              <strong className="font-semibold text-[var(--color-ink)] dark:text-white">
                                {item.bold}
                              </strong>
                            )}
                            {item.bold ? ` ${item.text}` : item.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>
            ))}

            {contact && (
              <section id="contact" className="scroll-mt-24">
                <div className="flex items-baseline gap-3.5 mb-4">
                  <span className="font-mono text-[13px] font-bold tracking-wider text-[var(--color-fg-muted)]">
                    {String(sections.length + 1).padStart(2, "0")}
                  </span>
                  <h2 className="font-display font-bold tracking-tight text-2xl lg:text-[28px] text-[var(--color-ink)] dark:text-white leading-tight m-0">
                    {contact.heading.replace(/^\d+\.\s*/, "")}
                  </h2>
                </div>
                <p className="lg:pl-9 text-[16px] leading-[1.65] text-[var(--color-fg)] dark:text-slate-200">
                  {contact.text}
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-[var(--color-primary-dark)] dark:text-[var(--color-primary)] font-semibold hover:underline"
                  >
                    {contact.email}
                  </a>
                  .
                </p>
              </section>
            )}
          </div>
        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}
