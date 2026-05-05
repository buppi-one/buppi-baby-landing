import { Icon } from "@/components/Icon";
import { getMessages, type Locale } from "@/i18n";

export function Sharing({ locale }: { locale: Locale }) {
  const m = getMessages(locale).sharing;
  return (
    <section className="py-24 bg-lavender dark:bg-slate-900/50" id="familia">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1">
            <div className="bg-white dark:bg-slate-800 p-8 rounded-[2rem] shadow-2xl space-y-4 max-w-md mx-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">{m.card.title}</h3>
                <button
                  type="button"
                  aria-label={m.card.title}
                  className="w-10 h-10 bg-primary/10 rounded-full text-primary flex items-center justify-center"
                >
                  <Icon name="add" />
                </button>
              </div>
              <div className="p-4 bg-primary/5 dark:bg-primary/10 rounded-2xl border-2 border-primary/20 flex items-center gap-4">
                <div className="w-14 h-14 bg-white dark:bg-slate-700 rounded-full flex items-center justify-center shadow-sm">
                  <Icon name="face" className="text-primary text-3xl" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-lg">{m.card.activeName}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {m.card.activeDob}
                  </p>
                </div>
                <Icon
                  name="check_circle"
                  className="text-primary"
                  title={m.card.sharedTag}
                />
              </div>
              <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 flex items-center gap-4">
                <div className="w-14 h-14 bg-slate-50 dark:bg-slate-700 rounded-full flex items-center justify-center">
                  <Icon name="face" className="text-slate-400 text-3xl" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-lg text-slate-700 dark:text-slate-300">
                    {m.card.sharedName}
                  </p>
                  <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400 text-sm">
                    <Icon name="group" className="text-xs" />
                    <span>{m.card.sharedTag}</span>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-secondary/5 rounded-2xl border border-dashed border-secondary/40 flex items-center gap-4 cursor-pointer hover:bg-secondary/10 transition-colors">
                <div className="w-12 h-12 bg-white dark:bg-slate-700 rounded-full flex items-center justify-center">
                  <Icon name="key" className="text-secondary" />
                </div>
                <div className="flex-1">
                  <p className="font-bold">{m.card.inviteTitle}</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    {m.card.inviteSubtitle}
                  </p>
                </div>
                <Icon
                  name="chevron_right"
                  className="text-slate-500 dark:text-slate-400"
                />
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-4xl lg:text-5xl font-bold font-display mb-8">
              {m.title}
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
              {m.description}
            </p>
            <ul className="space-y-4">
              {m.bullets.map((b) => (
                <li key={b} className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-secondary/20 text-secondary flex items-center justify-center">
                    <Icon name="check" className="text-sm" />
                  </span>
                  <span className="font-medium">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
