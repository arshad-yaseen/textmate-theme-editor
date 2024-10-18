import { CodeEditor } from "@/components/code-editor";
import { useTMThemeStoreShallow } from "@/stores/tm-theme";

const RawEditor = () => {
  const [tmThemeJSON, setTMThemeJSON] = useTMThemeStoreShallow((state) => [
    state.tmThemeJSON,
    state.setTMThemeJSON,
  ]);

  return (
    <CodeEditor value={tmThemeJSON} onChange={setTMThemeJSON} height="85vh" />
  );
};

export default RawEditor;
