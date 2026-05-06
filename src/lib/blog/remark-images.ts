import type { Root } from "mdast";
import type { Plugin } from "unified";

type Options = { articleId: string };

/**
 * Rewrite relative image URLs (`./foo.png`) inside an article's MDX to
 * absolute paths under `/blog/{articleId}/`, where the asset-copy script
 * placed them at build time.
 */
export const remarkRewriteRelativeImages: Plugin<[Options], Root> = ({ articleId }) => {
  const prefix = `/blog/${articleId}/`;
  const visit = (node: { type: string; url?: string; children?: Array<{ type: string; url?: string; children?: unknown[] }> }) => {
    if (node.type === "image" && typeof node.url === "string" && node.url.startsWith("./")) {
      node.url = prefix + node.url.slice(2);
    }
    if (Array.isArray(node.children)) {
      for (const child of node.children) {
        visit(child as Parameters<typeof visit>[0]);
      }
    }
  };
  return (tree) => {
    visit(tree as unknown as Parameters<typeof visit>[0]);
  };
};
