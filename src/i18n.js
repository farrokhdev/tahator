import translationEN from "./locales/en/translation.json";
import translationTr from "./locales/tr/translation.json";
import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

// the translations
const resources = {
  en: {
    translation: translationEN,
  },
  tr: {
    translation: translationTr,
  },
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: "tr",
  // use en if detected lng is not available
  lng: "tr",
  // defaultLanguage: "tr",
  // otherLanguages: ["en"],

  // we do not use keys in form messages.welcome
  // keySeparator: false

  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18n;
