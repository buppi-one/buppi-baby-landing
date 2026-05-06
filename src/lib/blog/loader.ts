import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { LOCALES, type Locale } from "@/i18n";
import { isCategorySlug } from "./categories";
import type { AlternatesMap, Article, FaqItem, Frontmatter, Reference } from "./types";

const CONTENT_ROOT = join(process.cwd(), "content", "blog");
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function isLocaleString(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

function assertString(value: unknown, field: string, source: string): string {
  if (typeof value !== "string" || value.length === 0) {
    throw new Error(`${source}: missing or invalid "${field}"`);
  }
  return value;
}

function assertDateString(value: unknown, field: string, source: string): string {
  if (value instanceof Date) {
    if (Number.isNaN(value.getTime())) {
      throw new Error(`${source}: invalid date for "${field}"`);
    }
    return value.toISOString().slice(0, 10);
  }
  return assertString(value, field, source);
}

function parseFrontmatter(raw: Record<string, unknown>, source: string): Frontmatter {
  const title = assertString(raw.title, "title", source);
  const description = assertString(raw.description, "description", source);
  const publishedAt = assertDateString(raw.publishedAt, "publishedAt", source);
  const category = assertString(raw.category, "category", source);
  if (!isCategorySlug(category)) {
    throw new Error(`${source}: unknown category "${category}"`);
  }
  const updatedAt = raw.updatedAt === undefined ? undefined : assertDateString(raw.updatedAt, "updatedAt", source);
  const slug = raw.slug === undefined ? undefined : assertString(raw.slug, "slug", source);
  if (slug !== undefined && !SLUG_RE.test(slug)) {
    throw new Error(`${source}: slug "${slug}" must match ${SLUG_RE}`);
  }
  const cover = raw.cover === undefined ? undefined : assertString(raw.cover, "cover", source);
  const tags = raw.tags === undefined ? undefined : (() => {
    if (!Array.isArray(raw.tags)) {
      throw new Error(`${source}: "tags" must be an array`);
    }
    return raw.tags.map((t, i) => assertString(t, `tags[${i}]`, source));
  })();
  const draft = raw.draft === undefined ? false : Boolean(raw.draft);
  const faq = raw.faq === undefined ? undefined : parseFaq(raw.faq, source);
  const references =
    raw.references === undefined ? undefined : parseReferences(raw.references, source);
  return {
    title,
    description,
    publishedAt,
    updatedAt,
    category,
    tags,
    slug,
    cover,
    draft,
    faq,
    references,
  };
}

function parseFaq(value: unknown, source: string): FaqItem[] {
  if (!Array.isArray(value)) {
    throw new Error(`${source}: "faq" must be an array`);
  }
  return value.map((item, i) => {
    if (typeof item !== "object" || item === null) {
      throw new Error(`${source}: faq[${i}] must be an object`);
    }
    const obj = item as Record<string, unknown>;
    return {
      question: assertString(obj.question, `faq[${i}].question`, source),
      answer: assertString(obj.answer, `faq[${i}].answer`, source),
    };
  });
}

function parseReferences(value: unknown, source: string): Reference[] {
  if (!Array.isArray(value)) {
    throw new Error(`${source}: "references" must be an array`);
  }
  return value.map((item, i) => {
    if (typeof item !== "object" || item === null) {
      throw new Error(`${source}: references[${i}] must be an object`);
    }
    const obj = item as Record<string, unknown>;
    const url = obj.url === undefined ? undefined : assertString(obj.url, `references[${i}].url`, source);
    if (url !== undefined && !/^https?:\/\//.test(url)) {
      throw new Error(`${source}: references[${i}].url must be http(s)`);
    }
    return {
      title: assertString(obj.title, `references[${i}].title`, source),
      source: assertString(obj.source, `references[${i}].source`, source),
      url,
    };
  });
}

function readArticleFile(articleId: string, fileName: string): Article | null {
  const localePart = fileName.replace(/\.mdx$/, "");
  if (!isLocaleString(localePart)) return null;
  const source = join("content", "blog", articleId, fileName);
  const fullPath = join(CONTENT_ROOT, articleId, fileName);
  const raw = readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  const frontmatter = parseFrontmatter(data, source);
  const slug = frontmatter.slug ?? articleId;
  if (!SLUG_RE.test(slug)) {
    throw new Error(`${source}: derived slug "${slug}" must match ${SLUG_RE}`);
  }
  const stats = readingTime(content);
  return {
    id: articleId,
    locale: localePart,
    slug,
    source,
    frontmatter,
    content,
    readingTimeMinutes: Math.max(1, Math.ceil(stats.minutes)),
  };
}

let cached: Article[] | null = null;

/** Read every article rendition from disk. Cached for the lifetime of the process. */
export function loadAllArticles(): Article[] {
  if (cached) return cached;
  let entries: string[];
  try {
    entries = readdirSync(CONTENT_ROOT);
  } catch {
    cached = [];
    return cached;
  }
  const out: Article[] = [];
  for (const articleId of entries) {
    if (articleId.startsWith(".")) continue;
    const dir = join(CONTENT_ROOT, articleId);
    if (!statSync(dir).isDirectory()) continue;
    if (!SLUG_RE.test(articleId)) {
      throw new Error(`content/blog/${articleId}: folder name must match ${SLUG_RE}`);
    }
    for (const file of readdirSync(dir)) {
      if (!file.endsWith(".mdx")) continue;
      const article = readArticleFile(articleId, file);
      if (article) out.push(article);
    }
  }
  cached = out;
  return cached;
}

/**
 * Articles ready to be rendered: drafts excluded in production.
 * Use this everywhere except validation and tooling.
 */
export function getAllArticles(): Article[] {
  const all = loadAllArticles();
  if (process.env.NODE_ENV === "production") {
    return all.filter((a) => !a.frontmatter.draft);
  }
  return all;
}

export function getArticlesByLocale(locale: Locale): Article[] {
  return getAllArticles()
    .filter((a) => a.locale === locale)
    .sort((a, b) => b.frontmatter.publishedAt.localeCompare(a.frontmatter.publishedAt));
}

export function getArticle(locale: Locale, slug: string): Article | undefined {
  return getAllArticles().find((a) => a.locale === locale && a.slug === slug);
}

/** articleId → { locale → slug } for hreflang and cross-locale redirects. */
export function getAlternatesMap(): AlternatesMap {
  const map: AlternatesMap = {};
  for (const article of getAllArticles()) {
    const entry = (map[article.id] ??= {});
    entry[article.locale] = article.slug;
  }
  return map;
}

