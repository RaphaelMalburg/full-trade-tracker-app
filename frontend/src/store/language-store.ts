import { create } from "zustand";
import { persist } from "zustand/middleware";
import { defaultLocale } from "@/i18n";

interface LanguageState {
  language: string;
  setLanguage: (language: string) => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: defaultLocale,
      setLanguage: (language: string) => set({ language }),
    }),
    {
      name: "language-storage",
    }
  )
);
