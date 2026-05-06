import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { loadAllArticles } from "./loader";
import type { Article } from "./types";

const TAG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}(T.+)?$/;

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
