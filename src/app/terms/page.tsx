import type { Metadata } from "next";
import { TermsContent } from "@/components/TermsContent";
import { DEFAULT_LOCALE, getMessages } from "@/i18n";
import { pageMetadata } from "@/lib/metadata";

export function generateMetadata(): Metadata {
  const m = getMessages(DEFAULT_LOCALE).terms;
  return pageMetadata({
    locale: DEFAULT_LOCALE,
    title: `${m.title} — Buppi Baby`,
    description: m.intro,
    path: "/terms/",
  });
}

export default function TermsPage() {
  return <TermsContent locale={DEFAULT_LOCALE} />;
}
