import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeStackParamList} from '@/navigation/types';
import Home from './Home';
import {Search, SearchResult} from './Search';
import DishInfo from './DishInfo';
import {Address, Distance} from '@/screens/Onboarding/screens';
import {NavigationHeader} from '@/components';
import CustomizeItemOrder from './DishInfo/CustomizeItemOrder';
import OrderDetails from '../Orders/OrderDetails';
import OrderStatus from '../Orders/OrderStatus/OrderStatus';
import OrderSummary from '../Orders/OrderSummary';

const HomeStack = createStackNavigator<HomeStackParamList>();

const Navigation = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        options={{
          header: () => null,
        }}
        name="HomeStack"
        component={Home}
      />
      <HomeStack.Screen
        name="Search"
        options={{header: () => null}}
        component={Search}
      />
      <HomeStack.Screen
        name="SearchResult"
        options={{header: () => null}}
        component={SearchResult}
      />
      <HomeStack.Screen
        name="DishInfo"
        options={{header: () => null}}
        component={DishInfo}
      />
      <HomeStack.Screen name="Address" component={Address} />
      <HomeStack.Screen
        name="Distance"
        options={{
          header: () => <NavigationHeader showBackButton title="Distance" />,
        }}
        component={Distance}
      />
      <HomeStack.Screen
        name="CustomizeItemOrder"
        options={{header: () => null}}
        component={CustomizeItemOrder}
      />
      <HomeStack.Screen
        name="OrderDetails"
        options={{
          header: () => <NavigationHeader showBackButton title="Your Order" />,
          animationEnabled: true,
        }}
        component={OrderDetails}
      />
      <HomeStack.Screen
        name="OrderStatus"
        options={{header: () => null}}
        component={OrderStatus}
      />
      <HomeStack.Screen
        name="OrderSummary"
        options={{
          header: () => <NavigationHeader showBackButton title="My Order" />,
          animationEnabled: true,
        }}
        component={OrderSummary}
      />
    </HomeStack.Navigator>
  );
};

export default Navigation;
