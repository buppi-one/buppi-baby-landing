import { PolicyShell, type LegalSection } from "@/components/PolicyShell";
import { getMessages, type Locale } from "@/i18n";

export function SupportContent({ locale }: { locale: Locale }) {
  const m = getMessages(locale).support;
  const intro = `${m.intro.before}${m.intro.emailLabel}${m.intro.after}`;
  const sections: LegalSection[] = m.faq.map((item) => ({
    heading: item.q,
    intro: item.a,
  }));
  return (
    <PolicyShell
      locale={locale}
      badge={m.badge}
      badgeIcon="bell"
      title={m.title}
      intro={intro}
      sections={sections}
    />
  );
}
