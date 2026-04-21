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
    download: string;
    themeAria: string;
    languageAria: string;
    theme: { light: string; dark: string; system: string };
  };
  hero: {
    badge: string;
    titlePrefix: string;
    titleHighlight: string;
    titleSuffix: string;
    description: string;
    badgesNote: string;
    imageAlt: string;
    card: { tag: string; title: string; subtitle: string };
  };
  features: {
    title: string;
    description: string;
    timeline: TimelineItem[];
    cards: FeatureCard[];
  };
  sharing: {
    title: string;
    description: string;
    bullets: string[];
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
    title: string;
    description: string;
    sleep: {
      title: string;
      avgValue: string;
      avgLabel: string;
      totalValue: string;
      totalLabel: string;
      compareLabel: string;
      night: string;
      day: string;
    };
    diaper: {
      title: string;
      legend: DiaperLegendItem[];
    };
  };
  cta: {
    title: string;
    description: string;
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
};
