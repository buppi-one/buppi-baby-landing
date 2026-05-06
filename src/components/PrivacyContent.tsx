import { PolicyShell } from "@/components/PolicyShell";
import { getMessages, type Locale } from "@/i18n";

export function PrivacyContent({ locale }: { locale: Locale }) {
  const m = getMessages(locale).privacy;
  return (
    <PolicyShell
      locale={locale}
      badge={m.badge}
      badgeIcon="lock"
      title={m.title}
      updated={m.updated}
      intro={m.intro}
      sections={m.sections}
      contact={m.contact}
    />
  );
}
