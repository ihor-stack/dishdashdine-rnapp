import React, {useEffect, useState} from 'react';
import {Box, Button, HStack, Text} from 'native-base';
import Colors from '@/themes/colors';
import {useNavigation} from '@react-navigation/native';
import NoOrder from '../../Orders/NoOrder';
import {useIsMounted} from '@/hooks/useIsMounted';
import {IOrder, IOrderItem} from '@/api/generic';
import {useDispatch, useSelector} from 'react-redux';
import {orderSelectors} from '@/store/order';
import {ActivityIndicator, FlatList, StyleSheet} from 'react-native';
import OrdersItem from '@/screens/Home/Orders/OrderItem';
import {SheetManager} from 'react-native-actions-sheet';
import {DynamicPressable, DynamicText, DynamicView} from '@/components';
import {fonts} from '@/themes';
import OrderService from '@/api/order';
import {isEmpty, size} from 'lodash';
import {
  fetchActiveOrder,
  fetchCompletedOrder,
  fetchOrderRestaurant,
  setOrderAddress,
} from '@/store/order/thunk';
import {showWarningMessage} from '@/components/DishFlashMessage';
import {captureErrorException} from '@/utils/error-handler';

const Dishes = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<any>();

  const completedOrders: IOrder[] = useSelector(
    orderSelectors.selectCompletedOrder,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [activeOrder, setActiveOrder] = useState<IOrder | any>(null);
  const isMounted = useIsMounted();

  useEffect(() => {
    if (isMounted.current) {
      setIsLoading(true);
    }

    setTimeout(() => {
      if (isMounted.current) {
        setIsLoading(false);
      }
    }, 2000);
  }, [isMounted]);

  const onSelectOrder = async (item: IOrder) => {
    navigation.navigate('OrderSummary', {
      order: item,
      orderId: item.id,
    });
  };

  const handleOnPressViewAll = () => {
    navigation.navigate('Orders', {
      screen: 'OrderStack',
      params: {
        tab: 'completed',
      },
    });
  };

  const onReOrderItem = async (order: IOrder) => {
    setIsLoading(true);
    let latestOrder: any = {};

    const selectedOrder: IOrder = await dispatch(
      fetchOrderRestaurant(order.id),
    ).unwrap();
    setActiveOrder(selectedOrder);

    try {
      const response: IOrder = await OrderService.findOrCreateRestaurant(
        order.restaurantId || selectedOrder.restaurantId,
      );
      if (response) {
        if (isEmpty(response?.address)) {
          // SET ADDRESS
          await dispatch(
            setOrderAddress({
              id: response.id,
              data: {
                existingAddressId: selectedOrder?.address?.id,
              },
            }),
          ).unwrap();
        }

        latestOrder = response;

        if (order.lineItems) {
          for (let index = 0; index < size(selectedOrder?.lineItems); index++) {
            const item = selectedOrder?.lineItems[index];
            const orderItem: IOrderItem = {
              itemId: item.itemId,
              menuId: item.menuId,
              quantity: item.quantity,
              specialInstructions: item.specialInstructions,
              modifierGroupSelections: item.selectedModifierGroups,
              orderLineItemId: '',
              itemPrice: item.itemPrice,
              itemTotal: item.itemTotal,
            };

            await OrderService.addItemToOrder(response.id, orderItem);
          }
        }

        await dispatch(fetchOrderRestaurant(response.id));
      }

      Promise.all([
        dispatch(fetchActiveOrder()),
        dispatch(fetchCompletedOrder()),
      ]);
      setIsLoading(false);

      SheetManager.show('CheckOutModal', {
        payload: {
          order: {
            ...latestOrder,
            restaurant: selectedOrder?.restaurant || order?.restaurant,
          },
          isFrom: 'dish-info',
        },
      });
    } catch (e: any) {
      captureErrorException(e);
      setIsLoading(false);
      if (e?.name === 'SyntaxError') {
        return showWarningMessage(
          'Warning',
          'WARNING: An unknown error has occured.',
        );
      } else if (e?.ModifierGroupSelections) {
        return showWarningMessage('Warning', e?.ModifierGroupSelections[0]);
      }
    }
  };

  const renderItem = ({item, index}: any) => {
    return (
      <DynamicPressable
        flexDirection="column"
        borderWidth={1}
        borderRadius={4}
        borderColor={Colors.lightGrey}
        marginRight={13}
        minWidth={256}
        onPress={() => onSelectOrder(item)}
        key={index}>
        {isLoading && item.id === activeOrder?.id && (
          <ActivityIndicator
            style={StyleSheet.absoluteFill}
            size="large"
            color={Colors.red}
          />
        )}
        <DynamicView>
          <OrdersItem
            order={item}
            restaurant={item.restaurant}
            showReview
            onPressReview={() => onReviewOrder(item)}
          />
        </DynamicView>
        <DynamicView
          alignItems="center"
          borderTopColor={Colors.lightGrey}
          borderTopWidth={1}>
          <Button variant="link" onPress={() => onReOrderItem(item)}>
            <DynamicText
              fontSize={13}
              fontFamily={fonts.DMSans500Medium}
              lineHeight={15.62}
              color={Colors.ember}>
              Re-order
            </DynamicText>
          </Button>
        </DynamicView>
      </DynamicPressable>
    );
  };

  const onReviewOrder = async (item: IOrder) => {
    await SheetManager.show('OrderReviewModal', {
      payload: {
        order: item,
        orderId: item.id,
      },
    });
  };

  return (
    <Box marginBottom={6}>
      <HStack alignItems="center" justifyContent="space-between" p={3}>
        <Text fontFamily="body" fontWeight={700} fontSize={20} lineHeight={26}>
          Order again
        </Text>
        <Button variant="link" p={0} onPress={handleOnPressViewAll}>
          <Text color={Colors.ember} fontSize="xs" fontWeight="bold">
            View all
          </Text>
        </Button>
      </HStack>
      <FlatList
        horizontal
        style={{
          marginLeft: 11,
        }}
        showsHorizontalScrollIndicator={false}
        data={completedOrders}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListEmptyComponent={() => <NoOrder />}
      />
    </Box>
  );
};

export default Dishes;
