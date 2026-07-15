import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  translations,
  type Language,
  type TranslationKey,
} from "./translations";
import type { Currency } from "../types/currency";

type Locale = "pt" | "en";

export interface I18nContextValue {
  lang: Language;
  t: (key: TranslationKey) => string;
  locale: Locale;
  setLocale: (l: Locale) => void;
  formatCurrency: (n: number, currency?: Currency) => string;
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

const STORAGE_KEY = "cofrinho-lang";

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Language>("pt");
  useEffect(() => {
    const saved = (typeof window !== "undefined" &&
      localStorage.getItem("cofrinho.locale")) as Locale | null;
    if (saved === "pt" || saved === "en") setLocaleState(saved);
  }, []);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    try {
      localStorage.setItem("cofrinho.locale", l);
    } catch {}
  };

  const formatCurrency = (value: number, currency?: Currency) => {
    if (locale === "pt")
      return value.toLocaleString("pt-BR", {style: "currency", currency: currency || "BRL" });
    return value.toLocaleString("en-US", { style: "currency", currency: currency || "USD" });
  };

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, locale);
    document.documentElement.lang = locale === "pt" ? "pt-BR" : "en";
  }, [locale]);

  const t = (key: TranslationKey) => translations[locale][key] ?? key;

  return (
    <I18nContext.Provider value={{ lang: locale, t, locale, setLocale, formatCurrency }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
