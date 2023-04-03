import React from 'react';
import {Search, SearchResult} from '@/screens/Home/Home/Search';
import {createStackNavigator} from '@react-navigation/stack';
import Browse from './Browse';
import {NavigationHeader} from '@/components';
import DishInfo from '../Home/DishInfo';
import CustomizeItemOrder from '../Home/DishInfo/CustomizeItemOrder';
import OrderDetails from '../Orders/OrderDetails';

const BrowseStack = createStackNavigator();

const Navigation = () => {
  return (
    <BrowseStack.Navigator initialRouteName="BrowseStack">
      <BrowseStack.Screen
        options={{
          header: () => <NavigationHeader title="Browse" />,
        }}
        name="BrowseStack"
        component={Browse}
      />
      <BrowseStack.Screen
        name="BrowseSearch"
        options={{header: () => null}}
        component={Search}
      />
      <BrowseStack.Screen
        name="SearchResult"
        options={{header: () => null}}
        component={SearchResult}
      />
      <BrowseStack.Screen
        name="DishInfo"
        options={{header: () => null}}
        component={DishInfo}
      />
      <BrowseStack.Screen
        name="CustomizeItemOrder"
        options={{header: () => null}}
        component={CustomizeItemOrder}
      />
      <BrowseStack.Screen
        name="OrderDetails"
        options={{
          header: () => <NavigationHeader showBackButton title="Your Order" />,
          animationEnabled: true,
        }}
        component={OrderDetails}
      />
    </BrowseStack.Navigator>
  );
};

export default Navigation;
