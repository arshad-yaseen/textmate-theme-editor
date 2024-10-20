import { CodeEditor } from "@/components/code-editor";
import { useTMThemeStoreShallow } from "@/stores/tm-theme";
import { tryParseJSON } from "@/utils/json";
import { useTheme } from "next-themes";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const RawEditor = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const searchParams = useSearchParams();
  const [isDemo, setIsDemo] = useState(false);
  const [tmThemeJSON, setTMThemeJSON] = useTMThemeStoreShallow((state) => [
    state.tmThemeJSON,
    state.setTMThemeJSON,
  ]);

  useEffect(() => {
    const themeUrl = searchParams.get("demo");
    if (themeUrl) {
      fetch(themeUrl)
        .then((res) => res.text())
        .then((json) => {
          const parsed = tryParseJSON(json);
          if (parsed) {
            const type = parsed.type;
            if (type === "light" && resolvedTheme !== "light") {
              setTheme("light");
            } else if (type === "dark" && resolvedTheme !== "dark") {
              setTheme("dark");
            }
            setTMThemeJSON(JSON.stringify(parsed, null, 2));
            setIsDemo(true);
          }
        });
    }

    return () => {
      setIsDemo(false);
    };
  }, [searchParams, resolvedTheme, setTheme, setTMThemeJSON]);

  return (
    <CodeEditor
      value={tmThemeJSON}
      onChange={(value) => setTMThemeJSON(value)}
      height="85vh"
      readOnly={isDemo}
    />
  );
};

export default RawEditor;
