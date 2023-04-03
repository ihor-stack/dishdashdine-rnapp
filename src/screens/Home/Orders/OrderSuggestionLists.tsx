import React from 'react';
import {DynamicText} from '@/components';
import {Colors, fonts} from '@/themes';
import RestaurantMenuItem from '../Home/DishInfo/RestaurantMenuItem';

export interface OrderSuggestionListsProps {
  label?: string;
}

const OrderSuggestionLists = ({label}: OrderSuggestionListsProps) => {
  return (
    <>
      <DynamicText
        fontFamily={fonts.DMSans500Medium}
        fontSize={16}
        lineHeight={20.83}
        color={Colors.black}>
        {label}
      </DynamicText>
      <RestaurantMenuItem />
    </>
  );
};

export default OrderSuggestionLists;
