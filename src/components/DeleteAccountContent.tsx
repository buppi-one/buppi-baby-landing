import { PolicyShell } from "@/components/PolicyShell";
import { getMessages, type Locale } from "@/i18n";

export function DeleteAccountContent({ locale }: { locale: Locale }) {
  const m = getMessages(locale).deleteAccount;
  return (
    <PolicyShell
      locale={locale}
      badge={m.badge}
      badgeIcon="diaper"
      title={m.title}
      updated={m.updated}
      intro={m.intro}
      sections={m.sections}
      contact={m.contact}
    />
  );
}
