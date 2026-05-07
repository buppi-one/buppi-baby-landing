import { BIcon } from "@/components/BIcon";
import { CTAS, type CtaDef, type CtaVariant } from "@/lib/blog/ctas";
import { localePath, type Locale } from "@/i18n";

const VARIANT_STYLES: Record<
  CtaVariant,
  { iconBg: string; iconColor: string; accentBar: string }
> = {
  primary: {
    iconBg: "var(--color-lavender)",
    iconColor: "var(--color-primary-dark)",
    accentBar: "var(--color-primary)",
  },
  secondary: {
    iconBg: "rgba(146,214,207,0.18)",
    iconColor: "var(--color-secondary-dark)",
    accentBar: "var(--color-secondary)",
  },
  accent: {
    iconBg: "rgba(255,191,165,0.28)",
    iconColor: "var(--color-secondary-dark)",
    accentBar: "var(--color-accent-peach)",
  },
};

export function Cta({ id, locale }: { id: string; locale: Locale }) {
  const def = (CTAS as Record<string, CtaDef>)[id];
  if (!def) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[blog] <Cta id="${id}"> not found in CTA registry`);
    }
    return null;
  }
  const content = def.content[locale];
  if (!content) return null;
  const styles = VARIANT_STYLES[def.variant];
  const href = def.href ?? `${localePath(locale, "/")}#baixar`;
  if (def.style === "featured") {
    return <CtaFeatured def={def} content={content} styles={styles} href={href} />;
  }
  return <CtaCompact def={def} content={content} styles={styles} href={href} />;
}

function CtaCompact({
  def,
  content,
  styles,
  href,
}: {
  def: CtaDef;
  content: { title: string; body: string; cta: string };
  styles: (typeof VARIANT_STYLES)[CtaVariant];
  href: string;
}) {
  return (
    <aside className="not-prose my-8 rounded-2xl bg-white dark:bg-[var(--color-surface-dark)] border border-[var(--color-border-warm)] dark:border-[var(--color-border-dark)] p-5 lg:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
      <div
        className="w-12 h-12 lg:w-14 lg:h-14 rounded-2xl grid place-items-center shrink-0"
        style={{ background: styles.iconBg, color: styles.iconColor }}
      >
        <BIcon name={def.icon} size={22} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-display font-bold text-base lg:text-[15px] text-[var(--color-ink)] dark:text-white leading-tight">
          {content.title}
        </div>
        <p className="text-[13px] text-[var(--color-fg-secondary)] dark:text-slate-400 mt-1.5 leading-relaxed">
          {content.body}
        </p>
      </div>
      <a
        href={href}
        className="inline-flex shrink-0 items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--color-ink)] text-[var(--color-background-light)] text-sm font-semibold hover:opacity-90 transition-opacity self-stretch sm:self-center justify-center"
      >
        {content.cta}
      </a>
    </aside>
  );
}

function CtaFeatured({
  def,
  content,
  styles,
  href,
}: {
  def: CtaDef;
  content: { title: string; body: string; cta: string };
  styles: (typeof VARIANT_STYLES)[CtaVariant];
  href: string;
}) {
  return (
    <aside
      className="not-prose my-10 relative overflow-hidden rounded-3xl p-7 lg:p-9 text-white"
      style={{ background: "var(--color-ink)" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-10 -right-10 w-52 h-52 rounded-full"
        style={{
          background: `radial-gradient(circle, ${styles.accentBar}66 0%, transparent 70%)`,
        }}
      />
      <div className="relative flex flex-col lg:flex-row items-start lg:items-center gap-5">
        <div
          className="w-14 h-14 rounded-2xl grid place-items-center shrink-0"
          style={{ background: "rgba(255,255,255,0.12)", color: "white" }}
        >
          <BIcon name={def.icon} size={26} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-display font-bold tracking-tight text-2xl lg:text-[26px] leading-tight">
            {content.title}
          </div>
          <p className="text-[14px] lg:text-[15px] opacity-80 mt-2 leading-relaxed max-w-2xl">
            {content.body}
          </p>
        </div>
        <a
          href={href}
          className="inline-flex shrink-0 items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-opacity hover:opacity-90"
          style={{ background: styles.accentBar, color: "var(--color-ink)" }}
        >
          {content.cta}
        </a>
      </div>
    </aside>
  );
}
