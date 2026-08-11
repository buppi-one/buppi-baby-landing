# Instagram auto-post (@buppi.baby)

Turns a blog article into a **carousel** and posts it to Instagram. The gate is
simple: **if an article's slides exist under `public/ig/<id>-pt-BR/`, it gets
posted; if not, nothing happens.** Generating the slides is the opt-in.

Only **pt-BR** is posted (one account, Brazil focus). Posts are tracked in
`posted.json` so nothing is ever posted twice.

## The flow (new article)

```
write article ──► generate slides ──► git push ──► GitHub Actions
  (/blog-article    (carousel.ts,        (main)      deploy → slides live
   does this          committed to                   → instagram job posts
   automatically)     public/ig/)                    → commits posted.json
```

- **Via `/blog-article`:** slides are generated and committed automatically —
  you do nothing extra, blog + Instagram ship together.
- **By hand:** run the one command below to generate + commit slides.

After the push, the `instagram` job in `.github/workflows/deploy.yml` runs
`post-articles.ts` (after deploy, so the slide URLs are already live). It's
best-effort — it never fails the deploy.

## Daily posting (working through the backlog)

Post one per day, oldest first. See the queue and what's next:

```bash
npx tsx scripts/instagram/queue.ts            # full catalog + status
npx tsx scripts/instagram/queue.ts --pending  # only what's left
npx tsx scripts/instagram/queue.ts --next     # just the next id
```

Then generate + commit that article's slides (the queue prints these exact
commands for the next item):

```bash
npx tsx scripts/instagram/carousel.ts <id> pt-BR
git add public/ig/<id>-pt-BR/
git commit -m "chore(instagram): slides <id>"
git push
```

The CI posts it after the deploy. Re-run `queue.ts` to confirm it flipped to ✅.

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
