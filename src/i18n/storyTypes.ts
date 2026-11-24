/**
 * Copy for the landing story, from pregnancy to the first year (src/components/story).
 *
 * Templates use {curly} placeholders that the runtime fills in:
 * {n} a number, {t} a duration, {name} a person, {side} a breast side,
 * {a}/{b} the current and total step.
 */

/** A sentence that opens with a bold lead-in. */
export type Rich = { b: string; t: string };
export type TitleSub = { title: string; sub: string };
export type Polaroid = { alt: string; cap: string };

/** Ids of the illustrated moments; each one is an image in /public/landing. */
export type MomentId =
  | "ano1"
  | "passos"
  | "praia"
  | "mes9"
  | "dente"
  | "sentou"
  | "mes6"
  | "brucos"
  | "mes4"
  | "banho"
  | "sorriso"
  | "colo"
  | "semana1";

type ChapterBase = {
  age: string;
  ageSub: string;
  title: string;
  pain: string;
  lead: string;
  /** First instruction shown above the phone, before the runtime takes over. */
  tryText: string;
  sceneAlt: string;
};

/** One week of the pregnancy series, from the index the site publishes for the app. */
export type PregnancyWeek = {
  comparison: string;
  lengthMm: number;
  /** Length measured head to heel (from week 20) instead of head to bottom. */
  crownHeel: boolean;
  weightG: number | null;
  weightP10G: number | null;
  weightP90G: number | null;
  quickAnswer: string;
  /** Site-relative path of the article's watercolor cover. */
  cover: string | null;
};

/** A field in a "record this" sheet: label and the sample value shown. */
export type Field = [label: string, value: string];

export type StoryRuntimeMessages = {
  age: {
    labelPregnancy: string;
    labelBaby: string;
    /** Label on the day of birth, read together with `bornToday`. */
    labelBorn: string;
    pregnancyWeek: string;
    bornToday: string;
    day: string;
    days: string;
    weeks: string;
    month: string;
    months: string;
    year: string;
  };
  tour: { yourTurn: string; done: string; stepOf: string; tapHere: string };
  now: string;
  nursing: {
    steps: [string, string, string, string];
    tagSwitch: string;
    done: string;
    doneQuick: string;
    hintTimer: Rich;
    hintQuick: Rich;
    hintSaved: Rich;
    sideLower: { L: string; R: string };
    title: string;
    left: string;
    right: string;
    tapToSwitch: string;
    lessThanASecond: string;
    quick: { bottle: TitleSub; diaper: TitleSub; sleep: TitleSub; pump: TitleSub };
  };
  nap: {
    steps: [string, string];
    tagDrag: string;
    done: string;
    upcoming: string;
    due: string;
    minutes: string;
    awakeWindow: string;
    awakeSigns: string;
    awakeLate: string;
    tagWaiting: string;
    tagInWindow: string;
    tagLate: string;
    why: string;
    whyClose: string;
  };
  week: {
    days: Array<{ d: string; n: string }>;
    notes: string[];
    steps: [string, string];
    done: string;
  };
  allergens: {
    names: string[];
    eggNote: string;
    foods: string[];
    exposure: string;
    exposures: string;
    lastNow: string;
    hint: string;
    groupWatching: string;
    groupExposed: string;
    groupNotOffered: string;
    watch: string;
    footer: string;
    steps: [string, string];
    done: string;
  };
  access: {
    people: Array<{ name: string; rel: string; sub: string }>;
    groups: Array<{ title: string; hint: string }>;
    perms: [string, string, string];
    roles: [string, string, string];
    banner: string;
    publicLink: TitleSub;
    ownerHint: string;
    roleHint: string;
    closeAria: string;
    steps: [string, string, string];
    tagClose: string;
    done: string;
  };
  pregWeek: {
    title: string;
    scrubValue: string;
    size: string;
    crownRump: string;
    crownHeel: string;
    weightRange: string;
    weightLater: string;
    todoNone: string;
    todoOpen: string;
    coverAlt: string;
    guideSwitch: Rich;
    steps: [string, string];
    tagDrag: string;
    done: string;
  };
  prenatal: {
    /** Index matches PRENATAL_ITEMS in storyData.ts. */
    items: [string, string, string, string, string, string, string, string, string, string];
    groups: [now: string, later: string, done: string];
    windowBetween: string;
    windowUntil: string;
    windowFrom: string;
    windowAny: string;
    doneAt: string;
    registeredToday: string;
    register: string;
    save: string;
    alsoInTimeline: string;
    today: string;
    /** Sheet fields for the two items the tour records: anatomy scan, then Tdap. */
    fields: [Field[], Field[]];
    steps: [string, string, string, string];
    done: string;
  };
  contractions: {
    pattern: string;
    minutes: string;
    notYet: string;
    reached: string;
    start: string;
    startHint: string;
    stopHint: string;
    lasted: string;
    interval: string;
    skip: string;
    steps: [string, string, string, string];
    tagStop: string;
    done: string;
    doneShort: string;
  };
  book: {
    groups: [string, string, string, string, string];
    moments: Record<MomentId, { title: string; text: string; comment: string; cap: string }>;
    milestone: string;
    inPrint: string;
    likeAria: string;
    steps: [string, string];
    tagLike: string;
    done: string;
  };
};

