import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { ToolsIndex } from "@/components/tools/ToolsIndex";
import { getMessages, isLocale } from "@/i18n";
import { pageMetadata } from "@/lib/metadata";

const SUPPORTED = ["en", "es", "fr"] as const;
type RouteLocale = (typeof SUPPORTED)[number];

export const dynamicParams = false;

export function generateStaticParams() {
  return SUPPORTED.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const m = getMessages(locale).tools;
  return pageMetadata({
    locale,
    title: `${m.title} — Buppi Baby`,
    description: m.description,
    path: "/ferramentas/",
  });
}

export default async function LocalizedToolsHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!SUPPORTED.includes(locale as RouteLocale)) notFound();
  return (
    <>
      <Nav locale={locale as RouteLocale} />
      <main>
        <ToolsIndex locale={locale as RouteLocale} />
      </main>
      <Footer locale={locale as RouteLocale} />
    </>
  );
}
