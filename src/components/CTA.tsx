import { StoreButtons } from "@/components/StoreButtons";
import { getMessages, type Locale } from "@/i18n";

export function CTA({ locale }: { locale: Locale }) {
  const m = getMessages(locale).cta;
  return (
    <section
      id="baixar"
      className="py-24 overflow-hidden relative scroll-mt-24"
    >
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="bg-primary rounded-[3rem] p-12 lg:p-20 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-10">
            <span className="material-icons-round text-[15rem] rotate-12">
              favorite
            </span>
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold font-display mb-8">
            {m.title}
          </h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto opacity-90">
            {m.description}
          </p>
          <StoreButtons
            size="lg"
            variant="onPrimary"
            locale={locale}
            className="justify-center"
          />
        </div>
      </div>
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl -z-10" />
    </section>
  );
}
