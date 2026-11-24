import { FaqLanding } from "@/components/FaqLanding";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { BlogTeaser } from "@/components/blog/BlogTeaser";
import { SiteJsonLd } from "@/components/SiteJsonLd";
import { StoryClosing, StoryTop } from "@/components/story/Story";
import type { Locale } from "@/i18n";

export function Landing({ locale }: { locale: Locale }) {
  return (
    <>
      <SiteJsonLd locale={locale} />
      <Nav locale={locale} />
      <main>
        <StoryTop locale={locale} />
        <BlogTeaser locale={locale} />
        <FaqLanding locale={locale} />
        <StoryClosing locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  );
}
