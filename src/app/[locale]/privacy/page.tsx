import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PrivacyContent } from "@/components/PrivacyContent";
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
  const m = getMessages(locale).privacy;
  return pageMetadata({
    locale,
    title: `${m.title} — Buppi Baby`,
    description: m.intro,
    path: "/privacy/",
  });
}

export default async function LocalizedPrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!SUPPORTED.includes(locale as RouteLocale)) notFound();
  return <PrivacyContent locale={locale as RouteLocale} />;
}
