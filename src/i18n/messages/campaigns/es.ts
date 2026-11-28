import type { CampaignMessages } from "../../campaignTypes";

export const campaignsEs: CampaignMessages = {
  more: {
    eyebrow: "Y hay más",
    title: "Buppi va del embarazo al primer año.",
    lead: "Todo en la misma app, gratis para siempre y sin anuncios.",
    cta: "Ver todo lo que hace Buppi",
    items: {
      pregnancy: { title: "Embarazo semana a semana", sub: "Tamaño del bebé, control prenatal y contracciones." },
      logging: { title: "Registro en un toque", sub: "Tomas, pañales y sueño, con una sola mano." },
      sleep: { title: "Predicción de siesta", sub: "Según la rutina de tu bebé, con el motivo a la vista." },
      food: { title: "Alimentación complementaria", sub: "El control de alérgenos se arma solo." },
      health: { title: "Salud y consultas", sub: "Vacunas, crecimiento y los temas para el pediatra." },
      family: { title: "La familia junta", sub: "Cada persona con el rol correcto, sin límite de personas." },
      book: { title: "Libro del bebé", sub: "Registros y fotos se vuelven el libro, por edad." },
      guides: { title: "Hitos y guías", sub: "Qué esperar en cada etapa." },
    },
  },
  privacy: {
    eyebrow: "Privacidad",
    title: "Las fotos de tu bebé se quedan con tu familia.",
    items: [
      {
        title: "Tú eliges quién ve",
        sub: "Cada persona entra con un rol: cuidar, acompañar o ver solo el libro. Puedes cambiar o quitar el acceso cuando quieras.",
      },
      {
        title: "Un enlace solo del libro",
        sub: "Quien recibe el enlace ve el libro y comenta. La rutina, la salud y el resto de la app no aparecen.",
      },
      {
        title: "Sin anuncios, sin venta de datos",
        sub: "Las fotos quedan en almacenamiento privado. Buppi no muestra anuncios y no vende datos.",
      },
    ],
  },
  pages: {
    pregnancy: {
      metaTitle: "Buppi Baby: el embarazo semana a semana, con control prenatal y contracciones",
      metaDescription:
        "El tamaño del bebé en cada semana con la fuente a la vista, el control prenatal organizado por tu semana y el contador de contracciones. Gratis y sin anuncios.",
      eyebrow: "Para el embarazo",
      titleBefore: "El embarazo trae mil dudas. Buppi las ordena ",
      titleHighlight: "semana a semana",
      titleAfter: ".",
      lead: "El tamaño del bebé, el examen que toca y el intervalo de las contracciones: cada cosa en la semana correcta, con la fuente a la vista. Tú decides qué acompaña la familia.",
      imageAlt: "La embarazada acostada para la ecografía, sonriendo al monitor, de la mano de su pareja",
      toasts: [
        { title: "Semana 12: del tamaño de una lima", sub: "5,4 cm de la cabeza a las nalgas" },
        { title: "Ecografía morfológica", sub: "toca ahora: semanas 20 a 24" },
      ],
      closing: {
        eyebrow: "De la primera semana al parto",
        title: "Empieza hoy, en cualquier semana.",
        lead: "Buppi arma el control prenatal según tu semana. Cuando nazca el bebé, sigue con ustedes.",
      },
    },
    sleep: {
      metaTitle: "Buppi Baby: predicción de siesta y rutina de sueño del bebé",
      metaDescription:
        "Buppi aprende la rutina de tu bebé con lo que registras, predice la próxima siesta y muestra cada noche de la semana. Gratis y sin anuncios.",
      eyebrow: "Para el sueño del bebé",
      titleBefore: "Nadie duerme bien con un bebé. Buppi muestra ",
      titleHighlight: "la hora de la siesta",
      titleAfter: ".",
      lead: "Aprende la rutina de tu bebé con lo que registras, predice la próxima siesta y muestra cada noche de la semana. Dejas de adivinar, y quien cuida contigo ve lo mismo.",
      imageAlt: "Bebé dormida sobre el pecho de su padre, en el sofá",
      toasts: [
        { title: "Siesta ~11:40", sub: "en 25min · según su rutina" },
        { title: "Domingo: 2 despertares", sub: "el miércoles fueron 5" },
      ],
      closing: {
        eyebrow: "Una noche a la vez",
        title: "El sueño del bebé cambia todo el tiempo. Se puede seguir.",
        lead: "Empieza a registrar hoy. Buppi predice por la rutina de tu bebé, y no por una tabla.",
      },
    },
    memories: {
      metaTitle: "Buppi Baby: los recuerdos del bebé en un libro, solo para la familia",
      metaDescription:
        "Fotos y registros se vuelven el libro del bebé, organizado por edad. Tú eliges quién lo ve, y la familia que vive lejos acompaña por un enlace solo del libro.",
      eyebrow: "Recuerdos y libro del bebé",
      titleBefore: "El primer año pasa volando. Buppi guarda cada momento, ",
      titleHighlight: "solo para la familia",
      titleAfter: ".",
      lead: "Tus registros y fotos se vuelven el libro del bebé, organizado por edad. Tú eliges quién ve cada cosa, y los abuelos acompañan y comentan desde lejos, sin red social.",
      imageAlt: "Madre, padre y la bebé en el sofá, con fotos del primer año colgadas en la pared",
      toasts: [
        { title: "Nuevo capítulo en el libro", sub: "La primera risa" },
        { title: "La abuela Diva comentó", sub: "ella ve solo el libro" },
      ],
      closing: {
        eyebrow: "Del primer día al primer paso",
        title: "Esta historia solo pasa una vez.",
        lead: "Empieza hoy. El libro se va armando con lo que registras.",
      },
    },
  },
};
