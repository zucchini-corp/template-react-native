import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface Props {
  visible?: boolean;
}

const Loading = ({visible = false}: Props) => {
  const styles = useStyles();
  return visible ? (
    <View style={styles.loading}>
      <Text>Loading...</Text>
    </View>
  ) : null;
};

const testIds = {
  screen: 'Loading',
};

export default Object.assign(Loading, {
  testIds,
});

const useStyles = () =>
  StyleSheet.create({
    loading: {},
  });
