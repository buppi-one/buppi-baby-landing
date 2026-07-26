import Link from "next/link";
import { BIcon } from "@/components/BIcon";
import { TOOLS } from "@/lib/tools/registry";
import { getMessages, localePath, type Locale } from "@/i18n";

export function ToolsIndex({ locale }: { locale: Locale }) {
  const m = getMessages(locale).tools;

  return (
    <section className="bg-[var(--color-background-light)] dark:bg-[var(--color-background-dark)]">
      <div className="max-w-5xl mx-auto px-6 lg:px-14 pt-14 lg:pt-20 pb-20">
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-[var(--color-surface-dark)] border border-[var(--color-border-warm)] dark:border-[var(--color-border-dark)] text-[12px] font-semibold tracking-wide uppercase text-[var(--color-primary-dark)] dark:text-[var(--color-primary)]">
          <BIcon name="sparkle" size={13} />
          {m.badge}
        </span>
        <h1 className="font-display font-bold tracking-tight leading-[1.1] mt-5 text-3xl lg:text-[46px] text-[var(--color-ink)] dark:text-white">
          {m.title}
        </h1>
        <p className="text-[19px] leading-relaxed text-[var(--color-fg-secondary)] dark:text-slate-400 mt-4 max-w-2xl">
          {m.description}
        </p>

        <div className="grid gap-5 sm:grid-cols-2 mt-10">
          {TOOLS.map((t) => {
            const c = t.content[locale];
            return (
              <Link
                key={t.id}
                href={localePath(locale, `/ferramentas/${t.slug[locale]}`)}
                className="group flex flex-col rounded-3xl bg-white dark:bg-[var(--color-surface-dark)] border border-[var(--color-border-warm)] dark:border-[var(--color-border-dark)] p-6 hover:border-[var(--color-primary)] transition-colors"
              >
                <span className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-[var(--color-lavender)] dark:bg-[var(--color-surface-elevated-dark)]">
                  <BIcon name={t.icon} size={20} className="text-[var(--color-primary-dark)] dark:text-[var(--color-primary)]" />
                </span>
                <h2 className="font-display font-bold text-xl text-[var(--color-ink)] dark:text-white mt-4">
                  {c.title}
                </h2>
                <p className="text-[14px] leading-relaxed text-[var(--color-fg-secondary)] dark:text-slate-400 mt-2 flex-1">
                  {c.description}
                </p>
                <span className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[var(--color-primary-dark)] dark:text-[var(--color-primary)] mt-4">
                  {m.open}
                  <BIcon name="chev" size={14} className="-rotate-90 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
