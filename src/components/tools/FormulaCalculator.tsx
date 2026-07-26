"use client";

import { useState } from "react";
import { BIcon } from "@/components/BIcon";
import { localePath, type Locale } from "@/i18n";

/**
 * Infant formula-intake calculator.
 *
 * Numbers and their sources (each verified against a primary authority, then
 * adversarially re-checked):
 *  - Daily volume: weight × 150 ml (conservative lower anchor, widely used in
 *    UNICEF/NHS-aligned guidance) to weight × 165 ml (AAP "2½ oz (75 ml) per
 *    pound (453 g)" = ~165 ml/kg/day). Shown as a RANGE, never a target.
 *  - Hard safety cap: 960 ml/day (32 fl oz) — AAP. Above it we refuse a number
 *    and route to the pediatrician (AAP says "discuss", NOT "start solids").
 *  - First week: NOT weight-based. AAP caps the first week at ~30–60 ml (1–2 oz)
 *    per feed regardless of weight — the weight rule over-recommends here — so
 *    the newborn band shows AAP's first-week per-feed range directly.
 *  - 4–6 months: FAO/WHO energy needs per kg fall as solids approach, so the
 *    flat ml/kg rule over-estimates; that band carries a "trends lower" note.
 *  - Defers to a doctor (no number) for: breastfed/mixed babies, preterm / low
 *    birth weight (checkbox OR weight < 2.5 kg), and babies over ~6 months.
 *
 * This tool is general information, not medical advice. The disclaimers and the
 * official-source links ship visibly with every render.
 */

const ML_PER_KG_LOW = 150; // conservative lower anchor
const ML_PER_KG_TYP = 165; // AAP "2.5 oz/lb/day"
const DAILY_CAP_ML = 960; // AAP maximum (32 fl oz)
const MIN_TERM_KG = 2.5; // below this = low birth weight → defer to doctor
const MAX_KG = 15;
const ML_PER_OZ = 30;

type AgeBand = "week1" | "wk2to1mo" | "1-2" | "2-4" | "4-6" | "over6";
type Feeding = "formula" | "mixed" | "breast";
type WeightBand = Exclude<AgeBand, "week1" | "over6">;
type Unit = "ml" | "oz";

/** Age band → typical number of feeds per 24h (AAP/NHS ranges, midpoint). */
const FEEDS_BY_BAND: Record<WeightBand, number> = {
  wk2to1mo: 7,
  "1-2": 6,
  "2-4": 6,
  "4-6": 5,
};

const roundTo = (n: number, step: number) => Math.round(n / step) * step;
const round10 = (n: number) => roundTo(n, 10);
const round5 = (n: number) => roundTo(n, 5);

function fmtNum(n: number, dec: string): string {
  return Number.isInteger(n) ? String(n) : String(n).replace(".", dec);
}

/**
 * Render an ml low–high range in the chosen unit, collapsing equal bounds to a
 * single number (so "80–80" becomes "80"). Daily uses whole oz (ozStep 1),
 * per-feed uses half-oz (ozStep 0.5).
 */
function rangeStr(loMl: number, hiMl: number, unit: Unit, dec: string, ozStep = 0.5): string {
  let lo = loMl;
  let hi = hiMl;
  if (unit === "oz") {
    lo = roundTo(loMl / ML_PER_OZ, ozStep);
    hi = roundTo(hiMl / ML_PER_OZ, ozStep);
  }
  const a = fmtNum(lo, dec);
  const b = fmtNum(hi, dec);
  return a === b ? a : `${a}–${b}`;
}

type S = {
  title: string;
  subtitle: string;
  ageLabel: string;
  ageBands: Record<AgeBand, string>;
  weightLabel: string;
  weightPlaceholder: string;
  weightOptional: string;
  feedingLabel: string;
  feeding: Record<Feeding, string>;
  pretermLabel: string;
  perDay: string;
  perFeed: string;
  feedsWord: (n: number) => string;
  guideNote: string;
  guideNoteOlder: string;
  week1Prefix: string;
  week1Note: string;
  capNotice: string;
  fillPrompt: string;
  invalidWeight: string;
  deferTitle: string;
  deferBreast: string;
  deferPreterm: string;
  deferOver6: string;
  disclaimersTitle: string;
  disclaimers: string[];
  sourcesLabel: string;
  sources: { label: string; url: string }[];
  ctaText: string;
};

