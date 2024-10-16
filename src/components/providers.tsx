"use client";

import { TooltipProvider } from "@radix-ui/react-tooltip";
import { ThemeProvider } from "next-themes";
import { PropsWithChildren } from "react";
import RegisterCodeEditor from "./code/register-code-editor";

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <ThemeProvider
      defaultTheme="dark"
      disableTransitionOnChange
      attribute="class"
    >
      <RegisterCodeEditor />
      <TooltipProvider>{children}</TooltipProvider>
    </ThemeProvider>
  );
};

export default Providers;
