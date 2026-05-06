import { copyFileSync, existsSync, mkdirSync, readdirSync, rmSync, statSync } from "node:fs";
import { join } from "node:path";

const CONTENT_ROOT = join(process.cwd(), "content", "blog");
const PUBLIC_ROOT = join(process.cwd(), "public", "blog");

const ASSET_EXT = new Set([".webp", ".png", ".jpg", ".jpeg", ".gif", ".svg", ".avif"]);

function copyArticleAssets(articleId: string): number {
  const src = join(CONTENT_ROOT, articleId);
  const dest = join(PUBLIC_ROOT, articleId);
  const files = readdirSync(src).filter((f) => {
    const ext = f.slice(f.lastIndexOf(".")).toLowerCase();
    return ASSET_EXT.has(ext);
  });
  if (files.length === 0) return 0;
  mkdirSync(dest, { recursive: true });
  for (const file of files) {
    copyFileSync(join(src, file), join(dest, file));
  }
  return files.length;
}

function main() {
  if (existsSync(PUBLIC_ROOT)) {
    rmSync(PUBLIC_ROOT, { recursive: true, force: true });
  }
  if (!existsSync(CONTENT_ROOT)) {
    console.log("✓ No blog content found, skipping asset copy");
    return;
  }
  let totalFiles = 0;
  let totalArticles = 0;
  for (const articleId of readdirSync(CONTENT_ROOT)) {
    if (articleId.startsWith(".")) continue;
    const src = join(CONTENT_ROOT, articleId);
    if (!statSync(src).isDirectory()) continue;
    const count = copyArticleAssets(articleId);
    if (count > 0) {
      totalArticles += 1;
      totalFiles += count;
    }
  }
  console.log(`✓ Copied ${totalFiles} blog asset${totalFiles === 1 ? "" : "s"} from ${totalArticles} article${totalArticles === 1 ? "" : "s"}`);
}

try {
  main();
} catch (err) {
  console.error(`✗ Asset copy failed: ${err instanceof Error ? err.message : err}`);
  process.exit(1);
}
