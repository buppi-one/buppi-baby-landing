/**
 * Inserts (or refreshes) the previous / all weeks / next navigation line in
 * every published article of the "pregnancy week by week" series, in all four
 * locales. Idempotent: the line is recognised by its bold label and replaced.
 *
 *   npx tsx scripts/pregnancy-series/nav.ts
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const BLOG_DIR = join(process.cwd(), "content", "blog");
const FIRST_SINGLE_WEEK = 4;
const LAST_SINGLE_WEEK = 40;
const CLOSING_CTA = '<Cta id="download" />';

type Locale = "pt-BR" | "en" | "es" | "fr";
type Step = { id: string; label: Record<Locale, string>; slug: Record<Locale, string> };

const HUB: Step = {
  id: "gestacao-semana-a-semana",
  label: {
    "pt-BR": "todas as semanas",
    en: "all weeks",
    es: "todas las semanas",
    fr: "toutes les semaines",
  },
  slug: {
    "pt-BR": "gestacao-semana-a-semana",
    en: "pregnancy-week-by-week",
    es: "embarazo-semana-a-semana",
    fr: "grossesse-semaine-par-semaine",
  },
};

const NAV_LABEL: Record<Locale, string> = {
  "pt-BR": "Gestação semana a semana:",
  en: "Pregnancy week by week:",
  es: "Embarazo semana a semana:",
  fr: "Grossesse semaine par semaine :",
};

const PREFIX: Record<Locale, string> = { "pt-BR": "/blog", en: "/en/blog", es: "/es/blog", fr: "/fr/blog" };

function singleWeek(n: number): Step {
  return {
    id: `gestacao-${n}-semanas`,
    label: { "pt-BR": `${n} semanas`, en: `week ${n}`, es: `semana ${n}`, fr: `${n} SA` },
    slug: {
      "pt-BR": `gestacao-${n}-semanas`,
      en: `${n}-weeks-pregnant`,
      es: `${n}-semanas-de-embarazo`,
      fr: `grossesse-${n}-sa`,
    },
  };
}

const STEPS: Step[] = [
  {
    id: "gestacao-1-a-3-semanas",
    label: { "pt-BR": "semanas 1 a 3", en: "weeks 1 to 3", es: "semanas 1 a 3", fr: "1 à 3 SA" },
    slug: {
      "pt-BR": "gestacao-1-a-3-semanas",
      en: "1-to-3-weeks-pregnant",
      es: "1-a-3-semanas-de-embarazo",
      fr: "grossesse-1-a-3-sa",
    },
  },
  ...Array.from({ length: LAST_SINGLE_WEEK - FIRST_SINGLE_WEEK + 1 }, (_, i) => singleWeek(FIRST_SINGLE_WEEK + i)),
  {
    id: "gestacao-41-e-42-semanas",
    label: { "pt-BR": "semanas 41 e 42", en: "weeks 41 and 42", es: "semanas 41 y 42", fr: "41 et 42 SA" },
    slug: {
      "pt-BR": "gestacao-41-e-42-semanas",
      en: "41-and-42-weeks-pregnant",
      es: "41-y-42-semanas-de-embarazo",
      fr: "grossesse-41-et-42-sa",
    },
  },
];

const LOCALES: Locale[] = ["pt-BR", "en", "es", "fr"];

function exists(step: Step, locale: Locale): boolean {
  return existsSync(join(BLOG_DIR, step.id, `${locale}.mdx`));
}

function link(step: Step, locale: Locale, text: string): string {
  return `[${text}](${PREFIX[locale]}/${step.slug[locale]}/)`;
}

let changed = 0;
for (const [index, step] of STEPS.entries()) {
  for (const locale of LOCALES) {
    const file = join(BLOG_DIR, step.id, `${locale}.mdx`);
    if (!existsSync(file)) continue;
    const prev = STEPS.slice(0, index).reverse().find((s) => exists(s, locale));
    const next = STEPS.slice(index + 1).find((s) => exists(s, locale));
    const parts: string[] = [];
    if (prev) parts.push(link(prev, locale, `← ${prev.label[locale]}`));
    if (exists(HUB, locale)) parts.push(link(HUB, locale, HUB.label[locale]));
    if (next) parts.push(link(next, locale, `${next.label[locale]} →`));
    if (parts.length === 0) continue;
    const navLine = `**${NAV_LABEL[locale]}** ${parts.join(" · ")}`;

    const original = readFileSync(file, "utf8");
    const lines = original.split("\n").filter((l) => !l.startsWith(`**${NAV_LABEL[locale]}**`));
    const ctaIndex = lines.lastIndexOf(CLOSING_CTA);
    if (ctaIndex === -1) throw new Error(`${file}: closing ${CLOSING_CTA} not found`);
    // Drop blank lines left right above the CTA, then re-insert nav + one blank.
    let insertAt = ctaIndex;
    while (insertAt > 0 && lines[insertAt - 1].trim() === "") insertAt--;
    lines.splice(insertAt, ctaIndex - insertAt, "", navLine, "");
    const updated = lines.join("\n");
    if (updated !== original) {
      writeFileSync(file, updated);
      changed++;
    }
  }
}
console.log(`pregnancy-series nav: ${changed} file(s) updated`);
