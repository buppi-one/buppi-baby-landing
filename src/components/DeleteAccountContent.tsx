import { PolicyShell } from "@/components/PolicyShell";
import { getMessages, type Locale } from "@/i18n";

export function DeleteAccountContent({ locale }: { locale: Locale }) {
  const m = getMessages(locale).deleteAccount;
  return (
    <PolicyShell
      locale={locale}
      badge={m.badge}
      title={m.title}
      updated={m.updated}
    >
      <p>{m.intro}</p>

      {m.sections.map((section) => (
        <div key={section.heading}>
          <h2>{section.heading}</h2>
          {section.intro && <p>{section.intro}</p>}
          {section.items && (
            <ul>
              {section.items.map((item, i) => (
                <li key={i}>
                  {item.bold && <strong>{item.bold}</strong>}
                  {item.bold ? ` ${item.text}` : item.text}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}

      <h2>{m.contact.heading}</h2>
      <p>
        {m.contact.text}
        <a href={`mailto:${m.contact.email}`}>{m.contact.email}</a>.
      </p>
    </PolicyShell>
  );
}
