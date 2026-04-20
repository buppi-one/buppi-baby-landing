import { StoreButtons } from "@/components/StoreButtons";
import { getMessages, type Locale } from "@/i18n";

export function Hero({ locale }: { locale: Locale }) {
  const m = getMessages(locale).hero;
  return (
    <header className="relative overflow-hidden pt-16 pb-24 lg:pt-32 lg:pb-40 bg-gradient-soft">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative z-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary font-bold text-sm mb-6">
            {m.badge}
          </span>
          <h1 className="text-5xl lg:text-7xl font-bold font-display leading-[1.1] mb-8">
            {m.titlePrefix}
            <span className="text-primary">{m.titleHighlight}</span>
            {m.titleSuffix}
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 leading-relaxed max-w-lg">
            {m.description}
          </p>
          <StoreButtons size="lg" locale={locale} />
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-4">
            {m.badgesNote}
          </p>
        </div>
        <div className="relative flex justify-center">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-secondary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="relative w-full max-w-[400px]">
            {}
            <img
              alt={m.imageAlt}
              className="rounded-[3rem] shadow-2xl border-8 border-white dark:border-slate-800 rotate-3 hover:rotate-0 transition-transform duration-500"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBx-cUZY5qpJmQctgi89gkrK-4VKf6H1y99r9xM9nEmcf9M7iZYC6KOcuS5HbOunRvHYlb_e8nEtcH1RECP_51zhp9ePwO57RIZ85_N9r1fuG5Ddla3samMZdivXYbDXbDQ5dmHHypGoevH6AUPWYS0NF2lWXICScaEJceGkC_3fOgj8FwzORyPdnHuMK_suvHh6pQnGFMtVpiH92MDhGXlUxg6h90Zm0umxHlyEMe4gQZ0mGg9n2aAFdOPwVNqdNVLr8OVKOV4hw-H"
            />
            <div className="absolute -bottom-6 -left-6 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 max-w-[200px]">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-icons-round text-accent text-sm">
                  wb_sunny
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {m.card.tag}
                </span>
              </div>
              <p className="font-bold text-slate-800 dark:text-white">
                {m.card.title}
              </p>
              <p className="text-xs text-slate-500">{m.card.subtitle}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
