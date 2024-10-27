import { CodeMirrorOptions } from "@/types/code";
import { BundledLanguage } from "shiki";

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
  "yaml",
  "css",
  "markdown",
  "html",
  "shell",
  "bash",
];
