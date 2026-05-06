import type { Metadata } from "next";
import { BlogIndex } from "@/components/blog/BlogIndex";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { DEFAULT_LOCALE, getMessages } from "@/i18n";
import { pageMetadata } from "@/lib/metadata";

export function generateMetadata(): Metadata {
  const m = getMessages(DEFAULT_LOCALE).blog;
  const meta = pageMetadata({
    locale: DEFAULT_LOCALE,
    title: `${m.title} — Buppi Baby`,
    description: m.description,
    path: "/blog/",
  });
  return {
    ...meta,
    alternates: {
      ...meta.alternates,
      types: {
        "application/rss+xml": [{ url: "/blog/feed.xml", title: m.title }],
      },
    },
  };
}

export default function BlogIndexPage() {
  return (
    <>
      <Nav locale={DEFAULT_LOCALE} />
      <main>
        <BlogIndex locale={DEFAULT_LOCALE} />
      </main>
      <Footer locale={DEFAULT_LOCALE} />
    </>
  );
}
