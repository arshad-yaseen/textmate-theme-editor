"use client";

import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { CodeMirrorProps } from "@/types/code";
import { DEFAULT_CODE_MIRROR_OPTIONS } from "@/constants/code";
import { githubDark, githubLight } from "@uiw/codemirror-theme-github";
import { useTheme } from "next-themes";

export const CodeEditor = (props: CodeMirrorProps) => {
  const { resolvedTheme } = useTheme();

  return (
    <CodeMirror
      extensions={[json()]}
      theme={resolvedTheme === "dark" ? githubDark : githubLight}
      {...props}
      basicSetup={DEFAULT_CODE_MIRROR_OPTIONS}
    />
  );
};
