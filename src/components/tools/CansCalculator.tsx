"use client";

import { useState } from "react";
import { BIcon } from "@/components/BIcon";
import { localePath, type Locale } from "@/i18n";

/**
 * Formula-cans-per-month planning calculator.
 *
 * Model and its sources (verified, then re-checked adversarially):
 *  - Standard reconstitution: 1 level scoop per 30 ml of water. Scoop mass
 *    varies by brand (~4.3–4.7 g), so a 400 g can yields ~2.6 to 3.0 L of
 *    prepared formula. We compute with that YIELD RANGE and always show a
 *    range, never a single number. 800 g cans yield double.
 *  - Daily intake input is the parent's real number (from their routine or
 *    the pediatrician); presets carry the same per-age ranges as the pillar
 *    article (AAP/SBP-aligned), including the post-solids drop after 6 months.
 *  - This is a BUDGETING tool, not a feeding target: the article and the
 *    disclaimers say explicitly that the baby's hunger — not the can math —
 *    decides how much they drink.
 */

// Final (drinkable) volume per gram of powder, displacement included:
// each level scoop (4.3–4.7 g) + 30 ml water ≈ 33–34 ml of prepared formula.
const YIELD_ML_PER_G_LOW = 7.0; // 4.7 g scoop → 400 g ≈ 2.8 L final
const YIELD_ML_PER_G_HIGH = 7.8; // 4.3 g scoop → 400 g ≈ 3.1 L final
const DAYS_PER_MONTH = 30;
const MIN_ML_DAY = 100;
const MAX_ML_DAY = 1200;

type CanSize = 400 | 800;

type S = {
  title: string;
  subtitle: string;
  mlLabel: string;
  mlUnit: string;
  mlPlaceholder: string;
  mlHelp: string;
  canLabel: string;
  canOption: (g: number) => string;
  resultCans: (lo: string, hi: string) => string;
  resultDays: (lo: string, hi: string) => string;
  perMonth: string;
  fillPrompt: string;
  invalidMl: string;
  disclaimersTitle: string;
  disclaimers: string[];
  sourcesLabel: string;
  sources: { label: string; url: string }[];
  ctaText: string;
};

const AAP =
  "https://www.healthychildren.org/English/ages-stages/baby/formula-feeding/Pages/Amount-and-Schedule-of-Formula-Feedings.aspx";

