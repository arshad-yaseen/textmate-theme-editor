"use client";

import { useCallback, useEffect, useState } from "react";
import { codeToHtml } from "shiki";
import { AlertCircle, Loader } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import useRandomGithubCode, {
  CodeSnippet,
} from "@/hooks/use-random-github-code";
import { useTMThemeStoreShallow } from "@/stores/tm-theme";
import useLocalStorage from "@/hooks/use-local-storage";
import { tryParseJSON } from "@/utils/json";
import PreviewHeader from "./preview-header";

const Preview = () => {
  const [html, setHtml] = useState<string | null>(null);
  const [tmThemeJSON] = useTMThemeStoreShallow((state) => [state.tmThemeJSON]);
  const { codeSnippet, loading, error, getRandomCode } = useRandomGithubCode();
  const [storedCodeSnippet, setStoredCodeSnippet] =
    useLocalStorage<CodeSnippet | null>("storedCodeSnippet", null);
  const [selectedLanguage, setSelectedLanguage] = useLocalStorage<string>(
    "selectedLanguage",
    "javascript"
  );

  const fetchInitialCode = useCallback(async () => {
    if (!storedCodeSnippet) {
      await getRandomCode(selectedLanguage);
    }
  }, [selectedLanguage, getRandomCode, storedCodeSnippet]);

  useEffect(() => {
    fetchInitialCode();
  }, [fetchInitialCode]);

  useEffect(() => {
    if (codeSnippet) {
      setStoredCodeSnippet(codeSnippet);
    }
  }, [codeSnippet, setStoredCodeSnippet]);

  useEffect(() => {
    const renderCode = async () => {
      try {
        const theme = tryParseJSON(tmThemeJSON);
        const snippetToUse = codeSnippet || storedCodeSnippet;
        if (theme && snippetToUse) {
          const renderedHtml = await codeToHtml(snippetToUse.content, {
            lang: selectedLanguage,
            theme,
          });
          setHtml(renderedHtml);
        }
      } catch (error) {
        console.error("Error rendering code:", error);
      }
    };

    renderCode();
  }, [tmThemeJSON, codeSnippet, storedCodeSnippet, selectedLanguage]);

  const handleFetchRandomCode = useCallback(async () => {
    await getRandomCode(selectedLanguage);
  }, [getRandomCode, selectedLanguage]);

  const handleLanguageChange = useCallback(
    async (value: string) => {
      setSelectedLanguage(value);
      await getRandomCode(value);
    },
    [getRandomCode, setSelectedLanguage]
  );

  return (
    <div className="w-full h-full flex flex-col px-4">
      <PreviewHeader
        selectedLanguage={selectedLanguage}
        onLanguageChange={handleLanguageChange}
        onFetchRandomCode={handleFetchRandomCode}
        loading={loading}
      />

      {error && (
        <Alert variant="destructive" className="mb-2">
          <AlertCircle className="size-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loader"
            className="flex items-center justify-center flex-grow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <Loader className="size-4 animate-spin text-primary" />
          </motion.div>
        ) : html ? (
          <motion.div
            key="codeblock"
            className="flex-grow overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div
              dangerouslySetInnerHTML={{ __html: html }}
              className="shiki-container relative flex h-[calc(100%-25px)] overflow-hidden hyphens-none whitespace-pre break-normal rounded-lg border border-input bg-background text-left font-mono text-sm no-scrollbar [word-spacing:normal]"
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default Preview;
