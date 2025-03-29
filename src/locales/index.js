import en from "./en";
import ar from "./ar";
import fr from "./fr";
import zh from "./zh";

const translations = { en, ar, fr, zh };

export const getLanguageContent = (language = "en") => {
  return translations[language] || translations.en;
};

export default translations;
