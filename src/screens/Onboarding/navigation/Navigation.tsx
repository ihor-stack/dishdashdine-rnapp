import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  Address,
  Distance,
  Login,
  Welcome,
  Register,
  ForgotPassword,
} from '../screens';
import {NavigationHeader} from '@/components';
import AddnewAddress from '@/screens/Home/Account/screens/AddNewAddress';
import {PrivacyPolicy, TermsOfService} from '@/screens/Home/Account/screens';
import Home from '@/screens/Home/Home/Home';
import DishInfo from '@/screens/Home/Home/DishInfo';
import VerificationSent from '@/screens/Onboarding/screens/Verification/VerificationSent';
import VerifyingAccount from '@/screens/Onboarding/screens/Verification/VerifyingAccount';

export type OnboardingStackNavParamList = {
  Address: undefined;
  Distance: undefined;
  Login: undefined;
  Welcome: undefined;
  Register: undefined;
  AddNewAddress: undefined;
  ForgotPassword: undefined;
  TermsOfService: undefined;
  PrivacyPolicy: undefined;
  Home: undefined;
  VerificationSent: undefined;
  DishInfo: undefined;
  VerifyAccount: undefined;
};

const OnboardingStack = createStackNavigator<OnboardingStackNavParamList>();

const Navigation = (stackProps: any) => {
  return (
    <>
      <OnboardingStack.Navigator initialRouteName="Welcome">
        <OnboardingStack.Screen
          name="Welcome"
          options={{header: () => null}}
          component={Welcome}
        />
        <OnboardingStack.Screen
          name="Address"
          options={{header: () => null}}
          component={Address}
        />
        <OnboardingStack.Screen
          options={{
            header: () => <NavigationHeader showBackButton title="Distance" />,
          }}
          name="Distance"
          component={Distance}
        />
        <OnboardingStack.Screen
          options={{
            header: () => <NavigationHeader showBackButton title="Login" />,
          }}
          name="Login"
          component={Login}
        />
        <OnboardingStack.Screen
          options={{
            header: () => null,
          }}
          name="Register">
          {() => {
            return <Register {...stackProps} />
          }}
        </OnboardingStack.Screen>
        <OnboardingStack.Screen
          options={{
            header: () => <NavigationHeader showBackButton title="Login" />,
          }}
          name="ForgotPassword"
          component={ForgotPassword}
        />
        <OnboardingStack.Screen
          options={{
            header: () => (
              <NavigationHeader showBackButton title="Add New Address" />
            ),
          }}
          name="AddNewAddress"
          component={AddnewAddress}
        />
        <OnboardingStack.Screen
          options={{
            header: () => (
              <NavigationHeader showBackButton title="Terms of Service" />
            ),
          }}
          name="TermsOfService"
          component={TermsOfService}
        />
        <OnboardingStack.Screen
          options={{
            header: () => (
              <NavigationHeader showBackButton title="Privacy Policy" />
            ),
          }}
          name="PrivacyPolicy"
          component={PrivacyPolicy}
        />
        <OnboardingStack.Screen
          options={{
            header: () => null,
          }}
          name="Home"
          component={Home}
        />
        <OnboardingStack.Screen
          name="DishInfo"
          options={{header: () => null}}
          component={DishInfo}
        />
        <OnboardingStack.Screen
          name="VerificationSent"
          options={{
            header: () => (
              <NavigationHeader showBackButton={false} title="Verification" />
            ),
          }}
          component={VerificationSent}
        />
        <OnboardingStack.Screen
          name="VerifyAccount"
          options={{
            header: () => null,
          }}
          component={VerifyingAccount}
        />
      </OnboardingStack.Navigator>
    </>
  );
};

export default Navigation;
