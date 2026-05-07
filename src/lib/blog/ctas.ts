import type { BIconName } from "@/components/BIcon";
import type { Locale } from "@/i18n";

/* ─────────────────────────────────────────────────────────────
 * CTA registry — author drops <Cta id="..." /> in any MDX article
 * and gets a contextual app-download card right where they want it.
 *
 * To add a new CTA:
 *  1. add an entry to CTAS below (per-locale title/body/cta)
 *  2. that's it — articles can reference it immediately
 *
 * To rephrase or relink an existing CTA:
 *  - edit the entry once; every article that references it updates
 *
 * Validation runs in `npm run validate-blog` and fails the build
 * if any article references a CTA id that doesn't exist here.
 * ───────────────────────────────────────────────────────────── */

export type CtaVariant = "primary" | "secondary" | "accent";
export type CtaStyle = "compact" | "featured";

export type CtaContent = {
  /** Card headline. */
  title: string;
  /** 1-2 sentence body. */
  body: string;
  /** Button label. */
  cta: string;
};

export type CtaDef = {
  icon: BIconName;
  variant: CtaVariant;
  /** Default "compact". "featured" is bigger / more prominent. */
  style?: CtaStyle;
  /**
   * Optional override of the link target. Defaults to the locale-aware
   * "/#baixar" anchor (or "/{locale}/#baixar" for non-default locales).
   */
  href?: string;
  content: Record<Locale, CtaContent>;
};

