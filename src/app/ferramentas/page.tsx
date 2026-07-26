import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { ToolsIndex } from "@/components/tools/ToolsIndex";
import { DEFAULT_LOCALE, getMessages } from "@/i18n";
import { pageMetadata } from "@/lib/metadata";

export function generateMetadata(): Metadata {
  const m = getMessages(DEFAULT_LOCALE).tools;
  return pageMetadata({
    locale: DEFAULT_LOCALE,
    title: `${m.title} — Buppi Baby`,
    description: m.description,
    path: "/ferramentas/",
  });
}

export default function ToolsHubPage() {
  return (
    <>
      <Nav locale={DEFAULT_LOCALE} />
      <main>
        <ToolsIndex locale={DEFAULT_LOCALE} />
      </main>
      <Footer locale={DEFAULT_LOCALE} />
    </>
  );
}
