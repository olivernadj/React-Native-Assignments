import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import DetailScreen from '../screens/DetailScreen';
import HomeScreen from '../screens/HomeScreen';
import TopRatedScreen from '../screens/TopRatedScreen';
import SettingsScreen from '../screens/SettingsScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Detail: DetailScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Now in cinemas',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-flame${focused ? '' : '-outline'}`
          : 'md-flame'
      }
    />
  ),
};

const TopRatedStack = createStackNavigator({
  Links: TopRatedScreen,
});

TopRatedStack.navigationOptions = {
  tabBarLabel: 'Top rated',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-thumbs-up' : 'md-thumbs-up'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  TopRatedStack,
  SettingsStack,
});
