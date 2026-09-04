import type { Metadata } from "next";
import { LOCALES, type Locale } from "@/i18n";

const SITE_URL = "https://buppi.baby";

const OG_LOCALE: Record<Locale, string> = {
  "pt-BR": "pt_BR",
  en: "en_US",
  es: "es_ES",
  fr: "fr_FR",
};

function pathFor(locale: Locale, path: string): string {
  // Path comes in as "/", "/blog/", "/privacy/", etc. Always with leading and
  // trailing slash. We prefix the locale for non-default locales.
  if (locale === "pt-BR") return path;
  return `/${locale}${path === "/" ? "" : path}` + (path.endsWith("/") ? "" : "/");
}

type PageMetadataInput = {
  locale: Locale;
  /** Final <title>. The caller may already include " — Buppi Baby". */
  title: string;
  /** Plain text — used for meta description, OG and Twitter description. */
  description: string;
  /** Override the OG image URL (path or absolute). */
  image?: string;
} & (
  | {
      /** Single path (e.g. "/blog/"). Locale prefix applied automatically. */
      path: string;
      paths?: never;
    }
  | {
      path?: never;
      /** Per-locale path map (e.g. category pages with translated slugs). */
      paths: Record<Locale, string>;
    }
);

/**
 * Build a fully-localized Metadata object — title, description, canonical,
 * hreflang alternates, OpenGraph and Twitter card. Use this from every page's
 * generateMetadata so each locale gets its own social preview.
 */
export function pageMetadata({
  locale,
  title,
  description,
  image = "/og-image.png",
  ...rest
}: PageMetadataInput): Metadata {
  const resolveFor = (l: Locale): string =>
    "paths" in rest && rest.paths ? rest.paths[l] : pathFor(l, rest.path!);

  const canonical = resolveFor(locale);
  const languages: Record<string, string> = {};
  for (const l of LOCALES) languages[l] = resolveFor(l);
  languages["x-default"] = resolveFor("pt-BR");

  const ogImage = image.startsWith("http") ? image : `${SITE_URL}${image}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages,
      types: { "text/markdown": `${canonical}index.md` },
    },
    openGraph: {
      type: "website",
      title,
      description,
      url: `${SITE_URL}${canonical}`,
      images: [{ url: ogImage, width: 1200, height: 630 }],
      locale: OG_LOCALE[locale],
      alternateLocale: LOCALES.filter((l) => l !== locale).map(
        (l) => OG_LOCALE[l],
      ),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
