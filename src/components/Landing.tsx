import { CTA } from "@/components/CTA";
import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { Sharing } from "@/components/Sharing";
import { Stats } from "@/components/Stats";
import type { Locale } from "@/i18n";

export function Landing({ locale }: { locale: Locale }) {
  return (
    <>
      <Nav locale={locale} />
      <Hero locale={locale} />
      <Features locale={locale} />
      <Sharing locale={locale} />
      <Stats locale={locale} />
      <CTA locale={locale} />
      <Footer locale={locale} />
    </>
  );
}
