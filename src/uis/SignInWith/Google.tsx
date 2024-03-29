import Images from '@/assets/Images';
import {tk} from '@/translation/resources/translationKeys';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';

interface Props extends TouchableOpacityProps {}

const Google = ({testID, onPress}: Props) => {
  const styles = useStyles();
  const {t} = useTranslation();
  return (
    <TouchableOpacity testID={testID} style={styles.button} onPress={onPress}>
      <View style={styles.button__icon}>
        <Image
          style={styles.button__icon__image}
          source={Images.login_with_google}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.button__icon__text}>{t(tk.continueWithGoogle)}</Text>
    </TouchableOpacity>
  );
};

const testIds = {};

export default Object.assign(Google, {
  testIds,
});

const useStyles = () =>
  StyleSheet.create({
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fff',
      width: '100%',
      justifyContent: 'center',
      borderRadius: 10,
      borderColor: '#e5e5e5',
      borderWidth: 1,
      marginBottom: 15,
    },
    button__icon: {
      margin: 15,
    },
    button__icon__image: {
      width: 24,
      height: 24,
    },
    button__icon__text: {
      fontSize: 14,
      color: '#757575',
      paddingRight: 15,
      paddingBottom: Platform.OS === 'ios' ? 0 : 4,
    },
  });
