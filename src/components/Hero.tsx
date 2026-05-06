import { BIcon } from "@/components/BIcon";
import { StoreButtons } from "@/components/StoreButtons";
import { getMessages, type Locale } from "@/i18n";

export function Hero({ locale }: { locale: Locale }) {
  const m = getMessages(locale).hero;
  return (
    <header className="relative overflow-hidden">
      {/* soft glow background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-90 dark:opacity-50"
        style={{
          background:
            "radial-gradient(ellipse 1000px 500px at 75% 20%, var(--color-lavender) 0%, transparent 60%), radial-gradient(ellipse 800px 400px at 20% 80%, rgba(146,214,207,0.18) 0%, transparent 60%)",
        }}
      />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-14 pt-12 pb-16 lg:pt-20 lg:pb-24 grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-center">
        {/* Left */}
        <div>
          <div className="inline-flex items-center gap-2 pl-1 pr-3 py-1 rounded-full bg-white dark:bg-[var(--color-surface-dark)] border border-[var(--color-border-warm)] dark:border-[var(--color-border-dark)] text-sm text-[var(--color-fg-secondary)] mb-7">
            <span
              className="px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wider uppercase"
              style={{
                background: "var(--color-lavender)",
                color: "var(--color-primary-dark)",
              }}
            >
              {m.badge}
            </span>
            <span className="hidden sm:inline">{m.badgeText}</span>
            <BIcon name="chev" size={12} className="text-[var(--color-fg-muted)]" />
          </div>

          <h1
            className="font-display font-bold leading-[1.05] tracking-tight"
            style={{
              fontSize: "clamp(40px, 5.5vw, 64px)",
              color: "var(--color-ink)",
            }}
          >
            <span className="text-[var(--color-fg)] dark:text-white">
              {m.titlePrefix}
            </span>
            <span className="relative inline-block text-[var(--color-primary)]">
              {m.titleHighlight}
              <svg
                viewBox="0 0 200 12"
                aria-hidden
                className="absolute left-0 right-0 -bottom-2 w-full h-3"
              >
                <path
                  d="M2 8 Q 50 2, 100 6 T 198 4"
                  stroke="var(--color-secondary)"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <span className="text-[var(--color-fg)] dark:text-white">
              {m.titleSuffix}
            </span>
          </h1>

          <p className="text-[var(--color-fg-secondary)] dark:text-slate-300 text-lg lg:text-[19px] leading-relaxed max-w-lg mt-7 mb-9">
            {m.description}
          </p>

          <StoreButtons size="lg" locale={locale} />

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-7 text-sm text-[var(--color-fg-secondary)] dark:text-slate-400">
            <span className="inline-flex items-center gap-1.5">
              <BIcon
                name="check"
                size={14}
                className="text-[var(--color-secondary-dark)]"
              />
              {m.bullets[0]}
            </span>
            <span
              aria-hidden
              className="w-1 h-1 rounded-full bg-[var(--color-fg-muted)]"
            />
            <span className="inline-flex items-center gap-1.5">
              <BIcon name="phone" size={14} />
              {m.bullets[1]}
            </span>
            <span
              aria-hidden
              className="w-1 h-1 rounded-full bg-[var(--color-fg-muted)]"
            />
            <span className="inline-flex items-center gap-1.5">
              <BIcon
                name="sparkle"
                size={14}
                className="text-[var(--color-primary)]"
              />
              {m.bullets[2]}
            </span>
          </div>
        </div>

        {/* Right: phone mockup */}
        <div className="relative h-[560px] lg:h-[620px] mt-4 lg:mt-0">
          <LiveActivityCard locale={locale} />
          <AssistCard locale={locale} />
          <PhoneMock locale={locale} />
        </div>
      </div>

      {/* Metric strip */}
      <div className="border-t border-[var(--color-border-warm)] dark:border-[var(--color-border-dark)] bg-white dark:bg-[var(--color-surface-dark)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-14 py-6 grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {m.metrics.map((entry, i) => (
            <div
              key={i}
              className={`flex items-baseline gap-3 ${
                i > 0 ? "lg:pl-6 lg:border-l lg:border-[var(--color-border-warm)] lg:dark:border-[var(--color-border-dark)]" : ""
              }`}
            >
              <div className="font-display font-bold tracking-tight text-2xl lg:text-[26px] text-[var(--color-ink)] dark:text-white">
                {entry.value}
              </div>
              <div className="text-xs text-[var(--color-fg-secondary)] dark:text-slate-400">
                {entry.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}

function LiveActivityCard({ locale: _locale }: { locale: Locale }) {
  return (
    <div className="absolute right-2 lg:right-6 top-2 z-30 w-[230px] rounded-2xl bg-white dark:bg-[var(--color-surface-dark)] border border-[var(--color-border-warm)] dark:border-[var(--color-border-dark)] p-4 shadow-[0_18px_40px_-10px_rgba(66,55,107,0.18)] dark:shadow-[0_18px_40px_-10px_rgba(0,0,0,0.6)]">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{
              background: "var(--color-evt-sleep-night)",
              animation: "la-blink 1.6s ease-in-out infinite",
            }}
          />
          <span className="text-[10px] font-bold tracking-widest text-[var(--color-secondary-dark)]">
            EM CURSO
          </span>
        </div>
        <span className="text-[9px] text-[var(--color-fg-muted)]">Live Activity</span>
      </div>
      <div className="text-xs font-bold text-[var(--color-ink)] dark:text-white">
        Soneca · Lina
      </div>
      <div className="font-mono font-bold tabular-nums tracking-tighter text-[26px] text-[var(--color-ink)] dark:text-white mt-0.5">
        1:24:08
      </div>
      <div className="flex gap-1.5 mt-2.5">
        <button
          type="button"
          className="flex-1 py-1.5 rounded-lg bg-[var(--color-background-soft)] dark:bg-[var(--color-surface-elevated-dark)] text-[var(--color-fg)] dark:text-white text-[11px] font-semibold"
        >
          Pausar
        </button>
        <button
          type="button"
          className="flex-1 py-1.5 rounded-lg text-white text-[11px] font-bold"
          style={{ background: "var(--color-evt-sleep-night)" }}
        >
          Acordou
        </button>
      </div>
    </div>
  );
}

function AssistCard({ locale: _locale }: { locale: Locale }) {
  return (
    <div className="absolute left-0 lg:-left-2 bottom-4 lg:bottom-12 z-30 w-[260px] rounded-2xl bg-white dark:bg-[var(--color-surface-dark)] border border-[var(--color-border-warm)] dark:border-[var(--color-border-dark)] p-4 shadow-[0_18px_40px_-10px_rgba(66,55,107,0.18)] dark:shadow-[0_18px_40px_-10px_rgba(0,0,0,0.6)]">
      <div className="flex items-center gap-2 mb-2">
        <div
          className="w-6 h-6 rounded-full grid place-items-center"
          style={{
            background: "var(--color-lavender)",
            color: "var(--color-primary-dark)",
          }}
        >
          <BIcon name="sparkle" size={12} />
        </div>
        <span className="text-[11px] font-bold tracking-widest text-[var(--color-primary-dark)] dark:text-[var(--color-primary)]">
          BUPPI ASSIST
        </span>
      </div>
      <div className="text-xs leading-relaxed text-[var(--color-fg)] dark:text-slate-200">
        Lina costuma dormir entre <strong>15:30 e 16:00</strong>. Hoje ela acordou cedo — talvez prefira <strong>15:15</strong>.
      </div>
    </div>
  );
}

function PhoneMock({ locale: _locale }: { locale: Locale }) {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 top-8 z-10">
      <div
        className="rounded-[44px] bg-[var(--color-ink)] p-2 shadow-2xl"
        style={{ width: 280 }}
      >
        <div className="rounded-[36px] overflow-hidden bg-[var(--color-background-soft)] dark:bg-[var(--color-surface-dark)]" style={{ aspectRatio: "9/19" }}>
          <PhoneScreen />
        </div>
      </div>
    </div>
  );
}

