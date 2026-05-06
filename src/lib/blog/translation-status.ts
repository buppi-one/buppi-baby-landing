import { LOCALES } from "@/i18n";
import { loadAllArticles } from "./loader";

const ALL_LOCALES = [...LOCALES];

function main() {
  const articles = loadAllArticles();
  const byId = new Map<string, Map<string, { draft: boolean }>>();
  for (const a of articles) {
    if (!byId.has(a.id)) byId.set(a.id, new Map());
    byId.get(a.id)!.set(a.locale, { draft: !!a.frontmatter.draft });
  }

  if (byId.size === 0) {
    console.log("(no articles)");
    return;
  }

  const ids = Array.from(byId.keys()).sort();
  const widthId = Math.max(...ids.map((s) => s.length), 12);

  const header =
    "Article".padEnd(widthId) +
    "  " +
    ALL_LOCALES.map((l) => l.padEnd(7)).join("");
  console.log(header);
  console.log("-".repeat(header.length));

  for (const id of ids) {
    const renditions = byId.get(id)!;
    const cells = ALL_LOCALES.map((l) => {
      const r = renditions.get(l);
      if (!r) return "—".padEnd(7);
      return (r.draft ? "draft" : "✓").padEnd(7);
    });
    console.log(id.padEnd(widthId) + "  " + cells.join(""));
  }

  const missing: string[] = [];
  for (const id of ids) {
    for (const loc of ALL_LOCALES) {
      if (!byId.get(id)!.has(loc)) missing.push(`  ${id} → ${loc}`);
    }
  }
  if (missing.length > 0) {
    console.log("\nMissing translations:");
    for (const line of missing) console.log(line);
  }
}

main();
