import type { MomentId, PregnancyWeek, Rich, StoryRuntimeMessages } from "@/i18n/storyTypes";
import { clock, contractionStats, fill, prenatalWindow, seedContractions, weekCard, type Contraction } from "./pregnancyFormat";
import {
  ACCESS_TOUR_PERSON,
  AGE_END_DAYS,
  AGE_START_DAYS,
  ALLERGENS,
  CONFETTI_COLORS,
  CONFETTI_COUNT,
  CONTRACTIONS,
  FULL_TERM_WEEKS,
  PREG_WEEK,
  PREGNANCY_DAYS,
  PRENATAL_DEMO,
  FOOD_ALLERGEN,
  FOOD_TOUR,
  MOMENT_GROUPS,
  MOMENT_LIKES,
  NAP,
  PEOPLE,
  ROLE_PERMS,
  WEEK,
  WEEK_INITIAL_DAY,
  WEEK_TOUR_DAYS,
} from "./storyData";

/**
 * Behaviour of the landing story: the age strip, the scene parallax and the
 * phone demos (three in pregnancy, six in the first year) with their guided tours.
 *
 * It drives the server-rendered markup of Story.tsx by element id instead of
 * living in React state. The tours measure real layout to place a ring on the
 * next tap target, so the logic is imperative either way, and keeping it out of
 * React keeps the whole story statically rendered for crawlers.
 *
 * Every listener, timer and observer is tied to the returned dispose function.
 */

const ID_PREFIX = "st-";
const DAYS_PER_WEEK = 7;
const SECONDS_PER_MINUTE = 60;
const MS_PER_SECOND = 1000;
/** The cover fades out before its source changes, so weeks never pop. */
const COVER_SWAP_MS = 140;
/** Contraction timer refresh while the button is held "on". */
const CONTRACTION_TICK_MS = 100;
const DAYS_PER_MONTH = 30.4;
const WEEKS_FROM_DAY = 14;
const MONTHS_FROM_DAY = 60;
const MINUTES_PER_HOUR = 60;
const HOURS_PER_DAY = 24;
const TICK_MS = 1000;
/** Layout settles in steps (sheet slide-in, fonts), so the ring is re-placed twice. */
const REPLACE_DELAYS_MS = [450, 900];
const REVEAL_DELAY_MS = 320;
const RING_PADDING = 5;
const TAG_HEIGHT = 44;
const VIEWPORT_EDGE = 24;
const FALLBACK_TOP = 70;
const PARALLAX_BASE = -6;
const PARALLAX_RANGE = 5;
/** Share of the viewport height below which a block counts as not yet seen. */
const REVEAL_FOLD = 0.9;

type TourStep = {
  el: () => Element | null | undefined;
  text: string;
  tag?: string;
  below?: boolean;
  dx?: number;
};
type Tour = {
  readonly step: number;
  go(n: number): void;
  done(n: number): void;
  finish(text?: string): void;
  place(): void;
};

const pad2 = (n: number) => String(n).padStart(2, "0");
const mmss = (s: number) => `${pad2(Math.floor(s / 60))}:${pad2(s % 60)}`;
const hhmm = (m: number) => `${pad2(Math.floor(m / MINUTES_PER_HOUR))}:${pad2(m % MINUTES_PER_HOUR)}`;
const esc = (s: string) =>
  s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c] ?? c);
const icon = (name: string) => `<svg><use href="#${ID_PREFIX}i-${name}"/></svg>`;
const rich = (r: Rich, values: Record<string, string> = {}) =>
  `<b>${esc(r.b)}</b> ${esc(fill(r.t, values))}`;

