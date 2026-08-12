/**
 * Instagram carousel generator for the Buppi Baby blog.
 *
 * Turns a published article into on-brand carousel slides (1080×1350 PNG):
 *   cover (title) → one slide per FAQ item → CTA slide.
 * Renders with Satori (HTML-like → SVG) + resvg (SVG → PNG) — no headless
 * browser, so it containerizes cleanly for the k3s cron later.
 *
 * Usage:
 *   npx tsx scripts/instagram/carousel.ts <article-id> [locale]
 *   e.g. npx tsx scripts/instagram/carousel.ts sono-bebe-4-meses pt-BR
 *
 * Output: scripts/instagram/out/<id>-<locale>/slide-NN.png
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import matter from "gray-matter";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..", "..");

const W = 1080;
const H = 1350;

// Brand palette (from src/app/globals.css)
const C = {
  ink: "#42376b",
  primary: "#ac92ee",
  primaryDark: "#6056d7",
  mint: "#92d6cf",
  mintDark: "#2a8e7a",
  peach: "#ffbfa5",
  cream: "#faf9f6",
  creamSoft: "#fdf8f3",
  lavender: "#f3f2ff",
  fg: "#3d3d5c",
  fgSecondary: "#6b6b8d",
  white: "#ffffff",
};

const CATEGORY_LABEL: Record<string, Record<string, string>> = {
  sleep: { "pt-BR": "Sono", en: "Sleep", es: "Sueño", fr: "Sommeil" },
  feeding: { "pt-BR": "Alimentação", en: "Feeding", es: "Alimentación", fr: "Alimentation" },
  development: { "pt-BR": "Desenvolvimento", en: "Development", es: "Desarrollo", fr: "Développement" },
  health: { "pt-BR": "Saúde", en: "Health", es: "Salud", fr: "Santé" },
  "expecting-and-new-parents": { "pt-BR": "Maternidade", en: "New parents", es: "Maternidad", fr: "Parentalité" },
  news: { "pt-BR": "Novidades", en: "News", es: "Novedades", fr: "Actualités" },
};

const SWIPE: Record<string, string> = { "pt-BR": "arraste", en: "swipe", es: "desliza", fr: "glissez" };
const READ_MORE: Record<string, string> = {
  "pt-BR": "Guia completo no blog",
  en: "Full guide on the blog",
  es: "Guía completa en el blog",
  fr: "Guide complet sur le blog",
};
const CTA_APP: Record<string, string> = {
  "pt-BR": "Baixe o Buppi e acompanhe tudo do seu bebê",
  en: "Get Buppi and track everything about your baby",
  es: "Descarga Buppi y sigue todo de tu bebé",
  fr: "Téléchargez Buppi et suivez tout de votre bébé",
};

/** hyperscript helper for Satori's element tree */
type Node = { type: string; props: Record<string, unknown> };
function h(type: string, style: Record<string, unknown>, children?: unknown): Node {
  return { type, props: { style, ...(children !== undefined ? { children } : {}) } };
}

