import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StyleSheet, Text, View} from 'react-native';
import useScreen from './useScreen';
import {RootStackParamList} from '@/navigators';

export interface ScreenProps
  extends NativeStackScreenProps<RootStackParamList, 'Screen'> {}

const Screen = ({navigation, route}: ScreenProps) => {
  const styles = useStyles(false);
  const {} = useScreen({navigation, route});
  return (
    <View>
      <Text>Screen</Text>
    </View>
  );
};

const testIds = {};

export default Object.assign(Screen, {
  testIds,
});

const useStyles = (isPortrait: boolean) =>
  StyleSheet.create({
    container: isPortrait ? {} : {},
  });
