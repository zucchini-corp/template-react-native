import {atom} from 'recoil';

export const isPortraitState = atom<boolean>({
  key: 'screen/isPortraitState',
  default: true,
});
