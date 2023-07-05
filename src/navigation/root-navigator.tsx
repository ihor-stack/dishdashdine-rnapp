import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {Home, Onboarding} from '../screens';
import {useDispatch, useSelector} from 'react-redux';
import {
  accountSelectors,
  setDevicePushToken,
  setWillUpdate,
  clearCurrentUser,
} from '@/store/account';
import {clearSelectedRestaurant} from '@/store/admin_restaurant/restaurant';
import {DynamicText, NavigationHeader} from '@/components';
import Restaurants from '@/screens/Restaurant/Restaurants/screens';
import RestaurantTabs from '@/screens/Restaurant';
import RestaurantBasicInformation from '@/screens/Restaurant/Restaurants/screens/RestaurantBasicInformation';
import messaging from '@react-native-firebase/messaging';
import SplashScreen from '@/screens/Splash';
import DeleteAccountDeleted from '@/screens/Home/Account/screens/AccountDetails/screens/DeleteAccount/DeleteAccountDeleted';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {authSelectors} from '@/store/authentication';
import {isEmpty} from 'lodash';
import {Colors, fonts} from '@/themes';

import {adminRestaurantSelectors} from '@/store/admin_restaurant/restaurant';
import UserService from '@/api/user';
import {forceSignOut} from '@/utils/app-actions';
import {captureErrorException} from '@/utils/error-handler';

export type AppStackNavParamList = {
  Onboarding: undefined;
  HomeRoot: undefined;
  AdminRootRestaurants: undefined;
  DeleteAccountDeleted: undefined;
  SplashScreen: undefined;
};

const AppStack = createStackNavigator<AppStackNavParamList>();
const RestaurantStackNav = createStackNavigator();

const AdminRestaurantNavigator = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const restaurant = useSelector(adminRestaurantSelectors.selectRestaurant);
  const pushNotificationToken = useSelector(
    accountSelectors.selectDevicePushToken,
  );

  const onSignOut = async () => {
    try {
      setIsLoading(true);
      if (pushNotificationToken) {
        await UserService.deletePushNotificationToken({
          deviceToken: pushNotificationToken,
        });
      }
      setIsLoading(false);
      await dispatch(clearCurrentUser());
      await forceSignOut(dispatch);
    } catch (error) {
      setIsLoading(false);
      captureErrorException(error);
      await dispatch(clearCurrentUser());
      await forceSignOut(dispatch);
    }
  };

  useEffect(() => {
    dispatch(clearSelectedRestaurant());
  }, [dispatch]);

  return (
    <RestaurantStackNav.Navigator>
      <RestaurantStackNav.Screen
        name="AdminRestaurants"
        component={Restaurants}
        options={{
          header: () => (
            <NavigationHeader
              restaurant
              title="Restaurants"
              slotEnd={
                <DynamicText
                  fontFamily={fonts.DMSans500Medium}
                  fontWeight="500"
                  color={Colors.white}
                  fontSize={18}
                  onPress={onSignOut}
                >
                  Logout
                </DynamicText>
              }
            />
          )
        }}
      />
      <RestaurantStackNav.Screen
        options={{header: () => null}}
        name="RestaurantBottomNavStack"
        component={RestaurantTabs}
      />
      <RestaurantStackNav.Screen
        name="RestaurantBasicInformation"
        component={RestaurantBasicInformation}
        options={{
          header: () => (
            <NavigationHeader showBackButton restaurant title="Restaurants" />
          ),
        }}
      />
    </RestaurantStackNav.Navigator>
  );
};

const RootNavigator = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  const isAuthenticated = useSelector(authSelectors.isAuthenticated);
  const currentUser = useSelector(accountSelectors.selectCurrentUser);
  const willUpdate = useSelector(accountSelectors.willUpdate);

  useEffect(() => {
    messaging()
      .getToken()
      .then(token => {
        dispatch(setDevicePushToken(token));
      });
  }, [dispatch]);

  useEffect(() => {
    if (willUpdate) {
      if (isAuthenticated) {
        if (!isEmpty(currentUser)) {
          if (currentUser?.primaryUserRole === 'User') {
            navigation.navigate('HomeRoot');
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: 'HomeRoot'}],
              }),
            );
          } else {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: 'AdminRootRestaurants'}],
              }),
            );
          }
        } else {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'Onboarding', params: {screen: 'Welcome'}}],
            }),
          );
        }
      }
    } else {
      dispatch(setWillUpdate(true))
    }
  }, [isAuthenticated, currentUser]);

  return (
    <AppStack.Navigator initialRouteName="SplashScreen">
      <AppStack.Screen
        options={{
          header: () => null,
        }}
        name="SplashScreen"
        component={SplashScreen}
      />
      <AppStack.Screen
        options={{
          header: () => null,
          gestureEnabled: currentUser?.noAuth,
          // cardStyleInterpolator:
          //   CardStyleInterpolators.forFadeFromBottomAndroid,
        }}
        name="HomeRoot"
        component={Home}
      />
      <AppStack.Screen
        name="Onboarding"
        options={{header: () => null}}
        component={Onboarding}
      />
      <AppStack.Screen
        options={{
          header: () => null,
          // cardStyleInterpolator:
          //   CardStyleInterpolators.forFadeFromBottomAndroid,
        }}
        name="AdminRootRestaurants"
        component={AdminRestaurantNavigator}
      />
      <AppStack.Screen
        options={{
          header: () => (
            <NavigationHeader showBackButton={false} title="Account Deleted" />
          ),
          gestureEnabled: false,
          animationEnabled: true,
        }}
        name="DeleteAccountDeleted"
        component={DeleteAccountDeleted}
      />
    </AppStack.Navigator>
  );
};

export default RootNavigator;
