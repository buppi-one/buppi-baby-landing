import type { Locale } from "@/i18n";
import type { CategorySlug } from "./types";

type CategoryMeta = {
  /** Per-locale URL slug used in /blog/category/{slug}/ routes. */
  urlSlug: Record<Locale, string>;
  /** Display label shown in UI (pill, page title, etc.). */
  label: Record<Locale, string>;
};

export const CATEGORIES: Record<CategorySlug, CategoryMeta> = {
  pregnancy: {
    urlSlug: {
      "pt-BR": "gestacao",
      en: "pregnancy",
      es: "embarazo",
      fr: "grossesse",
    },
    label: {
      "pt-BR": "Gestação",
      en: "Pregnancy",
      es: "Embarazo",
      fr: "Grossesse",
    },
  },
  "baby-care": {
    urlSlug: {
      "pt-BR": "cuidados-do-bebe",
      en: "baby-care",
      es: "cuidados-del-bebe",
      fr: "soins-du-bebe",
    },
    label: {
      "pt-BR": "Cuidados do bebê",
      en: "Baby care",
      es: "Cuidados del bebé",
      fr: "Soins du bébé",
    },
  },
  development: {
    urlSlug: {
      "pt-BR": "desenvolvimento",
      en: "development",
      es: "desarrollo",
      fr: "developpement",
    },
    label: {
      "pt-BR": "Desenvolvimento",
      en: "Development",
      es: "Desarrollo",
      fr: "Développement",
    },
  },
  sleep: {
    urlSlug: {
      "pt-BR": "sono",
      en: "sleep",
      es: "sueno",
      fr: "sommeil",
    },
    label: {
      "pt-BR": "Sono",
      en: "Sleep",
      es: "Sueño",
      fr: "Sommeil",
    },
  },
  feeding: {
    urlSlug: {
      "pt-BR": "alimentacao",
      en: "feeding",
      es: "alimentacion",
      fr: "alimentation",
    },
    label: {
      "pt-BR": "Alimentação",
      en: "Feeding",
      es: "Alimentación",
      fr: "Alimentation",
    },
  },
  health: {
    urlSlug: {
      "pt-BR": "saude",
      en: "health",
      es: "salud",
      fr: "sante",
    },
    label: {
      "pt-BR": "Saúde",
      en: "Health",
      es: "Salud",
      fr: "Santé",
    },
  },
  news: {
    urlSlug: {
      "pt-BR": "novidades",
      en: "news",
      es: "novedades",
      fr: "actualites",
    },
    label: {
      "pt-BR": "Novidades",
      en: "News",
      es: "News",
      fr: "Actualités",
    },
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
