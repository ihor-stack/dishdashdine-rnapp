import {DynamicPressable, DynamicText, DynamicView} from '@/components';
import DishSpinner from '@/components/DishSpinner';
import {orderSelectors} from '@/store/order';
import {
  fetchActiveOrder,
  fetchCompletedOrder,
  fetchOrderRestaurant,
  setOrderAddress,
} from '@/store/order/thunk';
import {Colors, fonts} from '@/themes';
import {Button, Divider} from 'native-base';
import React, {useCallback, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import {SheetManager} from 'react-native-actions-sheet';
import {useDispatch, useSelector} from 'react-redux';
import NoOrder from '../NoOrder';
import OrdersItem from '../OrderItem';
import {IOrder, IOrderItem} from '@/api/generic';
import {useNavigation} from '@react-navigation/native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {captureErrorException} from '@/utils/error-handler';
import {showWarningMessage} from '@/components/DishFlashMessage';
import OrderService from '@/api/order';
import {isEmpty, size} from 'lodash';

const FAKE_DATA: any[] = Array.from({
  length: 10,
});

const CompletedOrders: React.FC = () => {
  const completedOrders: IOrder[] = useSelector(
    orderSelectors.selectCompletedOrder,
  );
  const isLoading = useSelector(orderSelectors.loadingSelectedOrder);
  const isLoadingOrders = useSelector(orderSelectors.loadingOrders);
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<any>();
  const [refresher, serRefresher] = useState(false);
  const [activeOrder, setActiveOrder] = useState<IOrder | any>(null);
  const [showLoading, setIsLoading] = useState(false);

  const onRefresh = useCallback(async () => {
    serRefresher(true);
    await dispatch(fetchCompletedOrder());
    serRefresher(false);
  }, [dispatch]);

  const onSelectOrder = async (item: IOrder) => {
    navigation.navigate('OrderSummary', {
      order: item,
      orderId: item.id,
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

  const renderLoadingItems = ({item, index}) => {
    return (
      <SkeletonPlaceholder key={index}>
        <SkeletonPlaceholder.Item
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          paddingHorizontal={11}
          height={110}>
          <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
            <SkeletonPlaceholder.Item width={80} height={80} borderRadius={4} />
            <SkeletonPlaceholder.Item marginLeft={18}>
              <SkeletonPlaceholder.Item
                width={73}
                height={20}
                borderRadius={4}
              />
              <SkeletonPlaceholder.Item
                marginTop={4}
                width={100}
                height={16}
                borderRadius={4}
              />
              <SkeletonPlaceholder.Item
                marginTop={4}
                width={81}
                height={16}
                borderRadius={4}
              />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item width={38} height={20} borderRadius={4} />
            <SkeletonPlaceholder.Item
              marginTop={6}
              width={50}
              height={16}
              borderRadius={4}
            />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    );
  };

  const renderCompletedOrders = ({
    item,
    index,
  }: {
    item: IOrder;
    index: number;
  }) => {
    return (
      <DynamicPressable onPress={() => onSelectOrder(item)} key={index}>
        <DynamicView
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between">
          {showLoading && item.id === activeOrder?.id && (
            <ActivityIndicator
              style={StyleSheet.absoluteFill}
              size="large"
              color={Colors.red}
            />
          )}
          <OrdersItem
            order={item}
            restaurant={item.restaurant}
            showReview
            onPressReview={() => onReviewOrder(item)}
          />
          <DynamicView marginRight={11} marginTop={-45}>
            <DynamicText
              fontSize={15}
              fontFamily={fonts.DMSans700Bold}
              lineHeight={19.53}
              color={Colors.black}>
              £{Number(item.total).toFixed(2)}
            </DynamicText>
            <DynamicView
              alignItems="flex-end"
              position="absolute"
              top={14}
              right={-10}
              width={203}>
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
          </DynamicView>
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
    <>
      {isLoadingOrders && <DishSpinner />}
      <FlatList
        style={{backgroundColor: Colors.white}}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 25,
        }}
        data={!refresher && isLoadingOrders ? FAKE_DATA : completedOrders}
        renderItem={
          !refresher && isLoadingOrders
            ? renderLoadingItems
            : renderCompletedOrders
        }
        refreshControl={
          <RefreshControl refreshing={refresher} onRefresh={onRefresh} />
        }
        ItemSeparatorComponent={() => (
          <Divider bgColor={Colors.lightGrey} width={354} alignSelf="center" />
        )}
        ListEmptyComponent={() => <NoOrder showImage />}
      />
    </>
  );
};

export default React.memo(CompletedOrders);
