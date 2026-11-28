import type { Locale } from "./config";
import type { CreatorsMessages } from "./creatorsTypes";
import { creatorsEn } from "./messages/creators/en";
import { creatorsEs } from "./messages/creators/es";
import { creatorsFr } from "./messages/creators/fr";
import { creatorsPtBR } from "./messages/creators/pt-BR";

const MESSAGES: Record<Locale, CreatorsMessages> = {
  "pt-BR": creatorsPtBR,
  en: creatorsEn,
  es: creatorsEs,
  fr: creatorsFr,
};

/** The same address in every language, like the rest of the site's static pages. */
export const CREATORS_PATH = "/creators/";

export function getCreatorsMessages(locale: Locale): CreatorsMessages {
  return MESSAGES[locale];
}
