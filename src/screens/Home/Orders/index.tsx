import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Orders from './Tabs';
import OrderDetails from './OrderDetails';
import {NavigationHeader} from '@/components';
import OrderStatus from './OrderStatus';
import OrderSummary from './OrderSummary';
import DishInfo from '../Home/DishInfo';
import CustomizeItemOrder from '../Home/DishInfo/CustomizeItemOrder';
import {MyWallet} from '@/screens/Home/Account/screens';
import HelpSupportOrderEntry from '@/screens/Home/Account/screens/HelpAndSupport/HelpSupportOrderEntry';

export type OrderStackNavParamList = {
  OrderDetails: undefined;
  OrderStack: undefined;
  MyOrder: undefined;
  OrderStatus: undefined;
  MyWallet: undefined;
  DishInfo: undefined;
  CustomizeItemOrder: undefined;
};

const OrderStack = createStackNavigator<OrderStackNavParamList>();

const Navigation = () => {
  return (
    <OrderStack.Navigator initialRouteName="OrderStack">
      <OrderStack.Screen
        options={{
          header: () => <NavigationHeader title="Orders" />,
        }}
        name="OrderStack"
        component={Orders}
      />
      <OrderStack.Screen
        name="OrderDetails"
        options={{
          header: () => <NavigationHeader showBackButton title="Your Order" />,
          animationEnabled: true,
        }}
        component={OrderDetails}
      />
      <OrderStack.Screen
        name="OrderSummary"
        options={{
          header: () => <NavigationHeader showBackButton title="My Order" />,
          animationEnabled: true,
        }}
        component={OrderSummary}
      />
      <OrderStack.Screen
        name="OrderStatus"
        options={{
          header: () => null,
          animationEnabled: true,
        }}
        component={OrderStatus}
      />
      <OrderStack.Screen
        name="DishInfo"
        options={{header: () => null}}
        component={DishInfo}
      />
      <OrderStack.Screen
        name="CustomizeItemOrder"
        options={{header: () => null}}
        component={CustomizeItemOrder}
      />
      <OrderStack.Screen
        options={{
          headerShown: false,
        }}
        name="MyWallet"
        component={MyWallet}
      />
      <OrderStack.Screen
        options={{
          header: () => (
            <NavigationHeader showBackButton title="Help & Support" />
          ),
        }}
        name="HelpSupportOrderEntry"
        component={HelpSupportOrderEntry}
      />
    </OrderStack.Navigator>
  );
};

export default Navigation;
