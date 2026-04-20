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
    sharing: "Sharing",
    stats: "Stats",
    download: "Get the app",
    themeAria: "Toggle theme",
    languageAria: "Change language",
    theme: { light: "Light", dark: "Dark", system: "System" },
  },
  hero: {
    badge: "✨ 360° BABY CARE",
    titlePrefix: "The best app to track your baby's ",
    titleHighlight: "routine",
    titleSuffix: "!",
    description:
      "Make parenthood simpler. Track feeding, sleep, diapers, and so much more — all in one place.",
    badgesNote: "Free to get started • iOS and Android",
    imageAlt: "Smiling baby",
    card: { tag: "AFTERNOON", title: "Feeding", subtitle: "Left • 44min" },
  },
  features: {
    title: "Everything you need to track",
    description:
      "From day one, follow every detail of your little one's journey with intuitive cards and an organized timeline.",
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
    title: "The whole family connected",
    description:
      "Share records with your partner, grandparents, or caregivers in real time. Everyone gets their own profile and can follow your baby's progress.",
    bullets: [
      "Multiple baby profiles",
      "Instant cloud sync",
      "Quick invites via code or link",
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
    title: "Charts that tell stories",
    description:
      "Understand your baby's sleep, feeding, and growth patterns through detailed, easy-to-read statistics.",
    sleep: {
      title: "Sleep Summary",
      avgValue: "2h 44m",
      avgLabel: "Daily average",
      totalValue: "10",
      totalLabel: "Total naps",
      compareLabel: "Night vs Day",
      night: "Night: 44%",
      day: "Day: 56%",
    },
    diaper: {
      title: "Diaper Changes",
      legend: [
        { label: "4 Pee", pct: "44%" },
        { label: "1 Poop", pct: "12%" },
        { label: "4 Both", pct: "44%" },
      ],
    },
  },
  cta: {
    title: "Ready to get started?",
    description:
      "Join thousands of families who've turned daily care into a moment of calm.",
  },
  footer: {
    description:
      "The most complete and intuitive app to follow your baby's development. Built by parents, for parents.",
    quickLinks: "Quick Links",
    home: "Home",
    privacy: "Privacy",
    support: "Support",
    deleteAccount: "Delete account",
    copyright: "© 2026 Buppi Baby. All rights reserved.",
  },
  privacy: {
    badge: "🔒 PRIVACY",
    title: "Privacy Policy",
    updated: "Last updated: February 12, 2026",
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
        heading: "4. Storage and Security",
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
        heading: "5. Your Rights",
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
        heading: "6. Children's Data",
        intro:
          "Buppi Baby is intended for adult parents and caregivers. We don't knowingly collect information from children under 13 as users of the app. Baby data is provided and controlled by parents/guardians.",
      },
      {
        heading: "7. Cookies and Similar Technologies",
        intro: "We use local storage technologies to:",
        items: [
          { text: "Keep you signed in" },
          { text: "Save your preferences" },
          { text: "Enable offline functionality" },
        ],
      },
      {
        heading: "8. Changes to This Policy",
        intro:
          "We may update this policy from time to time. We'll notify you of significant changes through the app or by email.",
      },
    ],
    contact: {
      heading: "9. Contact",
      text: "For privacy questions or to exercise your rights, contact us at ",
      email: "privacidade@buppi.baby",
    },
  },
  support: {
    badge: "💬 SUPPORT",
    title: "Support Center",
    intro: {
      before:
        "Need help? We're here. For questions, suggestions, or to report issues, reach out at ",
      emailLabel: "suporte@buppi.baby",
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
      email: "privacidade@buppi.baby",
    },
  },
};
