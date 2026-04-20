import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SupportContent } from "@/components/SupportContent";
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
  const m = getMessages(locale).support;
  return {
    title: `${m.title} — Buppi Baby`,
    description: `${m.intro.before}${m.intro.emailLabel}${m.intro.after}`,
  };
}

export default async function LocalizedSupportPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!SUPPORTED.includes(locale as RouteLocale)) notFound();
  return <SupportContent locale={locale as RouteLocale} />;
}
