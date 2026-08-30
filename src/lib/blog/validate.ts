import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { CTA_IDS } from "./ctas";
import { loadAllArticles } from "./loader";
import type { Article } from "./types";

const TAG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}(T.+)?$/;
const CTA_REF_RE = /<Cta\s+(?:[^>]*?\s+)?id=["']([^"']+)["']/g;

function checkDate(value: string, field: string, source: string, errors: string[]) {
  if (!ISO_DATE_RE.test(value)) {
    errors.push(`${source}: ${field} must be ISO date (YYYY-MM-DD), got "${value}"`);
    return null;
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    errors.push(`${source}: ${field} is not a valid date`);
    return null;
  }
  return date;
}

function checkArticle(article: Article, errors: string[]) {
  const { source, frontmatter } = article;

  const published = checkDate(frontmatter.publishedAt, "publishedAt", source, errors);
  if (frontmatter.updatedAt) {
    const updated = checkDate(frontmatter.updatedAt, "updatedAt", source, errors);
    if (published && updated && updated.getTime() < published.getTime()) {
      errors.push(`${source}: updatedAt is before publishedAt`);
    }
  }

  for (const tag of frontmatter.tags ?? []) {
    if (!TAG_RE.test(tag)) {
      errors.push(`${source}: tag "${tag}" must match ${TAG_RE}`);
    }
  }

  if (frontmatter.cover) {
    if (!frontmatter.cover.startsWith("./")) {
      errors.push(`${source}: cover must start with "./" (got "${frontmatter.cover}")`);
    } else {
      const articleDir = dirname(resolve(process.cwd(), source));
      const coverPath = join(articleDir, frontmatter.cover);
      if (!existsSync(coverPath)) {
        errors.push(`${source}: cover file not found at ${coverPath}`);
      }
    }
  }

  // <Cta id="..."/> references must point at a known CTA in the registry.
  CTA_REF_RE.lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = CTA_REF_RE.exec(article.content)) !== null) {
    const id = match[1];
    if (!(CTA_IDS as readonly string[]).includes(id)) {
      errors.push(
        `${source}: <Cta id="${id}"> not found in CTA registry. Valid ids: ${CTA_IDS.join(", ")}`,
      );
    }
  }
}

// ── Editorial safety: NEVER recommend medications ─────────────────────────
// Hard rule (see CLAUDE.md "Nunca recomendar medicamentos"): no article, FAQ or
// Instagram spec may name a drug, a drug class used as a recommendation, or a
// dose. Everything medication-related must defer to the pediatrician. The scan
// covers the whole frontmatter (faq, instagram spec, tags…) and the body.
const MEDICATION_PATTERNS: { re: RegExp; why: string }[] = [
  {
    why: "drug/brand/strain name",
    re: /\b(paracetamol|paracétamol|acetaminof[eé]n[oe]?|acetaminophen|acétaminophène|dipirona|dipyrone|metamizol|ibuprofen[oe]?|ibuprofène|aspirina|aspirine?|ácido acetilsalicílico|simeticona|simethicone|siméticone|dimeticona|omeprazol[e]?|oméprazole|ranitidin[ae]|domperidon[ae]|amoxicilin[ae]|amoxicillin|azitromicina|azithromycin|prednisolon[ae]|cetirizin[ae]|loratadin[ae]|dexclorfeniramina|tylenol|novalgina|advil|alivium|luftal|dramin|buscopan|lactobacillus|reuteri|dsm\s?17938)\b/iu,
  },
  {
    why: "drug class phrased as a recommendation",
    re: /\b(antit[ée]rmicos?|antipir[ée]ticos?|antipyretics?|antipyrétiques?|febr[ií]fugos?|fever reducers?|antiespasm[óo]dicos?|antispasmodics?|antispasmodiques?)\b/iu,
  },
  {
    why: "dose (number + mg/mcg/UI/gotas)",
    re: /\b\d+(?:[.,]\d+)?\s?(?:mg|mcg|µg|ui|iu|gotas|drops|gouttes)\b|\bmg\s?\/\s?kg\b/iu,
  },
];

function checkNoMedications(article: Article, errors: string[]) {
  const { source, frontmatter, content } = article;
  // References are citations (a paper title may name a drug) — not recommendations.
  const { references: _refs, ...fm } = frontmatter as Record<string, unknown>;
  const haystack = `${JSON.stringify(fm)}\n${content}`;
  const lines = haystack.split("\n");
  for (const { re, why } of MEDICATION_PATTERNS) {
    lines.forEach((line, i) => {
      const m = line.match(re);
      if (m) {
        errors.push(
          `${source}: NUNCA recomendar medicamentos — ${why} "${m[0]}" (line ~${i + 1}). ` +
            `Rewrite to defer to the pediatrician without naming drugs or doses.`,
        );
      }
    });
  }
}

function checkSlugUniqueness(articles: Article[], errors: string[]) {
  const seen = new Map<string, string>();
  for (const a of articles) {
    const key = `${a.locale}::${a.slug}`;
    const prev = seen.get(key);
    if (prev) {
      errors.push(
        `Duplicate slug "${a.slug}" for locale "${a.locale}" — defined in ${prev} and ${a.source}`,
      );
    } else {
      seen.set(key, a.source);
    }
  }
}

function main() {
  const articles = loadAllArticles();
  const errors: string[] = [];

  for (const article of articles) {
    checkArticle(article, errors);
    checkNoMedications(article, errors);
  }
  checkSlugUniqueness(articles, errors);

  const drafts = articles.filter((a) => a.frontmatter.draft).length;
  const published = articles.length - drafts;

  if (errors.length > 0) {
    console.error(`\n✗ Blog validation failed (${errors.length} error${errors.length > 1 ? "s" : ""}):\n`);
    for (const err of errors) console.error(`  ${err}`);
    console.error("");
    process.exit(1);
  }

  console.log(`✓ Blog validation passed: ${published} published, ${drafts} draft${drafts === 1 ? "" : "s"}`);
}

try {
  main();
} catch (err) {
  console.error(`\n✗ Blog validation crashed: ${err instanceof Error ? err.message : err}\n`);
  process.exit(1);
}
