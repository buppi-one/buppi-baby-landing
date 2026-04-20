import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import type { Locale } from "@/i18n";

export function PolicyShell({
  locale,
  badge,
  title,
  updated,
  children,
}: {
  locale: Locale;
  badge: string;
  title: string;
  updated?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav locale={locale} />
      <header className="bg-gradient-soft pt-20 pb-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-sm mb-6">
            {badge}
          </span>
          <h1 className="text-4xl lg:text-5xl font-bold font-display mb-4">
            {title}
          </h1>
          {updated && (
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {updated}
            </p>
          )}
        </div>
      </header>
      <main className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          <article className="bg-white dark:bg-slate-800 rounded-[2rem] shadow-xl border border-slate-100 dark:border-slate-700 p-8 lg:p-12 space-y-6 leading-relaxed text-slate-700 dark:text-slate-300 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:font-display [&_h2]:text-slate-900 [&_h2]:dark:text-white [&_h2]:mt-8 [&_h2]:mb-3 [&_h2:first-child]:mt-0 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_strong]:text-slate-900 [&_strong]:dark:text-white [&_a]:text-primary [&_a]:font-semibold hover:[&_a]:underline">
            {children}
          </article>
        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}
