import { ArticleCard } from "@/components/blog/ArticleCard";
import { CategoryFilter } from "@/components/blog/CategoryFilter";
import { CatPill, CoverPlaceholder } from "@/components/blog/CatPill";
import { BIcon } from "@/components/BIcon";
import { StoreButtons } from "@/components/StoreButtons";
import { formatDate } from "@/lib/blog/format";
import { getArticlesByLocale } from "@/lib/blog/loader";
import type { CategorySlug } from "@/lib/blog/types";
import { getMessages, localePath, type Locale } from "@/i18n";

export function BlogIndex({
  locale,
  category = null,
  heading,
}: {
  locale: Locale;
  category?: CategorySlug | null;
  heading?: string;
}) {
  const m = getMessages(locale).blog;
  const all = getArticlesByLocale(locale);
  const available = new Set<CategorySlug>(all.map((a) => a.frontmatter.category));
  const list = category ? all.filter((a) => a.frontmatter.category === category) : all;
  const featured = list[0];
  const rest = list.slice(1);

  return (
    <>
      {/* Hero */}
      <section className="bg-[var(--color-background-soft)] dark:bg-[var(--color-surface-dark)] border-b border-[var(--color-border-warm)] dark:border-[var(--color-border-dark)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-14 pt-16 pb-10 lg:pt-20 lg:pb-12">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-widest mb-5"
            style={{
              background: "var(--color-lavender)",
              color: "var(--color-primary-dark)",
            }}
          >
            <BIcon name="sparkle" size={13} />
            BLOG BUPPI
          </div>
          <h1 className="font-display font-bold tracking-tight leading-[1.05] text-4xl lg:text-[56px] text-[var(--color-ink)] dark:text-white max-w-3xl">
            {heading ?? m.title}
          </h1>
          <p className="mt-5 text-lg text-[var(--color-fg-secondary)] dark:text-slate-400 max-w-2xl leading-relaxed">
            {m.description}
          </p>
          <div className="mt-8">
            <CategoryFilter
              locale={locale}
              active={category}
              availableCategories={available}
            />
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="bg-[var(--color-background-light)] dark:bg-[var(--color-background-dark)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-14 py-14 lg:py-20">
          {!featured ? (
            <p className="text-[var(--color-fg-secondary)] dark:text-slate-400">
              {m.empty}
            </p>
          ) : (
            <>
              <FeaturedArticle locale={locale} article={featured} />

              {rest.length > 0 && (
                <>
                  <div className="flex justify-between items-baseline mt-12 pt-8 mb-6 border-t border-[var(--color-border-warm)] dark:border-[var(--color-border-dark)]">
                    <h2 className="font-display font-bold tracking-tight text-xl lg:text-[22px] text-[var(--color-ink)] dark:text-white">
                      {locale === "pt-BR" ? "Mais recentes" : locale === "en" ? "Latest" : locale === "es" ? "Más recientes" : "Plus récents"}
                    </h2>
                    <span className="text-[13px] text-[var(--color-fg-secondary)] dark:text-slate-400">
                      {rest.length}{" "}
                      {locale === "pt-BR" ? "artigos" : locale === "en" ? "articles" : locale === "es" ? "artículos" : "articles"}
                    </span>
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {rest.map((article) => (
                      <ArticleCard
                        key={`${article.locale}-${article.id}`}
                        article={article}
                      />
                    ))}
                  </div>
                </>
              )}

              <BottomCTA locale={locale} />
            </>
          )}
        </div>
      </section>
    </>
  );
}

