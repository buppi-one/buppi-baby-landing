import { CTA } from "@/components/CTA";
import { FaqLanding } from "@/components/FaqLanding";
import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { Sharing } from "@/components/Sharing";
import { Stats } from "@/components/Stats";
import { BlogTeaser } from "@/components/blog/BlogTeaser";
import { SiteJsonLd } from "@/components/SiteJsonLd";
import type { Locale } from "@/i18n";

export function Landing({ locale }: { locale: Locale }) {
  return (
    <>
      <SiteJsonLd locale={locale} />
      <Nav locale={locale} />
      <main>
        <Hero locale={locale} />
        <Features locale={locale} />
        <Sharing locale={locale} />
        <Stats locale={locale} />
        <BlogTeaser locale={locale} />
        <FaqLanding locale={locale} />
        <CTA locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  );
}
