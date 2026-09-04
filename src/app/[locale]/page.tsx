import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Landing } from "@/components/Landing";
import { getMessages, isLocale } from "@/i18n";

const SUPPORTED = ["en", "es", "fr"] as const;
type RouteLocale = (typeof SUPPORTED)[number];

export const dynamicParams = false;

export function generateStaticParams() {
  return SUPPORTED.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const m = getMessages(locale).meta;
  return {
    title: m.title,
    description: m.description,
    openGraph: {
      title: m.ogTitle,
      description: m.ogDescription,
      images: [{ url: "/og-image.png", width: 1200, height: 630 }],
      type: "website",
      locale: locale.replace("-", "_"),
    },
    twitter: {
      card: "summary_large_image",
      title: m.ogTitle,
      description: m.ogDescription,
      images: ["/og-image.png"],
    },
    alternates: {
      canonical: locale === "pt-BR" ? "/" : `/${locale}/`,
      languages: {
        "pt-BR": "/",
        en: "/en/",
        es: "/es/",
        fr: "/fr/",
        "x-default": "/",
      },
      types: {
        "text/markdown": locale === "pt-BR" ? "/index.md" : `/${locale}/index.md`,
      },
    },
  };
}

export default async function LocalizedHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!SUPPORTED.includes(locale as RouteLocale)) notFound();
  return <Landing locale={locale as RouteLocale} />;
}
