"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BIcon, type BIconName } from "@/components/BIcon";
import {
  getMessages,
  LOCALES,
  LOCALE_FLAGS,
  LOCALE_LABELS,
  localePath,
  stripLocale,
  type Locale,
} from "@/i18n";

type Theme = "light" | "dark" | "system";
const THEME_ICONS: Record<Theme, BIconName> = {
  light: "sun",
  dark: "moon",
  system: "globe",
};

function applyTheme(theme: Theme) {
  const effective =
    theme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme;
  document.documentElement.classList.toggle("dark", effective === "dark");
}

export function Nav({ locale }: { locale: Locale }) {
  const m = getMessages(locale).nav;
  const blogTitle = getMessages(locale).blog.title;
  const pathname = usePathname() || "/";
  const cleanPath = stripLocale(pathname);

  const [theme, setTheme] = useState<Theme>("system");
  const [themeOpen, setThemeOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [pageAlternates, setPageAlternates] = useState<
    Partial<Record<Locale, string>>
  >({});
  const themeRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = (localStorage.getItem("theme") as Theme) || "system";
    setTheme(saved);
    applyTheme(saved);
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = () => {
      if ((localStorage.getItem("theme") as Theme) === "system") applyTheme("system");
    };
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  useEffect(() => {
    const links = document.querySelectorAll<HTMLLinkElement>(
      'link[rel="alternate"][hreflang]',
    );
    const map: Partial<Record<Locale, string>> = {};
    links.forEach((link) => {
      const lang = link.hreflang;
      if (!lang || lang === "x-default") return;
      if (!(LOCALES as readonly string[]).includes(lang)) return;
      try {
        const url = new URL(link.href, window.location.origin);
        map[lang as Locale] = url.pathname + url.search + url.hash;
      } catch {}
    });
    setPageAlternates(map);
  }, [pathname]);

  const hrefForLocale = (l: Locale): string =>
    pageAlternates[l] ?? localePath(l, cleanPath);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (themeRef.current && !themeRef.current.contains(e.target as Node))
        setThemeOpen(false);
      if (langRef.current && !langRef.current.contains(e.target as Node))
        setLangOpen(false);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const chooseTheme = (next: Theme) => {
    localStorage.setItem("theme", next);
    setTheme(next);
    applyTheme(next);
    setThemeOpen(false);
  };

  const navLinks = (
    <>
      <a
        className="hover:text-[var(--color-primary-dark)] dark:hover:text-[var(--color-primary)] transition-colors"
        href={`${localePath(locale, "/")}#funcionalidades`}
        onClick={() => setMobileOpen(false)}
      >
        {m.features}
      </a>
      <a
        className="hover:text-[var(--color-primary-dark)] dark:hover:text-[var(--color-primary)] transition-colors"
        href={`${localePath(locale, "/")}#familia`}
        onClick={() => setMobileOpen(false)}
      >
        {m.sharing}
      </a>
      <a
        className="hover:text-[var(--color-primary-dark)] dark:hover:text-[var(--color-primary)] transition-colors"
        href={localePath(locale, "/blog")}
        onClick={() => setMobileOpen(false)}
      >
        {blogTitle}
      </a>
    </>
  );

  return (
    <nav className="sticky top-0 z-50 border-b border-[var(--color-border-warm)] dark:border-[var(--color-border-dark)] bg-[rgba(250,249,246,0.85)] dark:bg-[rgba(24,24,40,0.8)] backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 lg:px-14 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <a href={localePath(locale, "/")} className="flex items-center gap-2">
            <picture>
              <source
                type="image/webp"
                srcSet="/logo-full.webp 1x, /logo-full-2x.webp 2x"
              />
              <img
                src="/logo-full-fallback.png"
                alt="Buppi Baby"
                width={140}
                height={73}
                className="h-9 w-auto"
              />
            </picture>
          </a>
          <div className="hidden md:flex items-center gap-5 lg:gap-7 text-sm font-medium text-[var(--color-fg-secondary)]">
            {navLinks}
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={mobileOpen}
            className="md:hidden w-9 h-9 rounded-full bg-white dark:bg-[var(--color-surface-dark)] border border-[var(--color-border-warm)] dark:border-[var(--color-border-dark)] flex items-center justify-center hover:bg-[var(--color-surface-elevated)] dark:hover:bg-[var(--color-surface-elevated-dark)] transition-colors text-[var(--color-fg-secondary)]"
          >
            <BIcon name={mobileOpen ? "plus" : "menu"} size={16} className={mobileOpen ? "rotate-45" : ""} />
          </button>
          <div className="relative" ref={langRef}>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLangOpen((v) => !v);
                setThemeOpen(false);
              }}
              aria-label={m.languageAria}
              className="w-9 h-9 rounded-full bg-white dark:bg-[var(--color-surface-dark)] border border-[var(--color-border-warm)] dark:border-[var(--color-border-dark)] flex items-center justify-center hover:bg-[var(--color-surface-elevated)] dark:hover:bg-[var(--color-surface-elevated-dark)] transition-colors text-base"
            >
              {LOCALE_FLAGS[locale]}
            </button>
            {langOpen && (
              <div className="absolute right-0 top-11 bg-white dark:bg-[var(--color-surface-dark)] rounded-2xl shadow-xl border border-[var(--color-border-warm)] dark:border-[var(--color-border-dark)] py-2 min-w-[180px] z-50">
                {LOCALES.map((l) => (
                  <a
                    key={l}
                    href={hrefForLocale(l)}
                    onClick={() => {
                      try {
                        localStorage.setItem("locale", l);
                      } catch {}
                    }}
                    className={`block px-4 py-2 text-sm hover:bg-[var(--color-surface-elevated)] dark:hover:bg-[var(--color-surface-elevated-dark)] transition-colors ${
                      locale === l
                        ? "text-[var(--color-primary-dark)] dark:text-[var(--color-primary)] font-semibold"
                        : ""
                    }`}
                  >
                    <span className="mr-2">{LOCALE_FLAGS[l]}</span>
                    {LOCALE_LABELS[l]}
                  </a>
                ))}
              </div>
            )}
          </div>
          <div className="relative" ref={themeRef}>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setThemeOpen((v) => !v);
                setLangOpen(false);
              }}
              aria-label={m.themeAria}
              className="w-9 h-9 rounded-full bg-white dark:bg-[var(--color-surface-dark)] border border-[var(--color-border-warm)] dark:border-[var(--color-border-dark)] flex items-center justify-center hover:bg-[var(--color-surface-elevated)] dark:hover:bg-[var(--color-surface-elevated-dark)] transition-colors text-[var(--color-fg-secondary)]"
            >
              <BIcon name={THEME_ICONS[theme]} size={16} />
            </button>
            {themeOpen && (
              <div className="absolute right-0 top-11 bg-white dark:bg-[var(--color-surface-dark)] rounded-2xl shadow-xl border border-[var(--color-border-warm)] dark:border-[var(--color-border-dark)] py-2 min-w-[140px] z-50">
                {(["light", "dark", "system"] as Theme[]).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => chooseTheme(t)}
                    className={`w-full px-4 py-2 text-left text-sm hover:bg-[var(--color-surface-elevated)] dark:hover:bg-[var(--color-surface-elevated-dark)] flex items-center gap-3 transition-colors ${
                      theme === t
                        ? "text-[var(--color-primary-dark)] dark:text-[var(--color-primary)] font-medium"
                        : ""
                    }`}
                  >
                    <BIcon name={THEME_ICONS[t]} size={14} />
                    {m.theme[t]}
                  </button>
                ))}
              </div>
            )}
          </div>
          <a
            className="hidden sm:inline-flex bg-[var(--color-primary-dark)] hover:opacity-90 text-white px-4 sm:px-5 py-2 rounded-xl font-semibold transition-all shadow-lg shadow-[var(--color-primary)]/25 text-sm items-center"
            href={`${localePath(locale, "/")}#baixar`}
          >
            {m.download}
          </a>
        </div>
      </div>

      {/* Mobile menu drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[var(--color-border-warm)] dark:border-[var(--color-border-dark)] bg-white dark:bg-[var(--color-surface-dark)]">
          <div className="px-6 py-5 flex flex-col gap-4 text-base font-medium text-[var(--color-fg)] dark:text-white">
            {navLinks}
            <a
              className="sm:hidden mt-2 inline-flex bg-[var(--color-primary-dark)] hover:opacity-90 text-white px-5 py-2.5 rounded-xl font-semibold text-sm justify-center"
              href={`${localePath(locale, "/")}#baixar`}
              onClick={() => setMobileOpen(false)}
            >
              {m.download}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
