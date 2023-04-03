import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import RestaurantCategories from './screens';
import {NavigationHeader} from '@/components';
import {StackActions, useNavigation} from '@react-navigation/native';
import CategoryEntry from './screens/CategoryEntry';

const CategoriesStack = createStackNavigator();

const CategoriesNavigator = () => {
  const navigation = useNavigation();

  return (
    <CategoriesStack.Navigator>
      <CategoriesStack.Screen
        name="RestaurantCategories"
        component={RestaurantCategories}
        options={{
          header: () => (
            <NavigationHeader
              showBackButton
              restaurant
              title="Category"
              onGoBackPress={() => {
                navigation.dispatch(StackActions.popToTop());
              }}
            />
          ),
          animationEnabled: true,
        }}
      />
      <CategoriesStack.Screen
        name="CategoryEntry"
        component={CategoryEntry}
        options={{
          header: () => (
            <NavigationHeader showBackButton restaurant title="Categories" />
          ),
        }}
      />
      <CategoriesStack.Screen
        name="CategoryDetails"
        component={CategoryEntry}
        options={{
          header: () => (
            <NavigationHeader showBackButton restaurant title="Category" />
          ),
        }}
      />
    </CategoriesStack.Navigator>
  );
};

export default CategoriesNavigator;
