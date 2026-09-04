import type { Metadata } from "next";
import type { Locale } from "@/i18n";
import { getAlternatesMap } from "./loader";
import type { Article } from "./types";

const SITE_URL = "https://buppi.baby";
const OG_LOCALE: Record<Locale, string> = {
  "pt-BR": "pt_BR",
  en: "en_US",
  es: "es_ES",
  fr: "fr_FR",
};

function pathFor(locale: Locale, slug: string): string {
  return locale === "pt-BR" ? `/blog/${slug}/` : `/${locale}/blog/${slug}/`;
}

export function buildArticleMetadata(article: Article): Metadata {
  const alternatesMap = getAlternatesMap()[article.id] ?? {};
  const languages: Record<string, string> = {};
  for (const [locale, slug] of Object.entries(alternatesMap)) {
    if (slug) languages[locale] = pathFor(locale as Locale, slug);
  }
  if (alternatesMap["pt-BR"]) {
    languages["x-default"] = pathFor("pt-BR", alternatesMap["pt-BR"]);
  }

  const canonical = pathFor(article.locale, article.slug);
  const cover = article.frontmatter.cover
    ? `/blog/${article.id}/${article.frontmatter.cover.replace(/^\.\//, "")}`
    : "/og-image.png";
  const ogImage = `${SITE_URL}${cover}`;

  return {
    title: article.frontmatter.title,
    description: article.frontmatter.description,
    alternates: {
      canonical,
      languages,
      types: { "text/markdown": `${canonical}index.md` },
    },
    openGraph: {
      type: "article",
      title: article.frontmatter.title,
      description: article.frontmatter.description,
      url: `${SITE_URL}${canonical}`,
      images: [{ url: ogImage }],
      locale: OG_LOCALE[article.locale],
      publishedTime: article.frontmatter.publishedAt,
      modifiedTime: article.frontmatter.updatedAt ?? article.frontmatter.publishedAt,
      tags: article.frontmatter.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: article.frontmatter.title,
      description: article.frontmatter.description,
      images: [ogImage],
    },
  };
}
