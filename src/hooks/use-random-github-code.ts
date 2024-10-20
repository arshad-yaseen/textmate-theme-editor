import { useState, useCallback } from "react";

export interface CodeSnippet {
  name: string;
  path: string;
  repository: {
    full_name: string;
    html_url: string;
  };
  url: string;
  html_url: string;
  content: string;
}

interface UseRandomGithubCodeReturn {
  codeSnippet: CodeSnippet | null;
  loading: boolean;
  error: string | null;
  getRandomCode: (language: string) => Promise<void>;
}

const useRandomGithubCode = (): UseRandomGithubCodeReturn => {
  const [codeSnippet, setCodeSnippet] = useState<CodeSnippet | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getRandomCode = useCallback(async (language: string) => {
    setLoading(true);
    setError(null);
    setCodeSnippet(null);

    try {
      const response = await fetch(
        `/api/random-github-code?language=${encodeURIComponent(language)}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch code snippet.");
      }

      const data = await response.json();
      const snippet: CodeSnippet = data.codeSnippet;

      if (!snippet) {
        throw new Error("No code snippet received.");
      }

      setCodeSnippet(snippet);
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  return { codeSnippet, loading, error, getRandomCode };
};

export default useRandomGithubCode;
