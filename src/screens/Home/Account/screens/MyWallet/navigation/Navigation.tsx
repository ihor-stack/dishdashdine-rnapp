import React, {useEffect} from 'react';
import {useWindowDimensions, StatusBar} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {AccountMyWallet, AddCard, EditCard} from '../screens';
import {
  DynamicAnimatedView,
  DynamicImage,
  NavigationHeader,
} from '@/components';
import {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import {useDispatch, useSelector} from 'react-redux';
import {accountSelectors, setShowAddCardSuccess} from '@/store/account';

const newCardSuccess = require('@/assets/images/myAccount/new-card-success.png');

export type MyWalletStackParamList = {
  AccountMyWallet: undefined;
  AddCard: undefined;
  EditCard: undefined;
};

const MyWalletStack = createStackNavigator<MyWalletStackParamList>();

const Navigation = () => {
  const {width} = useWindowDimensions();
  const {top} = useSafeAreaInsets();
  const showAnimation = useSharedValue(0);
  const dispatch = useDispatch();
  const showAddCardSuccess = useSelector(accountSelectors.showAddCardSuccess);

  useEffect(() => {
    if (showAddCardSuccess) {
      showAnimation.value = withTiming(1, {}, () => {
        // hide
        // runOnJS(actions.account.setShowAddCardSuccess)(false)
        dispatch(setShowAddCardSuccess(false));
        showAnimation.value = withDelay(800, withTiming(0));
      });
    }
  }, [dispatch, showAddCardSuccess, showAnimation]);

  const addCardSuccessStyle = useAnimatedStyle(() => {
    return {
      top: interpolate(showAnimation.value, [0, 1], [-(top + 18), top]),
    };
  });

  return (
    <>
      <MyWalletStack.Navigator>
        <MyWalletStack.Screen
          options={{
            header: () => <NavigationHeader showBackButton title="My Wallet" />,
          }}
          name="AccountMyWallet"
          component={AccountMyWallet}
        />
        <MyWalletStack.Screen
          options={{
            header: () => <NavigationHeader showBackButton title="Add Card" />,
          }}
          name="AddCard"
          component={AddCard}
        />
        <MyWalletStack.Screen
          options={{
            header: () => <NavigationHeader showBackButton title="Edit Card" />,
          }}
          name="EditCard"
          component={EditCard}
        />
      </MyWalletStack.Navigator>
      <DynamicAnimatedView
        left={11}
        top={-(top + 18)}
        height={65}
        width={width - 22}
        position="absolute"
        style={addCardSuccessStyle}>
        <DynamicImage source={newCardSuccess} width="100%" height="100%" />
      </DynamicAnimatedView>
    </>
  );
};

export default Navigation;
