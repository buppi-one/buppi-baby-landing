import type { Messages } from "../types";

export const en: Messages = {
  meta: {
    title: "Buppi Baby — Complete Care for Your Baby",
    description:
      "Track sleep, feeding, diapers and developmental milestones for your baby. Simple, beautiful, and free.",
    ogTitle: "Buppi Baby",
    ogDescription:
      "The best app to track your baby's routine. Feeding, sleep, diapers, and milestones — all in one place.",
  },
  nav: {
    features: "Features",
    sharing: "Family",
    stats: "Stats",
    blog: "Blog",
    tools: "Tools",
    download: "Download free",
    signIn: "Sign in",
    themeAria: "Toggle theme",
    languageAria: "Change language",
    searchAria: "Search the blog",
    theme: { light: "Light", dark: "Dark", system: "System" },
  },
  search: {
    placeholder: "Search articles…",
    hint: "Type to search the blog articles.",
    empty: "No results for",
    resultsAria: "Search results",
    close: "Close search",
    unavailable:
      "Search is available on the published site (it needs the production build).",
  },
  blogTeaser: {
    tag: "FROM THE BLOG",
    title: "Learn while you care",
    description:
      "Practical guides on sleep, feeding, development and health — written from trustworthy sources.",
    viewAll: "See all articles",
  },
  tools: {
    badge: "Tools",
    title: "Everyday tools",
    description:
      "Simple, trustworthy calculators for the most common questions — based on official sources, always deferring to your pediatrician.",
    open: "Open",
    relatedArticle: "Read the full guide",
    backToTools: "All tools",
  },
  hero: {
    badge: "NEW",
    badgeText: "Live Activity on the lock screen",
    titlePrefix: "The most ",
    titleHighlight: "intelligent",
    titleSuffix: " baby routine companion.",
    description:
      "Log feeds, sleep, and diapers in one tap. Buppi learns your baby's rhythm and predicts the next nap.",
    badgesNote: "Free to get started • iOS and Android",
    imageAlt: "Smiling baby",
    bullets: [
      "Free to get started",
      "iOS and Android",
      "No ads",
    ],
    metrics: [
      { value: "< 2s", label: "to log an event" },
      { value: "12+", label: "event types" },
      { value: "6", label: "people on the family plan" },
      { value: "iOS · Android", label: "iPhone, iPad and Android" },
    ],
    card: { tag: "AFTERNOON", title: "Feeding", subtitle: "Left • 44min" },
  },
  features: {
    tag: "FEATURES",
    title: "Built for the first thousand days.",
    description:
      "From day one, follow every detail of your little one's journey with intuitive cards and an organized timeline.",
    blocks: [
      { tag: "Sleep", title: "Predicted nap windows", desc: "Buppi reads the history and tells you when your baby will likely tire next." },
      { tag: "Feeding", title: "Side-aware timer", desc: "Knows which side started last time. Live Activity always at hand." },
      { tag: "Diapers", title: "One-tap logging", desc: "Pee, poo, mixed. 2 seconds from unlock to done." },
      { tag: "Milestones", title: "Never miss one", desc: "Each milestone gets the date, photo and your baby's exact age." },
    ],
    smallCards: [
      { title: "Bottle", desc: "Volume and formula" },
      { title: "Growth", desc: "Weight, height, percentile" },
      { title: "Bath", desc: "Hygiene and temperature" },
      { title: "Walks", desc: "Outdoor time" },
    ],
    timeline: [
      {
        title: "Feeding",
        subtitle: "Right • 26min",
        time: "5:50 PM - 6:16 PM",
        tag: "now",
      },
      {
        title: "Feeding",
        subtitle: "Left • 44min",
        time: "4:13 PM - 4:57 PM",
        tag: "1h ago",
      },
      {
        title: "Diaper Change",
        subtitle: "Pee",
        time: "4:10 PM",
        tag: "2h ago",
      },
      {
        title: "Sleep",
        subtitle: "Duration: 3h 26min",
        time: "12:35 PM - 4:01 PM",
        tag: "2h ago",
      },
    ],
    cards: [
      { title: "Bath", subtitle: "Daily hygiene" },
      { title: "Vaccines", subtitle: "Schedule on track" },
      { title: "Medication", subtitle: "Reminders & doses" },
      { title: "Walks", subtitle: "Outdoor time" },
    ],
  },
  sharing: {
    tag: "REAL TIME",
    title: "The whole family on the same page.",
    description:
      "When you change a diaper, everyone sees it. When dad gives the bottle, everyone reacts. No WhatsApp groups, no spreadsheets.",
    bullets: [
      "Multiple baby profiles",
      "Instant cloud sync",
      "Reactions on family events",
      "Per-person permissions and privacy",
    ],
    feedTitle: "Activity · Lina",
    online: "{n} online",
    reactQuick: "Quick react",
    feedItems: [
      { who: "Marina", role: "mom", action: "started a nap", detail: "2:18 PM · expected window" },
      { who: "Bruno", role: "dad", action: "fed Lina", detail: "R 7min · L 8min · 1:16 PM" },
      { who: "Carol", role: "nanny", action: "changed diaper", detail: "pee · 1:00 PM" },
      { who: "Grandma Alice", role: "grandma", action: "bathed Lina", detail: "11:30 AM · 36°C" },
    ],
    card: {
      title: "My Babies",
      activeName: "Maria Clara",
      activeDob: "December 17, 2024",
      sharedName: "Caio",
      sharedTag: "Shared",
      inviteTitle: "Use invite code",
      inviteSubtitle: "Got a code? Enter it here",
    },
  },
  stats: {
    tag: "STATS",
    title: "Clear patterns, lighter decisions.",
    description:
      "Understand your baby's sleep, feeding, and growth patterns through detailed, easy-to-read statistics.",
    tabs: ["7 days", "30 days", "3 months"],
    sleep: {
      title: "Sleep Summary",
      mapTitle: "SLEEP · 7-DAY MAP",
      mapTotal: "Total 13h54m",
      avgValue: "2h 44m",
      avgLabel: "Daily average",
      totalValue: "10",
      totalLabel: "Total naps",
      compareLabel: "Night vs Day",
      night: "Night: 44%",
      day: "Day: 56%",
      legendSleeping: "Sleeping",
      legendNap: "Nap",
    },
    diaper: {
      title: "Diaper Changes",
      todayLabel: "CHANGES · TODAY",
      legend: [
        { label: "Pee", pct: "4" },
        { label: "Poo", pct: "1" },
        { label: "Mixed", pct: "4" },
      ],
    },
    nursing: {
      title: "FEEDS · AVERAGE",
      value: "6.2",
      desc: "times a day · 14 min each",
    },
    milestones: {
      title: "MILESTONES · LAST 90 DAYS",
      items: ["Smiled", "Head up", "Sat", "Crawled", "Walked"],
    },
  },
  faq: {
    tag: "FAQ",
    title: "Frequently asked questions",
    items: [
      { q: "Is it really free?", a: "Yes. The free plan includes full event logging (sleep, feeds, diapers, milestones), timeline and basic stats — all stored locally on the device. It does not include extra caregivers or cloud backup." },
      { q: "How do the Duo and Circle plans work?", a: "Duo unlocks you + 1 person (partner). Circle unlocks you + 5 people (extended family — grandparents, nanny, pediatrician). Both paid plans sync everything to the cloud with automatic backup." },
      { q: "What's iPhone-exclusive?", a: "On iPhone you get Live Activity in the Dynamic Island (timers and alerts always visible), home-screen widgets and lock-screen widgets. Android equivalents are on the roadmap." },
      { q: "Does it work offline?", a: "Yes. On the free plan, all logging works offline-only. The paid plans add cloud sync and backup on top." },
      { q: "Is my data safe?", a: "Yes. Encryption in transit and at rest, and we follow LGPD and GDPR-equivalent standards." },
      { q: "Can I cancel anytime?", a: "You can. No fees, no commitment. You keep access until the end of the paid period; your data stays available on the free plan." },
    ],
  },
  cta: {
    tag: "START NOW",
    title: "Buppi will be there for the next nap.",
    description:
      "Free to get started. Works on iOS and Android. No ads, no fine print.",
    cardTag: "TODAY · LINA, 4 MONTHS",
    cardTitle: "3 naps, 6 feeds, 9 changes.",
    cardSub: "A beautiful day.",
  },
  footer: {
    description:
      "The most complete and intuitive app to follow your baby's development. Built by parents, for parents.",
    quickLinks: "Quick Links",
    home: "Home",
    about: "About",
    privacy: "Privacy",
    terms: "Terms",
    support: "Support",
    deleteAccount: "Delete account",
    copyright: "© 2026 Buppi Baby. All rights reserved.",
  },
  about: {
    badge: "About",
    title: "About Buppi Baby",
    updated: "Updated September 2026",
    intro:
      "Buppi Baby is a free iOS and Android app that helps parents and caregivers track a baby's routine — sleep, breastfeeding, bottles, diapers, health, growth and milestones — with one-tap logging, synced across everyone caring for the same child.",
    sections: [
      {
        heading: "What we do",
        intro:
          "The app learns your baby's rhythm from their real logged history to predict the next nap, shows a live timer on the lock screen (Live Activity), and turns the data into easy-to-read statistics: sleep maps, WHO-standard growth curves and milestones by age. Everything is designed to lower a caregiver's mental load — logging takes under two seconds.",
      },
      {
        heading: "Who we are",
        intro:
          "Buppi Baby is built independently in Brazil, by parents, for parents. Beyond the app, we maintain a free blog in four languages (Portuguese, English, Spanish and French) with practical guides on baby sleep, feeding, health and development — all written from sources such as the World Health Organization (WHO), the American Academy of Pediatrics (AAP) and the Brazilian Society of Pediatrics (SBP).",
      },
      {
        heading: "Our principles",
        items: [
          { bold: "Evidence first.", text: "Every blog guide cites the sources it is based on — no guesswork." },
          { bold: "We never recommend medications.", text: "No Buppi content suggests a drug, class or dose. That decision always belongs to the pediatrician." },
          { bold: "Privacy.", text: "Your baby's data belongs to you. We don't sell data and we don't show ads." },
          { bold: "Free to start.", text: "The app's essentials are free; advanced family features are optional." },
        ],
      },
    ],
    contact: {
      heading: "Talk to us",
      text: "Questions, suggestions, press or partnerships:",
      email: "suporte@buppi.baby",
    },
  },
  privacy: {
    badge: "🔒 PRIVACY",
    title: "Privacy Policy",
    updated: "Last updated: August 13, 2026",
    intro:
      "Your privacy matters to us. This Privacy Policy explains how Buppi Baby collects, uses, and protects your personal information.",
    sections: [
      {
        heading: "1. Information We Collect",
        intro: "We collect the following information when you use Buppi Baby:",
        items: [
          {
            bold: "Account information:",
            text: "Email and name (when you create an account)",
          },
          { bold: "Baby data:", text: "Name, date of birth, gender" },
          {
            bold: "Activity records:",
            text: "Feeding, sleep, diapers, meals, and other events you log",
          },
          { bold: "Usage data:", text: "How you interact with the app" },
        ],
      },
      {
        heading: "2. How We Use Your Information",
        intro: "We use your information to:",
        items: [
          { text: "Provide and maintain the app service" },
          { text: "Sync your data across devices" },
          { text: "Allow sharing with other caregivers (when you authorize it)" },
          { text: "Improve our app and develop new features" },
          { text: "Send app-related notifications (reminders, etc.)" },
        ],
      },
      {
        heading: "3. Data Sharing",
        intro:
          "We don't sell your personal information. We only share data:",
        items: [
          { text: "With other caregivers you invite to follow your baby" },
          {
            text: "With service providers that help us operate the app (Supabase, Google Cloud)",
          },
          { text: "When required by law" },
        ],
      },
      {
        heading: "4. AI Assistant (Buppi)",
        intro:
          "The app offers an optional AI assistant to help with questions about your baby. When you use it:",
        items: [
          {
            bold: "What is sent:",
            text: "Your message and a reduced baby context (name, age and the records needed to answer your question)",
          },
          {
            bold: "Processing:",
            text: "Messages are processed by Anthropic (Claude model), acting as a processor, and are not used to train their models",
          },
          {
            bold: "Conversation history:",
            text: "We store conversations to improve the quality and safety of the assistant. You may request deletion at any time via our contact email",
          },
          {
            bold: "Limited use:",
            text: "The assistant is an informational and educational feature. It does not diagnose and does not replace your pediatrician's guidance",
          },
        ],
      },
      {
        heading: "5. Storage and Security",
        intro: "Your data is stored securely using:",
        items: [
          {
            text: "Supabase (PostgreSQL) with encryption in transit and at rest",
          },
          { text: "Secure authentication via Google or Apple" },
          {
            text: "Restricted access to authorized users only via Row Level Security",
          },
        ],
      },
      {
        heading: "6. Your Rights",
        intro: "You have the right to:",
        items: [
          { bold: "Access", text: "your personal data" },
          { bold: "Correct", text: "inaccurate information" },
          { bold: "Delete", text: "your account and all associated data" },
          { bold: "Export", text: "your data in a readable format" },
          {
            bold: "Revoke",
            text: "access from other caregivers at any time",
          },
        ],
      },
      {
        heading: "7. Children's Data",
        intro:
          "Buppi Baby is intended for adult parents and caregivers. We don't knowingly collect information from children under 13 as users of the app. Baby data is provided and controlled by parents/guardians.",
      },
      {
        heading: "8. Cookies and Similar Technologies",
        intro: "We use local storage technologies to:",
        items: [
          { text: "Keep you signed in" },
          { text: "Save your preferences" },
          { text: "Enable offline functionality" },
        ],
      },
      {
        heading: "9. Changes to This Policy",
        intro:
          "We may update this policy from time to time. We'll notify you of significant changes through the app or by email.",
      },
    ],
    contact: {
      heading: "10. Contact",
      text: "For privacy questions or to exercise your rights, contact us at ",
      email: "privacy@buppi.baby",
    },
  },
  support: {
    badge: "💬 SUPPORT",
    title: "Support Center",
    intro: {
      before:
        "Need help? We're here. For questions, suggestions, or to report issues, reach out at ",
      emailLabel: "support@buppi.baby",
      after: ".",
    },
    faqHeading: "Frequently Asked Questions",
    faq: [
      {
        q: "How do I share my baby with my partner?",
        a: "Go to Settings → Share Baby and send the 6-digit code.",
      },
      {
        q: "Is my data secure?",
        a: "Yes! We use Supabase with encryption in transit and at rest, and your data is private via Row Level Security.",
      },
      {
        q: "Can I use it on more than one device?",
        a: "Yes, sign in with the same account and everything syncs automatically.",
      },
      {
        q: "Does the app work offline?",
        a: "Yes! Records are saved locally and sync once you're back online.",
      },
    ],
  },
  deleteAccount: {
    badge: "🗑️ DELETE ACCOUNT",
    title: "Delete your Buppi Baby account",
    updated: "Last updated: April 19, 2026",
    intro:
      "You can request deletion of your Buppi Baby account at any time. This page explains how to request deletion and which data is removed or retained.",
    sections: [
      {
        heading: "1. Delete from the app (recommended)",
        intro:
          "The fastest way is directly inside the app. Deletion is processed immediately:",
        items: [
          { text: "Open the Buppi Baby app" },
          { text: "Go to Settings" },
          { text: 'Scroll to the bottom and tap "Delete account"' },
          { text: "Confirm in the dialog" },
        ],
      },
      {
        heading: "2. Delete by email (alternative)",
        intro:
          'If you no longer have access to the app, send an email to the address below with the subject "Delete my account". Include the email associated with your account so we can identify it. Email requests are processed within 7 business days.',
      },
      {
        heading: "3. Data that will be deleted",
        intro:
          "When you delete your account, we permanently remove the following data:",
        items: [
          { bold: "Account:", text: "email, name, profile photo" },
          {
            bold: "Baby profiles:",
            text: "name, date of birth, gender, and photo",
          },
          {
            bold: "Logged events:",
            text: "feeding, sleep, diapers, meals, baths, medication, and all other types",
          },
          {
            bold: "Schedules and preferences:",
            text: "reminders, scheduled events, and personal settings",
          },
          {
            bold: "Sharing:",
            text: "invites sent or received are revoked; other caregivers lose access to your babies",
          },
          {
            bold: "Notification tokens:",
            text: "registered devices for push notifications are removed",
          },
        ],
      },
      {
        heading: "4. Data we retain for a period",
        intro:
          "For legal and security reasons, some minimal records are kept:",
        items: [
          {
            bold: "Database backups:",
            text: "may contain copies of your data for up to 30 days after deletion. They are permanently purged after that.",
          },
          {
            bold: "Audit logs:",
            text: "minimal records (e.g., deletion date, IP, security event) are kept for up to 90 days for fraud and abuse prevention. They contain no baby data.",
          },
          {
            bold: "Payment records:",
            text: "if you had a paid subscription, tax data required to comply with tax obligations is retained for the period required by applicable law (up to 5 years).",
          },
        ],
      },
      {
        heading: "5. Processing time",
        intro:
          "In-app deletions are processed immediately. Email requests are processed within 7 business days. You'll receive an email confirmation when complete.",
      },
      {
        heading: "6. This action cannot be undone",
        intro:
          "Before deleting, consider exporting your data. After deletion, neither the history nor the shared access of invited caregivers can be recovered.",
      },
    ],
    contact: {
      heading: "7. Contact",
      text: "To request deletion by email or for questions, write to ",
      email: "privacy@buppi.baby",
    },
  },
  terms: {
    badge: "📜 EULA",
    title: "End User License Agreement",
    updated: "Last updated: April 22, 2026",
    intro:
      "This End User License Agreement (\"Agreement\") is a legal agreement between you (\"User\") and Buppi (\"Developer\") governing your use of the Buppi mobile application (\"App\").",
    sections: [
      {
        heading: "1. License",
        intro:
          "The App is licensed, not sold, to you. The Developer grants you a limited, non-exclusive, non-transferable, revocable license to use the App for your personal, non-commercial purposes, subject to this Agreement.",
      },
      {
        heading: "2. Subscriptions",
        intro: "The App may offer auto-renewable subscriptions.",
        items: [
          { text: "Payment will be charged to your Apple ID account at confirmation of purchase." },
          { text: "Subscriptions automatically renew unless canceled at least 24 hours before the end of the current period." },
          { text: "You can manage and cancel subscriptions in your account settings." },
        ],
      },
      {
        heading: "3. Responsibility",
        intro:
          "The App and its content are provided by the Developer. Apple Inc. is not responsible for the App, its content, or any maintenance or support services.",
      },
      {
        heading: "4. Maintenance and Support",
        intro:
          "The Developer is solely responsible for providing maintenance and support for the App. Apple has no obligation whatsoever to furnish any maintenance or support services.",
      },
      {
        heading: "5. Warranty",
        intro:
          "The App is provided \"AS IS\" and \"AS AVAILABLE\" without warranties of any kind. To the maximum extent permitted by law, the Developer disclaims all warranties, whether express or implied.",
      },
      {
        heading: "6. Limitation of Liability",
        intro:
          "To the extent permitted by law, the Developer shall not be liable for any indirect, incidental, or consequential damages arising from the use of the App.",
      },
      {
        heading: "7. Legal Compliance",
        intro:
          "You agree to use the App in compliance with all applicable laws and regulations.",
      },
      {
        heading: "8. Termination",
        intro:
          "This license is effective until terminated. Your rights will terminate automatically if you fail to comply with any term of this Agreement.",
      },
      {
        heading: "9. Third-Party Beneficiary",
        intro:
          "Apple Inc. and its subsidiaries are third-party beneficiaries of this Agreement and, upon your acceptance of this Agreement, will have the right to enforce this Agreement against you.",
      },
      {
        heading: "10. Governing Law",
        intro: "This Agreement shall be governed by the laws of Brazil.",
      },
    ],
    contact: {
      heading: "11. Contact",
      text: "If you have any questions, contact: ",
      email: "support@buppi.baby",
    },
  },
  blog: {
    title: "Blog",
    description: "Practical content about pregnancy, sleep, feeding, and your baby's development.",
    readingTime: (minutes) => `${minutes} min read`,
    publishedOn: "Published on",
    updatedOn: "Updated on",
    backToBlog: "← Back to the blog",
    categoryLabel: "Category",
    relatedPosts: "Related articles",
    empty: "No articles published yet.",
    faqHeading: "Frequently asked questions",
    referencesHeading: "References",
    share: {
      heading: "Share this article",
      whatsapp: "Share on WhatsApp",
      x: "Share on X (Twitter)",
      mail: "Share by email",
      copyLink: "Copy link",
      linkCopied: "Link copied!",
      native: "More options",
    },
  },
};
