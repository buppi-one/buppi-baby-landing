import { BIcon, type BIconName } from "@/components/BIcon";
import { getMessages, type Locale } from "@/i18n";

type FeatureBlockMockup = "sleep" | "nursing" | "diaper" | "milestones";

const BLOCK_CONFIG: Array<{
  mockup: FeatureBlockMockup;
  tagColor: string;
}> = [
  { mockup: "sleep", tagColor: "var(--color-evt-sleep)" },
  { mockup: "nursing", tagColor: "var(--color-evt-nursing)" },
  { mockup: "diaper", tagColor: "var(--color-evt-diaper)" },
  { mockup: "milestones", tagColor: "var(--color-evt-milestone)" },
];

const SMALL_CARD_ICONS: Array<{ icon: BIconName; color: string }> = [
  { icon: "bottle", color: "var(--color-evt-bottle)" },
  { icon: "chart-bar", color: "var(--color-accent-peach)" },
  { icon: "bath", color: "var(--color-evt-bath)" },
  { icon: "walk", color: "var(--color-evt-walk)" },
];

export function Features({ locale }: { locale: Locale }) {
  const m = getMessages(locale).features;
  return (
    <section id="funcionalidades" className="py-20 lg:py-28 bg-[var(--color-background-light)] dark:bg-[var(--color-background-dark)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-14">
        <div className="max-w-3xl mb-14">
          <SectionTag color="var(--color-primary-dark)" bg="var(--color-lavender)">
            {m.tag}
          </SectionTag>
          <h2 className="font-display font-bold tracking-tight leading-[1.05] mt-4 text-4xl lg:text-5xl text-[var(--color-ink)] dark:text-white">
            {m.title}
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-5">
          {m.blocks.map((block, i) => {
            const cfg = BLOCK_CONFIG[i];
            return (
              <FeatureBlock
                key={i}
                tag={block.tag}
                tagColor={cfg.tagColor}
                title={block.title}
                desc={block.desc}
                mockup={cfg.mockup}
              />
            );
          })}
        </div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {m.smallCards.map((card, i) => {
            const cfg = SMALL_CARD_ICONS[i];
            return (
              <div
                key={i}
                className="rounded-2xl p-5 bg-white dark:bg-[var(--color-surface-dark)] border border-[var(--color-border-warm)] dark:border-[var(--color-border-dark)]"
              >
                <div
                  className="w-10 h-10 rounded-xl grid place-items-center mb-3"
                  style={{ background: `${cfg.color}55`, color: cfg.color }}
                >
                  <BIcon name={cfg.icon} size={18} />
                </div>
                <div className="text-sm font-bold text-[var(--color-ink)] dark:text-white">
                  {card.title}
                </div>
                <div className="text-xs text-[var(--color-fg-secondary)] dark:text-slate-400 mt-0.5">
                  {card.desc}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function SectionTag({
  color,
  bg,
  children,
}: {
  color: string;
  bg: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-widest"
      style={{ background: bg, color }}
    >
      <span
        aria-hidden
        className="w-1.5 h-1.5 rounded-full"
        style={{ background: color }}
      />
      {children}
    </span>
  );
}

function FeatureBlock({
  tag,
  tagColor,
  title,
  desc,
  mockup,
}: {
  tag: string;
  tagColor: string;
  title: string;
  desc: string;
  mockup: FeatureBlockMockup;
}) {
  const Mockup = MOCKUPS[mockup];
  return (
    <div className="rounded-3xl p-6 lg:p-8 bg-white dark:bg-[var(--color-surface-dark)] border border-[var(--color-border-warm)] dark:border-[var(--color-border-dark)] grid sm:grid-cols-2 gap-6 items-center">
      <div>
        <span
          className="inline-flex px-2.5 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase mb-3"
          style={{ background: `${tagColor}55`, color: "var(--color-ink)" }}
        >
          {tag}
        </span>
        <h3 className="font-display font-bold tracking-tight text-xl lg:text-[22px] text-[var(--color-ink)] dark:text-white leading-tight">
          {title}
        </h3>
        <p className="text-sm text-[var(--color-fg-secondary)] dark:text-slate-400 mt-2 leading-relaxed">
          {desc}
        </p>
      </div>
      <Mockup />
    </div>
  );
}

const MOCKUPS: Record<FeatureBlockMockup, () => React.ReactElement> = {
  sleep: SleepWindowsMockup,
  nursing: NursingMockup,
  diaper: DiaperMockup,
  milestones: MilestonesMockup,
};

function SleepWindowsMockup() {
  const items = [
    { l: "Soneca 1", s: "08:30 – 09:45", d: "feita", hi: false },
    { l: "Soneca 2", s: "12:00 – 14:00", d: "feita", hi: false },
    { l: "Soneca 3", s: "15:15 – 16:00", d: "sugerida", hi: true },
  ];
  return (
    <div className="rounded-2xl p-4 bg-[var(--color-background-soft)] dark:bg-[var(--color-surface-elevated-dark)]">
      {items.map((s, i) => (
        <div
          key={i}
          className={`flex items-center justify-between py-2 ${
            i < 2
              ? "border-b border-[var(--color-border-warm)] dark:border-[var(--color-border-dark)]"
              : ""
          }`}
        >
          <div>
            <div className="text-xs font-bold text-[var(--color-ink)] dark:text-white">
              {s.l}
            </div>
            <div className="font-mono text-[11px] text-[var(--color-fg-secondary)] dark:text-slate-400">
              {s.s}
            </div>
          </div>
          <span
            className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest"
            style={{
              background: s.hi ? "var(--color-lavender)" : "rgba(146,214,207,0.25)",
              color: s.hi
                ? "var(--color-primary-dark)"
                : "var(--color-secondary-dark)",
            }}
          >
            {s.d}
          </span>
        </div>
      ))}
    </div>
  );
}

function NursingMockup() {
  return (
    <div className="rounded-2xl p-4 bg-[var(--color-background-soft)] dark:bg-[var(--color-surface-elevated-dark)]">
      <div className="flex items-baseline justify-between">
        <div className="text-[11px] font-bold tracking-widest text-[var(--color-fg-secondary)]">
          DIREITO · EM CURSO
        </div>
        <div className="font-mono font-bold text-xl text-[var(--color-ink)] dark:text-white">
          08:29
        </div>
      </div>
      <div className="flex gap-1.5 mt-3">
        <div
          className="flex-1 rounded-xl p-2.5"
          style={{ background: "rgba(246,211,139,0.35)" }}
        >
          <div className="text-[10px] font-bold text-[var(--color-ink)]">Esquerdo</div>
          <div className="font-mono font-bold text-sm mt-0.5 text-[var(--color-ink)]">
            07:47
          </div>
        </div>
        <div
          className="flex-1 rounded-xl p-2.5 text-[#1a1525]"
          style={{ background: "var(--color-evt-nursing)" }}
        >
          <div className="text-[10px] font-bold">Direito ●</div>
          <div className="font-mono font-bold text-sm mt-0.5">08:29</div>
        </div>
      </div>
    </div>
  );
}

function DiaperMockup() {
  const items = [
    { c: "var(--color-evt-bottle)", l: "Xixi", n: "4", I: "drop" as const },
    { c: "var(--color-evt-nursing)", l: "Cocô", n: "1", I: "diaper" as const },
    { c: "var(--color-evt-sleep)", l: "Mista", n: "4", I: "plus" as const },
  ];
  return (
    <div className="rounded-2xl p-4 bg-[var(--color-background-soft)] dark:bg-[var(--color-surface-elevated-dark)] grid grid-cols-3 gap-2">
      {items.map((d, i) => (
        <div
          key={i}
          className="rounded-xl p-3 text-center bg-white dark:bg-[var(--color-surface-dark)]"
        >
          <div
            className="w-7 h-7 rounded-lg grid place-items-center mx-auto mb-1.5"
            style={{ background: `${d.c}66`, color: d.c }}
          >
            <BIcon name={d.I} size={14} />
          </div>
          <div className="font-mono font-bold text-lg text-[var(--color-ink)] dark:text-white">
            {d.n}
          </div>
          <div className="text-[10px] font-semibold text-[var(--color-fg-secondary)] dark:text-slate-400">
            {d.l}
          </div>
        </div>
      ))}
    </div>
  );
}

function MilestonesMockup() {
  const items: Array<{ ttl: string; d: string; I: BIconName; c: string }> = [
    { ttl: "Sorriu pra mim", d: "3 meses · 12 dias", I: "smile", c: "var(--color-evt-milestone)" },
    { ttl: "Levantou cabeça", d: "2 meses · 8 dias", I: "sparkle", c: "var(--color-primary)" },
    { ttl: "Primeira gargalhada", d: "4 meses · 1 dia", I: "star", c: "var(--color-accent-peach)" },
  ];
  return (
    <div className="rounded-2xl p-4 bg-[var(--color-background-soft)] dark:bg-[var(--color-surface-elevated-dark)]">
      {items.map((m, i) => (
        <div key={i} className="flex items-center gap-2.5 py-1.5">
          <div
            className="w-7 h-7 rounded-full grid place-items-center"
            style={{ background: `${m.c}55`, color: m.c }}
          >
            <BIcon name={m.I} size={14} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-bold text-[var(--color-ink)] dark:text-white truncate">
              {m.ttl}
            </div>
            <div className="text-[10px] text-[var(--color-fg-secondary)] dark:text-slate-400">
              {m.d}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
