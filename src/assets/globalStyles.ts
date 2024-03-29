import {Dimensions, StyleSheet} from 'react-native';
import {isTablet} from 'react-native-device-info';

export const colors = {
  primary: '#FF7B79',
  black: '#212529',
  white: '#fff',
  red: '#FF3636',
  lightBlue: '#36D2FF',
  green: '#8FEF73',
  grey: '#f5f5f5',
  borderGrey: '#C9C9C9',
  statusGrey: '#666666',
  textGrey: '#A2A2A2',
  darkBlue: '#83abeb',
};

// Design file size
export const basicDimensions = {
  width: 360,
  height: 640,
};

export const hp = (mobileValue: number, tabletValue?: number) => {
  const value = isTablet() && tabletValue ? tabletValue : mobileValue;
  return Math.floor(
    Dimensions.get('screen').height * (1 / basicDimensions.height) * value,
  );
};

export const wp = (mobileValue: number, tabletValue?: number) => {
  const value = isTablet() && tabletValue ? tabletValue : mobileValue;
  return Math.floor(
    Dimensions.get('screen').width * (1 / basicDimensions.width) * value,
  );
};

const globalStyles = StyleSheet.create({});

export default globalStyles;
