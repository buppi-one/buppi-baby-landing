import type { PregnancyWeek, StoryRuntimeMessages } from "@/i18n/storyTypes";
import { CONTRACTIONS, PRENATAL_ITEMS, PRENATAL_TODO_ORDER } from "./storyData";

/**
 * Formatting shared by the server-rendered week card (Story.tsx) and the
 * week-by-week demo (storyEngine.ts), so the first paint and the slider agree.
 */

const MM_PER_CM = 10;
const G_PER_KG = 1000;

export const fill = (template: string, values: Record<string, string | number>) =>
  template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? ""));

const oneDecimal = (locale: string, value: number) =>
  value.toLocaleString(locale, { maximumFractionDigits: 1 });

export const formatLength = (locale: string, mm: number) => `${oneDecimal(locale, mm / MM_PER_CM)} cm`;

export const formatMass = (locale: string, g: number) =>
  g >= G_PER_KG ? `${oneDecimal(locale, g / G_PER_KG)} kg` : `${g} g`;

type PrenatalCopy = StoryRuntimeMessages["prenatal"];

/** "between 20 and 24 weeks", "from 28 weeks on"... as the app words a prenatal window. */
export function prenatalWindow(p: PrenatalCopy, index: number): string {
  const { from, to } = PRENATAL_ITEMS[index];
  if (to === null) return from ? fill(p.windowFrom, { a: from }) : p.windowAny;
  return from ? fill(p.windowBetween, { a: from, b: to }) : fill(p.windowUntil, { b: to });
}

/** The first exam or scan whose window holds this week, or null when none is due. */
export function prenatalTodo(week: number): number | null {
  const hit = PRENATAL_TODO_ORDER.find((i) => {
    const { from, to } = PRENATAL_ITEMS[i];
    return week >= from && (to === null || week <= to);
  });
  return hit ?? null;
}

/** Text of the week card for one week; the same strings on the server and after each slider move. */
export function weekCard(locale: string, t: StoryRuntimeMessages, week: number, w: PregnancyWeek) {
  const todo = prenatalTodo(week);
  return {
    title: fill(t.pregWeek.title, { n: week }),
    scrubValue: fill(t.pregWeek.scrubValue, { n: week }),
    size: fill(t.pregWeek.size, { c: w.comparison }),
    length: formatLength(locale, w.lengthMm),
    lengthMeasure: w.crownHeel ? t.pregWeek.crownHeel : t.pregWeek.crownRump,
    weight: w.weightG ? formatMass(locale, w.weightG) : "—",
    weightRange:
      w.weightG && w.weightP10G && w.weightP90G
        ? fill(t.pregWeek.weightRange, { a: formatMass(locale, w.weightP10G), b: formatMass(locale, w.weightP90G) })
        : t.pregWeek.weightLater,
    todo: todo === null ? t.pregWeek.todoNone : t.prenatal.items[todo],
    todoSub: todo === null ? t.pregWeek.todoOpen : prenatalWindow(t.prenatal, todo),
    coverAlt: fill(t.pregWeek.coverAlt, { c: w.comparison, n: week }),
  };
}

/* ---------- contractions (same rule as the app's lib/contractions.ts) ---------- */

export type Contraction = { start: number; dur: number; mine?: boolean };

const SECONDS_PER_MINUTE = 60;
const pad2 = (n: number) => String(n).padStart(2, "0");
const SECONDS_PER_DAY = 86400;

/** Clock time for seconds after midnight. */
export const clock = (s: number) => {
  const d = ((s % SECONDS_PER_DAY) + SECONDS_PER_DAY) % SECONDS_PER_DAY;
  return `${pad2(Math.floor(d / 3600))}:${pad2(Math.floor(d / SECONDS_PER_MINUTE) % SECONDS_PER_MINUTE)}`;
};

/** The sample hour the demo opens with. */
export function seedContractions(): Contraction[] {
  const list = CONTRACTIONS.seedDurations.map((dur, i) => ({
    start: CONTRACTIONS.startAt - (CONTRACTIONS.seedDurations.length - i) * CONTRACTIONS.gapSeconds,
    dur,
  }));
  list[CONTRACTIONS.shortIndex].start += CONTRACTIONS.shortShiftSeconds;
  return list;
}

/**
 * Mean gap and duration over the last hour, and whether the rule is met: every
 * contraction in the hour (and the gap into it) at most `ruleMinutes` apart and
 * at least `ruleSeconds` long, as ruleReached() does in the app.
 */
export function contractionStats(list: Contraction[], now: number) {
  const { windowSeconds, ruleMinutes, ruleSeconds } = CONTRACTIONS;
  const inWindow = list.filter((c) => c.start > now - windowSeconds);
  const before = list.filter((c) => c.start <= now - windowSeconds);
  const gaps = inWindow
    .map((c) => {
      const prev = list[list.indexOf(c) - 1];
      return prev ? c.start - prev.start : 0;
    })
    .filter((g) => g > 0);
  const gap = gaps.length ? gaps.reduce((a, b) => a + b, 0) / gaps.length : 0;
  const dur = inWindow.length ? inWindow.reduce((a, c) => a + c.dur, 0) / inWindow.length : 0;
  const ruleGap = ruleMinutes * SECONDS_PER_MINUTE;
  const reached =
    inWindow.length > 0 &&
    before.length > 0 &&
    inWindow.every((c) => c.start - list[list.indexOf(c) - 1].start <= ruleGap && c.dur >= ruleSeconds);
  return { gapMinutes: Math.round(gap / SECONDS_PER_MINUTE), seconds: Math.round(dur), reached };
}
