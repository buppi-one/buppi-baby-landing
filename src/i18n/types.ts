import type { StoryMessages } from "./storyTypes";

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
    tools: string;
    download: string;
    downloadShort: string;
    signIn: string;
    themeAria: string;
    languageAria: string;
    searchAria: string;
    theme: { light: string; dark: string; system: string };
  };
  search: {
    placeholder: string;          // input placeholder
    hint: string;                 // empty-state helper text
    empty: string;                // "no results for" prefix (query appended)
    resultsAria: string;          // aria-label for results list
    close: string;                // aria-label for close button
    unavailable: string;          // dev-only fallback when index is missing
  };
  blogTeaser: {
    tag: string;                  // small pill, e.g. "FROM THE BLOG"
    title: string;
    description: string;
    viewAll: string;              // "See all articles"
  };
  tools: {
    badge: string;                // small pill, e.g. "FERRAMENTAS"
    title: string;                // hub H1
    description: string;          // hub lede
    open: string;                 // card CTA, "Abrir"
    relatedArticle: string;       // link to the related guide
    backToTools: string;          // "Todas as ferramentas"
  };
  faq: {
    tag: string;
    title: string;
    items: FaqItem[];
  };
  story: StoryMessages;
  footer: {
    description: string;
    quickLinks: string;
    home: string;
    about: string;
    privacy: string;
    terms: string;
    support: string;
    deleteAccount: string;
    copyright: string;
  };
  about: {
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
    metaTitle: string;
    description: string;
    readingTime: (minutes: number) => string;
    publishedOn: string;
    updatedOn: string;
    medicalDisclaimer: string;
    backToBlog: string;
    categoryLabel: string;
    relatedPosts: string;
    empty: string;
    faqHeading: string;
    referencesHeading: string;
    share: {
      heading: string;             // "Compartilhar este artigo"
      whatsapp: string;            // aria-label "Compartilhar no WhatsApp"
      x: string;                   // aria-label "Compartilhar no X"
      mail: string;                // aria-label "Compartilhar por e-mail"
      copyLink: string;            // "Copiar link"
      linkCopied: string;          // "Link copiado!"
      native: string;              // "Mais opções"
    };
  };
};
