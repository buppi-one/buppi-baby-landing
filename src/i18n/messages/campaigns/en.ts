import type { CampaignMessages } from "../../campaignTypes";

export const campaignsEn: CampaignMessages = {
  more: {
    eyebrow: "And there is more",
    title: "Buppi goes from pregnancy to the first year.",
    lead: "All in the same app, free forever and with no ads.",
    cta: "See everything Buppi does",
    items: {
      pregnancy: { title: "Pregnancy week by week", sub: "Baby's size, prenatal care and contractions." },
      logging: { title: "One-tap logging", sub: "Feeds, diapers and sleep, with one hand." },
      sleep: { title: "Nap prediction", sub: "Based on your baby's routine, with the reason in view." },
      food: { title: "Starting solids", sub: "The allergen list builds itself." },
      health: { title: "Health and check-ups", sub: "Vaccines, growth and notes for the pediatrician." },
      family: { title: "Family together", sub: "Each person with the right role, with no limit on people." },
      book: { title: "Baby book", sub: "Logs and photos become the book, by age." },
      guides: { title: "Milestones and guides", sub: "What to expect at each stage." },
    },
  },
  privacy: {
    eyebrow: "Privacy",
    title: "Your baby's photos stay with your family.",
    items: [
      {
        title: "You choose who sees",
        sub: "Each person joins with a role: care, follow or see only the book. You can change or remove access at any time.",
      },
      {
        title: "A link just for the book",
        sub: "Whoever gets the link sees the book and comments. The routine, health and the rest of the app do not show.",
      },
      {
        title: "No ads, no selling data",
        sub: "Photos are kept in private storage. Buppi shows no ads and does not sell data.",
      },
    ],
  },
  pages: {
    pregnancy: {
      metaTitle: "Buppi Baby: pregnancy week by week, with prenatal care and contractions",
      metaDescription:
        "Your baby's size each week with the source in view, prenatal care laid out by your week and a contraction timer. Free, with no ads.",
      eyebrow: "For pregnancy",
      titleBefore: "Pregnancy brings a thousand questions. Buppi sorts them ",
      titleHighlight: "week by week",
      titleAfter: ".",
      lead: "Your baby's size, the test that is due and the gap between contractions: each thing in the right week, with the source in view. You decide what the family follows.",
      imageAlt: "The pregnant woman lying down for the ultrasound, smiling at the monitor, holding her partner's hand",
      toasts: [
        { title: "Week 12: about the size of a lime", sub: "5.4 cm head to bottom" },
        { title: "Anatomy scan", sub: "due now: weeks 20 to 24" },
      ],
      closing: {
        eyebrow: "From the first week to the birth",
        title: "Start today, in any week.",
        lead: "Buppi lays out prenatal care by your week. When the baby is born, it stays with you.",
      },
    },
    sleep: {
      metaTitle: "Buppi Baby: nap prediction and your baby's sleep routine",
      metaDescription:
        "Buppi learns your baby's routine from what you log, predicts the next nap and shows every night of the week. Free, with no ads.",
      eyebrow: "For your baby's sleep",
      titleBefore: "Nobody sleeps well with a baby. Buppi shows you ",
      titleHighlight: "the next nap time",
      titleAfter: ".",
      lead: "It learns your baby's routine from what you log, predicts the next nap and shows every night of the week. You stop guessing, and everyone who helps sees the same thing.",
      imageAlt: "Baby asleep on her father's chest, on the sofa",
      toasts: [
        { title: "Nap ~11:40", sub: "in 25min · based on her routine" },
        { title: "Sunday: 2 wake-ups", sub: "there were 5 on Wednesday" },
      ],
      closing: {
        eyebrow: "One night at a time",
        title: "Baby sleep keeps changing. You can keep up.",
        lead: "Start logging today. Buppi predicts from your baby's routine, not from a chart.",
      },
    },
    memories: {
      metaTitle: "Buppi Baby: your baby's memories in a book, just for the family",
      metaDescription:
        "Photos and logs become your baby's book, organized by age. You choose who sees it, and family far away follows through a link just for the book.",
      eyebrow: "Memories and baby book",
      titleBefore: "The first year flies by. Buppi keeps every moment, ",
      titleHighlight: "just for the family",
      titleAfter: ".",
      lead: "Your logs and photos become your baby's book, organized by age. You choose who sees what, and the grandparents follow and comment from far away, with no social network.",
      imageAlt: "Mother, father and the baby on the sofa, with photos of the first year hanging on the wall",
      toasts: [
        { title: "New chapter in the book", sub: "The first laugh" },
        { title: "Grandma Diva commented", sub: "she sees only the book" },
      ],
      closing: {
        eyebrow: "From the first day to the first step",
        title: "This story only happens once.",
        lead: "Start today. The book builds itself from what you log.",
      },
    },
  },
};
