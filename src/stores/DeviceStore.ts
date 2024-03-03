import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {MMKV} from 'react-native-mmkv';

export const storage = new MMKV();

export default {
  setUser: (
    user?: FirebaseAuthTypes.User | FirebaseAuthTypes.UserCredential | null,
  ) => {
    if (user) {
      storage.set('user', JSON.stringify(user));
    } else {
      storage.delete('user');
    }
  },
  getUser: (): FirebaseAuthTypes.User | null => {
    const user = storage.getString('user');
    if (user) {
      return JSON.parse(user);
    } else {
      return null;
    }
  },
};
