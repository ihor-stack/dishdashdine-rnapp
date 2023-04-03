import React from 'react';
import {NavigationHeader} from '@/components';
import {createStackNavigator} from '@react-navigation/stack';
import Favourites from './Favourites';
import DishInfo from '../Home/DishInfo';
import CustomizeItemOrder from '../Home/DishInfo/CustomizeItemOrder';
import OrderStatus from '@/screens/Home/Orders/OrderStatus';

const FavoritesStack = createStackNavigator<any>();

const Navigation = () => {
  return (
    <FavoritesStack.Navigator initialRouteName="Favorites">
      <FavoritesStack.Screen
        options={{
          header: () => <NavigationHeader title="My Favourites" />,
        }}
        name="Favorites"
        component={Favourites}
      />
      <FavoritesStack.Screen
        name="DishInfo"
        options={{header: () => null}}
        component={DishInfo}
      />
      <FavoritesStack.Screen
        name="OrderStatus"
        options={{header: () => null}}
        component={OrderStatus}
      />
      <FavoritesStack.Screen
        name="CustomizeItemOrder"
        options={{header: () => null}}
        component={CustomizeItemOrder}
      />
    </FavoritesStack.Navigator>
  );
};

export default Navigation;
