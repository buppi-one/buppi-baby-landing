# Blog — guia de criação e padrões editoriais

Este documento cobre tudo o que você precisa pra publicar artigos no blog do Buppi Baby:
estrutura de arquivos, padrões de escrita, formato de FAQ e referências, fluxo de tradução
e checklist antes de publicar.

> **Em resumo**: artigos vivem em `content/blog/{id}/{locale}.mdx`, têm slug específico por
> idioma, podem incluir FAQ e referências estruturadas, e são validados no `npm run build`.

---

## Sumário

1. [Como criar um novo artigo](#1-como-criar-um-novo-artigo)
2. [Estrutura do frontmatter](#2-estrutura-do-frontmatter)
3. [Categorias e tags](#3-categorias-e-tags)
4. [Padrões de escrita](#4-padrões-de-escrita)
5. [Imagens (cover e inline)](#5-imagens-cover-e-inline)
6. [FAQ — formato padronizado](#6-faq--formato-padronizado)
7. [Referências científicas — formato padronizado](#7-referências-científicas--formato-padronizado)
8. [Tradução](#8-tradução)
9. [Slug por idioma](#9-slug-por-idioma)
10. [Drafts e publicação](#10-drafts-e-publicação)
11. [Checklist antes de publicar](#11-checklist-antes-de-publicar)
12. [Comandos úteis](#12-comandos-úteis)

---

## 1. Como criar um novo artigo

```bash
npm run new-post -- --id=como-introduzir-papinhas --category=feeding
```

Cria `content/blog/como-introduzir-papinhas/` com 4 arquivos `.mdx` (`pt-BR`, `en`, `es`, `fr`),
todos marcados como `draft: true` e com a categoria preenchida.

A partir daí:

1. **Confira `docs/blog-content-plan.md`** — o artigo já está no plano? Se não, adicione
   antes de escrever (evita duplicação e ajuda a planejar interlinks).
2. Escreva primeiro em **pt-BR** (o original).
3. Traduza para os outros idiomas — copie a estrutura, adapte expressões idiomáticas, ajuste
   slugs no frontmatter (ver §9).
4. Adicione cover (opcional) e imagens (ver §5).
5. Adicione FAQ (opcional) e referências (recomendado, ver §6 e §7).
6. Quando estiver pronto, troque `draft: true` para `draft: false` em **todos os idiomas
   que vai publicar** (pode publicar parcial — ex: só pt-BR + en).
7. Rode `npm run validate-blog` para conferir.
8. **Marque o artigo como publicado em `docs/blog-content-plan.md`** — troque `⬜` por
   `✅ <data> (<idiomas>)` na linha correspondente. Ex: `✅ 2026-05-06 (4 idiomas)`.
9. Commit + push. O deploy acontece automaticamente (com purge do Cloudflare).

---

## 2. Estrutura do frontmatter

```yaml
---
title: "Como acalmar um bebê com cólica"
description: "Técnicas comprovadas para aliviar a cólica do bebê de 0 a 6 meses."
publishedAt: 2026-05-05            # data de publicação (YYYY-MM-DD)
updatedAt: 2026-06-12              # opcional — só se você revisar depois
category: baby-care                # ver §3
tags: [colica, recem-nascido]      # opcional, lista
slug: how-to-soothe-baby-colic     # opcional — só em traduções, ver §9
cover: ./cover.webp                # opcional — caminho relativo à pasta
draft: false                       # true = só aparece em dev
faq:                               # opcional — ver §6
  - question: "..."
    answer: "..."
references:                        # opcional, recomendado — ver §7
  - title: "..."
    source: "..."
    url: "https://..."
---
```

### Regras

| Campo | Obrigatório | Regra |
|---|---|---|
| `title` | sim | string não vazia |
| `description` | sim | string — vai pro `<meta description>` e cards |
| `publishedAt` | sim | YYYY-MM-DD |
| `updatedAt` | não | YYYY-MM-DD, deve ser ≥ `publishedAt` |
| `category` | sim | uma das 7 da §3 |
| `tags` | não | array de slugs (`[a-z0-9-]+`) |
| `slug` | não | só em traduções, override do nome da pasta — `[a-z0-9-]+` |
| `cover` | não | caminho relativo começando com `./` |
| `draft` | não | bool, default `false` |
| `faq` | não | ver §6 |
| `references` | não | ver §7 |

`npm run validate-blog` falha o build se algo estiver inválido (slug duplicado, data malformada,
categoria inexistente, cover apontando pra arquivo que não existe, etc.).

---

## 3. Categorias e tags

### Categorias canônicas (escolher 1 por artigo)

São **6 categorias**, na ordem em que aparecem no filtro do blog:

| # | Slug interno | pt-BR | EN | ES | FR |
|---|---|---|---|---|---|
| 1 | `sleep` | Sono | Sleep | Sueño | Sommeil |
| 2 | `feeding` | Alimentação | Feeding | Alimentación | Alimentation |
| 3 | `development` | Desenvolvimento | Development | Desarrollo | Développement |
| 4 | `health` | Saúde | Health | Salud | Santé |
| 5 | `expecting-and-new-parents` | Gestação e novos pais | Expecting & New Parents | Embarazo y nuevos padres | Grossesse et nouveaux parents |
| 6 | `news` | Novidades | News | News | Actualités |

A URL da categoria é **traduzida por idioma**:

- pt-BR: `/blog/categoria/sono/`, `/blog/categoria/gestacao-e-novos-pais/`, etc.
- EN: `/en/blog/category/sleep/`, `/en/blog/category/expecting-and-new-parents/`, etc.

Você só precisa referenciar pelo **slug interno em inglês** no frontmatter — o resto é
configurado em `src/lib/blog/categories.ts`.

### Quando usar cada uma

- **Sleep** — soneca, sono noturno, regressões, métodos de sleep training, transições
- **Feeding** — amamentação, fórmula, introdução alimentar, alergias, BLW
- **Development** — marcos motores, fala, cognitivo, brincadeiras por idade
- **Health** — vacinas, doenças comuns, sinais de alerta, consultas
- **Expecting & New Parents** — pré-natal, parto, primeiros meses, cuidados básicos do
  recém-nascido, cólica, banho, troca de fralda, saúde mental dos pais
- **News** — atualizações do app Buppi (releases, novas features)

### Tags

- Lista livre, mas use **slug** (lowercase, hifenizado, sem acento): `colica`, não `cólica`.
- Mantenha curtas (1–2 palavras).
- Use as **mesmas tags** entre traduções do mesmo artigo (manter consistência).
- Tags ainda não têm página própria — servem como metadado pra futuro filtro/related.

---

## 4. Padrões de escrita

### Audiência

Escrevemos para **mães, pais e cuidadores leigos**, não para profissionais de saúde. A pessoa
que vai ler está no meio do caos da rotina com um bebê. Cada artigo precisa:

- Resolver uma dúvida real
- Ser lido em até 6–8 minutos
- Dar pelo menos uma ação prática

### Tom de voz

- **Acolhedor, sem ser paternalista.** Trate quem lê como adulto inteligente que só não é
  especialista no assunto.
- **Direto.** Frases curtas. Parágrafos curtos. Sem rodeio.
- **Honesto sobre limites.** Não temos certeza absoluta de tudo — quando o consenso médico
  não é unânime, diga isso.
- **Sem alarmismo.** A pessoa já está ansiosa. Não exagere riscos. Mas também não minimize
  sinais que merecem atenção médica.

### O que **evitar**

- ❌ "Como toda mãe sabe…" — assume coisa de quem lê
- ❌ "Especialistas afirmam que…" sem citar quem
- ❌ Recomendações categóricas sobre tratamento ("dê tal medicamento") — sempre redirecione
  pro pediatra
- ❌ Linguagem de venda do app no meio do conteúdo. O artigo é editorial; o app entra em
  CTAs, não no texto
- ❌ Termos médicos sem explicação ("RGE" → "refluxo gastroesofágico, quando…")

### O que **fazer**

- ✅ Começar com a dúvida da pessoa: "Por que meu bebê chora à noite?"
- ✅ Quebrar em **subseções com `##` e `###`** (ajuda leitura e SEO)
- ✅ Usar **listas** quando for natural enumerar
- ✅ Negritar **a palavra-chave** da frase, não a frase inteira
- ✅ Citar fontes com link (no corpo do texto se for específico, no rodapé via `references`
  para o conjunto)
- ✅ Quando recomendar uma técnica, dizer **idade adequada** ("a partir de 6 meses…")
- ✅ Avisar quando procurar pediatra: deixe um bloco `> **Importante**:` com sinais de alerta

### Estrutura recomendada de um artigo

```markdown
[Parágrafo de abertura — 2–3 linhas que confirmam que o leitor está no lugar certo
 e dizem o que o artigo entrega]

## [Definir o problema]
[O que é, por que acontece]

## [Como resolver / o que fazer]
### Técnica 1
### Técnica 2
### Técnica 3

> **Importante**: [sinais que exigem pediatra]

## [O que esperar / quando passa]
[Tempo, evolução natural, quando se preocupar]
```

Depois disso vêm o FAQ (opcional) e as Referências (gerados pelo frontmatter, não escrevemos
manualmente).

### Tamanho

- **Mínimo útil**: ~600 palavras (3–4 min de leitura). Abaixo disso o Google considera "thin
  content".
- **Sweet spot**: 1.000–1.500 palavras (5–7 min).
- **Máximo razoável**: 2.500 palavras. Se passar, considere quebrar em série de artigos.

### Imagens dentro do texto

Use quando ajudam a compreensão (ex: ilustração de posição de amamentação). Não use só pra
"quebrar texto" — fica ruído visual. Ver §5.

---

## 5. Imagens (cover e inline)

Todas as imagens ficam na **mesma pasta do artigo** (`content/blog/{id}/`). O build copia
automaticamente para `public/blog/{id}/` no `npm run build`.

### Cover (opcional)

```yaml
cover: ./cover.webp
```

- **Aspecto**: 16:9 (1200×630 é o tamanho de referência — bate com o OG image padrão)
- **Formato**: **WebP** sempre. PNG/JPG aceitos mas pesam 5–30× mais
- **Tamanho final**: ≤ 50 KB depois de otimizar (não 200 KB — esse era o limite antigo)
- **Sem texto na imagem** (ruim pra SEO, tradução e dark mode)
- Se o artigo não tiver cover, o card no listing usa um gradiente determinístico baseado
  na categoria (visualmente coerente, não fica vazio)

### Workflow recomendado: gerar com Codex + otimizar

Pra cada artigo novo:

#### 1. Peça pro Codex gerar a imagem

Abra o Codex (CLI ou web), passe o conteúdo do artigo e use este prompt como base:

````
Você está criando a imagem de capa pra um artigo de blog do Buppi Baby
(app de baby tracker).

ARTIGO:
"""
[cole o título + os 2 primeiros parágrafos do artigo]
"""

Categoria: [sleep / feeding / development / health / expecting-and-new-parents / news]

Requisitos da imagem:
- 1200 × 630 pixels (proporção 16:9, padrão OpenGraph)
- SEM texto na imagem
- Estilo: livre — escolha o que mais combina com o tema (foto, ilustração,
  aquarela, digital art, line art, colagem...). Pode misturar também.
- Sensação: calma, acolhedora, parental — nada clínico ou comercial agressivo
- Paleta da marca como referência (não obrigatório aplicar todas):
  lavanda suave (#ac92ee), mint (#92d6cf), pêssego (#ffbfa5), creme (#faf9f6).
  Use 2–3 cores principais. Se for foto, busque luz natural quente.
- Composição: sujeito principal claramente identificável, espaço respiratório,
  pode ter elementos decorativos sutis
- Foco no sujeito que evoca o tema, sem ser literal demais (ex: pra um artigo de
  sono, uma luazinha + bebê adormecido funciona melhor que uma cama detalhada)

Salve como `cover.png` na pasta `content/blog/<id>/` do artigo.
````

Ajuste o prompt se o tema pedir algo específico (ex: artigo de família mostrar
silhuetas de mais de uma pessoa).

#### 2. Otimize o PNG pra WebP

PNGs de IA costumam vir com 800 KB–2 MB. Sempre converte:

```bash
cd content/blog/<id>
cwebp -q 78 cover.png -o cover.webp
rm cover.png
```

- `-q 78` é o sweet-spot pra ilustração — abaixo disso aparecem artefatos
- O resultado normalmente fica entre 25 e 50 KB
- Se o cover for fotográfico, use `-q 82` (foto perde qualidade visível mais rápido) e
  considere `-resize 1200 0` se vier maior que isso

#### 3. Referencie no frontmatter

Em **todos** os 4 arquivos (`pt-BR.mdx`, `en.mdx`, `es.mdx`, `fr.mdx`):

```yaml
cover: ./cover.webp
```

O `./` é obrigatório — o validator falha sem ele. O build copia o arquivo pra
`public/blog/{id}/cover.webp` e a `<img>` resultante usa essa URL.

#### 4. Confira

```bash
npm run validate-blog   # garante que cover existe e tem prefixo ./
npm run dev             # acesse o artigo e veja o cover renderizando
```

### Imagens dentro do texto

Coloque o arquivo na mesma pasta e referencie com `./` no MDX:

```markdown
![Posição de amamentação correta](./posicao-amamentacao.webp)
```

O build reescreve `./posicao-amamentacao.webp` para `/blog/{id}/posicao-amamentacao.webp`
e copia o arquivo. **Não use caminhos absolutos** (`/blog/...`) — quebra a portabilidade.

Mesma regra de otimização: gere/baixe a imagem, converta pra WebP com `cwebp`, descarte
o original.

### Direitos de imagem

- ✅ Imagens geradas por IA (Codex/DALL-E/etc.) — preferência sempre
- ✅ Imagens próprias
- ✅ Bancos free (Unsplash, Pexels) — créditos no rodapé do artigo se a licença pedir
- ❌ Imagens com pessoas identificáveis sem release
- ❌ Imagens de bancos pagos sem licença comprada

---

## 6. FAQ — formato padronizado

FAQ é **opcional**, mas quando presente segue um formato fixo no frontmatter:

```yaml
faq:
  - question: "Cólica do bebê é normal?"
    answer: "Sim. Estima-se que 1 em cada 5 bebês saudáveis apresente episódios de cólica..."
  - question: "Quando devo procurar o pediatra?"
    answer: "Sempre que houver febre, vômito persistente, sangue nas fezes..."
```

### Por que estruturado e não dentro do MDX?

- Renderiza com componente acordeão consistente (toggle pra abrir/fechar)
- Gera **JSON-LD `FAQPage`** automaticamente — Google pode mostrar as perguntas direto na
  página de resultados (ganho enorme de clique)
- Garante consistência visual entre todos os artigos

### Boas práticas pra escrever FAQ

- **3–6 perguntas.** Menos que isso é raso, mais cansa.
- **Pergunta no formato real**, como a pessoa digitaria no Google ("Bebê de 2 meses pode
  comer fruta?"), não enxuta ("Frutas para 2 meses").
- **Resposta direta na primeira frase.** Detalhes vêm depois.
- **2–4 linhas por resposta.** Se for longa, vira parágrafo no corpo do artigo, não FAQ.
- **Sem markdown na resposta** (texto plano apenas — JSON-LD não aceita formatação).

---

## 7. Referências científicas — formato padronizado

Referências são **opcionais tecnicamente**, mas **fortemente recomendadas** em qualquer
artigo das categorias `sleep`, `feeding`, `development`, `health` e
`expecting-and-new-parents`. Em artigos de `news` (sobre o app), normalmente não se aplicam.

```yaml
references:
  - title: "Infantile Colic: Recognition and Treatment"
    source: "American Family Physician, 2015 — Johnson JD et al."
    url: "https://www.aafp.org/pubs/afp/issues/2015/1001/p577.html"
  - title: "Probiotics for the Treatment of Infantile Colic"
    source: "Journal of Pharmacy Practice, 2017 — Harb T et al."
    url: "https://pubmed.ncbi.nlm.nih.gov/27520492/"
  - title: "Manual de Orientação"
    source: "Sociedade Brasileira de Pediatria, 2023"
    url: "https://www.sbp.com.br/..."
```

### Campos

- **`title`** (obrigatório): título do artigo/livro/página
- **`source`** (obrigatório): linha de fonte. Padrão: `"<Veículo/Editora>, <ano> — <Autores>"`
- **`url`** (opcional, mas quase sempre presente): link direto. Deve começar com `http(s)://`

### Fontes confiáveis (priorize nessa ordem)

1. **Sociedades médicas e órgãos oficiais**:
   - Sociedade Brasileira de Pediatria (SBP) — sbp.com.br
   - American Academy of Pediatrics (AAP) — aap.org / publications.aap.org
   - World Health Organization (WHO) — who.int
   - NHS — nhs.uk
   - Asociación Española de Pediatría (AEPED)
   - Société Française de Pédiatrie
2. **Periódicos peer-reviewed indexados** (PubMed, Cochrane, BMJ, JAMA Pediatrics, Pediatrics,
   Acta Paediatrica)
3. **Manuais e diretrizes clínicas** (Manual MSD, UpToDate quando público)
4. **Sites de hospitais de referência** (Mayo Clinic, Cleveland Clinic, Hospital Israelita
   Albert Einstein)

### Evitar

- ❌ Blogs pessoais sem credencial médica
- ❌ Sites comerciais de marca de produto (fórmula, fralda) — conflito de interesse
- ❌ Wikipedia (use como ponto de partida, mas linke a fonte primária dela)
- ❌ Links que exigem login

### Como buscar uma referência

1. Identifique a **afirmação específica** que precisa de base ("20% dos bebês têm cólica")
2. Procure no PubMed por "infantile colic prevalence"
3. Pegue a **revisão sistemática mais recente** se houver, ou um artigo de sociedade médica
4. Confirme que o número/conclusão do paper bate com o que você escreveu

### Mesmo conjunto de referências entre traduções?

**Sim, normalmente.** As fontes científicas internacionais (AAP, WHO) servem em todos os
idiomas. **Adapte as fontes regionais por idioma**:

- pt-BR: SBP
- en: AAP, NHS
- es: AEPED, Asociación Latinoamericana de Pediatría
- fr: SFP, HAS (Haute Autorité de Santé)

Se for adaptar, mantenha as 1–2 referências internacionais comuns e troque a regional.

---

## 7.5 Call-to-actions no meio do artigo

Pra puxar o leitor pro app no meio da leitura, use o componente `<Cta />` em
qualquer ponto do MDX. O id é um identificador do CTA cadastrado no registry,
e o componente busca o copy traduzido pro idioma do artigo automaticamente:

```mdx
## Os 5 S de Karp

O método combina cinco gatilhos que recriam o ambiente uterino...

### 1. Swaddle
[detalhes]

### 2. Side/Stomach
[detalhes]

[... continuação das técnicas ...]

<Cta id="health-symptoms" />

## O que NÃO fazer

[próxima seção]
```

O resultado: um card no meio do artigo com ícone, título, body curto e botão de
download — em pt-BR/en/es/fr automaticamente conforme o locale.

### Por que registry e não MDX puro

- **DRY**: 1 lugar pra editar o copy do CTA, em vez de buscar artigo por artigo
- **Tradução centralizada**: 4 idiomas no mesmo bloco
- **Validação no build**: `npm run validate-blog` falha se você referenciar um id
  que não existe — e mostra a lista dos válidos no erro
- **Type-safe**: `CtaId` é union literal, autocomplete no editor se um dia o autor
  escrever direto em TS

### Catálogo atual (15 CTAs)

| ID | Quando usar | Variante |
|---|---|---|
| `sleep-windows` | sono geral, janelas, sonecas | primary |
| `sleep-pediatrician` | levar dados ao pediatra | accent |
| `sleep-routine` | construção de rotina, hábitos | primary |
| `sleep-regression` | regressão, mudança de padrão | secondary |
| `feeds-side-tracker` | amamentação, qual seio começou | secondary |
| `feeds-supply` | "está mamando o suficiente?" | primary |
| `feeds-night-cluster` | cluster feeding, mamadas noturnas | secondary |
| `feeds-bottle` | mamadeira, fórmula, ordenha | primary |
| `diaper-onetap` | fralda em geral, registro rápido | accent |
| `diaper-health` | cor do cocô, frequência, sinal clínico | accent |
| `milestones-keep` | marcos, conquistas, primeiro algo | primary |
| `family-realtime` | compartilhamento, feed familiar | secondary |
| `family-grandparents` | avós, família estendida | secondary |
| `health-symptoms` | cólica, refluxo, alergia — registrar pra mostrar pediatra | accent |
| `download` | genérico, **estilo "featured"** (card grande de fundo escuro) | primary |

### Como escolher o CTA certo

- **1–2 CTAs por artigo, não mais.** Se forçar, perde o efeito e cansa o leitor.
- **Posicione entre seções** — depois do leitor consumir uma ideia, antes da próxima.
  Nunca no meio de um parágrafo.
- **Pegue o mais específico ao gancho do parágrafo anterior.** Ex: depois de uma
  seção sobre regressão de sono, `sleep-regression` bate melhor que `sleep-windows`.
- **Use `download` (featured) só uma vez por artigo**, e geralmente no fim — é o card
  grande, não cabe duas vezes.
- **Não use o mesmo CTA duas vezes** no mesmo artigo.

### Adicionar um CTA novo

Os 15 CTAs cobrem os principais ângulos. Mas se você precisa de um gancho diferente
(ex: artigo sobre amamentação noturna que pede algo mais específico que `feeds-night-cluster`),
adicione no registry:

1. Abra `src/lib/blog/ctas.ts`
2. Adicione uma entrada nova com:
   - `icon`: nome de um BIcon (ver `src/components/BIcon.tsx`)
   - `variant`: `"primary"` (lavanda) / `"secondary"` (mint) / `"accent"` (peach)
   - `style?`: `"compact"` (default — card horizontal) ou `"featured"` (card grande, fundo escuro)
   - `content`: 4 entradas (`pt-BR`/`en`/`es`/`fr`) com `title`, `body`, `cta`
3. Use id no formato `area-angle` (ex: `sleep-night-routine`, `feeds-tandem-nursing`)
4. `npm run validate-blog` confirma que tudo bate

Exemplo de entrada:

```ts
"sleep-newborn-day-night": {
  icon: "moon",
  variant: "primary",
  content: {
    "pt-BR": {
      title: "Inverter o dia e a noite é fase",
      body: "O Buppi mostra a distribuição do sono em 24h e ajuda a identificar quando o ritmo circadiano começa a se firmar.",
      cta: "Baixar grátis",
    },
    en: { title: "...", body: "...", cta: "..." },
    es: { ... },
    fr: { ... },
  },
},
```

### Onde o link do botão aponta

Por padrão, todos os CTAs vão pra `/#baixar` (ou `/{locale}/#baixar` em outros idiomas).
Pra um CTA específico apontar pra outro lugar (ex: deep link do app, página específica),
adicione `href: "/algum-caminho/"` na definição. Não há suporte ainda pra deep links
universais — quando tiver, é uma mudança no helper só.

---

## 8. Tradução

### Workflow

1. Escreva o original em **pt-BR**.
2. Traduza pra `en`, `es`, `fr`. Não precisa publicar todos juntos — pode lançar pt-BR
   primeiro e ir adicionando idiomas depois.
3. Para cada tradução:
   - Mesmo `category` e `tags`
   - **`slug` próprio** no frontmatter (ver §9)
   - Adapte FAQ se a pergunta não fizer sentido cultural (ex: legislação)
   - Adapte 1–2 referências regionais

### Verificar status de traduções

```bash
npm run translation-status
```

Mostra grade `artigo × idioma` com `✓` (publicado), `draft` ou `—` (não existe).

### Artigos regionais (só pt-BR, por exemplo)

Tudo bem ter artigo só em pt-BR (ex: "Como funciona a licença-maternidade no Brasil"). Basta
não criar os arquivos `en.mdx` / `es.mdx` / `fr.mdx`. O sistema:

- Gera só a rota pt-BR
- Não inclui hreflang pros outros idiomas (não existem)
- O redirect cross-locale fica inativo nesse artigo (não há slug equivalente em outros idiomas)

---

## 9. Slug por idioma

O **nome da pasta** (`content/blog/<id>/`) é o slug em pt-BR (idioma default). Para os outros
idiomas, sobrescreva no frontmatter:

```yaml
# en.mdx
slug: how-to-soothe-baby-colic

# es.mdx
slug: como-calmar-colicos-bebe

# fr.mdx
slug: comment-apaiser-bebe-coliques
```

URLs resultantes:

- `/blog/como-acalmar-bebe-colica/` (pt-BR usa o nome da pasta)
- `/en/blog/how-to-soothe-baby-colic/`
- `/es/blog/como-calmar-colicos-bebe/`
- `/fr/blog/comment-apaiser-bebe-coliques/`

### Regras

- Slug em **lowercase, sem acento, com hífen**: `[a-z0-9]+(-[a-z0-9]+)*`
- 3–6 palavras é o ideal
- Inclua a **palavra-chave principal** do artigo no slug (ajuda SEO)
- Slug é **permanente** — se mudar depois, quebra links externos. Mude só se for crítico, e
  considere redirect.

### Por que slug por idioma?

SEO: `how-to-soothe-baby-colic` ranqueia muito melhor pra "soothe colic" do que
`como-acalmar-bebe-colica`. Cada idioma tem o slug otimizado pro vocabulário do mercado
local. Visitantes que clicam em link do idioma errado são automaticamente redirecionados se
tiverem preferência salva (ver código em `src/components/blog/RedirectScript.tsx`).

---

## 10. Drafts e publicação

- `draft: true` — artigo aparece **só em `npm run dev`**, nunca em produção
- `draft: false` (ou ausente) — vai pra produção no próximo deploy

Você pode ter um artigo com pt-BR publicado e en como draft (ainda em revisão) — funciona
sem problema. O hreflang só inclui o idioma publicado.

### Quando publicar?

Ao trocar `draft: false` e fazer push pra `main`, o GitHub Actions roda em ~1 minuto:

1. Build estático
2. Deploy pro GitHub Pages
3. **Purge automático do cache do Cloudflare** (todos os usuários veem a versão nova
   imediatamente, sem precisar esperar TTL)

---

## 11. Checklist antes de publicar

Antes de trocar `draft: false`:

### Conteúdo
- [ ] Título claro e específico (não vago)
- [ ] Description com 130–160 caracteres (vai pro Google e cards)
- [ ] Pelo menos 600 palavras de corpo
- [ ] Subseções com `##` (não só parágrafos contínuos)
- [ ] Pelo menos uma ação prática pra quem lê
- [ ] Bloco de "quando procurar pediatra" se for assunto clínico
- [ ] Sem termo médico sem explicação
- [ ] Tom acolhedor, sem assumir conhecimento

### Frontmatter
- [ ] `title`, `description`, `publishedAt`, `category` preenchidos
- [ ] `tags` (3–5 são suficientes)
- [ ] `slug` no frontmatter de cada tradução não-pt-BR
- [ ] `faq` se aplica ao tema (3–6 perguntas)
- [ ] `references` com 2–4 fontes confiáveis (se categoria for de saúde/desenvolvimento)

### Imagens
- [ ] Cover otimizado (≤ 200KB, 16:9)
- [ ] Imagens inline com `alt` descritivo (não "imagem 1")
- [ ] Sem imagem com texto embutido

### Tradução (se aplicável)
- [ ] Tradução não literal — adaptada à expressão de cada idioma
- [ ] Slug específico por idioma
- [ ] Referência regional ajustada quando faz sentido

### Validação
- [ ] `npm run validate-blog` passa
- [ ] `npm run build` passa local
- [ ] Pré-visualizou em `npm run dev` em desktop e mobile

### Plano de conteúdo
- [ ] Linha do artigo em `docs/blog-content-plan.md` marcada como publicada
      (`✅ <data> (<idiomas>)`) **antes** do push final

---

## 12. Comandos úteis

```bash
# Criar artigo novo (4 línguas, todas drafts)
npm run new-post -- --id=<slug> [--category=<slug>]

# Validar tudo (rodado automaticamente no build)
npm run validate-blog

# Ver status de tradução
npm run translation-status

# Servir local pra preview
npm run dev
# acessa http://localhost:3000/blog/

# Build de produção
npm run build
```

### Para preview específico

- pt-BR: http://localhost:3000/blog/<slug>/
- EN: http://localhost:3000/en/blog/<slug-en>/
- ES: http://localhost:3000/es/blog/<slug-es>/
- FR: http://localhost:3000/fr/blog/<slug-fr>/

### Onde mexer no código (se precisar)

| O que | Onde |
|---|---|
| Tipo de frontmatter | `src/lib/blog/types.ts` |
| Categorias | `src/lib/blog/categories.ts` |
| Validação | `src/lib/blog/validate.ts` |
| Loader (lê MDX) | `src/lib/blog/loader.ts` |
| Renderização do artigo | `src/components/blog/Article.tsx` |
| FAQ | `src/components/blog/Faq.tsx` |
| Referências | `src/components/blog/References.tsx` |
| Card na listagem | `src/components/blog/ArticleCard.tsx` |
| Estilos do corpo | `src/app/globals.css` (`.article-body`) |
| Strings i18n | `src/i18n/messages/*.ts` (campo `blog`) |
