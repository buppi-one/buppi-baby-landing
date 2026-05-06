import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogIndex } from "@/components/blog/BlogIndex";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { CATEGORIES, categoryFromUrlSlug } from "@/lib/blog/categories";
import { getArticlesByLocale } from "@/lib/blog/loader";
import { getMessages, isLocale, LOCALES, type Locale } from "@/i18n";
import { pageMetadata } from "@/lib/metadata";

const SUPPORTED = ["en", "es", "fr"] as const;
type RouteLocale = (typeof SUPPORTED)[number];

export const dynamicParams = false;

export function generateStaticParams() {
  return SUPPORTED.flatMap((locale) => {
    const used = new Set<string>(
      getArticlesByLocale(locale).map((a) => a.frontmatter.category),
    );
    return Array.from(used).map((c) => ({
      locale,
      cat: CATEGORIES[c as keyof typeof CATEGORIES].urlSlug[locale],
    }));
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; cat: string }>;
}): Promise<Metadata> {
  const { locale, cat } = await params;
  if (!isLocale(locale)) return {};
  const slug = categoryFromUrlSlug(locale, cat);
  if (!slug) return {};
  const meta = CATEGORIES[slug];
  const paths = {} as Record<Locale, string>;
  for (const l of LOCALES) {
    const localized = `/blog/category/${meta.urlSlug[l]}/`;
    paths[l] = l === "pt-BR" ? localized : `/${l}${localized}`;
  }
  const blog = getMessages(locale).blog;
  return pageMetadata({
    locale,
    title: `${meta.label[locale]} — ${blog.title} · Buppi Baby`,
    description: blog.description,
    paths,
  });
}

export default async function LocalizedCategoryPage({
  params,
}: {
  params: Promise<{ locale: string; cat: string }>;
}) {
  const { locale, cat } = await params;
  if (!SUPPORTED.includes(locale as RouteLocale)) notFound();
  const slug = categoryFromUrlSlug(locale as RouteLocale, cat);
  if (!slug) notFound();
  return (
    <>
      <Nav locale={locale as RouteLocale} />
      <main>
        <BlogIndex
          locale={locale as RouteLocale}
          category={slug}
          heading={CATEGORIES[slug].label[locale as RouteLocale]}
        />
      </main>
      <Footer locale={locale as RouteLocale} />
    </>
  );
}
