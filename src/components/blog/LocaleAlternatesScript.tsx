import type { Locale } from "@/i18n";

/**
 * Server component that injects `window.__pageAlternates` — a map from
 * locale to fully-resolved URL path — for the current page. The Nav
 * language switcher reads this when present and routes to the right
 * URL instead of just swapping the locale prefix (which would 404 on
 * pages with per-locale slugs like blog articles and categories).
 *
 * No-op when alternates is missing or has only one entry.
 */
export function LocaleAlternatesScript({
  alternates,
}: {
  alternates: Partial<Record<Locale, string>>;
}) {
  const entries = Object.entries(alternates).filter(([, v]) => Boolean(v));
  if (entries.length === 0) return null;
  const payload = `window.__pageAlternates=${JSON.stringify(Object.fromEntries(entries))};`;
  return <script dangerouslySetInnerHTML={{ __html: payload }} />;
}
