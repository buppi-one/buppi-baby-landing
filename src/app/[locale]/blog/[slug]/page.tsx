import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { Article } from "@/components/blog/Article";
import { RedirectScript } from "@/components/blog/RedirectScript";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import { isLocale } from "@/i18n";
import { getAlternatesMap, getArticle, getArticlesByLocale } from "@/lib/blog/loader";
import { buildArticleMetadata } from "@/lib/blog/metadata";

const SUPPORTED = ["en", "es", "fr"] as const;
type RouteLocale = (typeof SUPPORTED)[number];

export const dynamicParams = false;

export function generateStaticParams() {
  return SUPPORTED.flatMap((locale) =>
    getArticlesByLocale(locale).map((a) => ({ locale, slug: a.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const article = getArticle(locale, slug);
  if (!article) return {};
  return buildArticleMetadata(article);
}

export default async function LocalizedBlogArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!SUPPORTED.includes(locale as RouteLocale)) notFound();
  const article = getArticle(locale as RouteLocale, slug);
  if (!article) notFound();
  return (
    <>
      <Nav locale={locale as RouteLocale} />
      <main>
        <RedirectScript articleId={article.id} alternates={getAlternatesMap()} />
        <Article article={article} />
        <RelatedPosts current={article} />
      </main>
      <Footer locale={locale as RouteLocale} />
    </>
  );
}