function PhoneScreen() {
  return (
    <div className="h-full pt-10 px-4 text-[var(--color-ink)] dark:text-white">
      <div className="flex justify-between text-[11px] font-semibold mb-2 px-2">
        <span>9:41</span>
        <span>·····</span>
      </div>

      {/* Profile pill */}
      <div className="flex items-center justify-between px-2 py-1.5 bg-white dark:bg-[var(--color-surface-elevated-dark)] rounded-xl border border-[var(--color-border-warm)] dark:border-[var(--color-border-dark)]">
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 rounded-full grid place-items-center"
            style={{ background: "var(--color-evt-nursing)" }}
          >
            <BIcon name="baby" size={13} className="text-white" />
          </div>
          <div>
            <div className="text-[11px] font-bold leading-none">Lina</div>
            <div className="text-[8px] text-[var(--color-fg-secondary)] dark:text-slate-400 mt-0.5">
              4 meses
            </div>
          </div>
        </div>
        <BIcon name="switch" size={12} className="text-[var(--color-fg-muted)]" />
      </div>

      {/* Active nap */}
      <div
        className="rounded-2xl p-3 mt-3"
        style={{ background: "var(--color-evt-sleep)" }}
      >
        <div className="flex items-center justify-between">
          <div
            className="text-[9px] font-bold tracking-widest"
            style={{ color: "var(--color-evt-sleep-night)" }}
          >
            SONECA EM CURSO
          </div>
          <div
            className="w-5 h-5 rounded-full grid place-items-center text-white"
            style={{ background: "var(--color-evt-sleep-night)" }}
          >
            <BIcon name="pause" size={9} />
          </div>
        </div>
        <div className="font-mono font-bold tabular-nums tracking-tighter text-[24px] text-[#1a3026] mt-1">
          1:24:08
        </div>
        <div className="text-[9px] text-[#3a5a4a] mt-0.5">
          iniciada 14:18 · janela 16:00
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-4 gap-1.5 mt-3">
        {[
          { I: "heart-filled" as const, c: "var(--color-evt-nursing)", l: "Mama" },
          { I: "bottle" as const, c: "var(--color-evt-bottle)", l: "Mamad." },
          { I: "diaper" as const, c: "var(--color-evt-diaper)", l: "Fralda" },
          { I: "bath" as const, c: "var(--color-evt-bath)", l: "Banho" },
        ].map((q, i) => (
          <div
            key={i}
            className="rounded-xl p-2 text-center bg-white dark:bg-[var(--color-surface-elevated-dark)] border border-[var(--color-border-warm)] dark:border-[var(--color-border-dark)]"
          >
            <div
              className="w-7 h-7 rounded-lg mx-auto mb-1 grid place-items-center"
              style={{ background: `${q.c}55`, color: q.c }}
            >
              <BIcon name={q.I} size={13} />
            </div>
            <div className="text-[8px] font-bold">{q.l}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mt-3 p-1 rounded-full bg-white dark:bg-[var(--color-surface-elevated-dark)] border border-[var(--color-border-warm)] dark:border-[var(--color-border-dark)]">
        {["Hoje", "Semana", "Mês"].map((tab, i) => (
          <div
            key={tab}
            className={`flex-1 text-center py-1 rounded-full text-[9px] font-bold ${
              i === 0
                ? "bg-[var(--color-ink)] text-[var(--color-background-light)]"
                : "text-[var(--color-fg-secondary)]"
            }`}
          >
            {tab}
          </div>
        ))}
      </div>

      {/* Recent */}
      <div className="flex flex-col gap-1.5 mt-2">
        {[
          { I: "heart-filled" as const, c: "var(--color-evt-nursing)", ttl: "Amamentação", s: "D 7m · E 8m", tm: "13:16" },
          { I: "diaper" as const, c: "var(--color-evt-diaper)", ttl: "Fralda · xixi", s: "", tm: "13:00" },
        ].map((e, i) => (
          <div
            key={i}
            className="flex items-center gap-2 p-2 rounded-xl bg-white dark:bg-[var(--color-surface-elevated-dark)] border border-[var(--color-border-warm)] dark:border-[var(--color-border-dark)]"
          >
            <div
              className="w-6 h-6 rounded-md grid place-items-center"
              style={{ background: `${e.c}55`, color: e.c }}
            >
              <BIcon name={e.I} size={11} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] font-bold truncate">{e.ttl}</div>
              {e.s && (
                <div className="text-[8px] text-[var(--color-fg-secondary)] dark:text-slate-400">
                  {e.s}
                </div>
              )}
            </div>
            <div className="font-mono text-[8px] text-[var(--color-fg-muted)]">
              {e.tm}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
