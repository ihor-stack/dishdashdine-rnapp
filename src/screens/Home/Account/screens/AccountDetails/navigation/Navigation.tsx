import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
// import {NavigationProp, RouteProp} from '@react-navigation/native';

import {
  AccountAccountDetails,
  AppIcon,
  NewPassword,
  Notifications,
  UpdateNumber,
  UpdateEmail,
} from '../screens';
import {NavigationHeader} from '@/components';
import DeleteAccount from '@/screens/Home/Account/screens/AccountDetails/screens/DeleteAccount';
import DeleteAccountConfirm from '@/screens/Home/Account/screens/AccountDetails/screens/DeleteAccount/DeleteAccountConfirm';

export type AccountDetailsStackNavParamList = {
  AccountAccountDetails: undefined;
  AppIcon: undefined;
  NewPassword: undefined;
  Notifications: undefined;
  UpdateNumber: undefined;
  UpdateEmail: undefined;
  DeleteAccount: undefined;
  DeleteAccountConfirm: undefined;
};

const AccountDetailsStack =
  createStackNavigator<AccountDetailsStackNavParamList>();

const Navigation = () => {
  return (
    <AccountDetailsStack.Navigator>
      <AccountDetailsStack.Screen
        options={{
          header: () => (
            <NavigationHeader showBackButton title="Account Details" />
          ),

          animationEnabled: true,
        }}
        name="AccountAccountDetails"
        component={AccountAccountDetails}
      />
      <AccountDetailsStack.Screen
        options={{
          header: () => <NavigationHeader showBackButton title="App Icon" />,
          animationEnabled: true,
        }}
        name="AppIcon"
        component={AppIcon}
      />
      <AccountDetailsStack.Screen
        options={{
          header: () => (
            <NavigationHeader showBackButton title="New Password" />
          ),
          animationEnabled: true,
        }}
        name="NewPassword"
        component={NewPassword}
      />
      <AccountDetailsStack.Screen
        options={{
          header: () => (
            <NavigationHeader showBackButton title="Notifications" />
          ),
          animationEnabled: true,
        }}
        name="Notifications"
        component={Notifications}
      />
      <AccountDetailsStack.Screen
        options={{
          header: () => (
            <NavigationHeader showBackButton title="Update Number" />
          ),
          animationEnabled: true,
        }}
        name="UpdateNumber"
        component={UpdateNumber}
      />
      <AccountDetailsStack.Screen
        options={{
          header: () => (
            <NavigationHeader showBackButton title="Update Email" />
          ),
          animationEnabled: true,
        }}
        name="UpdateEmail"
        component={UpdateEmail}
      />
      <AccountDetailsStack.Screen
        options={{
          header: () => (
            <NavigationHeader showBackButton title="Delete Your Account" />
          ),
          animationEnabled: true,
        }}
        name="DeleteAccount"
        component={DeleteAccount}
      />
      <AccountDetailsStack.Screen
        options={{
          header: () => (
            <NavigationHeader showBackButton title="Confirm Deletion" />
          ),
          animationEnabled: true,
        }}
        name="DeleteAccountConfirm"
        component={DeleteAccountConfirm}
      />
    </AccountDetailsStack.Navigator>
  );
};

export default Navigation;
