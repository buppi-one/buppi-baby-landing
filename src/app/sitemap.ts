import type { MetadataRoute } from "next";
import { LOCALES, DEFAULT_LOCALE, localePath } from "@/i18n";

const BASE_URL = "https://buppi.baby";
const PATHS = ["/", "/privacy", "/terms", "/support", "/delete-account"];

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return PATHS.flatMap((path) =>
    LOCALES.map((locale) => {
      const localized = localePath(locale, path);
      const url = `${BASE_URL}${localized === "/" ? "" : localized}/`;
      const alternates = Object.fromEntries(
        LOCALES.map((l) => {
          const lp = localePath(l, path);
          return [l, `${BASE_URL}${lp === "/" ? "" : lp}/`];
        }),
      );
      alternates["x-default"] =
        `${BASE_URL}${localePath(DEFAULT_LOCALE, path) === "/" ? "" : localePath(DEFAULT_LOCALE, path)}/`;
      return {
        url,
        lastModified,
        changeFrequency: "monthly" as const,
        priority: path === "/" ? 1 : 0.7,
        alternates: { languages: alternates },
      };
    }),
  );
}
