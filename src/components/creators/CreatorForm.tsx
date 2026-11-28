"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { CREATOR_LINK_FIELDS, type CreatorLinkField, type CreatorsMessages } from "@/i18n/creatorsTypes";
import { CREATOR_APPLICATION_URL } from "@/lib/links";

/** gtag.js is loaded by the root layout; absent when a blocker removes it. */
type AnalyticsWindow = Window & { gtag?: (...args: unknown[]) => void };

type Status = "idle" | "sending" | "done";

/** Hidden field real visitors never fill; the function drops what arrives with it set. */
const HONEYPOT_FIELD = "website";

/** Line drawings that stand in for each field's label; the label itself is the svg's accessible name. */
const LINK_GLYPHS: Record<CreatorLinkField, ReactNode> = {
  instagram: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="5" />
      <circle cx="12" cy="12" r="3.6" />
      <path d="M16.6 7.4h.01" />
    </>
  ),
  tiktok: (
    <>
      <path d="M14 4v10.5a3.5 3.5 0 1 1-3.5-3.5" />
      <path d="M14 4c.4 2.6 2 4.2 4.5 4.5" />
    </>
  ),
  youtube: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="4" />
      <path d="M10.5 9.5v5l4-2.5z" />
    </>
  ),
  other: (
    <>
      <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" />
      <path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
    </>
  ),
};

const MAX_NAME = 120;
const MAX_EMAIL = 254;
const MAX_PHONE = 40;
const MAX_LINK = 300;
const MAX_MESSAGE = 2000;

export function CreatorForm({
  copy,
  locale,
  privacyHref,
}: {
  copy: CreatorsMessages["form"];
  locale: string;
  privacyHref: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget)) as Record<string, string>;
    if (!CREATOR_LINK_FIELDS.some((field) => data[field]?.trim())) {
      setError(copy.errorLinks);
      return;
    }
    setError(null);
    setStatus("sending");
    try {
      const response = await fetch(CREATOR_APPLICATION_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, locale }),
      });
      if (!response.ok) throw new Error(`status ${response.status}`);
      setStatus("done");
      (window as AnalyticsWindow).gtag?.("event", "creator_application_sent", { page_path: window.location.pathname });
    } catch {
      setStatus("idle");
      setError(copy.errorSend);
    }
  }

  if (status === "done") {
    return (
      <div className="cr-done" role="status">
        <b>{copy.doneTitle}</b>
        <p>{copy.doneBody}</p>
      </div>
    );
  }

  return (
    <form className="cr-form" onSubmit={onSubmit}>
      <div className="cr-row">
        <label>
          <span>{copy.name}</span>
          <input name="name" type="text" autoComplete="name" required maxLength={MAX_NAME} />
        </label>
        <label>
          <span>{copy.email}</span>
          <input name="email" type="email" autoComplete="email" required maxLength={MAX_EMAIL} />
        </label>
      </div>
      <label>
        <span>
          {copy.phone} <i>({copy.optional})</i>
        </span>
        <input name="phone" type="tel" autoComplete="tel" maxLength={MAX_PHONE} />
      </label>

      <fieldset>
        <legend>{copy.linksLegend}</legend>
        <p className="cr-hint">{copy.linksHint}</p>
        <div className="cr-row cr-links">
          {CREATOR_LINK_FIELDS.map((field) => (
            <label key={field} className={`cr-link ${field}`}>
              <span className="cr-glyph">
                <svg
                  role="img"
                  aria-label={copy.links[field].label}
                  viewBox="0 0 24 24"
                  width="19"
                  height="19"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {LINK_GLYPHS[field]}
                </svg>
              </span>
              <input
                name={field}
                type="text"
                inputMode="url"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                placeholder={copy.links[field].placeholder}
                maxLength={MAX_LINK}
              />
            </label>
          ))}
        </div>
      </fieldset>

      <label>
        <span>
          {copy.message} <i>({copy.optional})</i>
        </span>
        <textarea name="message" rows={4} placeholder={copy.messagePlaceholder} maxLength={MAX_MESSAGE} />
      </label>

      <input className="cr-trap" name={HONEYPOT_FIELD} type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      {error ? (
        <p className="cr-error" role="alert">
          {error}
        </p>
      ) : null}

      <button className="cr-btn" type="submit" disabled={status === "sending"}>
        {status === "sending" ? copy.sending : copy.submit}
      </button>
      <p className="cr-privacy">
        {copy.privacy} <a href={privacyHref}>{copy.privacyLink}</a>
      </p>
    </form>
  );
}
