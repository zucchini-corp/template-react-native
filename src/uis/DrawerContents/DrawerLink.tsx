import React from 'react';
import {StyleSheet, View} from 'react-native';

interface Props {
  children?: React.ReactNode;
}

const DrawerLink = ({children}: Props) => {
  const styles = useStyles();
  return <View style={styles.drawer}>{children}</View>;
};

const testIds = {
  screen: 'DrawerLink',
};

export default Object.assign(DrawerLink, {
  testIds,
});

const useStyles = () =>
  StyleSheet.create({
    drawer: {},
  });
