---
name: blog-article
description: Use this skill to author a new Buppi Baby blog post end-to-end (pt-BR draft → Gemini review → Codex cover → translate to en/es/fr → validate, build, commit, push). Invoke when the user asks to "criar um artigo", "escrever um post", "publicar o próximo da lista", or any equivalent.
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

3. **Send the pt-BR draft to Gemini for review** (mandatory — see §"Gemini review"
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
sites directly. Verify each URL is reachable before committing.

## Gemini review

After the pt-BR draft is saved, run:

```bash
gemini -p "$(cat <<'PROMPT'
Aja como um revisor pediátrico crítico. Leia o artigo abaixo (em português) e
aponte:

1. Imprecisões clínicas ou afirmações que precisam de fonte
2. Generalizações arriscadas ("sempre", "nunca") que deveriam ser mais nuançadas
3. Buracos no conteúdo (perguntas óbvias do leitor que ficam sem resposta)
4. Sugestões de melhorias estruturais

Seja específico — cite o trecho exato do artigo. Não reescreva, só aponte.
NÃO comente questões de estilo/gramática. Foque em conteúdo e correção factual.

Resposta em português, no máximo 400 palavras.

ARTIGO:
$(cat content/blog/<id>/pt-BR.mdx)
PROMPT
)"
```

Read Gemini's response carefully:

- **Apply factually-grounded corrections** to the pt-BR draft
- **Ignore style nitpicks** (we own the voice)
- **Push back via the user** if Gemini disagrees with a clinical claim that's
  actually well-sourced — the user makes the final call

If Gemini surfaces something significant, mention it briefly to the user before
applying the change.

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
- Don't skip Gemini review — even when the article feels solid. Catches
  factual issues before they ship to thousands of parents.
- Don't reuse the same CTA id twice in one article
- One CTA `featured` (= `download`) per article max, and only at the end
- Don't paraphrase copyrighted source text — write from understanding, with
  ≤15-word direct quotes if absolutely needed
