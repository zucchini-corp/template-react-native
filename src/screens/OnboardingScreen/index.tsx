import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import useScreen, {ScreenProps} from './useScreen';
import SignInWith from '@/uis/SignInWith';
import PrivacyAndTermsOfUse from '@/uis/PrivacyAndTermsOfUse';

const OnboardingScreen = ({navigation, route}: ScreenProps) => {
  const styles = useStyles();
  const {
    handlePressSignInWithGoogleButton,
    handlePressSignInWithAppleButton,
    handlePressPrivacyLink,
    handlePressTermsOfUseLink,
  } = useScreen({navigation, route});
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.screen__top}>
        <View />
      </View>
      <View style={styles.screen__bottom}>
        <SignInWith.Google
          testID={testIds.SignInWithGoogle}
          onPress={handlePressSignInWithGoogleButton}
        />
        <SignInWith.Apple
          testID={testIds.SignInWithApple}
          onPress={handlePressSignInWithAppleButton}
        />
        <PrivacyAndTermsOfUse
          privacyTestID={testIds.Privacy}
          onPrivacy={handlePressPrivacyLink}
          termsOfUseTestID={testIds.TermsOfUse}
          onTermsOfUse={handlePressTermsOfUseLink}
        />
      </View>
    </SafeAreaView>
  );
};

const testIds = {
  Privacy: 'Privacy',
  TermsOfUse: 'TermsOfUse',
  SignInWithGoogle: 'SignInWithGoogle',
  SignInWithApple: 'SignInWithApple',
};

export default Object.assign(OnboardingScreen, {testIds});

const useStyles = () =>
  StyleSheet.create({
    screen: {
      flex: 1,
      flexDirection: 'column',
    },
    screen__top: {
      flex: 1,
    },
    screen__bottom: {
      flex: 1,
      alignItems: 'center',
    },
  });
