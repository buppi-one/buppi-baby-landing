/** Line icons used inside the phone demos. Ids are shared with storyEngine.ts. */
const ICON_ID_PREFIX = "st-i-";

const PATHS = {
  heart: <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />,
  cup: <path d="M8 9h8l-1 11H9L8 9zM10 4h4v5h-4z" />,
  spark: <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />,
  cloud: <path d="M7.5 18a4 4 0 0 1 .4-8A5.5 5.5 0 0 1 18.4 11.6 3.3 3.3 0 0 1 17.5 18z" />,
  drop: <path d="M12 4c3 4 5 6.5 5 9.5a5 5 0 0 1-10 0C7 10.5 9 8 12 4z" />,
  fork: <path d="M7 3v7a2 2 0 0 0 4 0V3M9 12v9M16 3c-2 2-2 6 0 8v10" />,
  moon: <path d="M19 14.5A8 8 0 1 1 9.5 5a6.5 6.5 0 0 0 9.5 9.5z" />,
  plus: <path d="M12 5v14M5 12h14" />,
  x: <path d="M6 6l12 12M18 6L6 18" />,
  home: <path d="M4 11l8-7 8 7v9h-5v-6H9v6H4z" />,
  bars: <path d="M5 20V10M12 20V4M19 20v-7" />,
  book: <path d="M4 5c3-1 5-1 8 1 3-2 5-2 8-1v14c-3-1-5-1-8 1-3-2-5-2-8-1zM12 6v14" />,
  baby: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M9 14.5c1 1.3 5 1.3 6 0M9.5 10.5h.01M14.5 10.5h.01" />
    </>
  ),
  chev: <path d="M9 6l6 6-6 6" />,
  back: <path d="M15 6l-6 6 6 6" />,
  check: <path d="M5 12l5 5 9-10" />,
  bell: <path d="M6 17V11a6 6 0 0 1 12 0v6l1.5 2h-15zM10 21h4" />,
  gear: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
    </>
  ),
  share: (
    <>
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="18" cy="6" r="2.5" />
      <circle cx="18" cy="18" r="2.5" />
      <path d="M8.2 10.9l7.6-3.8M8.2 13.1l7.6 3.8" />
    </>
  ),
} as const;

export type StoryIconName = keyof typeof PATHS;

/** Hidden sprite; render once per page, before any <StoryIcon>. */
export function StoryIconSprite() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <defs>
        {(Object.keys(PATHS) as StoryIconName[]).map((name) => (
          <symbol key={name} id={`${ICON_ID_PREFIX}${name}`} viewBox="0 0 24 24">
            {PATHS[name]}
          </symbol>
        ))}
      </defs>
    </svg>
  );
}

export function StoryIcon({ name }: { name: StoryIconName }) {
  return (
    <svg aria-hidden="true">
      <use href={`#${ICON_ID_PREFIX}${name}`} />
    </svg>
  );
}
