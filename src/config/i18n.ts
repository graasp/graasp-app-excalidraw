import i18n from 'i18next';

import { initReactI18next } from 'react-i18next';

import en from '../langs/en.json';
import fr from '../langs/fr.json';

const resources = {
  en,
  fr,
} as const;
const defaultNS = 'translations';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    resources: typeof resources['en'];
  }
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  // debug only when not in production
  debug: process.env.NODE_ENV !== 'production',
  ns: [defaultNS],
  defaultNS,
  keySeparator: false,
  interpolation: {
    escapeValue: false,
    formatSeparator: ',',
  },
});

export default i18n;
