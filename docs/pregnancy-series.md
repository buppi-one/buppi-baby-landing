# Série "Gestação semana a semana" — guia editorial

Regras específicas da série. Tudo que não está aqui segue `docs/blog.md` e a
skill `blog-article` (fontes, revisão dupla, humanizer, regra de medicamentos).

## Escopo

| Peça | id (pasta, slug pt-BR) | en | es | fr |
|---|---|---|---|---|
| Hub | `gestacao-semana-a-semana` | `pregnancy-week-by-week` | `embarazo-semana-a-semana` | `grossesse-semaine-par-semaine` |
| Semanas 1 a 3 | `gestacao-1-a-3-semanas` | `1-to-3-weeks-pregnant` | `1-a-3-semanas-de-embarazo` | `grossesse-1-a-3-sa` |
| Semana N (4 a 40) | `gestacao-N-semanas` | `N-weeks-pregnant` | `N-semanas-de-embarazo` | `grossesse-N-sa` |
| Semanas 41 e 42 | `gestacao-41-e-42-semanas` | `41-and-42-weeks-pregnant` | `41-y-42-semanas-de-embarazo` | `grossesse-41-et-42-sa` |

Categoria: `expecting-and-new-parents`. Sem `guidePhases`. Sem bloco
`instagram:` e sem slides nos artigos semanais (39 carrosséis de gestação
ocupariam a fila diária por mais de um mês); só o hub entra na fila.

## Convenções que não podem variar entre artigos

- **Semana = idade gestacional contada da data da última menstruação (DUM).**
  "20 semanas" quer dizer 20 semanas completas (20s0d a 20s6d).
