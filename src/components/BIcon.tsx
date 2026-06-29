import type { SVGProps } from "react";

export type BIconName =
  | "star"
  | "check"
  | "chev"
  | "plus"
  | "heart"
  | "heart-filled"
  | "moon"
  | "sun"
  | "bottle"
  | "drop"
  | "bath"
  | "walk"
  | "trophy"
  | "bell"
  | "sparkle"
  | "users"
  | "lock"
  | "cloud"
  | "phone"
  | "play"
  | "pause"
  | "stop"
  | "switch"
  | "baby"
  | "diaper"
  | "thumb-up"
  | "smile"
  | "chart-bar"
  | "bolt"
  | "globe"
  | "menu"
  | "search"
  | "share"
  | "mail"
  | "link"
  | "whatsapp"
  | "x-twitter";

type IconEntry = { children: React.ReactNode; mode: "stroke" | "fill" };
const STROKE = (children: React.ReactNode): IconEntry => ({ children, mode: "stroke" });
const FILL = (children: React.ReactNode): IconEntry => ({ children, mode: "fill" });

const PATHS: Record<BIconName, IconEntry> = {
  star: FILL(<path d="M12 2l2.6 6.7 7.1.5-5.4 4.6 1.7 6.9L12 17l-6 3.7 1.7-6.9L2.3 9.2l7.1-.5z" />),
  check: STROKE(<polyline points="4 12 10 18 20 6" strokeWidth="2.4" />),
  chev: STROKE(<polyline points="9 6 15 12 9 18" />),
  plus: STROKE(
    <>
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </>,
  ),
  heart: STROKE(
    <path d="M12 21s-7-4.5-9-9.5C1.5 7 5 3.5 8.5 5 10.5 5.8 12 7.5 12 7.5s1.5-1.7 3.5-2.5C19 3.5 22.5 7 21 11.5c-2 5-9 9.5-9 9.5z" />,
  ),
  "heart-filled": FILL(
    <path d="M12 21s-7-4.5-9-9.5C1.5 7 5 3.5 8.5 5 10.5 5.8 12 7.5 12 7.5s1.5-1.7 3.5-2.5C19 3.5 22.5 7 21 11.5c-2 5-9 9.5-9 9.5z" />,
  ),
  moon: FILL(<path d="M20 14.5A8 8 0 119.5 4 6.5 6.5 0 0020 14.5z" />),
  sun: STROKE(
    <>
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2" x2="12" y2="5" />
      <line x1="12" y1="19" x2="12" y2="22" />
      <line x1="2" y1="12" x2="5" y2="12" />
      <line x1="19" y1="12" x2="22" y2="12" />
      <line x1="4.5" y1="4.5" x2="6.5" y2="6.5" />
      <line x1="17.5" y1="17.5" x2="19.5" y2="19.5" />
      <line x1="4.5" y1="19.5" x2="6.5" y2="17.5" />
      <line x1="17.5" y1="6.5" x2="19.5" y2="4.5" />
    </>,
  ),
  bottle: FILL(
    <>
      <rect x="8" y="3" width="8" height="3" rx="1.5" />
      <path d="M8 7h8v11a3 3 0 01-3 3h-2a3 3 0 01-3-3V7z" />
    </>,
  ),
  drop: FILL(<path d="M12 3s7 7.5 7 12a7 7 0 11-14 0c0-4.5 7-12 7-12z" />),
  bath: STROKE(
    <>
      <path d="M3 12h18v2a4 4 0 01-4 4H7a4 4 0 01-4-4z" fillOpacity="0.2" fill="currentColor" />
      <path d="M5 18l-1 3M19 18l1 3M7 12V7a3 3 0 016 0" />
      <circle cx="9" cy="7" r="1.4" />
    </>,
  ),
  walk: STROKE(
    <>
      <circle cx="13" cy="4" r="1.6" />
      <path d="M9 21l3-7 3 4 3-2" />
      <path d="M9 11l3-3 3 3 3-2" />
    </>,
  ),
  trophy: STROKE(
    <>
      <path d="M7 4h10v4a5 5 0 11-10 0z" />
      <path d="M5 6H3a3 3 0 003 3M19 6h2a3 3 0 01-3 3M9 18h6M10 14v4M14 14v4M8 21h8" />
    </>,
  ),
  bell: STROKE(
    <>
      <path d="M6 8a6 6 0 0112 0c0 7 3 9 3 9H3s3-2 3-9z" />
      <path d="M10 21a2 2 0 004 0" />
    </>,
  ),
  sparkle: FILL(
    <>
      <path d="M12 2l1.6 5.4 5.4 1.6-5.4 1.6L12 16l-1.6-5.4L5 9l5.4-1.6z" />
      <path d="M19 14l.8 2.2 2.2.8-2.2.8L19 20l-.8-2.2-2.2-.8 2.2-.8z" />
    </>,
  ),
  users: STROKE(
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M3 20a6 6 0 0112 0" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M15 20a6 6 0 016-6" />
    </>,
  ),
  lock: STROKE(
    <>
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 018 0v4" />
    </>,
  ),
  cloud: STROKE(<path d="M7 18a4 4 0 01-1-7.9A6 6 0 0118 9.5 4 4 0 0117 18z" />),
  phone: STROKE(
    <>
      <rect x="6" y="2" width="12" height="20" rx="2.5" />
      <line x1="11" y1="18" x2="13" y2="18" />
    </>,
  ),
  play: FILL(<path d="M7 5l12 7-12 7z" />),
  pause: FILL(
    <>
      <rect x="6" y="5" width="4" height="14" />
      <rect x="14" y="5" width="4" height="14" />
    </>,
  ),
  stop: FILL(<rect x="5" y="5" width="14" height="14" rx="2" />),
  switch: STROKE(
    <>
      <polyline points="17 3 21 7 17 11" />
      <line x1="3" y1="7" x2="21" y2="7" />
      <polyline points="7 13 3 17 7 21" />
      <line x1="21" y1="17" x2="3" y2="17" />
    </>,
  ),
  baby: STROKE(
    <>
      <circle cx="12" cy="9" r="5" />
      <path d="M9 9h.01M15 9h.01M9.5 12c.7.6 4.3.6 5 0" />
      <path d="M5 21c1-3 4-5 7-5s6 2 7 5" />
    </>,
  ),
  diaper: STROKE(
    <>
      <path d="M3 8c0 8 4 11 9 11s9-3 9-11" />
      <path d="M3 8h18" />
      <path d="M9 11h6" />
    </>,
  ),
  "thumb-up": STROKE(
    <>
      <path d="M7 22V11l5-8 1 1c.5.5.7 1.2.5 2l-1 4h6a2 2 0 012 2l-1.5 8a2 2 0 01-2 2z" />
      <line x1="3" y1="11" x2="7" y2="11" />
    </>,
  ),
  smile: STROKE(
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <circle cx="9" cy="10" r="0.6" fill="currentColor" />
      <circle cx="15" cy="10" r="0.6" fill="currentColor" />
    </>,
  ),
  "chart-bar": STROKE(
    <>
      <line x1="3" y1="20" x2="21" y2="20" />
      <rect x="6" y="11" width="3" height="9" />
      <rect x="11" y="6" width="3" height="14" />
      <rect x="16" y="14" width="3" height="6" />
    </>,
  ),
  bolt: FILL(<path d="M13 2L4 14h7l-1 8 9-12h-7z" />),
  globe: STROKE(
    <>
      <circle cx="12" cy="12" r="9" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <path d="M12 3a14 14 0 010 18M12 3a14 14 0 000 18" />
    </>,
  ),
  menu: STROKE(
    <>
      <line x1="4" y1="7" x2="20" y2="7" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="17" x2="20" y2="17" />
    </>,
  ),
  search: STROKE(
    <>
      <circle cx="11" cy="11" r="7" />
      <line x1="16.5" y1="16.5" x2="21" y2="21" />
    </>,
  ),
  share: STROKE(
    <>
      <circle cx="18" cy="5" r="2.2" />
      <circle cx="6" cy="12" r="2.2" />
      <circle cx="18" cy="19" r="2.2" />
      <line x1="8" y1="11" x2="16" y2="6" />
      <line x1="8" y1="13" x2="16" y2="18" />
    </>,
  ),
  mail: STROKE(
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <polyline points="3 7 12 13 21 7" />
    </>,
  ),
  link: STROKE(
    <>
      <path d="M10 14a4 4 0 005.66 0l3-3a4 4 0 10-5.66-5.66l-1 1" />
      <path d="M14 10a4 4 0 00-5.66 0l-3 3a4 4 0 105.66 5.66l1-1" />
    </>,
  ),
  whatsapp: FILL(
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />,
  ),
  "x-twitter": FILL(
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />,
  ),
};

type Props = SVGProps<SVGSVGElement> & {
  name: BIconName;
  size?: number | string;
  title?: string;
};

export function BIcon({ name, size = "1em", title, className, ...rest }: Props) {
  const entry = PATHS[name];
  const isFill = entry.mode === "fill";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={isFill ? "currentColor" : "none"}
      stroke={isFill ? "none" : "currentColor"}
      strokeWidth={isFill ? undefined : 1.8}
      strokeLinecap={isFill ? undefined : "round"}
      strokeLinejoin={isFill ? undefined : "round"}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      className={className}
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      {entry.children}
    </svg>
  );
}
