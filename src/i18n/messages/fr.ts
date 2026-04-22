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
      email: "privacy@buppi.baby",
    },
  },
  support: {
    badge: "💬 SUPPORT",
    title: "Centre de Support",
    intro: {
      before:
        "Besoin d'aide ? Nous sommes là. Pour des questions, suggestions ou pour signaler des problèmes, écrivez-nous à ",
      emailLabel: "support@buppi.baby",
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
      email: "privacy@buppi.baby",
    },
  },
  terms: {
    badge: "📜 EULA",
    title: "Contrat de Licence Utilisateur Final",
    updated: "Dernière mise à jour : 22 avril 2026",
    intro:
      "Ce Contrat de Licence Utilisateur Final (« Contrat ») est un accord légal entre vous (« Utilisateur ») et Buppi (« Développeur ») régissant votre utilisation de l'application mobile Buppi (« App »).",
    sections: [
      {
        heading: "1. Licence",
        intro:
          "L'App vous est concédée sous licence, et non vendue. Le Développeur vous accorde une licence limitée, non exclusive, non transférable et révocable pour utiliser l'App à des fins personnelles et non commerciales, sous réserve du présent Contrat.",
      },
      {
        heading: "2. Abonnements",
        intro: "L'App peut proposer des abonnements à renouvellement automatique.",
        items: [
          { text: "Le paiement sera prélevé sur votre compte Apple ID à la confirmation de l'achat." },
          { text: "Les abonnements se renouvellent automatiquement sauf annulation au moins 24 heures avant la fin de la période en cours." },
          { text: "Vous pouvez gérer et annuler vos abonnements dans les paramètres de votre compte." },
        ],
      },
      {
        heading: "3. Responsabilité",
        intro:
          "L'App et son contenu sont fournis par le Développeur. Apple Inc. n'est pas responsable de l'App, de son contenu ni d'aucun service de maintenance ou de support.",
      },
      {
        heading: "4. Maintenance et Support",
        intro:
          "Le Développeur est seul responsable de la maintenance et du support de l'App. Apple n'a aucune obligation de fournir des services de maintenance ou de support.",
      },
      {
        heading: "5. Garantie",
        intro:
          "L'App est fournie « EN L'ÉTAT » et « SELON DISPONIBILITÉ » sans garantie d'aucune sorte. Dans la mesure maximale permise par la loi, le Développeur décline toute garantie, expresse ou implicite.",
      },
      {
        heading: "6. Limitation de Responsabilité",
        intro:
          "Dans la mesure permise par la loi, le Développeur ne saurait être tenu responsable de dommages indirects, accessoires ou consécutifs découlant de l'utilisation de l'App.",
      },
      {
        heading: "7. Conformité Légale",
        intro:
          "Vous acceptez d'utiliser l'App en conformité avec toutes les lois et réglementations applicables.",
      },
      {
        heading: "8. Résiliation",
        intro:
          "Cette licence est valable jusqu'à sa résiliation. Vos droits prendront fin automatiquement si vous ne respectez pas les termes du présent Contrat.",
      },
      {
        heading: "9. Bénéficiaire Tiers",
        intro:
          "Apple Inc. et ses filiales sont des bénéficiaires tiers du présent Contrat et, dès votre acceptation, auront le droit de faire respecter ce Contrat à votre encontre.",
      },
      {
        heading: "10. Loi Applicable",
        intro: "Le présent Contrat est régi par les lois du Brésil.",
      },
    ],
    contact: {
      heading: "11. Contact",
      text: "Pour toute question, contactez-nous : ",
      email: "support@buppi.baby",
    },
  },
};
