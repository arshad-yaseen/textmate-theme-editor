"use client";

import { TooltipProvider } from "@radix-ui/react-tooltip";
import { ThemeProvider } from "next-themes";
import { PropsWithChildren } from "react";

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <ThemeProvider
      defaultTheme="dark"
      disableTransitionOnChange
      attribute="class"
    >
      <TooltipProvider>{children}</TooltipProvider>
    </ThemeProvider>
  );
};

export default Providers;
