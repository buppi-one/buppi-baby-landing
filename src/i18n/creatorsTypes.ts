import type { TitleSub } from "./storyTypes";

/** What the application form sends; the function that receives it reads the same names. */
export const CREATOR_LINK_FIELDS = ["instagram", "tiktok", "youtube", "other"] as const;
export type CreatorLinkField = (typeof CREATOR_LINK_FIELDS)[number];

export type CreatorPhoto = { caption: string; alt: string };

export type CreatorsMessages = {
  metaTitle: string;
  metaDescription: string;
  /** Label of the link in the site footer. */
  footerLink: string;
  hero: {
    eyebrow: string;
    titleBefore: string;
    titleHighlight: string;
    titleAfter: string;
    lead: string;
    apply: string;
    how: string;
    imageAlt: string;
    /** Buppi's speech bubble under the buttons; the middle part is emphasised. */
    noteBefore: string;
    noteStrong: string;
    noteAfter: string;
    /** Floating chip over the hero scene. */
    chipTitle: string;
    chipSub: string;
    polaroidAlt: string;
    polaroidCaption: string;
    /** Handwritten line beside the hero polaroid. */
    handNote: string;
  };
  who: {
    eyebrow: string;
    title: string;
    /** One taped photo per item, in the same order. */
    photos: [CreatorPhoto, CreatorPhoto, CreatorPhoto];
    items: [TitleSub, TitleSub, TitleSub];
  };
  why: {
    eyebrow: string;
    title: string;
    /** Words inside the three illustrations, in the same order as the items. */
    visuals: { free: string; forever: string; timeline: [string, string, string, string]; unlimited: string };
    items: [TitleSub, TitleSub, TitleSub];
  };
  steps: { eyebrow: string; title: string; items: [TitleSub, TitleSub, TitleSub] };
  form: {
    eyebrow: string;
    title: string;
    lead: string;
    photoAlt: string;
    photoCaption: string;
    name: string;
    email: string;
    phone: string;
    optional: string;
    linksLegend: string;
    linksHint: string;
    links: Record<CreatorLinkField, { label: string; placeholder: string }>;
    message: string;
    messagePlaceholder: string;
    privacy: string;
    privacyLink: string;
    submit: string;
    sending: string;
    errorLinks: string;
    errorSend: string;
    doneTitle: string;
    doneBody: string;
  };
  faq: { eyebrow: string; title: string; items: { q: string; a: string }[] };
};
