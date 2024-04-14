import {colors, hp, wp} from '@/assets/globalStyles';
import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
} from 'react-native';

export interface Props extends TextInputProps {
  children?: string;
  style?: StyleProp<TextStyle>;
  fontWeight?: 'bold' | 'light' | 'ultra_light' | undefined;
}

const TypoInput = ({
  style,
  fontWeight,
  value,
  onChangeText,
  placeholder,
  placeholderTextColor,
  onFocus,
  onBlur,
}: Props) => {
  const styles = useStyles(false);
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      onFocus={onFocus}
      onBlur={onBlur}
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
      ]}
    />
  );
};

const testIds = {};

export default Object.assign(TypoInput, {
  testIds,
});

const useStyles = (isPortrait: boolean) =>
  StyleSheet.create({
    text: {
      fontSize: wp(16),
      color: colors.black,
      textDecorationLine: 'underline',
      textAlign: 'center',
    },
  });
