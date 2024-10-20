import { CodeEditor } from "@/components/code-editor";
import { useTMThemeStoreShallow } from "@/stores/tm-theme";
import stripJsonComments from "strip-json-comments";

const RawEditor = () => {
  const [tmThemeJSON, setTMThemeJSON] = useTMThemeStoreShallow((state) => [
    state.tmThemeJSON,
    state.setTMThemeJSON,
  ]);

  return (
    <CodeEditor
      value={tmThemeJSON}
      onChange={(value) => setTMThemeJSON(stripJsonComments(value))}
      height="85vh"
    />
  );
};

export default RawEditor;