const STRINGS: Record<Locale, S> = {
  "pt-BR": {
    title: "Calculadora de latas por mês",
    subtitle: "Para planejar a compra — nunca para definir quanto o bebê deve mamar.",
    mlLabel: "Quanto o bebê toma por dia",
    mlUnit: "ml/dia",
    mlPlaceholder: "ex.: 750",
    mlHelp: "Use a média real dos últimos dias (some as mamadeiras de 24 h).",
    canLabel: "Tamanho da lata",
    canOption: (g) => `${g} g`,
    resultCans: (lo, hi) => `${lo} a ${hi} latas`,
    resultDays: (lo, hi) => `1 lata dura ${lo} a ${hi} dias`,
    perMonth: "por mês (30 dias)",
    fillPrompt: "Informe o consumo diário para ver a estimativa.",
    invalidMl: "Informe um valor entre 100 e 1.200 ml por dia.",
    disclaimersTitle: "Antes de usar este número",
    disclaimers: [
      "Isto é planejamento de compra, não meta de alimentação: quem define quanto o bebê mama é a fome dele, com o pediatra.",
      "O rendimento varia por marca (medidas de 4,3 a 4,7 g) — por isso o resultado é uma faixa, não um número exato.",
      "Prepare sempre na diluição do rótulo (1 medida rasa para 30 ml de água). Nunca mude a proporção para a lata render mais.",
      "O consumo muda com estirões e com a introdução alimentar — refaça a conta quando a rotina mudar.",
    ],
    sourcesLabel: "Fontes oficiais",
    sources: [
      { label: "AAP — HealthyChildren", url: AAP },
      {
        label: "Ministério da Saúde",
        url: "https://bvsms.saude.gov.br/bvs/publicacoes/guia_alimentar_criancas_menores_2anos.pdf",
      },
    ],
    ctaText: "Acompanhe cada mamada no Buppi",
  },
  en: {
    title: "Cans-per-month calculator",
    subtitle: "For planning purchases — never for deciding how much your baby should drink.",
    mlLabel: "How much your baby drinks per day",
    mlUnit: "ml/day",
    mlPlaceholder: "e.g. 750",
    mlHelp: "Use the real average of recent days (add up 24 h of bottles).",
    canLabel: "Can size",
    canOption: (g) => `${g} g`,
    resultCans: (lo, hi) => `${lo} to ${hi} cans`,
    resultDays: (lo, hi) => `1 can lasts ${lo} to ${hi} days`,
    perMonth: "per month (30 days)",
    fillPrompt: "Enter the daily intake to see the estimate.",
    invalidMl: "Enter a value between 100 and 1,200 ml per day.",
    disclaimersTitle: "Before you use this number",
    disclaimers: [
      "This is purchase planning, not a feeding target: your baby's hunger — with the pediatrician — decides how much they drink.",
      "Yield varies by brand (scoops of 4.3 to 4.7 g) — that's why the result is a range, not an exact number.",
      "Always prepare at the label's dilution (1 level scoop per 30 ml of water). Never change the ratio to make a can last longer.",
      "Intake changes with growth spurts and the start of solids — redo the math when the routine changes.",
    ],
    sourcesLabel: "Official sources",
    sources: [
      { label: "AAP — HealthyChildren", url: AAP },
      {
        label: "NHS",
        url: "https://www.nhs.uk/conditions/baby/breastfeeding-and-bottle-feeding/bottle-feeding/advice/",
      },
    ],
    ctaText: "Track every feed with Buppi",
  },
  es: {
    title: "Calculadora de latas por mes",
    subtitle: "Para planificar la compra — nunca para definir cuánto debe tomar el bebé.",
    mlLabel: "Cuánto toma el bebé al día",
    mlUnit: "ml/día",
    mlPlaceholder: "ej.: 750",
    mlHelp: "Usa el promedio real de los últimos días (suma los biberones de 24 h).",
    canLabel: "Tamaño de la lata",
    canOption: (g) => `${g} g`,
    resultCans: (lo, hi) => `${lo} a ${hi} latas`,
    resultDays: (lo, hi) => `1 lata dura ${lo} a ${hi} días`,
    perMonth: "al mes (30 días)",
    fillPrompt: "Indica el consumo diario para ver la estimación.",
    invalidMl: "Indica un valor entre 100 y 1.200 ml al día.",
    disclaimersTitle: "Antes de usar este número",
    disclaimers: [
      "Esto es planificación de compra, no meta de alimentación: cuánto toma el bebé lo define su hambre, con el pediatra.",
      "El rendimiento varía por marca (medidas de 4,3 a 4,7 g) — por eso el resultado es un rango, no un número exacto.",
      "Prepara siempre con la dilución de la etiqueta (1 medida rasa por 30 ml de agua). Nunca cambies la proporción para que rinda más.",
      "El consumo cambia con los estirones y el inicio de los sólidos — rehaz la cuenta cuando cambie la rutina.",
    ],
    sourcesLabel: "Fuentes oficiales",
    sources: [
      { label: "AAP — HealthyChildren", url: AAP },
      {
        label: "AEP — Familia y Salud",
        url: "https://www.familiaysalud.es/vivimos-sanos/alimentacion/alimentarse-cada-edad/lactancia-artificial-formulas-infantiles/lactancia",
      },
    ],
    ctaText: "Registra cada toma con Buppi",
  },
  fr: {
    title: "Calculateur de boîtes par mois",
    subtitle: "Pour planifier les achats — jamais pour décider combien bébé doit boire.",
    mlLabel: "Ce que bébé boit par jour",
    mlUnit: "ml/jour",
    mlPlaceholder: "ex. : 750",
    mlHelp: "Utilisez la vraie moyenne des derniers jours (additionnez 24 h de biberons).",
    canLabel: "Taille de la boîte",
    canOption: (g) => `${g} g`,
    resultCans: (lo, hi) => `${lo} à ${hi} boîtes`,
    resultDays: (lo, hi) => `1 boîte dure ${lo} à ${hi} jours`,
    perMonth: "par mois (30 jours)",
    fillPrompt: "Renseignez la consommation quotidienne pour voir l'estimation.",
    invalidMl: "Indiquez une valeur entre 100 et 1 200 ml par jour.",
    disclaimersTitle: "Avant d'utiliser ce chiffre",
    disclaimers: [
      "C'est de la planification d'achat, pas un objectif d'alimentation : c'est la faim de bébé — avec le pédiatre — qui décide combien il boit.",
      "Le rendement varie selon la marque (mesurettes de 4,3 à 4,7 g) — d'où un résultat en fourchette, jamais un chiffre exact.",
      "Préparez toujours à la dilution de l'étiquette (1 mesurette rase pour 30 ml d'eau). Ne changez jamais la proportion pour faire durer la boîte.",
      "La consommation change avec les pics de croissance et la diversification — refaites le calcul quand la routine change.",
    ],
    sourcesLabel: "Sources officielles",
    sources: [
      { label: "AAP — HealthyChildren", url: AAP },
      {
        label: "ameli.fr",
        url: "https://www.ameli.fr/assure/sante/themes/alimentation/alimentation-0-3-ans/premiers-mois-lait-uniquement",
      },
    ],
    ctaText: "Suivez chaque biberon avec Buppi",
  },
};

