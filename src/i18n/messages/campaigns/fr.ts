import type { CampaignMessages } from "../../campaignTypes";

export const campaignsFr: CampaignMessages = {
  more: {
    eyebrow: "Et ce n’est pas tout",
    title: "Buppi va de la grossesse à la première année.",
    lead: "Tout dans la même application, gratuite pour toujours et sans publicité.",
    cta: "Voir tout ce que fait Buppi",
    items: {
      pregnancy: { title: "Grossesse semaine après semaine", sub: "Taille du bébé, suivi prénatal et contractions." },
      logging: { title: "Noter en un geste", sub: "Tétées, couches et sommeil, d’une seule main." },
      sleep: { title: "Prévision de sieste", sub: "D’après le rythme de votre bébé, avec l’explication." },
      food: { title: "Diversification alimentaire", sub: "Le suivi des allergènes se remplit tout seul." },
      health: { title: "Santé et consultations", sub: "Vaccins, croissance et les points à voir avec le pédiatre." },
      family: { title: "La famille ensemble", sub: "Chaque personne avec le bon rôle, sans limite de personnes." },
      book: { title: "Livre de bébé", sub: "Les notes et les photos deviennent le livre, par âge." },
      guides: { title: "Étapes et guides", sub: "À quoi s’attendre à chaque étape." },
    },
  },
  privacy: {
    eyebrow: "Confidentialité",
    title: "Les photos de votre bébé restent dans votre famille.",
    items: [
      {
        title: "Vous choisissez qui voit",
        sub: "Chaque personne arrive avec un rôle : s’occuper, suivre ou voir seulement le livre. Vous pouvez modifier ou retirer l’accès à tout moment.",
      },
      {
        title: "Un lien pour le livre seulement",
        sub: "La personne qui reçoit le lien voit le livre et commente. Le quotidien, la santé et le reste de l’application n’apparaissent pas.",
      },
      {
        title: "Sans publicité, sans vente de données",
        sub: "Les photos sont gardées dans un stockage privé. Buppi n’affiche pas de publicité et ne vend pas de données.",
      },
    ],
  },
  pages: {
    pregnancy: {
      metaTitle: "Buppi Baby : la grossesse semaine après semaine, avec suivi prénatal et contractions",
      metaDescription:
        "La taille du bébé chaque semaine avec la source visible, le suivi prénatal organisé selon votre semaine et le compteur de contractions. Gratuit et sans publicité.",
      eyebrow: "Pour la grossesse",
      titleBefore: "La grossesse apporte mille questions. Buppi les ordonne ",
      titleHighlight: "chaque semaine",
      titleAfter: ".",
      lead: "La taille du bébé, l’examen du moment et l’intervalle entre les contractions : chaque chose à la bonne semaine, avec la source visible. Vous décidez de ce que la famille suit.",
      imageAlt: "La future maman allongée pour l’échographie, souriant à l’écran, main dans la main avec son compagnon",
      toasts: [
        { title: "Semaine 12 : de la taille d’un citron vert", sub: "5,4 cm de la tête aux fesses" },
        { title: "Échographie morphologique", sub: "c’est maintenant : semaines 20 à 24" },
      ],
      closing: {
        eyebrow: "De la première semaine à la naissance",
        title: "Commencez aujourd’hui, à n’importe quelle semaine.",
        lead: "Buppi organise le suivi prénatal selon votre semaine. Quand bébé arrive, il continue avec vous.",
      },
    },
    sleep: {
      metaTitle: "Buppi Baby : prévision de sieste et rythme de sommeil de bébé",
      metaDescription:
        "Buppi apprend le rythme de votre bébé à partir de vos notes, prévoit la prochaine sieste et montre chaque nuit de la semaine. Gratuit et sans publicité.",
      eyebrow: "Pour le sommeil de bébé",
      titleBefore: "Personne ne dort bien avec un bébé. Buppi montre ",
      titleHighlight: "l’heure de la sieste",
      titleAfter: ".",
      lead: "Il apprend le rythme de votre bébé à partir de vos notes, prévoit la prochaine sieste et montre chaque nuit de la semaine. Vous arrêtez de deviner, et ceux qui s’en occupent avec vous voient la même chose.",
      imageAlt: "Bébé endormie sur la poitrine de son père, sur le canapé",
      toasts: [
        { title: "Sieste ~11:40", sub: "dans 25min · d’après son rythme" },
        { title: "Dimanche : 2 réveils", sub: "il y en a eu 5 mercredi" },
      ],
      closing: {
        eyebrow: "Une nuit à la fois",
        title: "Le sommeil de bébé change sans cesse. On peut le suivre.",
        lead: "Commencez à noter aujourd’hui. Buppi prévoit d’après le rythme de votre bébé, et non d’après un tableau.",
      },
    },
    memories: {
      metaTitle: "Buppi Baby : les souvenirs de bébé dans un livre, pour la famille seulement",
      metaDescription:
        "Les photos et les notes deviennent le livre de bébé, organisé par âge. Vous choisissez qui le voit, et la famille qui vit loin suit grâce à un lien réservé au livre.",
      eyebrow: "Souvenirs et livre de bébé",
      titleBefore: "La première année file. Buppi garde chaque moment ",
      titleHighlight: "en famille",
      titleAfter: ".",
      lead: "Vos notes et vos photos deviennent le livre de bébé, organisé par âge. Vous choisissez qui voit quoi, et les grands-parents suivent et commentent de loin, sans réseau social.",
      imageAlt: "La mère, le père et bébé sur le canapé, avec des photos de la première année accrochées au mur",
      toasts: [
        { title: "Nouveau chapitre dans le livre", sub: "Le premier éclat de rire" },
        { title: "Mamie Diva a commenté", sub: "elle voit seulement le livre" },
      ],
      closing: {
        eyebrow: "Du premier jour au premier pas",
        title: "Cette histoire n’arrive qu’une fois.",
        lead: "Commencez aujourd’hui. Le livre se construit avec ce que vous notez.",
      },
    },
  },
};
