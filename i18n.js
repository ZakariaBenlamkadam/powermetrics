import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en } from './translations/en'; 
import { fr } from './translations/fr'; 
import { ar } from './translations/ar'; 

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      fr: { translation: fr },
      ar: { translation: ar },
    },
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    compatibilityJSON: 'v3', 
  });

export default i18n;
