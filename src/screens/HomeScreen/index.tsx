import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import useScreen, {ScreenProps} from './useScreen';

const HomeScreen = ({navigation, route}: ScreenProps) => {
  const styles = useStyles();
  const {} = useScreen({navigation, route});
  return (
    <SafeAreaView style={styles.screen}>
      <Text>HomeScreen</Text>
    </SafeAreaView>
  );
};

const testIds = {};

export default Object.assign(HomeScreen, {testIds});

const useStyles = () =>
  StyleSheet.create({
    screen: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
