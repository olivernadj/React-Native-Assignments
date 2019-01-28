import React from 'react';
import { createAppContainer, createSwitchNavigator, NavigationActions } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import UnauthTabNavigator from './UnauthTabNavigator';
import firebase from "../firebase";

const appContainer = createAppContainer(createSwitchNavigator(
  {
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Main: MainTabNavigator,
    Unauth: UnauthTabNavigator,
  },
  {
    initialRouteName: 'Unauth',
  }
));


export default appContainer;