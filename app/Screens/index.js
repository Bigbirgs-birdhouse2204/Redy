import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import AuthLoading from './authloading';
import SignIn from './signin';
import Settings from './settings';

//stacked navivator

const AuthStack = createStackNavigator({
  SignIn: SignIn,
});
const SettingsStack = createStackNavigator({
  Settings: Settings,
});

const SwitchNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoading,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);
export default createAppContainer(SwitchNavigator);
