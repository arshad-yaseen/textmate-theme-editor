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
        className="size-4 hidden dark:block"
      />
      <MoonIcon
        onClick={() => setTheme("dark")}
        className="size-4 block dark:hidden"
      />
    </Button>
  );
};

export default ThemeToggle;
