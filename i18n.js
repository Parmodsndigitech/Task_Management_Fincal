import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {I18nManager} from 'react-native';

// Import translations
import en from './Src/locales/en.json';
import hi from './Src/locales/hi.json';
import ur from './Src/locales/ur.json';
import pa from './Src/locales/pa.json'; // Punjabi translation

const resources = {
  en: {translation: en},
  hi: {translation: hi},
  ur: {translation: ur},
  pa: {translation: pa}, // Add Punjabi language
};

const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: async () => {
    const language = await AsyncStorage.getItem('language');
    if (language) return language;
    return 'en'; // Default to English
  },
  init: () => {},
  cacheUserLanguage: language => {
    AsyncStorage.setItem('language', language);
    if (language === 'ur' || language === 'hi' || language === 'pa') {
      I18nManager.forceRTL(false); // Enable RTL for Urdu, Hindi, and Punjabi
    } else {
      I18nManager.forceRTL(false); // Disable RTL for languages like English
    }
  },
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en', // Default language
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18n;
