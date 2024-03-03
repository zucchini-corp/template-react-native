import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StyleSheet, Text, View} from 'react-native';
import useScreen from './useScreen';
import {RootStackParamList} from '@/navigators';
import {useTranslation} from 'react-i18next';

export interface ScreenProps
  extends NativeStackScreenProps<RootStackParamList, 'LoadingScreen'> {}

const LoadingScreen = ({navigation, route}: ScreenProps) => {
  const styles = useStyles(false);
  const {t} = useTranslation();
  const {} = useScreen({navigation, route});
  return (
    <View>
      <Text>LoadingScreen</Text>
    </View>
  );
};

const testIds = {};

export default Object.assign(LoadingScreen, {
  testIds,
});

const useStyles = (isPortrait: boolean) =>
  StyleSheet.create({
    container: isPortrait ? {} : {},
  });
