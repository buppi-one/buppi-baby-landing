import type { Metadata } from "next";
import { CreatorsLanding } from "@/components/creators/Creators";
import { DEFAULT_LOCALE } from "@/i18n";
import { CREATORS_PATH, getCreatorsMessages } from "@/i18n/creators";
import { pageMetadata } from "@/lib/metadata";

export function generateMetadata(): Metadata {
  const m = getCreatorsMessages(DEFAULT_LOCALE);
  return pageMetadata({
    locale: DEFAULT_LOCALE,
    title: m.metaTitle,
    description: m.metaDescription,
    path: CREATORS_PATH,
  });
}

export default function CreatorsPage() {
  return <CreatorsLanding locale={DEFAULT_LOCALE} />;
}
