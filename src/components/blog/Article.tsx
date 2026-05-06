import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
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
    <article className="bg-background-light dark:bg-background-dark">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-3xl mx-auto px-6 py-12 lg:py-20">
        <Link
          href={localePath(article.locale, "/blog")}
          className="inline-block text-sm text-primary hover:underline mb-8"
        >
          {m.blog.backToBlog}
        </Link>

        <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-wider mb-4">
          {cat.label[article.locale]}
        </span>

        <h1 className="text-4xl lg:text-5xl font-bold font-display leading-tight mb-4">
          {article.frontmatter.title}
        </h1>

        <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
          {article.frontmatter.description}
        </p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500 dark:text-slate-400 mb-10">
          <time dateTime={article.frontmatter.publishedAt}>
            {m.blog.publishedOn}{" "}
            {formatDate(article.frontmatter.publishedAt, article.locale)}
          </time>
          {isUpdated && article.frontmatter.updatedAt ? (
            <time dateTime={article.frontmatter.updatedAt}>
              · {m.blog.updatedOn}{" "}
              {formatDate(article.frontmatter.updatedAt, article.locale)}
            </time>
          ) : null}
          <span>· {m.blog.readingTime(article.readingTimeMinutes)}</span>
        </div>

        {cover ? (
          <figure className="mb-12 -mx-6 lg:mx-0">
            <div className="aspect-video lg:rounded-[2rem] overflow-hidden bg-slate-100 dark:bg-slate-800">
              <img
                src={cover}
                alt={article.frontmatter.title}
                className="w-full h-full object-cover"
                loading="eager"
                decoding="async"
              />
            </div>
          </figure>
        ) : null}

        <div className="article-body">
          <MDXRemote
            source={article.content}
            options={{
              mdxOptions: {
                remarkPlugins: [
                  remarkGfm,
                  [
                    remarkRewriteRelativeImages,
                    { articleId: article.id },
                  ],
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
      </div>
    </article>
  );
}

