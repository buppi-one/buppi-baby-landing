import type { Metadata } from "next";
import { TermsContent } from "@/components/TermsContent";
import { DEFAULT_LOCALE, getMessages } from "@/i18n";

const m = getMessages(DEFAULT_LOCALE).terms;

export const metadata: Metadata = {
  title: `${m.title} — Buppi Baby`,
  description: m.intro,
};

export default function TermsPage() {
  return <TermsContent locale={DEFAULT_LOCALE} />;
}
