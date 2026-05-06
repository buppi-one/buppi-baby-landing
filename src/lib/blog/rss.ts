import { getArticlesByLocale } from "./loader";
import { getMessages, type Locale } from "@/i18n";

const SITE_URL = "https://buppi.baby";
const MAX_ITEMS = 20;

const LANG_TAG: Record<Locale, string> = {
  "pt-BR": "pt-BR",
  en: "en-US",
  es: "es-ES",
  fr: "fr-FR",
};

function escape(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function articleUrl(locale: Locale, slug: string): string {
  return `${SITE_URL}${locale === "pt-BR" ? "" : `/${locale}`}/blog/${slug}/`;
}

function feedUrl(locale: Locale): string {
  return `${SITE_URL}${locale === "pt-BR" ? "" : `/${locale}`}/blog/feed.xml`;
}

export function buildRssFeed(locale: Locale): string {
  const m = getMessages(locale).blog;
  const articles = getArticlesByLocale(locale).slice(0, MAX_ITEMS);
  const lastBuildDate = articles[0]
    ? new Date(articles[0].frontmatter.publishedAt).toUTCString()
    : new Date().toUTCString();

  const items = articles
    .map((a) => {
      const link = articleUrl(a.locale, a.slug);
      const pubDate = new Date(a.frontmatter.publishedAt).toUTCString();
      return `    <item>
      <title>${escape(a.frontmatter.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escape(a.frontmatter.description)}</description>
    </item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Buppi Baby — ${escape(m.title)}</title>
    <link>${SITE_URL}${locale === "pt-BR" ? "" : `/${locale}`}/blog/</link>
    <atom:link href="${feedUrl(locale)}" rel="self" type="application/rss+xml" />
    <description>${escape(m.description)}</description>
    <language>${LANG_TAG[locale]}</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
${items}
  </channel>
</rss>
`;
}
