import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CreatorsLanding } from "@/components/creators/Creators";
import { isLocale } from "@/i18n";
import { CREATORS_PATH, getCreatorsMessages } from "@/i18n/creators";
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
  const m = getCreatorsMessages(locale);
  return pageMetadata({
    locale,
    title: m.metaTitle,
    description: m.metaDescription,
    path: CREATORS_PATH,
  });
}

export default async function LocalizedCreatorsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!SUPPORTED.includes(locale as RouteLocale)) notFound();
  return <CreatorsLanding locale={locale as RouteLocale} />;
}
