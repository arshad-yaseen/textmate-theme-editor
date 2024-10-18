import { DEFAULT_MONACO_OPTIONS } from "@/constants/code";
import Editor from "@monaco-editor/react";

const Preview = () => {
  return (
    <div>
      <Editor
        height="100vh"
        width="100%"
        language="json"
        theme="vs-dark"
        defaultValue={JSON.stringify(
          {
            name: "John Doe",
            age: 30,
            email: "john.doe@example.com",
          },
          null,
          2
        )}
        options={DEFAULT_MONACO_OPTIONS}
      />
    </div>
  );
};

export default Preview;
