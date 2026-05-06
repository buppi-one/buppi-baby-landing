import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogIndex } from "@/components/blog/BlogIndex";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { CATEGORIES, categoryFromUrlSlug } from "@/lib/blog/categories";
import { getArticlesByLocale } from "@/lib/blog/loader";
import { DEFAULT_LOCALE } from "@/i18n";

export const dynamicParams = false;

export function generateStaticParams() {
  const used = new Set<string>(
    getArticlesByLocale(DEFAULT_LOCALE).map((a) => a.frontmatter.category),
  );
  return Array.from(used).map((c) => ({
    cat: CATEGORIES[c as keyof typeof CATEGORIES].urlSlug[DEFAULT_LOCALE],
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ cat: string }>;
}): Promise<Metadata> {
  const { cat } = await params;
  const slug = categoryFromUrlSlug(DEFAULT_LOCALE, cat);
  if (!slug) return {};
  const meta = CATEGORIES[slug];
  const languages: Record<string, string> = {};
  for (const [loc, urlSlug] of Object.entries(meta.urlSlug)) {
    languages[loc] =
      loc === "pt-BR" ? `/blog/category/${urlSlug}/` : `/${loc}/blog/category/${urlSlug}/`;
  }
  languages["x-default"] = `/blog/category/${meta.urlSlug["pt-BR"]}/`;
  return {
    title: meta.label[DEFAULT_LOCALE],
    alternates: {
      canonical: `/blog/category/${meta.urlSlug[DEFAULT_LOCALE]}/`,
      languages,
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ cat: string }>;
}) {
  const { cat } = await params;
  const slug = categoryFromUrlSlug(DEFAULT_LOCALE, cat);
  if (!slug) notFound();
  return (
    <>
      <Nav locale={DEFAULT_LOCALE} />
      <main>
        <BlogIndex
          locale={DEFAULT_LOCALE}
          category={slug}
          heading={CATEGORIES[slug].label[DEFAULT_LOCALE]}
        />
      </main>
      <Footer locale={DEFAULT_LOCALE} />
    </>
  );
}