- **França conta em SA** (semaines d'aménorrhée), que é exatamente a nossa
  semana. "Semaines de grossesse" (SG) são SA menos 2. No francês o título
  usa "N SA" e o texto explica uma vez a equivalência com SG. Nunca traduzir
  "20 semanas de gestação" por "20 semaines de grossesse".
  Na França a data do termo é fixada de outro jeito, então o francês não traz
  "semanas que faltam" nem a linha de mês; dá o trimestre e a equivalência
  SA/SG. Fontes francesas utilizáveis: Service-Public, Légifrance e Santé
  publique France (HAS e Ameli não puderam ser verificados).
- **Trimestres:** 1º até 13s6d, 2º de 14s0d a 27s6d, 3º a partir de 28s0d.
- **Semanas para meses** (tabela única da série; dizer que a conta em meses é
  aproximada e que o pré-natal usa semanas):

  | Mês | Semanas |
  |---|---|
  | 1º | 1 a 4 |
  | 2º | 5 a 8 |
  | 3º | 9 a 13 |
  | 4º | 14 a 17 |
  | 5º | 18 a 22 |
  | 6º | 23 a 27 |
  | 7º | 28 a 31 |
  | 8º | 32 a 35 |
  | 9º | 36 a 40 |

- **Termo:** pré-termo antes de 37s0d; termo precoce 37s0d a 38s6d; termo
  completo 39s0d a 40s6d; termo tardio 41s0d a 41s6d; pós-termo a partir de
  42s0d.
- **Tamanho e peso do bebê:** só os números da seção "Dados por semana"
  abaixo, sempre apresentados como média aproximada ("cerca de"), nunca como
  meta. Não usar números de outra fonte nem de memória.
- **Calendário de pré-natal muda por país.** pt-BR segue Ministério da Saúde
  e FEBRASGO; en segue NHS e ACOG/CDC, dizendo qual é qual; es segue
  Ministerio de Sanidad/SEGO; fr segue Service-Public, Légifrance e Santé
  publique France. Ao traduzir, a seção de
  pré-natal é **adaptada** ao país, usando só os fatos de `docs/pregnancy-series-references.md`. Os números do bebê ficam idênticos nos quatro idiomas.

## Regra de medicamentos na gestação

A trava do validador vale igual. Na prática, nesta série:

- Suplementos: "a suplementação indicada no pré-natal" (pode citar "ácido
  fólico" e "ferro" como nutrientes, **sem dose** e sem "tome").
- Nunca nomear remédio para enjoo, azia, dor, pressão, prevenção de
  pré-eclâmpsia, maturação pulmonar, indução do parto, anestesia. Dizer o que
  é ("um medicamento que o obstetra pode indicar") e remeter ao pré-natal.
- Vacinas entram pelo nome da doença (coqueluche/dTpa, gripe, hepatite B,
  covid-19, VSR), sem marca.
- Valores de exame com unidade "mg/dL" disparam a trava de dose quando vêm
  depois de número: não escrever pontos de corte de glicemia; dizer que o
  resultado é interpretado no pré-natal.
- Onde a pediatria diz "pediatra", aqui é "obstetra", "quem faz seu
  pré-natal" ou "a equipe do pré-natal".

## Estrutura de um artigo semanal (1.000 a 1.400 palavras)

1. Parágrafo de abertura `**Resposta rápida:**` com mês/trimestre, tamanho
   aproximado e o fato da semana.
2. Tabela curta "A semana N em números": trimestre, mês, semanas até a data
   provável, tamanho, peso.
3. `## Como está o bebê com N semanas`
4. `## O que muda no seu corpo` (sintomas comuns, o que é esperado)
5. `## Pré-natal nesta fase` (consulta, exames, vacinas, ultrassom da janela)
6. `<Cta id="pregnancy-start" />`
7. `## O que fazer nesta semana` (lista de 3 a 5 itens concretos)
8. Um único blockquote `>` com os sinais para procurar atendimento que fazem
   sentido naquela idade gestacional.
9. Fecho curto com link para o hub e para artigos do blog que conversem com
   a fase (pré-natal SUS × privado, enxoval, amamentação, sono do
   recém-nascido etc.). **Não escrever links de semana anterior/próxima**: a
   linha de navegação entre semanas é inserida por script no fim.
10. Terminar o corpo com `<Cta id="download" />`.

FAQ (4 a 5) espelhando buscas reais: "N semanas são quantos meses?", "qual o
tamanho do bebê com N semanas?", "é normal sentir X com N semanas?", e o
tema próprio da semana. Referências: 4 a 6, do pool verificado em `docs/pregnancy-series-references.md`, mais
alguma específica da semana desde que aberta e conferida.

Títulos: pt-BR `N semanas de gestação: <tamanho ou fato>, sintomas e pré-natal`
(até ~60 caracteres); descrição até 155.

## Tom

Leitora adulta, grávida, muitas vezes ansiosa. Informar sem alarmar: cada
sinal de alerta vem com o que fazer. Evitar "mamãe", diminutivos em excesso
e promessas ("seu bebê vai…"); preferir "costuma", "em geral". Gestações
variam, e isso deve aparecer uma vez por artigo, sem virar bordão. As
transcrições dos vídeos servem só de pauta (que dúvidas aparecem em cada
semana); nenhum fato entra no texto sem fonte do pool, e nada é copiado.

## Dados por semana

Comprimento: NHS, "Week-by-week guide to pregnancy" (cabeça ao bumbum até a semana 19; cabeça aos pés a partir da 20, por isso o salto). Peso: mediana (p50) do peso fetal estimado das curvas da OMS, com a faixa p10 a p90 entre parênteses (Kiserud et al., PLoS Medicine 2017, PMID 28118360), só disponível de 14 a 40 semanas. Antes da semana 14 não citar peso. Comparações: as mesmas do app Buppi.

| Semana | Trimestre | Mês | Faltam (sem.) | Comprimento | Peso médio (p10 a p90) | Comparação | Página NHS |
|---|---|---|---|---|---|---|---|
| 4 | 1º | 1º | 36 | cerca de 2 mm (cabeça ao bumbum) | não citar | uma semente de papoula | https://www.nhs.uk/best-start-in-life/pregnancy/week-by-week-guide-to-pregnancy/1st-trimester/week-4/ |
| 5 | 1º | 2º | 35 | cerca de 2 mm (cabeça ao bumbum) | não citar | uma semente de gergelim | https://www.nhs.uk/best-start-in-life/pregnancy/week-by-week-guide-to-pregnancy/1st-trimester/week-5/ |
| 6 | 1º | 2º | 34 | cerca de 6 mm (cabeça ao bumbum) | não citar | uma lentilha | https://www.nhs.uk/best-start-in-life/pregnancy/week-by-week-guide-to-pregnancy/1st-trimester/week-6/ |
| 7 | 1º | 2º | 33 | cerca de 10 mm (cabeça ao bumbum) | não citar | um mirtilo | https://www.nhs.uk/best-start-in-life/pregnancy/week-by-week-guide-to-pregnancy/1st-trimester/week-7/ |
| 8 | 1º | 2º | 32 | cerca de 16 mm (cabeça ao bumbum) | não citar | uma framboesa | https://www.nhs.uk/best-start-in-life/pregnancy/week-by-week-guide-to-pregnancy/1st-trimester/week-8/ |
| 9 | 1º | 3º | 31 | cerca de 22 mm (cabeça ao bumbum) | não citar | uma uva | https://www.nhs.uk/best-start-in-life/pregnancy/week-by-week-guide-to-pregnancy/1st-trimester/week-9/ |
| 10 | 1º | 3º | 30 | cerca de 30 mm (cabeça ao bumbum) | não citar | um morango | https://www.nhs.uk/best-start-in-life/pregnancy/week-by-week-guide-to-pregnancy/1st-trimester/week-10/ |
| 11 | 1º | 3º | 29 | cerca de 41 mm (cabeça ao bumbum) | não citar | um figo | https://www.nhs.uk/best-start-in-life/pregnancy/week-by-week-guide-to-pregnancy/1st-trimester/week-11/ |
| 12 | 1º | 3º | 28 | cerca de 5,4 cm (cabeça ao bumbum) | não citar | um limão | https://www.nhs.uk/best-start-in-life/pregnancy/week-by-week-guide-to-pregnancy/1st-trimester/week-12/ |
| 13 | 1º | 3º | 27 | cerca de 7,4 cm (cabeça ao bumbum) | não citar | um pêssego | https://www.nhs.uk/best-start-in-life/pregnancy/week-by-week-guide-to-pregnancy/2nd-trimester/week-13/ |
| 14 | 2º | 4º | 26 | cerca de 8,5 cm (cabeça ao bumbum) | cerca de 90 g (78 a 104 g) | um limão-siciliano | https://www.nhs.uk/best-start-in-life/pregnancy/week-by-week-guide-to-pregnancy/2nd-trimester/week-14/ |
| 15 | 2º | 4º | 25 | cerca de 10,1 cm (cabeça ao bumbum) | cerca de 110 g (99 a 132 g) | uma maçã | https://www.nhs.uk/best-start-in-life/pregnancy/week-by-week-guide-to-pregnancy/2nd-trimester/week-15/ |
| 16 | 2º | 4º | 24 | cerca de 11,6 cm (cabeça ao bumbum) | cerca de 140 g (124 a 166 g) | um abacate | https://www.nhs.uk/best-start-in-life/pregnancy/week-by-week-guide-to-pregnancy/2nd-trimester/week-16/ |
| 17 | 2º | 4º | 23 | cerca de 12 cm (cabeça ao bumbum) | cerca de 180 g (155 a 207 g) | uma pera | https://www.nhs.uk/best-start-in-life/pregnancy/week-by-week-guide-to-pregnancy/2nd-trimester/week-17/ |
| 18 | 2º | 5º | 22 | cerca de 14,2 cm (cabeça ao bumbum) | cerca de 220 g (192 a 255 g) | um pimentão | https://www.nhs.uk/best-start-in-life/pregnancy/week-by-week-guide-to-pregnancy/2nd-trimester/week-18/ |
| 19 | 2º | 5º | 21 | cerca de 15,3 cm (cabeça ao bumbum) | cerca de 270 g (235 a 313 g) | uma manga | https://www.nhs.uk/best-start-in-life/pregnancy/week-by-week-guide-to-pregnancy/2nd-trimester/week-19/ |
| 20 | 2º | 5º | 20 | cerca de 25,6 cm (cabeça aos pés) | cerca de 330 g (286 a 380 g) | uma banana | https://www.nhs.uk/best-start-in-life/pregnancy/week-by-week-guide-to-pregnancy/2nd-trimester/week-20/ |
| 21 | 2º | 5º | 19 | cerca de 26,7 cm (cabeça aos pés) | cerca de 400 g (345 a 458 g) | uma cenoura | https://www.nhs.uk/best-start-in-life/pregnancy/week-by-week-guide-to-pregnancy/2nd-trimester/week-21/ |
| 22 | 2º | 5º | 18 | cerca de 27,8 cm (cabeça aos pés) | cerca de 480 g (412 a 548 g) | um mamão papaia | https://www.nhs.uk/best-start-in-life/pregnancy/week-by-week-guide-to-pregnancy/2nd-trimester/week-22/ |
| 23 | 2º | 6º | 17 | cerca de 28,9 cm (cabeça aos pés) | cerca de 560 g (489 a 650 g) | uma berinjela pequena | https://www.nhs.uk/best-start-in-life/pregnancy/week-by-week-guide-to-pregnancy/2nd-trimester/week-23/ |
| 24 | 2º | 6º | 16 | cerca de 30 cm (cabeça aos pés) | cerca de 660 g (576 a 765 g) | uma espiga de milho | https://www.nhs.uk/best-start-in-life/pregnancy/week-by-week-guide-to-pregnancy/2nd-trimester/week-24/ |
| 25 | 2º | 6º | 15 | cerca de 34,6 cm (cabeça aos pés) | cerca de 780 g (673 a 894 g) | uma couve-flor | https://www.nhs.uk/best-start-in-life/pregnancy/week-by-week-guide-to-pregnancy/2nd-trimester/week-25/ |
| 26 | 2º | 6º | 14 | cerca de 35,6 cm (cabeça aos pés) | cerca de 900 g (780 a 1038 g) | um pé de alface | https://www.nhs.uk/best-start-in-life/pregnancy/week-by-week-guide-to-pregnancy/2nd-trimester/week-26/ |
| 27 | 2º | 6º | 13 | cerca de 36,6 cm (cabeça aos pés) | cerca de 1,0 kg (0,9 kg a 1,2 kg) | um brócolis | https://www.nhs.uk/best-start-in-life/pregnancy/week-by-week-guide-to-pregnancy/2nd-trimester/week-27/ |
| 28 | 3º | 7º | 12 | cerca de 37,6 cm (cabeça aos pés) | cerca de 1,2 kg (1,0 kg a 1,4 kg) | uma berinjela | https://www.nhs.uk/best-start-in-life/pregnancy/week-by-week-guide-to-pregnancy/3rd-trimester/week-28/ |
| 29 | 3º | 7º | 11 | cerca de 38,6 cm (cabeça aos pés) | cerca de 1,4 kg (1,2 kg a 1,6 kg) | uma abóbora pequena | https://www.nhs.uk/best-start-in-life/pregnancy/week-by-week-guide-to-pregnancy/3rd-trimester/week-29/ |
| 30 | 3º | 7º | 10 | cerca de 39,9 cm (cabeça aos pés) | cerca de 1,5 kg (1,3 kg a 1,8 kg) | um repolho | https://www.nhs.uk/best-start-in-life/pregnancy/week-by-week-guide-to-pregnancy/3rd-trimester/week-30/ |
| 31 | 3º | 7º | 9 | cerca de 41,1 cm (cabeça aos pés) | cerca de 1,7 kg (1,5 kg a 2,0 kg) | um coco | https://www.nhs.uk/best-start-in-life/pregnancy/week-by-week-guide-to-pregnancy/3rd-trimester/week-31/ |
| 32 | 3º | 8º | 8 | cerca de 42,4 cm (cabeça aos pés) | cerca de 1,9 kg (1,6 kg a 2,2 kg) | um abacaxi pequeno | https://www.nhs.uk/best-start-in-life/pregnancy/week-by-week-guide-to-pregnancy/3rd-trimester/week-32/ |
| 33 | 3º | 8º | 7 | cerca de 43,7 cm (cabeça aos pés) | cerca de 2,1 kg (1,8 kg a 2,4 kg) | um abacaxi | https://www.nhs.uk/best-start-in-life/pregnancy/week-by-week-guide-to-pregnancy/3rd-trimester/week-33/ |
| 34 | 3º | 8º | 6 | cerca de 45 cm (cabeça aos pés) | cerca de 2,3 kg (2,0 kg a 2,7 kg) | um melão pequeno | https://www.nhs.uk/best-start-in-life/pregnancy/week-by-week-guide-to-pregnancy/3rd-trimester/week-34/ |
| 35 | 3º | 8º | 5 | cerca de 46,2 cm (cabeça aos pés) | cerca de 2,5 kg (2,2 kg a 2,9 kg) | um melão | https://www.nhs.uk/best-start-in-life/pregnancy/week-by-week-guide-to-pregnancy/3rd-trimester/week-35/ |
| 36 | 3º | 9º | 4 | cerca de 47,4 cm (cabeça aos pés) | cerca de 2,7 kg (2,4 kg a 3,2 kg) | uma alface-romana | https://www.nhs.uk/best-start-in-life/pregnancy/week-by-week-guide-to-pregnancy/3rd-trimester/week-36/ |
| 37 | 3º | 9º | 3 | cerca de 48,6 cm (cabeça aos pés) | cerca de 3,0 kg (2,5 kg a 3,4 kg) | uma acelga | https://www.nhs.uk/best-start-in-life/pregnancy/week-by-week-guide-to-pregnancy/3rd-trimester/week-37/ |
| 38 | 3º | 9º | 2 | cerca de 49,8 cm (cabeça aos pés) | cerca de 3,2 kg (2,7 kg a 3,7 kg) | um alho-poró | https://www.nhs.uk/best-start-in-life/pregnancy/week-by-week-guide-to-pregnancy/3rd-trimester/week-38/ |
| 39 | 3º | 9º | 1 | cerca de 50,7 cm (cabeça aos pés) | cerca de 3,4 kg (2,9 kg a 3,9 kg) | uma melancia pequena | https://www.nhs.uk/best-start-in-life/pregnancy/week-by-week-guide-to-pregnancy/3rd-trimester/week-39/ |
| 40 | 3º | 9º | 0 | cerca de 51,2 cm (cabeça aos pés) | cerca de 3,6 kg (3,1 kg a 4,1 kg) | uma abóbora | https://www.nhs.uk/best-start-in-life/pregnancy/week-by-week-guide-to-pregnancy/3rd-trimester/week-40/ |

Semanas 1 a 3: sem medidas (na 1 e 2 ainda não há embrião; a concepção costuma ocorrer por volta da semana 2 e a implantação na 3 a 4). Semanas 41 e 42: não citar comprimento nem peso por semana; pode dizer que o bebê a termo costuma pesar entre 3 e 4 kg (NHS, semana 41).
