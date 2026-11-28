import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CampaignLanding } from "@/components/story/Campaign";
import { isLocale } from "@/i18n";
import { CAMPAIGN_PATHS, campaignOgImage, getCampaignMessages } from "@/i18n/campaigns";
import { pageMetadata } from "@/lib/metadata";

const CAMPAIGN = "memories";
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
  const copy = getCampaignMessages(locale).pages[CAMPAIGN];
  return pageMetadata({
    locale,
    title: copy.metaTitle,
    description: copy.metaDescription,
    path: CAMPAIGN_PATHS[CAMPAIGN],
    image: campaignOgImage(CAMPAIGN, locale),
  });
}

export default async function LocalizedPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!SUPPORTED.includes(locale as RouteLocale)) notFound();
  return <CampaignLanding locale={locale as RouteLocale} campaign={CAMPAIGN} />;
}
