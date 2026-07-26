import type { ReactNode } from "react";
import type { BIconName } from "@/components/BIcon";
import { FormulaCalculator } from "@/components/tools/FormulaCalculator";
import { LOCALES, localePath, type Locale } from "@/i18n";

/**
 * Tools registry. Each tool has a stable `id`, a per-locale URL slug (the
 * `/ferramentas/` segment is fixed across locales, like `/blog/`; only the slug
 * is localized), the related blog post it complements, and its per-locale copy.
 * `render` returns the interactive component. Adding a tool = one entry here.
 */

export type ToolContent = {
  title: string; // <title> + hub card title
  description: string; // meta description + hub card description
  heading: string; // H1 on the tool page
  intro: string; // lede paragraph under the H1
};

export type Tool = {
  id: string;
  icon: BIconName;
  slug: Record<Locale, string>;
  relatedSlug: Record<Locale, string>;
  content: Record<Locale, ToolContent>;
  render: (locale: Locale) => ReactNode;
};

export const TOOLS: Tool[] = [
  {
    id: "calculadora-de-formula",
    icon: "bottle",
    slug: {
      "pt-BR": "calculadora-de-formula",
      en: "formula-calculator",
      es: "calculadora-de-formula",
      fr: "calculateur-de-lait",
    },
    relatedSlug: {
      "pt-BR": "quantidade-de-formula-por-idade",
      en: "how-much-formula-by-age",
      es: "cantidad-de-formula-por-edad",
      fr: "quantite-de-lait-infantile-par-age",
    },
    content: {
      "pt-BR": {
        title: "Calculadora de fórmula por idade e peso",
        description:
          "Estime quantos ml de fórmula seu bebê precisa por dia e por mamada, do recém-nascido aos 6 meses — a partir do peso e da idade, com base nas orientações da AAP e da OMS.",
        heading: "Calculadora de fórmula",
        intro:
          "Uma faixa de referência de quantos ml de fórmula oferecer, por dia e por mamada, a partir da idade e do peso do bebê. É um ponto de partida — não uma meta — e sempre com deferência ao pediatra.",
      },
      en: {
        title: "Formula calculator by age and weight",
        description:
          "Estimate how many ml of formula your baby needs per day and per feed, from newborn to 6 months — from weight and age, based on AAP and WHO guidance.",
        heading: "Formula calculator",
        intro:
          "A reference range for how much formula to offer, per day and per feed, from your baby's age and weight. It's a starting point — not a target — and always defers to your pediatrician.",
      },
      es: {
        title: "Calculadora de fórmula por edad y peso",
        description:
          "Estima cuántos ml de fórmula necesita tu bebé al día y por toma, del recién nacido a los 6 meses — según el peso y la edad, con base en las guías de la AAP y la OMS.",
        heading: "Calculadora de fórmula",
        intro:
          "Un rango de referencia de cuánta fórmula ofrecer, al día y por toma, a partir de la edad y el peso del bebé. Es un punto de partida — no una meta — y siempre remite al pediatra.",
      },
      fr: {
        title: "Calculateur de lait infantile par âge et poids",
        description:
          "Estimez combien de ml de lait infantile votre bébé a besoin par jour et par biberon, du nouveau-né à 6 mois — selon le poids et l'âge, d'après les recommandations de l'AAP et de l'OMS.",
        heading: "Calculateur de lait infantile",
        intro:
          "Une fourchette de référence de la quantité de lait à proposer, par jour et par biberon, à partir de l'âge et du poids de bébé. C'est un point de départ — pas un objectif — et cela renvoie toujours au pédiatre.",
      },
    },
    render: (locale) => <FormulaCalculator locale={locale} />,
  },
];

export function getToolBySlug(locale: Locale, slug: string): Tool | undefined {
  return TOOLS.find((t) => t.slug[locale] === slug);
}

/** All (locale, slug) pairs — used by generateStaticParams. */
export function toolSlugsForLocale(locale: Locale): string[] {
  return TOOLS.map((t) => t.slug[locale]);
}

/** Per-locale path map (with locale prefix) for a tool, for hreflang alternates. */
export function toolPaths(tool: Tool): Record<Locale, string> {
  const out = {} as Record<Locale, string>;
  for (const l of LOCALES) out[l] = localePath(l, `/ferramentas/${tool.slug[l]}`);
  return out;
}
