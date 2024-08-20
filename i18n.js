import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en } from './translations/en'; // Correct import for `en`
import { fr } from './translations/fr'; // Correct import for `fr`
import { ar } from './translations/ar'; // Correct import for `ar`

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      fr: { translation: fr },
      ar: { translation: ar },
    },
    lng: 'ar', // default language
    fallbackLng: 'ar',
    interpolation: {
      escapeValue: false,
    },
    compatibilityJSON: 'v3', // Add this line
  });

export default i18n;
