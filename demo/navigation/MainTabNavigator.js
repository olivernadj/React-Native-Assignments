import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import ActivityScreen from '../screens/Main/ActivityScreen';
import ActivityItemDetailScreen from '../screens/Main/Activity/ActivityItemDetailScreen';
import LinksScreen from '../screens/Main/LinksScreen';
import UserScreen from '../screens/Main/UserScreen';
import AccountScreen from '../screens/Main/AccountScreen';
import AccountItemDetailScreen from '../screens/Main/Account/AccountItemDetailScreen';
import AccountItemVNDAddScreen from '../screens/Main/Account/AccountItemVNDAddScreen';

const ActivityStack = createStackNavigator({
  Activity: ActivityScreen,
  ActivityItemDetail: ActivityItemDetailScreen,
});

ActivityStack.navigationOptions = {
  tabBarLabel: 'Activity',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-list' : 'md-list'}
    />
  ),
};

const AccountStack = createStackNavigator({
  Account: AccountScreen,
  AccountItemDetail: AccountItemDetailScreen,
  AccountItemVNDAdd: AccountItemVNDAddScreen,
});

AccountStack.navigationOptions = {
  tabBarLabel: 'Account',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-journal' : 'md-journal'}
    />
  ),
};

const LinksStack = createStackNavigator({
  Links: LinksScreen,
});

LinksStack.navigationOptions = {
  tabBarLabel: 'Links',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};


const UserStack = createStackNavigator({
  User: UserScreen,
});

UserStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'}
    />
  ),
};

export default createBottomTabNavigator({
  ActivityStack,
  AccountStack,
  //LinksStack,
  UserStack,
});
