import { StoreButtons } from "@/components/StoreButtons";
import { getMessages, type Locale } from "@/i18n";

export function CTA({ locale }: { locale: Locale }) {
  const m = getMessages(locale).cta;
  return (
    <section
      id="baixar"
      className="py-20 lg:py-24 px-6 lg:px-14 bg-[var(--color-background-light)] dark:bg-[var(--color-background-dark)] scroll-mt-24"
    >
      <div className="max-w-5xl mx-auto rounded-[28px] p-10 lg:p-16 grid lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-14 items-center relative overflow-hidden bg-[var(--color-ink)] text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-10 -right-10 w-60 h-60 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(172,146,238,0.45) 0%, transparent 70%)",
          }}
        />
        <div className="relative">
          <span className="inline-flex px-3 py-1 rounded-full bg-white/10 text-xs font-bold tracking-widest uppercase mb-5">
            {m.tag}
          </span>
          <h2 className="font-display font-bold tracking-tight leading-[1.05] text-3xl lg:text-5xl">
            {m.title}
          </h2>
          <p className="mt-4 mb-7 max-w-md text-white/70 leading-relaxed">
            {m.description}
          </p>
          <StoreButtons size="lg" variant="onPrimary" locale={locale} />
        </div>

        <div className="relative h-56 lg:h-72 grid place-items-center">
          <div
            className="rounded-3xl p-6 text-white relative z-10 min-w-[240px] shadow-[0_30px_60px_rgba(0,0,0,0.3)]"
            style={{ background: "var(--color-primary)" }}
          >
            <div className="text-[11px] font-bold tracking-widest opacity-90">
              {m.cardTag}
            </div>
            <div className="font-display font-bold text-2xl mt-2 tracking-tight">
              {m.cardTitle}
            </div>
            <div
              className="text-sm mt-3 opacity-90"
              style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}
            >
              {m.cardSub}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
