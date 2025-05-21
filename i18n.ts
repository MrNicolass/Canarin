import en_US from '@/locales/en_US.json';
import pt_BR from '@/locales/pt_BR.json';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en_US: { translation: en_US },
    pt_BR: { translation: pt_BR },
  },
  lng: 'pt_BR',
  fallbackLng: 'en_US',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;