export function CansCalculator({ locale }: { locale: Locale }) {
  const s = STRINGS[locale];
  const dec = locale === "en" ? "." : ",";
  const [mlDay, setMlDay] = useState("");
  const [canSize, setCanSize] = useState<CanSize>(400);

  const ml = parseFloat(mlDay.replace(",", "."));
  const hasMl = mlDay.trim() !== "" && !Number.isNaN(ml);
  const valid = hasMl && ml >= MIN_ML_DAY && ml <= MAX_ML_DAY;

  const fmt1 = (n: number) => n.toFixed(1).replace(".", dec).replace(new RegExp(`\\${dec}0$`), "");

  let result: null | { cansLo: string; cansHi: string; daysLo: string; daysHi: string } = null;
  if (valid) {
    const yieldLow = canSize * YIELD_ML_PER_G_LOW; // conservative can yield (ml)
    const yieldHigh = canSize * YIELD_ML_PER_G_HIGH;
    const cansLo = (ml * DAYS_PER_MONTH) / yieldHigh;
    const cansHi = (ml * DAYS_PER_MONTH) / yieldLow;
    result = {
      cansLo: fmt1(Math.floor(cansLo * 2) / 2),
      cansHi: fmt1(Math.ceil(cansHi * 2) / 2),
      daysLo: fmt1(Math.floor((yieldLow / ml) * 2) / 2),
      daysHi: fmt1(Math.ceil((yieldHigh / ml) * 2) / 2),
    };
  }

  const surface =
    "bg-white dark:bg-[var(--color-surface-dark)] border border-[var(--color-border-warm)] dark:border-[var(--color-border-dark)]";

  return (
    <section className={`not-prose my-10 rounded-3xl ${surface} overflow-hidden`} aria-label={s.title}>
      <div className="px-6 sm:px-8 pt-7 pb-6 bg-[var(--color-lavender)] dark:bg-[var(--color-surface-elevated-dark)]">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/70 dark:bg-white/10">
            <BIcon name="bottle" size={18} className="text-[var(--color-primary-dark)] dark:text-[var(--color-primary)]" />
          </span>
          <h3 className="font-display font-bold text-xl text-[var(--color-ink)] dark:text-white m-0">{s.title}</h3>
        </div>
        <p className="text-[14px] text-[var(--color-fg-secondary)] dark:text-slate-400 mt-2 mb-0">{s.subtitle}</p>
      </div>

      <div className="px-6 sm:px-8 py-6 grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className="text-[13px] font-medium text-[var(--color-fg)] dark:text-slate-200">{s.mlLabel}</span>
          <div className="relative">
            <input
              type="text"
              inputMode="numeric"
              value={mlDay}
              onChange={(e) => setMlDay(e.target.value)}
              placeholder={s.mlPlaceholder}
              className="w-full rounded-xl border border-[var(--color-border-warm)] dark:border-[var(--color-border-dark)] bg-white dark:bg-[var(--color-surface-elevated-dark)] px-3.5 py-2.5 pr-16 text-[15px] text-[var(--color-ink)] dark:text-white outline-none focus:border-[var(--color-primary)]"
            />
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[13px] text-[var(--color-fg-muted)]">{s.mlUnit}</span>
          </div>
          <span className="text-[12px] text-[var(--color-fg-muted)]">{s.mlHelp}</span>
        </label>

        <div className="flex flex-col gap-1.5">
          <span className="text-[13px] font-medium text-[var(--color-fg)] dark:text-slate-200">{s.canLabel}</span>
          <div className="flex gap-2">
            {([400, 800] as CanSize[]).map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setCanSize(g)}
                aria-pressed={canSize === g}
                className={`rounded-full px-4 py-2 text-[14px] font-medium border transition-colors ${
                  canSize === g
                    ? "bg-[var(--color-primary-dark)] text-white border-[var(--color-primary-dark)]"
                    : "bg-white dark:bg-[var(--color-surface-elevated-dark)] text-[var(--color-fg-secondary)] dark:text-slate-300 border-[var(--color-border-warm)] dark:border-[var(--color-border-dark)] hover:border-[var(--color-primary)]"
                }`}
              >
                {s.canOption(g)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="px-6 sm:px-8 pb-6">
        {result ? (
          <div className="rounded-2xl bg-[var(--color-lavender)] dark:bg-[var(--color-surface-elevated-dark)] px-5 py-5">
            <div className="text-2xl sm:text-[28px] font-bold text-[var(--color-primary-dark)] dark:text-[var(--color-primary)] leading-none">
              {s.resultCans(result.cansLo, result.cansHi)}
            </div>
            <div className="text-[12px] text-[var(--color-fg-muted)] mt-1">{s.perMonth}</div>
            <p className="text-[14px] text-[var(--color-fg-secondary)] dark:text-slate-400 mt-3 mb-0">
              {s.resultDays(result.daysLo, result.daysHi)}
            </p>
          </div>
        ) : hasMl ? (
          <p className="text-[14px] text-[var(--color-fg-secondary)] dark:text-slate-400 m-0">{s.invalidMl}</p>
        ) : (
          <p className="text-[14px] text-[var(--color-fg-muted)] m-0">{s.fillPrompt}</p>
        )}
      </div>

      <div className="px-6 sm:px-8 py-5 border-t border-[var(--color-border-warm)] dark:border-[var(--color-border-dark)] bg-[var(--color-background-soft)] dark:bg-transparent">
        <p className="flex items-center gap-2 text-[13px] font-semibold text-[var(--color-ink)] dark:text-white m-0">
          <BIcon name="check" size={13} className="text-[var(--color-secondary-dark)]" />
          {s.disclaimersTitle}
        </p>
        <ul className="mt-2.5 mb-0 space-y-1.5 list-none pl-0">
          {s.disclaimers.map((d, i) => (
            <li key={i} className="text-[12.5px] leading-relaxed text-[var(--color-fg-secondary)] dark:text-slate-400 pl-4 relative">
              <span className="absolute left-0 top-[7px] w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]/60" />
              {d}
            </li>
          ))}
        </ul>
        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="text-[12px] font-medium text-[var(--color-fg-muted)]">{s.sourcesLabel}:</span>
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
