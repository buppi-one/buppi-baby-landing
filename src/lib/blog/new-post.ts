import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LOCALES = ["pt-BR", "en", "es", "fr"] as const;
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const VALID_CATEGORIES = [
  "sleep",
  "feeding",
  "development",
  "health",
  "expecting-and-new-parents",
  "news",
] as const;

function parseArgs(argv: string[]): Record<string, string> {
  const out: Record<string, string> = {};
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg.startsWith("--")) {
      const eq = arg.indexOf("=");
      if (eq !== -1) {
        out[arg.slice(2, eq)] = arg.slice(eq + 1);
      } else {
        out[arg.slice(2)] = argv[++i] ?? "";
      }
    }
  }
  return out;
}

function templateFor(locale: string, category: string): string {
  const today = new Date().toISOString().slice(0, 10);
  return `---
title: ""
description: ""
publishedAt: ${today}
category: ${category}
tags: []
draft: true
---

`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const id = args.id;
  const category = args.category ?? "expecting-and-new-parents";

  if (!id) {
    console.error("Usage: npm run new-post -- --id=<article-id> [--category=<slug>]");
    console.error(`Categories: ${VALID_CATEGORIES.join(", ")}`);
    process.exit(1);
  }
  if (!SLUG_RE.test(id)) {
    console.error(`✗ Invalid id "${id}" — must be lowercase letters/digits/hyphens`);
    process.exit(1);
  }
  if (!(VALID_CATEGORIES as readonly string[]).includes(category)) {
    console.error(`✗ Unknown category "${category}". Valid: ${VALID_CATEGORIES.join(", ")}`);
    process.exit(1);
  }

  const dir = join(process.cwd(), "content", "blog", id);
  if (existsSync(dir)) {
    console.error(`✗ Directory already exists: ${dir}`);
    process.exit(1);
  }
  mkdirSync(dir, { recursive: true });

  for (const locale of LOCALES) {
    writeFileSync(join(dir, `${locale}.mdx`), templateFor(locale, category));
  }

  console.log(`✓ Created content/blog/${id}/ with ${LOCALES.length} locale files (drafts).`);
  console.log(`  Edit each .mdx, fill title and description, write the body, then flip draft to false.`);
}

main();
