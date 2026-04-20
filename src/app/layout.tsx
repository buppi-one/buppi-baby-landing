import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://buppi.baby"),
  title: "Buppi Baby - Cuidado Completo para o seu Bebê",
  description:
    "Registre sono, amamentação, fraldas e marcos do desenvolvimento do seu bebê. Simples, bonito e gratuito.",
  icons: { icon: "/logo-icon.png" },
  openGraph: {
    title: "Buppi Baby",
    description:
      "O melhor app para acompanhar a rotina do seu bebê. Amamentação, sono, fraldas e marcos em um só lugar.",
    images: ["/logo-full.png"],
    type: "website",
  },
};

const localeInit = `(function(){try{var p=location.pathname;if(/^\\/(en|es|fr)(\\/|$)/.test(p))return;var supported=['en','es','fr'];var stored=localStorage.getItem('locale');var target;if(stored==='pt-BR')return;if(stored&&supported.indexOf(stored)!==-1){target=stored;}else{var lang=(navigator.language||'').toLowerCase().split('-')[0];if(supported.indexOf(lang)!==-1)target=lang;}if(!target)return;var stripped=p==='/'?'':p.replace(/\\/$/,'');location.replace('/'+target+stripped+'/'+location.search+location.hash);}catch(e){}})();`;
const themeInit = `(function(){try{var t=localStorage.getItem('theme')||'system';var d=t==='dark'||(t==='system'&&window.matchMedia('(prefers-color-scheme: dark)').matches);if(d)document.documentElement.classList.add('dark');}catch(e){}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={outfit.variable}>
      <head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons+Round"
          rel="stylesheet"
        />
        <script dangerouslySetInnerHTML={{ __html: localeInit }} />
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
