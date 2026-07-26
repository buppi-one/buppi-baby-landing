import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { ToolPage } from "@/components/tools/ToolPage";
import { isLocale, type Locale } from "@/i18n";
import { pageMetadata } from "@/lib/metadata";
import { TOOLS, getToolBySlug, toolPaths } from "@/lib/tools/registry";

const SUPPORTED = ["en", "es", "fr"] as const;
type RouteLocale = (typeof SUPPORTED)[number];

export const dynamicParams = false;

export function generateStaticParams() {
  const params: { locale: RouteLocale; slug: string }[] = [];
  for (const locale of SUPPORTED) {
    for (const t of TOOLS) params.push({ locale, slug: t.slug[locale] });
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const tool = getToolBySlug(locale, slug);
  if (!tool) return {};
  const c = tool.content[locale];
  return pageMetadata({
    locale,
    title: `${c.title} — Buppi Baby`,
    description: c.description,
    paths: toolPaths(tool),
  });
}

export default async function LocalizedToolDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!SUPPORTED.includes(locale as RouteLocale)) notFound();
  const tool = getToolBySlug(locale as Locale, slug);
  if (!tool) notFound();
  return (
    <>
      <Nav locale={locale as RouteLocale} />
      <main>
        <ToolPage locale={locale as RouteLocale} tool={tool} />
      </main>
      <Footer locale={locale as RouteLocale} />
    </>
  );
}
