/**
 * Instagram caption generator for a Buppi Baby article.
 *
 * Deterministic (no LLM): builds a caption from the article's own structured
 * data — hook, topic bullets (from the FAQ), CTA, and locale/category hashtags.
 *
 * Usage:  npx tsx scripts/instagram/caption.ts <article-id> [locale]
 * Or import { buildCaption } from another script.
 */
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import matter from "gray-matter";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..", "..");

const EMOJI: Record<string, string> = { sleep: "🌙", feeding: "🍼", development: "🧩", health: "🩺", "expecting-and-new-parents": "🤰", news: "✨" };

const T: Record<string, { inGuide: string; full: string; app: string; save: string }> = {
  "pt-BR": {
    inGuide: "No guia:",
    full: "Guia completo em",
    app: "📲 Baixe o Buppi e acompanhe sono, mamadas e marcos do seu bebê num só lugar.",
    save: "Salva pra não esquecer e marca alguém que vai gostar 💜",
  },
  en: {
    inGuide: "In the guide:",
    full: "Full guide at",
    app: "📲 Get Buppi and track sleep, feeds and milestones in one place.",
    save: "Save it for later and tag someone who needs it 💜",
  },
  es: {
    inGuide: "En la guía:",
    full: "Guía completa en",
    app: "📲 Descarga Buppi y sigue sueño, tomas e hitos de tu bebé en un solo lugar.",
    save: "Guárdalo para no olvidarlo y etiqueta a alguien 💜",
  },
  fr: {
    inGuide: "Dans le guide :",
    full: "Guide complet sur",
    app: "📲 Téléchargez Buppi et suivez sommeil, biberons et étapes de bébé au même endroit.",
    save: "Enregistrez-le et identifiez quelqu'un qui en a besoin 💜",
  },
};

const BASE_TAGS: Record<string, string[]> = {
  "pt-BR": ["buppibaby", "maternidade", "paternidade", "bebe", "primeirofilho", "maternidadereal"],
  en: ["buppibaby", "newmom", "newparents", "babytips", "parenting", "momlife"],
  es: ["buppibaby", "maternidad", "paternidad", "bebe", "crianza", "mamaprimeriza"],
  fr: ["buppibaby", "maternité", "parentalité", "bébé", "jeunemaman", "parentalitébienveillante"],
};

const CAT_TAGS: Record<string, Record<string, string[]>> = {
  sleep: {
    "pt-BR": ["sonodobebe", "rotinadosono", "sonoinfantil", "janelasdesono"],
    en: ["babysleep", "sleeptips", "infantsleep", "wakewindows"],
    es: ["sueñodelbebe", "sueñoinfantil", "rutinadesueño"],
    fr: ["sommeildebébé", "sommeildenfant", "routinedodo"],
  },
  feeding: {
    "pt-BR": ["amamentacao", "alimentacaoinfantil", "aleitamentomaterno", "formula"],
    en: ["breastfeeding", "babyfeeding", "formulafeeding", "newborncare"],
    es: ["lactancia", "alimentacioninfantil", "lactanciamaterna"],
    fr: ["allaitement", "alimentationbébé", "laitinfantile"],
  },
  development: {
    "pt-BR": ["desenvolvimentoinfantil", "marcosdodesenvolvimento", "estimulacao"],
    en: ["babymilestones", "childdevelopment", "tummytime"],
    es: ["desarrolloinfantil", "hitosdeldesarrollo"],
    fr: ["développementbébé", "étapesbébé", "motricité"],
  },
  health: {
    "pt-BR": ["saudedobebe", "pediatria", "cuidadoscomobebe"],
    en: ["babyhealth", "pediatrics", "newbornhealth"],
    es: ["saluddelbebe", "pediatria"],
    fr: ["santébébé", "pédiatrie"],
  },
  "expecting-and-new-parents": {
    "pt-BR": ["gestante", "recemnascido", "puerperio", "maededeprimeiraviagem"],
    en: ["pregnancy", "newborn", "postpartum", "firsttimemom"],
    es: ["embarazo", "reciennacido", "posparto"],
    fr: ["grossesse", "nouveauné", "postpartum"],
  },
  news: { "pt-BR": ["novidades"], en: ["news"], es: ["novedades"], fr: ["actualités"] },
};

export function buildCaption(id: string, locale: string): string {
  const file = join(ROOT, "content", "blog", id, `${locale}.mdx`);
  if (!existsSync(file)) throw new Error(`não encontrei ${file}`);
  const { data } = matter(readFileSync(file, "utf8"));
  const title = String(data.title ?? id).replace(/:.*$/, "").trim(); // drop the ": subtitle" tail for a punchier hook
  const category = String(data.category ?? "");
  const description = String(data.description ?? "");
  const faq = (data.faq ?? []) as { question: string; answer: string }[];
  const slug = locale === "pt-BR" ? id : String(data.slug ?? id);
  const url = locale === "pt-BR" ? `buppi.baby/blog/${slug}` : `buppi.baby/${locale}/blog/${slug}`;
  const t = T[locale] ?? T["pt-BR"];
  const emoji = EMOJI[category] ?? "👶";

  const bullets = faq.slice(0, 4).map((f) => `• ${f.question.replace(/\?+$/, "")}`);

  const tags = [...(BASE_TAGS[locale] ?? []), ...(CAT_TAGS[category]?.[locale] ?? [])].map((x) => `#${x}`);

  const parts = [
    `${title} ${emoji}`,
    "",
    description,
    "",
    t.inGuide,
    bullets.join("\n"),
    "",
    `${t.full} ${url}`,
    "",
    t.app,
    "",
    t.save,
    "",
    tags.join(" "),
  ];
  return parts.join("\n");
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const [id, locale = "pt-BR"] = process.argv.slice(2);
  if (!id) {
    console.error("uso: npx tsx scripts/instagram/caption.ts <article-id> [locale]");
    process.exit(1);
  }
  console.log(buildCaption(id, locale));
}
