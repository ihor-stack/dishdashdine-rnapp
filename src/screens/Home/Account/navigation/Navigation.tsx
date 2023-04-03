import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {
  MyAccount,
  AccountDetails,
  MyWallet,
  ManageAddresses,
  MyReviews,
  HelpAndSupport,
  YourAppExperience,
  TermsOfService,
  PrivacyPolicy,
} from '../screens';
import {NavigationHeader} from '@/components';
import FAQsListing from '../screens/HelpAndSupport/FAQsListing';
import FAQsDetail from '../screens/HelpAndSupport/FAQsDetail';
import {Address} from '@/screens/Onboarding/screens';
import AddnewAddress from '../screens/AddNewAddress';
import HelpSupportOrder from '../screens/HelpAndSupport/HelpSupportOrder/HelpSupportOrder';
import HelpSupportOrderEntry from '../screens/HelpAndSupport/HelpSupportOrderEntry';
import HelpSupportRefund from '../screens/HelpAndSupport/HelpSupportRefund';

export type MyAccountStackNavParamList = {
  MyAccount: undefined;
  AccountDetails: undefined;
  MyWallet: undefined;
  ManageAddresses: undefined;
  MyReviews: undefined;
  HelpAndSupport: undefined;
  YourAppExperience: undefined;
  TermsOfService: undefined;
  PrivacyPolicy: undefined;
  RequestRefund: undefined;
  HelpWithOrder: undefined;
};

const MyAccountStack = createStackNavigator<MyAccountStackNavParamList>();

const Navigation = () => {
  return (
    <MyAccountStack.Navigator>
      <MyAccountStack.Screen
        options={{
          header: () => <NavigationHeader title="My Account" />,
        }}
        name="MyAccount"
        component={MyAccount}
      />
      <MyAccountStack.Screen
        options={{
          headerShown: false,
        }}
        name="AccountDetails"
        component={AccountDetails}
      />
      <MyAccountStack.Screen
        options={{
          headerShown: false,
        }}
        name="MyWallet"
        component={MyWallet}
      />
      <MyAccountStack.Screen
        options={{
          header: () => (
            <NavigationHeader showBackButton title="Manage Addresses" />
          ),
        }}
        name="ManageAddresses"
        component={ManageAddresses}
      />
      <MyAccountStack.Screen
        options={{
          header: () => <NavigationHeader showBackButton title="My Reviews" />,
        }}
        name="MyReviews"
        component={MyReviews}
      />
      <MyAccountStack.Screen
        options={{
          header: () => (
            <NavigationHeader showBackButton title="Help & Support" />
          ),
        }}
        name="HelpAndSupport"
        component={HelpAndSupport}
      />
      <MyAccountStack.Screen
        options={{
          header: () => (
            <NavigationHeader showBackButton title="Your app experience" />
          ),
        }}
        name="YourAppExperience"
        component={YourAppExperience}
      />
      <MyAccountStack.Screen
        options={{
          header: () => (
            <NavigationHeader showBackButton title="Terms of Service" />
          ),
        }}
        name="TermsOfService"
        component={TermsOfService}
      />
      <MyAccountStack.Screen
        options={{
          header: () => (
            <NavigationHeader showBackButton title="Privacy Policy" />
          ),
        }}
        name="PrivacyPolicy"
        component={PrivacyPolicy}
      />
      <MyAccountStack.Screen
        options={{
          header: () => <NavigationHeader showBackButton title="FAQs" />,
        }}
        name="FAQsListing"
        component={FAQsListing}
      />
      <MyAccountStack.Screen
        options={{
          header: () => <NavigationHeader showBackButton title="FAQs" />,
        }}
        name="FAQsDetail"
        component={FAQsDetail}
      />
      <MyAccountStack.Screen
        options={{
          header: () => (
            <NavigationHeader showBackButton title="Add New Address" />
          ),
        }}
        name="NewAddress"
        component={Address}
      />
      <MyAccountStack.Screen
        options={{
          header: () => (
            <NavigationHeader showBackButton title="Add New Address" />
          ),
        }}
        name="AddNewAddress"
        component={AddnewAddress}
      />
      <MyAccountStack.Screen
        options={{
          header: () => (
            <NavigationHeader showBackButton title="Help & Support" />
          ),
        }}
        name="HelpSupportOrder"
        component={HelpSupportOrder}
      />
      <MyAccountStack.Screen
        options={{
          header: () => (
            <NavigationHeader showBackButton title="Help & Support" />
          ),
        }}
        name="HelpWithOrder"
        component={HelpSupportOrderEntry}
      />
      <MyAccountStack.Screen
        options={{
          header: () => (
            <NavigationHeader showBackButton title="Help & Support" />
          ),
        }}
        name="RequestRefund"
        component={HelpSupportRefund}
      />
    </MyAccountStack.Navigator>
  );
};

export default Navigation;
