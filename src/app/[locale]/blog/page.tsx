import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogIndex } from "@/components/blog/BlogIndex";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
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
  const m = getMessages(locale).blog;
  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: `/${locale}/blog/`,
      languages: {
        "pt-BR": "/blog/",
        en: "/en/blog/",
        es: "/es/blog/",
        fr: "/fr/blog/",
        "x-default": "/blog/",
      },
      types: {
        "application/rss+xml": [
          { url: `/${locale}/blog/feed.xml`, title: m.title },
        ],
      },
    },
  };
}

export default async function LocalizedBlogIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!SUPPORTED.includes(locale as RouteLocale)) notFound();
  return (
    <>
      <Nav locale={locale as RouteLocale} />
      <main>
        <BlogIndex locale={locale as RouteLocale} />
      </main>
      <Footer locale={locale as RouteLocale} />
    </>
  );
}
