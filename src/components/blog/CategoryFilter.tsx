import Link from "next/link";
import { CATEGORIES, CATEGORY_SLUGS } from "@/lib/blog/categories";
import type { CategorySlug } from "@/lib/blog/types";
import { getMessages, localePath, type Locale } from "@/i18n";

export function CategoryFilter({
  locale,
  active,
  availableCategories,
}: {
  locale: Locale;
  active: CategorySlug | null;
  availableCategories: ReadonlySet<CategorySlug>;
}) {
  const m = getMessages(locale);
  return (
    <div className="flex flex-wrap gap-2 mb-12">
      <Link
        href={localePath(locale, "/blog")}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          active === null
            ? "bg-primary text-white"
            : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
        }`}
      >
        {m.blog.title}
      </Link>
      {CATEGORY_SLUGS.filter((c) => availableCategories.has(c)).map((c) => {
        const meta = CATEGORIES[c];
        const isActive = active === c;
        return (
          <Link
            key={c}
            href={localePath(locale, `/blog/category/${meta.urlSlug[locale]}`)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              isActive
                ? "bg-primary text-white"
                : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            {meta.label[locale]}
          </Link>
        );
      })}
    </div>
  );
}
