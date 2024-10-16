import { useCallback, useEffect, useRef } from "react";

import { loader, Monaco } from "@monaco-editor/react";
import { shikiToMonaco } from "@shikijs/monaco";
import { getHighlighter } from "@/utils/code";

const RegisterCodeEditor = () => {
  const customizeEditor = useCallback((monaco: Monaco) => {
    monaco.editor.addKeybindingRule({
      keybinding: monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS,
      command: "editor.action.formatDocument",
    });
  }, []);

  const isThemesLoaded = useRef(false);

  const loadThemes = useCallback(async (monaco: Monaco) => {
    if (!monaco || isThemesLoaded.current) return;

    const highlighter = await getHighlighter();
    shikiToMonaco(highlighter, monaco);

    isThemesLoaded.current = true;
  }, []);

  useEffect(() => {
    const cancellable = loader.init();

    cancellable
      .then((monaco) => {
        loadThemes(monaco);
        customizeEditor(monaco);
      })
      .catch(
        (error) =>
          error?.type !== "cancelation" &&
          console.error("Code editor initialization: error:", error)
      );

    return () => {
      cancellable.cancel();
    };
  }, [customizeEditor, loadThemes]);

  return null;
};

export default RegisterCodeEditor;
