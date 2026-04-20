import type { Metadata } from "next";
import { SupportContent } from "@/components/SupportContent";
import { DEFAULT_LOCALE, getMessages } from "@/i18n";

const m = getMessages(DEFAULT_LOCALE).support;

export const metadata: Metadata = {
  title: `${m.title} — Buppi Baby`,
  description: `${m.intro.before}${m.intro.emailLabel}${m.intro.after}`,
};

export default function SupportPage() {
  return <SupportContent locale={DEFAULT_LOCALE} />;
}
