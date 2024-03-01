import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Screen from '@/screens/_/index';

export type RootStackParamList = {
  Screen: {};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => (
  <Stack.Navigator
    screenOptions={{headerShown: false}}
    initialRouteName="Screen">
    <Stack.Screen name="Screen" component={Screen} />
  </Stack.Navigator>
);

export default RootNavigator;
