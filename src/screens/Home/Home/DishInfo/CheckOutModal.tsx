import React, {useEffect, useState} from 'react';
import {DynamicText, DynamicView} from '@/components';
import RestaurantInfoAvatar from './RestaurantInfoAvatar';
import {Divider} from 'native-base';
import {Colors} from '@/themes';
import CheckOutMenuITem from './CheckOutMenuITem';
import {useNavigation} from '@react-navigation/native';
import ActionSheet, {
  SheetManager,
  SheetProps,
} from 'react-native-actions-sheet';
import {ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import DishButton from '@/components/DishButton';
import {restaurantSelectors, setSelectedRestaurant} from '@/store/restaurants';
import {
  fetchOrderRestaurant,
  fetchRestaurantOrder,
  setOrderOrderType,
} from '@/store/order/thunk';
import {IOrder, IOrderLineItem} from '@/api/generic';
import {homeSelectors} from '@/store/home';
import {orderSelectors} from '@/store/order';
import {isEmpty} from 'lodash';

export interface CheckOutModalProps extends SheetProps {}

const CheckOutModal = (props: CheckOutModalProps) => {
  const navigation = useNavigation();
  const dispatch = useDispatch<any>();

  const [isCheckOut, setIsCheckOut] = useState(false);
  const [isFrom, setIsFrom] = useState('');
  const [orderId, setOrderId] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<IOrder | undefined>(undefined);

  const restaurant = useSelector(restaurantSelectors.selectRestaurant);
  const orderType = useSelector(homeSelectors.showOrderType);
  const isLoading = useSelector(orderSelectors.loadingSelectedOrder);
  const order = useSelector(orderSelectors.selectSelectedOrder);
  const lineItem: IOrderLineItem[] = order?.lineItems;

  const initOrder = async () => {
    const hasOrder: IOrder = await dispatch(
      fetchRestaurantOrder(order.id),
    ).unwrap();
    if (!isEmpty(hasOrder)) {
      setSelectedOrder(hasOrder);
    }
  };

  useEffect(() => {
    setSelectedOrder(order);
    initOrder();
  }, [order]);

  useEffect(() => {
    if (lineItem) {
      let newData: any = [...lineItem];

      newData = newData.map((x: any) => {
        return {
          ...x,
          itemTotal: x.itemPrice * x.quantity,
          modifierTotal: x.modifierPrice * x.quantity,
        };
      });
      setSelectedOrder(newData);
    }
  }, [lineItem]);

  useEffect(() => {
    if (selectedOrder && Number(selectedOrder.lineItemCount) < 1) {
      SheetManager.hide('CheckOutModal', {
        payload: true,
      });
    }
  }, []);

  const onCheckQTYChanged = () => {
    initOrder();
  };

  const onCheckOut = async () => {
    setIsCheckOut(true);
    // SET ORDER TYPE
    await dispatch(
      setOrderOrderType({id: selectedOrder.id, data: {orderType}}),
    );
    await SheetManager.hide('CheckOutModal');
  };

  return (
    <ActionSheet
      id={'CheckOutModal' || props.sheetId}
      gestureEnabled={lineItem?.length > 4 ? false : true}
      onBeforeShow={(data: any) => {
        setSelectedOrder(data?.order);
        setIsFrom(data?.isFrom);
        setOrderId(data?.orderId);
        setIsCheckOut(false);

        if (data?.orderId) {
          dispatch(fetchOrderRestaurant(data.orderId));
        }
      }}
      onClose={() => {
        if (isFrom === 'dish-info' && !isCheckOut) {
        } else if (isFrom === 'dish-info' && isCheckOut) {
          if (__DEV__) {
            console.log('selected: ', selectedOrder);
          }
          navigation.navigate('OrderDetails', {
            order: selectedOrder,
          });
        } else if (isFrom === 'order' && isCheckOut) {
          if (__DEV__) {
            console.log('onClose 118');
          }
          navigation.navigate('OrderDetails', {
            order: selectedOrder,
          });
        } else {
        }
      }}>
      <DynamicView paddingTop={54}>
        {selectedOrder && (
          <RestaurantInfoAvatar
            restaurant={selectedOrder.restaurant || restaurant}
            showProfile
            showLoading={isLoading}
          />
        )}
        <Divider bgColor={Colors.lightGrey} padding={1} />
        <ScrollView style={{backgroundColor: '#FFF'}}>
          <DynamicView paddingHorizontal={12}>
            <CheckOutMenuITem
              order={selectedOrder}
              showLoading={isLoading}
              onQuantityChanged={onCheckQTYChanged}
            />
          </DynamicView>
          <Divider bgColor={Colors.lightGrey} padding={1} />
          <DynamicView paddingHorizontal={12} paddingBottom={20}>
            {selectedOrder && Number(selectedOrder.lineItemCount) > 0 && (
              <DishButton
                icon="arrowright"
                variant="primary"
                onPress={onCheckOut}
                label="Go to checkout"
              />
            )}

            <DishButton
              icon="arrowright"
              label="Add more items"
              onPress={async () => {
                await SheetManager.hide('CheckOutModal');
                await dispatch(setSelectedRestaurant(restaurant));
                navigation.navigate('DishInfo', {
                  id: selectedOrder?.restaurantId,
                });
              }}
            />
          </DynamicView>
        </ScrollView>
      </DynamicView>
    </ActionSheet>
  );
};

export default CheckOutModal;