export const CTAS = {
  // ── Sleep ───────────────────────────────────────────────────
  "sleep-windows": {
    icon: "moon",
    variant: "primary",
    content: {
      "pt-BR": {
        title: "Acerte a janela de sono — sem chute",
        body: "O Buppi observa o histórico do bebê e diz quando vem a próxima soneca, com base no ritmo dele.",
        cta: "Baixar grátis",
      },
      en: {
        title: "Hit the sleep window — no guesswork",
        body: "Buppi watches your baby's history and tells you when the next nap is coming, based on their actual rhythm.",
        cta: "Get Buppi free",
      },
      es: {
        title: "Acierta la ventana de sueño, sin adivinar",
        body: "Buppi observa el historial del bebé y te dice cuándo viene la próxima siesta, según su ritmo real.",
        cta: "Descargar gratis",
      },
      fr: {
        title: "Visez la bonne fenêtre de sommeil, sans deviner",
        body: "Buppi observe l'historique de bébé et vous dit quand la prochaine sieste arrive, selon son vrai rythme.",
        cta: "Télécharger gratuit",
      },
    },
  },
  "sleep-pediatrician": {
    icon: "bell",
    variant: "accent",
    content: {
      "pt-BR": {
        title: "Leve dados reais à consulta",
        body: "Em vez de tentar lembrar, mostre ao pediatra o gráfico das últimas semanas: horários, duração, despertares.",
        cta: "Baixar app",
      },
      en: {
        title: "Bring real data to the visit",
        body: "Instead of trying to remember, show the pediatrician the last few weeks at a glance — times, duration, wakings.",
        cta: "Get the app",
      },
      es: {
        title: "Lleva datos reales a la consulta",
        body: "En lugar de tratar de recordar, muéstrale al pediatra las últimas semanas en un gráfico: horarios, duración, despertares.",
        cta: "Descargar app",
      },
      fr: {
        title: "Apportez des données réelles à la consultation",
        body: "Plutôt que d'essayer de vous souvenir, montrez au pédiatre les dernières semaines en graphique : horaires, durée, réveils.",
        cta: "Télécharger l'app",
      },
    },
  },
  "sleep-routine": {
    icon: "sparkle",
    variant: "primary",
    content: {
      "pt-BR": {
        title: "Construa a rotina junto com o bebê",
        body: "Cada bebê é único. O Buppi aprende o ritmo do seu e ajuda você a chegar numa rotina que funciona — sem manual.",
        cta: "Comece grátis",
      },
      en: {
        title: "Build the routine with your baby",
        body: "Every baby is different. Buppi learns yours and helps you land on a routine that actually works — no playbook needed.",
        cta: "Start free",
      },
      es: {
        title: "Construye la rutina con tu bebé",
        body: "Cada bebé es único. Buppi aprende el ritmo del tuyo y te ayuda a encontrar una rutina que funciona — sin manual.",
        cta: "Empieza gratis",
      },
      fr: {
        title: "Construisez la routine avec bébé",
        body: "Chaque bébé est unique. Buppi apprend le rythme du vôtre et vous aide à trouver une routine qui marche — sans mode d'emploi.",
        cta: "Commencer gratuitement",
      },
    },
  },
  "sleep-regression": {
    icon: "chart-bar",
    variant: "secondary",
    content: {
      "pt-BR": {
        title: "É regressão ou só uma noite ruim?",
        body: "Compare a última semana com o mês anterior em segundos. O padrão fica claro — e a ansiedade diminui.",
        cta: "Baixar grátis",
      },
      en: {
        title: "Real regression — or just a rough night?",
        body: "Compare last week with the previous month in a glance. The pattern becomes clear — and so does the calm.",
        cta: "Get Buppi free",
      },
      es: {
        title: "¿Regresión o solo una mala noche?",
        body: "Compara la última semana con el mes anterior en segundos. El patrón se ve claro — y la ansiedad baja.",
        cta: "Descargar gratis",
      },
      fr: {
        title: "Vraie régression ou simple mauvaise nuit ?",
        body: "Comparez la dernière semaine au mois précédent en un coup d'œil. Le motif devient clair — et l'anxiété baisse.",
        cta: "Télécharger gratuit",
      },
    },
  },

  // ── Feeding ─────────────────────────────────────────────────
  "feeds-side-tracker": {
    icon: "heart-filled",
    variant: "secondary",
    content: {
      "pt-BR": {
        title: "Lembra qual seio começou da última vez",
        body: "Cronômetro com lados, alternância automática, Live Activity no bloqueio. Uma coisa a menos pra acompanhar de cabeça.",
        cta: "Baixar grátis",
      },
      en: {
        title: "Remembers which side started last",
        body: "Side-aware timer, auto-alternation, Live Activity on the lock screen. One less thing to keep in your head.",
        cta: "Get Buppi free",
      },
      es: {
        title: "Recuerda qué pecho empezó la última vez",
        body: "Cronómetro con lados, alternancia automática, Live Activity en el bloqueo. Una cosa menos en la cabeza.",
        cta: "Descargar gratis",
      },
      fr: {
        title: "Se souvient de quel sein a commencé",
        body: "Chronomètre par côté, alternance automatique, Live Activity sur l'écran verrouillé. Une chose en moins à mémoriser.",
        cta: "Télécharger gratuit",
      },
    },
  },
  "feeds-supply": {
    icon: "chart-bar",
    variant: "primary",
    content: {
      "pt-BR": {
        title: "Acompanhe se o bebê está mamando o suficiente",
        body: "Frequência, duração, intervalo entre mamadas — tudo em uma vista. Pra você ter dados quando a dúvida bate.",
        cta: "Baixar app",
      },
      en: {
        title: "See if your baby is feeding enough",
        body: "Frequency, duration, interval between feeds — all in one view. Real data the moment doubt hits.",
        cta: "Get the app",
      },
      es: {
        title: "Comprueba si el bebé está mamando lo suficiente",
        body: "Frecuencia, duración, intervalo entre tomas — todo en una vista. Datos reales cuando llega la duda.",
        cta: "Descargar app",
      },
      fr: {
        title: "Vérifiez si bébé prend assez",
        body: "Fréquence, durée, intervalle entre les tétées — tout en une vue. Des données concrètes quand le doute arrive.",
        cta: "Télécharger l'app",
      },
    },
  },
  "feeds-night-cluster": {
    icon: "bottle",
    variant: "secondary",
    content: {
      "pt-BR": {
        title: "Cluster feeding em paz, com tudo registrado",
        body: "Quando o bebê quer mamar de hora em hora à noite, o Buppi anota — e ajuda você a entender se é fase ou padrão.",
        cta: "Baixar grátis",
      },
      en: {
        title: "Cluster feeding without losing track",
        body: "When the baby wants to nurse every hour at night, Buppi keeps the log — so you can tell phase from pattern.",
        cta: "Get Buppi free",
      },
      es: {
        title: "Cluster feeding en paz, con todo registrado",
        body: "Cuando el bebé quiere mamar cada hora por la noche, Buppi anota — y te ayuda a saber si es fase o patrón.",
        cta: "Descargar gratis",
      },
      fr: {
        title: "Cluster feeding en paix, tout enregistré",
        body: "Quand bébé veut téter d'heure en heure la nuit, Buppi note — pour distinguer une phase d'un schéma.",
        cta: "Télécharger gratuit",
      },
    },
  },
  "feeds-bottle": {
    icon: "bottle",
    variant: "primary",
    content: {
      "pt-BR": {
        title: "Volume e horário no automático",
        body: "Mamadeira, fórmula, leite ordenhado — registre o volume com 1 toque e veja a média do dia/semana sem planilha.",
        cta: "Baixar app",
      },
      en: {
        title: "Bottle volumes, on autopilot",
        body: "Formula or expressed milk — log the volume in one tap and see daily/weekly averages without a spreadsheet.",
        cta: "Get the app",
      },
      es: {
        title: "Volumen y horario en automático",
        body: "Biberón, fórmula, leche extraída — registra el volumen con 1 toque y ve el promedio diario/semanal sin planilla.",
        cta: "Descargar app",
      },
      fr: {
        title: "Volumes de biberons en automatique",
        body: "Lait infantile ou tiré — enregistrez le volume en un toucher et voyez la moyenne quotidienne/hebdo sans tableur.",
        cta: "Télécharger l'app",
      },
    },
  },

  // ── Diaper ──────────────────────────────────────────────────
  "diaper-onetap": {
    icon: "diaper",
    variant: "accent",
    content: {
      "pt-BR": {
        title: "Uma fralda, um toque",
        body: "Xixi, cocô, mista — 2 segundos do desbloqueio até feito. E você vê quantas trocas foram feitas hoje, sempre.",
        cta: "Baixar grátis",
      },
      en: {
        title: "One diaper, one tap",
        body: "Pee, poo, mixed — 2 seconds from unlock to logged. And the day's count is always one glance away.",
        cta: "Get Buppi free",
      },
      es: {
        title: "Un pañal, un toque",
        body: "Pipí, caca, mixta — 2 segundos del desbloqueo a registrado. Y el conteo del día está siempre a la vista.",
        cta: "Descargar gratis",
      },
      fr: {
        title: "Une couche, un toucher",
        body: "Pipi, caca, mixte — 2 secondes entre déverrouillage et enregistré. Et le compte du jour est toujours visible.",
        cta: "Télécharger gratuit",
      },
    },
  },
  "diaper-health": {
    icon: "bell",
    variant: "accent",
    content: {
      "pt-BR": {
        title: "Quando a fralda fala da saúde",
        body: "Cor, frequência, consistência — registre tudo. Em qualquer mudança suspeita, você tem o histórico pra mostrar.",
        cta: "Baixar app",
      },
      en: {
        title: "When the diaper tells you something",
        body: "Color, frequency, consistency — log it all. If anything looks off, you've got the history ready to share.",
        cta: "Get the app",
      },
      es: {
        title: "Cuando el pañal habla de la salud",
        body: "Color, frecuencia, consistencia — regístralo todo. Ante cualquier cambio sospechoso, tienes el historial listo.",
        cta: "Descargar app",
      },
      fr: {
        title: "Quand la couche en dit long",
        body: "Couleur, fréquence, consistance — enregistrez tout. Au moindre changement suspect, vous avez l'historique prêt.",
        cta: "Télécharger l'app",
      },
    },
  },

  // ── Milestones ──────────────────────────────────────────────
  "milestones-keep": {
    icon: "star",
    variant: "primary",
    content: {
      "pt-BR": {
        title: "Cada conquista, com data e foto",
        body: "Sorriso, cabeça, primeiro passo — entre com a foto e a idade exata fica registrada pra sempre.",
        cta: "Baixar grátis",
      },
      en: {
        title: "Every milestone, dated and pictured",
        body: "First smile, head up, first step — drop in a photo and the exact age is locked in forever.",
        cta: "Get Buppi free",
      },
      es: {
        title: "Cada hito, con fecha y foto",
        body: "Primera sonrisa, levantar la cabeza, primer paso — sube la foto y la edad exacta queda guardada para siempre.",
        cta: "Descargar gratis",
      },
      fr: {
        title: "Chaque étape, datée et photographiée",
        body: "Premier sourire, tête levée, premier pas — ajoutez la photo et l'âge exact reste gravé.",
        cta: "Télécharger gratuit",
      },
    },
  },

  // ── Family / sharing ────────────────────────────────────────
  "family-realtime": {
    icon: "users",
    variant: "secondary",
    content: {
      "pt-BR": {
        title: "Família toda na mesma página, em tempo real",
        body: "Quando você troca uma fralda, todo mundo vê. Quando o pai dá mamadeira, todo mundo reage. Sem grupo de WhatsApp.",
        cta: "Baixar grátis",
      },
      en: {
        title: "The whole family on the same page, live",
        body: "When you change a diaper, everyone sees it. When dad gives the bottle, everyone reacts. No WhatsApp group.",
        cta: "Get Buppi free",
      },
      es: {
        title: "Toda la familia en la misma página, en tiempo real",
        body: "Cuando cambias un pañal, todos lo ven. Cuando papá da el biberón, todos reaccionan. Sin grupo de WhatsApp.",
        cta: "Descargar gratis",
      },
      fr: {
        title: "Toute la famille à la page, en direct",
        body: "Quand vous changez une couche, tout le monde le voit. Quand papa donne le biberon, tout le monde réagit. Sans groupe WhatsApp.",
        cta: "Télécharger gratuit",
      },
    },
  },
  "family-grandparents": {
    icon: "heart",
    variant: "secondary",
    content: {
      "pt-BR": {
        title: "Pra avós que querem participar de longe",
        body: "Mesmo a quilômetros, eles veem cada soneca, cada mamada, cada conquista nova. E reagem com um coração.",
        cta: "Baixar app",
      },
      en: {
        title: "For grandparents who want to be there from afar",
        body: "Even from kilometers away, they see every nap, every feed, every new milestone. And react with a heart.",
        cta: "Get the app",
      },
      es: {
        title: "Para abuelos que quieren participar desde lejos",
        body: "Incluso a kilómetros, ven cada siesta, cada toma, cada hito nuevo. Y reaccionan con un corazón.",
        cta: "Descargar app",
      },
      fr: {
        title: "Pour les grands-parents qui veulent suivre à distance",
        body: "Même à des kilomètres, ils voient chaque sieste, chaque tétée, chaque nouvelle étape. Et réagissent d'un cœur.",
        cta: "Télécharger l'app",
      },
    },
  },

  // ── Health / symptoms ───────────────────────────────────────
  "health-symptoms": {
    icon: "bell",
    variant: "accent",
    content: {
      "pt-BR": {
        title: "Sintomas registrados, padrões revelados",
        body: "Cólica, refluxo, alergia — anote os episódios em segundos. Em duas semanas o Buppi mostra o padrão. Útil pra consulta.",
        cta: "Baixar grátis",
      },
      en: {
        title: "Logged symptoms, revealed patterns",
        body: "Colic, reflux, allergies — log episodes in seconds. In two weeks Buppi shows the pattern. Useful for the next visit.",
        cta: "Get Buppi free",
      },
      es: {
        title: "Síntomas registrados, patrones revelados",
        body: "Cólico, reflujo, alergia — anota los episodios en segundos. En dos semanas Buppi muestra el patrón. Útil para la consulta.",
        cta: "Descargar gratis",
      },
      fr: {
        title: "Symptômes notés, schémas révélés",
        body: "Coliques, reflux, allergie — notez les épisodes en quelques secondes. En deux semaines, Buppi montre le motif. Utile pour la consultation.",
        cta: "Télécharger gratuit",
      },
    },
  },

  // ── Generic ─────────────────────────────────────────────────
  download: {
    icon: "bolt",
    variant: "primary",
    style: "featured",
    content: {
      "pt-BR": {
        title: "Comece grátis. Sem login, sem cartão",
        body: "Registro completo (sono, mama, fralda, marcos), linha do tempo e estatísticas básicas — local, no seu aparelho.",
        cta: "Baixar Buppi",
      },
      en: {
        title: "Start free. No login, no card",
        body: "Full event logging (sleep, feeds, diapers, milestones), timeline and basic stats — local, on your device.",
        cta: "Get Buppi",
      },
      es: {
        title: "Empieza gratis. Sin login, sin tarjeta",
        body: "Registro completo (sueño, tomas, pañales, hitos), línea de tiempo y estadísticas básicas — local, en tu dispositivo.",
        cta: "Descargar Buppi",
      },
      fr: {
        title: "Commencez gratuitement. Sans login, sans carte",
        body: "Enregistrement complet (sommeil, tétées, couches, étapes), chronologie et statistiques basiques — local, sur votre appareil.",
        cta: "Télécharger Buppi",
      },
    },
  },
} satisfies Record<string, CtaDef>;

export type CtaId = keyof typeof CTAS;

export const CTA_IDS = Object.keys(CTAS) as CtaId[];

export function getCta(id: string): CtaDef | undefined {
  return (CTAS as Record<string, CtaDef>)[id];
}
