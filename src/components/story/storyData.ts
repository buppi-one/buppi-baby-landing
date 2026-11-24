import type { MomentId } from "@/i18n/storyTypes";

/**
 * Sample data behind the six phone demos. Nothing here is translatable: the
 * labels live in the story messages, in the same order as these arrays.
 */

/** Days in a full-term pregnancy (40 weeks). The story counts days from birth, so pregnancy is negative. */
export const PREGNANCY_DAYS = 280;
export const DAYS_PER_WEEK = 7;
export const FULL_TERM_WEEKS = 40;

/** Day relative to birth for a gestational week. */
const atWeek = (week: number) => (week - FULL_TERM_WEEKS) * DAYS_PER_WEEK;

/** Baby age, in days from birth, that each chapter stands for (drives the age strip). */
export const CHAPTER_DAYS = {
  preg12: atWeek(12),
  preg24: atWeek(24),
  preg38: atWeek(38),
  born: 0,
  week1: 5,
  month2: 60,
  month4: 120,
  month6: 180,
  month9: 270,
  year1: 365,
} as const;

/** Where the strip starts, above the hero: week 8 of pregnancy. */
export const AGE_START_DAYS = atWeek(8);
export const AGE_END_DAYS = 365;

/** Book groups, newest first; index matches `rt.book.groups`. */
export const MOMENT_GROUPS: MomentId[][] = [
  ["ano1", "passos"],
  ["praia", "mes9"],
  ["dente", "sentou", "mes6"],
  ["brucos", "mes4", "banho"],
  ["sorriso", "colo", "semana1"],
];

/** Like counters shown on each book moment before the visitor taps. */
export const MOMENT_LIKES: Record<MomentId, number> = {
  ano1: 12,
  passos: 9,
  praia: 7,
  mes9: 11,
  dente: 8,
  sentou: 6,
  mes6: 10,
  brucos: 5,
  mes4: 9,
  banho: 4,
  sorriso: 14,
  colo: 8,
  semana1: 12,
};

export type WeekDay = {
  /** Night wakings, in hours after midnight. */
  wakings: number[];
  bedtime: number;
  wakeUp: number;
  naps: Array<[start: number, end: number]>;
};

/** The sleep-regression week; index matches `rt.week.days` and `rt.week.notes`. */
export const WEEK: WeekDay[] = [
  { wakings: [2.2, 4.5], bedtime: 19.5, wakeUp: 6.6, naps: [[8.5, 9.7], [12, 13.2], [15.7, 16.3]] },
  { wakings: [1.5, 3.2, 5], bedtime: 19.7, wakeUp: 6.4, naps: [[8.3, 9.2], [11.8, 12.9], [15.5, 16.2]] },
  { wakings: [0.8, 2, 3.1, 4.3, 5.4], bedtime: 19.3, wakeUp: 6.2, naps: [[8.2, 8.9], [11.5, 12.3], [15, 15.6]] },
  { wakings: [1, 2.4, 3.3, 4.6, 5.5], bedtime: 19.5, wakeUp: 6.3, naps: [[8.4, 9.1], [11.7, 12.5], [15.2, 15.9]] },
  { wakings: [1.2, 3.4, 4.2, 5.6], bedtime: 19.4, wakeUp: 6.5, naps: [[8.5, 9.5], [12, 13], [15.6, 16.2]] },
  { wakings: [2, 4.1, 5.3], bedtime: 19.6, wakeUp: 6.7, naps: [[8.6, 9.8], [12.2, 13.3], [15.8, 16.4]] },
  { wakings: [2.5, 4.8], bedtime: 19.5, wakeUp: 6.8, naps: [[8.7, 9.9], [12.3, 13.5], [16, 16.6]] },
];
export const WEEK_INITIAL_DAY = 3;
/** Days the guided tour asks the visitor to tap: the worst night, then the recovery. */
export const WEEK_TOUR_DAYS = [2, 6] as const;

