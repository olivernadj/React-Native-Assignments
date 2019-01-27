import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import UnauthHomeScreen from '../screens/HomeScreen';
import UnauthSignUpScreen from '../screens/SignUpScreen';
import UnauthLoginScreen from '../screens/LoginScreen';

const UnauthHomeStack = createStackNavigator({
  Home: UnauthHomeScreen,
});

UnauthHomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};


const UnauthLoginStack = createStackNavigator({
  Login: UnauthLoginScreen,
  SignUp: UnauthSignUpScreen,
});

UnauthLoginStack.navigationOptions = {
  tabBarLabel: 'Log in',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-lock' : 'md-lock'}
    />
  ),
};

export default createBottomTabNavigator({
  UnauthHomeStack,
  UnauthLoginStack,
});
