import React, {useEffect, useState} from 'react';
import {Platform, StatusBar, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';

import {DynamicImage} from '@/components';
import Home from './Home';
import Browse from './Browse/index';
import Orders from './Orders';
import FavoritesStack from './Favourites';
import Account from './Account';
import {HomeBottomTabParamList} from '@/navigation/types';
import {useDispatch, useSelector} from 'react-redux';
import {
  accountSelectors,
  setDevicePushToken,
  setCurrentUserLocation,
} from '@/store/account';
import {
  getCurrentGeolocation,
  requestGeolocationAuthorization,
  requestGeolocationAuthorizationAndroid,
} from '@/utils/geolocation';
import {fetchMyFavorites} from '@/store/restaurants/thunk';
import {captureErrorException} from '@/utils/error-handler';
import {fetchAddress, getDefaultAddress} from '@/store/address/thunk';
import {fetchTaxonomy} from '@/store/taxonomy/thunk';
import {fetchActiveOrder, fetchCompletedOrder} from '@/store/order/thunk';
import PromoCodeModal from './Orders/PromoCodeModal';
import DishMoreInfo from './Home/DishInfo/DishMoreInfo';
import CheckOutModal from './Home/DishInfo/CheckOutModal';
import OrderReviewModal from './Orders/OrderReviewModal';
import {getAllCards} from '@/store/my-wallet/thunk';
import PaymentMethodListModal from './Orders/PaymentMethodListModal';
import {isEmpty} from 'lodash';
import {fonts} from '@/themes';
import {fetchMyReviews} from '@/store/my-reviews/thunk';
import messaging from '@react-native-firebase/messaging';
import UserService from '@/api/user';
import {IUser} from '@/api/user';
import RestaurantEventCateringModal from './Home/DishInfo/RestaurantEventCateringModal';
import {fetchAppPromo} from '@/store/home/thunk';

import DishSpinner from '@/components/DishSpinner';
import {clearCurrentUser} from '@/store/account';
import {forceSignOut} from '@/utils/app-actions';

const homeActive = require('@/assets/images/home-active.png');
const homeInActive = require('@/assets/images/home-inactive.png');
const browseActive = require('@/assets/images/browse-active.png');
const browseInActive = require('@/assets/images/browse-inactive.png');
const ordersActive = require('@/assets/images/orders-active.png');
const ordersInActive = require('@/assets/images/orders-inactive.png');
const favouritesActive = require('@/assets/images/favourites-active.png');
const favouritesInActive = require('@/assets/images/favourites-inactive.png');
const accountActive = require('@/assets/images/account-active.png');
const accountInActive = require('@/assets/images/account-inactive.png');

const HomeBottomTab = createBottomTabNavigator<HomeBottomTabParamList>();

const HomeTabs = () => {
  const dispatch = useDispatch<any>();
  const currentLocation = useSelector(
    accountSelectors.selectCurrentUserLocation,
  );

  const currentUser = useSelector(accountSelectors.selectCurrentUser) as IUser;

  useEffect(() => {
    if (__DEV__) {
      console.log('HomeTabs useEffect');
    }

    const requestIOSPermission = async () => {
      try {
        await requestGeolocationAuthorization();
        if (currentUser?.noAuth && isEmpty(currentLocation)) {
          initGeolocation();
        }
      } catch (error) {
        captureErrorException(error);
      }
    };

    const requestAndroidPermission = async () => {
      try {
        await requestGeolocationAuthorizationAndroid();
        if (currentUser?.noAuth && isEmpty(currentLocation)) {
          initGeolocation();
        }
      } catch (error) {
        captureErrorException(error);
      }
    };

    if (Platform.OS === 'ios') {
      requestIOSPermission();
    } else {
      requestAndroidPermission();
    }

    if (!currentUser?.noAuth) {
      dispatch(fetchMyFavorites());
      dispatch(fetchAppPromo());

      dispatch(fetchAddress());
      dispatch(getDefaultAddress());

      dispatch(fetchMyReviews());

      if (currentUser?.emailConfirmed) {
        dispatch(getAllCards());
        dispatch(fetchActiveOrder());
        dispatch(fetchCompletedOrder());
      }
    }

    dispatch(fetchTaxonomy());

    messaging()
      .getToken()
      .then(token => {
        if (token) {
          dispatch(setDevicePushToken(token));
          if (currentUser && !currentUser?.noAuth) {
            UserService.savePushNotificationToken({
              deviceToken: token,
            });
          }
        }
      });
  }, [dispatch, currentUser]);

  const initGeolocation = async () => {
    try {
      const position: any = await getCurrentGeolocation();
      if (position) {
        const {latitude, longitude} = position.coords;
        dispatch(
          setCurrentUserLocation({
            latitude,
            longitude,
          }),
        );
      }
    } catch (error) {
      captureErrorException(error);
    }
  };

  return (
    <>
      <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor={'transparent'}
      />
      <HomeBottomTab.Navigator
        screenOptions={({route}) => ({
          tabBarStyle: {
            ...Platform.select({
              android: {
                height: 85,
              },
            }),
          },
          tabBarActiveTintColor: '#E00404',
          tabBarInactiveTintColor: '#303030',
          unmountOnBlur: true,
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: fonts.DMSans500Medium,
            fontWeight: '500',
            lineHeight: 15.62,
            ...Platform.select({
              android: {
                paddingBottom: 15,
              },
            }),
          },
        })}
        backBehavior="history">
        <HomeBottomTab.Screen
          name="BottomTabHome"
          options={{
            title: 'Home',
            header: () => null,
            tabBarIcon: ({focused}) => (
              <DynamicImage
                resizeMode="contain"
                source={focused ? homeActive : homeInActive}
                width={22}
                height={22}
              />
            ),
          }}
          component={Home}
        />
        <HomeBottomTab.Screen
          options={{
            header: () => null,
            tabBarIcon: ({focused}) => (
              <DynamicImage
                resizeMode="contain"
                source={focused ? browseActive : browseInActive}
                width={22}
                height={22}
              />
            ),
          }}
          name="Browse"
          component={Browse}
        />
        {!currentUser?.noAuth && (
          <>
            <HomeBottomTab.Screen
              name="Orders"
              options={{
                tabBarLabel: 'Orders',
                header: () => null,
                tabBarIcon: ({focused}) => (
                  <DynamicImage
                    resizeMode="contain"
                    source={focused ? ordersActive : ordersInActive}
                    width={22}
                    height={22}
                  />
                ),
              }}
              component={Orders}
            />
            <HomeBottomTab.Screen
              name="FavoritesStack"
              options={{
                tabBarLabel: 'Favorites',
                header: () => null,
                tabBarIcon: ({focused}) => (
                  <DynamicImage
                    resizeMode="contain"
                    source={focused ? favouritesActive : favouritesInActive}
                    width={22}
                    height={22}
                  />
                ),
              }}
              component={FavoritesStack}
            />
            <HomeBottomTab.Screen
              options={{
                headerShown: false,
                tabBarIcon: ({focused}) => (
                  <DynamicImage
                    resizeMode="contain"
                    source={focused ? accountActive : accountInActive}
                    width={22}
                    height={22}
                  />
                ),
              }}
              name="Account"
              component={Account}
            />
          </>
        ) || (
          <HomeBottomTab.Screen
            options={{
              tabBarIcon: () => (
                <DynamicImage
                  resizeMode="contain"
                  source={accountInActive}
                  width={22}
                  height={22}
                />
              ),
            }}
            name="Sign In"
            component={SignInComponent}
          />
        )}
      </HomeBottomTab.Navigator>

      <DishMoreInfo sheetId="DishMoreInfo" />

      <RestaurantEventCateringModal />

      <PromoCodeModal sheetId="PromoCodeModal" />

      <CheckOutModal sheetId="CheckOutModal" />

      <PaymentMethodListModal sheetId="PaymentMethodListModal" />

      <OrderReviewModal sheetId="OrderReviewModal" />
    </>
  );
};

function SignInComponent() {
  const dispatch = useDispatch<any>();
  const navigation =
    useNavigation<NavigationProp<AccountDetailsStackNavParamList>>();

  const [isLoading, setIsLoading] = useState(false);

  const onSignOut = async () => {
    setIsLoading(true);
    dispatch(clearCurrentUser());
    await forceSignOut(dispatch, navigation);
    setIsLoading(false);
  };

  useEffect(() => {
    onSignOut();
  }, []);

  return (
    <View>
      {isLoading && <DishSpinner />}
    </View>
  );
}

export default HomeTabs;
