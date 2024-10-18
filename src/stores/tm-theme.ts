import { create } from "zustand";
import { persist } from "zustand/middleware";
import { tryParseJSON } from "@/utils/json";

import { useShallow } from "zustand/react/shallow";

interface TMThemeState {
  tmThemeJSON: string;
  setTMThemeJSON: (json: string) => void;
}

const useTMThemeStore = create<TMThemeState>()(
  persist(
    (set) => ({
      tmThemeJSON: "",
      setTMThemeJSON: (json: string) => {
        if (tryParseJSON(json)) {
          set({ tmThemeJSON: json });
        }
      },
    }),
    {
      name: "tm-theme-storage",
    }
  )
);

export const useTMThemeStoreShallow = <T>(
  shallow: Parameters<typeof useTMThemeStore<T>>[0]
) => useTMThemeStore(useShallow(shallow)) as ReturnType<typeof shallow>;

export default useTMThemeStore;
