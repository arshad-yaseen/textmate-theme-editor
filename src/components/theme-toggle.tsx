"use client";

import { SunIcon, MoonIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";
import { useCallback } from "react";

const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();

  const handleToggle = useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [setTheme, resolvedTheme]);

  return (
    <Button variant="ghost" size="icon" onClick={handleToggle}>
      <SunIcon
        onClick={() => setTheme("light")}
        className="h-5 w-5 hidden dark:block"
      />
      <MoonIcon
        onClick={() => setTheme("dark")}
        className="h-5 w-5 block dark:hidden"
      />
    </Button>
  );
};

export default ThemeToggle;
