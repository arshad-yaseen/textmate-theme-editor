import { DEFAULT_MONACO_OPTIONS } from "@/constants/code";
import Editor from "@monaco-editor/react";

const JAVASCRIPT_CODE = `
const a = 1;
const b = 2;
const c = a + b;
console.log(c);
`.trim();

const Preview = () => {
  return (
    <div className="w-full h-full p-4">
      <Editor
        height="100vh"
        width="100%"
        language="javascript"
        theme="light"
        defaultValue={JAVASCRIPT_CODE}
        options={DEFAULT_MONACO_OPTIONS}
      />
    </div>
  );
};

export default Preview;