/** A right-pointing chevron as an inline SVG image (reliable in Satori). */
function chevron(color: string): Node {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg>`;
  const src = "data:image/svg+xml;utf8," + encodeURIComponent(svg);
  return { type: "img", props: { src, width: 30, height: 30, style: { display: "flex", marginLeft: 16 } } };
}

function imgNode(src: string, w: number, ht: number, style: Record<string, unknown> = {}): Node {
  return { type: "img", props: { src, width: w, height: ht, style: { display: "flex", ...style } } };
}

/** Crop the article cover.webp to a WxH PNG data URI (Satori can't decode webp). */
function coverImageDataUri(id: string, w: number, ht: number): string | null {
  const p = join(ROOT, "content", "blog", id, "cover.webp");
  if (!existsSync(p)) return null;
  try {
    const png = execFileSync(
      "magick",
      [p, "-resize", `${w}x${ht}^`, "-gravity", "center", "-extent", `${w}x${ht}`, "png:-"],
      { maxBuffer: 40 * 1024 * 1024 },
    );
    return "data:image/png;base64," + png.toString("base64");
  } catch {
    return null;
  }
}

/** Normalize whitespace. Truncation is a last resort (see fitText); the cap here
 *  is a generous safety net so a runaway string can never overflow the canvas. */
function trim(text: string, max: number): string {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  const slice = t.slice(0, max);
  const lastPeriod = Math.max(slice.lastIndexOf(". "), slice.lastIndexOf("; "));
  if (lastPeriod > max * 0.55) return slice.slice(0, lastPeriod + 1);
  const lastSpace = slice.lastIndexOf(" ");
  return slice.slice(0, lastSpace > 0 ? lastSpace : max).trim() + "…";
}

const PAD = 96;
const CONTENT_W = W - PAD * 2; // usable text width on a padded slide

/** Estimate how many lines `text` wraps to at a given font size, by packing
 *  words into a line-width budget. `factor` ≈ average glyph width / font size
 *  (Quicksand bold is wider than Outfit body). */
function estLines(text: string, fontSize: number, factor: number, boxW = CONTENT_W): number {
  const cpl = Math.max(6, Math.floor(boxW / (fontSize * factor)));
  let lines = 1;
  let cur = 0;
  for (const w of text.split(/\s+/)) {
    const len = w.length + 1;
    if (cur > 0 && cur + len > cpl) {
      lines++;
      cur = len;
    } else {
      cur += len;
    }
  }
  return lines;
}

/** Pick the largest font size in [min, max] whose wrapped height fits `availH`.
 *  This fills the available space instead of truncating — text shrinks to fit. */
function fitFont(
  text: string,
  opts: { max: number; min: number; factor: number; lineHeight: number; availH: number; boxW?: number },
): number {
  for (let fs = opts.max; fs > opts.min; fs -= 2) {
    if (estLines(text, fs, opts.factor, opts.boxW) * fs * opts.lineHeight <= opts.availH) return fs;
  }
  return opts.min;
}

// ---------- slide templates ----------

function swipeRow(locale: string, wordmarkColor: string, textColor: string): Node {
  return h("div", { display: "flex", alignItems: "center", justifyContent: "space-between" }, [
    h("div", { display: "flex", alignItems: "center", fontSize: 42, fontWeight: 700, color: wordmarkColor }, "Buppi Baby"),
    h("div", { display: "flex", alignItems: "center" }, [
      h("div", { display: "flex", fontSize: 36, fontWeight: 700, color: textColor }, SWIPE[locale] ?? SWIPE["pt-BR"]),
      chevron(textColor),
    ]),
  ]);
}

const IMG_H = 648;

function coverSlide(title: string, category: string, locale: string, coverUri: string | null): Node {
  // Text-only fallback (no article cover)
  if (!coverUri) {
    const titleFont = fitFont(title, { max: 82, min: 54, factor: 0.6, lineHeight: 1.1, availH: H - 192 - 66 - 50 - 40, boxW: W - 192 });
    return h(
      "div",
      { display: "flex", flexDirection: "column", width: W, height: H, padding: 96, backgroundColor: C.lavender, backgroundImage: `linear-gradient(160deg, ${C.lavender} 0%, ${C.creamSoft} 62%, ${C.cream} 100%)`, justifyContent: "space-between", fontFamily: "Quicksand" },
      [
        h("div", { display: "flex", alignSelf: "flex-start", backgroundColor: C.mint, color: C.ink, fontSize: 34, fontWeight: 700, padding: "16px 34px", borderRadius: 999 }, category),
        h("div", { display: "flex", fontSize: titleFont, fontWeight: 700, color: C.ink, lineHeight: 1.1, letterSpacing: -1 }, title),
        swipeRow(locale, C.primaryDark, C.fgSecondary),
      ],
    );
  }
  // Article cover art as a top band, title panel below
  const panelH = H - IMG_H; // 702
  const titleFont = fitFont(title, { max: 70, min: 46, factor: 0.6, lineHeight: 1.12, availH: panelH - 176 - 90 - 50 - 16, boxW: W - 176 });
  return h(
    "div",
    { display: "flex", flexDirection: "column", width: W, height: H, backgroundColor: C.lavender, fontFamily: "Quicksand" },
    [
      imgNode(coverUri, W, IMG_H),
      h(
        "div",
        { display: "flex", flexDirection: "column", flexGrow: 1, padding: 88, backgroundImage: `linear-gradient(165deg, ${C.lavender} 0%, ${C.creamSoft} 70%, ${C.cream} 100%)`, justifyContent: "space-between" },
        [
          h("div", { display: "flex", flexDirection: "column" }, [
            h("div", { display: "flex", alignSelf: "flex-start", backgroundColor: C.mint, color: C.ink, fontSize: 32, fontWeight: 700, padding: "14px 30px", borderRadius: 999, marginBottom: 30 }, category),
            h("div", { display: "flex", fontSize: titleFont, fontWeight: 700, color: C.ink, lineHeight: 1.12, letterSpacing: -1 }, title),
          ]),
          swipeRow(locale, C.primaryDark, C.fgSecondary),
        ],
      ),
    ],
  );
}

function tipSlide(index: number, total: number, question: string, answer: string, category: string): Node {
  // Adaptive sizing: fill the slide instead of truncating. Question keeps its
  // presence (shrinks only if very long); the answer then takes whatever
  // vertical space is left, shrinking to fit rather than getting cut with "…".
  const headerH = 74 + 56; // number chip row + its margin
  const qMB = 40; // gap under the question
  const footerH = 44 + 24; // "buppi.baby" line + breathing room
  const qLH = 1.14;
  const aLH = 1.44;

  const qFont = fitFont(question, { max: 60, min: 46, factor: 0.6, lineHeight: qLH, availH: 4 * 60 * qLH });
  const qHeight = estLines(question, qFont, 0.6) * qFont * qLH;

  const availAnswer = H - PAD * 2 - headerH - qHeight - qMB - footerH;
  const aFont = fitFont(answer, { max: 44, min: 30, factor: 0.53, lineHeight: aLH, availH: availAnswer });

  return h(
    "div",
    {
      display: "flex",
      flexDirection: "column",
      width: W,
      height: H,
      padding: PAD,
      backgroundColor: C.cream,
      justifyContent: "flex-start",
      fontFamily: "Quicksand",
    },
    [
      h("div", { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 56 }, [
        h("div", { display: "flex", alignItems: "center", justifyContent: "center", width: 74, height: 74, borderRadius: 999, backgroundColor: C.primary, color: C.white, fontSize: 38, fontWeight: 700 }, String(index)),
        h("div", { display: "flex", fontSize: 30, fontWeight: 700, color: C.fgSecondary, letterSpacing: 1 }, `${index}/${total} · ${category}`),
      ]),
      // Question + answer, vertically centered in the space between header and footer.
      h("div", { display: "flex", flexDirection: "column", flexGrow: 1, justifyContent: "center" }, [
        h("div", { display: "flex", fontSize: qFont, fontWeight: 700, color: C.primaryDark, lineHeight: qLH, marginBottom: qMB, letterSpacing: -0.5 }, question),
        h("div", { display: "flex", fontSize: aFont, fontWeight: 500, color: C.fg, lineHeight: aLH, fontFamily: "Outfit" }, answer),
      ]),
      h("div", { display: "flex", fontSize: 32, fontWeight: 700, color: C.mintDark }, "buppi.baby"),
    ],
  );
}

function ctaSlide(readMore: string, url: string, appLine: string): Node {
  return h(
    "div",
    {
      display: "flex",
      flexDirection: "column",
      width: W,
      height: H,
      padding: 96,
      backgroundColor: C.primaryDark,
      backgroundImage: `linear-gradient(160deg, ${C.primary} 0%, ${C.primaryDark} 100%)`,
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "Quicksand",
    },
    [
      h("div", { display: "flex", fontSize: 52, fontWeight: 700, color: C.white, opacity: 0.92, marginBottom: 24, textAlign: "center" }, readMore),
      h("div", { display: "flex", fontSize: 60, fontWeight: 700, color: C.white, marginBottom: 80, textAlign: "center" }, url),
      h("div", { display: "flex", width: 220, height: 6, borderRadius: 999, backgroundColor: "rgba(255,255,255,0.5)", marginBottom: 80 }, ""),
      h("div", { display: "flex", fontSize: 42, fontWeight: 500, color: C.white, opacity: 0.95, lineHeight: 1.3, textAlign: "center", fontFamily: "Outfit", maxWidth: 780 }, appLine),
      h("div", { display: "flex", marginTop: 64, fontSize: 40, fontWeight: 700, color: C.white, backgroundColor: "rgba(255,255,255,0.16)", padding: "20px 44px", borderRadius: 999 }, "@buppi.baby"),
    ],
  );
}

// ---------- main ----------

type Font = { name: string; data: Buffer; weight: number; style: "normal" };

async function render(node: Node, fonts: Font[]): Promise<Buffer> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const svg = await satori(node as any, { width: W, height: H, fonts: fonts as any });
  return new Resvg(svg, { fitTo: { mode: "width", value: W } }).render().asPng();
}

function font(file: string, name: string, weight: number): Font {
  return { name, data: readFileSync(join(HERE, "fonts", file)), weight, style: "normal" };
}

async function main() {
  const [id, locale = "pt-BR"] = process.argv.slice(2);
  if (!id) {
    console.error("uso: npx tsx scripts/instagram/carousel.ts <article-id> [locale]");
    process.exit(1);
  }
  const file = join(ROOT, "content", "blog", id, `${locale}.mdx`);
  if (!existsSync(file)) {
    console.error(`não encontrei ${file}`);
    process.exit(1);
  }
  const { data } = matter(readFileSync(file, "utf8"));
  const title = String(data.title ?? id);
  const category = String(data.category ?? "");
  const catLabel = CATEGORY_LABEL[category]?.[locale] ?? category;
  const faq = (data.faq ?? []) as { question: string; answer: string }[];
  const slug = locale === "pt-BR" ? id : String(data.slug ?? id);
  const url = locale === "pt-BR" ? `buppi.baby/blog/${slug}` : `buppi.baby/${locale}/blog/${slug}`;

  // Slides live under public/ so they deploy with the site and are reachable at
  // https://buppi.baby/ig/<id>-<locale>/slide-NN.png (the Graph API fetches them).
  const outdir = join(ROOT, "public", "ig", `${id}-${locale}`);
  mkdirSync(outdir, { recursive: true });

  const fonts: Font[] = [
    font("Quicksand-500.woff", "Quicksand", 500),
    font("Quicksand-700.woff", "Quicksand", 700),
    font("Outfit-400.woff", "Outfit", 400),
    font("Outfit-500.woff", "Outfit", 500),
    font("Outfit-600.woff", "Outfit", 600),
  ];

  const coverUri = coverImageDataUri(id, W, IMG_H);
  const slides: Node[] = [coverSlide(trim(title, 120), catLabel, locale, coverUri)];
  const total = faq.length;
  faq.forEach((item, i) => {
    slides.push(tipSlide(i + 1, total, trim(item.question, 160), trim(item.answer, 600), catLabel));
  });
  slides.push(ctaSlide(READ_MORE[locale] ?? READ_MORE["pt-BR"], url, CTA_APP[locale] ?? CTA_APP["pt-BR"]));

  for (let i = 0; i < slides.length; i++) {
    const png = await render(slides[i], fonts);
    const name = `slide-${String(i + 1).padStart(2, "0")}.png`;
    writeFileSync(join(outdir, name), png);
    console.log(`  ✓ ${name}`);
  }
  console.log(`\n${slides.length} slides → ${outdir}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
