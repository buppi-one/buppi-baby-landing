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
 * Default locale lives at the root (/, /privacy). Other locales are prefixed.
 *   localePath('pt-BR', '/privacy') → '/privacy'
 *   localePath('en', '/privacy')    → '/en/privacy'
 *   localePath('en', '/')           → '/en'
 */
export function localePath(locale: Locale, path: string): string {
  const clean = path === "/" ? "" : path;
  if (locale === DEFAULT_LOCALE) return clean || "/";
  return `/${locale}${clean}`;
}

/** Strip a leading locale prefix from a pathname. */
export function stripLocale(pathname: string): string {
  const match = pathname.match(/^\/(en|es|fr)(\/.*)?$/);
  if (!match) return pathname;
  return match[2] || "/";
}
