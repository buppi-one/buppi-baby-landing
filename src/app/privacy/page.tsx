import type { Metadata } from "next";
import { PrivacyContent } from "@/components/PrivacyContent";
import { DEFAULT_LOCALE, getMessages } from "@/i18n";
import { pageMetadata } from "@/lib/metadata";

export function generateMetadata(): Metadata {
  const m = getMessages(DEFAULT_LOCALE).privacy;
  return pageMetadata({
    locale: DEFAULT_LOCALE,
    title: `${m.title} — Buppi Baby`,
    description: m.intro,
    path: "/privacy/",
  });
}

export default function PrivacyPage() {
  return <PrivacyContent locale={DEFAULT_LOCALE} />;
}
