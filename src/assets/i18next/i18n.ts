import _i18n from 'i18next';
import detector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import pl from './translations/pl/translation.json'
import en from './translations/en/translation.json'

_i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },

      pl: { translation: pl },
    },
    fallbackLng: 'pl',
  }).catch();

export const i18n = _i18n;
