import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import ActivityScreen from '../screens/Main/ActivityScreen';
import ActivityItemDetailScreen from '../screens/Main/Activity/ActivityItemDetailScreen';
import MarketplaceScreen from '../screens/Main/MarketplaceScreen'
import AccountScreen from '../screens/Main/AccountScreen';
import AccountItemDetailScreen from '../screens/Main/Account/AccountItemDetailScreen';
import VNDAddScreen from '../screens/Main/Account/VND/VNDAddScreen';
import SVTBuyScreen from '../screens/Main/Account/SVT/SVTBuyScreen';
import SVTSellScreen from '../screens/Main/Account/SVT/SVTSellScreen';
import UserScreen from '../screens/Main/UserScreen';

const ActivityStack = createStackNavigator({
  Activity: {
    screen: ActivityScreen,
    params: { detailScreen: 'ActivityItemDetail' },
  },
  ActivityItemDetail: ActivityItemDetailScreen,
});

ActivityStack.navigationOptions = ({ navigation }) => {
  return {
    tabBarVisible: navigation.state.index === 0,
    tabBarLabel: 'Activity',
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={Platform.OS === 'ios' ? 'ios-list' : 'md-list'}
      />
    ),
  };
};

const MarketplaceStack = createStackNavigator({
  Marketplace: MarketplaceScreen,
});

MarketplaceStack.navigationOptions = ({ navigation }) => {
  return {
    tabBarVisible: navigation.state.index === 0,
    tabBarLabel: 'Marketplace',
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={Platform.OS === 'ios' ? 'ios-pulse' : 'md-pulse'}
      />
    ),
  };
};

const AccountStack = createStackNavigator({
  Account: AccountScreen,
  AccountItemDetail: AccountItemDetailScreen,
  VNDAdd: VNDAddScreen,
  VNDActivity: {
    screen: ActivityScreen,
    params: { detailScreen: 'VNDDetail' },
    navigationOptions: ({ navigation }) => ({
      title: "VND Activity",
    }),
  },
  VNDDetail: ActivityItemDetailScreen,
  ETHActivity: {
    screen: ActivityScreen,
    params: { detailScreen: 'ETHDetail' },
    navigationOptions: ({ navigation }) => ({
      title: "ETH Activity",
    }),
  },
  ETHDetail: ActivityItemDetailScreen,
  SVTActivity: {
    screen: ActivityScreen,
    params: { detailScreen: 'SVTDetail' },
    navigationOptions: ({ navigation }) => ({
      title: "SVT Activity",
    }),
  },
  SVTDetail: ActivityItemDetailScreen,
  SVTBuy: SVTBuyScreen,
  SVTSell: SVTSellScreen,
});

AccountStack.navigationOptions = ({ navigation }) => {
  return {
    tabBarVisible: navigation.state.index === 0,
    tabBarLabel: 'Account',
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={Platform.OS === 'ios' ? 'ios-journal' : 'md-journal'}
      />
    ),
  };
};

const UserStack = createStackNavigator({
  User: UserScreen,
});

UserStack.navigationOptions = ({ navigation }) => {
  return {
    tabBarVisible: navigation.state.index === 0,
    tabBarLabel: 'Profile',
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'}
      />
    ),
  };
};

export default createBottomTabNavigator({
  ActivityStack,
  MarketplaceStack,
  AccountStack,
  UserStack,
});
