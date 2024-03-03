import Images from '@/assets/images';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface Props {
  onPress: () => void;
}

const ContinueWithAppleButton = ({onPress}: Props) => {
  const styles = useStyles();
  const {t} = useTranslation();
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <View style={styles.button__icon}>
        <Image
          style={styles.button__icon__image}
          source={Images.login_with_apple}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.button__icon__text}>
        {t('loginscreen-continueWithApple')}
      </Text>
    </TouchableOpacity>
  );
};

const testIds = {
  screen: 'ContinueWithAppleButton',
};

export default Object.assign(ContinueWithAppleButton, {
  testIds,
});

const useStyles = () =>
  StyleSheet.create({
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#000',
      width: '100%',
      justifyContent: 'center',
      borderRadius: 10,
      borderColor: '#000',
      borderWidth: 1,
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
      color: '#fff',
      paddingRight: 15,
      paddingBottom: Platform.OS === 'ios' ? 0 : 4,
    },
  });
