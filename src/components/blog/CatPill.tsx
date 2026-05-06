import Link from "next/link";
import { BIcon } from "@/components/BIcon";
import { CATEGORIES } from "@/lib/blog/categories";
import type { CategorySlug } from "@/lib/blog/types";
import { localePath, type Locale } from "@/i18n";

export function CatPill({
  category,
  locale,
  active,
  size = "md",
  asLink = true,
}: {
  category: CategorySlug;
  locale: Locale;
  active?: boolean;
  size?: "sm" | "md";
  asLink?: boolean;
}) {
  const meta = CATEGORIES[category];
  const big = size === "md";
  const inner = (
    <>
      <BIcon name={meta.icon} size={big ? 14 : 11} />
      {meta.label[locale]}
    </>
  );
  const className = `inline-flex items-center gap-1.5 rounded-full font-bold tracking-wider transition-colors ${
    big ? "px-3 py-1 text-[13px]" : "px-2.5 py-0.5 text-[11px]"
  } ${
    active
      ? "text-white dark:text-[#1a1525]"
      : ""
  }`;
  const style = active
    ? { background: meta.color, borderColor: meta.color }
    : { background: `${meta.color}26`, color: meta.color };

  if (asLink) {
    return (
      <Link
        href={localePath(locale, `/blog/category/${meta.urlSlug[locale]}`)}
        className={className}
        style={style}
      >
        {inner}
      </Link>
    );
  }
  return (
    <span className={className} style={style}>
      {inner}
    </span>
  );
}

export function CoverPlaceholder({
  category,
  height = 200,
  className,
}: {
  category: CategorySlug;
  height?: number;
  className?: string;
}) {
  const meta = CATEGORIES[category];
  return (
    <div
      className={`relative rounded-2xl overflow-hidden ${className ?? ""}`}
      style={{
        height,
        background: `linear-gradient(135deg, color-mix(in srgb, ${meta.color} 25%, transparent) 0%, color-mix(in srgb, ${meta.color} 8%, transparent) 100%)`,
      }}
      aria-hidden
    >
      <svg
        className="absolute inset-0 w-full h-full opacity-35"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id={`p-${category}`}
            width="22"
            height="22"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="3" cy="3" r="1.2" fill={meta.color} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#p-${category})`} />
      </svg>
      <div
        className="absolute -right-4 -bottom-4 opacity-40"
        style={{ color: meta.color }}
      >
        <BIcon name={meta.icon} size={Math.min(height, 180)} />
      </div>
    </div>
  );
}
