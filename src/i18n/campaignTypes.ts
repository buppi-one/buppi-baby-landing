import type { TitleSub } from "./storyTypes";

/** The campaign landing pages: one subject up front, the rest of the app in short at the end. */
export const CAMPAIGN_KEYS = ["pregnancy", "sleep", "memories"] as const;
export type CampaignKey = (typeof CAMPAIGN_KEYS)[number];

/** What the "also in the app" grid can list; a campaign hides the ones it already covers. */
export const MORE_KEYS = ["pregnancy", "logging", "sleep", "food", "health", "family", "book", "guides"] as const;
export type MoreKey = (typeof MORE_KEYS)[number];

export type CampaignCopy = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  titleBefore: string;
  titleHighlight: string;
  titleAfter: string;
  lead: string;
  imageAlt: string;
  toasts: [TitleSub, TitleSub];
  closing: { eyebrow: string; title: string; lead: string };
};

export type CampaignMessages = {
  more: {
    eyebrow: string;
    title: string;
    lead: string;
    cta: string;
    items: Record<MoreKey, TitleSub>;
  };
  privacy: { eyebrow: string; title: string; items: [TitleSub, TitleSub, TitleSub] };
  pages: Record<CampaignKey, CampaignCopy>;
};
