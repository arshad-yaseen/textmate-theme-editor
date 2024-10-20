import { CodeMirrorOptions, MonacoEditorOptions } from "@/types/code";
import { BundledLanguage } from "shiki";

export const DEFAULT_MONACO_OPTIONS: MonacoEditorOptions = {
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
  fontSize: 14,
  lineDecorationsWidth: 10,
  fontWeight: "500",
  lineHeight: 25,
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

export const DEFAULT_CODE_MIRROR_OPTIONS: CodeMirrorOptions = {
  bracketMatching: true,
  closeBrackets: true,
  autocompletion: true,
  defaultKeymap: true,
  searchKeymap: true,
  historyKeymap: true,
  foldKeymap: true,
  foldGutter: false,
  completionKeymap: true,
  tabSize: 2,
};
export const LANGUAGES: BundledLanguage[] = [
  "javascript",
  "python",
  "java",
  "c++",
  "typescript",
  "json",
];
