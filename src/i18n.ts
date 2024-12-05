import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";

export const translationsJson = {
  en: {
    translation: en,
  },
};

i18next.use(initReactI18next).init({
  resources: translationsJson,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
