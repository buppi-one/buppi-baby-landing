/**
 * Consistency check for the "pregnancy week by week" series: every weekly
 * article, in every locale, must state the length and average weight of the
 * series table (docs/pregnancy-series.md), must carry both CTAs, a slug in
 * translations, and no previous/next links written by hand.
 *
 *   npx tsx scripts/pregnancy-series/check.ts
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const LOCALES = ["pt-BR", "en", "es", "fr"] as const;
const DECIMAL_COMMA_LOCALES = new Set(["pt-BR", "es", "fr"]);

type Row = { week: number; length: string; weight: string | null };

function parseTable(): Row[] {
  const guide = readFileSync(join(ROOT, "docs", "pregnancy-series.md"), "utf8");
  const rows: Row[] = [];
  for (const line of guide.split("\n")) {
    const cells = line.split("|").map((c) => c.trim());
    if (!/^\d+$/.test(cells[1] ?? "") || cells.length < 9) continue;
    const length = cells[5].replace(/^cerca de /, "").replace(/ \(.*$/, "");
    const weightMatch = cells[6].match(/^cerca de ([\d,]+ (?:g|kg))/);
    rows.push({ week: Number(cells[1]), length, weight: weightMatch ? weightMatch[1] : null });
  }
  return rows;
}

/** "25,6 cm" → regex accepting the locale's decimal mark and optional space. */
function numberPattern(value: string, locale: string): RegExp {
  const [num, unit] = value.split(" ");
  const mark = DECIMAL_COMMA_LOCALES.has(locale) ? "," : "\\.";
  const localized = num.replace(",", mark).replace(/(\d)(?=(\d{3})+$)/, "$1[ .,\\u202f\\u00a0]?");
  return new RegExp(`(?<![\\d.,])${localized}[\\s\\u00a0\\u202f]?${unit}\\b`);
}

const problems: string[] = [];
let checked = 0;
for (const row of parseTable()) {
  const id = `gestacao-${row.week}-semanas`;
  for (const locale of LOCALES) {
    const file = join(ROOT, "content", "blog", id, `${locale}.mdx`);
    if (!existsSync(file)) {
      problems.push(`${id}/${locale}: missing`);
      continue;
    }
    checked++;
    const text = readFileSync(file, "utf8");
    if (!numberPattern(row.length, locale).test(text)) problems.push(`${id}/${locale}: length "${row.length}" not found`);
    if (row.weight && !numberPattern(row.weight, locale).test(text))
      problems.push(`${id}/${locale}: weight "${row.weight}" not found`);
    if (!row.weight && /\b\d+\s?(g|gramas|grams|gramos|grammes)\b/.test(text.split("\n---\n").slice(1).join("")))
      problems.push(`${id}/${locale}: states a weight in grams before week 14`);
    for (const cta of ["pregnancy-start", "download"])
      if (!text.includes(`<Cta id="${cta}" />`)) problems.push(`${id}/${locale}: missing CTA ${cta}`);
    if (locale !== "pt-BR" && !/^slug: /m.test(text)) problems.push(`${id}/${locale}: missing slug`);
    if (/^(instagram|guidePhases):/m.test(text)) problems.push(`${id}/${locale}: has instagram/guidePhases block`);
  }
}
console.log(`pregnancy-series check: ${checked} files, ${problems.length} problem(s)`);
for (const p of problems) console.log("  - " + p);
process.exit(problems.length ? 1 : 0);
