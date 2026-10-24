import { createContext, useContext, useEffect, useState } from "react";
import french from "./fr.json";

const normalize = value => String(value ?? "").replace(/\s+/g, " ").trim();
export function translate(value, language) {
  if (value === null || value === undefined) return "";
  const text = String(value);
  if (language !== "fr") return text;
  const translated = french[normalize(text)];
  if (!translated) return text;
  return `${/^\s/.test(text) ? " " : ""}${translated}${/\s$/.test(text) ? " " : ""}`;
}
const LanguageContext = createContext({ language: "en", setLanguage: () => {}, t: value => value });

export function LanguageProvider({ children }) {
  // English is also the pre-rendered language; restore the visitor's choice after mounting.
  const [language, setLanguage] = useState("en");
  useEffect(() => {
    try {
      const saved = localStorage.getItem("portfolio-language");
      if (saved === "fr" || saved === "en") setLanguage(saved);
    } catch { /* Language selection remains usable when storage is unavailable. */ }
  }, []);
  function chooseLanguage(next) {
    if (next !== "fr" && next !== "en") return;
    setLanguage(next);
    try { localStorage.setItem("portfolio-language", next); } catch { /* Optional persistence. */ }
  }
  useEffect(() => { document.documentElement.lang = language; }, [language]);
  return <LanguageContext.Provider value={{ language, setLanguage: chooseLanguage, t: value => translate(value, language) }}>{children}</LanguageContext.Provider>;
}
export const useLanguage = () => useContext(LanguageContext);
export function Text({ value }) {
  const { t } = useLanguage();
  return t(value);
}
export function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();
  return <div className="language-switcher" role="group" aria-label={t("Language")}>
    <button type="button" lang="fr" aria-label="Français" aria-pressed={language === "fr"} onClick={() => setLanguage("fr")}>FR</button>
    <button type="button" lang="en" aria-label="English" aria-pressed={language === "en"} onClick={() => setLanguage("en")}>EN</button>
  </div>;
}
