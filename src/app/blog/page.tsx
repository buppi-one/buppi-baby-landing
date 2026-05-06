import type { Metadata } from "next";
import { BlogIndex } from "@/components/blog/BlogIndex";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { DEFAULT_LOCALE, getMessages } from "@/i18n";

export function generateMetadata(): Metadata {
  const m = getMessages(DEFAULT_LOCALE).blog;
  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: "/blog/",
      languages: {
        "pt-BR": "/blog/",
        en: "/en/blog/",
        es: "/es/blog/",
        fr: "/fr/blog/",
        "x-default": "/blog/",
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
