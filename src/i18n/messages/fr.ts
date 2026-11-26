import type { Messages } from "../types";
import { storyFr } from "./story/fr";

export const fr: Messages = {
  meta: {
    title: "Buppi Baby — Soin Complet pour votre Bébé",
    description:
      "Suivez votre grossesse semaine après semaine, puis le sommeil, l'allaitement, les couches et les étapes de votre bébé. Simple, beau et gratuit.",
    ogTitle: "Buppi Baby",
    ogDescription:
      "De la grossesse à la première année : semaine après semaine, suivi prénatal, allaitement, sommeil, couches et étapes — tout au même endroit.",
  },
  nav: {
    features: "Fonctionnalités",
    sharing: "Famille",
    stats: "Statistiques",
    blog: "Blog",
    tools: "Outils",
    download: "Télécharger gratuitement",
    downloadShort: "Télécharger",
    signIn: "Se connecter",
    themeAria: "Changer de thème",
    languageAria: "Changer de langue",
    searchAria: "Rechercher dans le blog",
    theme: { light: "Clair", dark: "Sombre", system: "Système" },
  },
  search: {
    placeholder: "Rechercher des articles…",
    hint: "Tapez pour rechercher dans les articles du blog.",
    empty: "Aucun résultat pour",
    resultsAria: "Résultats de recherche",
    close: "Fermer la recherche",
    unavailable:
      "La recherche est disponible sur le site publié (elle nécessite le build de production).",
  },
  blogTeaser: {
    tag: "DU BLOG",
    title: "Apprenez en prenant soin",
    description:
      "Des guides pratiques sur le sommeil, l'alimentation, le développement et la santé — rédigés à partir de sources fiables.",
    viewAll: "Voir tous les articles",
  },
  tools: {
    badge: "Outils",
    title: "Outils du quotidien",
    description:
      "Des calculateurs simples et fiables pour les questions les plus courantes — basés sur des sources officielles, renvoyant toujours au pédiatre.",
    open: "Ouvrir",
    relatedArticle: "Lire le guide complet",
    backToTools: "Tous les outils",
  },
  faq: {
    tag: "FAQ",
    title: "Les questions de ceux qui arrivent",
    items: [
      { q: "C’est vraiment gratuit ? Où est le piège ?", a: "C’est gratuit et ça le restera. Noter, chronométrer, consulter tout l’historique, voir les statistiques et partager avec la famille ne coûte rien, sans publicité et sans limite de durée. Seules quelques fonctions en plus font partie de Pro, comme l’analyse complète du sommeil et les widgets." },
      { q: "Peut-on commencer pendant la grossesse ?", a: "Oui. Vous indiquez la date prévue d’accouchement et Buppi suit la grossesse semaine après semaine, avec le suivi prénatal et les outils de la dernière ligne droite. À la naissance, un geste sur « Bébé est né ! » ouvre le suivi du bébé, sans rien perdre de la grossesse." },
      { q: "Ça marche sans internet ?", a: "Oui. Tout est d’abord enregistré sur le téléphone, puis synchronisé tout seul quand la connexion revient." },
      { q: "Qui voit les données de mon bébé ?", a: "Seulement les personnes que vous invitez, avec le rôle que vous choisissez. Pendant la grossesse, les données de la future mère lui appartiennent : c’est elle qui décide de ce que la famille voit. Vous pouvez tout exporter ou tout supprimer quand vous voulez." },
      { q: "C’est compatible iPhone et Android ?", a: "Les deux, et ils cohabitent : un parent sur iPhone et l’autre sur Android voient le même quotidien." },
    ],
  },
  story: storyFr,
  footer: {
    description:
      "L'application la plus complète et intuitive pour suivre le développement de votre bébé. Faite par des parents pour des parents.",
    quickLinks: "Liens rapides",
    home: "Accueil",
    about: "À propos",
    privacy: "Confidentialité",
    terms: "Conditions",
    support: "Support",
    deleteAccount: "Supprimer le compte",
    copyright: "© 2026 Buppi Baby. Tous droits réservés.",
  },
  about: {
    badge: "À propos",
    title: "À propos de Buppi Baby",
    updated: "Mis à jour en septembre 2026",
    intro:
      "Buppi Baby est une application gratuite pour iOS et Android qui aide les parents et les personnes qui s'occupent de bébé à suivre sa routine — sommeil, allaitement, biberons, couches, santé, croissance et étapes clés — avec des enregistrements en un geste, synchronisés entre toutes les personnes qui s'occupent du même enfant.",
    sections: [
      {
        heading: "Ce que nous faisons",
        intro:
          "L'application apprend le rythme de votre bébé à partir de son historique réel, prédit la prochaine sieste, affiche le chronomètre sur l'écran de verrouillage (Live Activity) et transforme les données en statistiques faciles à lire : cartes de sommeil, courbes de croissance selon la norme OMS et étapes par âge. Tout est pensé pour réduire la charge mentale — enregistrer prend moins de deux secondes.",
      },
      {
        heading: "Qui nous sommes",
        intro:
          "Buppi Baby est développé de façon indépendante au Brésil, par des parents, pour des parents. En plus de l'application, nous tenons un blog gratuit en quatre langues (portugais, anglais, espagnol et français) avec des guides pratiques sur le sommeil, l'alimentation, la santé et le développement de bébé — tous écrits à partir de sources comme l'Organisation mondiale de la Santé (OMS), l'American Academy of Pediatrics (AAP) et la Société brésilienne de pédiatrie (SBP).",
      },
      {
        heading: "Nos principes",
        items: [
          { bold: "Les preuves d'abord.", text: "Chaque guide du blog cite ses sources — pas d'approximation." },
          { bold: "Nous ne recommandons jamais de médicaments.", text: "Aucun contenu Buppi n'indique un médicament, une classe ou une dose. Cette décision appartient toujours au pédiatre." },
          { bold: "Confidentialité.", text: "Les données de votre bébé vous appartiennent. Nous ne vendons pas de données et n'affichons pas de publicité." },
          { bold: "Gratuit pour toujours.", text: "L'application est gratuite et le restera, avec toute la famille et sans limite de personnes. Seules quelques fonctions en plus font partie du Pro." },
        ],
      },
    ],
    contact: {
      heading: "Contactez-nous",
      text: "Questions, suggestions, presse ou partenariats :",
      email: "suporte@buppi.baby",
    },
  },
  privacy: {
    badge: "🔒 CONFIDENTIALITÉ",
    title: "Politique de Confidentialité",
    updated: "Dernière mise à jour : 26 novembre 2026",
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
            text: "Nom, date de naissance, sexe et la photo que vous choisissez",
          },
          {
            bold: "Photos :",
            text: "Votre photo de profil, celle du bébé et les photos jointes aux enregistrements (facultatif)",
          },
          {
            bold: "Enregistrements d'activités :",
            text: "Allaitement, sommeil, couches, alimentation, bain, croissance, température, médicaments, consultations et autres événements que vous enregistrez, y compris des informations de santé du bébé",
          },
          { bold: "Données de grossesse :", text: "Date prévue d’accouchement et ce que vous enregistrez pendant la grossesse, comme le poids, la tension, la glycémie, les symptômes, les examens, les consultations et les photos, y compris des informations de santé de la personne enceinte" },
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
          { text: "Conserver une sauvegarde de vos enregistrements sur notre serveur, pour tous les comptes (gratuits compris), afin de restaurer vos données et de changer d'appareil" },
          { text: "Synchroniser vos données entre appareils et entre les personnes de votre abonnement" },
          {
            text: "Permettre le partage avec d'autres soignants (lorsque vous l'autorisez)",
          },
          {
            text: "Améliorer notre application et développer de nouvelles fonctionnalités",
          },
          {
            text: "Calibrer les analyses de l'app (par exemple, les plages typiques de sommeil et d'alimentation par âge) à partir de données agrégées et anonymisées de tous les bébés. Aucun enregistrement individuel n'est exposé, vendu ou utilisé pour vous identifier, vous ou votre bébé",
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
            text: "D'autres soignants que vous invitez : les personnes de votre abonnement, qui enregistrent avec vous, et les observateurs, qui suivent seulement. Les deux voient les enregistrements du bébé, y compris ceux de santé. Vous choisissez qui inviter et pouvez révoquer l'accès à tout moment",
          },
          {
            text: "Des prestataires de service qui nous aident à exploiter l'app : Supabase (base de données et authentification), Cloudflare (stockage des photos), Google Cloud (notifications et statistiques d'usage), RevenueCat (abonnements), Sentry (rapports d'erreurs) et Expo (envoi de notifications)",
          },
          { text: "Meta (Facebook et Instagram), pour mesurer les publicités de Buppi : l’app indique à Meta qu’elle a été installée et ouverte et quand un abonnement est acheté, avec des informations techniques sur l’appareil (modèle, système, version de l’app, langue et fuseau horaire), ainsi que l’adresse IP de la connexion. Aucune donnée du bébé ou de la grossesse, aucun nom, e-mail ou photo n’est envoyé. Nous n’envoyons pas non plus l’identifiant publicitaire de l’appareil, et l’app ne demande pas d’autorisation de suivi" },
          { text: "Lorsque la loi l'exige" },
        ],
      },
      {
        heading: "4. Assistant IA (Buppi)",
        intro:
          "L'application propose un assistant optionnel utilisant l'intelligence artificielle pour répondre à vos questions sur votre bébé. Lorsque vous l'utilisez :",
        items: [
          {
            bold: "Ce qui est envoyé :",
            text: "Votre message et un contexte réduit du bébé (prénom, âge et les enregistrements nécessaires pour répondre à votre question)",
          },
          {
            bold: "Traitement :",
            text: "Les messages sont traités par Anthropic (modèle Claude), qui agit en tant que sous-traitant et n'utilise pas ces données pour entraîner ses modèles",
          },
          {
            bold: "Historique des conversations :",
            text: "Nous conservons les conversations afin d'améliorer la qualité et la sécurité de l'assistant. Vous pouvez en demander la suppression à tout moment via notre email de contact",
          },
          {
            bold: "Utilisation limitée :",
            text: "L'assistant est une ressource informative et éducative. Il ne pose aucun diagnostic et ne remplace pas l'avis de votre pédiatre",
          },
        ],
      },
      {
        heading: "5. Stockage et Sécurité",
        intro: "Vos données sont stockées de manière sécurisée en utilisant :",
        items: [
          {
            text: "Supabase (PostgreSQL) avec chiffrement en transit et au repos",
          },
          { text: "Authentification sécurisée via Google ou Apple" },
          {
            text: "Accès restreint aux utilisateurs autorisés via Row Level Security",
          },
          {
            text: "Photos dans un stockage privé (Cloudflare R2), jamais accessibles publiquement : chaque affichage passe par un lien signé et temporaire, généré uniquement pour les personnes ayant accès au bébé",
          },
        ],
      },
      {
        heading: "6. Vos Droits",
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
            bold: "Quitter",
            text: "un abonnement partagé ou cesser de suivre un bébé à tout moment",
          },
          {
            bold: "Révoquer",
            text: "l'accès des autres soignants à tout moment",
          },
        ],
      },
      {
        heading: "7. Données des Enfants",
        intro:
          "Buppi Baby est destiné aux parents et soignants adultes. Nous ne collectons pas intentionnellement d'informations d'enfants de moins de 13 ans en tant qu'utilisateurs de l'application. Les données des bébés sont fournies et contrôlées par les parents/tuteurs.",
      },
      {
        heading: "8. Cookies et Technologies Similaires",
        intro: "Nous utilisons des technologies de stockage local pour :",
        items: [
          { text: "Vous garder connecté" },
          { text: "Sauvegarder vos préférences" },
          { text: "Permettre le fonctionnement hors ligne" },
        ],
      },
      {
        heading: "9. Modifications de cette Politique",
        intro:
          "Nous pouvons mettre à jour cette politique de temps en temps. Nous vous informerons des changements importants via l'application ou par email.",
      },
    ],
    contact: {
      heading: "10. Contact",
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
        a: "Oui. Avec l'offre gratuite, un appareil à la fois : en vous connectant sur un nouvel appareil, vous y transférez votre compte et vos données sont restaurées. Les offres payantes gardent deux appareils synchronisés en temps réel.",
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
    updated: "Dernière mise à jour : 15 septembre 2026",
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
          { text: "Le paiement sera prélevé sur votre compte Apple ID ou Google Play à la confirmation de l'achat." },
          { text: "Les abonnements se renouvellent automatiquement sauf annulation au moins 24 heures avant la fin de la période en cours." },
          { text: "Vous pouvez gérer et annuler vos abonnements dans les paramètres de votre compte." },
        ],
      },
      {
        heading: "3. Comptes, Partage et Soignants",
        intro:
          "Les enregistrements du bébé sont fournis et contrôlés par le responsable légal qui a créé le profil. En invitant d'autres personnes — pour enregistrer ensemble (abonnement) ou seulement suivre (observateur) — vous déclarez avoir l'autorité de partager ces informations, y compris les données de santé du bébé, et vous êtes responsable des personnes invitées. Les données sont stockées sur notre serveur pour tous les comptes, avec sauvegarde, et peuvent être utilisées sous forme agrégée et anonymisée pour améliorer l'App, conformément à la Politique de Confidentialité.",
      },
      {
        heading: "4. Responsabilité",
        intro:
          "L'App et son contenu sont fournis par le Développeur. Apple Inc. n'est pas responsable de l'App, de son contenu ni d'aucun service de maintenance ou de support.",
      },
      {
        heading: "5. Maintenance et Support",
        intro:
          "Le Développeur est seul responsable de la maintenance et du support de l'App. Apple n'a aucune obligation de fournir des services de maintenance ou de support.",
      },
      {
        heading: "6. Garantie",
        intro:
          "L'App est fournie « EN L'ÉTAT » et « SELON DISPONIBILITÉ » sans garantie d'aucune sorte. Dans la mesure maximale permise par la loi, le Développeur décline toute garantie, expresse ou implicite.",
      },
      {
        heading: "7. Limitation de Responsabilité",
        intro:
          "Dans la mesure permise par la loi, le Développeur ne saurait être tenu responsable de dommages indirects, accessoires ou consécutifs découlant de l'utilisation de l'App.",
      },
      {
        heading: "8. Conformité Légale",
        intro:
          "Vous acceptez d'utiliser l'App en conformité avec toutes les lois et réglementations applicables.",
      },
      {
        heading: "9. Résiliation",
        intro:
          "Cette licence est valable jusqu'à sa résiliation. Vos droits prendront fin automatiquement si vous ne respectez pas les termes du présent Contrat.",
      },
      {
        heading: "10. Bénéficiaire Tiers",
        intro:
          "Apple Inc. et ses filiales sont des bénéficiaires tiers du présent Contrat et, dès votre acceptation, auront le droit de faire respecter ce Contrat à votre encontre.",
      },
      {
        heading: "11. Loi Applicable",
        intro: "Le présent Contrat est régi par les lois du Brésil.",
      },
    ],
    contact: {
      heading: "12. Contact",
      text: "Pour toute question, contactez-nous : ",
      email: "support@buppi.baby",
    },
  },
  blog: {
    title: "Blog",
    metaTitle: "Blog Buppi Baby : sommeil, allaitement et routine de bébé",
    description: "Contenu pratique sur la grossesse, le sommeil, l'alimentation et le développement du bébé.",
    readingTime: (minutes) => `${minutes} min de lecture`,
    publishedOn: "Publié le",
    updatedOn: "Mis à jour le",
    medicalDisclaimer: "Ce contenu est informatif et ne remplace pas l'avis du pédiatre. Chaque bébé est unique : en cas de doute sur la santé de votre enfant, consultez votre pédiatre ou un professionnel de santé.",
    backToBlog: "← Retour au blog",
    categoryLabel: "Catégorie",
    relatedPosts: "Articles connexes",
    empty: "Aucun article publié pour le moment.",
    faqHeading: "Questions fréquentes",
    referencesHeading: "Références",
    share: {
      heading: "Partager cet article",
      whatsapp: "Partager sur WhatsApp",
      x: "Partager sur X (Twitter)",
      mail: "Partager par e-mail",
      copyLink: "Copier le lien",
      linkCopied: "Lien copié !",
      native: "Plus d'options",
    },
  },
};
