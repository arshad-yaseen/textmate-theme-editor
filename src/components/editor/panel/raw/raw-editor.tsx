"use client";

import { CodeEditor } from "@/components/code-editor";
import { DEFAULT_TM_THEME_JSON } from "@/constants/tm-theme";
import { useTMThemeStoreShallow } from "@/stores/tm-theme";
import { tryParseJSON } from "@/utils/json";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const RawEditor = () => {
  const searchParams = useSearchParams();
  const [tmThemeJSON, setTMThemeJSON] = useTMThemeStoreShallow((state) => [
    state.tmThemeJSON,
    state.setTMThemeJSON,
  ]);

  useEffect(() => {
    if (!tmThemeJSON) {
      setTMThemeJSON(DEFAULT_TM_THEME_JSON);
    }
  }, [tmThemeJSON, setTMThemeJSON]);

  useEffect(() => {
    const themeUrl = searchParams.get("preview");
    if (themeUrl) {
      fetch(themeUrl)
        .then((res) => res.text())
        .then((json) => {
          const parsed = tryParseJSON(json);
          if (parsed) {
            setTMThemeJSON(JSON.stringify(parsed, null, 2));
          }
        });
    }
  }, [searchParams, setTMThemeJSON]);

  return (
    <CodeEditor
      value={tmThemeJSON}
      onChange={(value) => setTMThemeJSON(value)}
      height="85vh"
    />
  );
};

export default RawEditor;
