"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { BIcon } from "@/components/BIcon";
import { getMessages, type Locale } from "@/i18n";

/* ─────────────────────────────────────────────────────────────
 * Pagefind-powered blog search (⌘K modal).
 *
 * The index is generated at build time by `pagefind --site out`
 * (see package.json "build-search"). At runtime we lazy-import the
 * generated bundle from /_pagefind/pagefind.js and query it client
 * side. Results are scoped to the current locale via the per-article
 * `language` filter set in Article.tsx (data-pagefind-filter).
 *
 * In `next dev` the bundle doesn't exist (no production build), so the
 * import fails and we show a friendly "unavailable in dev" message.
 * ───────────────────────────────────────────────────────────── */

type PagefindDoc = {
  url: string;
  meta: { title?: string; image?: string; image_alt?: string; category?: string };
  excerpt: string;
};
type PagefindResult = { id: string; data: () => Promise<PagefindDoc> };
type PagefindApi = {
  search: (
    query: string,
    opts?: { filters?: Record<string, string | string[]> },
  ) => Promise<{ results: PagefindResult[] }>;
};

const MAX_RESULTS = 6;

export function BlogSearch({ locale }: { locale: Locale }) {
  const m = getMessages(locale).search;

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [docs, setDocs] = useState<PagefindDoc[]>([]);
  const [active, setActive] = useState(0);
  const [unavailable, setUnavailable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Portal target only exists on the client.
  useEffect(() => setMounted(true), []);

  const apiRef = useRef<PagefindApi | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Lazily load the Pagefind bundle the first time the modal opens.
  const ensureApi = useCallback(async (): Promise<PagefindApi | null> => {
    if (apiRef.current) return apiRef.current;
    try {
      // Variable specifier + webpackIgnore => left as a native runtime import
      // resolving to the statically-generated /pagefind/pagefind.js
      // (pagefind v1.5 emits to /pagefind, not the older /_pagefind).
      const path = "/pagefind/pagefind.js";
      const mod = (await import(/* webpackIgnore: true */ path)) as PagefindApi;
      apiRef.current = mod;
      return mod;
    } catch {
      setUnavailable(true);
      return null;
    }
  }, []);

  // ⌘K / Ctrl+K toggles the modal; Escape closes it.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // On open: focus input, lock scroll, warm up the index.
  useEffect(() => {
    if (!open) return;
    void ensureApi();
    const t = setTimeout(() => inputRef.current?.focus(), 20);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(t);
      document.body.style.overflow = prev;
    };
  }, [open, ensureApi]);

  // Debounced search whenever the query changes.
  useEffect(() => {
    if (!open) return;
    const q = query.trim();
    if (!q) {
      setDocs([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const handle = setTimeout(async () => {
      const api = await ensureApi();
      if (!api) {
        setLoading(false);
        return;
      }
      const res = await api.search(q, { filters: { language: locale } });
      const top = await Promise.all(
        res.results.slice(0, MAX_RESULTS).map((r) => r.data()),
      );
      setDocs(top);
      setActive(0);
      setLoading(false);
    }, 140);
    return () => clearTimeout(handle);
  }, [query, open, locale, ensureApi]);

  const close = () => {
    setOpen(false);
    setQuery("");
    setDocs([]);
  };

  const go = (url: string) => {
    close();
    window.location.href = url;
  };

  const onListKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, docs.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && docs[active]) {
      e.preventDefault();
      go(docs[active].url);
    }
  };

  const q = query.trim();

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={getMessages(locale).nav.searchAria}
        className="w-9 h-9 rounded-full bg-white dark:bg-[var(--color-surface-dark)] border border-[var(--color-border-warm)] dark:border-[var(--color-border-dark)] flex items-center justify-center hover:bg-[var(--color-surface-elevated)] dark:hover:bg-[var(--color-surface-elevated-dark)] transition-colors text-[var(--color-fg-secondary)]"
      >
        <BIcon name="search" size={16} />
      </button>

      {open &&
        mounted &&
        createPortal(
          <div
            className="fixed inset-0 z-[60] flex items-start justify-center p-4 sm:pt-[12vh]"
            role="dialog"
            aria-modal="true"
            aria-label={getMessages(locale).nav.searchAria}
          >
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-[var(--color-ink)]/40 backdrop-blur-sm"
            onClick={close}
            aria-hidden
          />

          {/* panel */}
          <div className="relative w-full max-w-xl bg-white dark:bg-[var(--color-surface-dark)] rounded-2xl shadow-2xl border border-[var(--color-border-warm)] dark:border-[var(--color-border-dark)] overflow-hidden">
            <div className="flex items-center gap-3 px-4 border-b border-[var(--color-border-warm)] dark:border-[var(--color-border-dark)]">
              <BIcon
                name="search"
                size={18}
                className="text-[var(--color-fg-muted)] shrink-0"
              />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onListKey}
                placeholder={m.placeholder}
                className="flex-1 bg-transparent py-4 text-[15px] text-[var(--color-ink)] dark:text-white placeholder:text-[var(--color-fg-muted)] focus:outline-none"
                autoComplete="off"
                spellCheck={false}
              />
              <button
                type="button"
                onClick={close}
                aria-label={m.close}
                className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-[var(--color-fg-muted)] hover:bg-[var(--color-surface-elevated)] dark:hover:bg-[var(--color-surface-elevated-dark)] transition-colors"
              >
                <BIcon name="plus" size={15} className="rotate-45" />
              </button>
            </div>

            <div
              className="max-h-[60vh] overflow-y-auto"
              role="listbox"
              aria-label={m.resultsAria}
            >
              {unavailable ? (
                <p className="px-5 py-8 text-[14px] text-[var(--color-fg-secondary)] dark:text-slate-400 text-center">
                  {m.unavailable}
                </p>
              ) : !q ? (
                <p className="px-5 py-8 text-[14px] text-[var(--color-fg-muted)] text-center">
                  {m.hint}
                </p>
              ) : docs.length === 0 && !loading ? (
                <p className="px-5 py-8 text-[14px] text-[var(--color-fg-secondary)] dark:text-slate-400 text-center">
                  {m.empty} <span className="font-semibold">“{q}”</span>
                </p>
              ) : (
                <ul className="py-2">
                  {docs.map((doc, i) => (
                    <li key={doc.url}>
                      <a
                        href={doc.url}
                        onClick={(e) => {
                          e.preventDefault();
                          go(doc.url);
                        }}
                        onMouseEnter={() => setActive(i)}
                        role="option"
                        aria-selected={i === active}
                        className={`flex gap-3 px-4 py-3 mx-2 rounded-xl transition-colors ${
                          i === active
                            ? "bg-[var(--color-background-soft)] dark:bg-[var(--color-surface-elevated-dark)]"
                            : ""
                        }`}
                      >
                        {doc.meta.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={doc.meta.image}
                            alt=""
                            className="w-14 h-14 rounded-lg object-cover shrink-0 bg-[var(--color-background-soft)]"
                            loading="lazy"
                          />
                        ) : null}
                        <div className="min-w-0">
                          {doc.meta.category ? (
                            <span className="text-[11px] font-semibold uppercase tracking-wide text-[var(--color-primary-dark)] dark:text-[var(--color-primary)]">
                              {doc.meta.category}
                            </span>
                          ) : null}
                          <p className="text-[14px] font-semibold text-[var(--color-ink)] dark:text-white leading-snug truncate">
                            {doc.meta.title}
                          </p>
                          <p
                            className="text-[12.5px] text-[var(--color-fg-secondary)] dark:text-slate-400 leading-snug line-clamp-2 [&_mark]:bg-[var(--color-lavender)] [&_mark]:text-[var(--color-primary-dark)] [&_mark]:rounded [&_mark]:px-0.5"
                            dangerouslySetInnerHTML={{ __html: doc.excerpt }}
                          />
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>,
          document.body,
        )}
    </>
  );
}
