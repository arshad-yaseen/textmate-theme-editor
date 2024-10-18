"use client";

import EditorHeader from "@/components/editor/editor-header";
import Panel from "@/components/editor/panel/panel";
import Preview from "@/components/editor/preview/preview";

const Editor = () => {
  return (
    <div className="flex flex-col h-screen">
      <EditorHeader />
      <main className="flex flex-grow overflow-hidden">
        <div className="w-full md:w-1/2 h-full overflow-auto">
          <Panel />
        </div>
        <div className="hidden md:block w-1/2 h-full overflow-auto border-l">
          <Preview />
        </div>
      </main>
    </div>
  );
};

export default Editor;
