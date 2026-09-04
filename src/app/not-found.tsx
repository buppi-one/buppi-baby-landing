import Link from "next/link";
import { BIcon, type BIconName } from "@/components/BIcon";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { DEFAULT_LOCALE } from "@/i18n";

export const metadata = {
  title: "404 — Página não encontrada · Buppi Baby",
  description: "O endereço que você procurou não existe ou foi movido.",
  robots: { index: false, follow: false },
};

const HELPFUL_LINKS: Array<{
  icon: BIconName;
  title: string;
  sub: string;
  href: string;
}> = [
  { icon: "moon", title: "Janelas de sono", sub: "Guia mês a mês", href: "/blog/category/sono/" },
  { icon: "bottle", title: "Amamentação", sub: "Comece pelo blog", href: "/blog/category/alimentacao/" },
  { icon: "heart", title: "Suporte", sub: "Falar com a gente", href: "/support/" },
  { icon: "bell", title: "Excluir conta", sub: "Pelo app ou e-mail", href: "/delete-account/" },
];

export default function NotFound() {
  return (
    <>
      <Nav locale={DEFAULT_LOCALE} />
      <main className="bg-[var(--color-background-light)] dark:bg-[var(--color-background-dark)]">
        <div className="max-w-5xl mx-auto px-6 lg:px-14 py-14 lg:py-24 grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center">
          {/* Left — copy + actions */}
          <div>
            <span
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-widest mb-6"
              style={{
                background: "var(--color-lavender)",
                color: "var(--color-primary-dark)",
              }}
            >
              <BIcon name="sparkle" size={13} />
              ERRO 404
            </span>
            <h1
              className="font-display font-bold tracking-tight leading-[1.05] text-[var(--color-ink)] dark:text-white"
              style={{ fontSize: "clamp(40px, 5.5vw, 64px)" }}
            >
              <span>Essa página tirou</span>
              <br />
              <span>uma </span>
              <span className="relative inline-block text-[var(--color-primary)]">
                soneca
                <svg
                  viewBox="0 0 200 12"
                  aria-hidden
                  className="absolute left-0 right-0 -bottom-2 w-full h-3"
                >
                  <path
                    d="M2 8 Q 50 2, 100 6 T 198 4"
                    stroke="var(--color-secondary)"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <br />
              <span>mais longa.</span>
            </h1>
            <p className="text-[var(--color-fg-secondary)] dark:text-slate-400 text-lg leading-relaxed max-w-md mt-7">
              O endereço que você procurou não existe — ou foi movido. Mas tem várias coisas legais por aqui pra explorar.
            </p>

            <div className="flex flex-wrap gap-3 mt-9 mb-10">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold bg-[var(--color-ink)] text-[var(--color-background-light)] hover:opacity-90 transition-opacity"
              >
                <BIcon name="phone" size={14} />
                Voltar pro início
              </Link>
              <Link
                href="/blog/"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold bg-white dark:bg-[var(--color-surface-dark)] text-[var(--color-ink)] dark:text-white border border-[var(--color-border-warm)] dark:border-[var(--color-border-dark)] hover:bg-[var(--color-surface-elevated)] dark:hover:bg-[var(--color-surface-elevated-dark)] transition-colors"
              >
                <BIcon name="sparkle" size={14} className="text-[var(--color-primary-dark)] dark:text-[var(--color-primary)]" />
                Ler o blog
              </Link>
            </div>

            <div>
              <div className="text-[11px] font-bold tracking-widest uppercase text-[var(--color-fg-muted)] mb-3.5">
                Talvez você queira
              </div>
              <div className="grid sm:grid-cols-2 gap-2.5 max-w-lg">
                {HELPFUL_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-3 p-3.5 rounded-xl bg-white dark:bg-[var(--color-surface-dark)] border border-[var(--color-border-warm)] dark:border-[var(--color-border-dark)] hover:border-[var(--color-primary)] hover:shadow-md transition-all"
                  >
                    <div
                      className="w-8 h-8 rounded-[9px] grid place-items-center shrink-0"
                      style={{
                        background: "var(--color-lavender)",
                        color: "var(--color-primary-dark)",
                      }}
                    >
                      <BIcon name={link.icon} size={15} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[13px] font-semibold text-[var(--color-ink)] dark:text-white leading-tight">
                        {link.title}
                      </div>
                      <div className="text-[11px] text-[var(--color-fg-secondary)] dark:text-slate-400 mt-0.5">
                        {link.sub}
                      </div>
                    </div>
                    <BIcon
                      name="chev"
                      size={11}
                      className="text-[var(--color-fg-muted)]"
                    />
                  </Link>
                ))}
              </div>
            </div>

            <p className="mt-8 text-[11px] leading-relaxed text-[var(--color-fg-muted)]">
              Agentes e robôs: este endereço realmente não existe (HTTP 404). Continue por{" "}
              <a href="/sitemap.xml" className="underline">/sitemap.xml</a>,{" "}
              <a href="/llms.txt" className="underline">/llms.txt</a>,{" "}
              <Link href="/blog/" className="underline">/blog/</Link> ou o índice JSON em{" "}
              <a href="/ai/blog-index.pt-BR.json" className="underline">/ai/blog-index.pt-BR.json</a>.
            </p>
          </div>

          {/* Right — illustration */}
          <div className="relative h-80 lg:h-[520px] grid place-items-center">
            <FourOhFourArt />
          </div>
        </div>
      </main>
      <Footer locale={DEFAULT_LOCALE} />
    </>
  );
}

