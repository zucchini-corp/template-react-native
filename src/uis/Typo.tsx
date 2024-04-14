import {colors, hp, wp} from '@/assets/globalStyles';
import React from 'react';
import {StyleProp, StyleSheet, Text, TextProps, TextStyle} from 'react-native';

export interface Props extends TextProps {
  children?: React.ReactNode;
  style?: StyleProp<TextStyle>;
  fontWeight?: 'bold' | 'light' | 'ultra_light' | undefined;
}

const Typo = ({children, style, fontWeight, numberOfLines}: Props) => {
  const styles = useStyles(false);
  return (
    <Text
      numberOfLines={numberOfLines}
      style={[
        styles.text,
        style,
        fontWeight === 'bold' && {
          fontFamily: 'NanumBarunGothicBold',
        },
        fontWeight === 'light' && {
          fontFamily: 'NanumBarunGothicLight',
        },
        fontWeight === 'ultra_light' && {
          fontFamily: 'NanumBarunGothicUltraLight',
        },
      ]}>
      {children}
    </Text>
  );
};

const testIds = {};

export default Object.assign(Typo, {
  testIds,
});

const useStyles = (isPortrait: boolean) =>
  StyleSheet.create({
    text: {
      fontSize: wp(16),
      color: colors.black,
      // color: '#FF7B79',
      // fontFamily: 'NanumBarunGothic',
      // fontFamily: '온글잎_몽몽데이즈몽글동심체',
      // fontFamily: '온글잎_혜콩체',
      // fontFamily: '온글잎_강동희',
      // fontFamily: 'NanumBarunGothicLight',
      fontFamily: 'NanumBarunGothic',
      // fontFamily: 'NanumBarunGothicBold',
    },
  });
