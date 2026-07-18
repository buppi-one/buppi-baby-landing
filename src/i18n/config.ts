export const LOCALES = ["pt-BR", "en", "es", "fr"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "pt-BR";

export const LOCALE_LABELS: Record<Locale, string> = {
  "pt-BR": "Português",
  en: "English",
  es: "Español",
  fr: "Français",
};

export const LOCALE_FLAGS: Record<Locale, string> = {
  "pt-BR": "🇧🇷",
  en: "🇺🇸",
  es: "🇪🇸",
  fr: "🇫🇷",
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/**
 * Default locale lives at the root (/, /privacy/). Other locales are prefixed.
 * Always returns a canonical path with a single trailing slash — the site uses
 * Next's `trailingSlash: true`, so a link without it 301-redirects, which shows
 * up in Search Console as "Page with redirect".
 *   localePath('pt-BR', '/privacy') → '/privacy/'
 *   localePath('en', '/privacy')    → '/en/privacy/'
 *   localePath('en', '/')           → '/en/'
 *   localePath('pt-BR', '/')        → '/'
 */
export function localePath(locale: Locale, path: string): string {
  const trimmed = path.replace(/^\/+|\/+$/g, ""); // drop leading/trailing slashes
  const prefix = locale === DEFAULT_LOCALE ? "" : `/${locale}`;
  const full = trimmed ? `${prefix}/${trimmed}` : prefix;
  return `${full}/`;
}

/** Strip a leading locale prefix from a pathname. */
export function stripLocale(pathname: string): string {
  const match = pathname.match(/^\/(en|es|fr)(\/.*)?$/);
  if (!match) return pathname;
  return match[2] || "/";
}
