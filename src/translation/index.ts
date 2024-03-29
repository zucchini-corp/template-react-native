import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {validateTranslationKeys} from './resources/translationKeys';

import en from './resources/en.json';
import ko from './resources/ko.json';
import ja from './resources/ja.json';

const resources: Record<string, any> = {
  en: {
    translation: en,
  },
  ko: {
    translation: ko,
  },
  ja: {
    translation: ja,
  },
};

// Validation Check
if (__DEV__) {
  Object.keys(resources).forEach(key => {
    const resource = resources[key];
    validateTranslationKeys(key, resource.translation);
  });
}

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: 'en', // 디폴트 언어
  resources,
  fallbackLng: 'en', // 대체 언어
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export default i18n;
