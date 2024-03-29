import {MainDrawerParamList} from '@/navigators';
import {DrawerScreenProps} from '@react-navigation/drawer';

export interface ScreenProps
  extends DrawerScreenProps<MainDrawerParamList, 'HomeScreen'> {}

const useScreen = ({navigation, route}: ScreenProps) => {
  return {};
};

export default useScreen;
