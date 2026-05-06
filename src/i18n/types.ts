export type TimelineItem = {
  title: string;
  subtitle: string;
  time: string;
  tag: string;
};

export type FeatureCard = { title: string; subtitle: string };

export type DiaperLegendItem = { label: string; pct: string };

export type FaqItem = { q: string; a: string };

export type PrivacySection = {
  heading: string;
  intro?: string;
  items?: Array<{ bold?: string; text: string }>;
};

export type Messages = {
  meta: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
  };
  nav: {
    features: string;
    sharing: string;
    stats: string;
    blog: string;
    download: string;
    signIn: string;
    themeAria: string;
    languageAria: string;
    theme: { light: string; dark: string; system: string };
  };
  hero: {
    badge: string;             // "NEW" pill
    badgeText: string;         // "Live Activity on the lock screen"
    titlePrefix: string;
    titleHighlight: string;
    titleSuffix: string;
    description: string;
    badgesNote: string;        // legacy — small footer text
    imageAlt: string;
    bullets: [string, string, string];  // 3 sub-bullets after CTAs
    metrics: Array<{ value: string; label: string }>;  // 4 metric strip items
    card: { tag: string; title: string; subtitle: string };
  };
  features: {
    tag: string;               // "FEATURES" pill
    title: string;
    description: string;
    timeline: TimelineItem[];
    cards: FeatureCard[];
    blocks: Array<{ tag: string; title: string; desc: string }>;  // 4 main feature blocks
    smallCards: Array<{ title: string; desc: string }>;            // 4 supporting cards
  };
  sharing: {
    tag: string;               // "REAL TIME" pill
    title: string;
    description: string;
    bullets: string[];
    feedTitle: string;         // "Activity · Lina"
    online: string;            // "{n} online"
    reactQuick: string;        // "Quick react"
    feedItems: Array<{ who: string; role: string; action: string; detail: string }>;
    card: {
      title: string;
      activeName: string;
      activeDob: string;
      sharedName: string;
      sharedTag: string;
      inviteTitle: string;
      inviteSubtitle: string;
    };
  };
  stats: {
    tag: string;               // "STATS" pill
    title: string;
    description: string;
    tabs: [string, string, string];   // 7d / 30d / 3m
    sleep: {
      title: string;
      mapTitle: string;        // "SLEEP · 7-DAY MAP"
      mapTotal: string;        // "Total 13h54m"
      avgValue: string;
      avgLabel: string;
      totalValue: string;
      totalLabel: string;
      compareLabel: string;
      night: string;
      day: string;
      legendSleeping: string;  // "Sleeping" (night)
      legendNap: string;       // "Nap"
    };
    diaper: {
      title: string;
      todayLabel: string;       // "TROCAS · HOJE"
      legend: DiaperLegendItem[];
    };
    nursing: {
      title: string;            // "FEEDS · AVERAGE"
      value: string;            // "6.2"
      desc: string;             // "times a day · 14 min each"
    };
    milestones: {
      title: string;            // "MILESTONES · LAST 90 DAYS"
      items: string[];          // 5 names
    };
  };
  faq: {
    tag: string;
    title: string;
    items: FaqItem[];
  };
  cta: {
    tag: string;                // "START NOW" pill
    title: string;
    description: string;
    cardTag: string;            // "TODAY · LINA, 4 MONTHS"
    cardTitle: string;          // "3 naps, 6 feeds, 9 changes."
    cardSub: string;            // "A beautiful day."
  };
  footer: {
    description: string;
    quickLinks: string;
    home: string;
    privacy: string;
    terms: string;
    support: string;
    deleteAccount: string;
    copyright: string;
  };
  privacy: {
    badge: string;
    title: string;
    updated: string;
    intro: string;
    sections: PrivacySection[];
    contact: {
      heading: string;
      text: string;
      email: string;
    };
  };
  support: {
    badge: string;
    title: string;
    intro: { before: string; emailLabel: string; after: string };
    faqHeading: string;
    faq: FaqItem[];
  };
  deleteAccount: {
    badge: string;
    title: string;
    updated: string;
    intro: string;
    sections: PrivacySection[];
    contact: {
      heading: string;
      text: string;
      email: string;
    };
  };
  terms: {
    badge: string;
    title: string;
    updated: string;
    intro: string;
    sections: PrivacySection[];
    contact: {
      heading: string;
      text: string;
      email: string;
    };
  };
  blog: {
    title: string;
    description: string;
    readingTime: (minutes: number) => string;
    publishedOn: string;
    updatedOn: string;
    backToBlog: string;
    categoryLabel: string;
    relatedPosts: string;
    empty: string;
    faqHeading: string;
    referencesHeading: string;
  };
};
