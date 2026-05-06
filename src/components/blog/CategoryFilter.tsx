import Link from "next/link";
import { CatPill } from "@/components/blog/CatPill";
import { CATEGORY_SLUGS } from "@/lib/blog/categories";
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
  const m = getMessages(locale).blog;
  return (
    <div className="flex flex-wrap gap-2 mb-12">
      <Link
        href={localePath(locale, "/blog")}
        className={`px-3.5 py-1.5 rounded-full text-[13px] font-semibold transition-colors ${
          active === null
            ? "bg-[var(--color-ink)] text-[var(--color-background-light)]"
            : "bg-white dark:bg-[var(--color-surface-dark)] border border-[var(--color-border-warm)] dark:border-[var(--color-border-dark)] text-[var(--color-fg-secondary)] dark:text-slate-400 hover:text-[var(--color-ink)] dark:hover:text-white"
        }`}
      >
        {m.title}
      </Link>
      {CATEGORY_SLUGS.filter((c) => availableCategories.has(c)).map((c) => (
        <CatPill key={c} category={c} locale={locale} active={active === c} size="md" />
      ))}
    </div>
  );
}
