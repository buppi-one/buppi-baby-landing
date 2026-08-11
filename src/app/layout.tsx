import type { Metadata } from "next";
import { Outfit, Quicksand } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-outfit",
  display: "swap",
});

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-quicksand",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://buppi.baby"),
  // iOS Safari Smart App Banner: native one-tap "View in App Store" strip.
  // Keeps ad traffic (which must land on the site) one tap from the store.
  itunes: { appId: "6759115928" },
  title: "Buppi Baby - Cuidado Completo para o seu Bebê",
  description:
    "Registre sono, amamentação, fraldas e marcos do desenvolvimento do seu bebê. Simples, bonito e gratuito.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
  },
  openGraph: {
    title: "Buppi Baby",
    description:
      "O melhor app para acompanhar a rotina do seu bebê. Amamentação, sono, fraldas e marcos em um só lugar.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Buppi Baby",
    description:
      "O melhor app para acompanhar a rotina do seu bebê. Amamentação, sono, fraldas e marcos em um só lugar.",
    images: ["/og-image.png"],
  },
};

// Auto-redirect to the user's stored locale on first paint. Skips blog
// article and category pages because their slugs differ per locale — those
// are handled by the per-article RedirectScript which has the slug map.
const localeInit = `(function(){try{var p=location.pathname;if(/^\\/(en|es|fr)(\\/|$)/.test(p))return;if(/^\\/blog\\/[^\\/]/.test(p))return;var supported=['en','es','fr'];var stored=localStorage.getItem('locale');if(!stored||supported.indexOf(stored)===-1)return;var stripped=p==='/'?'':p.replace(/\\/$/,'');location.replace('/'+stored+stripped+'/'+location.search+location.hash);}catch(e){}})();`;
const themeInit = `(function(){try{var t=localStorage.getItem('theme')||'system';var d=t==='dark'||(t==='system'&&window.matchMedia('(prefers-color-scheme: dark)').matches);if(d)document.documentElement.classList.add('dark');}catch(e){}})();`;

// GA4 — "Buppi Baby Web" stream on the app's Firebase-linked property.
// Captures UTM parameters from paid traffic (Meta ads) natively.
const GA_ID = "G-HMTMN5BRLT";
const gaInit = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${outfit.variable} ${quicksand.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: localeInit }} />
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
        <script dangerouslySetInnerHTML={{ __html: gaInit }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
