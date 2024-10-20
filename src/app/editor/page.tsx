"use client";

import dynamic from "next/dynamic";
import EditorHeader from "@/components/editor/editor-header";

const Panel = dynamic(() => import("@/components/editor/panel/panel"), {
  ssr: false,
});
const Preview = dynamic(() => import("@/components/editor/preview/preview"), {
  ssr: false,
});

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
