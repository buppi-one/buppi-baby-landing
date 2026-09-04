import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AboutContent } from "@/components/AboutContent";
import { getMessages, isLocale } from "@/i18n";
import { pageMetadata } from "@/lib/metadata";

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
  const m = getMessages(locale).about;
  return pageMetadata({
    locale,
    title: `${m.title} — Buppi Baby`,
    description: m.intro,
    path: "/about/",
  });
}

export default async function LocalizedAboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!SUPPORTED.includes(locale as RouteLocale)) notFound();
  return <AboutContent locale={locale as RouteLocale} />;
}
