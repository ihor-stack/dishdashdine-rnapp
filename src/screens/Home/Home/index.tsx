import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {HomeStackParamList} from '@/navigation/types';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import Home from './Home';
import {Search, SearchResult} from './Search';
import DishInfo from './DishInfo';
import {Address, Distance, Login, Register} from '@/screens/Onboarding/screens';
import {NavigationHeader} from '@/components';
import CustomizeItemOrder from './DishInfo/CustomizeItemOrder';
import OrderDetails from '../Orders/OrderDetails';
import OrderStatus from '../Orders/OrderStatus';
import OrderSummary from '../Orders/OrderSummary';
import AddnewAddress from '@/screens/Home/Account/screens/AddNewAddress';
import {MyWallet} from '../Account/screens';

const HomeStack = createStackNavigator<HomeStackParamList>();

const Navigation = () => {
  return (
    <>
      <HomeStack.Navigator>
        <HomeStack.Screen
          options={{
            header: () => null,
            gestureEnabled: false,
          }}
          name="HomeStack"
          component={Home}
        />
        <HomeStack.Screen
          name="Search"
          options={{
            header: () => null,
            ...TransitionPresets.ModalFadeTransition,
          }}
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
        <HomeStack.Screen
          options={{
            header: () => (
              <NavigationHeader showBackButton title="Add New Address" />
            ),
          }}
          name="AddNewAddress"
          component={AddnewAddress}
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
            header: () => (
              <NavigationHeader showBackButton title="Your Order" />
            ),
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
        <HomeStack.Screen
          options={{
            headerShown: false,
          }}
          name="MyWallet"
          component={MyWallet}
        />
        <HomeStack.Screen
          options={{header: () => null}}
          name="Register"
          component={Register}
        />
      </HomeStack.Navigator>
    </>
  );
};

export default Navigation;
