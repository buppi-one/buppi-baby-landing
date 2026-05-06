import type { Metadata } from "next";
import { DeleteAccountContent } from "@/components/DeleteAccountContent";
import { DEFAULT_LOCALE, getMessages } from "@/i18n";
import { pageMetadata } from "@/lib/metadata";

export function generateMetadata(): Metadata {
  const m = getMessages(DEFAULT_LOCALE).deleteAccount;
  return pageMetadata({
    locale: DEFAULT_LOCALE,
    title: `${m.title} — Buppi Baby`,
    description: m.intro,
    path: "/delete-account/",
  });
}

export default function DeleteAccountPage() {
  return <DeleteAccountContent locale={DEFAULT_LOCALE} />;
}
