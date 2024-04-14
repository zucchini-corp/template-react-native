import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import Response from '@/apis/Response';
import {update} from '../FirebaseAPI';
import firestore from '@react-native-firebase/firestore';
import crashlytics from '@react-native-firebase/crashlytics';
import analytics from '@react-native-firebase/analytics';
import DeviceInfo from 'react-native-device-info';
import appleAuth from '@invertase/react-native-apple-authentication';
import ZUser from '@/models/ZUser';
import log from '@/log';

// 구글 로그인 설정 초기화
GoogleSignin.configure({
  webClientId: '',
});

const saveSignedUser = async (
  user: FirebaseAuthTypes.User,
  platform?: string,
) => {
  try {
    // Log
    await analytics().setUserId(user.uid);
    await analytics().logLogin({
      method: platform ?? '',
    });

    // Save
    const batch = firestore().batch();
    await update<ZUser>(batch, 'user', {
      fid: user.email ?? user.uid,
      deviceId: DeviceInfo.getDeviceId(),
      deviceName: DeviceInfo.getDeviceNameSync(),
      email: user.email ?? user.uid,
      password: '',
      nickname: user.displayName ?? '-',
      level: 0,
      regDate: new Date().valueOf(),
      modDate: new Date().valueOf(),
      delYn: 'N',
    });
    batch.commit();
  } catch (e) {
    console.error(`${platform} 로그인 - 회원 정보 등록`, e);
    crashlytics().recordError(
      e as Error,
      `${platform} 로그인 - 회원 정보 등록`,
    );
  }
};

// 로그인
export const signInWithApple = async () => {
  let errorCode = 'unexpected error';
  try {
    // 애플 로그인
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    });

    // 애플 로그인 실패
    if (!appleAuthRequestResponse.identityToken) {
      crashlytics().recordError(
        new Error('Apple Sign-In failed - no identify token returned'),
        'Apple 로그인 실패',
      );
      throw new Error('Apple Sign-In failed - no identify token returned');
    }

    // Create a Firebase credential from the response
    const {identityToken, nonce} = appleAuthRequestResponse;
    const credential = auth.AppleAuthProvider.credential(identityToken, nonce);

    // Sign the user in with the credential
    const userCredential = await auth().signInWithCredential(credential);
    const user = userCredential.user;
    await saveSignedUser(user, 'Apple');
    return user;
  } catch (e) {
    console.error('Apple 로그인 에러', e);
    crashlytics().recordError(e as Error, 'Apple 로그인 에러');
  }
  return errorCode;
};
export const signInWithGoogle = async () => {
  let errorCode = 'unexpected error';
  try {
    // 구글 로그인
    await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });
    const userInfo = await GoogleSignin.signIn();

    // 구글 로그인 정보 등록
    const googleCredential = auth.GoogleAuthProvider.credential(
      userInfo.idToken,
    );

    const userCredential = await auth().signInWithCredential(googleCredential);
    const user = userCredential.user;
    await saveSignedUser(user, 'Google');
    return user;
  } catch (e) {
    log.error('Google 로그인 에러', e);
  }
  return errorCode;
};
export const signInWithGuest = async () => {
  let errorCode = 'unexpected error';
  try {
    const userCredential = await auth().signInAnonymously();
    const user = {...userCredential.user, email: userCredential.user.uid};
    await saveSignedUser(user, 'Guest');
    return user;
  } catch (e) {
    log.error('Guest 로그인 에러', e);
  }
  return errorCode;
};

// 계정삭제
export const deleteAccount = async (
  user: FirebaseAuthTypes.User,
): Promise<Response<ZUser | null>> => {
  console.log(user);
  let code = 200;
  try {
    const batch = firestore().batch();
    await firestore().runTransaction(async transaction => {
      // Delete data
      //...

      // Batch Commit
      await batch.commit();
    });
  } catch (e) {
    log.error('계정 데이터 삭제 에러', e);
    code = 400;
  }
  return {code, data: null};
};
