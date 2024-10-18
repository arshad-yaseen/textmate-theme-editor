import { DEFAULT_MONACO_OPTIONS, PYTHON_CODE } from "@/constants/code";
import { useTMThemeStoreShallow } from "@/stores/tm-theme";
import { tryParseJSON } from "@/utils/json";
import Editor, { Monaco } from "@monaco-editor/react";
import { useEffect, useMemo, useState } from "react";
import { createHighlighter } from "shiki";
import { shikiToMonaco } from "@shikijs/monaco";
import { joinWithHyphen } from "@/utils/string";

const Preview = () => {
  const [monaco, setMonaco] = useState<Monaco | null>(null);
  const [tmThemeJSON] = useTMThemeStoreShallow((state) => [state.tmThemeJSON]);

  useEffect(() => {
    (async () => {
      try {
        const theme = tryParseJSON(tmThemeJSON);
        if (theme && monaco) {
          const highlighter = await createHighlighter({
            themes: [theme],
            langs: ["python"],
          });

          shikiToMonaco(highlighter, monaco);
        }
      } catch {}
    })();
  }, [tmThemeJSON, monaco]);

  const themeName: string = useMemo(() => {
    const theme = tryParseJSON(tmThemeJSON);

    if (!theme) return "";

    if ("name" in theme) {
      return theme.name as string;
    } else if (
      "displayName" in theme &&
      typeof theme.displayName === "string"
    ) {
      return joinWithHyphen(theme.displayName);
    }

    return "";
  }, [tmThemeJSON]);

  return (
    <div className="w-full h-full p-4 pt-14">
      <Editor
        width="100%"
        height="85vh"
        language="python"
        theme={themeName}
        onMount={(_, monaco) => {
          setMonaco(monaco);
        }}
        className="border border-input rounded-md overflow-hidden"
        defaultValue={PYTHON_CODE}
        options={{ ...DEFAULT_MONACO_OPTIONS, readOnly: true }}
      />
    </div>
  );
};

export default Preview;
