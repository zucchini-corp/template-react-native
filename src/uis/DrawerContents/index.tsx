import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {DrawerContentComponentProps} from '@react-navigation/drawer';
import DrawerLink from './DrawerLink';
import DrawerMenu from './DrawerMenu';

interface Props extends DrawerContentComponentProps {}

const DrawerContents = ({state, navigation}: Props) => {
  const styles = useStyles();
  return (
    <View style={styles.drawer}>
      <Text>DrawerContents</Text>
      <DrawerMenu />
      <DrawerLink />
    </View>
  );
};

const testIds = {
  screen: 'Loading',
};

export default Object.assign(DrawerContents, {
  testIds,
});

const useStyles = () =>
  StyleSheet.create({
    drawer: {},
  });
