import type { Messages } from "../types";
import { storyEs } from "./story/es";

export const es: Messages = {
  meta: {
    title: "Buppi Baby — Cuidado Completo para tu Bebé",
    description:
      "Acompaña tu embarazo semana a semana y, después, el sueño, la lactancia, los pañales y los hitos de tu bebé. Simple, bonito y gratis.",
    ogTitle: "Buppi Baby",
    ogDescription:
      "Del embarazo al primer año: semana a semana, control prenatal, lactancia, sueño, pañales e hitos en un solo lugar.",
  },
  nav: {
    features: "Funcionalidades",
    sharing: "Familia",
    stats: "Estadísticas",
    blog: "Blog",
    tools: "Herramientas",
    download: "Descargar gratis",
    downloadShort: "Descargar",
    signIn: "Iniciar sesión",
    themeAria: "Cambiar tema",
    languageAria: "Cambiar idioma",
    searchAria: "Buscar en el blog",
    theme: { light: "Claro", dark: "Oscuro", system: "Sistema" },
  },
  search: {
    placeholder: "Buscar artículos…",
    hint: "Escribe para buscar en los artículos del blog.",
    empty: "Sin resultados para",
    resultsAria: "Resultados de la búsqueda",
    close: "Cerrar búsqueda",
    unavailable:
      "La búsqueda está disponible en el sitio publicado (necesita el build de producción).",
  },
  blogTeaser: {
    tag: "DEL BLOG",
    title: "Aprende mientras cuidas",
    description:
      "Guías prácticas sobre sueño, alimentación, desarrollo y salud — escritas a partir de fuentes confiables.",
    viewAll: "Ver todos los artículos",
  },
  tools: {
    badge: "Herramientas",
    title: "Herramientas para el día a día",
    description:
      "Calculadoras simples y confiables para las dudas más comunes — basadas en fuentes oficiales, siempre remitiendo al pediatra.",
    open: "Abrir",
    relatedArticle: "Lee la guía completa",
    backToTools: "Todas las herramientas",
  },
  faq: {
    tag: "FAQ",
    title: "Preguntas de quien acaba de llegar",
    items: [
      { q: "¿De verdad es gratis? ¿Tiene truco?", a: "Es gratis y lo seguirá siendo. Registrar, cronometrar, consultar todo el historial, ver las estadísticas y compartir con la familia no cuesta nada, sin anuncios y sin límite de tiempo. Solo algunas funciones extra forman parte de Pro, como el análisis de sueño completo y los widgets." },
      { q: "¿Puedo empezar durante el embarazo?", a: "Sí. Indicas la fecha probable de parto y Buppi acompaña semana a semana, con el control prenatal y las herramientas de la recta final. Cuando nace el bebé, un toque en “¡Nació!” abre el seguimiento del bebé, sin perder nada del embarazo." },
      { q: "¿Funciona sin internet?", a: "Sí. Todo se guarda primero en el teléfono y se sincroniza solo cuando vuelve la conexión." },
      { q: "¿Quién ve los datos de mi bebé?", a: "Solo quien tú invites, con el papel que elijas. En el embarazo, los datos de la persona embarazada son suyos: ella decide qué ve la familia. Puedes exportar o borrar todo cuando quieras." },
      { q: "¿Sirve para iPhone y Android?", a: "Para los dos, y conviven: una persona en iPhone y otra en Android ven la misma rutina." },
    ],
  },
  story: storyEs,
  footer: {
    description:
      "La aplicación más completa e intuitiva para seguir el desarrollo de tu bebé. Hecha por padres para padres.",
    quickLinks: "Enlaces rápidos",
    home: "Inicio",
    about: "Acerca de",
    privacy: "Privacidad",
    terms: "Términos",
    support: "Soporte",
    deleteAccount: "Eliminar cuenta",
    copyright: "© 2026 Buppi Baby. Todos los derechos reservados.",
  },
  about: {
    badge: "Acerca de",
    title: "Acerca de Buppi Baby",
    updated: "Actualizado en septiembre de 2026",
    intro:
      "Buppi Baby es una aplicación gratuita para iOS y Android que ayuda a madres, padres y cuidadores a acompañar la rutina del bebé — sueño, lactancia, biberones, pañales, salud, crecimiento e hitos — con registros de un toque, sincronizados entre todas las personas que cuidan al mismo niño.",
    sections: [
      {
        heading: "Qué hacemos",
        intro:
          "La app aprende el ritmo de tu bebé observando su historial real de registros y predice la próxima siesta, muestra el cronómetro en la pantalla de bloqueo (Live Activity) y convierte los datos en estadísticas fáciles de leer: mapas de sueño, curvas de crecimiento según el estándar de la OMS e hitos por edad. Todo diseñado para reducir la carga mental de quien cuida — registrar toma menos de dos segundos.",
      },
      {
        heading: "Quiénes somos",
        intro:
          "Buppi Baby se desarrolla de forma independiente en Brasil, por padres y para padres. Además de la app, mantenemos un blog gratuito en cuatro idiomas (portugués, inglés, español y francés) con guías prácticas sobre sueño, alimentación, salud y desarrollo del bebé — todas escritas a partir de fuentes como la Organización Mundial de la Salud (OMS), la Academia Americana de Pediatría (AAP) y la Sociedad Brasileña de Pediatría (SBP).",
      },
      {
        heading: "Nuestros principios",
        items: [
          { bold: "La evidencia primero.", text: "Cada guía del blog cita las fuentes en las que se basa — nada de suposiciones." },
          { bold: "Nunca recomendamos medicamentos.", text: "Ningún contenido de Buppi indica un medicamento, clase o dosis. Esa decisión siempre es del pediatra." },
          { bold: "Privacidad.", text: "Los datos de tu bebé te pertenecen. No vendemos datos ni mostramos anuncios." },
          { bold: "Gratis para siempre.", text: "La app es gratis y lo seguirá siendo, con toda la familia y sin límite de personas. Solo algunas funciones extra son parte del Pro." },
        ],
      },
    ],
    contact: {
      heading: "Habla con nosotros",
      text: "Dudas, sugerencias, prensa o alianzas:",
      email: "suporte@buppi.baby",
    },
  },
  privacy: {
    badge: "🔒 PRIVACIDAD",
    title: "Política de Privacidad",
    updated: "Última actualización: 26 de noviembre de 2026",
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
            text: "Nombre, fecha de nacimiento, género y la foto que elijas",
          },
          {
            bold: "Fotos:",
            text: "Tu foto de perfil, la del bebé y fotos adjuntas a registros (opcional)",
          },
          {
            bold: "Registros de actividades:",
            text: "Lactancia, sueño, pañales, alimentación, baño, crecimiento, temperatura, medicamentos, consultas y otros eventos que registras, incluida información de salud del bebé",
          },
          { bold: "Datos del embarazo:", text: "Fecha probable de parto y lo que registres durante el embarazo, como peso, presión, glucosa, síntomas, exámenes, consultas y fotos, incluida información de salud de la persona embarazada" },
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
          { text: "Guardar una copia de seguridad de tus registros en el servidor, para todas las cuentas (incluidas las gratuitas), para restaurar datos y cambiar de dispositivo" },
          { text: "Sincronizar tus datos entre dispositivos y entre las personas de tu plan" },
          {
            text: "Permitir el compartir con otros cuidadores (cuando lo autorizas)",
          },
          {
            text: "Mejorar nuestra aplicación y desarrollar nuevas funciones",
          },
          {
            text: "Calibrar los análisis de la app (por ejemplo, rangos típicos de sueño y alimentación por edad) usando datos agregados y anonimizados de todos los bebés. Ningún registro individual se expone, se vende ni se usa para identificarte a ti o a tu bebé",
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
          { text: "Con otros cuidadores que invites: personas de tu plan, que registran contigo, y visualizadores, que solo siguen. Ambos ven los registros del bebé, incluidos los de salud. Tú eliges a quién invitas y puedes revocar el acceso en cualquier momento" },
          {
            text: "Con proveedores de servicio que nos ayudan a operar la app: Supabase (base de datos y autenticación), Cloudflare (almacenamiento de fotos), Google Cloud (notificaciones y análisis de uso), RevenueCat (suscripciones), Sentry (informes de errores) y Expo (envío de notificaciones)",
          },
          { text: "Con Meta (Facebook e Instagram), para medir los anuncios de Buppi: la app informa a Meta de que fue instalada y abierta y de cuándo se compra una suscripción, junto con información técnica del dispositivo (modelo, sistema, versión de la app, idioma y zona horaria), además de la dirección IP de la conexión. No se envía ningún registro del bebé o del embarazo, nombre, correo ni foto. Tampoco enviamos el identificador de publicidad del dispositivo, y la app no pide permiso de rastreo" },
          { text: "Cuando lo exija la ley" },
        ],
      },
      {
        heading: "4. Asistente de IA (Buppi)",
        intro:
          "La aplicación ofrece un asistente opcional con inteligencia artificial para resolver dudas sobre tu bebé. Al usarlo:",
        items: [
          {
            bold: "Qué se envía:",
            text: "Tu mensaje y un contexto reducido del bebé (nombre, edad y los registros necesarios para responder a tu pregunta)",
          },
          {
            bold: "Procesamiento:",
            text: "Los mensajes son procesados por Anthropic (modelo Claude), que actúa como encargado del tratamiento y no utiliza estos datos para entrenar sus modelos",
          },
          {
            bold: "Historial de conversaciones:",
            text: "Guardamos las conversaciones para mejorar la calidad y la seguridad del asistente. Puedes solicitar su eliminación en cualquier momento por el correo de contacto",
          },
          {
            bold: "Uso limitado:",
            text: "El asistente es un recurso informativo y educativo. No realiza diagnósticos ni sustituye la orientación del pediatra",
          },
        ],
      },
      {
        heading: "5. Almacenamiento y Seguridad",
        intro: "Tus datos se almacenan de forma segura usando:",
        items: [
          {
            text: "Supabase (PostgreSQL) con cifrado en tránsito y en reposo",
          },
          { text: "Autenticación segura vía Google o Apple" },
          {
            text: "Acceso restringido solo a usuarios autorizados vía Row Level Security",
          },
          {
            text: "Fotos en almacenamiento privado (Cloudflare R2), nunca accesibles públicamente: cada visualización usa un enlace firmado y temporal, generado solo para quien tiene acceso al bebé",
          },
        ],
      },
      {
        heading: "6. Tus Derechos",
        intro: "Tienes derecho a:",
        items: [
          { bold: "Acceder", text: "a tus datos personales" },
          { bold: "Corregir", text: "información inexacta" },
          { bold: "Eliminar", text: "tu cuenta y todos los datos asociados" },
          { bold: "Exportar", text: "tus datos en un formato legible" },
          {
            bold: "Salir",
            text: "de un plan compartido o dejar de seguir a un bebé en cualquier momento",
          },
          {
            bold: "Revocar",
            text: "el acceso de otros cuidadores en cualquier momento",
          },
        ],
      },
      {
        heading: "7. Datos de Niños",
        intro:
          "Buppi Baby está destinado a padres y cuidadores adultos. No recopilamos intencionalmente información de niños menores de 13 años como usuarios de la app. Los datos del bebé son proporcionados y controlados por los padres/responsables.",
      },
      {
        heading: "8. Cookies y Tecnologías Similares",
        intro: "Usamos tecnologías de almacenamiento local para:",
        items: [
          { text: "Mantenerte conectado" },
          { text: "Guardar tus preferencias" },
          { text: "Permitir el funcionamiento sin conexión" },
        ],
      },
      {
        heading: "9. Cambios en esta Política",
        intro:
          "Podemos actualizar esta política periódicamente. Te notificaremos sobre cambios significativos a través de la app o por email.",
      },
    ],
    contact: {
      heading: "10. Contacto",
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
        a: "Sí. En el plan gratuito, un dispositivo a la vez: al entrar en uno nuevo, transfieres tu cuenta y los datos se restauran. En los planes de pago, dos dispositivos sincronizan en tiempo real.",
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
    updated: "Última actualización: 15 de septiembre de 2026",
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
          { text: "El pago se cargará a su cuenta de Apple ID o de Google Play al confirmar la compra." },
          { text: "Las suscripciones se renuevan automáticamente a menos que se cancelen al menos 24 horas antes del final del período vigente." },
          { text: "Puede gestionar y cancelar suscripciones en la configuración de su cuenta." },
        ],
      },
      {
        heading: "3. Cuentas, Compartición y Cuidadores",
        intro:
          "Los registros del bebé los proporciona y controla el responsable legal que creó el perfil. Al invitar a otras personas — para registrar juntos (plan) o solo para seguir (visualizador) — declaras tener autoridad para compartir esa información, incluidos datos de salud del bebé, y eres responsable de a quién invitas. Los datos se almacenan en el servidor para todas las cuentas, con copia de seguridad, y pueden usarse de forma agregada y anonimizada para mejorar la App, según la Política de Privacidad.",
      },
      {
        heading: "4. Responsabilidad",
        intro:
          "La App y su contenido son proporcionados por el Desarrollador. Apple Inc. no es responsable de la App, su contenido ni de ningún servicio de mantenimiento o soporte.",
      },
      {
        heading: "5. Mantenimiento y Soporte",
        intro:
          "El Desarrollador es el único responsable de proporcionar mantenimiento y soporte para la App. Apple no tiene ninguna obligación de proporcionar servicios de mantenimiento o soporte.",
      },
      {
        heading: "6. Garantía",
        intro:
          "La App se proporciona \"TAL CUAL\" y \"SEGÚN DISPONIBILIDAD\" sin garantías de ningún tipo. En la máxima medida permitida por la ley, el Desarrollador renuncia a todas las garantías, ya sean expresas o implícitas.",
      },
      {
        heading: "7. Limitación de Responsabilidad",
        intro:
          "En la medida permitida por la ley, el Desarrollador no será responsable de ningún daño indirecto, incidental o consecuente que surja del uso de la App.",
      },
      {
        heading: "8. Cumplimiento Legal",
        intro:
          "Usted acepta usar la App de conformidad con todas las leyes y regulaciones aplicables.",
      },
      {
        heading: "9. Terminación",
        intro:
          "Esta licencia es efectiva hasta su terminación. Sus derechos se rescindirán automáticamente si incumple cualquier término de este Acuerdo.",
      },
      {
        heading: "10. Beneficiario Tercero",
        intro:
          "Apple Inc. y sus filiales son beneficiarias terceras de este Acuerdo y, al aceptar este Acuerdo, tendrán el derecho de hacer cumplir este Acuerdo en su contra.",
      },
      {
        heading: "11. Ley Aplicable",
        intro: "Este Acuerdo se rige por las leyes de Brasil.",
      },
    ],
    contact: {
      heading: "12. Contacto",
      text: "Si tiene alguna pregunta, contáctenos: ",
      email: "support@buppi.baby",
    },
  },
  blog: {
    title: "Blog",
    metaTitle: "Blog Buppi Baby: sueño, lactancia y rutina del bebé",
    description: "Contenido práctico sobre embarazo, sueño, alimentación y desarrollo del bebé.",
    readingTime: (minutes) => `${minutes} min de lectura`,
    publishedOn: "Publicado el",
    updatedOn: "Actualizado el",
    medicalDisclaimer: "Este contenido es informativo y no sustituye la valoración del pediatra. Cada bebé es único: ante cualquier duda sobre la salud de tu hijo, consulta con el pediatra o el servicio de salud.",
    backToBlog: "← Volver al blog",
    categoryLabel: "Categoría",
    relatedPosts: "Artículos relacionados",
    empty: "Aún no hay artículos publicados.",
    faqHeading: "Preguntas frecuentes",
    referencesHeading: "Referencias",
    share: {
      heading: "Compartir este artículo",
      whatsapp: "Compartir en WhatsApp",
      x: "Compartir en X (Twitter)",
      mail: "Compartir por correo",
      copyLink: "Copiar enlace",
      linkCopied: "¡Enlace copiado!",
      native: "Más opciones",
    },
  },
};