function FeaturedArticle({
  locale,
  article,
}: {
  locale: Locale;
  article: ReturnType<typeof getArticlesByLocale>[number];
}) {
  const cover = article.frontmatter.cover
    ? `/blog/${article.id}/${article.frontmatter.cover.replace(/^\.\//, "")}`
    : null;
  const m = getMessages(locale).blog;
  const href = localePath(locale, `/blog/${article.slug}`);
  return (
    <article className="grid lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-12 mb-4">
      <a href={href} aria-label={article.frontmatter.title} className="block">
        {cover ? (
          <div
            className="rounded-3xl overflow-hidden bg-[var(--color-background-soft)] dark:bg-[var(--color-surface-elevated-dark)]"
            style={{ height: 420 }}
          >
            <img
              src={cover}
              alt={article.frontmatter.title}
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
        ) : (
          <CoverPlaceholder category={article.frontmatter.category} height={420} />
        )}
      </a>
      <div className="flex flex-col justify-center gap-4">
        <div>
          <CatPill
            category={article.frontmatter.category}
            locale={locale}
            asLink={false}
          />
        </div>
        <h2 className="font-display font-bold tracking-tight leading-[1.1] text-3xl lg:text-[36px] text-[var(--color-ink)] dark:text-white">
          <a href={href} className="hover:text-[var(--color-primary-dark)] dark:hover:text-[var(--color-primary)] transition-colors">
            {article.frontmatter.title}
          </a>
        </h2>
        <p className="text-[15px] lg:text-base text-[var(--color-fg-secondary)] dark:text-slate-400 leading-relaxed">
          {article.frontmatter.description}
        </p>
        <div className="flex items-center gap-3 text-[13px] text-[var(--color-fg-secondary)] dark:text-slate-400">
          <time dateTime={article.frontmatter.publishedAt}>
            {formatDate(article.frontmatter.publishedAt, locale)}
          </time>
          <span className="w-1 h-1 rounded-full bg-[var(--color-fg-muted)]" />
          <span>{m.readingTime(article.readingTimeMinutes)}</span>
        </div>
        <a
          href={href}
          className="inline-flex items-center self-start gap-2 mt-2 px-5 py-3 rounded-xl text-[14px] font-semibold text-white bg-[var(--color-primary-dark)] hover:opacity-90 transition-opacity"
        >
          {locale === "pt-BR" ? "Ler artigo" : locale === "en" ? "Read article" : locale === "es" ? "Leer artículo" : "Lire l'article"}
          <BIcon name="chev" size={12} />
        </a>
      </div>
    </article>
  );
}

function BottomCTA({ locale }: { locale: Locale }) {
  const headline = {
    "pt-BR": "Aplique o que leu na rotina do seu bebê.",
    en: "Apply what you read to your baby's routine.",
    es: "Aplica lo que leíste en la rutina de tu bebé.",
    fr: "Appliquez ce que vous avez lu à la routine de bébé.",
  }[locale];
  const sub = {
    "pt-BR": "Registre sono, mama e fralda em 1 toque. O Buppi aprende o ritmo do bebê e te ajuda a aplicar o que você está aprendendo.",
    en: "Log sleep, feeds and diapers in 1 tap. Buppi learns your baby's rhythm and helps you apply what you're learning.",
    es: "Registra sueño, tomas y pañales en 1 toque. Buppi aprende el ritmo del bebé y te ayuda a aplicar lo que aprendes.",
    fr: "Enregistrez sommeil, tétées et couches en 1 toucher. Buppi apprend le rythme de bébé et vous aide à appliquer ce que vous apprenez.",
  }[locale];
  const tag = {
    "pt-BR": "DO ARTIGO PRA PRÁTICA",
    en: "FROM ARTICLE TO PRACTICE",
    es: "DEL ARTÍCULO A LA PRÁCTICA",
    fr: "DE L'ARTICLE À LA PRATIQUE",
  }[locale];
  return (
    <div className="mt-20 lg:mt-24 rounded-3xl p-10 lg:p-14 grid lg:grid-cols-[1.5fr_1fr] gap-8 lg:gap-12 items-center relative overflow-hidden bg-[var(--color-ink)] text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-10 -right-10 w-52 h-52 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(172,146,238,0.45) 0%, transparent 70%)",
        }}
      />
      <div className="relative">
        <span className="inline-flex px-3 py-1 rounded-full bg-white/10 text-[11px] font-bold tracking-widest uppercase mb-4">
          {tag}
        </span>
        <h3 className="font-display font-bold tracking-tight leading-[1.1] text-2xl lg:text-3xl">
          {headline}
        </h3>
        <p className="text-[15px] opacity-70 mt-3 mb-6 max-w-md leading-relaxed">
          {sub}
        </p>
        <StoreButtons size="md" variant="onPrimary" locale={locale} />
      </div>
    </div>
  );
}
