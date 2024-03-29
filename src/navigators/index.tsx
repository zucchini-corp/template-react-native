import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from '@/screens/HomeScreen';
import OnboardingScreen from '@/screens/OnboardingScreen';

export type MainDrawerParamList = {
  HomeScreen?: {};
};
const MainDrawer = createDrawerNavigator<MainDrawerParamList>();
const MainDrawerNavigator = () => (
  <MainDrawer.Navigator
    // drawerContent={DrawerContents}
    screenOptions={{
      headerShown: false,
      // drawerStyle: {
      //   width: Dimensions.get('window').width - wp(48),
      // },
    }}
    // initialRouteName="CreateTaskGroupScreen"
  >
    <MainDrawer.Screen name="HomeScreen" component={HomeScreen} />
  </MainDrawer.Navigator>
);

export type RootStackParamList = {
  LoginScreen?: {};
  OnboardingScreen?: {};
  MainDrawerNavigator?: {};
};
const RootStack = createNativeStackNavigator<RootStackParamList>();
const RootStackNavigator = () => (
  <RootStack.Navigator
    screenOptions={{headerShown: false}}
    initialRouteName="OnboardingScreen">
    <RootStack.Screen name="OnboardingScreen" component={OnboardingScreen} />
    <RootStack.Screen
      name="MainDrawerNavigator"
      component={MainDrawerNavigator}
    />
  </RootStack.Navigator>
);

export default RootStackNavigator;
