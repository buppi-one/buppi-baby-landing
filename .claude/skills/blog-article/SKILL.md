---
name: blog-article
description: Use this skill to author a new Buppi Baby blog post end-to-end (pt-BR draft → AI peer review (Antigravity `agy`) → Codex cover → translate to en/es/fr → validate, build, commit, push). Invoke when the user asks to "criar um artigo", "escrever um post", "publicar o próximo da lista", or any equivalent.
---

# Authoring a Buppi Baby blog article

This skill encodes the agreed-upon workflow. The canonical reference for blog
mechanics (frontmatter, CTAs, MDX components, image sizes) is `docs/blog.md` —
read it whenever a detail is unclear.

## Order of operations (do NOT reorder)

1. **Pick the next article** from `docs/blog-content-plan.md` (first row whose status
   column is `⬜`). If the user names a different topic, use that instead.

2. **Draft the pt-BR version first.** Portuguese is the canonical version — every
   other locale is a translation of this one. Write it under
   `content/blog/<id>/pt-BR.mdx`.

3. **Send the pt-BR draft for AI peer review** (mandatory — see §"AI review"
   below). Apply meaningful feedback before moving on.

4. **Generate the cover with Codex** (see §"Codex cover" below). Optimize to webp.

5. **Wire `cover: ./cover.webp` in the pt-BR frontmatter.**

6. **Translate to en, es, fr** (in this order, all in one go). Add
   `cover: ./cover.webp` to each translated frontmatter.

7. **Validate + build + commit + push.**

8. **Mark the row in `docs/blog-content-plan.md`** as
   `✅ <YYYY-MM-DD> (4 idiomas)`.

## Drafting the pt-BR article

Match the structure and depth of recent articles for consistency. Use the colic
or the breastfeeding article as templates:

- `content/blog/como-acalmar-bebe-colica/pt-BR.mdx`
- `content/blog/amamentacao-primeiros-dias/pt-BR.mdx`

Frontmatter checklist (the validator will fail without these):

- `title`, `description`, `publishedAt` (today, ISO date)
- `category` (one of: sleep, feeding, development, health,
  expecting-and-new-parents, news)
- `tags` (lowercase, no accents)
- `draft: false`
- `faq` (4–6 items with `question` and `answer`)
- `references` (3–5 authoritative sources — see §"Reference quality bar" below)
- `slug` is **only added on en/es/fr** translations — pt-BR uses the folder name
- `cover: ./cover.webp` is added LATER, after Codex generates it

Body conventions:

- Length: 1500–2000 words for in-depth guides
- Use H2 (`##`) for sections, H3 (`###`) for subsections
- Tables for comparison content (age ranges, day-by-day, etc.)
- 1–2 `<Cta id="..." />` per article (registry in `src/lib/blog/ctas.ts`),
  placed between sections, never twice the same id
- One blockquote `>` per article max for "when to seek help" / safety callouts
- All references via `references:` frontmatter, not inline links to sources
- Translations of `references:` may swap one of the regional sources for
  a locale-appropriate authority (e.g. SBP for pt-BR, AEP for es, HAS for fr,
  CDC/AAP for en) — keep the international ones (WHO, AAP) consistent

## Reference quality bar

**Always cite authoritative sources. Never cite blogs or little-known websites.**
Parents trust this content with their kids' health — the references are the
proof of trust.

Acceptable sources (in rough preference order):

- **Peer-reviewed journals** (PubMed-indexed): Pediatrics, JAMA, NEJM, BMJ,
  Lancet, JCSM, etc. Always cite the article, not a press summary.
- **National pediatric/medical societies**: AAP (`healthychildren.org`,
  `publications.aap.org`), SBP, AEP, SFP, ABM, La Leche League International.
- **Governmental health authorities**: WHO, CDC, NIH, NHS, Ministério da Saúde,
  HAS, Sanidad (gobierno.es).
- **WHO/UNICEF guidance documents** for international standards.

**Never cite**:

- Personal blogs, parenting magazines, mom-influencer sites
- Wikipedia (use it for orientation, but cite the underlying source)
- Commercial sites with editorial content (e.g. baby brand "advice" pages)
- Aggregator sites or Q&A sites
- Social media posts

If you can't find a high-quality reference for a claim, **soften the claim**
or remove it. Don't lower the source bar to keep an unsupported claim.

When in doubt, search PubMed (`pubmed.ncbi.nlm.nih.gov`) or the AAP/WHO/SBP/CDC
sites directly.

