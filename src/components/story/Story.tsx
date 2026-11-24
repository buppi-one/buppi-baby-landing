import { readFileSync } from "node:fs";
import path from "node:path";
import localFont from "next/font/local";
import type { CSSProperties, ReactNode } from "react";
import { StoreButtons } from "@/components/StoreButtons";
import { getMessages, type Locale } from "@/i18n";
import type { Polaroid as PolaroidCopy, PregnancyWeek, Rich, StoryMessages } from "@/i18n/storyTypes";
import { clock, contractionStats, fill, prenatalWindow, seedContractions, weekCard } from "./pregnancyFormat";
import { StoryIcon, StoryIconSprite, type StoryIconName } from "./StoryIcons";
import { StoryRuntime } from "./StoryRuntime";
import {
  AGE_START_DAYS,
  CHAPTER_DAYS,
  CONTRACTIONS,
  DAYS_PER_WEEK,
  FULL_TERM_WEEKS,
  PREG_WEEK,
  PRENATAL_DEMO,
} from "./storyData";
import "./story.css";

// Nunito is the app's own typeface (used inside the phone demos); Caveat is the
// handwriting on the polaroids. Self-hosted like the rest of the site's fonts.
const nunito = localFont({
  src: "../../app/fonts/nunito-latin-wght-normal.woff2",
  weight: "200 1000",
  variable: "--font-nunito",
  display: "swap",
  preload: false,
});
const caveat = localFont({
  src: "../../app/fonts/caveat-latin-wght-normal.woff2",
  weight: "400 700",
  variable: "--font-caveat",
  display: "swap",
  preload: false,
});

const IMG = "/landing";
const SCENE_SIZE = { width: 1200, height: 800 };
const BUPPI_SIZE = { width: 220, height: 256 };
const STORY_CLASS = `story ${nunito.variable} ${caveat.variable}`;

type App = StoryMessages["app"];

const SECONDS_PER_MINUTE = 60;

type IndexWeek = {
  fromWeek: number;
  toWeek: number;
  comparison: string | null;
  lengthMm: number | null;
  lengthMeasure: "crown-rump" | "crown-heel" | null;
  weightG: number | null;
  weightP10G: number | null;
  weightP90G: number | null;
  quickAnswer: string;
  coverUrl: string | null;
};

/**
 * The week-by-week numbers come from the same index the app reads
 * (public/ai/pregnancy-weeks.<locale>.json, built from the published series by
 * `npm run build-ai-index`). Nothing here is typed by hand.
 */
function loadPregnancyWeeks(locale: Locale): Record<number, PregnancyWeek> {
  const file = path.join(process.cwd(), "public", "ai", `pregnancy-weeks.${locale}.json`);
  const index = JSON.parse(readFileSync(file, "utf8")) as { weeks: IndexWeek[] };
  const weeks: Record<number, PregnancyWeek> = {};
  for (const w of index.weeks) {
    if (w.fromWeek !== w.toWeek || w.fromWeek < PREG_WEEK.min || w.fromWeek > PREG_WEEK.max) continue;
    if (!w.comparison || !w.lengthMm) continue;
    weeks[w.fromWeek] = {
      comparison: w.comparison,
      lengthMm: w.lengthMm,
      crownHeel: w.lengthMeasure === "crown-heel",
      weightG: w.weightG,
      weightP10G: w.weightP10G,
      weightP90G: w.weightP90G,
      quickAnswer: w.quickAnswer,
      cover: w.coverUrl ? new URL(w.coverUrl).pathname : null,
    };
  }
  for (let week = PREG_WEEK.min; week <= PREG_WEEK.max; week++) {
    if (!weeks[week]) throw new Error(`pregnancy-weeks.${locale}.json has no entry for week ${week}`);
  }
  return weeks;
}

/* ---------- small building blocks ---------- */

function RichText({ value }: { value: Rich }) {
  return (
    <>
      <b>{value.b}</b> {value.t}
    </>
  );
}

function Scene({
  src,
  alt,
  eager = false,
  children,
}: {
  src: string;
  alt: string;
  eager?: boolean;
  children?: ReactNode;
}) {
  return (
    <div className="scene" data-px>
      <img
        src={`${IMG}/${src}.webp`}
        alt={alt}
        {...SCENE_SIZE}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : undefined}
      />
      {children}
    </div>
  );
}