const AAP =
  "https://www.healthychildren.org/English/ages-stages/baby/formula-feeding/Pages/Amount-and-Schedule-of-Formula-Feedings.aspx";
const WHO =
  "https://www.who.int/news-room/fact-sheets/detail/infant-and-young-child-feeding";

const STRINGS: Record<Locale, S> = {
  "pt-BR": {
    title: "Calculadora de fórmula",
    subtitle: "Uma estimativa de partida — não uma meta a cumprir.",
    ageLabel: "Idade do bebê",
    ageBands: {
      week1: "Primeira semana (0–7 dias)",
      wk2to1mo: "2 semanas a 1 mês",
      "1-2": "1 a 2 meses",
      "2-4": "2 a 4 meses",
      "4-6": "4 a 6 meses",
      over6: "Mais de 6 meses",
    },
    weightLabel: "Peso do bebê",
    weightPlaceholder: "ex.: 5,2",
    weightOptional: "Na primeira semana o peso não é necessário.",
    feedingLabel: "Como o bebê é alimentado",
    feeding: {
      formula: "Só fórmula",
      mixed: "Fórmula + peito (misto)",
      breast: "Só peito",
    },
    pretermLabel: "Nasceu prematuro (&lt;37 semanas) ou com menos de 2,5 kg",
    perDay: "por dia",
    perFeed: "por mamada",
    feedsWord: (n) => `~${n} mamadas`,
    guideNote:
      "Faixa típica para bebê a termo, saudável, alimentado só com fórmula. É um guia — siga a fome e a saciedade do bebê, não o número.",
    guideNoteOlder:
      "A partir dos ~4 meses a necessidade por quilo cai e, com a chegada dos sólidos, muitos bebês passam a tomar menos que isso. Use como teto aproximado — não force.",
    week1Prefix: "até",
    week1Note:
      "Nos primeiros 1–2 dias são só 5 a 15 ml por mamada — o estômago do recém-nascido é minúsculo. Ao longo da semana sobe até cerca de 30 a 60 ml (1–2 onças). Ofereça em livre demanda e não force volumes maiores.",
    capNotice:
      "Isso passa do limite de ~960 ml/dia que a AAP indica. Não aumente a fórmula — converse com o pediatra.",
    fillPrompt: "Preencha os campos para ver a estimativa.",
    invalidWeight: "Informe um peso entre 2,5 e 15 kg.",
    deferTitle: "Aqui é caso de conversar com o pediatra",
    deferBreast:
      "Leite materno é oferecido em livre demanda e não se mede em ml por peso — esta calculadora vale só para quem alimenta exclusivamente com fórmula. O peito é o alimento recomendado; fale com o pediatra sobre a rotina do seu bebê.",
    deferPreterm:
      "Para bebês prematuros ou abaixo de 2,5 kg, as necessidades calóricas e os volumes são individualizados e definidos pelo pediatra — a regra geral por peso não se aplica.",
    deferOver6:
      "A partir dos 6 meses os alimentos sólidos passam a cobrir parte da nutrição e o volume de fórmula cai. A conta linear por peso superestima — combine as quantidades com o pediatra.",
    disclaimersTitle: "Antes de usar este número",
    disclaimers: [
      "Isto é informação geral, não é conselho médico. No Brasil, orientação sobre alimentação infantil deve vir do pediatra ou nutricionista (Lei 11.265/2006).",
      "Alimente com responsividade: o número é um guia, não uma meta. Siga os sinais de fome e saciedade.",
      "Nunca force o bebê a esvaziar a mamadeira.",
      "Os sinais reais de que está comendo o suficiente são ganho de peso, fraldas molhadas e um bebê tranquilo — não bater um número.",
      "Nunca passe de ~960 ml (32 oz) de fórmula por dia; se parecer querer mais, procure o pediatra.",
      "Prepare a fórmula exatamente como manda a lata — diluição errada é perigosa.",
      "Não serve para: prematuros/baixo peso, bebês com qualquer condição de saúde, amamentados/mistos, ou acima de 6 meses.",
    ],
    sourcesLabel: "Fontes oficiais",
    sources: [
      { label: "AAP — HealthyChildren", url: AAP },
      { label: "OMS", url: WHO },
      {
        label: "Ministério da Saúde",
        url: "https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/a/aleitamento-materno",
      },
      {
        label: "SBP",
        url: "https://www.sbp.com.br/fileadmin/user_upload/22701g-MO_Formulas_e_compostos_Lacteos_Infantis_LayNew.pdf",
      },
    ],
    ctaText: "Acompanhe cada mamada no Buppi",
  },
  en: {
    title: "Formula calculator",
    subtitle: "A starting estimate — not a target to hit.",
    ageLabel: "Baby's age",
    ageBands: {
      week1: "First week (0–7 days)",
      wk2to1mo: "2 weeks to 1 month",
      "1-2": "1 to 2 months",
      "2-4": "2 to 4 months",
      "4-6": "4 to 6 months",
      over6: "Over 6 months",
    },
    weightLabel: "Baby's weight",
    weightPlaceholder: "e.g. 5.2",
    weightOptional: "Weight isn't needed in the first week.",
    feedingLabel: "How your baby is fed",
    feeding: {
      formula: "Formula only",
      mixed: "Formula + breast (mixed)",
      breast: "Breast only",
    },
    pretermLabel: "Born preterm (&lt;37 weeks) or under 2.5 kg",
    perDay: "per day",
    perFeed: "per feed",
    feedsWord: (n) => `~${n} feeds`,
    guideNote:
      "Typical range for a healthy, full-term, formula-fed baby. It's a guide — follow your baby's hunger and fullness cues, not the number.",
    guideNoteOlder:
      "From ~4 months the need per kilo falls and, as solids begin, many babies take less than this. Treat it as a rough ceiling — don't force it.",
    week1Prefix: "up to",
    week1Note:
      "In the first 1–2 days it's just 5 to 15 ml per feed — a newborn's stomach is tiny. Over the week it climbs to about 30 to 60 ml (1–2 oz). Feed on demand and don't force larger amounts.",
    capNotice:
      "This exceeds the ~960 ml/day limit the AAP advises. Don't increase formula — talk to your pediatrician.",
    fillPrompt: "Fill in the fields to see the estimate.",
    invalidWeight: "Enter a weight between 2.5 and 15 kg.",
    deferTitle: "This is one to discuss with your pediatrician",
    deferBreast:
      "Breast milk is fed on demand and isn't measured in ml per weight — this calculator is only for exclusively formula-fed babies. Breast milk is the recommended food; talk to your pediatrician about your baby's routine.",
    deferPreterm:
      "For preterm babies or those under 2.5 kg, calorie and volume needs are individualized and set by the pediatrician — the general weight rule doesn't apply.",
    deferOver6:
      "From 6 months solids start covering part of nutrition and formula volume drops. The linear weight rule over-estimates — agree amounts with your pediatrician.",
    disclaimersTitle: "Before you use this number",
    disclaimers: [
      "This is general information, not medical advice. Always follow your pediatrician's guidance.",
      "Feed responsively: the number is a guide, not a target. Follow hunger and fullness cues.",
      "Never force your baby to finish a bottle.",
      "The real signs your baby is getting enough are weight gain, wet nappies, and a content baby — not hitting a number.",
      "Never exceed ~960 ml (32 oz) of formula per day; if your baby seems to want more, see your pediatrician.",
      "Always prepare formula exactly as the tin says — wrong dilution is dangerous.",
      "Not for: preterm/low-birth-weight babies, any medical condition, breastfed/mixed-fed babies, or over 6 months.",
    ],
    sourcesLabel: "Official sources",
    sources: [
      { label: "AAP — HealthyChildren", url: AAP },
      { label: "WHO", url: WHO },
      {
        label: "NHS",
        url: "https://www.nhs.uk/conditions/baby/breastfeeding-and-bottle-feeding/bottle-feeding/advice/",
      },
    ],
    ctaText: "Track every feed with Buppi",
  },
  es: {
    title: "Calculadora de fórmula",
    subtitle: "Una estimación de partida, no una meta que cumplir.",
    ageLabel: "Edad del bebé",
    ageBands: {
      week1: "Primera semana (0–7 días)",
      wk2to1mo: "2 semanas a 1 mes",
      "1-2": "1 a 2 meses",
      "2-4": "2 a 4 meses",
      "4-6": "4 a 6 meses",
      over6: "Más de 6 meses",
    },
    weightLabel: "Peso del bebé",
    weightPlaceholder: "ej.: 5,2",
    weightOptional: "En la primera semana no hace falta el peso.",
    feedingLabel: "Cómo se alimenta el bebé",
    feeding: {
      formula: "Solo fórmula",
      mixed: "Fórmula + pecho (mixta)",
      breast: "Solo pecho",
    },
    pretermLabel: "Nació prematuro (&lt;37 semanas) o con menos de 2,5 kg",
    perDay: "al día",
    perFeed: "por toma",
    feedsWord: (n) => `~${n} tomas`,
    guideNote:
      "Rango típico para un bebé sano, a término y alimentado solo con fórmula. Es una guía: sigue el hambre y la saciedad del bebé, no el número.",
    guideNoteOlder:
      "A partir de los ~4 meses la necesidad por kilo baja y, con la llegada de los sólidos, muchos bebés toman menos que esto. Úsalo como techo aproximado — no fuerces.",
    week1Prefix: "hasta",
    week1Note:
      "En los primeros 1–2 días son solo 5 a 15 ml por toma — el estómago del recién nacido es diminuto. A lo largo de la semana sube hasta unos 30 a 60 ml (1–2 oz). Ofrece a demanda y no fuerces volúmenes mayores.",
    capNotice:
      "Esto supera el límite de ~960 ml/día que indica la AAP. No aumentes la fórmula — consulta con el pediatra.",
    fillPrompt: "Completa los campos para ver la estimación.",
    invalidWeight: "Indica un peso entre 2,5 y 15 kg.",
    deferTitle: "Este caso es para consultarlo con el pediatra",
    deferBreast:
      "La leche materna se ofrece a demanda y no se mide en ml por peso — esta calculadora es solo para bebés alimentados exclusivamente con fórmula. El pecho es el alimento recomendado; habla con el pediatra sobre la rutina de tu bebé.",
    deferPreterm:
      "Para bebés prematuros o de menos de 2,5 kg, las necesidades calóricas y los volúmenes son individualizados y los define el pediatra — la regla general por peso no se aplica.",
    deferOver6:
      "A partir de los 6 meses los sólidos empiezan a cubrir parte de la nutrición y el volumen de fórmula baja. La cuenta lineal por peso sobreestima — acuerda las cantidades con el pediatra.",
    disclaimersTitle: "Antes de usar este número",
    disclaimers: [
      "Esto es información general, no consejo médico. Sigue siempre las indicaciones de tu pediatra.",
      "Alimenta con responsividad: el número es una guía, no una meta. Sigue las señales de hambre y saciedad.",
      "Nunca fuerces al bebé a terminar el biberón.",
      "Las señales reales de que come lo suficiente son el aumento de peso, los pañales mojados y un bebé tranquilo — no alcanzar un número.",
      "Nunca superes ~960 ml (32 oz) de fórmula al día; si parece querer más, consulta al pediatra.",
      "Prepara la fórmula exactamente como indica el envase — una dilución incorrecta es peligrosa.",
      "No sirve para: prematuros/bajo peso, bebés con cualquier condición de salud, amamantados/mixtos, o mayores de 6 meses.",
    ],
    sourcesLabel: "Fuentes oficiales",
    sources: [
      { label: "AAP — HealthyChildren", url: AAP },
      { label: "OMS", url: WHO },
      {
        label: "AEP — Familia y Salud",
        url: "https://www.familiaysalud.es/vivimos-sanos/alimentacion/alimentarse-cada-edad/lactancia-artificial-formulas-infantiles/lactancia",
      },
    ],
    ctaText: "Registra cada toma con Buppi",
  },
  fr: {
    title: "Calculateur de lait infantile",
    subtitle: "Une estimation de départ — pas un objectif à atteindre.",
    ageLabel: "Âge de bébé",
    ageBands: {
      week1: "Première semaine (0–7 jours)",
      wk2to1mo: "2 semaines à 1 mois",
      "1-2": "1 à 2 mois",
      "2-4": "2 à 4 mois",
      "4-6": "4 à 6 mois",
      over6: "Plus de 6 mois",
    },
    weightLabel: "Poids de bébé",
    weightPlaceholder: "ex. : 5,2",
    weightOptional: "Le poids n'est pas nécessaire la première semaine.",
    feedingLabel: "Comment bébé est nourri",
    feeding: {
      formula: "Lait infantile seul",
      mixed: "Lait infantile + sein (mixte)",
      breast: "Sein seul",
    },
    pretermLabel: "Né prématuré (&lt;37 semaines) ou de moins de 2,5 kg",
    perDay: "par jour",
    perFeed: "par biberon",
    feedsWord: (n) => `~${n} biberons`,
    guideNote:
      "Fourchette typique pour un bébé né à terme, en bonne santé, nourri uniquement au lait infantile. C'est un repère — suivez la faim et la satiété de bébé, pas le chiffre.",
    guideNoteOlder:
      "À partir de ~4 mois, le besoin par kilo diminue et, avec l'arrivée des solides, beaucoup de bébés en prennent moins. À utiliser comme plafond approximatif — ne forcez pas.",
    week1Prefix: "jusqu'à",
    week1Note:
      "Les 1–2 premiers jours, ce n'est que 5 à 15 ml par biberon — l'estomac du nouveau-né est minuscule. Au fil de la semaine, cela monte jusqu'à environ 30 à 60 ml (1–2 oz). Donnez à la demande et ne forcez pas de plus grands volumes.",
    capNotice:
      "Cela dépasse la limite d'environ 960 ml/jour indiquée par l'AAP. N'augmentez pas le lait — parlez-en au pédiatre.",
    fillPrompt: "Renseignez les champs pour voir l'estimation.",
    invalidWeight: "Indiquez un poids entre 2,5 et 15 kg.",
    deferTitle: "À voir avec votre pédiatre",
    deferBreast:
      "Le lait maternel est donné à la demande et ne se mesure pas en ml par poids — ce calculateur ne concerne que les bébés nourris exclusivement au lait infantile. Le sein est l'aliment recommandé ; parlez de la routine de bébé à votre pédiatre.",
    deferPreterm:
      "Pour les bébés prématurés ou de moins de 2,5 kg, les besoins caloriques et les volumes sont individualisés et fixés par le pédiatre — la règle générale au poids ne s'applique pas.",
    deferOver6:
      "À partir de 6 mois, les solides couvrent une partie des besoins et le volume de lait diminue. Le calcul linéaire au poids surestime — convenez des quantités avec votre pédiatre.",
    disclaimersTitle: "Avant d'utiliser ce chiffre",
    disclaimers: [
      "Ceci est une information générale, pas un avis médical. Suivez toujours les conseils de votre pédiatre.",
      "Nourrissez de façon responsive : le chiffre est un repère, pas un objectif. Suivez les signes de faim et de satiété.",
      "Ne forcez jamais bébé à finir son biberon.",
      "Les vrais signes que bébé mange assez sont la prise de poids, les couches mouillées et un bébé apaisé — pas un chiffre atteint.",
      "Ne dépassez jamais ~960 ml (32 oz) de lait par jour ; si bébé semble vouloir plus, consultez votre pédiatre.",
      "Préparez le lait exactement selon la boîte — une dilution incorrecte est dangereuse.",
      "Ne convient pas : prématurés/faible poids, bébés avec une pathologie, allaités/mixtes, ou de plus de 6 mois.",
    ],
    sourcesLabel: "Sources officielles",
    sources: [
      { label: "AAP — HealthyChildren", url: AAP },
      { label: "OMS", url: WHO },
      {
        label: "AFPA / Santé.fr",
        url: "https://www.sante.fr/entre-0-et-4-mois-quels-sont-les-besoins-alimentaires-de-mon-bebe",
      },
      {
        label: "ameli.fr",
        url: "https://www.ameli.fr/assure/sante/themes/alimentation/alimentation-0-3-ans/premiers-mois-lait-uniquement",
      },
    ],
    ctaText: "Suivez chaque biberon avec Buppi",
  },
};

