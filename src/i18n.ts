// i18n.ts
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './lang/en.json'
import ua from './lang/ua.json'
// import ru from './lang/ru.json'

const savedLanguage = localStorage.getItem('selectedLanguage') || 'en'

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    // ru: {
    //   translation: ru,
    // },
    ua: {
      translation: ua,
    },
  },
  lng: savedLanguage,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
