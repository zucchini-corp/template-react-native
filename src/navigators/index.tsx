import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '@/screens/HomeScreen';
import OnboardingScreen from '@/screens/OnboardingScreen';
import DrawerContents from '@/uis/DrawerContents';

export type BottomTabParamList = {
  HomeScreen?: {};
};
const MainTab = createBottomTabNavigator<BottomTabParamList>();
const MainTabNavigator = () => (
  <MainTab.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <MainTab.Screen name="HomeScreen" component={HomeScreen} />
  </MainTab.Navigator>
);

export type MainDrawerParamList = {
  MainTab?: {};
};
const Drawer = createDrawerNavigator<MainDrawerParamList>();
const DrawerNavigator = () => (
  <Drawer.Navigator
    drawerContent={DrawerContents}
    screenOptions={{
      headerShown: false,
      // drawerStyle: {
      //   width: Dimensions.get('window').width - wp(48),
      // },
    }}
    initialRouteName="MainTab">
    <Drawer.Screen name="MainTab" component={MainTabNavigator} />
  </Drawer.Navigator>
);

export type RootStackParamList = {
  LoginScreen?: {};
  OnboardingScreen?: {};
  Main?: {};
};
const RootStack = createNativeStackNavigator<RootStackParamList>();
const RootStackNavigator = () => (
  <RootStack.Navigator
    screenOptions={{headerShown: false}}
    initialRouteName="OnboardingScreen">
    <RootStack.Screen name="OnboardingScreen" component={OnboardingScreen} />
    <RootStack.Screen name="Main" component={DrawerNavigator} />
  </RootStack.Navigator>
);

export default RootStackNavigator;
