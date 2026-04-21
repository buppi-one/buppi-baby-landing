import type { Messages } from "../types";

export const fr: Messages = {
  meta: {
    title: "Buppi Baby — Soin Complet pour votre Bébé",
    description:
      "Suivez le sommeil, l'allaitement, les couches et les étapes du développement de votre bébé. Simple, beau et gratuit.",
    ogTitle: "Buppi Baby",
    ogDescription:
      "La meilleure app pour suivre la routine de votre bébé. Allaitement, sommeil, couches et étapes — tout au même endroit.",
  },
  nav: {
    features: "Fonctionnalités",
    sharing: "Partage",
    stats: "Statistiques",
    download: "Télécharger l'app",
    themeAria: "Changer de thème",
    languageAria: "Changer de langue",
    theme: { light: "Clair", dark: "Sombre", system: "Système" },
  },
  hero: {
    badge: "✨ SOIN 360 POUR VOTRE BÉBÉ",
    titlePrefix: "La meilleure app pour suivre la ",
    titleHighlight: "routine",
    titleSuffix: " de votre bébé !",
    description:
      "Simplifiez la maternité et la paternité. Enregistrez l'allaitement, le sommeil, les couches et bien plus encore au même endroit.",
    badgesNote: "Gratuit pour commencer • iOS et Android",
    imageAlt: "Bébé souriant",
    card: { tag: "APRÈS-MIDI", title: "Allaitement", subtitle: "Gauche • 44min" },
  },
  features: {
    title: "Tout ce dont vous avez besoin pour suivre",
    description:
      "Dès le premier jour, suivez chaque détail du parcours de votre petit avec des cartes intuitives et une chronologie organisée.",
    timeline: [
      {
        title: "Allaitement",
        subtitle: "Droit • 26min",
        time: "17h50 - 18h16",
        tag: "maintenant",
      },
      {
        title: "Allaitement",
        subtitle: "Gauche • 44min",
        time: "16h13 - 16h57",
        tag: "il y a 1h",
      },
      {
        title: "Change de couche",
        subtitle: "Pipi",
        time: "16h10",
        tag: "il y a 2h",
      },
      {
        title: "Sommeil",
        subtitle: "Durée : 3h 26min",
        time: "12h35 - 16h01",
        tag: "il y a 2h",
      },
    ],
    cards: [
      { title: "Bain", subtitle: "Hygiène quotidienne" },
      { title: "Vaccins", subtitle: "Calendrier à jour" },
      { title: "Médicaments", subtitle: "Rappels et doses" },
      { title: "Promenades", subtitle: "Plein air" },
    ],
  },
  sharing: {
    title: "Toute la famille connectée",
    description:
      "Partagez les enregistrements avec votre partenaire, les grands-parents ou les soignants en temps réel. Chaque personne a son propre profil et peut suivre l'évolution du bébé.",
    bullets: [
      "Plusieurs profils de bébés",
      "Synchronisation instantanée dans le cloud",
      "Invitations rapides par code ou lien",
    ],
    card: {
      title: "Mes Bébés",
      activeName: "Maria Clara",
      activeDob: "17 décembre 2024",
      sharedName: "Caio",
      sharedTag: "Partagé",
      inviteTitle: "Utiliser un code d'invitation",
      inviteSubtitle: "Vous avez un code ? Entrez ici",
    },
  },
  stats: {
    title: "Des graphiques qui racontent des histoires",
    description:
      "Comprenez les habitudes de sommeil, d'alimentation et de développement de votre bébé grâce à des statistiques détaillées et faciles à lire.",
    sleep: {
      title: "Résumé du Sommeil",
      avgValue: "2h 44m",
      avgLabel: "Moyenne quotidienne",
      totalValue: "10",
      totalLabel: "Total de siestes",
      compareLabel: "Nuit vs Jour",
      night: "Nuit : 44 %",
      day: "Jour : 56 %",
    },
    diaper: {
      title: "Changes de couche",
      legend: [
        { label: "4 Pipi", pct: "44 %" },
        { label: "1 Caca", pct: "12 %" },
        { label: "4 Les deux", pct: "44 %" },
      ],
    },
  },
  cta: {
    title: "Prêt à commencer ?",
    description:
      "Rejoignez des milliers de familles qui ont transformé la routine de soins en un moment de tranquillité.",
  },
  footer: {
    description:
      "L'application la plus complète et intuitive pour suivre le développement de votre bébé. Faite par des parents pour des parents.",
    quickLinks: "Liens rapides",
    home: "Accueil",
    privacy: "Confidentialité",
    terms: "Conditions",
    support: "Support",
    deleteAccount: "Supprimer le compte",
    copyright: "© 2026 Buppi Baby. Tous droits réservés.",
  },
  privacy: {
    badge: "🔒 CONFIDENTIALITÉ",
    title: "Politique de Confidentialité",
    updated: "Dernière mise à jour : 12 février 2026",
    intro:
      "Votre vie privée est importante pour nous. Cette Politique de Confidentialité explique comment Buppi Baby collecte, utilise et protège vos informations personnelles.",
    sections: [
      {
        heading: "1. Informations que Nous Collectons",
        intro:
          "Nous collectons les informations suivantes lorsque vous utilisez Buppi Baby :",
        items: [
          {
            bold: "Informations du compte :",
            text: "Email et nom (lorsque vous créez un compte)",
          },
          {
            bold: "Données du bébé :",
            text: "Nom, date de naissance, sexe",
          },
          {
            bold: "Enregistrements d'activités :",
            text: "Allaitement, sommeil, couches, alimentation et autres événements que vous enregistrez",
          },
          {
            bold: "Données d'utilisation :",
            text: "Comment vous interagissez avec l'application",
          },
        ],
      },
      {
        heading: "2. Comment Nous Utilisons vos Informations",
        intro: "Nous utilisons vos informations pour :",
        items: [
          { text: "Fournir et maintenir le service de l'application" },
          { text: "Synchroniser vos données entre appareils" },
          {
            text: "Permettre le partage avec d'autres soignants (lorsque vous l'autorisez)",
          },
          {
            text: "Améliorer notre application et développer de nouvelles fonctionnalités",
          },
          {
            text: "Envoyer des notifications liées à l'application (rappels, etc.)",
          },
        ],
      },
      {
        heading: "3. Partage des Données",
        intro:
          "Nous ne vendons pas vos informations personnelles. Nous ne partageons des données qu'avec :",
        items: [
          {
            text: "D'autres soignants que vous invitez à suivre votre bébé",
          },
          {
            text: "Des prestataires de service qui nous aident à exploiter l'app (Supabase, Google Cloud)",
          },
          { text: "Lorsque la loi l'exige" },
        ],
      },
      {
        heading: "4. Stockage et Sécurité",
        intro: "Vos données sont stockées de manière sécurisée en utilisant :",
        items: [
          {
            text: "Supabase (PostgreSQL) avec chiffrement en transit et au repos",
          },
          { text: "Authentification sécurisée via Google ou Apple" },
          {
            text: "Accès restreint aux utilisateurs autorisés via Row Level Security",
          },
        ],
      },
      {
        heading: "5. Vos Droits",
        intro: "Vous avez le droit de :",
        items: [
          { bold: "Accéder", text: "à vos données personnelles" },
          { bold: "Corriger", text: "les informations inexactes" },
          {
            bold: "Supprimer",
            text: "votre compte et toutes les données associées",
          },
          {
            bold: "Exporter",
            text: "vos données dans un format lisible",
          },
          {
            bold: "Révoquer",
            text: "l'accès des autres soignants à tout moment",
          },
        ],
      },
      {
        heading: "6. Données des Enfants",
        intro:
          "Buppi Baby est destiné aux parents et soignants adultes. Nous ne collectons pas intentionnellement d'informations d'enfants de moins de 13 ans en tant qu'utilisateurs de l'application. Les données des bébés sont fournies et contrôlées par les parents/tuteurs.",
      },
      {
        heading: "7. Cookies et Technologies Similaires",
        intro: "Nous utilisons des technologies de stockage local pour :",
        items: [
          { text: "Vous garder connecté" },
          { text: "Sauvegarder vos préférences" },
          { text: "Permettre le fonctionnement hors ligne" },
        ],
      },
      {
        heading: "8. Modifications de cette Politique",
        intro:
          "Nous pouvons mettre à jour cette politique de temps en temps. Nous vous informerons des changements importants via l'application ou par email.",
      },
    ],
    contact: {
      heading: "9. Contact",
      text: "Pour des questions sur la confidentialité ou pour exercer vos droits, contactez-nous à ",
      email: "privacidade@buppi.baby",
    },
  },
  support: {
    badge: "💬 SUPPORT",
    title: "Centre de Support",
    intro: {
      before:
        "Besoin d'aide ? Nous sommes là. Pour des questions, suggestions ou pour signaler des problèmes, écrivez-nous à ",
      emailLabel: "suporte@buppi.baby",
      after: ".",
    },
    faqHeading: "Questions Fréquentes",
    faq: [
      {
        q: "Comment partager mon bébé avec mon partenaire ?",
        a: "Allez dans Paramètres → Partager Bébé et envoyez le code à 6 chiffres.",
      },
      {
        q: "Mes données sont-elles en sécurité ?",
        a: "Oui ! Nous utilisons Supabase avec chiffrement en transit et au repos, et vos données sont privées via Row Level Security.",
      },
      {
        q: "Puis-je l'utiliser sur plusieurs appareils ?",
        a: "Oui, connectez-vous avec le même compte et tout se synchronise automatiquement.",
      },
      {
        q: "L'application fonctionne-t-elle hors ligne ?",
        a: "Oui ! Les enregistrements sont sauvegardés localement et se synchronisent dès que vous êtes en ligne.",
      },
    ],
  },
  deleteAccount: {
    badge: "🗑️ SUPPRIMER LE COMPTE",
    title: "Supprimer votre compte Buppi Baby",
    updated: "Dernière mise à jour : 19 avril 2026",
    intro:
      "Vous pouvez demander la suppression de votre compte Buppi Baby à tout moment. Cette page explique comment demander la suppression et quelles données sont supprimées ou conservées.",
    sections: [
      {
        heading: "1. Supprimer depuis l'app (recommandé)",
        intro:
          "Le moyen le plus rapide est directement depuis l'application. La suppression est traitée immédiatement :",
        items: [
          { text: "Ouvrez l'application Buppi Baby" },
          { text: "Allez dans Paramètres" },
          {
            text: 'Faites défiler jusqu\'en bas et touchez "Supprimer le compte"',
          },
          { text: "Confirmez la suppression dans la boîte de dialogue" },
        ],
      },
      {
        heading: "2. Supprimer par email (alternative)",
        intro:
          "Si vous n'avez plus accès à l'application, envoyez un email à l'adresse ci-dessous avec l'objet « Supprimer mon compte ». Incluez l'email associé à votre compte pour que nous puissions l'identifier. Les demandes par email sont traitées dans un délai de 7 jours ouvrables.",
      },
      {
        heading: "3. Données qui seront supprimées",
        intro:
          "Lors de la suppression de votre compte, nous supprimons définitivement les données suivantes :",
        items: [
          { bold: "Compte :", text: "email, nom, photo de profil" },
          {
            bold: "Profils des bébés :",
            text: "nom, date de naissance, sexe et photo",
          },
          {
            bold: "Événements enregistrés :",
            text: "allaitement, sommeil, couches, repas, bains, médicaments et tous les autres types",
          },
          {
            bold: "Calendriers et préférences :",
            text: "rappels, événements programmés et paramètres personnels",
          },
          {
            bold: "Partage :",
            text: "les invitations envoyées ou reçues sont révoquées ; les autres soignants perdent l'accès à vos bébés",
          },
          {
            bold: "Tokens de notification :",
            text: "les appareils enregistrés pour les notifications push sont supprimés",
          },
        ],
      },
      {
        heading: "4. Données conservées pour une période",
        intro:
          "Pour des raisons légales et de sécurité, certains registres minimaux sont conservés :",
        items: [
          {
            bold: "Sauvegardes de la base de données :",
            text: "peuvent contenir des copies de vos données jusqu'à 30 jours après la suppression. Elles sont définitivement effacées après ce délai.",
          },
          {
            bold: "Journaux d'audit :",
            text: "des registres minimaux (par ex. date de suppression, IP, événement de sécurité) sont conservés jusqu'à 90 jours pour la prévention de la fraude et des abus. Ils ne contiennent pas de données du bébé.",
          },
          {
            bold: "Registres de paiement :",
            text: "si vous aviez un abonnement payant, les données fiscales nécessaires au respect des obligations fiscales sont conservées pour la période exigée par la loi applicable (jusqu'à 5 ans).",
          },
        ],
      },
      {
        heading: "5. Délai de traitement",
        intro:
          "Les suppressions depuis l'app sont traitées immédiatement. Les demandes par email sont traitées dans un délai de 7 jours ouvrables. Vous recevrez une confirmation par email une fois terminé.",
      },
      {
        heading: "6. Cette action ne peut pas être annulée",
        intro:
          "Avant de supprimer, pensez à exporter vos données. Après la suppression, il n'est pas possible de récupérer ni l'historique, ni l'accès partagé des soignants invités.",
      },
    ],
    contact: {
      heading: "7. Contact",
      text: "Pour demander la suppression par email ou pour des questions, écrivez à ",
      email: "privacidade@buppi.baby",
    },
  },
  terms: {
    badge: "📜 CONDITIONS D'UTILISATION",
    title: "Conditions d'utilisation",
    updated: "Dernière mise à jour : 21 avril 2026",
    intro:
      "Ces conditions d'utilisation régissent l'accès et l'utilisation de l'application Buppi Baby. En créant un compte, en souscrivant à un abonnement ou en utilisant toute fonctionnalité de l'app, vous déclarez avoir lu, compris et accepté ces conditions.",
    sections: [
      {
        heading: "1. À propos du service",
        intro:
          "Buppi Baby est une application de suivi de la routine des bébés (alimentation, sommeil, couches, croissance, étapes et autres activités). Certaines fonctionnalités sont gratuites ; les fonctionnalités avancées nécessitent un abonnement payant.",
      },
      {
        heading: "2. Compte",
        intro:
          "Pour utiliser l'app, vous créez un compte via Google ou Apple. Vous êtes responsable de la sécurité de vos identifiants et de toute activité sur votre compte. Le compte est personnel et non transférable.",
      },
      {
        heading: "3. Plans et abonnements",
        intro:
          "Nous proposons des plans d'abonnement à renouvellement automatique (mensuels et annuels) vendus via l'App Store (iOS) et Google Play (Android). Les plans actuellement disponibles — nom, durée et prix — sont affichés dans l'app sur l'écran d'abonnement et dans les fiches respectives des magasins avant la confirmation de l'achat.",
      },
      {
        heading: "4. Facturation, renouvellement et annulation",
        intro:
          "Votre abonnement est traité par votre compte App Store ou Google Play :",
        items: [
          { text: "Le paiement est prélevé à la confirmation de l'achat." },
          {
            text: "L'abonnement se renouvelle automatiquement à la fin de chaque période (mensuelle ou annuelle) pour le même montant, sauf annulation au moins 24 heures avant la fin de la période en cours.",
          },
          {
            text: "Vous pouvez annuler à tout moment dans les paramètres de votre compte (iOS : Réglages → Identifiant Apple → Abonnements ; Android : Play Store → Abonnements). L'annulation arrête le renouvellement ; l'accès continue jusqu'à la fin de la période déjà payée.",
          },
          {
            text: "Les remboursements sont régis par les politiques d'Apple et de Google. Nous ne traitons pas les remboursements directement.",
          },
          {
            text: "Les périodes d'essai gratuit, lorsqu'elles sont proposées, se convertissent automatiquement en abonnement payant si elles ne sont pas annulées avant expiration.",
          },
        ],
      },
      {
        heading: "5. Usage acceptable",
        intro: "Vous vous engagez à ne pas :",
        items: [
          { text: "Utiliser l'app à des fins illégales ou portant atteinte aux droits de tiers." },
          { text: "Tenter d'obtenir un accès non autorisé aux systèmes, comptes ou données." },
          { text: "Rétro-ingénierie, décompiler ou distribuer des copies de l'application." },
          { text: "Saisir de fausses informations ou des contenus offensants/abusifs ou exposant des tiers." },
        ],
      },
      {
        heading: "6. Vos données",
        intro:
          "Vos données et celles des bébés enregistrés vous appartiennent. Nous les stockons chiffrées et les traitons conformément à la Politique de Confidentialité. Vous pouvez exporter ou supprimer votre compte à tout moment (voir les pages Confidentialité et Supprimer le compte).",
      },
      {
        heading: "7. Disponibilité et modifications",
        intro:
          "Le service est fourni « en l'état » et « selon disponibilité ». Nous pouvons mettre à jour des fonctionnalités, des prix, restreindre des accès ou interrompre des parties du service. Les modifications importantes de ces conditions seront communiquées dans l'app ou par email.",
      },
      {
        heading: "8. Responsabilités et limites",
        intro:
          "Buppi Baby est un outil informatif de suivi. Il ne remplace pas un diagnostic, traitement ou conseil médical, nutritionnel ou pédiatrique. Les décisions de santé doivent être prises avec des professionnels qualifiés. Dans la mesure maximale permise par la loi applicable, notre responsabilité pour les dommages indirects, accidentels ou consécutifs est limitée au montant payé pour l'abonnement au cours des 12 derniers mois.",
      },
      {
        heading: "9. Résiliation",
        intro:
          "Nous pouvons suspendre ou résilier votre compte en cas de violation de ces conditions. Vous pouvez résilier votre compte à tout moment via « Supprimer le compte » dans l'app.",
      },
      {
        heading: "10. Loi applicable",
        intro:
          "Ces conditions sont régies par les lois de la République fédérative du Brésil. Les parties élisent les tribunaux de São Paulo/SP comme for exclusif, sauf disposition contraire de la législation sur la consommation.",
      },
    ],
    contact: {
      heading: "11. Contact",
      text: "Des questions sur ces conditions ? Écrivez à ",
      email: "suporte@buppi.baby",
    },
  },
};
