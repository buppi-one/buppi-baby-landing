import { buildRssFeed } from "@/lib/blog/rss";
import { DEFAULT_LOCALE } from "@/i18n";

export const dynamic = "force-static";

export function GET() {
  return new Response(buildRssFeed(DEFAULT_LOCALE), {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
