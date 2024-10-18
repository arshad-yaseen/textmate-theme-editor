import useLocalStorage from "@/hooks/use-local-storage";

import { CodeEditor } from "@/components/code-editor";
import { tryParseJSON } from "@/utils/json";

const RawEditor = () => {
  const [code, setCode] = useLocalStorage("raw-editor-code", "");

  const handleCodeChange = (value: string) => {
    if (tryParseJSON(value)) {
      setCode(value);
    }
  };

  return (
    <CodeEditor
      value={code}
      defaultValue={
        tryParseJSON(code) ? JSON.stringify(tryParseJSON(code), null, 2) : ""
      }
      onChange={handleCodeChange}
      height="85vh"
      readOnly
    />
  );
};

export default RawEditor;
