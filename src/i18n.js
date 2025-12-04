import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";

const supported = ["en", "fr"];
const pathLang = window.location.pathname.split("/")[1];

i18n
	.use(HttpApi)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		supportedLngs: supported,
		fallbackLng: "en",
		debug: false,
		backend: {
			// load translation files from /public/locales
			loadPath: "/locales/{{lng}}/translation.json",
		},
		detection: {
			order: ["path", "navigator", "htmlTag"],
			lookupFromPathIndex: 0,
		},
		interpolation: {
			escapeValue: false,
		},
	});

// Force language from URL path (ex: /fr/page)
if(pathLang && supported.includes(pathLang)) {
	i18n.changeLanguage(pathLang);
}

export default i18n;
