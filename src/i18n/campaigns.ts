import type { CampaignKey, CampaignMessages } from "./campaignTypes";
import type { Locale } from "./config";
import { campaignsEn } from "./messages/campaigns/en";
import { campaignsEs } from "./messages/campaigns/es";
import { campaignsFr } from "./messages/campaigns/fr";
import { campaignsPtBR } from "./messages/campaigns/pt-BR";

const MESSAGES: Record<Locale, CampaignMessages> = {
  "pt-BR": campaignsPtBR,
  en: campaignsEn,
  es: campaignsEs,
  fr: campaignsFr,
};

/** The same address in every language, like the rest of the site's static pages. */
export const CAMPAIGN_PATHS: Record<CampaignKey, string> = {
  pregnancy: "/gestacao/",
  sleep: "/sono/",
  memories: "/memorias/",
};

export function getCampaignMessages(locale: Locale): CampaignMessages {
  return MESSAGES[locale];
}
