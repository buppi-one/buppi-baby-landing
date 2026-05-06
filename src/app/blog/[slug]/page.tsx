import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { Article } from "@/components/blog/Article";
import { RedirectScript } from "@/components/blog/RedirectScript";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import { DEFAULT_LOCALE } from "@/i18n";
import {
  getAlternatesMap,
  getArticle,
  getArticlesByLocale,
} from "@/lib/blog/loader";
import { buildArticleMetadata } from "@/lib/blog/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return getArticlesByLocale(DEFAULT_LOCALE).map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(DEFAULT_LOCALE, slug);
  if (!article) return {};
  return buildArticleMetadata(article);
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(DEFAULT_LOCALE, slug);
  if (!article) notFound();
  return (
    <>
      <Nav locale={DEFAULT_LOCALE} />
      <main>
        <RedirectScript articleId={article.id} alternates={getAlternatesMap()} />
        <Article article={article} />
        <RelatedPosts current={article} />
      </main>
      <Footer locale={DEFAULT_LOCALE} />
    </>
  );
}
