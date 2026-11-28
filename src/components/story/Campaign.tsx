import { Fragment } from "react";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { SiteJsonLd } from "@/components/SiteJsonLd";
import { StoreButtons } from "@/components/StoreButtons";
import { getMessages, localePath, type Locale } from "@/i18n";
import { CAMPAIGN_PATHS, getCampaignMessages } from "@/i18n/campaigns";
import { MORE_KEYS, type CampaignKey, type MoreKey } from "@/i18n/campaignTypes";
import {
  HeroTitle,
  Scene,
  STORY_CLASS,
  StoryClosing,
  storyChapters,
  type StoryChapterKey,
} from "./Story";
import { StoryIcon, StoryIconSprite, type StoryIconName } from "./StoryIcons";
import { StoryRuntime } from "./StoryRuntime";

type CampaignLayout = {
  /** Scene illustration of the hero, from public/landing. */
  scene: string;
  /** Icon and colour of the two cards floating over the hero scene. */
  toasts: [[StoryIconName, string], [StoryIconName, string]];
  /** The demos of the home page that belong to this subject, in order. */
  chapters: StoryChapterKey[];
  /** Subjects the page already covers, left out of the closing grid. */
  covered: MoreKey[];
  privacy?: boolean;
};

const LAYOUT: Record<CampaignKey, CampaignLayout> = {
  pregnancy: {
    scene: "gest24",
    toasts: [
      ["heart", "#f29bb0"],
      ["check", "#8f6fe3"],
    ],
    chapters: ["preg12", "preg24", "preg38", "born"],
    covered: ["pregnancy"],
  },
  sleep: {
    scene: "colo",
    toasts: [
      ["cloud", "#6fcabd"],
      ["moon", "#8f6fe3"],
    ],
    chapters: ["month2", "month4", "week1"],
    covered: ["sleep", "logging"],
  },
  memories: {
    scene: "hero",
    toasts: [
      ["book", "#e6b93c"],
      ["heart", "#f29bb0"],
    ],
    chapters: ["year1", "month9"],
    covered: ["book", "family"],
    privacy: true,
  },
};

const MORE_ICONS: Record<MoreKey, StoryIconName> = {
  pregnancy: "heart",
  logging: "plus",
  sleep: "moon",
  food: "fork",
  health: "check",
  family: "share",
  book: "book",
  guides: "spark",
};

/** The id of the closing block with the store buttons (StoryClosing). */
const DOWNLOAD_ANCHOR = "baixar";

const PRIVACY_ICONS: StoryIconName[] = ["share", "book", "check"];

/**
 * A landing page for one campaign: the subject of the ad up front, with the
 * same demos the home page uses, then the rest of the app in short.
 */
export function CampaignLanding({ locale, campaign }: { locale: Locale; campaign: CampaignKey }) {
  const story = getMessages(locale).story;
  const messages = getCampaignMessages(locale);
  const copy = messages.pages[campaign];
  const layout = LAYOUT[campaign];
  const { chapters, weeks } = storyChapters(locale);
  const more = MORE_KEYS.filter((key) => !layout.covered.includes(key));

  return (
    <>
      <SiteJsonLd locale={locale} />
      <Nav locale={locale} downloadHref={`#${DOWNLOAD_ANCHOR}`} />
      <main>
        <div className={STORY_CLASS}>
          <StoryIconSprite />

          <header className="hero campaign">
            <div className="wrap hero-grid">
              <div>
                <div className="eyebrow">{copy.eyebrow}</div>
                <HeroTitle before={copy.titleBefore} highlight={copy.titleHighlight} after={copy.titleAfter} />
                <p className="lead" style={{ marginTop: 26 }}>
                  {copy.lead}
                </p>
                <div className="ctas">
                  <StoreButtons size="lg" locale={locale} />
                </div>
                <div className="notes">
                  {story.hero.notes.map((note) => (
                    <span key={note}>✓ {note}</span>
                  ))}
                </div>
              </div>
              <div className="scenewrap">
                <Scene src={layout.scene} alt={copy.imageAlt} eager />
                {copy.toasts.map((toast, i) => (
                  <div key={toast.title} className={`toast t${i + 1}`}>
                    <span className="dot" style={{ background: layout.toasts[i][1] }}>
                      <StoryIcon name={layout.toasts[i][0]} />
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

          {layout.chapters.map((key) => (
            <Fragment key={key}>{chapters[key]}</Fragment>
          ))}

          {layout.privacy ? (
            <section className="chapter night">
              <div className="wrap">
                <div className="more-head">
                  <div className="eyebrow">{messages.privacy.eyebrow}</div>
                  <h2 style={{ marginTop: 12 }}>{messages.privacy.title}</h2>
                </div>
                <div className="more-grid">
                  {messages.privacy.items.map((item, i) => (
                    <div className="more-card tall rv" key={item.title}>
                      <span className="dot">
                        <StoryIcon name={PRIVACY_ICONS[i]} />
                      </span>
                      <div>
                        <b>{item.title}</b>
                        <span>{item.sub}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ) : null}

          <section className="chapter soft">
            <div className="wrap">
              <div className="more-head">
                <div className="eyebrow">{messages.more.eyebrow}</div>
                <h2 style={{ marginTop: 12 }}>{messages.more.title}</h2>
                <p className="lead" style={{ margin: "18px auto 0" }}>
                  {messages.more.lead}
                </p>
              </div>
              <div className="more-grid">
                {more.map((key) => (
                  <div className="more-card rv" key={key}>
                    <span className="dot">
                      <StoryIcon name={MORE_ICONS[key]} />
                    </span>
                    <div>
                      <b>{messages.more.items[key].title}</b>
                      <span>{messages.more.items[key].sub}</span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="more-cta">
                <a href={localePath(locale, "/")}>{messages.more.cta} →</a>
              </p>
            </div>
          </section>

          <StoryRuntime messages={story.rt} locale={locale} weeks={weeks} />
        </div>
        <StoryClosing locale={locale} copy={copy.closing} />
      </main>
      <Footer locale={locale} path={CAMPAIGN_PATHS[campaign]} />
    </>
  );
}
