import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import RestaurantItem from './screens/RestaurantItem';
import {NavigationHeader} from '@/components';
import RestaurantInformation from './screens/RestaurantInformation';
import RestaurantBasicInformation from './screens/RestaurantBasicInformation';
import OpeningHours from './screens/OpeningHours';
import PreparationTime from './screens/PreparationTime';
import ModifierGroups from '../ModifierGroups';
import Menus from '@/screens/Restaurant/Menus/screens';
import MenuItem from '../Menus/screens/MenuItem';
import RestaurantCategories from '@/screens/Restaurant/Categories/screens';
import MenuItemDetails from '../Menus/screens/MenuItemDetails';
import MenuCategories from '../Menus/screens/MenuCategories';
import MenuEntry from '../Menus/screens/MenuEntry';
import CategoryEntry from '../Categories/screens/CategoryEntry';
import RestaurantOrder from '../Orders/Orders';
import ModifierGroupEntry from '@/screens/Restaurant/ModifierGroups/ModifierGroupEntry';
import RestaurantDelivery from './screens/Delivery';
import RestaurantDeliveryEntry from './screens/Delivery/DeliveryEntry';

const RestaurantsStack = createStackNavigator();

const RestaurantsNavigator = () => {
  return (
    <RestaurantsStack.Navigator initialRouteName={'Restaurant'}>
      <RestaurantsStack.Screen
        name="RestaurantItem"
        component={RestaurantItem}
        options={{
          header: () => (
            <NavigationHeader showBackButton restaurant title="Restaurant" />
          ),
        }}
      />
      <RestaurantsStack.Screen
        name="RestaurantInformation"
        component={RestaurantInformation}
        options={{
          header: () => (
            <NavigationHeader showBackButton restaurant title="Restaurant" />
          ),
        }}
      />
      <RestaurantsStack.Screen
        name="RestaurantBasicInformation"
        component={RestaurantBasicInformation}
        options={{
          header: () => (
            <NavigationHeader showBackButton restaurant title="Restaurant" />
          ),
        }}
      />
      <RestaurantsStack.Screen
        name="OpeningHours"
        component={OpeningHours}
        options={{
          header: () => (
            <NavigationHeader showBackButton restaurant title="Restaurant" />
          ),
        }}
      />
      <RestaurantsStack.Screen
        name="PreparationTime"
        component={PreparationTime}
        options={{
          header: () => (
            <NavigationHeader showBackButton restaurant title="Restaurant" />
          ),
        }}
      />
      <RestaurantsStack.Screen
        name="Menus"
        component={Menus}
        options={{
          header: () => (
            <NavigationHeader showBackButton restaurant title="Menus" />
          ),
        }}
      />
      <RestaurantsStack.Screen
        name="MenuItem"
        component={MenuItem}
        options={{
          header: () => (
            <NavigationHeader showBackButton restaurant title="Menus" />
          ),
        }}
      />
      <RestaurantsStack.Screen
        name="MenuEntry"
        component={MenuEntry}
        options={{
          header: () => (
            <NavigationHeader showBackButton restaurant title="Menus" />
          ),
        }}
      />
      <RestaurantsStack.Screen
        name="CategoryDetails"
        component={CategoryEntry}
        options={{
          header: () => (
            <NavigationHeader showBackButton restaurant title="Categories" />
          ),
        }}
      />
      <RestaurantsStack.Screen
        name="CategoryEntry"
        component={CategoryEntry}
        options={{
          header: () => (
            <NavigationHeader showBackButton restaurant title="Categories" />
          ),
        }}
      />
      {/* <RestaurantsStack.Screen
        name="MenuItemForm"
        component={MenuItemForm}
        options={{
          header: () => (
            <NavigationHeader showBackButton restaurant title="Menus" />
          ),
        }}
      /> */}
      <RestaurantsStack.Screen
        name="MenuItemDetails"
        component={MenuItemDetails}
        options={{
          header: () => (
            <NavigationHeader showBackButton restaurant title="Menus" />
          ),
          animationEnabled: true,
        }}
      />
      <RestaurantsStack.Screen
        name="MenuCategories"
        component={MenuCategories}
      />
      <RestaurantsStack.Screen
        name="RestaurantCategories"
        component={RestaurantCategories}
        options={{
          header: () => (
            <NavigationHeader showBackButton restaurant title="Categories" />
          ),
        }}
      />
      <RestaurantsStack.Screen
        name="ModifierGroups"
        component={ModifierGroups}
        options={{
          header: () => (
            <NavigationHeader
              showBackButton
              restaurant
              title="Modifier Groups"
            />
          ),
        }}
      />
      <RestaurantsStack.Screen
        name="ModifierGroupsEntry"
        component={ModifierGroupEntry}
        options={{
          header: () => (
            <NavigationHeader
              showBackButton
              restaurant
              title="Modifier Groups"
            />
          ),
        }}
      />
      <RestaurantsStack.Screen
        name="RestaurantOrder"
        component={RestaurantOrder}
        options={{
          header: () => null,
          animationEnabled: true,
        }}
      />
      <RestaurantsStack.Screen
        name="RestaurantDelivery"
        component={RestaurantDelivery}
        options={{
          header: () => (
            <NavigationHeader showBackButton restaurant title="Delivery" />
          ),
        }}
      />
      <RestaurantsStack.Screen
        name="RestaurantDeliveryEntry"
        component={RestaurantDeliveryEntry}
        options={{
          header: () => (
            <NavigationHeader showBackButton restaurant title="Delivery" />
          ),
        }}
      />
    </RestaurantsStack.Navigator>
  );
};

export default RestaurantsNavigator;
