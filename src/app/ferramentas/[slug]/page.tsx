import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { ToolPage } from "@/components/tools/ToolPage";
import { DEFAULT_LOCALE } from "@/i18n";
import { pageMetadata } from "@/lib/metadata";
import { TOOLS, getToolBySlug, toolPaths } from "@/lib/tools/registry";

export const dynamicParams = false;

export function generateStaticParams() {
  return TOOLS.map((t) => ({ slug: t.slug[DEFAULT_LOCALE] }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(DEFAULT_LOCALE, slug);
  if (!tool) return {};
  const c = tool.content[DEFAULT_LOCALE];
  return pageMetadata({
    locale: DEFAULT_LOCALE,
    title: `${c.title} — Buppi Baby`,
    description: c.description,
    paths: toolPaths(tool),
  });
}

export default async function ToolDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = getToolBySlug(DEFAULT_LOCALE, slug);
  if (!tool) notFound();
  return (
    <>
      <Nav locale={DEFAULT_LOCALE} />
      <main>
        <ToolPage locale={DEFAULT_LOCALE} tool={tool} />
      </main>
      <Footer locale={DEFAULT_LOCALE} />
    </>
  );
}
