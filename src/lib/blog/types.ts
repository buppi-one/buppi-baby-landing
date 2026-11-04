import type { Locale } from "@/i18n";

export type CategorySlug =
  | "sleep"
  | "feeding"
  | "development"
  | "health"
  | "expecting-and-new-parents"
  | "news";

export type FaqItem = {
  question: string;
  answer: string;
};

export type Reference = {
  /** Title of the paper / page / book chapter. */
  title: string;
  /** Source line: "WHO, 2024" or "Acta Paediatrica, 2020 — Hjern A et al." */
  source: string;
  /** Optional URL or DOI. */
  url?: string;
};

/**
 * The Buppi app's developmental phases (growthStages.ts GROWTH_STAGES ids).
 * A post carrying `guidePhases` is an in-app guide: the app's Bebê › Guias
 * screen lists it for babies currently in one of these phases.
 */
export const GUIDE_PHASES = [
  "newborn",
  "stage_1_3m",
  "stage_4_6m",
  "stage_7_9m",
  "stage_10_12m",
  "stage_13_18m",
  "stage_19_24m",
  "stage_2_3y",
] as const;
export type GuidePhase = (typeof GUIDE_PHASES)[number];

export type Frontmatter = {
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  category: CategorySlug;
  tags?: string[];
  slug?: string;
  cover?: string;
  draft?: boolean;
  faq?: FaqItem[];
  references?: Reference[];
  /** Present = this post is an in-app guide for these phases. */
  guidePhases?: GuidePhase[];
};

export type Article = {
  /** Folder name — canonical id, stable across translations. */
  id: string;
  /** Locale of this rendition. */
  locale: Locale;
  /** URL slug for this locale (frontmatter override OR folder name). */
  slug: string;
  /** Path to source file, relative to repo root. */
  source: string;
  /** Parsed frontmatter. */
  frontmatter: Frontmatter;
  /** Raw MDX body, without frontmatter. */
  content: string;
  /** Reading time in minutes (rounded up, min 1). */
  readingTimeMinutes: number;
};

/** Maps articleId → { locale → slug } for cross-locale redirects and hreflang. */
export type AlternatesMap = Record<string, Partial<Record<Locale, string>>>;
