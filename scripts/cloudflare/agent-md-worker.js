/**
 * buppi.baby — markdown content negotiation for agents.
 *
 * The static build (scripts/build-md-mirror.ts) generates an `index.md` next to
 * every page's `index.html` (plus /404.md). This worker:
 *
 *   - When the request prefers `text/markdown` (Accept header), serves the
 *     page's markdown mirror with `Content-Type: text/markdown` and
 *     `Vary: Accept` — origin URLs stay distinct (…/index.md), so the cache
 *     can never poison HTML with markdown or vice-versa.
 *   - Adds `Vary: Accept` to negotiable HTML responses too.
 *   - On a miss (no mirror / unknown path) serves /404.md with status 404.
 *
 * Deploy (see CLAUDE skill `cloudflare`):
 *   curl -X PUT "$CF/accounts/$ACC/workers/scripts/buppi-agent-md" \
 *     -H "$AUTH" \
 *     -F 'metadata={"main_module":"agent-md-worker.js","compatibility_date":"2025-01-01"};type=application/json' \
 *     -F 'agent-md-worker.js=@scripts/cloudflare/agent-md-worker.js;type=application/javascript+module'
 *   route: {"pattern":"buppi.baby/*","script":"buppi-agent-md"}
 */

const MD_TYPE = "text/markdown; charset=utf-8";

function wantsMarkdown(accept) {
  if (!accept) return false;
  // text/markdown must be present and preferred over text/html.
  const md = accept.indexOf("text/markdown");
  if (md === -1) return false;
  const html = accept.indexOf("text/html");
  return html === -1 || md < html;
}

/** Paths eligible for negotiation: directory-style pages only. */
function mirrorPathFor(pathname) {
  if (pathname.endsWith("/")) return pathname + "index.md";
  // extensionless path (no trailing slash) — normalize like the site does
  if (!/\.[a-z0-9]+$/i.test(pathname)) return pathname + "/index.md";
  return null;
}

function withVaryAccept(response) {
  const r = new Response(response.body, response);
  const vary = r.headers.get("Vary");
  if (!vary) r.headers.set("Vary", "Accept");
  else if (!/(^|,\s*)accept(\s*,|$)/i.test(vary)) r.headers.set("Vary", vary + ", Accept");
  return r;
}

async function serveMarkdown(request, url, mirrorPath) {
  const mdUrl = new URL(mirrorPath, url.origin);
  const res = await fetch(new Request(mdUrl, { method: "GET", headers: request.headers }));
  if (res.ok) {
    const out = new Response(request.method === "HEAD" ? null : res.body, res);
    out.headers.set("Content-Type", MD_TYPE);
    out.headers.set("Vary", "Accept");
    out.headers.set("X-Markdown-Source", mirrorPath);
    return out;
  }
  // No mirror for this path → markdown 404 body, real 404 status.
  const nf = await fetch(new URL("/404.md", url.origin));
  return new Response(request.method === "HEAD" ? null : nf.body, {
    status: 404,
    headers: { "Content-Type": MD_TYPE, "Vary": "Accept" },
  });
}

export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (request.method === "GET" || request.method === "HEAD") {
      const mirrorPath = mirrorPathFor(url.pathname);
      if (mirrorPath && wantsMarkdown(request.headers.get("Accept"))) {
        return serveMarkdown(request, url, mirrorPath);
      }
      const res = await fetch(request);
      const type = res.headers.get("Content-Type") || "";
      // Only HTML pages are negotiable — declare it.
      if (mirrorPath && type.includes("text/html")) return withVaryAccept(res);
      return res;
    }

    return fetch(request);
  },
};
