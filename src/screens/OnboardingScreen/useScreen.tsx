import {RootStackParamList} from '@/navigators';
import {tk} from '@/translation/resources/translationKeys';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {Linking} from 'react-native';

export interface ScreenProps
  extends NativeStackScreenProps<RootStackParamList, 'OnboardingScreen'> {}

const useScreen = ({navigation, route}: ScreenProps) => {
  const {t} = useTranslation();

  const handlePressSignInWithGoogleButton = () => {
    navigation.replace('Main');
  };

  const handlePressSignInWithAppleButton = () => {
    navigation.replace('Main');
  };

  const handlePressPrivacyLink = () => {
    Linking.openURL(t(tk.privacyLink));
  };

  const handlePressTermsOfUseLink = () => {
    Linking.openURL(t(tk.termsOfUseLink));
  };

  return {
    handlePressSignInWithGoogleButton,
    handlePressSignInWithAppleButton,
    handlePressPrivacyLink,
    handlePressTermsOfUseLink,
  };
};

export default useScreen;
