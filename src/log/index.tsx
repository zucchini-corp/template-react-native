import crashlytics from '@react-native-firebase/crashlytics';

export default {
  error: (message: string, error: unknown) => {
    console.error(message, error);
    crashlytics().recordError(error as Error, message);
  },
  debug: (message: string, data?: any) => {
    console.debug(message, data);
  },
};
