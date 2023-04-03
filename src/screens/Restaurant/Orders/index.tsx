import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import RestaurantOrder from './Orders';

import {NavigationHeader} from '@/components';

const RestaurantOrderStack = createStackNavigator();

const RestaurantOrderNavigator = () => {
  return (
    <>
      <RestaurantOrderStack.Navigator>
        <RestaurantOrderStack.Screen
          name="RestaurantOrderStack"
          component={RestaurantOrder}
          options={{
            header: () => (
              <NavigationHeader showBackButton restaurant title="Orders" />
            ),
          }}
        />
      </RestaurantOrderStack.Navigator>
    </>
  );
};

export default RestaurantOrderNavigator;
