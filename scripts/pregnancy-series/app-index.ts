/**
 * The pregnancy week-by-week series, shaped for the Buppi app.
 *
 * The app's "Semana a semana" screen and the "about the size of" line on the
 * home read this index instead of text bundled in the binary, so a fix to an
 * article reaches the app on the next deploy. Numbers come from the series
 * table in docs/pregnancy-series.md (the same table `check.ts` holds every
 * article to); the words come from each locale's article.
 *
 * Output (written by build-ai-index): public/ai/pregnancy-weeks.<locale>.json
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { Article } from "@/lib/blog/types";

/** First and last week the series has its own article for, the edges grouped. */
const FIRST_WEEK = 1;
const EARLY_GROUP_LAST_WEEK = 3;
const LATE_GROUP_FIRST_WEEK = 41;
const LAST_WEEK = 42;
const MM_PER_CM = 10;
const G_PER_KG = 1000;

export type LengthMeasure = "crown-rump" | "crown-heel";

/** One row of the series table: locale-free numbers for one week. */
export interface WeekNumbers {
  week: number;
  lengthMm: number | null;
  lengthMeasure: LengthMeasure | null;
  weightG: number | null;
  weightP10G: number | null;
  weightP90G: number | null;
}

export interface AppWeekEntry extends Omit<WeekNumbers, "week"> {
  fromWeek: number;
  toWeek: number;
  slug: string;
  title: string;
  description: string;
  /** The article's opening answer, without its "Quick answer:" label. */
  quickAnswer: string | null;
  /** "a banana", in the article's language; null where the article has none. */
  comparison: string | null;
  url: string;
  mdUrl: string;
  readingTimeMinutes: number;
  references: { title: string; source: string; url?: string }[];
  /** The article's cover illustration (absolute URL); null when it has none. */
  coverUrl: string | null;
}

/** "25,6 cm" / "2 mm" → millimetres. */
function toMm(value: string): number | null {
  const m = value.match(/([\d,.]+)\s*(mm|cm)/);
  if (!m) return null;
  const n = Number(m[1].replace(",", "."));
  return m[2] === "cm" ? Math.round(n * MM_PER_CM) : n;
}

/** "3,0 kg" / "330 g" → grams. */
function toG(value: string): number | null {
  const m = value.match(/([\d,.]+)\s*(kg|g)\b/);
  if (!m) return null;
  const n = Number(m[1].replace(",", "."));
  return Math.round(m[2] === "kg" ? n * G_PER_KG : n);
}

/** Reads the weekly table (columns: week | trimester | month | left | length | weight | comparison | NHS). */
export function parseSeriesTable(markdown: string): WeekNumbers[] {
  const rows: WeekNumbers[] = [];
  for (const line of markdown.split("\n")) {
    const cells = line.split("|").map((c) => c.trim());
    if (!/^\d+$/.test(cells[1] ?? "") || cells.length < 9) continue;
    const length = cells[5];
    const weight = cells[6];
    const range = weight.match(/\(([^)]+)\)/)?.[1] ?? "";
    // "286 a 380 g": the unit may be written only once, after the second number.
    const [p10Raw, p90] = range.split(/\s+a\s+/);
    const unit = p90?.match(/(kg|g)\b/)?.[1];
    const p10 = p10Raw && unit && !/(kg|g)\b/.test(p10Raw) ? `${p10Raw} ${unit}` : p10Raw;
    rows.push({
      week: Number(cells[1]),
      lengthMm: toMm(length),
      lengthMeasure: /pés/.test(length) ? "crown-heel" : /bumbum/.test(length) ? "crown-rump" : null,
      weightG: /^cerca de/.test(weight) ? toG(weight) : null,
      weightP10G: p10 ? toG(p10) : null,
      weightP90G: p90 ? toG(p90) : null,
    });
  }
  return rows;
}

/** Which weeks an article of the series covers, from its folder id; null if it is not one. */
export function weeksOfArticle(id: string): { fromWeek: number; toWeek: number } | null {
  if (id === "gestacao-1-a-3-semanas") return { fromWeek: FIRST_WEEK, toWeek: EARLY_GROUP_LAST_WEEK };
  if (id === "gestacao-41-e-42-semanas") return { fromWeek: LATE_GROUP_FIRST_WEEK, toWeek: LAST_WEEK };
  const m = id.match(/^gestacao-(\d+)-semanas$/);
  return m ? { fromWeek: Number(m[1]), toWeek: Number(m[1]) } : null;
}

/** The text after the bold label that opens every article ("**Quick answer:** …"). */
export function quickAnswerOf(body: string): string | null {
  const m = body.match(/^\*\*[^*]+:?\*\*:?\s*(.+)$/m);
  if (!m) return null;
  const text = m[1].replace(/\*\*/g, "").trim();
  // It continues the label ("Quick answer: at 20 weeks…"); on its own it starts a sentence.
  return text.charAt(0).toLocaleUpperCase() + text.slice(1);
}

/**
 * The "Comparison" row of the article's numbers table, in any of the four languages.
 * Some English weeks label it "Size comparison".
 */
export function comparisonOf(body: string): string | null {
  const m = body.match(/^\|\s*(?:Comparação|(?:Size )?[Cc]omparison|Comparación|Comparaison)\s*\|\s*([^|]+?)\s*\|/m);
  return m ? m[1].trim() : null;
}

export function readSeriesTable(root: string): WeekNumbers[] {
  return parseSeriesTable(readFileSync(join(root, "docs", "pregnancy-series.md"), "utf8"));
}

/** The app index for one locale, ordered by week. */
export function buildPregnancyWeeks(
  articles: Article[],
  numbers: WeekNumbers[],
  urlFor: (slug: string) => string,
  siteUrl: string,
): AppWeekEntry[] {
  const byWeek = new Map(numbers.map((n) => [n.week, n]));
  return articles
    .map((a) => ({ a, weeks: weeksOfArticle(a.id) }))
    .filter((x): x is { a: Article; weeks: { fromWeek: number; toWeek: number } } => x.weeks !== null)
    .sort((x, y) => x.weeks.fromWeek - y.weeks.fromWeek)
    .map(({ a, weeks }) => {
      // The grouped articles have no single week's numbers: the series does not state them.
      const n = weeks.fromWeek === weeks.toWeek ? byWeek.get(weeks.fromWeek) : undefined;
      const url = urlFor(a.slug);
      return {
        ...weeks,
        slug: a.slug,
        title: a.frontmatter.title,
        description: a.frontmatter.description,
        quickAnswer: quickAnswerOf(a.content),
        comparison: comparisonOf(a.content),
        lengthMm: n?.lengthMm ?? null,
        lengthMeasure: n?.lengthMeasure ?? null,
        weightG: n?.weightG ?? null,
        weightP10G: n?.weightP10G ?? null,
        weightP90G: n?.weightP90G ?? null,
        url,
        mdUrl: `${url}index.md`,
        readingTimeMinutes: a.readingTimeMinutes,
        references: a.frontmatter.references ?? [],
        // Covers live in the article folder (same id in every locale), as the page's og:image does.
        coverUrl: a.frontmatter.cover ? `${siteUrl}/blog/${a.id}/${a.frontmatter.cover.replace(/^\.\//, "")}` : null,
      };
    });
}
