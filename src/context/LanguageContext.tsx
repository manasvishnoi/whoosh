"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { t, Lang } from "@/lib/translations";

type LanguageContextType = {
  lang: Lang;
  toggleLang: () => void;
  T: typeof t.en;
};

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  toggleLang: () => {},
  T: t.en,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  const toggleLang = useCallback(() => {
    setLang((prev) => (prev === "en" ? "hi" : "en"));
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, T: t[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
