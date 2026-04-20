import { getMessages, type Locale } from "@/i18n";

const LEGEND_COLORS = ["bg-[#60A5FA]", "bg-accent", "bg-primary"] as const;

export function Stats({ locale }: { locale: Locale }) {
  const m = getMessages(locale).stats;
  return (
    <section
      className="py-24 bg-background-light dark:bg-background-dark"
      id="estatisticas"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl font-bold font-display mb-6">{m.title}</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            {m.description}
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-700">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                <span className="material-icons-round text-primary">
                  nights_stay
                </span>
              </div>
              <h3 className="text-2xl font-bold">{m.sleep.title}</h3>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="p-6 bg-lavender dark:bg-slate-900 rounded-3xl">
                <p className="text-3xl font-bold mb-1">{m.sleep.avgValue}</p>
                <p className="text-sm text-slate-500">{m.sleep.avgLabel}</p>
              </div>
              <div className="p-6 bg-lavender dark:bg-slate-900 rounded-3xl">
                <p className="text-3xl font-bold mb-1">{m.sleep.totalValue}</p>
                <p className="text-sm text-slate-500">{m.sleep.totalLabel}</p>
              </div>
            </div>
            <div className="space-y-4">
              <p className="font-bold text-slate-500 text-sm uppercase tracking-wider">
                {m.sleep.compareLabel}
              </p>
              <div className="h-8 w-full rounded-full bg-accent/20 overflow-hidden flex">
                <div className="h-full bg-primary" style={{ width: "44%" }} />
                <div className="h-full bg-accent" style={{ width: "56%" }} />
              </div>
              <div className="flex justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <span>{m.sleep.night}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-accent" />
                  <span>{m.sleep.day}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-700">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center">
                <span className="material-icons-round text-secondary">
                  child_care
                </span>
              </div>
              <h3 className="text-2xl font-bold">{m.diaper.title}</h3>
            </div>
            <div className="flex justify-center mb-8">
              <div className="relative w-48 h-48">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    fill="transparent"
                    r="40"
                    stroke="#E2E8F0"
                    strokeWidth="20"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    fill="transparent"
                    r="40"
                    stroke="#60A5FA"
                    strokeDasharray="113 251"
                    strokeWidth="20"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    fill="transparent"
                    r="40"
                    stroke="#FFB84D"
                    strokeDasharray="38 251"
                    strokeDashoffset="-113"
                    strokeWidth="20"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    fill="transparent"
                    r="40"
                    stroke="#8E88E4"
                    strokeDasharray="100 251"
                    strokeDashoffset="-151"
                    strokeWidth="20"
                  />
                </svg>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {m.diaper.legend.map((row, i) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-3 h-3 rounded-full ${LEGEND_COLORS[i]}`}
                    />
                    <span className="font-medium">{row.label}</span>
                  </div>
                  <span className="text-slate-400">{row.pct}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
