import { useTMThemeStoreShallow } from "@/stores/tm-theme";
import { tryParseJSON } from "@/utils/json";
import { useEffect, useState } from "react";
import { codeToHtml } from "shiki";
import {
  JS_CODE,
  JS_SMALL_CODE,
  JSON_CODE,
  JSX_CODE,
  PYTHON_CODE,
  PYTHON_SMALL_CODE,
  SHELL_CODE,
} from "@/constants/code-examples";

const Preview = () => {
  const [html, setHtml] = useState<string | null>(null);
  const [tmThemeJSON] = useTMThemeStoreShallow((state) => [state.tmThemeJSON]);

  useEffect(() => {
    (async () => {
      try {
        const theme = tryParseJSON(tmThemeJSON);
        if (theme) {
          const html = await codeToHtml(PYTHON_CODE, {
            lang: "python",
            theme,
          });

          setHtml(html);
        }
      } catch {}
    })();
  }, [tmThemeJSON]);

  return (
    <div className="w-full h-full p-4 pt-14">
      <div
        dangerouslySetInnerHTML={{ __html: html ?? "" }}
        className={
          "shiki-container relative flex h-[85vh] overflow-hidden hyphens-none whitespace-pre break-normal rounded-lg border bg-background text-left font-mono text-sm no-scrollbar [word-spacing:normal]"
        }
      />
    </div>
  );
};

export default Preview;
