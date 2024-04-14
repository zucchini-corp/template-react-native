import _ from 'lodash';

export const tk = {
  // Common
  privacyLink: 'privacyLink',
  termsOfUseLink: 'termsOfUseLink',
  supportLink: 'supportLink',
  // Onboarding
  continueWithGoogle: 'ob-continueWithGoogle',
  continueWithApple: 'ob-continueWithApple',
  continueWithGuest: 'ob-continueWithGuest',
  privacyAndTermsOfUse: 'ob-privacyAndTermsOfUse',
  // Drawer
  privacy: 'dr-privacy',
  termsOfUse: 'dr-termsOfUse',
  support: 'dr-support',
};

export const validateTranslationKeys = (lang: string, json: any) => {
  const keys = Object.values(tk);
  keys.forEach(key => {
    if (_.isEmpty(json[key])) {
      console.error(`[${lang}] 값이 없음 = ${key}`);
    }
  });
};
