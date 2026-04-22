import type { Messages } from "../types";

export const es: Messages = {
  meta: {
    title: "Buppi Baby — Cuidado Completo para tu Bebé",
    description:
      "Registra el sueño, la lactancia, los pañales y los hitos del desarrollo de tu bebé. Simple, bonito y gratis.",
    ogTitle: "Buppi Baby",
    ogDescription:
      "La mejor app para seguir la rutina de tu bebé. Lactancia, sueño, pañales e hitos en un solo lugar.",
  },
  nav: {
    features: "Funcionalidades",
    sharing: "Compartir",
    stats: "Estadísticas",
    download: "Descargar app",
    themeAria: "Cambiar tema",
    languageAria: "Cambiar idioma",
    theme: { light: "Claro", dark: "Oscuro", system: "Sistema" },
  },
  hero: {
    badge: "✨ CUIDADO 360 PARA TU BEBÉ",
    titlePrefix: "La mejor app para seguir la ",
    titleHighlight: "rutina",
    titleSuffix: " de tu bebé!",
    description:
      "Simplifica la maternidad y la paternidad. Registra lactancia, sueño, pañales y mucho más en un solo lugar.",
    badgesNote: "Gratis para empezar • iOS y Android",
    imageAlt: "Bebé sonriendo",
    card: { tag: "TARDE", title: "Lactancia", subtitle: "Izquierdo • 44min" },
  },
  features: {
    title: "Todo lo que necesitas registrar",
    description:
      "Desde el primer día, sigue cada detalle del recorrido de tu pequeño con tarjetas intuitivas y una línea de tiempo organizada.",
    timeline: [
      {
        title: "Lactancia",
        subtitle: "Derecho • 26min",
        time: "17:50 - 18:16",
        tag: "ahora",
      },
      {
        title: "Lactancia",
        subtitle: "Izquierdo • 44min",
        time: "16:13 - 16:57",
        tag: "hace 1h",
      },
      {
        title: "Cambio de pañal",
        subtitle: "Pipí",
        time: "16:10",
        tag: "hace 2h",
      },
      {
        title: "Sueño",
        subtitle: "Duración: 3h 26min",
        time: "12:35 - 16:01",
        tag: "hace 2h",
      },
    ],
    cards: [
      { title: "Baño", subtitle: "Higiene diaria" },
      { title: "Vacunas", subtitle: "Calendario al día" },
      { title: "Medicamentos", subtitle: "Recordatorios y dosis" },
      { title: "Paseos", subtitle: "Aire libre" },
    ],
  },
  sharing: {
    title: "Toda la familia conectada",
    description:
      "Comparte los registros con tu pareja, abuelos o cuidadores en tiempo real. Cada persona puede tener su propio perfil y seguir la evolución del bebé.",
    bullets: [
      "Múltiples perfiles de bebés",
      "Sincronización instantánea en la nube",
      "Invitaciones rápidas por código o enlace",
    ],
    card: {
      title: "Mis Bebés",
      activeName: "María Clara",
      activeDob: "17 de diciembre de 2024",
      sharedName: "Caio",
      sharedTag: "Compartido",
      inviteTitle: "Usar código de invitación",
      inviteSubtitle: "¿Tienes un código? Ingresa aquí",
    },
  },
  stats: {
    title: "Gráficos que cuentan historias",
    description:
      "Entiende los patrones de sueño, alimentación y desarrollo de tu bebé a través de estadísticas detalladas y fáciles de leer.",
    sleep: {
      title: "Resumen de Sueño",
      avgValue: "2h 44m",
      avgLabel: "Promedio diario",
      totalValue: "10",
      totalLabel: "Total de siestas",
      compareLabel: "Nocturno vs Diurno",
      night: "Nocturno: 44%",
      day: "Diurno: 56%",
    },
    diaper: {
      title: "Cambios de pañal",
      legend: [
        { label: "4 Pipí", pct: "44%" },
        { label: "1 Caca", pct: "12%" },
        { label: "4 Ambos", pct: "44%" },
      ],
    },
  },
  cta: {
    title: "¿Listo para empezar?",
    description:
      "Únete a miles de familias que han transformado la rutina de cuidados en un momento de tranquilidad.",
  },
  footer: {
    description:
      "La aplicación más completa e intuitiva para seguir el desarrollo de tu bebé. Hecha por padres para padres.",
    quickLinks: "Enlaces rápidos",
    home: "Inicio",
    privacy: "Privacidad",
    terms: "Términos",
    support: "Soporte",
    deleteAccount: "Eliminar cuenta",
    copyright: "© 2026 Buppi Baby. Todos los derechos reservados.",
  },
  privacy: {
    badge: "🔒 PRIVACIDAD",
    title: "Política de Privacidad",
    updated: "Última actualización: 12 de febrero de 2026",
    intro:
      "Tu privacidad es importante para nosotros. Esta Política de Privacidad explica cómo Buppi Baby recopila, usa y protege tu información personal.",
    sections: [
      {
        heading: "1. Información que Recopilamos",
        intro: "Recopilamos la siguiente información cuando usas Buppi Baby:",
        items: [
          {
            bold: "Información de la cuenta:",
            text: "Email y nombre (cuando creas una cuenta)",
          },
          {
            bold: "Datos del bebé:",
            text: "Nombre, fecha de nacimiento, género",
          },
          {
            bold: "Registros de actividades:",
            text: "Lactancia, sueño, pañales, alimentación y otros eventos que registras",
          },
          {
            bold: "Datos de uso:",
            text: "Cómo interactúas con la aplicación",
          },
        ],
      },
      {
        heading: "2. Cómo Usamos tu Información",
        intro: "Usamos tu información para:",
        items: [
          { text: "Proporcionar y mantener el servicio de la aplicación" },
          { text: "Sincronizar tus datos entre dispositivos" },
          {
            text: "Permitir el compartir con otros cuidadores (cuando lo autorizas)",
          },
          {
            text: "Mejorar nuestra aplicación y desarrollar nuevas funciones",
          },
          {
            text: "Enviar notificaciones relacionadas con la app (recordatorios, etc.)",
          },
        ],
      },
      {
        heading: "3. Compartir Datos",
        intro:
          "No vendemos tu información personal. Solo compartimos datos:",
        items: [
          { text: "Con otros cuidadores que invites a seguir a tu bebé" },
          {
            text: "Con proveedores de servicio que nos ayudan a operar la app (Supabase, Google Cloud)",
          },
          { text: "Cuando lo exija la ley" },
        ],
      },
      {
        heading: "4. Almacenamiento y Seguridad",
        intro: "Tus datos se almacenan de forma segura usando:",
        items: [
          {
            text: "Supabase (PostgreSQL) con cifrado en tránsito y en reposo",
          },
          { text: "Autenticación segura vía Google o Apple" },
          {
            text: "Acceso restringido solo a usuarios autorizados vía Row Level Security",
          },
        ],
      },
      {
        heading: "5. Tus Derechos",
        intro: "Tienes derecho a:",
        items: [
          { bold: "Acceder", text: "a tus datos personales" },
          { bold: "Corregir", text: "información inexacta" },
          { bold: "Eliminar", text: "tu cuenta y todos los datos asociados" },
          { bold: "Exportar", text: "tus datos en un formato legible" },
          {
            bold: "Revocar",
            text: "el acceso de otros cuidadores en cualquier momento",
          },
        ],
      },
      {
        heading: "6. Datos de Niños",
        intro:
          "Buppi Baby está destinado a padres y cuidadores adultos. No recopilamos intencionalmente información de niños menores de 13 años como usuarios de la app. Los datos del bebé son proporcionados y controlados por los padres/responsables.",
      },
      {
        heading: "7. Cookies y Tecnologías Similares",
        intro: "Usamos tecnologías de almacenamiento local para:",
        items: [
          { text: "Mantenerte conectado" },
          { text: "Guardar tus preferencias" },
          { text: "Permitir el funcionamiento sin conexión" },
        ],
      },
      {
        heading: "8. Cambios en esta Política",
        intro:
          "Podemos actualizar esta política periódicamente. Te notificaremos sobre cambios significativos a través de la app o por email.",
      },
    ],
    contact: {
      heading: "9. Contacto",
      text: "Para preguntas sobre privacidad o para ejercer tus derechos, escríbenos a ",
      email: "privacy@buppi.baby",
    },
  },
  support: {
    badge: "💬 SOPORTE",
    title: "Centro de Soporte",
    intro: {
      before:
        "¿Necesitas ayuda? Estamos aquí. Para preguntas, sugerencias o para reportar problemas, escríbenos a ",
      emailLabel: "support@buppi.baby",
      after: ".",
    },
    faqHeading: "Preguntas Frecuentes",
    faq: [
      {
        q: "¿Cómo comparto el bebé con mi pareja?",
        a: "Ve a Ajustes → Compartir Bebé y envía el código de 6 dígitos.",
      },
      {
        q: "¿Mis datos están seguros?",
        a: "¡Sí! Usamos Supabase con cifrado en tránsito y en reposo, y tus datos son privados vía Row Level Security.",
      },
      {
        q: "¿Puedo usarlo en más de un dispositivo?",
        a: "Sí, inicia sesión con la misma cuenta y todo se sincroniza automáticamente.",
      },
      {
        q: "¿La app funciona sin conexión?",
        a: "¡Sí! Los registros se guardan localmente y se sincronizan cuando hay internet.",
      },
    ],
  },
  deleteAccount: {
    badge: "🗑️ ELIMINAR CUENTA",
    title: "Eliminar tu cuenta de Buppi Baby",
    updated: "Última actualización: 19 de abril de 2026",
    intro:
      "Puedes solicitar la eliminación de tu cuenta de Buppi Baby en cualquier momento. Esta página explica cómo solicitar la eliminación y qué datos se eliminan o se conservan.",
    sections: [
      {
        heading: "1. Eliminar desde la app (recomendado)",
        intro:
          "La forma más rápida es directamente en la app. La eliminación se procesa de inmediato:",
        items: [
          { text: "Abre la aplicación Buppi Baby" },
          { text: "Ve a Ajustes" },
          { text: 'Desplázate hasta el final y toca "Eliminar cuenta"' },
          { text: "Confirma la eliminación en el diálogo" },
        ],
      },
      {
        heading: "2. Eliminar por email (alternativa)",
        intro:
          'Si ya no tienes acceso a la app, envía un email al correo de abajo con el asunto "Eliminar mi cuenta". Incluye el email asociado a tu cuenta para que podamos identificarla. Procesamos las solicitudes por email en hasta 7 días hábiles.',
      },
      {
        heading: "3. Datos que se eliminarán",
        intro:
          "Al eliminar tu cuenta, eliminamos permanentemente los siguientes datos:",
        items: [
          { bold: "Cuenta:", text: "email, nombre, foto de perfil" },
          {
            bold: "Perfiles de bebés:",
            text: "nombre, fecha de nacimiento, género y foto",
          },
          {
            bold: "Eventos registrados:",
            text: "lactancia, sueño, pañales, alimentación, baño, medicamentos y todos los demás tipos",
          },
          {
            bold: "Cronogramas y preferencias:",
            text: "recordatorios, eventos programados y configuraciones personales",
          },
          {
            bold: "Compartir:",
            text: "las invitaciones enviadas o recibidas se revocan; otros cuidadores pierden acceso a tus bebés",
          },
          {
            bold: "Tokens de notificación:",
            text: "los dispositivos registrados para notificaciones push se eliminan",
          },
        ],
      },
      {
        heading: "4. Datos que conservamos por un período",
        intro:
          "Por exigencia legal y por motivos de seguridad, se retienen algunos registros mínimos:",
        items: [
          {
            bold: "Copias de seguridad de la base de datos:",
            text: "pueden contener copias de tus datos hasta 30 días después de la eliminación. Después de ese período se borran definitivamente.",
          },
          {
            bold: "Registros de auditoría:",
            text: "registros mínimos (ej. fecha de eliminación, IP, evento de seguridad) se mantienen hasta 90 días para prevención de fraude y abuso. No contienen datos del bebé.",
          },
          {
            bold: "Registros de pago:",
            text: "si tuviste una suscripción de pago, los datos fiscales necesarios para cumplir con obligaciones tributarias se conservan por el período exigido por la ley aplicable (hasta 5 años).",
          },
        ],
      },
      {
        heading: "5. Tiempo de procesamiento",
        intro:
          "Las eliminaciones desde la app se procesan de inmediato. Las solicitudes por email se procesan en hasta 7 días hábiles. Recibirás una confirmación por email cuando se complete.",
      },
      {
        heading: "6. Esta acción no se puede deshacer",
        intro:
          "Antes de eliminar, considera exportar tus datos. Después de la eliminación, no es posible recuperar ni el historial, ni el acceso compartido de los cuidadores invitados.",
      },
    ],
    contact: {
      heading: "7. Contacto",
      text: "Para solicitar la eliminación por email o para preguntas, escríbenos a ",
      email: "privacy@buppi.baby",
    },
  },
  terms: {
    badge: "📜 EULA",
    title: "Acuerdo de Licencia de Usuario Final",
    updated: "Última actualización: 22 de abril de 2026",
    intro:
      "Este Acuerdo de Licencia de Usuario Final (\"Acuerdo\") es un acuerdo legal entre usted (\"Usuario\") y Buppi (\"Desarrollador\") que rige el uso de la aplicación móvil Buppi (\"App\").",
    sections: [
      {
        heading: "1. Licencia",
        intro:
          "La App se le otorga bajo licencia, no se vende. El Desarrollador le concede una licencia limitada, no exclusiva, intransferible y revocable para usar la App con fines personales y no comerciales, sujeta a este Acuerdo.",
      },
      {
        heading: "2. Suscripciones",
        intro: "La App puede ofrecer suscripciones con renovación automática.",
        items: [
          { text: "El pago se cargará a su cuenta de Apple ID al confirmar la compra." },
          { text: "Las suscripciones se renuevan automáticamente a menos que se cancelen al menos 24 horas antes del final del período vigente." },
          { text: "Puede gestionar y cancelar suscripciones en la configuración de su cuenta." },
        ],
      },
      {
        heading: "3. Responsabilidad",
        intro:
          "La App y su contenido son proporcionados por el Desarrollador. Apple Inc. no es responsable de la App, su contenido ni de ningún servicio de mantenimiento o soporte.",
      },
      {
        heading: "4. Mantenimiento y Soporte",
        intro:
          "El Desarrollador es el único responsable de proporcionar mantenimiento y soporte para la App. Apple no tiene ninguna obligación de proporcionar servicios de mantenimiento o soporte.",
      },
      {
        heading: "5. Garantía",
        intro:
          "La App se proporciona \"TAL CUAL\" y \"SEGÚN DISPONIBILIDAD\" sin garantías de ningún tipo. En la máxima medida permitida por la ley, el Desarrollador renuncia a todas las garantías, ya sean expresas o implícitas.",
      },
      {
        heading: "6. Limitación de Responsabilidad",
        intro:
          "En la medida permitida por la ley, el Desarrollador no será responsable de ningún daño indirecto, incidental o consecuente que surja del uso de la App.",
      },
      {
        heading: "7. Cumplimiento Legal",
        intro:
          "Usted acepta usar la App de conformidad con todas las leyes y regulaciones aplicables.",
      },
      {
        heading: "8. Terminación",
        intro:
          "Esta licencia es efectiva hasta su terminación. Sus derechos se rescindirán automáticamente si incumple cualquier término de este Acuerdo.",
      },
      {
        heading: "9. Beneficiario Tercero",
        intro:
          "Apple Inc. y sus filiales son beneficiarias terceras de este Acuerdo y, al aceptar este Acuerdo, tendrán el derecho de hacer cumplir este Acuerdo en su contra.",
      },
      {
        heading: "10. Ley Aplicable",
        intro: "Este Acuerdo se rige por las leyes de Brasil.",
      },
    ],
    contact: {
      heading: "11. Contacto",
      text: "Si tiene alguna pregunta, contáctenos: ",
      email: "support@buppi.baby",
    },
  },
};
