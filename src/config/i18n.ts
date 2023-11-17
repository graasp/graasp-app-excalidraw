import i18n from 'i18next';

import { initReactI18next } from 'react-i18next';

import en from '../langs/en.json';
import fr from '../langs/fr.json';

export const defaultNS = 'translations';
export const resources = {
  en,
  fr,
} as const;

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    resources: (typeof resources)['en'];
  }
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  // debug only when not in production
  debug: import.meta.env.DEV,
  ns: [defaultNS],
  defaultNS,
  keySeparator: '.',
  interpolation: {
    escapeValue: false,
    formatSeparator: ',',
  },
  fallbackLng: 'en',
});

export default i18n;
