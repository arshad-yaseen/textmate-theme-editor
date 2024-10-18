import { ReactCodeMirrorProps } from "@uiw/react-codemirror";
import * as monaco from "monaco-editor";

export type MonacoEditorOptions =
  monaco.editor.IStandaloneEditorConstructionOptions;

export type CodeMirrorProps = ReactCodeMirrorProps;
export type CodeMirrorOptions = ReactCodeMirrorProps["basicSetup"];
