import { PolicyShell } from "@/components/PolicyShell";
import { getMessages, type Locale } from "@/i18n";

export function TermsContent({ locale }: { locale: Locale }) {
  const m = getMessages(locale).terms;
  return (
    <PolicyShell
      locale={locale}
      badge={m.badge}
      badgeIcon="trophy"
      title={m.title}
      updated={m.updated}
      intro={m.intro}
      sections={m.sections}
      contact={m.contact}
    />
  );
}
