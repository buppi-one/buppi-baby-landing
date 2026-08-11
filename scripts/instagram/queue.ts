/**
 * Instagram posting queue — the chronological catalog with status.
 *
 * Lists every pt-BR article ordered by publishedAt and tells you, for each one,
 * where it is in the pipeline:
 *   ✅ postado   — in the ledger (already on Instagram)
 *   🟡 pronto    — slides generated (public/ig/<id>-pt-BR/) but not posted yet
 *   ⬜ pendente  — nothing generated yet (next candidates to work through)
 *
 * Use it to decide what to post next (e.g. one per day, oldest first):
 *   npx tsx scripts/instagram/queue.ts
 *   npx tsx scripts/instagram/queue.ts --pending   # only what's left to do
 *   npx tsx scripts/instagram/queue.ts --next      # just the next id to post
 *
 * Read-only: it never touches Instagram.
 */
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import matter from "gray-matter";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..", "..");
const LEDGER = join(HERE, "posted.json");
const LOCALE = "pt-BR";

/** YAML parses `2026-07-06` as a Date; normalize anything to YYYY-MM-DD. */
function isoDate(v: unknown): string {
  if (v instanceof Date) return v.toISOString().slice(0, 10);
  return String(v ?? "").slice(0, 10);
}

type Row = { id: string; date: string; category: string; title: string; status: "posted" | "ready" | "pending"; permalink?: string };

function load(): Row[] {
  const ledger: Record<string, { permalink?: string }> = existsSync(LEDGER)
    ? JSON.parse(readFileSync(LEDGER, "utf8"))
    : {};
  const blog = join(ROOT, "content", "blog");
  const rows: Row[] = [];
  for (const id of readdirSync(blog)) {
    const file = join(blog, id, `${LOCALE}.mdx`);
    if (!existsSync(file)) continue;
    const { data } = matter(readFileSync(file, "utf8"));
    if (data.draft) continue;
    const key = `${id}-${LOCALE}`;
    const slidesReady = existsSync(join(ROOT, "public", "ig", `${id}-${LOCALE}`, "slide-01.png"));
    const status = ledger[key] ? "posted" : slidesReady ? "ready" : "pending";
    rows.push({
      id,
      date: isoDate(data.publishedAt),
      category: String(data.category ?? ""),
      title: String(data.title ?? ""),
      status,
      permalink: ledger[key]?.permalink,
    });
  }
  return rows.sort((a, b) => a.date.localeCompare(b.date) || a.id.localeCompare(b.id));
}

function main() {
  const args = process.argv.slice(2);
  const rows = load();
  const pending = rows.filter((r) => r.status !== "posted");

  if (args.includes("--next")) {
    const next = pending.find((r) => r.status === "ready") ?? pending[0];
    if (next) console.log(next.id);
    return;
  }

  const show = args.includes("--pending") ? pending : rows;
  const mark = { posted: "✅", ready: "🟡", pending: "⬜" };
  let n = 0;
  for (const r of show) {
    n++;
    const num = String(n).padStart(2, " ");
    const title = r.title.length > 52 ? r.title.slice(0, 51) + "…" : r.title;
    console.log(`${mark[r.status]} ${num}. ${r.date}  ${r.id}`);
    console.log(`         ${title}${r.permalink ? "  → " + r.permalink : ""}`);
  }

  const posted = rows.length - pending.length;
  console.log(`\n${rows.length} artigos · ✅ ${posted} postados · ⬜ ${pending.length} na fila`);
  const next = pending.find((r) => r.status === "ready") ?? pending[0];
  if (next) {
    console.log(`\npróximo:  npx tsx scripts/instagram/carousel.ts ${next.id} ${LOCALE}`);
    console.log(`depois:   git add public/ig/${next.id}-${LOCALE}/ && git commit -m "chore(instagram): slides ${next.id}" && git push`);
  }
}

main();
export {};
