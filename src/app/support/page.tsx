import type { Metadata } from "next";
import { SupportContent } from "@/components/SupportContent";
import { DEFAULT_LOCALE, getMessages } from "@/i18n";
import { pageMetadata } from "@/lib/metadata";

export function generateMetadata(): Metadata {
  const m = getMessages(DEFAULT_LOCALE).support;
  return pageMetadata({
    locale: DEFAULT_LOCALE,
    title: `${m.title} — Buppi Baby`,
    description: `${m.intro.before}${m.intro.emailLabel}${m.intro.after}`,
    path: "/support/",
  });
}

export default function SupportPage() {
  return <SupportContent locale={DEFAULT_LOCALE} />;
}
