import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

GoogleSignin.configure({
  webClientId: '',
});

export const signInWithGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });
    const userInfo = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(
      userInfo.idToken,
    );
    const userCredential = await auth().signInWithCredential(googleCredential);
    return userCredential.user;
  } catch (error) {
    console.log(error);
  }
};

export const signOutOfGoogle = async () => {
  try {
    await GoogleSignin.signOut();
    return await auth().signOut();
  } catch (error) {
    console.log(error);
  }
};

export const signInWithApple = async () => {
  try {
    // await GoogleSignin.hasPlayServices({
    //   showPlayServicesUpdateDialog: true,
    // });
    // const userInfo = await GoogleSignin.signIn();
    const appleCredential = auth.AppleAuthProvider.credential('Apple Token');
    const userCredential = await auth().signInWithCredential(appleCredential);
    return userCredential.user;
  } catch (error) {
    console.log(error);
  }
};

export const signOutOfApple = async () => {
  try {
    // await GoogleSignin.signOut();
    return await auth().signOut();
  } catch (error) {
    console.log(error);
  }
};
