import type { BIconName } from "@/components/BIcon";
import type { Locale } from "@/i18n";
import type { CategorySlug } from "./types";

type CategoryMeta = {
  /** Per-locale URL slug used in /blog/category/{slug}/ routes. */
  urlSlug: Record<Locale, string>;
  /** Display label shown in UI (pill, page title, etc.). */
  label: Record<Locale, string>;
  /** BIcon name and CSS color for the category pill / cover. */
  icon: BIconName;
  color: string;
};

export const CATEGORIES: Record<CategorySlug, CategoryMeta> = {
  sleep: {
    urlSlug: { "pt-BR": "sono", en: "sleep", es: "sueno", fr: "sommeil" },
    label: { "pt-BR": "Sono", en: "Sleep", es: "Sueño", fr: "Sommeil" },
    icon: "moon",
    color: "var(--color-evt-sleep-night)",
  },
  feeding: {
    urlSlug: { "pt-BR": "alimentacao", en: "feeding", es: "alimentacion", fr: "alimentation" },
    label: { "pt-BR": "Alimentação", en: "Feeding", es: "Alimentación", fr: "Alimentation" },
    icon: "bottle",
    color: "var(--color-evt-nursing)",
  },
  development: {
    urlSlug: { "pt-BR": "desenvolvimento", en: "development", es: "desarrollo", fr: "developpement" },
    label: { "pt-BR": "Desenvolvimento", en: "Development", es: "Desarrollo", fr: "Développement" },
    icon: "sparkle",
    color: "var(--color-primary)",
  },
  health: {
    urlSlug: { "pt-BR": "saude", en: "health", es: "salud", fr: "sante" },
    label: { "pt-BR": "Saúde", en: "Health", es: "Salud", fr: "Santé" },
    icon: "bell",
    color: "var(--color-accent-peach)",
  },
  "expecting-and-new-parents": {
    urlSlug: {
      "pt-BR": "gestacao-e-novos-pais",
      en: "expecting-and-new-parents",
      es: "embarazo-y-nuevos-padres",
      fr: "grossesse-et-nouveaux-parents",
    },
    label: {
      "pt-BR": "Gestação e novos pais",
      en: "Expecting & New Parents",
      es: "Embarazo y nuevos padres",
      fr: "Grossesse et nouveaux parents",
    },
    icon: "baby",
    color: "var(--color-evt-bath)",
  },
  news: {
    urlSlug: { "pt-BR": "novidades", en: "news", es: "novedades", fr: "actualites" },
    label: { "pt-BR": "Novidades", en: "News", es: "News", fr: "Actualités" },
    icon: "bolt",
    color: "var(--color-secondary-dark)",
  },
};

export const CATEGORY_SLUGS = Object.keys(CATEGORIES) as CategorySlug[];

export function isCategorySlug(value: string): value is CategorySlug {
  return value in CATEGORIES;
}

/** Find the canonical CategorySlug from a per-locale URL slug. */
export function categoryFromUrlSlug(
  locale: Locale,
  urlSlug: string,
): CategorySlug | null {
  const match = (Object.entries(CATEGORIES) as Array<[CategorySlug, CategoryMeta]>).find(
    ([, meta]) => meta.urlSlug[locale] === urlSlug,
  );
  return match ? match[0] : null;
}

