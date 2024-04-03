import React from 'react';
import {StyleSheet, View} from 'react-native';

interface Props {
  children?: React.ReactNode;
}

const DrawerMenu = ({children}: Props) => {
  const styles = useStyles();
  return <View style={styles.drawer}>{children}</View>;
};

const testIds = {
  screen: 'DrawerMenu',
};

export default Object.assign(DrawerMenu, {
  testIds,
});

const useStyles = () =>
  StyleSheet.create({
    drawer: {},
  });
