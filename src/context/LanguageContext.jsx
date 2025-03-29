import { createContext, useState, useContext, useEffect } from "react";
import api from "../services/api";

export const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(
    () => localStorage.getItem("language") || "en"
  );

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
    document.dir = newLanguage === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = newLanguage;
    api.updateLanguage(newLanguage);
    // Dispatch custom event for components to reload data
    window.dispatchEvent(
      new CustomEvent("languageChange", { detail: newLanguage })
    );
  };

  useEffect(() => {
    // Initial setup
    document.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
    api.updateLanguage(language);
  }, []);

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
