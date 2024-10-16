import { CodeTheme, EditorOptions } from "@/types/code";

export const DEFAULT_LIGHT_CODE_THEME: CodeTheme = "vitesse-light";
export const DEFAULT_DARK_CODE_THEME: CodeTheme = "vitesse-dark";

export const DEFAULT_CODE_LANGUAGE = "javascript";

export const LIGHT_CODE_THEMES: CodeTheme[] = ["vitesse-light"];

export const DARK_CODE_THEMES: CodeTheme[] = ["vitesse-dark"];

export const DEFAULT_CODE_FONT_SIZE = 14;
export const DEFAULT_CODE_SMOOTH_CURSOR_ANIMATION = false;
export const DEFAULT_CODE_SHOW_LINE_NUMBERS = true;
export const DEFAULT_CODE_HIGHLIGHT_LINE = true;

export const DEFAULT_MONACO_OPTIONS: EditorOptions = {
  minimap: {
    enabled: false,
  },
  wordWrap: "on",
  lineNumbersMinChars: 5,
  glyphMargin: false,
  folding: false,
  overviewRulerLanes: 0,
  links: false,
  renderLineHighlightOnlyWhenFocus: true,
  renderLineHighlight: "line",
  scrollBeyondLastLine: false,
  automaticLayout: true,
  fontSize: DEFAULT_CODE_FONT_SIZE,
  lineDecorationsWidth: 10,
  fontWeight: "500",
  lineHeight: 25,
  lineNumbers: DEFAULT_CODE_SHOW_LINE_NUMBERS
    ? (lineNumber) => {
        return `<span style="padding-right:10px;">${lineNumber}</span>`;
      }
    : "off",
  cursorSmoothCaretAnimation: DEFAULT_CODE_SMOOTH_CURSOR_ANIMATION
    ? "on"
    : "off",
  find: {
    addExtraSpaceOnTop: false,
    autoFindInSelection: "never",
    seedSearchStringFromSelection: "never",
  },
  padding: {
    top: 10,
    bottom: 9,
  },
  autoIndent: "full",
  formatOnPaste: true,
  renderWhitespace: "selection",
  contextmenu: false,
  scrollbar: {
    vertical: "hidden",
    horizontal: "hidden",
    verticalSliderSize: 0,
    alwaysConsumeMouseWheel: false,
    verticalScrollbarSize: 0,
    horizontalScrollbarSize: 0,
    useShadows: false,
  },
  overviewRulerBorder: false,
  hideCursorInOverviewRuler: true,
  suggest: {
    showFiles: false,
  },
  fontFamily: "var(--font-mono)",
};
