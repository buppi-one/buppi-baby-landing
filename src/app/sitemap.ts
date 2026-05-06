import type { MetadataRoute } from "next";
import { CATEGORIES } from "@/lib/blog/categories";
import { getAllArticles, getArticlesByLocale } from "@/lib/blog/loader";
import { LOCALES, DEFAULT_LOCALE, localePath, type Locale } from "@/i18n";

const BASE_URL = "https://buppi.baby";
const STATIC_PATHS = ["/", "/privacy", "/terms", "/support", "/delete-account", "/blog"];

export const dynamic = "force-static";

function urlFor(locale: Locale, path: string): string {
  const lp = localePath(locale, path);
  return `${BASE_URL}${lp === "/" ? "" : lp}/`;
}

type Entry = MetadataRoute.Sitemap[number];

function staticEntries(lastModified: Date): Entry[] {
  return STATIC_PATHS.flatMap((path) =>
    LOCALES.map((locale) => {
      const languages = Object.fromEntries(LOCALES.map((l) => [l, urlFor(l, path)]));
      languages["x-default"] = urlFor(DEFAULT_LOCALE, path);
      return {
        url: urlFor(locale, path),
        lastModified,
        changeFrequency: "monthly" as const,
        priority: path === "/" ? 1 : path === "/blog" ? 0.8 : 0.7,
        alternates: { languages },
      };
    }),
  );
}

function categoryEntries(lastModified: Date): Entry[] {
  const out: Entry[] = [];
  for (const locale of LOCALES) {
    const used = new Set(getArticlesByLocale(locale).map((a) => a.frontmatter.category));
    for (const category of used) {
      const meta = CATEGORIES[category];
      const path = `/blog/category/${meta.urlSlug[locale]}`;
      const languages: Record<string, string> = {};
      for (const l of LOCALES) {
        languages[l] = urlFor(l, `/blog/category/${meta.urlSlug[l]}`);
      }
      languages["x-default"] = urlFor(DEFAULT_LOCALE, `/blog/category/${meta.urlSlug[DEFAULT_LOCALE]}`);
      out.push({
        url: urlFor(locale, path),
        lastModified,
        changeFrequency: "weekly",
        priority: 0.6,
        alternates: { languages },
      });
    }
  }
  return out;
}

function articleEntries(): Entry[] {
  // Group renditions by article id so each entry can list its translations.
  const byId = new Map<string, ReturnType<typeof getAllArticles>>();
  for (const article of getAllArticles()) {
    const list = byId.get(article.id) ?? [];
    list.push(article);
    byId.set(article.id, list);
  }
  const out: Entry[] = [];
  for (const renditions of byId.values()) {
    const languages: Record<string, string> = {};
    for (const r of renditions) languages[r.locale] = urlFor(r.locale, `/blog/${r.slug}`);
    if (renditions.find((r) => r.locale === DEFAULT_LOCALE)) {
      languages["x-default"] = languages[DEFAULT_LOCALE];
    }
    for (const r of renditions) {
      const lastModified = new Date(r.frontmatter.updatedAt ?? r.frontmatter.publishedAt);
      out.push({
        url: urlFor(r.locale, `/blog/${r.slug}`),
        lastModified,
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: { languages },
      });
    }
  }
  return out;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [...staticEntries(now), ...categoryEntries(now), ...articleEntries()];
}
