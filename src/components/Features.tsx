import { getMessages, type Locale } from "@/i18n";

const TIMELINE_STYLES = [
  {
    icon: "nights_stay",
    iconBg: "bg-lavender dark:bg-slate-800",
    iconColor: "text-primary",
    highlight: false,
    muted: false,
  },
  {
    icon: "wb_sunny",
    iconBg: "bg-accent/10",
    iconColor: "text-accent",
    highlight: false,
    muted: true,
  },
  {
    icon: "child_care",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    highlight: true,
    muted: false,
  },
  {
    icon: "bedtime",
    iconBg: "bg-secondary/10",
    iconColor: "text-secondary",
    highlight: false,
    muted: true,
  },
] as const;

const CARD_STYLES = [
  { icon: "bathtub", iconColor: "text-primary", bg: "bg-lavender dark:bg-slate-800" },
  {
    icon: "vaccines",
    iconColor: "text-secondary",
    bg: "bg-secondary/10 dark:bg-slate-800",
  },
  {
    icon: "medication",
    iconColor: "text-accent",
    bg: "bg-accent/10 dark:bg-slate-800",
  },
  {
    icon: "directions_walk",
    iconColor: "text-primary",
    bg: "bg-primary/10 dark:bg-slate-800",
  },
] as const;

export function Features({ locale }: { locale: Locale }) {
  const m = getMessages(locale).features;
  return (
    <section
      className="py-24 bg-white dark:bg-background-dark"
      id="funcionalidades"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl font-bold font-display mb-6">{m.title}</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            {m.description}
          </p>
        </div>
        <div className="grid lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-2 space-y-6 timeline-line relative pl-16">
            {m.timeline.map((entry, i) => {
              const style = TIMELINE_STYLES[i];
              return (
                <div key={i} className="relative group">
                  <div
                    className={`absolute -left-[53px] top-6 w-12 h-12 rounded-full ${style.iconBg} flex items-center justify-center border-4 border-white dark:border-background-dark z-10`}
                  >
                    <span className={`material-icons-round ${style.iconColor}`}>
                      {style.icon}
                    </span>
                  </div>
                  <div
                    className={
                      style.highlight
                        ? "bg-white dark:bg-slate-800 p-6 rounded-3xl border-l-8 border-primary shadow-xl ring-1 ring-slate-100 dark:ring-slate-700"
                        : "bg-background-light dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 hover:shadow-lg transition-shadow"
                    }
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="text-lg font-bold">{entry.title}</h4>
                        <p className="text-slate-500">{entry.subtitle}</p>
                      </div>
                      <div className="text-right">
                        <p
                          className={
                            style.muted
                              ? "font-medium text-slate-400"
                              : "font-medium text-slate-800 dark:text-white"
                          }
                        >
                          {entry.time}
                        </p>
                        <span
                          className={
                            style.muted
                              ? "text-slate-400 text-sm"
                              : "text-secondary text-sm font-medium"
                          }
                        >
                          {entry.tag}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="grid grid-cols-2 gap-4">
            {m.cards.map((card, i) => {
              const style = CARD_STYLES[i];
              return (
                <div key={i} className={`p-6 ${style.bg} rounded-3xl text-center`}>
                  <div className="w-12 h-12 bg-white dark:bg-slate-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <span className={`material-icons-round ${style.iconColor}`}>
                      {style.icon}
                    </span>
                  </div>
                  <h5 className="font-bold">{card.title}</h5>
                  <p className="text-xs text-slate-500 mt-1">{card.subtitle}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