export function FormulaCalculator({ locale }: { locale: Locale }) {
  const s = STRINGS[locale];
  const dec = locale === "en" ? "." : ",";
  const [band, setBand] = useState<AgeBand | "">("");
  const [feeding, setFeeding] = useState<Feeding | "">("");
  const [weight, setWeight] = useState("");
  const [preterm, setPreterm] = useState(false);
  const [unit, setUnit] = useState<Unit>("ml");

  const weightKg = parseFloat(weight.replace(",", "."));
  const hasWeight = weight.trim() !== "" && !Number.isNaN(weightKg);
  const weightTooLow = hasWeight && weightKg >= 1 && weightKg < MIN_TERM_KG;
  const weightValid = hasWeight && weightKg >= MIN_TERM_KG && weightKg <= MAX_KG;
  const isWeek1 = band === "week1";

  // Defer-to-doctor (no number) takes priority over any computation.
  const defer =
    feeding === "mixed" || feeding === "breast"
      ? s.deferBreast
      : preterm || weightTooLow
        ? s.deferPreterm
        : band === "over6"
          ? s.deferOver6
          : null;

  let result:
    | null
    | { kind: "week1" }
    | {
        kind: "weight";
        dayLow: number;
        dayTyp: number;
        feedLow: number;
        feedTyp: number;
        feeds: number;
        capped: boolean;
        older: boolean;
      } = null;

  if (!defer && feeding === "formula") {
    if (isWeek1) {
      result = { kind: "week1" };
    } else if (band && band !== "over6" && weightValid) {
      const feeds = FEEDS_BY_BAND[band];
      const rawTyp = weightKg * ML_PER_KG_TYP;
      const dayLow = Math.min(round10(weightKg * ML_PER_KG_LOW), DAILY_CAP_ML);
      const dayTyp = Math.min(round10(rawTyp), DAILY_CAP_ML);
      result = {
        kind: "weight",
        dayLow,
        dayTyp,
        feedLow: round5(dayLow / feeds),
        feedTyp: round5(dayTyp / feeds),
        feeds,
        capped: dayTyp >= DAILY_CAP_ML,
        older: band === "4-6",
      };
    }
  }

  // Only nudge about weight when a weight-based band actually needs it.
  const needsWeight = feeding === "formula" && !defer && !isWeek1 && band !== "" && band !== "over6";
  const showInvalidWeight = needsWeight && hasWeight && !weightValid;

  const surface =
    "bg-white dark:bg-[var(--color-surface-dark)] border border-[var(--color-border-warm)] dark:border-[var(--color-border-dark)]";

  return (
    <section
      className={`not-prose my-10 rounded-3xl ${surface} overflow-hidden`}
      aria-label={s.title}
    >
      {/* Header */}
      <div className="px-6 sm:px-8 pt-7 pb-6 bg-[var(--color-lavender)] dark:bg-[var(--color-surface-elevated-dark)]">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/70 dark:bg-white/10">
              <BIcon name="bottle" size={18} className="text-[var(--color-primary-dark)] dark:text-[var(--color-primary)]" />
            </span>
            <h3 className="font-display font-bold text-xl text-[var(--color-ink)] dark:text-white m-0">
              {s.title}
            </h3>
          </div>
          <div className="inline-flex shrink-0 rounded-full bg-white/70 dark:bg-white/10 p-0.5">
            {(["ml", "oz"] as Unit[]).map((u) => (
              <button
                key={u}
                type="button"
                onClick={() => setUnit(u)}
                aria-pressed={unit === u}
                className={`px-3 py-1 rounded-full text-[13px] font-semibold transition-colors ${
                  unit === u
                    ? "bg-[var(--color-primary-dark)] text-white"
                    : "text-[var(--color-fg-secondary)] dark:text-slate-300"
                }`}
              >
                {u}
              </button>
            ))}
          </div>
        </div>
        <p className="text-[14px] text-[var(--color-fg-secondary)] dark:text-slate-400 mt-2 mb-0">
          {s.subtitle}
        </p>
      </div>

      {/* Inputs */}
      <div className="px-6 sm:px-8 py-6 grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className="text-[13px] font-medium text-[var(--color-fg)] dark:text-slate-200">
            {s.ageLabel}
          </span>
          <select
            value={band}
            onChange={(e) => setBand(e.target.value as AgeBand)}
            className="rounded-xl border border-[var(--color-border-warm)] dark:border-[var(--color-border-dark)] bg-white dark:bg-[var(--color-surface-elevated-dark)] px-3.5 py-2.5 text-[15px] text-[var(--color-ink)] dark:text-white outline-none focus:border-[var(--color-primary)]"
          >
            <option value="" disabled>
              —
            </option>
            {(Object.keys(s.ageBands) as AgeBand[]).map((b) => (
              <option key={b} value={b}>
                {s.ageBands[b]}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-[13px] font-medium text-[var(--color-fg)] dark:text-slate-200">
            {s.weightLabel}
          </span>
          <div className="relative">
            <input
              type="text"
              inputMode="decimal"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder={s.weightPlaceholder}
              disabled={isWeek1}
              className="w-full rounded-xl border border-[var(--color-border-warm)] dark:border-[var(--color-border-dark)] bg-white dark:bg-[var(--color-surface-elevated-dark)] px-3.5 py-2.5 pr-12 text-[15px] text-[var(--color-ink)] dark:text-white outline-none focus:border-[var(--color-primary)] disabled:opacity-50"
            />
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[13px] text-[var(--color-fg-muted)]">
              kg
            </span>
          </div>
          {isWeek1 ? (
            <span className="text-[12px] text-[var(--color-fg-muted)]">
              {s.weightOptional}
            </span>
          ) : null}
        </label>

        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <span className="text-[13px] font-medium text-[var(--color-fg)] dark:text-slate-200">
            {s.feedingLabel}
          </span>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(s.feeding) as Feeding[]).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFeeding(f)}
                className={`rounded-full px-4 py-2 text-[14px] font-medium border transition-colors ${
                  feeding === f
                    ? "bg-[var(--color-primary-dark)] text-white border-[var(--color-primary-dark)]"
                    : "bg-white dark:bg-[var(--color-surface-elevated-dark)] text-[var(--color-fg-secondary)] dark:text-slate-300 border-[var(--color-border-warm)] dark:border-[var(--color-border-dark)] hover:border-[var(--color-primary)]"
                }`}
              >
                {s.feeding[f]}
              </button>
            ))}
          </div>
        </div>

        <label className="flex items-start gap-2.5 sm:col-span-2 cursor-pointer">
          <input
            type="checkbox"
            checked={preterm}
            onChange={(e) => setPreterm(e.target.checked)}
            className="mt-0.5 w-4 h-4 accent-[var(--color-primary-dark)]"
          />
          <span
            className="text-[13px] text-[var(--color-fg-secondary)] dark:text-slate-400"
            dangerouslySetInnerHTML={{ __html: s.pretermLabel }}
          />
        </label>
      </div>

      {/* Result */}
      <div className="px-6 sm:px-8 pb-6">
        {defer ? (
          <div className="rounded-2xl bg-[var(--color-accent-peach)]/20 dark:bg-white/5 border border-[var(--color-accent-peach)]/50 dark:border-[var(--color-border-dark)] px-5 py-4">
            <p className="flex items-center gap-2 font-semibold text-[var(--color-ink)] dark:text-white text-[15px] m-0">
              <BIcon name="heart" size={15} className="text-[var(--color-primary-dark)] dark:text-[var(--color-primary)]" />
              {s.deferTitle}
            </p>
            <p className="text-[14px] text-[var(--color-fg-secondary)] dark:text-slate-400 mt-2 mb-0">
              {defer}
            </p>
          </div>
        ) : showInvalidWeight ? (
          <p className="text-[14px] text-[var(--color-fg-secondary)] dark:text-slate-400 m-0">
            {s.invalidWeight}
          </p>
        ) : result?.kind === "week1" ? (
          <div className="rounded-2xl bg-[var(--color-lavender)] dark:bg-[var(--color-surface-elevated-dark)] px-5 py-5">
            <div className="text-2xl sm:text-[26px] font-bold text-[var(--color-primary-dark)] dark:text-[var(--color-primary)] leading-tight">
              {s.week1Prefix} {rangeStr(60, 60, unit, dec)}{" "}
              <span className="text-base font-semibold">{unit}</span>
            </div>
            <div className="text-[12px] text-[var(--color-fg-muted)] mt-1">
              {s.perFeed} · {s.feedsWord(8)}
            </div>
            <p className="text-[13px] text-[var(--color-fg-secondary)] dark:text-slate-400 mt-3 mb-0">
              {s.week1Note}
            </p>
          </div>
        ) : result?.kind === "weight" ? (
          <div className="rounded-2xl bg-[var(--color-lavender)] dark:bg-[var(--color-surface-elevated-dark)] px-5 py-5">
            <div className="flex flex-wrap items-baseline gap-x-6 gap-y-3">
              <div>
                <div className="text-2xl sm:text-[28px] font-bold text-[var(--color-primary-dark)] dark:text-[var(--color-primary)] leading-none">
                  {rangeStr(result.dayLow, result.dayTyp, unit, dec, 1)}{" "}
                  <span className="text-base font-semibold">{unit}</span>
                </div>
                <div className="text-[12px] text-[var(--color-fg-muted)] mt-1">
                  {s.perDay}
                </div>
              </div>
              <div>
                <div className="text-lg font-semibold text-[var(--color-ink)] dark:text-white leading-none">
                  ~{rangeStr(result.feedLow, result.feedTyp, unit, dec)} {unit}
                </div>
                <div className="text-[12px] text-[var(--color-fg-muted)] mt-1">
                  {s.perFeed} · {s.feedsWord(result.feeds)}
                </div>
              </div>
            </div>
            {result.capped ? (
              <p className="text-[13px] text-[var(--color-primary-dark)] dark:text-[var(--color-accent-peach)] mt-3 mb-0 font-medium">
                {s.capNotice}
              </p>
            ) : null}
            <p className="text-[13px] text-[var(--color-fg-secondary)] dark:text-slate-400 mt-3 mb-0">
              {result.older ? s.guideNoteOlder : s.guideNote}
            </p>
          </div>
        ) : (
          <p className="text-[14px] text-[var(--color-fg-muted)] m-0">
            {s.fillPrompt}
          </p>
        )}
      </div>

      {/* Disclaimers + sources */}
      <div className="px-6 sm:px-8 py-5 border-t border-[var(--color-border-warm)] dark:border-[var(--color-border-dark)] bg-[var(--color-background-soft)] dark:bg-transparent">
        <p className="flex items-center gap-2 text-[13px] font-semibold text-[var(--color-ink)] dark:text-white m-0">
          <BIcon name="check" size={13} className="text-[var(--color-secondary-dark)]" />
          {s.disclaimersTitle}
        </p>
        <ul className="mt-2.5 mb-0 space-y-1.5 list-none pl-0">
          {s.disclaimers.map((d, i) => (
            <li
              key={i}
              className="text-[12.5px] leading-relaxed text-[var(--color-fg-secondary)] dark:text-slate-400 pl-4 relative"
            >
              <span className="absolute left-0 top-[7px] w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]/60" />
              {d}
            </li>
          ))}
        </ul>
        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="text-[12px] font-medium text-[var(--color-fg-muted)]">
            {s.sourcesLabel}:
          </span>
          {s.sources.map((src) => (
            <a
              key={src.url}
              href={src.url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="text-[12px] text-[var(--color-primary-dark)] dark:text-[var(--color-primary)] underline decoration-dotted underline-offset-2 hover:opacity-80"
            >
              {src.label}
            </a>
          ))}
        </div>
      </div>

      {/* App CTA */}
      <a
        href={`${localePath(locale, "/")}#baixar`}
        className="flex items-center justify-between gap-3 px-6 sm:px-8 py-4 bg-[var(--color-primary-dark)] text-white hover:opacity-95 transition-opacity"
      >
        <span className="inline-flex items-center gap-2.5 font-semibold text-[15px]">
          <BIcon name="sparkle" size={16} />
          {s.ctaText}
        </span>
        <BIcon name="chev" size={16} className="-rotate-90" />
      </a>
    </section>
  );
}
