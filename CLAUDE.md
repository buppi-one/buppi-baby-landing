# CLAUDE.md — Buppi Baby landing & blog

Marketing site + multilingual blog for Buppi Baby (the baby-tracking app).
Next.js static export (MDX content), deployed to Cloudflare. Four locales:
**pt-BR (canonical, at the root), en, es, fr** — 32 posts each, with correct
hreflang + sitemap.

- Blog content lives in `content/blog/<id>/{pt-BR,en,es,fr}.mdx`.
- Canonical blog mechanics (frontmatter, CTAs, MDX components, images) →
  `docs/blog.md`. The editorial pipeline → the **`blog-article` skill**
  (`.claude/skills/blog-article/SKILL.md`). Content backlog → `docs/blog-content-plan.md`.

## SEO / Google Search Console

The blog's technical SEO is already solid (hreflang, canonicals, sitemap,
Article/FAQ JSON-LD). The lever now is **content that matches real search
intent** and **titles that convert impressions into clicks** — both driven by
live Search Console data.

### Access

Search Console data is pulled with the **GA4 service account**
(`buppi-dashboard@buppi-baby.iam.gserviceaccount.com`), which has `siteFullUser`
on the Domain property `sc-domain:buppi.baby`. The key is at
`credentials/ga4-service-account.json` — **gitignored, never commit it**.

The puller is `scripts/gsc.ts` (self-contained: signs the SA JWT with Node
crypto, no extra deps). Data lags ~2 days, so the window ends 2 days ago.

```bash
npx tsx scripts/gsc.ts overview [days]         # totals + top queries/pages/countries
npx tsx scripts/gsc.ts opportunities [days]    # striking-distance queries → article ideas
npx tsx scripts/gsc.ts ctr [days]              # high-impression low-CTR pages → rewrite titles
npx tsx scripts/gsc.ts page <url-substr> [days]# exact queries a given post ranks for
```

`days` defaults to 28. Brazil is the main market; pt-BR carries most traffic,
with es/fr/en growing.

### Workflow A — mine GSC to decide what to write next

Before picking the next row in `docs/blog-content-plan.md`, check what the
audience is already searching for and where we ALMOST rank:

1. Run `npx tsx scripts/gsc.ts opportunities`. It lists queries at **position
   5–20 with real impressions** — page 1–2 but not the top — ranked by
   potential clicks. These are the cheapest wins.
2. **Cluster them by intent.** A tight cluster around one topic (e.g. many
   "quanto de fórmula bebê X meses" / "quantos ml para bebê de N meses" queries)
   means one article can capture the whole cluster. That single signal is worth
   more than guessing from the plan.
3. **Decide reinforce vs. new:**
   - If an existing post already ranks for the cluster but mid-page → **reinforce
     it** (see Workflow B + add a section/table/FAQ answering the exact queries).
   - If nothing covers it → **write a new article** (follow the `blog-article`
     skill end-to-end) and add the row to `docs/blog-content-plan.md`.
4. Match the article to the **actual phrasing** people use (`gsc.ts page <slug>`
   shows the raw queries) — mirror those in H2s, the FAQ block, and tables.
5. Respect the skill's **reference quality bar** — GSC tells you WHAT to write,
   never lower the sourcing standard to chase a keyword.

Note: new/updated content only starts ranking after a re-crawl (days to weeks);
don't expect same-day movement.

### Workflow B — revisit & improve titles of existing posts (CTR loop)

Run periodically (say monthly). Ranking well but not getting clicks is a
**title/meta problem, not a content problem** — the fix is fast and high-ROI.

1. Run `npx tsx scripts/gsc.ts ctr`. It flags pages that get impressions but
   under-convert for their position, ranked by recoverable clicks (e.g. the
   formula page: pos ~8.6, 13.5k impressions, 0.3% CTR → hundreds of lost clicks).
2. For each flagged page, run `npx tsx scripts/gsc.ts page <slug>` to see the
   **exact queries** it appears for.
3. Rewrite the **`title`** and **`description`** frontmatter (in every locale
   file) to:
   - lead with the concrete benefit / number the query implies (parents search
     specific ml, ages, weights — put those in the title),
   - stay under ~60 chars for the title and ~155 for the description,
   - read like the answer to the query, not a generic topic label.
4. Also sweep pages sitting at **position 8–15** — a sharper title plus a couple
   internal links from related posts can nudge them onto page-1-top.
5. `npm run validate-blog && npm run build`, then commit per the skill's message
   convention. Re-check the same page's CTR on the next run to confirm the lift.

**Don't** change slugs when optimizing titles — that breaks URLs and the hreflang
graph. Title/description only.

### On-site behaviour — Cloudflare Web Analytics

GSC covers **acquisition** (how people find us in search). For **on-site
behaviour** (which pages get read, visits vs. pageviews, referrers, countries,
devices) use Cloudflare Web Analytics. The beacon is **auto-injected by
Cloudflare at the edge** — there is nothing in the repo to install, and it's
cookieless (no consent banner).

Pull it from the terminal with `scripts/cf-analytics.ts`, which queries the CF
GraphQL Analytics API using `$CLOUDFLARE_TOKEN` (needs **Account Analytics ·
Read** on the *Búzios Homes* account, where the `buppi.baby` zone lives). RUM
data is near-real-time (no multi-day lag).

```bash
npx tsx scripts/cf-analytics.ts overview [days]    # totals + top pages/referrers/countries/devices
npx tsx scripts/cf-analytics.ts pages [days]       # top pages by views
npx tsx scripts/cf-analytics.ts referrers [days]   # where visits come from
npx tsx scripts/cf-analytics.ts countries [days]   # by country
```

`days` defaults to 7. Read GSC and CF together: GSC says *what to write and
which titles to sharpen*; CF confirms *whether the change actually moved
reading behaviour*.

### Guardrails

- The key file is a credential: keep it under `credentials/` (gitignored).
- GSC/GA reads are read-only; nothing here writes to Google.
- `CLOUDFLARE_TOKEN` is a personal secret (lives in `~/.zshrc`, never committed);
  the CF analytics read is read-only too.
- Reddit/backlinks do **not** boost ranking (nofollow) — SEO leverage is content
  + hreflang + topical authority, not link-dropping.