export type AllergenState = "watching" | "exposed" | "notOffered";
/** Index matches `rt.allergens.names`. */
export const ALLERGENS: Array<{ state: AllergenState; exposures: number }> = [
  { state: "watching", exposures: 0 }, // egg
  { state: "exposed", exposures: 3 }, // peanut
  { state: "exposed", exposures: 5 }, // cow's milk
  { state: "exposed", exposures: 8 }, // wheat
  { state: "notOffered", exposures: 0 }, // fish
  { state: "notOffered", exposures: 0 }, // soy
  { state: "notOffered", exposures: 0 }, // tree nuts
  { state: "notOffered", exposures: 0 }, // shellfish
  { state: "notOffered", exposures: 0 }, // sesame
];
/** For each food chip (`rt.allergens.foods`), the allergen it counts towards. */
export const FOOD_ALLERGEN = [4, 1, 5, 6, 3, 8] as const;
/** Food chips the guided tour points at: fish first, then peanut butter. */
export const FOOD_TOUR = [0, 1] as const;

/** Access roles: 0 cares, 1 follows, 2 sees only the book. Index matches `rt.access.people`. */
export const PEOPLE: Array<{ role: 0 | 1 | 2; owner?: boolean }> = [
  { role: 0, owner: true },
  { role: 0 },
  { role: 1 },
  { role: 2 },
  { role: 2 },
];
/** What each role can do, per permission row in `rt.access.perms`. */
export const ROLE_PERMS: boolean[][] = [
  [true, true, false],
  [true, false, false],
  [true, true, true],
];
/** Person the access tour starts with (the grandmother who only sees the book). */
export const ACCESS_TOUR_PERSON = 3;

/** Nap-prediction demo, in minutes after midnight. */
export const NAP = {
  predictedAt: 700,
  wokeAt: 580,
  wakeWindow: 120,
  axisStart: 360,
  axisSpan: 900,
  lateAfter: 15,
} as const;

export const CONFETTI_COLORS = ["#ac92ee", "#92d6cf", "#ffb84d", "#ffbfa5", "#6056d7"];
export const CONFETTI_COUNT = 16;

/* ---------- pregnancy demos ---------- */

/** Week-by-week demo: the slider range and where it starts. */
export const PREG_WEEK = { min: 4, max: 40, current: 12, crownHeelFrom: 20 } as const;

/**
 * Prenatal windows, copied from the app's calendar (apps/buppi-baby/src/lib/prenatalCare.ts).
 * `to: null` means open-ended. Index matches `rt.prenatal.items`.
 */
export const PRENATAL_ITEMS: Array<{ from: number; to: number | null }> = [
  { from: 11, to: 14 }, // first-trimester ultrasound
  { from: 20, to: 24 }, // anatomy scan
  { from: 24, to: 28 }, // glucose tolerance test
  { from: 28, to: 32 }, // growth ultrasound
  { from: 34, to: 36 }, // late ultrasound
  { from: 36, to: 37 }, // group B strep
  { from: 0, to: 13 }, // blood count and first-trimester tests
  { from: 20, to: null }, // Tdap vaccine
  { from: 0, to: null }, // flu vaccine
  { from: 28, to: null }, // RSV vaccine
];
/** Order the week-by-week card looks for "what to do now": exams and scans first, then the blood work. */
export const PRENATAL_TODO_ORDER = [0, 1, 2, 3, 4, 5, 6] as const;

/** Prenatal demo, at week 24. Indices into PRENATAL_ITEMS. */
export const PRENATAL_DEMO = {
  week: 24,
  now: [1, 7, 2, 8],
  later: [3, 9, 5],
  done: [0, 6],
  /** Gestational week each `done` item was recorded at. */
  doneWeeks: [12, 9],
  /** The two the guided tour asks the visitor to record: the anatomy scan, then Tdap. */
  tour: [1, 7],
} as const;

/** Contractions demo. Times in seconds after midnight; rule 5-1-1 as in lib/contractions.ts. */
export const CONTRACTIONS = {
  startAt: 3 * 3600 + 7 * 60,
  ruleMinutes: 5,
  ruleSeconds: 60,
  windowSeconds: 3600,
  gapSeconds: 5 * 60,
  /** The demo clock runs this many times faster than real time while a contraction is timed. */
  speed: 15,
  /** The last hour before the visitor arrives, oldest first: every 5 minutes, one of them short. */
  seedDurations: [48, 50, 40, 62, 60, 61, 60, 62, 60, 61, 60, 62, 61],
  /** The short one leaves the 1-hour window only when the visitor's second contraction ends. */
  shortIndex: 2,
  shortShiftSeconds: 40,
  /** Contractions the visitor times before the tour ends. */
  visitorCount: 2,
  /** Rows in the "latest" list. */
  shown: 4,
} as const;
