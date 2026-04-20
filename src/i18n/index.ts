import { ptBR } from "./messages/pt-BR";
import { en } from "./messages/en";
import { es } from "./messages/es";
import { fr } from "./messages/fr";
import type { Locale } from "./config";
import type { Messages } from "./types";

const ALL_MESSAGES: Record<Locale, Messages> = {
  "pt-BR": ptBR,
  en,
  es,
  fr,
};

export function getMessages(locale: Locale): Messages {
  return ALL_MESSAGES[locale];
}

export type { Messages } from "./types";
export {
  LOCALES,
  DEFAULT_LOCALE,
  LOCALE_LABELS,
  LOCALE_FLAGS,
  isLocale,
  localePath,
  stripLocale,
} from "./config";
export type { Locale } from "./config";
