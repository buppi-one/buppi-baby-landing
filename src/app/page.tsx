import type { Metadata } from "next";
import { Landing } from "@/components/Landing";
import { DEFAULT_LOCALE, getMessages } from "@/i18n";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
    languages: {
      "pt-BR": "/",
      en: "/en/",
      es: "/es/",
      fr: "/fr/",
      "x-default": "/",
    },
  },
  openGraph: {
    title: getMessages(DEFAULT_LOCALE).meta.ogTitle,
    description: getMessages(DEFAULT_LOCALE).meta.ogDescription,
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    type: "website",
    locale: "pt_BR",
  },
};

export default function HomePage() {
  return <Landing locale={DEFAULT_LOCALE} />;
}
