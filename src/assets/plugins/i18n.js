import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "/public/locales/en.json";
import uk from "/public/locales/uk.json";

i18n.use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: "uk",
        debug: false,

        interpolation: {
            escapeValue: false,
        },

        resources: {
            en: {    
                translation: en
            },
            uk: {
                translation: uk
            }
        },
    });
export default i18n;
