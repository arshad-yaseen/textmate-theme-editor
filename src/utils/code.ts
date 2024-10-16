import {
  DARK_CODE_THEMES,
  DEFAULT_DARK_CODE_THEME,
  DEFAULT_LIGHT_CODE_THEME,
  LIGHT_CODE_THEMES,
} from "@/constants/code";
import { CodeThemeObject } from "@/types/code";
import {
  BundledLanguage,
  BundledTheme,
  createHighlighter,
  HighlighterGeneric,
} from "shiki";

let highlighterInstance: HighlighterGeneric<
  BundledLanguage,
  BundledTheme
> | null = null;

export const getHighlighter = async (): Promise<
  HighlighterGeneric<BundledLanguage, BundledTheme>
> => {
  if (!highlighterInstance) {
    highlighterInstance = await createHighlighter({
      themes: [...DARK_CODE_THEMES, ...LIGHT_CODE_THEMES],
      langs: ["javascript", "typescript", "python", "json"],
    });
  }
  return highlighterInstance;
};

export const getResolvedCodeTheme = (
  themeType: string | undefined,
  theme: CodeThemeObject
) => {
  const isDark = themeType === "dark";
  const isAvailable = isDark
    ? DARK_CODE_THEMES.includes(theme.dark)
    : LIGHT_CODE_THEMES.includes(theme.light);

  if (isAvailable) {
    return isDark ? theme.dark : theme.light;
  }

  return isDark ? DEFAULT_DARK_CODE_THEME : DEFAULT_LIGHT_CODE_THEME;
};
