import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { BUPPI_SIZE, HeroTitle, IMG, STORY_CLASS } from "@/components/story/Story";
import { localePath, type Locale } from "@/i18n";
import { CREATORS_PATH, getCreatorsMessages } from "@/i18n/creators";
import { CreatorForm } from "./CreatorForm";

/** Anchors the two hero buttons jump to. */
const FORM_ANCHOR = "inscricao";
const STEPS_ANCHOR = "como-funciona";

/** Landing scenes reused here, all 3:2 like the files in /landing. */
const SCENE_SIZE = { width: 1200, height: 800 };
const HERO_SCENE = "mes6";
const HERO_POLAROID = "sentou";
const FORM_POLAROID = "banho";
const WHO_SCENES = ["mes6", "pediatra", "mes9"] as const;
/** Faces cropped out of three scenes for the "whole family" illustration. */
const FAMILY_AVATARS = [
  { scene: "banho", position: "32% 30%" },
  { scene: "pediatra", position: "22% 30%" },
  { scene: "mes9", position: "80% 40%" },
] as const;

function Buppi({ className }: { className: string }) {
  return <img className={className} src={`${IMG}/buppi.webp`} alt="" {...BUPPI_SIZE} loading="lazy" />;
}

/** A photo on white paper, held by a strip of tape, with a handwritten caption. */
function TapedPhoto({
  scene,
  alt,
  caption,
  className = "",
}: {
  scene: string;
  alt: string;
  caption: string;
  className?: string;
}) {
  return (
    <figure className={`cr-photo ${className}`}>
      <span className="cr-tape" aria-hidden="true" />
      <img src={`${IMG}/${scene}.webp`} alt={alt} {...SCENE_SIZE} loading="lazy" />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

function SectionHead({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="more-head">
      <div className="eyebrow">{eyebrow}</div>
      <h2 style={{ marginTop: 12 }}>{title}</h2>
    </div>
  );
}

/** The page creators land on: who the partnership is for, how it works and the form to apply. */
export function CreatorsLanding({ locale }: { locale: Locale }) {
  const m = getCreatorsMessages(locale);
  const { visuals } = m.why;

  const whyVisuals: ReactNode[] = [
    <div className="cr-visual free" key="free">
      <b>{visuals.free}</b>
      <i>{visuals.forever}</i>
    </div>,
    <div className="cr-visual line" key="line">
      <div className="cr-track" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="cr-track-labels">
        {visuals.timeline.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </div>,
    <div className="cr-visual family" key="family">
      {FAMILY_AVATARS.map((avatar) => (
        <img
          key={avatar.scene}
          src={`${IMG}/${avatar.scene}.webp`}
          alt=""
          width={62}
          height={62}
          loading="lazy"
          style={{ objectPosition: avatar.position }}
        />
      ))}
      <span>{visuals.unlimited}</span>
    </div>,
  ];

  return (
    <>
      <Nav locale={locale} />
      <main>
        <div className={STORY_CLASS}>
          <header className="hero campaign cr-hero">
            <span className="cr-blob a" aria-hidden="true" />
            <span className="cr-blob b" aria-hidden="true" />
            <div className="wrap hero-grid">
              <div>
                <div className="eyebrow cr-pill">{m.hero.eyebrow}</div>
                <HeroTitle before={m.hero.titleBefore} highlight={m.hero.titleHighlight} after={m.hero.titleAfter} />
                <p className="lead" style={{ marginTop: 28 }}>
                  {m.hero.lead}
                </p>
                <div className="ctas">
                  <a className="cr-btn" href={`#${FORM_ANCHOR}`}>
                    {m.hero.apply}
                  </a>
                  <a className="cr-btn ghost" href={`#${STEPS_ANCHOR}`}>
                    {m.hero.how}
                  </a>
                </div>
                <div className="cr-say">
                  <Buppi className="cr-say-buppi" />
                  <p>
                    {m.hero.noteBefore}
                    <b>{m.hero.noteStrong}</b>
                    {m.hero.noteAfter}
                  </p>
                </div>
              </div>

              <div className="cr-stage">
                <div className="cr-frame">
                  <img
                    src={`${IMG}/${HERO_SCENE}.webp`}
                    alt={m.hero.imageAlt}
                    {...SCENE_SIZE}
                    loading="eager"
                    fetchPriority="high"
                  />
                </div>
                <div className="cr-chip">
                  <span aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="#ffffff">
                      <path d="M8 5.5v13l11-6.5z" />
                    </svg>
                  </span>
                  <p>
                    {m.hero.chipTitle}
                    <small>{m.hero.chipSub}</small>
                  </p>
                </div>
                <figure className="cr-photo cr-stage-photo">
                  <img src={`${IMG}/${HERO_POLAROID}.webp`} alt={m.hero.polaroidAlt} {...SCENE_SIZE} loading="eager" />
                  <figcaption>{m.hero.polaroidCaption}</figcaption>
                </figure>
                <p className="cr-hand">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 80 46"
                    width="70"
                    height="40"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M74 42 C 60 44, 30 34, 14 8" />
                    <path d="M10 22 L 13 6 L 28 12" />
                  </svg>
                  {m.hero.handNote}
                </p>
              </div>
            </div>
          </header>

          <section className="chapter soft">
            <div className="wrap">
              <SectionHead eyebrow={m.who.eyebrow} title={m.who.title} />
              <div className="cr-grid3 cr-who">
                {m.who.items.map((item, i) => (
                  <div key={item.title}>
                    <TapedPhoto scene={WHO_SCENES[i]} alt={m.who.photos[i].alt} caption={m.who.photos[i].caption} />
                    <h3>{item.title}</h3>
                    <p>{item.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="chapter night cr-night">
            <span className="cr-star" aria-hidden="true" />
            <span className="cr-star" aria-hidden="true" />
            <span className="cr-star" aria-hidden="true" />
            <span className="cr-star" aria-hidden="true" />
            <span className="cr-star" aria-hidden="true" />
            <svg className="cr-moon" aria-hidden="true" viewBox="0 0 24 24" width="54" height="54" fill="#ffd98a">
              <path d="M19 14.5A8 8 0 0 1 9.5 5a8 8 0 1 0 9.5 9.5z" />
            </svg>
            <div className="wrap">
              <div className="cr-head-left">
                <div className="eyebrow">{m.why.eyebrow}</div>
                <h2 style={{ marginTop: 12 }}>{m.why.title}</h2>
              </div>
              <div className="cr-grid3 cr-why">
                {m.why.items.map((item, i) => (
                  <div className="cr-card" key={item.title}>
                    {whyVisuals[i]}
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="chapter day" id={STEPS_ANCHOR}>
            <div className="wrap">
              <SectionHead eyebrow={m.steps.eyebrow} title={m.steps.title} />
              <div className="cr-path-wrap">
                <svg
                  className="cr-path"
                  aria-hidden="true"
                  viewBox="0 0 1000 120"
                  preserveAspectRatio="none"
                  fill="none"
                  stroke="var(--primary)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="2 13"
                >
                  <path d="M0 60 C 160 -20, 330 140, 500 60 S 840 -20, 1000 60" vectorEffect="non-scaling-stroke" />
                </svg>
                <ol className="cr-grid3 cr-steps">
                  {m.steps.items.map((item, i) => (
                    <li key={item.title}>
                      <div className="cr-num">
                        {i + 1}
                        {i === m.steps.items.length - 1 ? <Buppi className="cr-num-buppi" /> : null}
                      </div>
                      <h3>{item.title}</h3>
                      <p>{item.sub}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </section>

          <section className="chapter soft cr-apply" id={FORM_ANCHOR}>
            <span className="cr-blob c" aria-hidden="true" />
            <div className="wrap cr-apply-grid">
              <div>
                <div className="eyebrow">{m.form.eyebrow}</div>
                <h2 style={{ marginTop: 12 }}>{m.form.title}</h2>
                <p className="lead" style={{ marginTop: 18 }}>
                  {m.form.lead}
                </p>
                <TapedPhoto
                  className="cr-apply-photo"
                  scene={FORM_POLAROID}
                  alt={m.form.photoAlt}
                  caption={m.form.photoCaption}
                />
              </div>
              <div className="cr-form-wrap">
                <Buppi className="cr-form-buppi" />
                <CreatorForm copy={m.form} locale={locale} privacyHref={localePath(locale, "/privacy")} />
              </div>
            </div>
          </section>

          <section className="chapter day">
            <div className="wrap">
              <SectionHead eyebrow={m.faq.eyebrow} title={m.faq.title} />
              <div className="cr-faq">
                {m.faq.items.map((item) => (
                  <div className="cr-qa" key={item.q}>
                    <h3>{item.q}</h3>
                    <div>
                      <Buppi className="cr-qa-buppi" />
                      <p>{item.a}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer locale={locale} path={CREATORS_PATH} />
    </>
  );
}
