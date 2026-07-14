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

type Locale = "pt" | "en";

interface I18nContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: TranslationKey) => string;
  locale: Locale;
  setLocale: (l: Locale) => void;
  formatCurrency: (n: number) => string;
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

const STORAGE_KEY = "cofrinho-lang";

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    if (typeof window === "undefined") return "pt";
    const stored = localStorage.getItem(STORAGE_KEY) as Language | null;
    if (stored === "pt" || stored === "en") return stored;
    return navigator.language.startsWith("pt") ? "pt" : "en";
  });
  const [locale, setLocaleState] = useState<Locale>("pt");
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

  const formatCurrency = (n: number) => {
    if (locale === "pt")
      return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    return n.toLocaleString("en-US", { style: "currency", currency: "USD" });
  };

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
  }, [lang]);

  const setLang = (l: Language) => setLangState(l);
  const t = (key: TranslationKey) => translations[lang][key] ?? key;

  return (
    <I18nContext.Provider value={{ lang, setLang, t, locale, setLocale, formatCurrency }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
