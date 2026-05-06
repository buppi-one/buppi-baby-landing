import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { BIcon } from "@/components/BIcon";
import { CatPill, CoverPlaceholder } from "@/components/blog/CatPill";
import { Faq } from "@/components/blog/Faq";
import { References } from "@/components/blog/References";
import { CATEGORIES } from "@/lib/blog/categories";
import { formatDate } from "@/lib/blog/format";
import { remarkRewriteRelativeImages } from "@/lib/blog/remark-images";
import type { Article as ArticleT } from "@/lib/blog/types";
import { getMessages, localePath } from "@/i18n";

const SITE_URL = "https://buppi.baby";

export function Article({ article }: { article: ArticleT }) {
  const m = getMessages(article.locale);
  const cat = CATEGORIES[article.frontmatter.category];
  const cover = article.frontmatter.cover
    ? `/blog/${article.id}/${article.frontmatter.cover.replace(/^\.\//, "")}`
    : null;
  const url = `${SITE_URL}${
    article.locale === "pt-BR" ? "" : `/${article.locale}`
  }/blog/${article.slug}/`;
  const isUpdated =
    article.frontmatter.updatedAt &&
    article.frontmatter.updatedAt !== article.frontmatter.publishedAt;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.frontmatter.title,
    description: article.frontmatter.description,
    image: cover ? [`${SITE_URL}${cover}`] : [`${SITE_URL}/og-image.png`],
    datePublished: article.frontmatter.publishedAt,
    dateModified:
      article.frontmatter.updatedAt ?? article.frontmatter.publishedAt,
    inLanguage: article.locale,
    publisher: {
      "@type": "Organization",
      name: "Buppi Baby",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo-full.webp`,
      },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };

  return (
    <article className="bg-[var(--color-background-light)] dark:bg-[var(--color-background-dark)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header — title + meta */}
      <div className="max-w-3xl mx-auto px-6 lg:px-14 pt-12 lg:pt-16">
        <nav
          aria-label="breadcrumb"
          className="flex items-center gap-2 text-[13px] text-[var(--color-fg-secondary)] dark:text-slate-400 mb-5"
        >
          <Link
            href={localePath(article.locale, "/blog")}
            className="hover:text-[var(--color-ink)] dark:hover:text-white transition-colors"
          >
            {m.blog.title}
          </Link>
          <BIcon name="chev" size={11} className="text-[var(--color-fg-muted)]" />
          <span className="text-[var(--color-fg)] dark:text-white">
            {cat.label[article.locale]}
          </span>
        </nav>

        <CatPill
          category={article.frontmatter.category}
          locale={article.locale}
          asLink={false}
        />

        <h1 className="font-display font-bold tracking-tight leading-[1.1] mt-5 mb-6 text-3xl lg:text-[48px] text-[var(--color-ink)] dark:text-white">
          {article.frontmatter.title}
        </h1>

        <p className="text-[19px] leading-relaxed text-[var(--color-fg-secondary)] dark:text-slate-400">
          {article.frontmatter.description}
        </p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-7 pt-5 border-t border-[var(--color-border-warm)] dark:border-[var(--color-border-dark)] text-[13px] text-[var(--color-fg-secondary)] dark:text-slate-400">
          <span className="inline-flex items-center gap-1.5">
            <BIcon name="bell" size={13} />
            <time dateTime={article.frontmatter.publishedAt}>
              {m.blog.publishedOn}{" "}
              <strong className="text-[var(--color-ink)] dark:text-white font-semibold">
                {formatDate(article.frontmatter.publishedAt, article.locale)}
              </strong>
            </time>
          </span>
          {isUpdated && article.frontmatter.updatedAt ? (
            <>
              <span className="w-1 h-1 rounded-full bg-[var(--color-fg-muted)]" />
              <span className="inline-flex items-center gap-1.5">
                <BIcon name="sparkle" size={13} />
                <time dateTime={article.frontmatter.updatedAt}>
                  {m.blog.updatedOn}{" "}
                  <strong className="text-[var(--color-ink)] dark:text-white font-semibold">
                    {formatDate(article.frontmatter.updatedAt, article.locale)}
                  </strong>
                </time>
              </span>
            </>
          ) : null}
          <span className="w-1 h-1 rounded-full bg-[var(--color-fg-muted)]" />
          <span>{m.blog.readingTime(article.readingTimeMinutes)}</span>
        </div>
      </div>

      {/* Cover */}
      <div className="max-w-4xl mx-auto px-6 lg:px-14 mt-10">
        {cover ? (
          <div className="rounded-3xl overflow-hidden bg-[var(--color-background-soft)] dark:bg-[var(--color-surface-elevated-dark)]" style={{ aspectRatio: "16/9" }}>
            <img
              src={cover}
              alt={article.frontmatter.title}
              className="w-full h-full object-cover"
              loading="eager"
              decoding="async"
            />
          </div>
        ) : (
          <CoverPlaceholder
            category={article.frontmatter.category}
            height={320}
          />
        )}
      </div>

      {/* Body */}
      <div className="max-w-3xl mx-auto px-6 lg:px-14 py-14 lg:py-16">
        <div className="article-body">
          <MDXRemote
            source={article.content}
            options={{
              mdxOptions: {
                remarkPlugins: [
                  remarkGfm,
                  [remarkRewriteRelativeImages, { articleId: article.id }],
                ],
                rehypePlugins: [
                  rehypeSlug,
                  [
                    rehypeAutolinkHeadings,
                    {
                      behavior: "wrap",
                      properties: { className: ["heading-anchor"] },
                    },
                  ],
                  [
                    rehypePrettyCode,
                    { theme: "github-light", keepBackground: false },
                  ],
                ],
              },
            }}
            components={{
              img: (props) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  {...props}
                  loading="lazy"
                  decoding="async"
                  className="rounded-2xl my-6"
                  alt={props.alt ?? ""}
                />
              ),
              a: ({ href, ...props }) => {
                const external =
                  typeof href === "string" && /^https?:\/\//.test(href);
                return (
                  <a
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    {...props}
                  />
                );
              },
            }}
          />
        </div>

        {article.frontmatter.faq && article.frontmatter.faq.length > 0 ? (
          <Faq items={article.frontmatter.faq} locale={article.locale} />
        ) : null}

        {article.frontmatter.references && article.frontmatter.references.length > 0 ? (
          <References
            items={article.frontmatter.references}
            locale={article.locale}
          />
        ) : null}
      </div>
    </article>
  );
}