export type StoryMessages = {
  babyName: string;
  hero: {
    eyebrow: string;
    titleBefore: string;
    titleHighlight: string;
    titleAfter: string;
    lead: string;
    notes: [string, string, string];
    scrollHint: string;
    imageAlt: string;
    toasts: [TitleSub, TitleSub, TitleSub];
  };
  app: {
    tabs: { home: string; stats: string; book: string; baby: string };
    seg: [string, string, string];
    registerAria: string;
  };
  chapters: {
    preg12: ChapterBase & {
      guide: Rich;
      currentWeek: string;
      length: string;
      weight: string;
      summary: string;
      todoTitle: string;
      source: string;
      scrubLabel: string;
    };
    preg24: ChapterBase & { guide: Rich; screenTitle: string; rhythm: string; intro: string };
    preg38: ChapterBase & {
      guide: Rich;
      screenTitle: string;
      patternLabel: string;
      rule: string;
      reachedBody: string;
      last: string;
      disclaimer: string;
    };
    week1: ChapterBase & {
      guide: Rich;
      babyAge: string;
      overline: string;
      feed: [TitleSub, TitleSub, TitleSub];
      dial: { nursing: string; bottle: string; diaper: string; sleep: string; pump: string };
      timer: { title: string; effective: string; finish: string };
    };
    month2: ChapterBase & {
      polaroid: Polaroid;
      babyAge: string;
      quickInfo: string;
      whyIntro: string;
      whyItems: string[];
      scrubLabel: string;
      predictedToday: string;
      rows: [TitleSub, TitleSub, TitleSub];
      tagInRange: string;
    };
    month4: ChapterBase & {
      guide: Rich;
      screenTitle: string;
      chips: [string, string, string, string];
      tabs: [string, string, string];
      overline: string;
      weekTitle: string;
      legend: [string, string, string];
    };
    month6: ChapterBase & { polaroid: Polaroid; screenTitle: string; foodbar: string };
    month9: ChapterBase & { polaroid: Polaroid; screenTitle: string; invite: string };
    year1: ChapterBase & { polaroid: Polaroid; babyAge: string; seg: [string, string, string] };
  };
  born: { button: string; title: string; lead: string };
  pricing: {
    eyebrow: string;
    title: string;
    lead: string;
    freeEyebrow: string;
    freeTitle: string;
    freeItems: string[];
    proEyebrow: string;
    proTitle: string;
    proItems: string[];
    proFine: string;
  };
  closing: {
    eyebrow: string;
    title: string;
    reelAria: string;
    lead: string;
    notes: [string, string];
    disclaimer: string;
  };
  rt: StoryRuntimeMessages;
};