function Polaroid({ src, copy, side }: { src: string; copy: PolaroidCopy; side: "bl" | "br" }) {
  return (
    <div className={`polaroid p-${side}`}>
      <img src={`${IMG}/${src}.webp`} alt={copy.alt} {...SCENE_SIZE} loading="lazy" />
      <span>{copy.cap}</span>
    </div>
  );
}

function Guide({ id, value }: { id?: string; value: Rich }) {
  return (
    <div className="guide">
      <img src={`${IMG}/buppi.webp`} alt="Buppi" {...BUPPI_SIZE} loading="lazy" />
      <div className="bubble" id={id}>
        <RichText value={value} />
      </div>
    </div>
  );
}

function Star({ style }: { style: CSSProperties }) {
  return <span className="star" style={style} />;
}

/** The "your turn" bar above a phone; storyEngine.ts rewrites it as the tour advances. */
function Try({ id, yourTurn, text }: { id: string; yourTurn: string; text: string }) {
  return (
    <div className="try" id={id} aria-live="polite">
      <span className="try-k">{yourTurn}</span>
      <span className="try-t">{text}</span>
    </div>
  );
}

function Phone({ id, children }: { id: string; children: ReactNode }) {
  return (
    <div className="phone">
      <div className="app" id={id}>
        {children}
      </div>
    </div>
  );
}

function StatusBar({ time, timeId }: { time: string; timeId?: string }) {
  return (
    <div className="a-status">
      <span id={timeId}>{time}</span>
      <span aria-hidden="true">●●●</span>
    </div>
  );
}

function BabyHeader({ name, age, avatar }: { name: string; age: string; avatar: string }) {
  return (
    <div className="a-head">
      <span className="a-av">
        <img src={`${IMG}/${avatar}.webp`} alt="" width={96} height={96} loading="lazy" />
      </span>
      <div>
        <div className="a-name">{name}</div>
        <div className="a-sub">{age}</div>
      </div>
      <div className="a-icons">
        <StoryIcon name="spark" />
        <StoryIcon name="bell" />
        <StoryIcon name="gear" />
      </div>
    </div>
  );
}

function Segmented({ items }: { items: readonly string[] }) {
  return (
    <div className="a-seg">
      {items.map((item, i) => (
        <span key={item} className={i === 0 ? "on" : undefined}>
          {item}
        </span>
      ))}
    </div>
  );
}

function TabBar({
  app,
  active,
  fabId,
}: {
  app: App;
  active: keyof App["tabs"];
  /** When set, the + is a real button the nursing demo listens to. */
  fabId?: string;
}) {
  const tab = (key: keyof App["tabs"], icon: StoryIconName) => (
    <span className={active === key ? "on" : undefined}>
      <StoryIcon name={icon} />
      {app.tabs[key]}
    </span>
  );
  return (
    <div className="a-tab">
      {tab("home", "home")}
      {tab("stats", "bars")}
      {fabId ? (
        <button className="a-fab nudge" id={fabId} aria-label={app.registerAria}>
          <StoryIcon name="plus" />
        </button>
      ) : (
        <i className="a-fab" style={{ display: "grid" }}>
          <StoryIcon name="plus" />
        </i>
      )}
      {tab("book", "book")}
      {tab("baby", "baby")}
    </div>
  );
}

function FeedRow({
  icon,
  bg,
  color,
  title,
  sub,
  children,
}: {
  icon: StoryIconName;
  bg: string;
  color: string;
  title: string;
  sub: string;
  children: ReactNode;
}) {
  return (
    <div className="a-row">
      <span className="a-ic" style={{ background: bg, color }}>
        <StoryIcon name={icon} />
      </span>
      <div>
        <b>{title}</b>
        <small>{sub}</small>
      </div>
      {children}
    </div>
  );
}

