import { EditorProps, Monaco } from "@monaco-editor/react";
import * as monaco from "monaco-editor";

import { BundledTheme } from "shiki";

export type CodeTheme = BundledTheme;

export type EditorOptions = monaco.editor.IStandaloneEditorConstructionOptions;
export type EditorModelContentChangedEvent =
  monaco.editor.IModelContentChangedEvent;
export type EditorModel = monaco.editor.ITextModel;
export type StandaloneEditor = monaco.editor.IStandaloneCodeEditor;

export type CodeThemeObject = {
  light: CodeTheme;
  dark: CodeTheme;
};

export type CodeEditorRef = {
  editor: StandaloneEditor;
  model: EditorModel | null;
};

export type CodeEditorProps = Omit<EditorProps, "theme" | "onMount"> & {
  hideCodeFormatter?: boolean;
  containerClassName?: string;
  readOnly?: boolean;
  theme?: CodeThemeObject;
  onMount?: (
    editor: StandaloneEditor,
    monaco: Monaco,
    model: EditorModel | null
  ) => void | Promise<void>;
};
