import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {atom} from 'recoil';

export const userState = atom<FirebaseAuthTypes.User | null>({
  key: 'userState',
  default: null,
});
