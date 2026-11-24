"use client";

import { useEffect } from "react";
import type { PregnancyWeek, StoryRuntimeMessages } from "@/i18n/storyTypes";
import { initStory } from "./storyEngine";

/** Boots the landing story behaviour once the static markup is on the page. */
export function StoryRuntime({
  messages,
  locale,
  weeks,
}: {
  messages: StoryRuntimeMessages;
  locale: string;
  weeks: Record<number, PregnancyWeek>;
}) {
  useEffect(() => initStory(messages, locale, weeks), [messages, locale, weeks]);
  return null;
}
