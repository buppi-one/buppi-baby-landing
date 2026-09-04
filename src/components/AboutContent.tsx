import { PolicyShell } from "@/components/PolicyShell";
import { getMessages, type Locale } from "@/i18n";

export function AboutContent({ locale }: { locale: Locale }) {
  const m = getMessages(locale).about;
  return (
    <PolicyShell
      locale={locale}
      badge={m.badge}
      badgeIcon="heart"
      title={m.title}
      updated={m.updated}
      intro={m.intro}
      sections={m.sections}
      contact={m.contact}
    />
  );
}
