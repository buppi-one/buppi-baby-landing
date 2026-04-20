import { STORE_LINKS } from "@/lib/links";

export type Locale = "pt-BR" | "en" | "es" | "fr";
type Variant = "primary" | "onPrimary";
type Size = "md" | "lg";

const HEIGHTS: Record<Size, string> = {
  md: "h-12",
  lg: "h-14",
};

const LABELS: Record<Locale, { apple: string; google: string }> = {
  "pt-BR": { apple: "Baixar na App Store", google: "Disponível no Google Play" },
  en: { apple: "Download on the App Store", google: "Get it on Google Play" },
  es: { apple: "Descargar en la App Store", google: "Disponible en Google Play" },
  fr: { apple: "Télécharger dans l'App Store", google: "Disponible sur Google Play" },
};

export function StoreButtons({
  size = "md",
  variant = "primary",
  locale = "pt-BR",
  className = "",
}: {
  size?: Size;
  variant?: Variant;
  locale?: Locale;
  className?: string;
}) {
  const height = HEIGHTS[size];
  const labels = LABELS[locale];

  return (
    <div className={`flex flex-wrap items-center gap-4 ${className}`}>
      <a
        href={STORE_LINKS.appStore}
        aria-label={labels.apple}
        className="transition-transform hover:scale-105"
      >
        {variant === "onPrimary" ? (
          <img
            src={`/badges/appstore-${locale}-white.svg`}
            alt={labels.apple}
            className={`${height} w-auto`}
          />
        ) : (
          <>
            <img
              src={`/badges/appstore-${locale}-black.svg`}
              alt={labels.apple}
              className={`${height} w-auto block dark:hidden`}
            />
            <img
              src={`/badges/appstore-${locale}-white.svg`}
              alt={labels.apple}
              className={`${height} w-auto hidden dark:block`}
            />
          </>
        )}
      </a>
      <a
        href={STORE_LINKS.playStore}
        aria-label={labels.google}
        className="transition-transform hover:scale-105"
      >
        <img
          src={`/badges/googleplay-${locale}.svg`}
          alt={labels.google}
          className={`${height} w-auto`}
        />
      </a>
    </div>
  );
}
