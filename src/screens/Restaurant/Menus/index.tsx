import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import RestaurantMenus from './screens';
import MenuItem from './screens/MenuItem';
import MenuItemDetails from './screens/MenuItemDetails';
import {NavigationHeader} from '@/components';
import MenuCategories from './screens/MenuCategories';
import {StackActions, useNavigation} from '@react-navigation/native';
import MenuEntry from './screens/MenuEntry';

const RestaurantMenuStack = createStackNavigator();

const RestaurantMenuNavigator = () => {
  const navigation = useNavigation();

  return (
    <RestaurantMenuStack.Navigator>
      <RestaurantMenuStack.Screen
        name="RestaurantMenuStack"
        component={RestaurantMenus}
        options={{
          header: () => (
            <NavigationHeader
              showBackButton
              restaurant
              title="Menus"
              onGoBackPress={() => {
                navigation.dispatch(StackActions.popToTop());
              }}
            />
          ),
          animationEnabled: true,
        }}
      />
      <RestaurantMenuStack.Screen
        name="MenuItem"
        component={MenuItem}
        options={{
          header: () => (
            <NavigationHeader showBackButton restaurant title="Menus" />
          ),
          animationEnabled: true,
        }}
      />
      <RestaurantMenuStack.Screen
        name="MenuCategories"
        component={MenuCategories}
        options={{
          header: () => (
            <NavigationHeader
              showBackButton
              restaurant
              title="Menu Categories"
            />
          ),
          animationEnabled: true,
        }}
      />
      <RestaurantMenuStack.Screen
        name="MenuItemDetails"
        component={MenuItemDetails}
        options={{
          header: () => (
            <NavigationHeader showBackButton restaurant title="Menus" />
          ),
          animationEnabled: true,
        }}
      />
      <RestaurantMenuStack.Screen
        name="MenuEntry"
        component={MenuEntry}
        options={{
          header: () => (
            <NavigationHeader showBackButton restaurant title="Menus" />
          ),
        }}
      />
    </RestaurantMenuStack.Navigator>
  );
};

export default RestaurantMenuNavigator;
