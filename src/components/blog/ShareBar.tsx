"use client";

import { useEffect, useState } from "react";
import { BIcon } from "@/components/BIcon";
import { getMessages, type Locale } from "@/i18n";

type Channel = "whatsapp" | "x" | "mail" | "copy" | "native";

function withUtm(url: string, channel: Channel): string {
  try {
    const u = new URL(url);
    u.searchParams.set("utm_source", `share-${channel}`);
    return u.toString();
  } catch {
    return url;
  }
}

function intentUrl(channel: Exclude<Channel, "copy" | "native">, url: string, title: string): string {
  const u = encodeURIComponent(withUtm(url, channel));
  const t = encodeURIComponent(title);
  switch (channel) {
    case "whatsapp":
      return `https://wa.me/?text=${t}%20${u}`;
    case "x":
      return `https://twitter.com/intent/tweet?text=${t}&url=${u}`;
    case "mail":
      return `mailto:?subject=${t}&body=${u}`;
  }
}

export function ShareBar({
  url,
  title,
  locale,
  variant = "full",
}: {
  url: string;
  title: string;
  locale: Locale;
  variant?: "compact" | "full";
}) {
  const m = getMessages(locale).blog.share;
  const [copied, setCopied] = useState(false);
  const [supportsNative, setSupportsNative] = useState(false);

  useEffect(() => {
    setSupportsNative(typeof navigator !== "undefined" && typeof navigator.share === "function");
  }, []);

  const handleCopy = async () => {
    const target = withUtm(url, "copy");
    try {
      await navigator.clipboard.writeText(target);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = target;
      ta.setAttribute("readonly", "");
      ta.style.position = "absolute";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  };

  const handleNative = async () => {
    if (typeof navigator.share !== "function") return;
    try {
      await navigator.share({ title, url: withUtm(url, "native") });
    } catch {
      /* user dismissed the sheet */
    }
  };

  const isCompact = variant === "compact";

  const btnBase =
    "inline-flex items-center justify-center gap-2 rounded-full transition-all border border-[var(--color-border-warm)] dark:border-[var(--color-border-dark)] bg-[var(--color-background-light)] dark:bg-[var(--color-surface-elevated-dark)] text-[var(--color-fg-secondary)] dark:text-slate-300 hover:text-[var(--color-ink)] hover:border-[var(--color-fg-muted)] dark:hover:text-white dark:hover:border-slate-500 hover:-translate-y-px";
  const btnSize = isCompact ? "h-9 w-9 text-sm" : "h-10 px-3 text-[13px] font-medium";
  const iconSize = isCompact ? 15 : 16;

  return (
    <section
      className={
        isCompact
          ? "mt-6 flex flex-wrap items-center gap-2"
          : "mt-12 rounded-3xl p-6 lg:p-7 bg-[var(--color-background-soft)] dark:bg-[var(--color-surface-elevated-dark)] border border-[var(--color-border-warm)] dark:border-[var(--color-border-dark)]"
      }
    >
      {!isCompact && (
        <div className="flex items-center gap-2.5 mb-4">
          <BIcon name="share" size={16} className="text-[var(--color-fg-secondary)]" />
          <h2 className="font-display font-bold tracking-tight text-base text-[var(--color-ink)] dark:text-white">
            {m.heading}
          </h2>
        </div>
      )}

      <div className={`flex flex-wrap items-center gap-2 ${isCompact ? "" : ""}`}>
        {supportsNative && (
          <button
            type="button"
            onClick={handleNative}
            className={`${btnBase} ${btnSize}`}
            aria-label={m.native}
            title={m.native}
          >
            <BIcon name="share" size={iconSize} aria-hidden />
            {!isCompact && <span>{m.native}</span>}
          </button>
        )}

        <a
          href={intentUrl("whatsapp", url, title)}
          target="_blank"
          rel="noopener noreferrer"
          className={`${btnBase} ${btnSize} hover:!text-[#25D366] hover:!border-[#25D366]`}
          aria-label={m.whatsapp}
          title={m.whatsapp}
        >
          <BIcon name="whatsapp" size={iconSize} aria-hidden />
          {!isCompact && <span>WhatsApp</span>}
        </a>

        <a
          href={intentUrl("x", url, title)}
          target="_blank"
          rel="noopener noreferrer"
          className={`${btnBase} ${btnSize} hover:!text-[var(--color-ink)] dark:hover:!text-white`}
          aria-label={m.x}
          title={m.x}
        >
          <BIcon name="x-twitter" size={iconSize - 1} aria-hidden />
          {!isCompact && <span>X</span>}
        </a>

        <a
          href={intentUrl("mail", url, title)}
          className={`${btnBase} ${btnSize}`}
          aria-label={m.mail}
          title={m.mail}
        >
          <BIcon name="mail" size={iconSize} aria-hidden />
          {!isCompact && <span>Email</span>}
        </a>

        <button
          type="button"
          onClick={handleCopy}
          className={`${btnBase} ${btnSize} ${copied ? "!text-[var(--color-secondary-dark)] !border-[var(--color-secondary)]" : ""}`}
          aria-label={copied ? m.linkCopied : m.copyLink}
          title={copied ? m.linkCopied : m.copyLink}
        >
          <BIcon name={copied ? "check" : "link"} size={iconSize} aria-hidden />
          {!isCompact && <span>{copied ? m.linkCopied : m.copyLink}</span>}
        </button>
      </div>
    </section>
  );
}
