# Instagram auto-post (@buppi.baby)

Turns blog articles into **carousels** and posts them to Instagram, **one per
day, oldest first**, on a schedule. The gate is simple: **an article is a
candidate only if its slides exist under `public/ig/<id>-pt-BR/`.** Generating
the slides is the opt-in.

Only **pt-BR** is posted (one account, Brazil focus). Posts are tracked in
`posted.json` so nothing is ever posted twice.

## The flow

```
generate slides ──► git push ──► deploy.yml hosts them at buppi.baby
 (carousel.ts →                        │
  public/ig/)                          ▼
                        instagram-daily.yml (cron, 1×/day)
                        posts the OLDEST unposted candidate
                        → commits posted.json  [skip ci]
```

- **`deploy.yml`** only builds + hosts the slides — it does **not** post.
- **`instagram-daily.yml`** is the sole poster: daily, it posts exactly one
  carousel (`post-articles.ts --limit 1`), the oldest article with slides not
  yet in the ledger.
- **Queue empty?** The daily run does nothing (logs a notice). Publish a new
  article (slides committed) and it joins the queue — posted on the next run.
- **Pause:** disable *Instagram daily* in the repo's Actions tab.
- Run it now instead of waiting: Actions tab → *Instagram daily* → *Run
  workflow* (or `gh workflow run instagram-daily.yml`).

## Working the queue

```bash
npx tsx scripts/instagram/queue.ts            # full catalog + status
npx tsx scripts/instagram/queue.ts --pending  # only what's left
npx tsx scripts/instagram/queue.ts --next     # just the next id
```

Generate + commit an article's slides so it enters the queue:

```bash
npx tsx scripts/instagram/carousel.ts <id> pt-BR
git add public/ig/<id>-pt-BR/
git commit -m "chore(instagram): slides <id>" && git push
```

Post the next one immediately (bypass the schedule), locally:

```bash
npx tsx scripts/instagram/post-articles.ts --limit 1   # needs IG_* in env
```

Status markers: ✅ posted (in the ledger) · 🟡 slides ready, not posted yet ·
⬜ nothing generated yet.

## Preview before it goes live

```bash
npx tsx scripts/instagram/carousel.ts <id> pt-BR   # inspect PNGs in public/ig/
npx tsx scripts/instagram/caption.ts <id> pt-BR    # see the caption
npx tsx scripts/instagram/post-articles.ts --dry-run
```

## Files

| File | Role |
|---|---|
| `carousel.ts` | article → 1080×1350 slides (cover art + FAQ + CTA) → `public/ig/<id>-<locale>/` |
| `caption.ts` | builds the caption (hook, FAQ bullets, CTAs, hashtags) — `buildCaption(id, locale)` |
| `ig-publish.ts` | the Instagram Graph API carousel publish (3-step) — `publishCarousel(...)` |
| `post-articles.ts` | orchestrator: scan slides → check ledger → verify URLs live → publish → record |
| `queue.ts` | chronological catalog with posted/pending status |
| `ig-auth.ts` | one-time token helper (short token → long-lived Page token + IG account id) |
| `posted.json` | the ledger (do not hand-edit unless you mean to repost) |
| `fonts/` | static Quicksand/Outfit weights (Satori can't parse variable fonts) |

## Secrets (GitHub Actions)

The `instagram` job needs two repo secrets; without them it just skips (warning,
no failure):

- `IG_BUSINESS_ACCOUNT_ID` — the Instagram Business account id.
- `IG_ACCESS_TOKEN` — long-lived Page access token (doesn't expire while
  permissions hold). Regenerate with `ig-auth.ts` if it's ever revoked.

Both also live in `~/.zshrc` for local runs. **Never commit them.**

## Editing / deleting a post

Instagram's API **can't edit or delete a published post** (caption edits are
manual, in the app). So:

- **Fixed an article after posting?** `post-articles.ts` detects the change (a
  content hash over title + FAQ) and only **warns** — it does not repost. If the
  fix matters, delete the post in the app and remove that article's entry from
  `posted.json`; the next run reposts it.
- **Deleting the post in-app** doesn't remove the ledger entry, so it won't be
  reposted. Remove the entry manually if you want it back.

## Never recommend medications

Slides and captions are generated from the article (title, FAQ, `instagram:` spec),
so the blog's hard rule applies here too: no drug names, classes-as-advice or doses
— ever. `npm run validate-blog` blocks it at the source; if a post slips through,
delete it in-app and remove its ledger entry so the fixed version reposts.
