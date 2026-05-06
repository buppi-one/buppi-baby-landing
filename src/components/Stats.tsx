import { BIcon, type BIconName } from "@/components/BIcon";
import { SectionTag } from "@/components/Features";
import { getMessages, type Locale } from "@/i18n";

const MILESTONE_ICONS: BIconName[] = ["smile", "sparkle", "trophy", "walk", "star"];

export function Stats({ locale }: { locale: Locale }) {
  const m = getMessages(locale).stats;
  return (
    <section
      id="estatisticas"
      className="py-20 lg:py-28 bg-[var(--color-background-light)] dark:bg-[var(--color-background-dark)]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-14">
        <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-8 lg:gap-14 mb-10 lg:mb-14">
          <div>
            <SectionTag color="var(--color-accent-peach)" bg="rgba(255,191,165,0.25)">
              {m.tag}
            </SectionTag>
            <h2 className="font-display font-bold tracking-tight leading-[1.05] mt-4 text-3xl lg:text-5xl text-[var(--color-ink)] dark:text-white max-w-md">
              {m.title}
            </h2>
          </div>
          <div className="inline-flex gap-1 p-1 rounded-full bg-white dark:bg-[var(--color-surface-dark)] border border-[var(--color-border-warm)] dark:border-[var(--color-border-dark)] self-start lg:self-end">
            {m.tabs.map((tab, i) => (
              <div
                key={tab}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold ${
                  i === 1
                    ? "bg-[var(--color-ink)] text-[var(--color-background-light)]"
                    : "text-[var(--color-fg-secondary)] dark:text-slate-400"
                }`}
              >
                {tab}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-[1.4fr_1fr_1fr] gap-5">
          {/* Heatmap card spans 2 rows on desktop */}
          <div className="lg:row-span-2 rounded-3xl p-6 bg-white dark:bg-[var(--color-surface-dark)] border border-[var(--color-border-warm)] dark:border-[var(--color-border-dark)]">
            <div className="flex justify-between mb-1">
              <span className="text-[11px] font-bold tracking-widest uppercase text-[var(--color-fg-secondary)]">
                {m.sleep.mapTitle}
              </span>
              <span className="text-[11px] font-bold text-[var(--color-secondary-dark)]">
                {m.sleep.mapTotal}
              </span>
            </div>
            <SleepHeatmap />
            <div className="flex items-center gap-4 mt-4 text-[11px] text-[var(--color-fg-secondary)] dark:text-slate-400">
              <div className="flex items-center gap-1.5">
                <span
                  className="w-2.5 h-2.5 rounded-sm"
                  style={{ background: "var(--color-evt-sleep-night)" }}
                />
                {m.sleep.legendSleeping}
              </div>
              <div className="flex items-center gap-1.5">
                <span
                  className="w-2.5 h-2.5 rounded-sm"
                  style={{ background: "var(--color-evt-sleep)" }}
                />
                {m.sleep.legendNap}
              </div>
            </div>
          </div>

          {/* Diaper donut */}
          <div className="rounded-3xl p-6 bg-white dark:bg-[var(--color-surface-dark)] border border-[var(--color-border-warm)] dark:border-[var(--color-border-dark)]">
            <div className="text-[11px] font-bold tracking-widest uppercase text-[var(--color-fg-secondary)] mb-3">
              {m.diaper.todayLabel}
            </div>
            <div className="flex items-center gap-4">
              <Donut />
              <div className="flex-1 text-xs">
                {m.diaper.legend.map((row, i) => {
                  const colors = [
                    "var(--color-evt-bottle)",
                    "var(--color-evt-nursing)",
                    "var(--color-evt-sleep)",
                  ];
                  return (
                    <div key={i} className="flex items-center gap-1.5 py-0.5">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ background: colors[i] }}
                      />
                      <span className="flex-1 text-[var(--color-fg-secondary)] dark:text-slate-400">
                        {row.label}
                      </span>
                      <strong className="font-mono text-[var(--color-ink)] dark:text-white">
                        {row.pct}
                      </strong>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Nursing average */}
          <div className="rounded-3xl p-6 bg-white dark:bg-[var(--color-surface-dark)] border border-[var(--color-border-warm)] dark:border-[var(--color-border-dark)]">
            <div className="text-[11px] font-bold tracking-widest uppercase text-[var(--color-fg-secondary)] mb-3">
              {m.nursing.title}
            </div>
            <div className="font-display font-bold tracking-tight text-4xl text-[var(--color-ink)] dark:text-white font-mono">
              {m.nursing.value}
            </div>
            <div className="text-xs text-[var(--color-fg-secondary)] dark:text-slate-400 mt-0.5">
              {m.nursing.desc}
            </div>
            <div className="flex gap-1 mt-3 items-end h-9">
              {[5, 7, 6, 8, 5, 7, 7].map((v, i) => (
                <div
                  key={i}
                  className="flex-1 rounded"
                  style={{
                    height: `${v * 4}px`,
                    background:
                      i === 6 ? "var(--color-evt-nursing)" : "rgba(246,211,139,0.6)",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Milestones — spans 2 cols on desktop */}
          <div className="lg:col-span-2 rounded-3xl p-6 bg-white dark:bg-[var(--color-surface-dark)] border border-[var(--color-border-warm)] dark:border-[var(--color-border-dark)]">
            <div className="text-[11px] font-bold tracking-widest uppercase text-[var(--color-fg-secondary)] mb-4">
              {m.milestones.title}
            </div>
            <div className="relative h-16">
              <div className="absolute left-0 right-0 top-[30px] h-0.5 bg-[var(--color-border-warm)] dark:bg-[var(--color-border-dark)]" />
              {m.milestones.items.map((label, i) => {
                const positions = ["5%", "25%", "52%", "78%", "95%"];
                return (
                  <div
                    key={i}
                    className="absolute top-0 -translate-x-1/2 text-center"
                    style={{ left: positions[i] }}
                  >
                    <div
                      className="w-8 h-8 rounded-full grid place-items-center"
                      style={{
                        background: "var(--color-lavender)",
                        color: "var(--color-primary-dark)",
                      }}
                    >
                      <BIcon name={MILESTONE_ICONS[i]!} size={14} />
                    </div>
                    <div className="text-[9px] font-bold text-[var(--color-ink)] dark:text-white mt-1">
                      {label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SleepHeatmap() {
  const days = ["S", "D", "S", "T", "Q", "Q", "S"];
  return (
    <div className="mt-4">
      <div className="flex gap-1 text-[9px] text-[var(--color-fg-muted)] pl-6 font-mono">
        {[0, 4, 8, 12, 16, 20].map((h) => (
          <div key={h} className="flex-1">
            {h}h
          </div>
        ))}
      </div>
      <div className="mt-1.5 flex flex-col gap-1">
        {days.map((d, di) => (
          <div key={di} className="flex items-center gap-1.5">
            <div className="w-4 text-[10px] font-bold text-[var(--color-fg-secondary)]">
              {d}
            </div>
            <div
              className="flex-1 grid gap-0.5"
              style={{ gridTemplateColumns: "repeat(24, 1fr)", height: 16 }}
            >
              {Array.from({ length: 24 }).map((_, h) => {
                let bg = "var(--color-border-warm)";
                if (h < 7) bg = "var(--color-evt-sleep-night)";
                else if (h >= 22) bg = "var(--color-evt-sleep-night)";
                else if ((h === 10 && di % 3 === 0) || (h === 11 && di % 2 === 0))
                  bg = "var(--color-evt-sleep)";
                else if ((h === 14 || h === 15) && di !== 2)
                  bg = "var(--color-evt-sleep)";
                return (
                  <div key={h} className="rounded-sm" style={{ background: bg }} />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Donut() {
  const r = 30;
  const c = 2 * Math.PI * r;
  const segs = [
    { p: 0.44, c: "var(--color-evt-bottle)" },
    { p: 0.12, c: "var(--color-evt-nursing)" },
    { p: 0.44, c: "var(--color-evt-sleep)" },
  ];
  let off = 0;
  return (
    <svg width="80" height="80" viewBox="-40 -40 80 80" aria-hidden>
      {segs.map((s, i) => {
        const seg = c * s.p;
        const cur = (
          <circle
            key={i}
            r={r}
            fill="none"
            stroke={s.c}
            strokeWidth="14"
            strokeDasharray={`${seg} ${c - seg}`}
            strokeDashoffset={-off}
            transform="rotate(-90)"
          />
        );
        off += seg;
        return cur;
      })}
      <text
        x="0"
        y="6"
        textAnchor="middle"
        fontSize="18"
        fontWeight="700"
        fill="currentColor"
        className="text-[var(--color-ink)] dark:fill-white"
        fontFamily="ui-monospace, monospace"
      >
        9
      </text>
    </svg>
  );
}
