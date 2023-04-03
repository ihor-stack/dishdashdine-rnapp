import React from 'react';
import {DynamicPressable, DynamicText, DynamicView} from '@/components';
import {Colors, fonts} from '@/themes';
import CheckOutMenuITem from '../../Home/DishInfo/CheckOutMenuITem';
import {useNavigation} from '@react-navigation/native';
import {IOrder, IRestaurant} from '@/api/generic';
import {restaurantSelectors, setSelectedRestaurant} from '@/store/restaurants';
import {useDispatch, useSelector} from 'react-redux';
import {fetchOrderRestaurant, fetchRestaurantOrder} from '@/store/order/thunk';

export interface OrderDetailsListsProps {
  restaurant?: IRestaurant;
  order?: IOrder;
}

const OrderDetailsLists = ({restaurant, order}: OrderDetailsListsProps) => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<any>();
  const restaurants = useSelector(restaurantSelectors.selectRestaurant);
  const onQuantityChanged = async () => {
    if (order) {
      await dispatch(fetchOrderRestaurant(order.id)).unwrap();
    }
  };
  return (
    <>
      <DynamicView paddingTop={21} paddingHorizontal={11}>
        <DynamicView flexDirection="row" justifyContent="space-between">
          <DynamicText
            fontFamily={fonts.DMSans500Medium}
            fontSize={16}
            lineHeight={20.83}
            color={Colors.black}>
            Your order
          </DynamicText>
          <DynamicPressable
            onPress={async () => {
              await dispatch(setSelectedRestaurant(restaurants));
              navigation.navigate('DishInfo', {id: restaurant?.restaurantId});
            }}>
            <DynamicText
              fontFamily={fonts.DMSans500Medium}
              fontSize={13}
              lineHeight={15.62}
              color={Colors.ember}>
              Add more items
            </DynamicText>
          </DynamicPressable>
        </DynamicView>
        <CheckOutMenuITem onQuantityChanged={onQuantityChanged} order={order} />
      </DynamicView>
    </>
  );
};

export default OrderDetailsLists;