function FourOhFourArt() {
  return (
    <svg
      viewBox="0 0 480 420"
      aria-hidden
      className="w-full max-w-[480px] h-full"
    >
      <defs>
        <radialGradient id="g404" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.15" />
          <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="num404" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--color-primary)" />
          <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0.7" />
        </linearGradient>
      </defs>
      <circle cx="240" cy="210" r="200" fill="url(#g404)" />

      {/* Left "4" */}
      <text
        x="40"
        y="280"
        fontFamily="Outfit, sans-serif"
        fontSize="240"
        fontWeight="700"
        fill="url(#num404)"
        letterSpacing="-12"
      >
        4
      </text>

      {/* Center "0" — sleeping moon */}
      <g transform="translate(180, 100)">
        <circle
          cx="60"
          cy="90"
          r="80"
          fill="var(--color-lavender)"
          stroke="var(--color-primary)"
          strokeWidth="3"
        />
        <path
          d="M 95 30 A 70 70 0 1 1 30 130 A 90 90 0 0 0 95 30 Z"
          fill="var(--color-primary)"
          opacity="0.18"
        />
        <path
          d="M 38 88 Q 46 80 54 88"
          stroke="var(--color-ink)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 70 88 Q 78 80 86 88"
          stroke="var(--color-ink)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        <ellipse cx="62" cy="108" rx="5" ry="3" fill="var(--color-accent-peach)" />
        <circle cx="32" cy="100" r="5" fill="var(--color-accent-peach)" opacity="0.6" />
        <circle cx="92" cy="100" r="5" fill="var(--color-accent-peach)" opacity="0.6" />
        <text
          x="125"
          y="40"
          fontFamily="Outfit, sans-serif"
          fontSize="22"
          fontWeight="700"
          fill="var(--color-primary)"
        >
          z
        </text>
        <text
          x="140"
          y="22"
          fontFamily="Outfit, sans-serif"
          fontSize="16"
          fontWeight="700"
          fill="var(--color-primary)"
          opacity="0.7"
        >
          z
        </text>
        <text
          x="152"
          y="8"
          fontFamily="Outfit, sans-serif"
          fontSize="12"
          fontWeight="700"
          fill="var(--color-primary)"
          opacity="0.5"
        >
          z
        </text>
      </g>

      {/* Right "4" */}
      <text
        x="320"
        y="280"
        fontFamily="Outfit, sans-serif"
        fontSize="240"
        fontWeight="700"
        fill="url(#num404)"
        letterSpacing="-12"
      >
        4
      </text>

      <circle cx="80" cy="80" r="6" fill="var(--color-secondary)" />
      <circle cx="420" cy="120" r="5" fill="var(--color-accent-peach)" />
      <circle cx="60" cy="340" r="4" fill="var(--color-primary)" opacity="0.5" />
      <circle cx="440" cy="320" r="7" fill="var(--color-secondary)" opacity="0.5" />

      <path
        d="M 50 200 Q 100 180 130 220"
        stroke="var(--color-primary)"
        strokeWidth="2"
        strokeDasharray="3 5"
        fill="none"
        opacity="0.4"
      />
      <path
        d="M 360 220 Q 400 240 440 200"
        stroke="var(--color-primary)"
        strokeWidth="2"
        strokeDasharray="3 5"
        fill="none"
        opacity="0.4"
      />
    </svg>
  );
}
