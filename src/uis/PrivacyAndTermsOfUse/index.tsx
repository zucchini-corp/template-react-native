import {tk} from '@/translation/resources/translationKeys';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface Props {
  termsOfUseTestID: string;
  onTermsOfUse: () => void;
  privacyTestID: string;
  onPrivacy: () => void;
}

const PrivacyAndTermsOfUse = ({
  termsOfUseTestID,
  onTermsOfUse,
  privacyTestID,
  onPrivacy,
}: Props) => {
  const styles = useStyles();
  const {t} = useTranslation();
  return (
    <View style={styles.privacyAndTermsOfUse}>
      {t(tk.privacyAndTermsOfUse)
        .split(/[<>]+/)
        .map((text, i) => {
          if (text.includes('#1')) {
            return (
              <TouchableOpacity
                testID={termsOfUseTestID}
                key={i}
                style={styles.privacyAndTermsOfUse__link}
                onPress={() => onTermsOfUse()}>
                <Text style={styles.privacyAndTermsOfUse__link__text}>
                  {text.replace('#1', '')}
                </Text>
              </TouchableOpacity>
            );
          } else if (text.includes('#2')) {
            return (
              <TouchableOpacity
                testID={privacyTestID}
                key={i}
                style={styles.privacyAndTermsOfUse__link}
                onPress={() => onPrivacy()}>
                <Text style={styles.privacyAndTermsOfUse__link__text}>
                  {text.replace('#2', '')}
                </Text>
              </TouchableOpacity>
            );
          } else {
            return (
              <Text key={i} style={styles.privacyAndTermsOfUse__text}>
                {text}
              </Text>
            );
          }
        })}
    </View>
  );
};

const testIds = {
  screen: 'PrivacyAndTermsOfUse',
};

export default Object.assign(PrivacyAndTermsOfUse, {
  testIds,
});

const useStyles = () =>
  StyleSheet.create({
    privacyAndTermsOfUse: {
      marginTop: 24,
      width: '80%',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    privacyAndTermsOfUse__text: {
      color: '#999',
      fontSize: 14,
    },
    privacyAndTermsOfUse__link: {},
    privacyAndTermsOfUse__link__text: {
      color: '#201F24',
      fontSize: 14,
      textDecorationLine: 'underline',
    },
  });
