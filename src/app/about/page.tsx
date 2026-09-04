import type { Metadata } from "next";
import { AboutContent } from "@/components/AboutContent";
import { DEFAULT_LOCALE, getMessages } from "@/i18n";
import { pageMetadata } from "@/lib/metadata";

export function generateMetadata(): Metadata {
  const m = getMessages(DEFAULT_LOCALE).about;
  return pageMetadata({
    locale: DEFAULT_LOCALE,
    title: `${m.title} — Buppi Baby`,
    description: m.intro,
    path: "/about/",
  });
}

export default function AboutPage() {
  return <AboutContent locale={DEFAULT_LOCALE} />;
}
