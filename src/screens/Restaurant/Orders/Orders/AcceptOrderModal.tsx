import {DynamicView} from '@/components';
import DishButton from '@/components/DishButton';
import DishToast from '@/components/DishToast';
import {useToast} from 'native-base';
import React, {useState} from 'react';
import ActionSheet, {
  SheetManager,
  SheetProps,
} from 'react-native-actions-sheet';
import OrderDetails from './OrderDetails';
import {IAdminOrders, IAdminRestaurant} from '@/api/admin_restaurant/model';
import {StyleSheet} from 'react-native';
import OrderAdminService from '@/api/admin_restaurant/order';
import {captureErrorException} from '@/utils/error-handler';
import DishSpinner from '@/components/DishSpinner';
import {isEmpty} from 'lodash';
import {useDispatch, useSelector} from 'react-redux';
import {
  getAllRestaurantActiveOrders,
  getAllRestaurantCancelledOrders,
  getAllRestaurantCompletedOrders,
  getAllRestaurantOrders,
  getAllRestaurantPendingOrders,
} from '@/store/admin_restaurant/restaurant/thunk';
import {adminRestaurantSelectors} from '@/store/admin_restaurant/restaurant';
import {showSuccessMessage} from '@/components/DishFlashMessage';

export interface AcceptOrderViewProps extends SheetProps {}

const AcceptOrderViewModal = (props: AcceptOrderViewProps) => {
  const [selectedOrder, setSelectedOrder] = useState<IAdminOrders>({});
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const restaurant = useSelector(
    adminRestaurantSelectors.selectRestaurant,
  ) as IAdminRestaurant;

  const fetchAdminRestaurantOrders = async () => {
    await Promise.allSettled([
      dispatch(
        getAllRestaurantOrders({
          RestaurantId: restaurant.restaurantId,
        }),
      ),
      dispatch(
        getAllRestaurantPendingOrders({
          RestaurantId: restaurant.restaurantId,
        }),
      ),
      dispatch(
        getAllRestaurantActiveOrders({
          RestaurantId: restaurant.restaurantId,
        }),
      ),
      dispatch(
        getAllRestaurantCompletedOrders({
          RestaurantId: restaurant.restaurantId,
        }),
      ),
      dispatch(
        getAllRestaurantCancelledOrders({
          RestaurantId: restaurant.restaurantId,
        }),
      ),
    ]);
  };

  const onAcceptOrder = async () => {
    if (isEmpty(selectedOrder)) {
      return;
    }

    try {
      setIsLoading(true);
      const response = await OrderAdminService.acceptOrder(selectedOrder.id);
      setIsLoading(false);
      if (response) {
        fetchAdminRestaurantOrders();
        SheetManager.hide('AcceptOrderModal');
        toast.show({
          placement: 'top',
          duration: 2500,
          render: () => {
            return showSuccessMessage(
              'Order Accepted',
              'Order has been accepted',
            );
          },
        });
      }
    } catch (error) {
      setIsLoading(false);
      captureErrorException(error);
    }
  };

  const onCancelOrder = async () => {
    if (isEmpty(selectedOrder)) {
      return;
    }

    try {
      setIsLoading(true);
      const response = await OrderAdminService.cancelOrder(selectedOrder.id);
      setIsLoading(false);
      if (response) {
        fetchAdminRestaurantOrders();
        SheetManager.hide('AcceptOrderModal');
        toast.show({
          placement: 'top',
          duration: 2500,
          render: () => {
            return showSuccessMessage(
              'Order Canceled',
              'Order has been canceled',
            );
          },
        });
      }
    } catch (error) {
      setIsLoading(false);
      captureErrorException(error);
    }
  };

  const onReadyForCollection = async () => {
    if (isEmpty(selectedOrder)) {
      return;
    }

    try {
      setIsLoading(true);
      const response = await OrderAdminService.readyForCollection(
        selectedOrder.id,
      );
      setIsLoading(false);
      if (response) {
        fetchAdminRestaurantOrders();
        SheetManager.hide('AcceptOrderModal');
        toast.show({
          placement: 'top',
          duration: 2500,
          render: () => {
            return showSuccessMessage(
              'Ready for collection',
              'Order has been marked as ready for collection',
              );
            },
          });
      }
    } catch (error) {
      setIsLoading(false);
      captureErrorException(error);
    }
  };

  const onOutForDelivery = async () => {
    if (isEmpty(selectedOrder)) {
      return;
    }

    try {
      setIsLoading(true);
      const response = await OrderAdminService.outForDelivery(selectedOrder.id);
      setIsLoading(false);
      if (response) {
        fetchAdminRestaurantOrders();
        SheetManager.hide('AcceptOrderModal');
        toast.show({
          placement: 'top',
          duration: 2500,
          render: () => {
            return showSuccessMessage(
              'Out for Delivery',
              'Order has been marked as out for delivery',
            );
          },
        });
      }
    } catch (error) {
      setIsLoading(false);
      captureErrorException(error);
    }
  };

  const onOrderCompleted = async () => {
    if (isEmpty(selectedOrder)) {
      return;
    }

    try {
      setIsLoading(true);
      const response = await OrderAdminService.orderCompleted(selectedOrder.id);
      setIsLoading(false);
      if (response) {
        fetchAdminRestaurantOrders();
        SheetManager.hide('AcceptOrderModal');
        toast.show({
          placement: 'top',
          duration: 2500,
          render: () => {
            return (
              showSuccessMessage('Order Completed', 'Order has been marked completed')
            );
          },
        });
      }
    } catch (error) {
      setIsLoading(false);
      captureErrorException(error);
    }
  };

  return (
    <ActionSheet
      id={'AcceptOrderModal' || props.sheetId}
      gestureEnabled
      containerStyle={styles.containerStyle}
      onBeforeShow={(data: any) => {
        setSelectedOrder(data?.order);
      }}>
      {isLoading && <DishSpinner />}
      <DynamicView marginHorizontal={12} paddingBottom={80}>
        <OrderDetails order={selectedOrder} />
      </DynamicView>
      <DynamicView paddingHorizontal={22}>
        {(selectedOrder.orderStatus === 0 ||
          selectedOrder.orderStatus === 1) && (
          <DishButton
            icon="arrowright"
            variant="success"
            label="Accept Order"
            showSpinner={isLoading}
            onPress={onAcceptOrder}
          />
        )}
        {(selectedOrder.orderStatus === 2 ||
          selectedOrder.orderStatus === 3) && (
          <DishButton
            showIcon={false}
            label="Ready for Collection"
            variant="blue"
            onPress={onReadyForCollection}
          />
        )}
        {selectedOrder.orderStatus === 4 &&
          (selectedOrder.orderType === 1 ? (
            <DishButton
              showIcon={false}
              label="Out for Delivery"
              variant="success"
              onPress={onOutForDelivery}
            />
          ) : (
            <DishButton
              showIcon={false}
              label="Completed"
              variant="success"
              onPress={onOrderCompleted}
            />
          ))}
        {selectedOrder.orderStatus < 3 && (
          <DishButton
            showIcon={false}
            label="Decline Order"
            onPress={onCancelOrder}
          />
        )}
      </DynamicView>
    </ActionSheet>
  );
};

export default AcceptOrderViewModal;

const styles = StyleSheet.create({
  containerStyle: {
    marginTop: 15,
    paddingBottom: 80,
  },
});