export function initStory(
  t: StoryRuntimeMessages,
  locale: string,
  weeks: Record<number, PregnancyWeek>,
): () => void {
  const abort = new AbortController();
  const { signal } = abort;
  const timers = new Set<ReturnType<typeof setTimeout>>();
  const disposers: Array<() => void> = [];
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const $ = <T extends HTMLElement = HTMLElement>(id: string) => {
    const el = document.getElementById(ID_PREFIX + id);
    if (!el) throw new Error(`Story element #${ID_PREFIX}${id} is missing`);
    return el as T;
  };
  /** A page renders only some chapters; each demo runs when its root element is there. */
  const when = (id: string, run: () => void) => {
    if (document.getElementById(ID_PREFIX + id)) run();
  };
  const on = <K extends keyof HTMLElementEventMap>(
    target: EventTarget,
    type: K | string,
    handler: (event: Event) => void,
    options: AddEventListenerOptions = {},
  ) => target.addEventListener(type, handler, { ...options, signal });
  const later = (fn: () => void, ms: number) => {
    const id = setTimeout(() => {
      timers.delete(id);
      fn();
    }, ms);
    timers.add(id);
  };

  /* ---- reveal on scroll ---- */
  const revealEls = document.querySelectorAll(".story .rv");
  if ("IntersectionObserver" in window && !reduce) {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("pre");
            io.unobserve(entry.target);
          }
        }),
      { threshold: 0.06 },
    );
    // Only what is still below the fold starts hidden, so nothing on screen flashes
    // and the page stays fully visible if this script never runs.
    revealEls.forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight * REVEAL_FOLD) return;
      el.classList.add("pre");
      io.observe(el);
    });
    disposers.push(() => io.disconnect());
  }

  /* ---- age strip + scene parallax ---- */
  const chapters = [...document.querySelectorAll<HTMLElement>(".story [data-days]")];
  const scenes = [...document.querySelectorAll<HTMLElement>(".story [data-px] img")];
  const formatAge = (raw: number) => {
    // Pregnancy is negative: day -280 is week 0 and day 0 is the birth.
    if (raw < 0) return fill(t.age.pregnancyWeek, { n: Math.max(1, Math.floor(FULL_TERM_WEEKS + raw / DAYS_PER_WEEK)) });
    if (raw < 1) return t.age.bornToday;
    const d = Math.round(raw);
    if (d >= AGE_END_DAYS) return t.age.year;
    if (d < WEEKS_FROM_DAY) return fill(d === 1 ? t.age.day : t.age.days, { n: d });
    if (d < MONTHS_FROM_DAY) return fill(t.age.weeks, { n: Math.round(d / DAYS_PER_WEEK) });
    const months = Math.floor(d / DAYS_PER_MONTH);
    return fill(months === 1 ? t.age.month : t.age.months, { n: months });
  };
  let ticking = false;
  const onScroll = () => {
    ticking = false;
    if (!chapters.length) return;
    const mid = window.scrollY + window.innerHeight * 0.5;
    const points = chapters.map((c) => {
      const top = c.getBoundingClientRect().top + window.scrollY;
      return { y: top + c.offsetHeight * 0.5, d: Number(c.dataset.days) };
    });
    const first = points[0];
    const last = points[points.length - 1];
    let days: number = AGE_START_DAYS;
    if (mid <= first.y) {
      days = AGE_START_DAYS + (first.d - AGE_START_DAYS) * Math.max(0, Math.min(1, mid / first.y));
    } else if (mid >= last.y) {
      days = AGE_END_DAYS;
    } else {
      for (let i = 0; i < points.length - 1; i++) {
        const a = points[i];
        const b = points[i + 1];
        if (mid >= a.y && mid < b.y) days = a.d + ((b.d - a.d) * (mid - a.y)) / (b.y - a.y);
      }
    }
    when("agelbl", () => {
      $("agelbl").textContent = days < 0 ? t.age.labelPregnancy : days < 1 ? t.age.labelBorn : t.age.labelBaby;
      $("ageval").textContent = formatAge(days);
      const progress = (days + PREGNANCY_DAYS) / (PREGNANCY_DAYS + AGE_END_DAYS);
      $("agefill").style.transform = `scaleX(${Math.min(1, Math.max(0, progress)).toFixed(4)})`;
    });
    if (reduce) return;
    for (const img of scenes) {
      const frame = img.parentElement;
      if (!frame) continue;
      const r = frame.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) continue;
      const offset = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight;
      img.style.translate = `0 ${(PARALLAX_BASE - offset * PARALLAX_RANGE).toFixed(2)}%`;
    }
  };
  on(
    window,
    "scroll",
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(onScroll);
    },
    { passive: true },
  );
  on(window, "resize", onScroll);
  onScroll();

  /* ---- guided tour: a ring on the next tap target, narrated in the bar above the phone ---- */
  function tour(appId: string, tryId: string, steps: TourStep[], initialDoneText: string): Tour {
    const app = $(appId);
    const bar = $(tryId);
    let doneText = initialDoneText;
    const mark = document.createElement("div");
    mark.className = "coach";
    mark.innerHTML = "<i></i><b></b>";
    app.appendChild(mark);
    disposers.push(() => mark.remove());
    const ring = mark.firstElementChild as HTMLElement;
    const tag = mark.lastElementChild as HTMLElement;
    let cur = 0;
    let finished = false;

    const target = () => {
      if (finished) return null;
      const el = steps[cur]?.el();
      return el instanceof HTMLElement && el.offsetParent ? el : null;
    };
    function place() {
      const step = steps[cur];
      const el = target();
      if (app.scrollTop) app.scrollTop = 0;
      if (!el) {
        mark.hidden = true;
        return;
      }
      const a = app.getBoundingClientRect();
      const r = el.getBoundingClientRect();
      const scroller = el.closest(".a-body");
      if (scroller) {
        const b = scroller.getBoundingClientRect();
        const centerY = r.top + r.height / 2;
        if (centerY < b.top || centerY > b.bottom) {
          mark.hidden = true;
          return;
        }
      }
      mark.hidden = false;
      const x = r.left - a.left - RING_PADDING;
      const y = r.top - a.top - RING_PADDING;
      const w = r.width + RING_PADDING * 2;
      const h = r.height + RING_PADDING * 2;
      const radius = Math.abs(w - h) < 12 ? "50%" : `${Math.min(20, h / 2)}px`;
      ring.style.cssText = `left:${x}px;top:${y}px;width:${w}px;height:${h}px;border-radius:${radius}`;
      tag.textContent = step.tag ?? t.tour.tapHere;
      const tagWidth = tag.offsetWidth;
      const above = !step.below && y > 40;
      const left = x + w / 2 - tagWidth / 2 + (step.dx ?? 0);
      tag.style.left = `${Math.max(8, Math.min(a.width - tagWidth - 8, left))}px`;
      tag.style.top = `${above ? y - 32 : y + h + 8}px`;
    }
    function render() {
      bar.classList.toggle("done", finished);
      bar.innerHTML = finished
        ? `<span class="try-k">${esc(t.tour.done)}</span><span class="try-t">${esc(doneText)}</span>`
        : `<span class="try-k">${esc(t.tour.yourTurn)}</span><span class="try-t">${esc(steps[cur].text)}</span>` +
          `<span class="try-n">${esc(fill(t.tour.stepOf, { a: cur + 1, b: steps.length }))}</span>`;
      place();
      REPLACE_DELAYS_MS.forEach((ms) => later(place, ms));
    }
    /* After a tap, bring the next target into view, below the sticky bar. */
    function reveal() {
      const el = target();
      if (!el) return;
      const r = el.getBoundingClientRect();
      const sticky = getComputedStyle(bar).position === "sticky";
      const top = (sticky ? Math.max(0, bar.getBoundingClientRect().bottom) : FALLBACK_TOP) + TAG_HEIGHT;
      const bottom = window.innerHeight - VIEWPORT_EDGE;
      const dy = r.top < top ? r.top - top : r.bottom > bottom ? Math.min(r.bottom - bottom, r.top - top) : 0;
      if (dy) window.scrollBy({ top: dy, behavior: reduce ? "auto" : "smooth" });
    }
    const advance = () => {
      render();
      later(reveal, REVEAL_DELAY_MS);
    };
    on(window, "resize", place);
    on(window, "load", place);
    app.querySelectorAll(".a-body").forEach((b) => on(b, "scroll", place, { passive: true }));
    if ("ResizeObserver" in window) {
      const ro = new ResizeObserver(place);
      ro.observe(app);
      disposers.push(() => ro.disconnect());
    }
    document.fonts?.ready.then(() => !signal.aborted && place());
    render();
    return {
      get step() {
        return finished ? -1 : cur;
      },
      go(n) {
        if (finished) return;
        cur = n;
        advance();
      },
      done(n) {
        if (finished || cur !== n) return;
        if (n + 1 >= steps.length) finished = true;
        else cur = n + 1;
        advance();
      },
      finish(text) {
        if (finished) return;
        if (text) doneText = text;
        finished = true;
        render();
      },
      place,
    };
  }

  /* ---- 7 · pregnancy week by week (numbers from the site's published index) ---- */
  when("app7", () => {
    const range = $<HTMLInputElement>("rng7");
    const sumBtn = $("wksumb");
    const qa = $("wkqa");
    let sawSummary = false;
    let crossed = false;
    const guide = tour(
      "app7",
      "try7",
      [
        { el: () => range, tag: t.pregWeek.tagDrag, below: true, text: t.pregWeek.steps[0] },
        { el: () => sumBtn, text: t.pregWeek.steps[1] },
      ],
      t.pregWeek.done,
    );
    const swap = (img: HTMLImageElement, src: string | null) => {
      if (!src || img.getAttribute("src") === src) return;
      img.classList.add("swap");
      img.onload = () => img.classList.remove("swap");
      later(() => {
        img.src = src;
      }, COVER_SWAP_MS);
    };
    const paint = () => {
      const week = Number(range.value);
      const w = weeks[week];
      const card = weekCard(locale, t, week, w);
      $("wktitle").textContent = card.title;
      $("rng7v").textContent = card.scrubValue;
      $("wkcur").hidden = week !== PREG_WEEK.current;
      $("wksize").textContent = card.size;
      $("wklen").textContent = card.length;
      $("wklenm").textContent = card.lengthMeasure;
      $("wkw").textContent = card.weight;
      $("wkwr").textContent = card.weightRange;
      $("wktodo").textContent = card.todo;
      $("wktodos").textContent = card.todoSub;
      qa.textContent = w.quickAnswer;
      const scene = $<HTMLImageElement>("covimg");
      swap($<HTMLImageElement>("wkcover"), w.cover);
      swap(scene, w.cover);
      scene.alt = card.coverAlt;
      if (week >= PREG_WEEK.crownHeelFrom && !crossed) {
        crossed = true;
        $("hint7").innerHTML = rich(t.pregWeek.guideSwitch);
        guide.done(0);
        if (sawSummary) guide.finish();
      }
      guide.place();
    };
    on(range, "input", paint);
    on(sumBtn, "click", () => {
      const open = qa.hidden;
      qa.hidden = !open;
      sumBtn.setAttribute("aria-expanded", String(open));
      sawSummary = true;
      if (crossed) guide.done(1);
      guide.place();
    });
  });

  /* ---- 8 · prenatal care at week 24 ---- */
  when("app8", () => {
    const p = t.prenatal;
    const app = $("app8");
    const groupsEl = $("pngroups");
    const state = new Map<number, "now" | "later" | "done">();
    (["now", "later", "done"] as const).forEach((g) => PRENATAL_DEMO[g].forEach((i) => state.set(i, g)));
    const doneAt = new Map<number, number>(PRENATAL_DEMO.done.map((i, k) => [i, PRENATAL_DEMO.doneWeeks[k]]));
    const recorded: number[] = [];
    let fresh: number | null = null;
    const [scan, tdap] = PRENATAL_DEMO.tour;
    const regButton = (item: number) => groupsEl.querySelector(`[data-reg="${item}"]`);
    const guide = tour(
      "app8",
      "try8",
      [
        { el: () => regButton(scan), text: p.steps[0] },
        { el: () => app.querySelector(".pn-save"), text: p.steps[1] },
        { el: () => regButton(tdap), text: p.steps[2] },
        { el: () => app.querySelector(".pn-save"), text: p.steps[3] },
      ],
      p.done,
    );
    const order = [...PRENATAL_DEMO.now, ...PRENATAL_DEMO.later, ...PRENATAL_DEMO.done];
    const sub = (item: number, group: string) => {
      if (group !== "done") return prenatalWindow(p, item);
      return recorded.includes(item) ? p.registeredToday : fill(p.doneAt, { n: doneAt.get(item) ?? 0 });
    };
    const paint = () => {
      let html = "";
      if (recorded.length) {
        const list = [...recorded].reverse().map((i) => `${p.items[i].replace(/ \(.*\)$/, "")} · ${p.today}`);
        html += `<div class="pn-tl">${esc(fill(p.alsoInTimeline, { list: list.join(" · ") }))}</div>`;
      }
      (["now", "later", "done"] as const).forEach((group, g) => {
        const items = order.filter((i) => state.get(i) === group);
        if (!items.length) return;
        // Freshly recorded items go on top of "done".
        if (group === "done") items.sort((a, b) => recorded.indexOf(b) - recorded.indexOf(a));
        html += `<div class="a-over">${esc(p.groups[g])}</div><div class="a-list">`;
        html += items
          .map((i) => {
            const end =
              group === "now"
                ? `<button class="reg" data-reg="${i}">${esc(p.register)}</button>`
                : group === "done"
                  ? `<span class="ok-c">${icon("check")}</span>`
                  : "";
            const cls = `a-li${group === "done" ? " done" : ""}${i === fresh ? " new" : ""}`;
            return `<div class="${cls}"><div><b>${esc(p.items[i])}</b><small>${esc(sub(i, group))}</small></div>${end}</div>`;
          })
          .join("");
        html += "</div>";
      });
      groupsEl.innerHTML = html;
      guide.place();
    };
    const closeSheet = () => app.querySelectorAll(".psheet,.scrim").forEach((e) => e.remove());
    const openSheet = (item: number) => {
      closeSheet();
      const fields = item === scan ? p.fields[0] : item === tdap ? p.fields[1] : [p.fields[0][0]];
      const scrim = document.createElement("div");
      scrim.className = "scrim";
      const sheet = document.createElement("div");
      sheet.className = "psheet";
      sheet.innerHTML =
        `<h4>${esc(p.items[item])}</h4>` +
        fields.map(([label, value]) => `<div class="pn-field"><span>${esc(label)}</span><span>${esc(value)}</span></div>`).join("") +
        `<button class="pn-save">${esc(p.save)}</button>`;
      app.append(scrim, sheet);
      on(scrim, "click", () => {
        closeSheet();
        if (guide.step === 1 || guide.step === 3) guide.go(guide.step - 1);
      });
      on(sheet.querySelector(".pn-save") as HTMLElement, "click", () => {
        state.set(item, "done");
        recorded.push(item);
        fresh = item;
        closeSheet();
        paint();
        if (item === scan) guide.done(1);
        else if (item === tdap) guide.done(3);
        if (state.get(scan) === "done" && state.get(tdap) === "done") guide.finish();
      });
      if (item === scan) guide.go(1);
      else if (item === tdap) guide.go(3);
      else guide.place();
    };
    on(groupsEl, "click", (event) => {
      const btn = (event.target as HTMLElement).closest<HTMLElement>("[data-reg]");
      if (btn) openSheet(Number(btn.dataset.reg));
    });
    paint();
  });

  /* ---- 9 · contractions against the 5-1-1 rule ---- */
  when("app9", () => {
    const c = t.contractions;
    const app = $("app9");
    const btn = $("ctbtn");
    const list: Contraction[] = seedContractions();
    let now: number = CONTRACTIONS.startAt;
    let running: { start: number; t0: number } | null = null;
    let interval: ReturnType<typeof setInterval> | null = null;
    let timed = 0;
    disposers.push(() => interval && clearInterval(interval));
    const guide = tour(
      "app9",
      "try9",
      [
        { el: () => btn, text: c.steps[0] },
        { el: () => btn, tag: c.tagStop, text: c.steps[1] },
        { el: () => btn, text: c.steps[2] },
        { el: () => btn, tag: c.tagStop, text: c.steps[3] },
      ],
      c.done,
    );
    const minutes = (n: number) => fill(c.minutes, { n });
    const paint = () => {
      const s = contractionStats(list, now);
      $("clk9").textContent = clock(now);
      $("ctline").textContent = fill(c.pattern, { gap: minutes(s.gapMinutes), s: s.seconds });
      $("ctpat").classList.toggle("reached", s.reached);
      const tag = $("cttag");
      tag.className = `tag ${s.reached ? "early" : "wait"}`;
      tag.textContent = s.reached ? c.reached : c.notYet;
      $("ctreach").hidden = !s.reached;
      $("ctlist").innerHTML = list
        .slice(-CONTRACTIONS.shown)
        .reverse()
        .map((con, i) => {
          const prev = list[list.indexOf(con) - 1];
          const gap = prev ? ` · ${fill(c.interval, { gap: minutes(Math.round((con.start - prev.start) / SECONDS_PER_MINUTE)) })}` : "";
          return (
            `<div class="a-row${con.mine && i === 0 ? " new" : ""}"><span class="a-ic" style="background:#ece6fb;color:#8f6fe3">${icon("heart")}</span>` +
            `<div><b>${clock(con.start)}</b><small>${esc(fill(c.lasted, { s: con.dur }))}${esc(gap)}</small></div></div>`
          );
        })
        .join("");
      guide.place();
      return s;
    };
    const elapsed = () => (running ? Math.round(((Date.now() - running.t0) / MS_PER_SECOND) * CONTRACTIONS.speed) : 0);
    on(btn, "click", () => {
      if (!running) {
        running = { start: now, t0: Date.now() };
        btn.classList.add("on");
        $("ctbig").textContent = mmss(0);
        $("ctsmall").textContent = c.stopHint;
        app.querySelector(".ct-skip")?.remove();
        interval = setInterval(() => {
          $("ctbig").textContent = mmss(elapsed());
        }, CONTRACTION_TICK_MS);
        guide.done(timed * 2);
        return;
      }
      if (interval) clearInterval(interval);
      const dur = Math.max(1, elapsed());
      list.push({ start: running.start, dur, mine: true });
      now = running.start + dur;
      running = null;
      timed++;
      btn.classList.remove("on");
      $("ctbig").textContent = c.start;
      $("ctsmall").textContent = c.startHint;
      const s = paint();
      if (timed < CONTRACTIONS.visitorCount) {
        guide.done(timed * 2 - 1);
        const skip = document.createElement("div");
        skip.className = "ct-skip";
        skip.textContent = c.skip;
        btn.after(skip);
        now = list[list.length - 1].start + CONTRACTIONS.gapSeconds;
        paint();
      } else {
        guide.finish(s.reached ? c.done : c.doneShort);
      }
    });
    paint();
  });

  /* ---- 1 · speed dial + nursing timer ---- */
  when("app1", () => {
    const fab = $("fab");
    const dial = $("dial");
    const timer = $("timer");
    const feed = $("feed1");
    const hint = $("hint1");
    const n = t.nursing;
    let left = 0;
    let right = 0;
    let side: "L" | "R" = "L";
    let interval: ReturnType<typeof setInterval> | null = null;
    disposers.push(() => interval && clearInterval(interval));

    const addRow = (bg: string, color: string, ic: string, title: string, sub: string) => {
      const row = document.createElement("div");
      row.className = "a-row new";
      row.innerHTML =
        `<span class="a-ic" style="background:${bg};color:${color}">${icon(ic)}</span>` +
        `<div><b>${esc(title)}</b><small>${esc(sub)}</small></div><time>${esc(t.now)}</time>`;
      feed.prepend(row);
    };
    const guide = tour(
      "app1",
      "try1",
      [
        { el: () => fab, text: n.steps[0] },
        { el: () => dial.querySelector('[data-k="nursing"]'), text: n.steps[1] },
        { el: () => timer.querySelector(".side:not(.on)"), tag: n.tagSwitch, text: n.steps[2] },
        { el: () => $("fin"), text: n.steps[3] },
      ],
      n.done,
    );
    const closeDial = () => {
      dial.hidden = true;
      fab.classList.remove("open");
    };
    const paint = () => {
      $("tL").textContent = mmss(left);
      $("tR").textContent = mmss(right);
      $("tbig").textContent = mmss(left + right);
      timer.querySelectorAll<HTMLElement>(".side").forEach((b) => {
        const active = b.dataset.s === side;
        b.classList.toggle("on", active);
        const hintEl = b.querySelector(".sh");
        if (hintEl) hintEl.textContent = active ? "" : n.tapToSwitch;
      });
    };
    on(fab, "click", () => {
      fab.classList.remove("nudge");
      if (!timer.hidden) return;
      dial.hidden = !dial.hidden;
      fab.classList.toggle("open", !dial.hidden);
      if (guide.step < 2) guide.go(dial.hidden ? 0 : 1);
    });
    const quickRows: Record<string, [string, string, string]> = {
      bottle: ["#e3effb", "#4f8fd0", "cup"],
      diaper: ["#efe3f8", "#9a6fc9", "spark"],
      sleep: ["#d9f2ed", "#2f9e88", "cloud"],
      pump: ["#fde3ea", "#d9698a", "drop"],
    };
    dial.querySelectorAll<HTMLElement>("button").forEach((b) =>
      on(b, "click", () => {
        const kind = b.dataset.k ?? "";
        closeDial();
        if (kind === "nursing") {
          left = 0;
          right = 0;
          side = "L";
          paint();
          timer.hidden = false;
          if (interval) clearInterval(interval);
          interval = setInterval(() => {
            if (side === "L") left++;
            else right++;
            paint();
          }, TICK_MS);
          hint.innerHTML = rich(n.hintTimer);
          guide.go(2);
          return;
        }
        const row = quickRows[kind];
        const copy = n.quick[kind as keyof typeof n.quick];
        if (row && copy) addRow(row[0], row[1], row[2], copy.title, copy.sub);
        hint.innerHTML = rich(n.hintQuick);
        guide.finish(n.doneQuick);
      }),
    );
    timer.querySelectorAll<HTMLElement>(".side").forEach((b) =>
      on(b, "click", () => {
        side = b.dataset.s === "R" ? "R" : "L";
        paint();
        guide.done(2);
        guide.place();
      }),
    );
    on($("fin"), "click", () => {
      if (interval) clearInterval(interval);
      timer.hidden = true;
      const parts: string[] = [];
      if (left) parts.push(`${n.left} ${mmss(left)}`);
      if (right) parts.push(`${n.right} ${mmss(right)}`);
      addRow("#fdf0cf", "#c98200", "heart", n.title, parts.join(" · ") || n.lessThanASecond);
      hint.innerHTML = rich(n.hintSaved, { side: side === "L" ? n.sideLower.R : n.sideLower.L });
      guide.finish();
    });
  });

  /* ---- 2 · nap prediction card ---- */
  when("app2", () => {
    const n = t.nap;
    const range = $<HTMLInputElement>("rng2");
    const whyButton = $("whyb");
    const whyBox = $("whybox");
    let sawWhy = false;
    const guide = tour(
      "app2",
      "try2",
      [
        { el: () => range, tag: n.tagDrag, below: true, text: n.steps[0] },
        { el: () => whyButton, text: n.steps[1] },
      ],
      n.done,
    );
    const paint = () => {
      const now = Number(range.value);
      const minutesLeft = NAP.predictedAt - now;
      const awake = now - NAP.wokeAt;
      const awakeText = `${Math.floor(awake / MINUTES_PER_HOUR)}h${pad2(awake % MINUTES_PER_HOUR)}`;
      const head = $("predh");
      const bar = $("wwf");
      const tagEl = $("tag2");
      $("rngv").textContent = hhmm(now);
      $("clk2").textContent = hhmm(now);
      $("nowl").style.left = `${(((now - NAP.axisStart) / NAP.axisSpan) * 100).toFixed(1)}%`;
      bar.style.width = `${Math.min(100, (awake / NAP.wakeWindow) * 100)}%`;
      if (minutesLeft > 0) {
        head.classList.remove("now");
        $("predt").textContent = n.upcoming;
        $("predc").textContent = fill(n.minutes, { n: minutesLeft });
        $("predx").textContent = fill(n.awakeWindow, { t: awakeText });
        bar.style.background = "";
        tagEl.className = "tag wait";
        tagEl.textContent = n.tagWaiting;
      } else {
        const late = -minutesLeft > NAP.lateAfter;
        head.classList.add("now");
        $("predt").textContent = n.due;
        $("predc").textContent = minutesLeft === 0 ? t.now : `+${fill(n.minutes, { n: -minutesLeft })}`;
        $("predx").textContent = fill(late ? n.awakeLate : n.awakeSigns, { t: awakeText });
        bar.style.background = "#e6a52e";
        tagEl.className = "tag early";
        tagEl.textContent = late ? fill(n.tagLate, { n: -minutesLeft }) : n.tagInWindow;
        guide.done(0);
        if (sawWhy) guide.finish();
      }
      guide.place();
    };
    on(range, "input", paint);
    on(whyButton, "click", () => {
      whyBox.hidden = !whyBox.hidden;
      whyButton.textContent = whyBox.hidden ? n.why : n.whyClose;
      sawWhy = true;
      guide.done(1);
      guide.place();
    });
    paint();
  });

  /* ---- 3 · the week's routine ---- */
  when("app3", () => {
    const w = t.week;
    const week = $("week");
    const detail = $("wdetail");
    const pct = (hours: number) => `${((hours / HOURS_PER_DAY) * 100).toFixed(2)}%`;
    const axis = ["00:00", "06:00", "12:00", "18:00", "24:00"]
      .map((label, i) => `<span style="top:${i * 25}%">${label}</span>`)
      .join("");
    let html = `<div class="yax" style="margin-top:29px;height:210px">${axis}</div>`;
    WEEK.forEach((day, i) => {
      const label = w.days[i];
      const naps = day.naps
        .map(([start, end]) => `<i class="nap" style="top:${pct(start)};height:${pct(end - start)}"></i>`)
        .join("");
      const wakings = day.wakings.map((h) => `<u style="top:${pct(h)}"></u>`).join("");
      html +=
        `<button class="wcol" aria-pressed="${i === WEEK_INITIAL_DAY}" data-i="${i}">` +
        `<span class="wd">${esc(label.d)}<small>${esc(label.n)}</small></span><span class="wb">` +
        `<i style="top:0;height:${pct(day.wakeUp)}"></i>${naps}` +
        `<i style="top:${pct(day.bedtime)};bottom:0"></i>${wakings}</span></button>`;
    });
    week.innerHTML = html;
    detail.textContent = w.notes[WEEK_INITIAL_DAY];
    const column = (i: number) => week.querySelector(`.wcol[data-i="${i}"]`);
    const guide = tour(
      "app3",
      "try3",
      [
        { el: () => column(WEEK_TOUR_DAYS[0]), dx: 46, text: w.steps[0] },
        { el: () => column(WEEK_TOUR_DAYS[1]), text: w.steps[1] },
      ],
      w.done,
    );
    const columns = week.querySelectorAll<HTMLElement>(".wcol");
    columns.forEach((b) =>
      on(b, "click", () => {
        const i = Number(b.dataset.i);
        const tourStep = (WEEK_TOUR_DAYS as readonly number[]).indexOf(i);
        if (tourStep >= 0) guide.done(tourStep);
        columns.forEach((x) => x.setAttribute("aria-pressed", "false"));
        b.setAttribute("aria-pressed", "true");
        detail.textContent = w.notes[i];
      }),
    );
  });

  /* ---- 4 · allergens derived from meals ---- */
  when("app4", () => {
    const a = t.allergens;
    const body = $("albody");
    const foods = $("foods");
    const items = ALLERGENS.map((item, i) => ({ ...item, name: a.names[i] }));
    let fresh = -1;
    const paint = () => {
      const by = (state: string) => items.map((item, i) => ({ item, i })).filter((x) => x.item.state === state);
      const exposureText = (count: number, i: number) =>
        fill(count === 1 ? a.exposure : a.exposures, { n: count }) + (i === fresh ? a.lastNow : "");
      const exposed = by("exposed");
      const notOffered = by("notOffered");
      let html = `<p class="a-hint">${esc(a.hint)}</p>`;
      html +=
        `<div class="a-over">${esc(a.groupWatching)}</div><div class="a-list">` +
        by("watching")
          .map(
            ({ item }) =>
              `<div class="a-li"><div><b>${esc(item.name)}</b><small>${esc(a.eggNote)}</small></div>` +
              `<span class="end warn">${esc(a.watch)}</span></div>`,
          )
          .join("") +
        "</div>";
      html +=
        `<div class="a-over">${esc(fill(a.groupExposed, { n: exposed.length }))}</div><div class="a-list">` +
        exposed
          .map(
            ({ item, i }) =>
              `<div class="a-li${i === fresh ? " new" : ""}"><div><b>${esc(item.name)}</b>` +
              `<small>${esc(exposureText(item.exposures, i))}</small></div><span class="end">${icon("check")}</span></div>`,
          )
          .join("") +
        "</div>";
      if (notOffered.length) {
        html +=
          `<div class="a-over">${esc(fill(a.groupNotOffered, { n: notOffered.length }))}</div><div class="a-list compact">` +
          notOffered.map(({ item }) => `<div class="a-li"><div><b>${esc(item.name)}</b></div></div>`).join("") +
          "</div>";
      }
      html += `<p class="a-hint" style="margin-top:12px;text-align:center">${esc(a.footer)}</p>`;
      body.innerHTML = html;
      if (fresh >= 0 && getComputedStyle(body).overflowY !== "visible") {
        body.querySelector(".new")?.scrollIntoView({ block: "nearest", behavior: reduce ? "auto" : "smooth" });
      }
    };
    foods.innerHTML = a.foods.map((food, i) => `<button data-f="${i}">+ ${esc(food)}</button>`).join("");
    paint();
    const chip = (i: number) => foods.querySelector(`[data-f="${i}"]`);
    const guide = tour(
      "app4",
      "try4",
      [
        { el: () => chip(FOOD_TOUR[0]), below: true, text: a.steps[0] },
        { el: () => chip(FOOD_TOUR[1]), below: true, text: a.steps[1] },
      ],
      a.done,
    );
    foods.querySelectorAll<HTMLElement>("button").forEach((b) =>
      on(b, "click", () => {
        const index = FOOD_ALLERGEN[Number(b.dataset.f)];
        const item = items[index];
        if (item.state === "notOffered") {
          item.state = "exposed";
          item.exposures = 1;
        } else {
          item.exposures++;
        }
        fresh = index;
        paint();
        guide.done(guide.step);
        guide.place();
      }),
    );
  });

  /* ---- 5 · access: one role per person ---- */
  when("app5", () => {
    const a = t.access;
    const body = $("acbody");
    const app = $("app5");
    const people = PEOPLE.map((p, i) => ({ ...p, ...a.people[i], moved: false }));
    type Person = (typeof people)[number];
    let guide: Tour | null = null;

    const pill = (text: string) => `<span class="pill">${esc(text)}</span>`;
    function close() {
      app.querySelectorAll(".psheet,.scrim").forEach((el) => el.remove());
      if (!guide) return;
      if (guide.step === 2) guide.finish();
      else if (guide.step === 1) guide.go(0);
    }
    function open(person: Person) {
      close();
      const scrim = document.createElement("div");
      scrim.className = "scrim";
      on(scrim, "click", close);
      const sheet = document.createElement("div");
      sheet.className = "psheet";
      const perms = () =>
        a.perms
          .map((label, i) => {
            const allowed = ROLE_PERMS[i][person.role];
            return (
              `<div class="pperm${allowed ? "" : " off"}"><i class="${allowed ? "y" : "n"}">${allowed ? "✓" : "–"}</i>` +
              `${esc(label)}</div>`
            );
          })
          .join("");
      const roles = person.owner
        ? ""
        : `<div class="a-seg" style="background:#f4f1ea">` +
          a.roles
            .map((label, i) => `<button data-r="${i}"${i === person.role ? ' class="on"' : ""}>${esc(label)}</button>`)
            .join("") +
          "</div>";
      sheet.innerHTML =
        `<button class="x" aria-label="${esc(a.closeAria)}">${icon("x")}</button>` +
        `<h4>${esc(person.name)}${pill(person.rel)}</h4>` +
        `<p class="a-hint" style="margin:4px 0 12px">${esc(person.owner ? a.ownerHint : fill(a.roleHint, { name: person.name }))}</p>` +
        `${roles}<div class="pp">${perms()}</div>`;
      app.append(scrim, sheet);
      if (!person.owner) guide?.go(1);
      const closeButton = sheet.querySelector(".x");
      if (closeButton) on(closeButton, "click", close);
      const roleButtons = sheet.querySelectorAll<HTMLElement>("[data-r]");
      roleButtons.forEach((b) =>
        on(b, "click", () => {
          person.role = Number(b.dataset.r) as 0 | 1 | 2;
          person.moved = true;
          roleButtons.forEach((x) => x.classList.toggle("on", x === b));
          const list = sheet.querySelector(".pp");
          if (list) list.innerHTML = perms();
          paint();
          guide?.go(2);
        }),
      );
    }
    function paint() {
      let html = `<div class="a-banner">${icon("spark")}<span>${esc(a.banner)}</span></div>`;
      a.groups.forEach((group, role) => {
        const members = people.map((p, i) => ({ p, i })).filter((x) => x.p.role === role);
        if (!members.length) return;
        html +=
          `<div class="a-over">${esc(group.title)}</div><p class="a-hint" style="margin-bottom:8px">${esc(group.hint)}</p>` +
          `<div class="a-list">` +
          members
            .map(
              ({ p, i }) =>
                `<button class="a-li${p.moved ? " new" : ""}" data-p="${i}"><span class="a-pav">${esc(p.name[0])}</span>` +
                `<div><b>${esc(p.name)}${pill(p.rel)}</b><small>${esc(p.sub)}</small></div>` +
                `<span class="end go">${icon("chev")}</span></button>`,
            )
            .join("") +
          "</div>";
      });
      html +=
        `<div class="a-list" style="margin-top:14px"><div class="a-li">${icon("share")}<div><b>${esc(a.publicLink.title)}</b>` +
        `<small>${esc(a.publicLink.sub)}</small></div><span class="end go">${icon("chev")}</span></div></div>`;
      body.innerHTML = html;
      people.forEach((p) => (p.moved = false));
      body
        .querySelectorAll<HTMLElement>("button.a-li")
        .forEach((b) => on(b, "click", () => open(people[Number(b.dataset.p)])));
    }
    disposers.push(() => app.querySelectorAll(".psheet,.scrim").forEach((el) => el.remove()));
    paint();
    guide = tour(
      "app5",
      "try5",
      [
        { el: () => body.querySelector(`[data-p="${ACCESS_TOUR_PERSON}"]`), text: a.steps[0] },
        {
          el: () =>
            app.querySelector('.psheet [data-r="1"]:not(.on)') ?? app.querySelector(".psheet [data-r]:not(.on)"),
          text: a.steps[1],
        },
        { el: () => app.querySelector(".psheet .x"), tag: a.tagClose, text: a.steps[2] },
      ],
      a.done,
    );
  });

  /* ---- 6 · the book, by age ---- */
  when("app6", () => {
    const b = t.book;
    const chips = $("agechips");
    const feed = $("bfeed");
    const liked = new Set<MomentId>();
    let guide: Tour | null = null;
    const card = (id: MomentId, group: string) => {
      const m = b.moments[id];
      const likes = MOMENT_LIKES[id] + (liked.has(id) ? 1 : 0);
      return (
        `<div class="bcard new"><div class="bmeta"><span class="m">${esc(b.milestone)}</span>` +
        `<span>${esc(group.toLowerCase())}</span><span class="imp">${esc(b.inPrint)}</span></div>` +
        `<img src="/landing/${id}.webp" alt="${esc(m.title)}" loading="lazy" width="1200" height="800">` +
        `<h5>${esc(m.title)}</h5><p>${esc(m.text)}</p><div class="bfoot">` +
        `<button class="like" aria-pressed="${liked.has(id)}" data-m="${id}" aria-label="${esc(b.likeAria)}">` +
        `${icon("heart")}<span>${likes}</span></button><span class="a-pav">${esc(m.comment[0])}</span>` +
        `<span>${esc(m.comment)}</span></div></div>`
      );
    };
    const showGroup = (index: number) => {
      feed.innerHTML = MOMENT_GROUPS[index].map((id) => card(id, b.groups[index])).join("");
      feed.querySelectorAll<HTMLElement>(".like").forEach((button) =>
        on(button, "click", () => {
          const id = button.dataset.m as MomentId;
          if (liked.has(id)) liked.delete(id);
          else liked.add(id);
          button.setAttribute("aria-pressed", String(liked.has(id)));
          const counter = button.querySelector("span");
          if (counter) counter.textContent = String(MOMENT_LIKES[id] + (liked.has(id) ? 1 : 0));
          guide?.done(1);
        }),
      );
    };
    chips.innerHTML = b.groups
      .map((label, i) => `<button aria-pressed="${i === 0}" data-g="${i}">${esc(label)}</button>`)
      .join("");
    const chipButtons = chips.querySelectorAll<HTMLElement>("button");
    chipButtons.forEach((button) =>
      on(button, "click", () => {
        chipButtons.forEach((x) => x.setAttribute("aria-pressed", "false"));
        button.setAttribute("aria-pressed", "true");
        showGroup(Number(button.dataset.g));
        feed.closest(".a-body")?.scrollTo({ top: 0 });
        feed.scrollTo({ left: 0 });
        guide?.done(0);
        guide?.place();
      }),
    );
    showGroup(0);
    guide = tour(
      "app6",
      "try6",
      [
        { el: () => chips.children[1], text: b.steps[0] },
        { el: () => feed.querySelector(".like"), tag: b.tagLike, below: true, text: b.steps[1] },
      ],
      b.done,
    );
  });

  /* ---- closing reel: every moment, oldest first, duplicated for a seamless loop ---- */
  when("reel", () => {
    const ids = MOMENT_GROUPS.flat().reverse();
    const once = ids
      .map((id) => {
        const m = t.book.moments[id];
        return (
          `<figure><img src="/landing/${id}.webp" alt="${esc(m.title)}" loading="lazy" width="1200" height="800">` +
          `<figcaption>${esc(m.cap)}</figcaption></figure>`
        );
      })
      .join("");
    $("reel").innerHTML = once + once;
  });

  /* ---- birthday confetti ---- */
  when("confetti", () => {
    const box = $("confetti");
    box.innerHTML = "";
    if (reduce) return;
    for (let i = 0; i < CONFETTI_COUNT; i++) {
      const piece = document.createElement("span");
      piece.className = "confetti";
      piece.style.left = `${4 + i * 6}%`;
      piece.style.background = CONFETTI_COLORS[i % CONFETTI_COLORS.length];
      piece.style.animationDelay = `${((i * 0.37) % 4.5).toFixed(2)}s`;
      piece.style.animationDuration = `${3.6 + (i % 5) * 0.5}s`;
      box.appendChild(piece);
    }
  });

  return () => {
    abort.abort();
    timers.forEach(clearTimeout);
    disposers.forEach((dispose) => dispose());
  };
}
