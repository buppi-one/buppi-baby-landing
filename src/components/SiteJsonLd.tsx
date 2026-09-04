import { getMessages, localePath, type Locale } from "@/i18n";
import { STORE_LINKS } from "@/lib/links";

const BASE = "https://buppi.baby";

/**
 * Site identity for machines: Organization + SoftwareApplication JSON-LD,
 * rendered on the landing page of every locale. Address is intentionally
 * omitted until we decide to publish one (see agent-readiness audit).
 */
export function SiteJsonLd({ locale }: { locale: Locale }) {
  const description = getMessages(locale).hero.description;
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${BASE}/#organization`,
        name: "Buppi Baby",
        url: `${BASE}/`,
        logo: `${BASE}/logo-full-2x.webp`,
        description,
        email: "suporte@buppi.baby",
        sameAs: [
          "https://www.instagram.com/buppi.baby/",
          "https://github.com/buppi-one",
          STORE_LINKS.appStore,
          STORE_LINKS.playStore,
        ],
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "customer support",
            email: "suporte@buppi.baby",
            availableLanguage: ["pt-BR", "en", "es", "fr"],
          },
          {
            "@type": "ContactPoint",
            contactType: "privacy",
            email: "privacidade@buppi.baby",
            availableLanguage: ["pt-BR", "en", "es", "fr"],
          },
        ],
      },
      {
        "@type": ["SoftwareApplication", "MobileApplication"],
        "@id": `${BASE}/#app`,
        name: "Buppi Baby",
        url: `${BASE}${localePath(locale, "/")}`,
        description,
        applicationCategory: "LifestyleApplication",
        operatingSystem: "iOS, Android",
        offers: { "@type": "Offer", price: "0", priceCurrency: "BRL" },
        downloadUrl: [STORE_LINKS.appStore, STORE_LINKS.playStore],
        installUrl: [STORE_LINKS.appStore, STORE_LINKS.playStore],
        inLanguage: ["pt-BR", "en", "es", "fr"],
        publisher: { "@id": `${BASE}/#organization` },
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
