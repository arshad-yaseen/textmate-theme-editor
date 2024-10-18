import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/theme-toggle";
import Logo from "@/components/logo";
import Link from "next/link";

const EditorHeader = () => {
  return (
    <header className="flex justify-between items-center py-3 px-4 border-b">
      <div className="flex items-center space-x-2">
        <Link href="/">
          <Logo className="size-7" />
        </Link>
        <h1 className="text-xl font-semibold">Editor</h1>
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="outline">Export</Button>
        <ThemeToggle />
      </div>
    </header>
  );
};

export default EditorHeader;
