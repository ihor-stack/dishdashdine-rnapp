import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Platform, StatusBar} from 'react-native';
import {DynamicImage} from '@/components';
import RestaurantOrderNavigator from './Orders';
import RestaurantMenuNavigator from './Menus';
import CategoriesNavigator from './Categories';
import RestaurantsNavigator from './Restaurants';
import {Colors, fonts} from '@/themes';
import {useDispatch} from 'react-redux';
import {
  fetchBasicInformation,
  fetchOpeningHours,
  fetchPreparationTimes,
  fetchRestaurantCategories,
  fetchRestaurantDelivery,
  fetchRestaurantMenus,
  fetchRestaurantModifiers,
  getAllRestaurantActiveOrders,
  getAllRestaurantCancelledOrders,
  getAllRestaurantCompletedOrders,
  getAllRestaurantOrders,
  getAllRestaurantPendingOrders,
} from '@/store/admin_restaurant/restaurant/thunk';

import FilterOrder from '@/screens/Restaurant/Orders/Orders/FilterOrder';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useRoute} from '@react-navigation/native';

const ordersActive = require('@/assets/images/orders-active.png');
const ordersInActive = require('@/assets/images/orders-inactive.png');
const menusInActive = require('@/assets/images/food-menu.png');
const menusActive = require('@/assets/images/food-menu-active.png');
const listActive = require('@/assets/images/list-active.png');
const listInActive = require('@/assets/images/list.png');

const RestaurantBottomTab = createBottomTabNavigator();

const RestaurantTabs = () => {
  const dispatch = useDispatch<any>();
  const params = useRoute().params as any;
  const restaurantID = params?.restaurantId;

  useEffect(() => {
    const init = async () => {
      await Promise.all([
        dispatch(
          getAllRestaurantOrders({
            RestaurantId: restaurantID,
          }),
        ),
        dispatch(
          getAllRestaurantPendingOrders({
            RestaurantId: restaurantID,
          }),
        ),
        dispatch(
          getAllRestaurantActiveOrders({
            RestaurantId: restaurantID,
          }),
        ),
        dispatch(
          getAllRestaurantCompletedOrders({
            RestaurantId: restaurantID,
          }),
        ),
        dispatch(
          getAllRestaurantCancelledOrders({
            RestaurantId: restaurantID,
          }),
        ),
      ]);

      await Promise.all([
        dispatch(fetchBasicInformation(restaurantID)),
        dispatch(fetchOpeningHours(restaurantID)),
        dispatch(fetchPreparationTimes(restaurantID)),
        dispatch(fetchRestaurantMenus(restaurantID)),
        dispatch(fetchRestaurantCategories(restaurantID)),
        dispatch(fetchRestaurantModifiers(restaurantID)),
        dispatch(fetchRestaurantDelivery(restaurantID)),
      ]);

      // await dispatch(fetchMenuItemDetail(restaurantID));
    };

    init();
  }, [restaurantID, dispatch]);

  return (
    <>
      <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor={'transparent'}
      />
      <RestaurantBottomTab.Navigator
        screenOptions={({route}) => ({
          tabBarStyle: {
            ...Platform.select({
              android: {
                height: 70,
                paddingTop: 16,
              },
            }),
          },
          tabBarActiveTintColor: '#E00404',
          tabBarInactiveTintColor: '#303030',
          unmountOnBlur: true,
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: fonts.DMSans500Medium,
            lineHeight: 16,
            ...Platform.select({
              android: {
                paddingTop: 4.75,
                paddingBottom: 15,
              },
            }),
          },
        })}
        backBehavior="history">
        <RestaurantBottomTab.Screen
          name="BottomTabOrders"
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
          component={RestaurantOrderNavigator}
        />
        <RestaurantBottomTab.Screen
          name="MenusStack"
          options={{
            tabBarLabel: 'Menus',
            header: () => null,
            tabBarIcon: ({focused}) => (
              <DynamicImage
                resizeMode="contain"
                source={focused ? menusActive : menusInActive}
                width={22}
                height={22}
              />
            ),
          }}
          component={RestaurantMenuNavigator}
        />

        <RestaurantBottomTab.Screen
          name="CategoriesStack"
          options={{
            tabBarLabel: 'Categories',
            header: () => null,
            tabBarIcon: ({focused}) => (
              <DynamicImage
                resizeMode="contain"
                source={focused ? listActive : listInActive}
                width={22}
                height={22}
              />
            ),
          }}
          component={CategoriesNavigator}
        />
        <RestaurantBottomTab.Screen
          name="RestaurantStack"
          options={{
            tabBarLabel: 'Info',
            header: () => null,
            tabBarIcon: ({focused}) => (
              <DynamicImage resizeMode="contain">
                <AntDesign
                  size={22}
                  name={'infocirlceo'}
                  color={focused ? Colors.ember : Colors.black}
                />
              </DynamicImage>
            ),
          }}
          component={RestaurantsNavigator}
        />
      </RestaurantBottomTab.Navigator>

      <FilterOrder />
    </>
  );
};

export default RestaurantTabs;
