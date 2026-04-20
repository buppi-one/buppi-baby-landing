import type { Metadata } from "next";
import { DeleteAccountContent } from "@/components/DeleteAccountContent";
import { DEFAULT_LOCALE, getMessages } from "@/i18n";

const m = getMessages(DEFAULT_LOCALE).deleteAccount;

export const metadata: Metadata = {
  title: `${m.title} — Buppi Baby`,
  description: m.intro,
};

export default function DeleteAccountPage() {
  return <DeleteAccountContent locale={DEFAULT_LOCALE} />;
}