### Verify every reference URL points to the ACTUAL paper (mandatory)

A URL returning HTTP 200 is **not** proof the citation is correct. Past audit
found three references where the URL was live but pointed to a *completely
different paper* than the title/authors claimed (a peanut-allergy URL that
resolved to an Alzheimer's paper, an AAP article ID that resolved to "Equipment
for Ground Ambulances"). This is the worst failure mode — a fabricated citation
that looks legitimate.

For **every** reference before committing:

1. **Prefer stable PubMed URLs** for journal papers: `pubmed.ncbi.nlm.nih.gov/<PMID>/`.
   Publisher URLs (Oxford, Elsevier/ScienceDirect, AAP, Wiley) rot and reuse
   article IDs. PubMed IDs are permanent.
2. **Open the URL and confirm the page title matches the cited paper's title
   and authors.** Don't trust that you "remember" the URL — look.
3. If you cannot verify a paper exists with that exact title/authors, **do not
   invent a plausible URL**. Remove the citation or replace it with one you
   verified.
4. Run `npx tsx scripts/audit-references.ts` after writing the article — it
   HTTP-checks every reference and flags soft 404s (200 + "page not found"
   body). Remaining 403s from known publishers (NEJM, AAP, AASM, Wiley, HAS)
   are anti-bot blocks, not real breakage — those are acceptable.

Never write a citation from memory of "a paper that probably exists." Either
verify it or omit it.

## AI review (Antigravity `agy`)

The old `gemini` CLI is **deprecated** — Google retired the free
"Gemini Code Assist for individuals" tier and the binary now exits with
`IneligibleTierError`. Use the **Antigravity CLI (`agy`)** instead.

**The invocation changed after an Antigravity auto-update (July 2026).** Two
things that USED to work now break:

1. **`--print` takes the prompt as its VALUE, not via stdin.** The old stdin
   form (`… | agy --print`) now errors with `flag needs an argument: -print`.
2. **Do NOT pass `--print-timeout`.** With it, agy frequently fixates on that
   flag and answers a generic question *about* `--print-timeout` instead of
   reviewing the article. The default timeout (5m) is fine — just omit the flag.

The reliable form: write instructions + article to a file, then pass the file
contents as the `--print` value:

```bash
{ printf 'Aja como revisor pediátrico crítico de um artigo sobre <TEMA>. Aponte: (1) imprecisões clínicas ou afirmações sem fonte; (2) generalizações arriscadas (sempre/nunca) a nuançar; (3) buracos de conteúdo (dúvidas óbvias do leitor sem resposta); (4) melhorias estruturais. Cite o trecho exato. Não reescreva. Ignore estilo/gramática. Português, máx 400 palavras.\n\n=== ARTIGO ===\n'; \
  cat content/blog/<id>/pt-BR.mdx; } > /tmp/agy-prompt.txt
agy --print "$(cat /tmp/agy-prompt.txt)"
```

Notes on `agy`:

- **Prompt goes as the `--print` value** (see above), NOT stdin, and **without
  `--print-timeout`**. Do NOT use `--new-project` (it triggers a "what do you
  want to build?" project-setup tangent).
- **It's still flaky.** If the output talks about CLI flags / `--print-timeout`
  / "what would you like to build" instead of the pediatric review, just re-run
  it. If it keeps wandering after ~2 retries, do a careful clinical self-review
  instead and tell the user agy was unreliable — don't block the pipeline on it
  (same fallback as when `gemini` was down).
- `agy models` lists what's available (Gemini 3.5 Flash default, Gemini 3.1 Pro,
  Claude Sonnet/Opus, GPT-OSS). The `--model "…(High)"` display-name flag is
  unreliable (silently falls back to the default); just use the default.
- Runs in ~1–3 min; safe with `run_in_background: true`. Output is buffered —
  nothing prints until it finishes.
- `agy` is at `~/.local/bin/agy` (installed by Antigravity.app, which
  **auto-updates** — its CLI behavior may shift again; if the command errors,
  check `agy --help` for the current flag semantics).

Read the reviewer's response carefully:

- **Apply factually-grounded corrections** to the pt-BR draft
- **Ignore style nitpicks** (we own the voice)
- **Push back via the user** if the reviewer disagrees with a clinical claim
  that's actually well-sourced — the user makes the final call

If the review surfaces something significant, mention it briefly to the user
before applying the change.

## Codex cover

Use Codex via CLI to generate a 1200×630 cover. Always run with `--sandbox
workspace-write` so it can save the PNG into the article folder.

```bash
codex exec --sandbox workspace-write "Você está criando a imagem de capa pra um artigo de blog do Buppi Baby (app de baby tracker).

Leia o conteúdo do artigo em content/blog/<id>/pt-BR.mdx (use só o título + os 2 primeiros parágrafos como contexto criativo). O tema é <TEMA>.

Gere uma imagem de capa com estas especificações e salve em content/blog/<id>/cover.png:

- 1200 × 630 pixels (proporção 16:9, padrão OpenGraph)
- SEM nenhum texto na imagem
- Estilo: livre — escolha o que mais combina com o tema (foto, ilustração, aquarela, digital art, line art). <SUGESTÃO POR CATEGORIA>
- Sensação: <CALMA / TERNURA / SEGURA — adaptar ao tema>, parental — nada clínico, nada de stock comercial frio
- Paleta da marca como referência (não obrigatório usar todas): lavanda suave (#ac92ee), mint (#92d6cf), pêssego (#ffbfa5), creme (#faf9f6). Use 2–3 cores principais.
- Composição: sujeito principal claramente identificável, espaço respiratório
- Sugestões de sujeito (escolha UMA, não amontoe): <3-4 sujeitos pertinentes ao tema>
- EVITE: <coisas a evitar — ex: para amamentação evite mamadeira; para sono evite relógios; sempre evite stock smile>

Use a ferramenta de geração de imagem disponível. O arquivo final DEVE ficar em content/blog/<id>/cover.png como PNG, 1200x630. Faça resize/crop final com magick se necessário."
```

Run with `run_in_background: true` (1–3 min). When done, **view the PNG** with
the `Read` tool and decide if it fits. If not, ask the user before regenerating.

Optimize:

```bash
cd content/blog/<id> && cwebp -q 78 cover.png -o cover.webp && rm cover.png
```

(For photographic covers use `-q 82`.) Target: < 50 KB.

## Translate to en, es, fr

Translate from the (final) pt-BR file. Per-locale quirks:

- **Slug**: each non-pt-BR file gets `slug: <english-or-localized-kebab>` in the
  frontmatter (URL slug for that locale)
- **References**: keep AAP/WHO consistent across locales; swap the regional one
  for a locale authority (CDC/AAP add'l for en, AEP for es, HAS / La Leche League
  France for fr, SBP / Ministério da Saúde for pt-BR)
- **Tags**: translate (e.g. `amamentacao` → `breastfeeding` / `lactancia` /
  `allaitement`)
- **Cover**: same `./cover.webp` reference in all four files
- **Voice**: parental, warm, factual — match the existing articles in tone

## Validate, build, commit, push

```bash
npm run validate-blog            # must say "X published, 0 drafts"
npm run build                    # must succeed
git add content/blog/<id>/ docs/blog-content-plan.md
git commit                       # see commit message conventions below
git push origin main
```

Commit message format (mirror recent commits):

```
content(blog): publish "<short title>" (4 locales)

<2–3 line summary of the article scope and sources>

Cover generated via Codex and optimized to <N>KB webp. Plan #<N> marked done.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
```

After push, the GitHub Pages workflow auto-deploys (~1–2 min) and Cloudflare
purges. The four URLs to give the user:

- `https://buppi.baby/blog/<pt-BR-slug>`
- `https://buppi.baby/en/blog/<en-slug>`
- `https://buppi.baby/es/blog/<es-slug>`
- `https://buppi.baby/fr/blog/<fr-slug>`

## Plan bookkeeping

Edit `docs/blog-content-plan.md`: change the row's status column from `⬜` to
`✅ <YYYY-MM-DD> (4 idiomas)`. Use today's date.

## Common pitfalls (don't repeat past mistakes)

- Cover must be referenced as `./cover.webp` (with the `./` prefix) — without
  it the validator fails silently for some locales
- Don't draft directly in en — the en version inevitably ends up shorter and
  less culturally grounded. Always pt-BR first.
- Don't skip the AI review (`agy`) — even when the article feels solid. Catches
  factual issues before they ship to thousands of parents.
- Don't reuse the same CTA id twice in one article
- One CTA `featured` (= `download`) per article max, and only at the end
- Don't paraphrase copyrighted source text — write from understanding, with
  ≤15-word direct quotes if absolutely needed
