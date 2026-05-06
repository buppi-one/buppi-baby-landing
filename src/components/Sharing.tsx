import { BIcon, type BIconName } from "@/components/BIcon";
import { SectionTag } from "@/components/Features";
import { getMessages, type Locale } from "@/i18n";

const BULLET_ICONS: BIconName[] = ["users", "cloud", "heart", "lock"];

const FEED_ICONS: Array<{ icon: BIconName; color: string }> = [
  { icon: "moon", color: "var(--color-evt-sleep)" },
  { icon: "heart-filled", color: "var(--color-evt-nursing)" },
  { icon: "diaper", color: "var(--color-evt-diaper)" },
  { icon: "bath", color: "var(--color-evt-bath)" },
];

const FEED_REACTIONS: Array<Array<{ icon: BIconName; color: string; n: number }>> = [
  [
    { icon: "heart-filled", color: "var(--color-accent-peach)", n: 2 },
    { icon: "thumb-up", color: "var(--color-secondary-dark)", n: 1 },
  ],
  [
    { icon: "heart-filled", color: "var(--color-accent-peach)", n: 3 },
    { icon: "sparkle", color: "var(--color-primary)", n: 1 },
  ],
  [{ icon: "thumb-up", color: "var(--color-secondary-dark)", n: 2 }],
  [
    { icon: "heart-filled", color: "var(--color-accent-peach)", n: 4 },
    { icon: "star", color: "var(--color-evt-milestone)", n: 1 },
  ],
];

const QUICK_REACTIONS: Array<{ icon: BIconName; color: string }> = [
  { icon: "heart-filled", color: "var(--color-accent-peach)" },
  { icon: "thumb-up", color: "var(--color-secondary-dark)" },
  { icon: "sparkle", color: "var(--color-primary)" },
  { icon: "star", color: "var(--color-evt-milestone)" },
  { icon: "smile", color: "var(--color-evt-nursing)" },
];

export function Sharing({ locale }: { locale: Locale }) {
  const m = getMessages(locale).sharing;
  return (
    <section
      id="familia"
      className="py-20 lg:py-28 bg-white dark:bg-[var(--color-surface-dark)] border-y border-[var(--color-border-warm)] dark:border-[var(--color-border-dark)]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-14 grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20 items-center">
        <div>
          <SectionTag color="var(--color-secondary-dark)" bg="rgba(146,214,207,0.18)">
            {m.tag}
          </SectionTag>
          <h2 className="font-display font-bold tracking-tight leading-[1.05] mt-4 text-3xl lg:text-5xl text-[var(--color-ink)] dark:text-white">
            {m.title}
          </h2>
          <p className="mt-5 mb-8 max-w-md text-[var(--color-fg-secondary)] dark:text-slate-400 leading-relaxed">
            {m.description}
          </p>
          <div className="flex flex-col gap-3.5">
            {m.bullets.map((b, i) => (
              <div
                key={i}
                className="flex items-center gap-3 text-[15px] text-[var(--color-fg)] dark:text-white"
              >
                <div
                  className="w-7 h-7 rounded-lg grid place-items-center text-[var(--color-secondary-dark)]"
                  style={{ background: "rgba(146,214,207,0.18)" }}
                >
                  <BIcon name={BULLET_ICONS[i] ?? "check"} size={14} />
                </div>
                {b}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl p-6 bg-[var(--color-background-soft)] dark:bg-[var(--color-surface-elevated-dark)] border border-[var(--color-border-warm)] dark:border-[var(--color-border-dark)]">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-bold text-[var(--color-ink)] dark:text-white">
              {m.feedTitle}
            </div>
            <div className="text-[11px] font-bold text-[var(--color-secondary-dark)] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-secondary-dark)]" />
              {m.online.replace("{n}", "4")}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            {m.feedItems.map((item, i) => (
              <FeedItem
                key={i}
                who={item.who}
                role={item.role}
                action={item.action}
                detail={item.detail}
                iconConfig={FEED_ICONS[i]!}
                reactions={FEED_REACTIONS[i]!}
              />
            ))}
          </div>
          <div className="flex items-center gap-2 mt-4 px-3.5 py-2.5 bg-white dark:bg-[var(--color-surface-dark)] rounded-xl border border-[var(--color-border-warm)] dark:border-[var(--color-border-dark)]">
            <span className="text-[11px] font-semibold text-[var(--color-fg-secondary)] dark:text-slate-400">
              {m.reactQuick}
            </span>
            <div className="flex-1" />
            {QUICK_REACTIONS.map((r, i) => (
              <button
                key={i}
                type="button"
                className="w-8 h-8 rounded-full grid place-items-center transition-transform hover:scale-110"
                style={{ background: `${r.color}22`, color: r.color }}
                aria-label="reaction"
              >
                <BIcon name={r.icon} size={14} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FeedItem({
  who,
  role,
  action,
  detail,
  iconConfig,
  reactions,
}: {
  who: string;
  role: string;
  action: string;
  detail: string;
  iconConfig: { icon: BIconName; color: string };
  reactions: Array<{ icon: BIconName; color: string; n: number }>;
}) {
  return (
    <div className="rounded-2xl p-3.5 bg-white dark:bg-[var(--color-surface-dark)] border border-[var(--color-border-warm)] dark:border-[var(--color-border-dark)]">
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-full grid place-items-center"
          style={{ background: `${iconConfig.color}55`, color: iconConfig.color }}
        >
          <BIcon name={iconConfig.icon} size={16} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[13px] text-[var(--color-fg)] dark:text-white">
            <strong>{who}</strong>{" "}
            <span className="text-[var(--color-fg-secondary)] dark:text-slate-400 font-medium">
              {action}
            </span>
          </div>
          <div className="text-[11px] text-[var(--color-fg-secondary)] dark:text-slate-400 mt-0.5">
            {role} · {detail}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-1.5 mt-2.5 pl-12">
        {reactions.map((r, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[var(--color-fg)] dark:text-white"
            style={{
              background: `${r.color}1f`,
              border: `1px solid ${r.color}55`,
            }}
          >
            <span style={{ color: r.color }}>
              <BIcon name={r.icon} size={11} />
            </span>
            <span className="font-mono text-[11px] font-bold">{r.n}</span>
          </span>
        ))}
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-dashed border-[var(--color-border-warm)] dark:border-[var(--color-border-dark)] text-[var(--color-fg-secondary)] dark:text-slate-400">
          <BIcon name="plus" size={10} />
          <span className="text-[10px] font-semibold">reagir</span>
        </span>
      </div>
    </div>
  );
}
