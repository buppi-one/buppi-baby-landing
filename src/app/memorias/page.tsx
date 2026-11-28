import type { Metadata } from "next";
import { CampaignLanding } from "@/components/story/Campaign";
import { DEFAULT_LOCALE } from "@/i18n";
import { CAMPAIGN_PATHS, getCampaignMessages } from "@/i18n/campaigns";
import { pageMetadata } from "@/lib/metadata";

const CAMPAIGN = "memories";

export function generateMetadata(): Metadata {
  const copy = getCampaignMessages(DEFAULT_LOCALE).pages[CAMPAIGN];
  return pageMetadata({
    locale: DEFAULT_LOCALE,
    title: copy.metaTitle,
    description: copy.metaDescription,
    path: CAMPAIGN_PATHS[CAMPAIGN],
  });
}

export default function Page() {
  return <CampaignLanding locale={DEFAULT_LOCALE} campaign={CAMPAIGN} />;
}
