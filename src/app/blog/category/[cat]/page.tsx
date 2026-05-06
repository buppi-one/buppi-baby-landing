import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogIndex } from "@/components/blog/BlogIndex";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { CATEGORIES, categoryFromUrlSlug } from "@/lib/blog/categories";
import { getArticlesByLocale } from "@/lib/blog/loader";
import { DEFAULT_LOCALE, getMessages, LOCALES, type Locale } from "@/i18n";
import { pageMetadata } from "@/lib/metadata";

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
  const paths = {} as Record<Locale, string>;
  for (const l of LOCALES) {
    const localized = `/blog/category/${meta.urlSlug[l]}/`;
    paths[l] = l === "pt-BR" ? localized : `/${l}${localized}`;
  }
  const blog = getMessages(DEFAULT_LOCALE).blog;
  return pageMetadata({
    locale: DEFAULT_LOCALE,
    title: `${meta.label[DEFAULT_LOCALE]} — ${blog.title} · Buppi Baby`,
    description: blog.description,
    paths,
  });
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
