import type { Metadata } from "next";
import { PrivacyContent } from "@/components/PrivacyContent";
import { DEFAULT_LOCALE, getMessages } from "@/i18n";

const m = getMessages(DEFAULT_LOCALE).privacy;

export const metadata: Metadata = {
  title: `${m.title} — Buppi Baby`,
  description: m.intro,
};

export default function PrivacyPage() {
  return <PrivacyContent locale={DEFAULT_LOCALE} />;
}
