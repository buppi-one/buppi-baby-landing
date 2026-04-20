"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
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
const THEME_ICONS: Record<Theme, string> = {
  light: "light_mode",
  dark: "dark_mode",
  system: "contrast",
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
  const pathname = usePathname() || "/";
  const cleanPath = stripLocale(pathname);

  const [theme, setTheme] = useState<Theme>("system");
  const [themeOpen, setThemeOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const themeRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = (localStorage.getItem("theme") as Theme) || "system";
    setTheme(saved);
    applyTheme(saved);

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = () => {
      if ((localStorage.getItem("theme") as Theme) === "system") {
        applyTheme("system");
      }
    };
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (themeRef.current && !themeRef.current.contains(e.target as Node)) {
        setThemeOpen(false);
      }
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
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

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <a href={localePath(locale, "/")} className="flex items-center">
          {}
          <img src="/logo-full.png" alt="Buppi Baby" className="h-10" />
        </a>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a
            className="hover:text-primary transition-colors"
            href={`${localePath(locale, "/")}#funcionalidades`}
          >
            {m.features}
          </a>
          <a
            className="hover:text-primary transition-colors"
            href={`${localePath(locale, "/")}#familia`}
          >
            {m.sharing}
          </a>
          <a
            className="hover:text-primary transition-colors"
            href={`${localePath(locale, "/")}#estatisticas`}
          >
            {m.stats}
          </a>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative" ref={langRef}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLangOpen((v) => !v);
                setThemeOpen(false);
              }}
              aria-label={m.languageAria}
              className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-lg leading-none"
            >
              {LOCALE_FLAGS[locale]}
            </button>
            {langOpen && (
              <div className="absolute right-0 top-12 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 py-2 min-w-[180px] z-50">
                {LOCALES.map((l) => (
                  <a
                    key={l}
                    href={`${localePath(l, cleanPath)}`}
                    onClick={() => {
                      try {
                        localStorage.setItem("locale", l);
                      } catch {}
                    }}
                    className={`block px-4 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors ${
                      locale === l ? "text-primary font-semibold" : ""
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
              onClick={(e) => {
                e.stopPropagation();
                setThemeOpen((v) => !v);
                setLangOpen(false);
              }}
              aria-label={m.themeAria}
              className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              <span className="material-icons-round text-slate-600 dark:text-slate-300 text-xl">
                {THEME_ICONS[theme]}
              </span>
            </button>
            {themeOpen && (
              <div className="absolute right-0 top-12 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 py-2 min-w-[140px] z-50">
                {(["light", "dark", "system"] as Theme[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => chooseTheme(t)}
                    className={`w-full px-4 py-2 text-left text-sm hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-3 transition-colors ${
                      theme === t ? "text-primary font-medium" : ""
                    }`}
                  >
                    <span className="material-icons-round text-lg">
                      {THEME_ICONS[t]}
                    </span>
                    {m.theme[t]}
                  </button>
                ))}
              </div>
            )}
          </div>
          <a
            className="bg-primary hover:bg-primary/90 text-white px-4 sm:px-6 py-2.5 rounded-full font-semibold transition-all shadow-lg shadow-primary/25 text-sm sm:text-base"
            href={`${localePath(locale, "/")}#baixar`}
          >
            {m.download}
          </a>
        </div>
      </div>
    </nav>
  );
}
