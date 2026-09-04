/**
 * Builds Markdown mirrors of the site's pages into out/ (run AFTER `next build`).
 *
 * Why: agent-readiness — every HTML page gets a `index.md` sibling so a
 * Cloudflare Worker can honor `Accept: text/markdown` content negotiation
 * (acceptmarkdown.com) by rewriting `/path/` → `/path/index.md`, and agents can
 * also fetch the .md directly.
 *
 * Coverage: homepage (4 locales), /about (4 locales), every blog article
 * (all locales), and a 404.md the worker serves for missing paths.
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import matter from "gray-matter";

const ROOT = join(dirname(new URL(import.meta.url).pathname), "..");
const OUT = join(ROOT, "out");
const BASE = "https://buppi.baby";
const LOCALES = ["pt-BR", "en", "es", "fr"] as const;
type Loc = (typeof LOCALES)[number];
const prefix = (l: Loc) => (l === "pt-BR" ? "" : `/${l}`);

function write(path: string, body: string) {
  const file = join(OUT, path.replace(/^\//, ""), "index.md");
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, body);
  return file;
}

/** MDX body → plain markdown: drop imports/JSX components, keep prose intact. */
function mdxToMd(body: string): string {
  return body
    .replace(/^import .*$/gm, "")
    .replace(/<[A-Z][a-zA-Z]*[^>]*\/>/g, "") // self-closing components (<Cta />, <FormulaCalculator />)
    .replace(/<\/?[A-Z][a-zA-Z]*[^>]*>/g, "") // wrapper components
    .replace(/<a\s+[^>]*href="([^"]+)"[^>]*>([^<]*)<\/a>/g, "[$2]($1)")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

const HOME: Record<Loc, { title: string; body: string }> = {
  "pt-BR": {
    title: "Buppi Baby — o companheiro de rotina mais inteligente do bebê",
    body: "Aplicativo gratuito (iOS e Android) para acompanhar a rotina do bebê: sono, amamentação, mamadeiras, fraldas, saúde, crescimento e marcos, em registros de 1 toque. O Buppi aprende o ritmo do seu bebê e prevê a próxima soneca, e sincroniza tudo entre quem cuida da criança.\n\n- [Blog com guias baseados em evidência](https://buppi.baby/blog/)\n- [Ferramentas gratuitas](https://buppi.baby/ferramentas/)\n- [Sobre](https://buppi.baby/about/) · [Privacidade](https://buppi.baby/privacy/) · [Suporte](https://buppi.baby/support/)\n- [App Store](https://apps.apple.com/app/buppi-baby/id6759115928) · [Google Play](https://play.google.com/store/apps/details?id=baby.buppi.app)\n\nMais contexto para agentes: [llms.txt](https://buppi.baby/llms.txt).",
  },
  en: {
    title: "Buppi Baby — the smartest baby routine companion",
    body: "Free app (iOS & Android) to track your baby's routine: sleep, breastfeeding, bottles, diapers, health, growth and milestones with one-tap logging. Buppi learns your baby's rhythm to predict the next nap, and syncs everything across caregivers.\n\n- [Evidence-based blog](https://buppi.baby/en/blog/)\n- [About](https://buppi.baby/en/about/) · [Privacy](https://buppi.baby/en/privacy/) · [Support](https://buppi.baby/en/support/)\n- [App Store](https://apps.apple.com/app/buppi-baby/id6759115928) · [Google Play](https://play.google.com/store/apps/details?id=baby.buppi.app)\n\nAgent guidance: [llms.txt](https://buppi.baby/llms.txt).",
  },
  es: {
    title: "Buppi Baby — el compañero de rutina más inteligente del bebé",
    body: "App gratuita (iOS y Android) para acompañar la rutina del bebé: sueño, lactancia, biberones, pañales, salud, crecimiento e hitos con registros de un toque. Buppi aprende el ritmo de tu bebé para predecir la próxima siesta y sincroniza todo entre cuidadores.\n\n- [Blog basado en evidencia](https://buppi.baby/es/blog/)\n- [Acerca de](https://buppi.baby/es/about/) · [Privacidad](https://buppi.baby/es/privacy/) · [Soporte](https://buppi.baby/es/support/)\n\nGuía para agentes: [llms.txt](https://buppi.baby/llms.txt).",
  },
  fr: {
    title: "Buppi Baby — le compagnon de routine le plus intelligent de bébé",
    body: "Application gratuite (iOS et Android) pour suivre la routine de bébé : sommeil, allaitement, biberons, couches, santé, croissance et étapes clés, en un geste. Buppi apprend le rythme de votre bébé pour prédire la prochaine sieste et synchronise tout entre les personnes qui s'occupent de l'enfant.\n\n- [Blog fondé sur les preuves](https://buppi.baby/fr/blog/)\n- [À propos](https://buppi.baby/fr/about/) · [Confidentialité](https://buppi.baby/fr/privacy/) · [Support](https://buppi.baby/fr/support/)\n\nGuide pour les agents : [llms.txt](https://buppi.baby/llms.txt).",
  },
};

function main() {
  if (!existsSync(OUT)) {
    console.error("out/ não existe — rode depois do `next build`.");
    process.exit(1);
  }
  let count = 0;

  // Homepages + about
  for (const l of LOCALES) {
    const h = HOME[l];
    write(`${prefix(l)}/`, `# ${h.title}\n\n> Canonical: ${BASE}${prefix(l)}/\n\n${h.body}\n`);
    count++;
  }

  // Blog articles
  const blogDir = join(ROOT, "content", "blog");
  for (const id of readdirSync(blogDir)) {
    for (const l of LOCALES) {
      const f = join(blogDir, id, `${l}.mdx`);
      if (!existsSync(f)) continue;
      const { data, content } = matter(readFileSync(f, "utf8"));
      if (data.draft) continue;
      const slug = l === "pt-BR" ? id : String(data.slug ?? id);
      const path = `${prefix(l)}/blog/${slug}/`;
      const faq = (data.faq ?? []) as { question: string; answer: string }[];
      const faqMd = faq.length
        ? `\n\n## FAQ\n\n${faq.map((x) => `### ${x.question}\n\n${x.answer}`).join("\n\n")}`
        : "";
      const md = `# ${data.title}\n\n> ${data.description}\n>\n> Canonical: ${BASE}${path}\n\n${mdxToMd(content)}${faqMd}\n`;
      write(path, md);
      count++;
    }
  }

  // 404 body served to agents by the Cloudflare worker
  writeFileSync(
    join(OUT, "404.md"),
    `# 404 — page not found\n\nThe path you requested does not exist on buppi.baby. Where to look instead:\n\n- [Sitemap](${BASE}/sitemap.xml) — every page on the site\n- [llms.txt](${BASE}/llms.txt) — what this site is and when to use it\n- [Blog index (pt-BR)](${BASE}/blog/) · [JSON index](${BASE}/ai/blog-index.pt-BR.json)\n- [Home](${BASE}/)\n`,
  );
  count++;
  console.log(`✓ md mirror: ${count} arquivos gerados em out/`);
}

main();