function Chapter({
  id,
  days,
  tone,
  flip = false,
  art,
  hasPolaroid = false,
  copy,
  tryId,
  yourTurn,
  children,
}: {
  id?: string;
  days: number;
  tone: "night" | "day" | "soft";
  flip?: boolean;
  art: ReactNode;
  hasPolaroid?: boolean;
  copy: { age: string; ageSub: string; title: string; pain: string; lead: string; tryText: string };
  tryId: string;
  yourTurn: string;
  children: ReactNode;
}) {
  return (
    <section className={`chapter ${tone}`} data-days={days} id={id}>
      <div className={`wrap ch-grid${flip ? " flip" : ""}`}>
        <div className={`ch-art rv${hasPolaroid ? " has-polaroid" : ""}`}>{art}</div>
        <div className="copy rv">
          <div className="age">
            <b>{copy.age}</b>
            <span>{copy.ageSub}</span>
          </div>
          <h2>{copy.title}</h2>
          <p className="pain">{copy.pain}</p>
          <p className="lead">{copy.lead}</p>
          <Try id={tryId} yourTurn={yourTurn} text={copy.tryText} />
          {children}
        </div>
      </div>
    </section>
  );
}

/* ---------- the story ---------- */

/** Age strip, hero, the six chapters and the pricing block. */
export function StoryTop({ locale }: { locale: Locale }) {
  const m = getMessages(locale).story;
  const { hero, app, chapters: c, born, pricing, rt } = m;
  const yourTurn = rt.tour.yourTurn;
  const weeks = loadPregnancyWeeks(locale);
  const wk = weekCard(locale, rt, PREG_WEEK.current, weeks[PREG_WEEK.current]);
  const firstCover = weeks[PREG_WEEK.current].cover ?? "";
  const seeded = seedContractions();
  const pattern = contractionStats(seeded, CONTRACTIONS.startAt);
  const ct = rt.contractions;
  const toastIcons: Array<[StoryIconName, string]> = [
    ["heart", "#f29bb0"],
    ["cloud", "#6fcabd"],
    ["spark", "#e6b93c"],
  ];

  return (
    <div className={STORY_CLASS}>
      <StoryIconSprite />

      <div className="agestrip">
        <div className="wrap agechip">
          <span className="lbl" id="st-agelbl">
            {rt.age.labelPregnancy}
          </span>
          <b id="st-ageval">
            {fill(rt.age.pregnancyWeek, { n: FULL_TERM_WEEKS + AGE_START_DAYS / DAYS_PER_WEEK })}
          </b>
        </div>
        <div className="agebar">
          <i id="st-agefill" />
        </div>
      </div>

      <header className="hero">
        <div className="wrap hero-grid">
          <div>
            <div className="eyebrow">{hero.eyebrow}</div>
            <h1 style={{ marginTop: 14 }}>
              {hero.titleBefore}
              <span className="hl">
                {hero.titleHighlight}
                <svg viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden="true">
                  <path
                    d="M2 8 Q 50 2, 100 6 T 198 4"
                    pathLength={1}
                    stroke="var(--teal)"
                    strokeWidth="3.5"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              {hero.titleAfter}
            </h1>
            <p className="lead" style={{ marginTop: 26 }}>
              {hero.lead}
            </p>
            <div className="ctas">
              <StoreButtons size="lg" locale={locale} />
            </div>
            <div className="notes">
              {hero.notes.map((note) => (
                <span key={note}>✓ {note}</span>
              ))}
            </div>
            <p className="notes" style={{ marginTop: 26, fontWeight: 600, color: "var(--fg2)" }}>
              {hero.scrollHint}
            </p>
          </div>
          <div className="scenewrap">
            <Scene src="hero" alt={hero.imageAlt} eager />
            {hero.toasts.map((toast, i) => (
              <div key={toast.title} className={`toast t${i + 1}`}>
                <span className="dot" style={{ background: toastIcons[i][1] }}>
                  <StoryIcon name={toastIcons[i][0]} />
                </span>
                <span>
                  {toast.title}
                  <small>{toast.sub}</small>
                </span>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Pregnancy, week 12: the size of the baby, week by week */}
      <Chapter
        id="gestacao"
        days={CHAPTER_DAYS.preg12}
        tone="soft"
        copy={c.preg12}
        tryId="st-try7"
        yourTurn={yourTurn}
        art={
          <>
            <div className="scene cover">
              <img id="st-covimg" src={firstCover} alt={wk.coverAlt} width={1200} height={630} loading="lazy" />
            </div>
            <Guide id="st-hint7" value={c.preg12.guide} />
          </>
        }
      >
        <Phone id="st-app7">
          <StatusBar time="9:41" />
          <div className="a-title">
            <StoryIcon name="back" />
            <span id="st-wktitle">{wk.title}</span>
          </div>
          <div className="a-body">
            <div className="wk-cover">
              <img id="st-wkcover" src={firstCover} alt="" width={1200} height={630} loading="lazy" />
              <span className="wk-cur" id="st-wkcur">
                {c.preg12.currentWeek}
              </span>
            </div>
            <div className="wk-size" id="st-wksize">
              {wk.size}
            </div>
            <div className="wk-stats">
              <div>
                <small>{c.preg12.length}</small>
                <b id="st-wklen">{wk.length}</b>
                <em id="st-wklenm">{wk.lengthMeasure}</em>
              </div>
              <div>
                <small>{c.preg12.weight}</small>
                <b id="st-wkw">{wk.weight}</b>
                <em id="st-wkwr">{wk.weightRange}</em>
              </div>
            </div>
            <div className="scrub">
              <label htmlFor="st-rng7">
                <span>{c.preg12.scrubLabel}</span>
                <span id="st-rng7v">{wk.scrubValue}</span>
              </label>
              <input
                type="range"
                id="st-rng7"
                min={PREG_WEEK.min}
                max={PREG_WEEK.max}
                step={1}
                defaultValue={PREG_WEEK.current}
              />
            </div>
            <button className="wk-sum" id="st-wksumb" aria-expanded="false" aria-controls="st-wkqa">
              <span>{c.preg12.summary}</span>
              <StoryIcon name="chev" />
            </button>
            <p className="wk-qa" id="st-wkqa" hidden>
              {weeks[PREG_WEEK.current].quickAnswer}
            </p>
            <div className="a-over">{c.preg12.todoTitle}</div>
            <div className="a-row">
              <span className="a-ic" style={{ background: "#ece6fb", color: "#8f6fe3" }}>
                <StoryIcon name="check" />
              </span>
              <div>
                <b id="st-wktodo">{wk.todo}</b>
                <small id="st-wktodos">{wk.todoSub}</small>
              </div>
              <span className="go-c">
                <StoryIcon name="chev" />
              </span>
            </div>
            <p className="wk-src">{c.preg12.source}</p>
          </div>
        </Phone>
      </Chapter>

      {/* Pregnancy, week 24: prenatal care laid out by the week */}
      <Chapter
        days={CHAPTER_DAYS.preg24}
        tone="day"
        flip
        copy={c.preg24}
        tryId="st-try8"
        yourTurn={yourTurn}
        art={
          <>
            <Scene src="gest24" alt={c.preg24.sceneAlt} />
            <Guide value={c.preg24.guide} />
          </>
        }
      >
        <Phone id="st-app8">
          <StatusBar time="15:20" />
          <div className="a-title">
            <StoryIcon name="back" />
            {c.preg24.screenTitle}
          </div>
          <div className="a-body" id="st-pnbody">
            <div className="pn-rhythm">{c.preg24.rhythm}</div>
            <p className="pn-intro">{c.preg24.intro}</p>
            {/* storyEngine.ts redraws the groups below as items are recorded */}
            <div id="st-pngroups">
              {(["now", "later", "done"] as const).map((group, g) => (
                <div key={group}>
                  <div className="a-over">{rt.prenatal.groups[g]}</div>
                  <div className="a-list">
                    {PRENATAL_DEMO[group].map((item, i) => (
                      <div key={item} className={`a-li${group === "done" ? " done" : ""}`}>
                        <div>
                          <b>{rt.prenatal.items[item]}</b>
                          <small>
                            {group === "done"
                              ? fill(rt.prenatal.doneAt, { n: PRENATAL_DEMO.doneWeeks[i] })
                              : prenatalWindow(rt.prenatal, item)}
                          </small>
                        </div>
                        {group === "now" ? (
                          <button className="reg" data-reg={item}>
                            {rt.prenatal.register}
                          </button>
                        ) : group === "done" ? (
                          <span className="ok-c">
                            <StoryIcon name="check" />
                          </span>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Phone>
      </Chapter>

      {/* Pregnancy, week 38: timing contractions against the agreed rule */}
      <Chapter
        days={CHAPTER_DAYS.preg38}
        tone="night"
        copy={c.preg38}
        tryId="st-try9"
        yourTurn={yourTurn}
        art={
          <>
            <Scene src="gest38" alt={c.preg38.sceneAlt}>
              <div className="fx">
                <Star style={{ top: "8%", left: "14%" }} />
                <Star style={{ top: "16%", left: "24%", animationDelay: "1.1s" }} />
                <span className="lampglow" style={{ left: "56%", top: "12%" }} />
              </div>
            </Scene>
            <Guide value={c.preg38.guide} />
          </>
        }
      >
        <Phone id="st-app9">
          <StatusBar time={clock(CONTRACTIONS.startAt)} timeId="st-clk9" />
          <div className="a-title">
            <StoryIcon name="back" />
            {c.preg38.screenTitle}
          </div>
          <div className="a-body">
            <div className="a-card ct-pat" id="st-ctpat">
              <div className="a-over" style={{ margin: "0 0 4px" }}>
                {c.preg38.patternLabel}
              </div>
              <div className="ct-line" id="st-ctline">
                {fill(ct.pattern, { gap: fill(ct.minutes, { n: pattern.gapMinutes }), s: pattern.seconds })}
              </div>
              <div className="ct-rule">
                <span>{c.preg38.rule}</span>
                <span className="tag wait" id="st-cttag">
                  {ct.notYet}
                </span>
              </div>
              <p className="ct-reach" id="st-ctreach" hidden>
                {c.preg38.reachedBody}
              </p>
            </div>
            <button className="ct-btn" id="st-ctbtn">
              <b id="st-ctbig">{ct.start}</b>
              <small id="st-ctsmall">{ct.startHint}</small>
            </button>
            <div className="a-over">{c.preg38.last}</div>
            <div id="st-ctlist">
              {seeded
                .slice(-CONTRACTIONS.shown)
                .reverse()
                .map((con) => {
                  const prev = seeded[seeded.indexOf(con) - 1];
                  return (
                    <div className="a-row" key={con.start}>
                      <span className="a-ic" style={{ background: "#ece6fb", color: "#8f6fe3" }}>
                        <StoryIcon name="heart" />
                      </span>
                      <div>
                        <b>{clock(con.start)}</b>
                        <small>
                          {fill(ct.lasted, { s: con.dur })}
                          {prev
                            ? ` · ${fill(ct.interval, { gap: fill(ct.minutes, { n: Math.round((con.start - prev.start) / SECONDS_PER_MINUTE) }) })}`
                            : ""}
                        </small>
                      </div>
                    </div>
                  );
                })}
            </div>
            <p className="wk-src">{c.preg38.disclaimer}</p>
          </div>
        </Phone>
      </Chapter>

      {/* Birth: the pregnancy turns into the baby's tracking */}
      <section className="chapter soft born" data-days={CHAPTER_DAYS.born}>
        <div className="wrap born-in rv">
          <div className="born-btn" aria-hidden="true">
            {born.button}
          </div>
          <h2>{born.title}</h2>
          <p className="lead">{born.lead}</p>
        </div>
      </section>

      {/* Week 1: one-tap logging and the nursing timer */}
      <Chapter
        id="funcionalidades"
        days={CHAPTER_DAYS.week1}
        tone="night"
        copy={c.week1}
        tryId="st-try1"
        yourTurn={yourTurn}
        art={
          <>
            <Scene src="semana1" alt={c.week1.sceneAlt}>
              <div className="fx">
                <Star style={{ top: "9%", left: "58%" }} />
                <Star style={{ top: "16%", left: "71%", animationDelay: ".9s" }} />
                <Star style={{ top: "6%", left: "80%", animationDelay: "1.6s" }} />
                <span className="lampglow" style={{ left: "-10%", bottom: "8%" }} />
              </div>
            </Scene>
            <Guide id="st-hint1" value={c.week1.guide} />
          </>
        }
      >
        <Phone id="st-app1">
          <StatusBar time="3:47" />
          <BabyHeader name={m.babyName} age={c.week1.babyAge} avatar="av-bebe" />
          <div className="a-body">
            <Segmented items={app.seg} />
            <div className="a-over">{c.week1.overline}</div>
            <div id="st-feed1">
              <FeedRow icon="spark" bg="#efe3f8" color="#9a6fc9" {...c.week1.feed[0]}>
                <time>02:10</time>
              </FeedRow>
              <FeedRow icon="heart" bg="#fdf0cf" color="#c98200" {...c.week1.feed[1]}>
                <time>01:35</time>
              </FeedRow>
              <FeedRow icon="moon" bg="#d9f2ed" color="#2f9e88" {...c.week1.feed[2]}>
                <time>23:50</time>
              </FeedRow>
            </div>
          </div>
          <div className="dial" id="st-dial" hidden>
            {(
              [
                ["nursing", "#f0b84a", "heart"],
                ["bottle", "#7fb3e6", "cup"],
                ["diaper", "#c5a3e8", "spark"],
                ["sleep", "#8fd6cc", "cloud"],
                ["pump", "#f29bb0", "drop"],
              ] as Array<[keyof typeof c.week1.dial, string, StoryIconName]>
            ).map(([kind, bg, icon]) => (
              <button key={kind} data-k={kind}>
                <em>{c.week1.dial[kind]}</em>
                <i style={{ background: bg }}>
                  <StoryIcon name={icon} />
                </i>
              </button>
            ))}
          </div>
          <div className="sheet" id="st-timer" hidden>
            <h4>{c.week1.timer.title}</h4>
            <div className="t-lab">{c.week1.timer.effective}</div>
            <div className="t-big" id="st-tbig">
              00:00
            </div>
            <div className="sides">
              <button className="side on" data-s="L">
                <span className="sn">
                  {rt.nursing.left}
                  <span className="pz" />
                </span>
                <span className="st" id="st-tL">
                  00:00
                </span>
                <span className="sh" />
              </button>
              <button className="side" data-s="R">
                <span className="sn">
                  {rt.nursing.right}
                  <span className="pz" />
                </span>
                <span className="st" id="st-tR">
                  00:00
                </span>
                <span className="sh">{rt.nursing.tapToSwitch}</span>
              </button>
            </div>
            <button className="fin" id="st-fin">
              {c.week1.timer.finish}
            </button>
          </div>
          <TabBar app={app} active="home" fabId="st-fab" />
        </Phone>
      </Chapter>

      {/* Month 2: the next-nap prediction */}
      <Chapter
        days={CHAPTER_DAYS.month2}
        tone="day"
        flip
        hasPolaroid
        copy={c.month2}
        tryId="st-try2"
        yourTurn={yourTurn}
        art={
          <>
            <Scene src="mes2" alt={c.month2.sceneAlt}>
              <div className="fx" aria-hidden="true">
                <span className="zz" style={{ left: "22%", top: "52%", fontSize: 22 }}>
                  z
                </span>
                <span className="zz" style={{ left: "25%", top: "50%", fontSize: 28, animationDelay: "1.05s" }}>
                  z
                </span>
                <span className="zz" style={{ left: "28%", top: "48%", fontSize: 34, animationDelay: "2.1s" }}>
                  z
                </span>
              </div>
            </Scene>
            <Polaroid src="colo" copy={c.month2.polaroid} side="bl" />
          </>
        }
      >
        <Phone id="st-app2">
          <StatusBar time="11:15" timeId="st-clk2" />
          <BabyHeader name={m.babyName} age={c.month2.babyAge} avatar="av-bebe" />
          <div className="a-body">
            <Segmented items={app.seg} />
            <div className="a-over">{c.month2.quickInfo}</div>
            <div className="a-card">
              <div className="pred-h" id="st-predh">
                <span id="st-predt">{rt.nap.upcoming}</span>
                <b id="st-predc">{rt.nap.minutes.replace("{n}", "25")}</b>
              </div>
              <div className="strip" id="st-strip">
                <i style={{ left: 0, width: "5%" }} />
                <i style={{ left: "16.7%", width: "7.8%" }} />
                <i className="pv" style={{ left: "37.8%", width: "7.8%" }} />
                <i className="pv" style={{ left: "61.1%", width: "5.6%" }} />
                <u id="st-nowl" style={{ left: "35%" }} />
              </div>
              <div className="axis" aria-hidden="true">
                {["06h", "09h", "12h", "15h", "18h", "21h"].map((hour) => (
                  <span key={hour}>{hour}</span>
                ))}
              </div>
              <div className="wwbar">
                <i id="st-wwf" style={{ width: "79%" }} />
              </div>
              <div className="pred-t" id="st-predx">
                {rt.nap.awakeWindow.replace("{t}", "1h35")}
              </div>
              <button className="why" id="st-whyb">
                {rt.nap.why}
              </button>
              <div className="whybox" id="st-whybox" hidden>
                {c.month2.whyIntro}
                <ul>
                  {c.month2.whyItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="scrub">
              <label htmlFor="st-rng2">
                <span>{c.month2.scrubLabel}</span>
                <span id="st-rngv">11:15</span>
              </label>
              <input type="range" id="st-rng2" min={600} max={760} step={5} defaultValue={675} />
            </div>
            <div className="a-over">{c.month2.predictedToday}</div>
            <FeedRow icon="spark" bg="#fff0d1" color="#c98200" {...c.month2.rows[0]}>
              <span className="tag ok" style={{ marginLeft: "auto" }}>
                {c.month2.tagInRange}
              </span>
            </FeedRow>
            <FeedRow icon="cloud" bg="#d9f2ed" color="#2f9e88" {...c.month2.rows[1]}>
              <span className="tag ok" style={{ marginLeft: "auto" }}>
                {c.month2.tagInRange}
              </span>
            </FeedRow>
            <FeedRow icon="cloud" bg="#d9f2ed" color="#2f9e88" {...c.month2.rows[2]}>
              <span className="tag wait" id="st-tag2" style={{ marginLeft: "auto" }}>
                {rt.nap.tagWaiting}
              </span>
            </FeedRow>
          </div>
          <TabBar app={app} active="home" />
        </Phone>
      </Chapter>

      {/* Month 4: the sleep regression seen in the week view */}
      <Chapter
        days={CHAPTER_DAYS.month4}
        tone="night"
        copy={c.month4}
        tryId="st-try3"
        yourTurn={yourTurn}
        art={
          <>
            <Scene src="mes4" alt={c.month4.sceneAlt}>
              <div className="fx">
                <Star style={{ top: "8%", left: "34%" }} />
                <Star style={{ top: "14%", left: "52%", animationDelay: "1.2s" }} />
                <Star style={{ top: "5%", left: "46%", animationDelay: ".5s" }} />
                <span className="lampglow" style={{ right: "-12%", top: "6%" }} />
              </div>
            </Scene>
            <Guide value={c.month4.guide} />
          </>
        }
      >
        <Phone id="st-app3">
          <StatusBar time="22:00" />
          <div className="a-title" style={{ fontSize: 24 }}>
            {c.month4.screenTitle}
          </div>
          <div className="a-chips">
            <span>{c.month4.chips[0]}</span>
            <span className="on">
              <StoryIcon name="moon" />
              {c.month4.chips[1]}
            </span>
            <span>
              <StoryIcon name="heart" />
              {c.month4.chips[2]}
            </span>
            <span>
              <StoryIcon name="fork" />
              {c.month4.chips[3]}
            </span>
          </div>
          <div className="a-tabs">
            {c.month4.tabs.map((tab, i) => (
              <span key={tab} className={i === 1 ? "on" : undefined}>
                {tab}
              </span>
            ))}
          </div>
          <div className="a-body" style={{ paddingTop: 12 }}>
            <div className="a-card">
              <div className="a-over" style={{ margin: 0 }}>
                {c.month4.overline}
              </div>
              <div style={{ fontWeight: 800, fontSize: 15, marginTop: 4 }}>{c.month4.weekTitle}</div>
              <div className="week" id="st-week" />
              <div className="wlegend">
                <span>
                  <i style={{ background: "var(--a-tealbg)" }} />
                  {c.month4.legend[0]}
                </span>
                <span>
                  <i style={{ background: "#c8ebe4" }} />
                  {c.month4.legend[1]}
                </span>
                <span>
                  <i style={{ background: "var(--a-red)" }} />
                  {c.month4.legend[2]}
                </span>
              </div>
              <div className="wdetail" id="st-wdetail" />
            </div>
          </div>
          <TabBar app={app} active="stats" />
        </Phone>
      </Chapter>

      {/* Month 6: allergens built from the meals logged */}
      <Chapter
        days={CHAPTER_DAYS.month6}
        tone="soft"
        flip
        hasPolaroid
        copy={c.month6}
        tryId="st-try4"
        yourTurn={yourTurn}
        art={
          <>
            <Scene src="mes6" alt={c.month6.sceneAlt} />
            <Polaroid src="pediatra" copy={c.month6.polaroid} side="br" />
          </>
        }
      >
        <Phone id="st-app4">
          <StatusBar time="12:20" />
          <div className="a-title">
            <StoryIcon name="back" />
            {c.month6.screenTitle}
          </div>
          <div className="a-body" id="st-albody" />
          <div className="foodbar">
            <p>{c.month6.foodbar}</p>
            <div id="st-foods" />
          </div>
        </Phone>
      </Chapter>

      {/* Month 9: who sees what */}
      <Chapter
        id="familia"
        days={CHAPTER_DAYS.month9}
        tone="day"
        hasPolaroid
        copy={c.month9}
        tryId="st-try5"
        yourTurn={yourTurn}
        art={
          <>
            <Scene src="mes9" alt={c.month9.sceneAlt} />
            <Polaroid src="dente" copy={c.month9.polaroid} side="bl" />
          </>
        }
      >
        <Phone id="st-app5">
          <StatusBar time="9:41" />
          <div className="a-title">
            <StoryIcon name="back" />
            {c.month9.screenTitle}
            <span className="a-cta">{c.month9.invite}</span>
          </div>
          <div className="a-body" id="st-acbody" />
        </Phone>
      </Chapter>

      {/* Year 1: the book */}
      <Chapter
        days={CHAPTER_DAYS.year1}
        tone="soft"
        flip
        hasPolaroid
        copy={c.year1}
        tryId="st-try6"
        yourTurn={yourTurn}
        art={
          <>
            <Scene src="ano1" alt={c.year1.sceneAlt}>
              <div className="fx" id="st-confetti" aria-hidden="true" />
            </Scene>
            <Polaroid src="passos" copy={c.year1.polaroid} side="br" />
          </>
        }
      >
        <Phone id="st-app6">
          <StatusBar time="9:41" />
          <BabyHeader name={m.babyName} age={c.year1.babyAge} avatar="av-1ano" />
          <div className="a-body">
            <Segmented items={c.year1.seg} />
            <div className="agechips" id="st-agechips" />
            <div id="st-bfeed" />
          </div>
          <TabBar app={app} active="book" />
        </Phone>
      </Chapter>

      <section className="chapter day" id="precos">
        <div className="wrap">
          <div style={{ textAlign: "center", maxWidth: 760, marginInline: "auto" }}>
            <div className="eyebrow">{pricing.eyebrow}</div>
            <h2 style={{ marginTop: 12 }}>{pricing.title}</h2>
            <p className="lead" style={{ margin: "18px auto 0" }}>
              {pricing.lead}
            </p>
          </div>
          <div className="plans">
            <div className="plan free">
              <img className="buppi" src={`${IMG}/buppi.webp`} alt="" {...BUPPI_SIZE} loading="lazy" />
              <div className="eyebrow">{pricing.freeEyebrow}</div>
              <h3 style={{ marginTop: 6 }}>{pricing.freeTitle}</h3>
              <ul>
                {pricing.freeItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="plan pro night">
              <div className="eyebrow" style={{ color: "var(--amber)" }}>
                {pricing.proEyebrow}
              </div>
              <h3 style={{ marginTop: 6 }}>{pricing.proTitle}</h3>
              <ul>
                {pricing.proItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="fine">{pricing.proFine}</p>
            </div>
          </div>
        </div>
      </section>

      <StoryRuntime messages={rt} locale={locale} weeks={weeks} />
    </div>
  );
}

/** The closing reel of moments and the download call. Keeps the #baixar anchor blog CTAs link to. */
export function StoryClosing({ locale }: { locale: Locale }) {
  const { closing } = getMessages(locale).story;
  return (
    <div className={STORY_CLASS}>
      <section className="chapter day final" id="baixar">
        <div className="wrap">
          <div className="eyebrow">{closing.eyebrow}</div>
          <h2 style={{ marginTop: 12 }}>{closing.title}</h2>
        </div>
        <div className="reel" aria-label={closing.reelAria}>
          <div className="reel-track" id="st-reel" />
        </div>
        <div className="wrap">
          <p className="lead" style={{ margin: "0 auto" }}>
            {closing.lead}
          </p>
          <div className="ctas">
            <StoreButtons size="lg" locale={locale} />
          </div>
          <div className="notes" style={{ justifyContent: "center" }}>
            {closing.notes.map((note) => (
              <span key={note}>✓ {note}</span>
            ))}
          </div>
          <p className="disclaimer">{closing.disclaimer}</p>
        </div>
      </section>
    </div>
  );
}
