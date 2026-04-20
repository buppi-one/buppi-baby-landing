import { PolicyShell } from "@/components/PolicyShell";
import { getMessages, type Locale } from "@/i18n";

export function SupportContent({ locale }: { locale: Locale }) {
  const m = getMessages(locale).support;
  return (
    <PolicyShell locale={locale} badge={m.badge} title={m.title}>
      <p>
        {m.intro.before}
        <a href={`mailto:${m.intro.emailLabel}`}>{m.intro.emailLabel}</a>
        {m.intro.after}
      </p>

      <h2>{m.faqHeading}</h2>
      {m.faq.map((item) => (
        <div key={item.q}>
          <p>
            <strong>{item.q}</strong>
          </p>
          <p>{item.a}</p>
        </div>
      ))}
    </PolicyShell>
  );
}
