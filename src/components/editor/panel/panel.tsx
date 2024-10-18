import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import UIEditor from "./ui";
import RawEditor from "./raw/raw-editor";
import useLocalStorage from "@/hooks/use-local-storage";

const Panel = () => {
  const [activeTab, setActiveTab] = useLocalStorage("editor-active-tab", "ui");

  return (
    <div className="px-4 pb-4 pt-3">
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-fit grid-cols-2">
          <TabsTrigger value="ui">UI Editor</TabsTrigger>
          <TabsTrigger value="raw">Raw Editor</TabsTrigger>
        </TabsList>
        <TabsContent value="ui">
          <UIEditor />
        </TabsContent>
        <TabsContent value="raw">
          <RawEditor />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Panel;
