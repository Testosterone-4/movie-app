import { useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";

export const useLanguageEffect = (callback) => {
  const { language } = useLanguage();

  useEffect(() => {
    callback(language);
  }, [language, callback]);
};
