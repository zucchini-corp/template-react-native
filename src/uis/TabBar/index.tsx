import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface Props extends BottomTabBarProps {}

const TabBar = ({}: Props) => {
  const styles = useStyles();
  return (
    <View style={styles.tabBar}>
      <Text>TabBar</Text>
    </View>
  );
};

const testIds = {
  screen: 'TabBar',
};

export default Object.assign(TabBar, {
  testIds,
});

const useStyles = () =>
  StyleSheet.create({
    tabBar: {},
  });
