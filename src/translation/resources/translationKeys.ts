import _ from 'lodash';

export const tk = {
  continueWithGoogle: 'ob-continueWithGoogle',
  continueWithApple: 'ob-continueWithApple',
  continueWithGuest: 'ob-continueWithGuest',
  privacyAndTermsOfUse: 'ob-privacyAndTermsOfUse',
  privacyLink: 'ob-privacyLink',
  termsOfUseLink: 'ob-termsOfUseLink',
};

export const validateTranslationKeys = (lang: string, json: any) => {
  const keys = Object.values(tk);
  keys.forEach(key => {
    if (_.isEmpty(json[key])) {
      console.error(`[${lang}] 값이 없음 = ${key}`);
    }
  });
};
