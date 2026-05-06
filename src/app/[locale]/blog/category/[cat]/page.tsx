import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogIndex } from "@/components/blog/BlogIndex";
import { LocaleAlternatesScript } from "@/components/blog/LocaleAlternatesScript";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import {
  CATEGORIES,
  categoryAlternateUrls,
  categoryFromUrlSlug,
} from "@/lib/blog/categories";
import { getArticlesByLocale } from "@/lib/blog/loader";
import { isLocale } from "@/i18n";

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
  const languages: Record<string, string> = {};
  for (const [loc, urlSlug] of Object.entries(meta.urlSlug)) {
    languages[loc] =
      loc === "pt-BR" ? `/blog/category/${urlSlug}/` : `/${loc}/blog/category/${urlSlug}/`;
  }
  languages["x-default"] = `/blog/category/${meta.urlSlug["pt-BR"]}/`;
  return {
    title: meta.label[locale],
    alternates: {
      canonical: `/${locale}/blog/category/${meta.urlSlug[locale]}/`,
      languages,
    },
  };
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
      <LocaleAlternatesScript alternates={categoryAlternateUrls(slug)} />
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
