import { buildRssFeed } from "@/lib/blog/rss";
import { isLocale } from "@/i18n";

const SUPPORTED = ["en", "es", "fr"] as const;
type RouteLocale = (typeof SUPPORTED)[number];

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return SUPPORTED.map((locale) => ({ locale }));
}

export async function GET(
  _: Request,
  { params }: { params: Promise<{ locale: string }> },
) {
  const { locale } = await params;
  if (!isLocale(locale) || !SUPPORTED.includes(locale as RouteLocale)) {
    return new Response("Not found", { status: 404 });
  }
  return new Response(buildRssFeed(locale as RouteLocale), {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
