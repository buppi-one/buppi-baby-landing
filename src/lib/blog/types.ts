import type { Locale } from "@/i18n";

export type CategorySlug =
  | "pregnancy"
  | "baby-care"
  | "development"
  | "sleep"
  | "feeding"
  | "health"
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
