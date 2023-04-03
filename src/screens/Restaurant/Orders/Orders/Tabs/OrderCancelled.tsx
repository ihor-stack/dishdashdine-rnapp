import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {IAdminOrders, IAdminRestaurant} from '@/api/admin_restaurant/model';
import {DynamicView} from '@/components';
import OrdersLists from '@/screens/Restaurant/Orders/Orders/OrdersLists';
import DishSpinner from '@/components/DishSpinner';
import {getAllRestaurantCancelledOrders} from '@/store/admin_restaurant/restaurant/thunk';
import {isEmpty} from 'lodash';
import {adminRestaurantSelectors} from '@/store/admin_restaurant/restaurant';

export interface OrderActiveProps {
  searchText: string;
  restaurantId: string;
}

const OrderCancelled: React.FC<OrderActiveProps> = ({
  searchText,
  restaurantId,
}) => {
  const dispatch = useDispatch<any>();
  const [cancelOrders, setCancelOrders] = useState<IAdminOrders[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const restaurant: IAdminRestaurant = useSelector(
    adminRestaurantSelectors.selectRestaurant,
  );
  const isLoading = useSelector(
    adminRestaurantSelectors.loadingCancelledOrders,
  );

  useEffect(() => {
    if (!isEmpty(restaurant)) {
      setCancelOrders(restaurant?.cancelledOrders);
    } else {
      setCancelOrders([]);
    }
  }, [restaurant, restaurantId]);

  useEffect(() => {
    let params: any = {
      RestaurantId: restaurantId,
    };

    if (!isEmpty(searchText)) {
      params.SearchQuery = searchText;
    }

    dispatch(getAllRestaurantCancelledOrders(params));
  }, [searchText, restaurantId, dispatch]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    let params: any = {
      RestaurantId: restaurantId,
    };

    if (!isEmpty(searchText)) {
      params.SearchQuery = searchText;
    }

    await dispatch(getAllRestaurantCancelledOrders(params));
    setRefreshing(false);
  }, [dispatch, restaurantId, searchText]);

  return (
    <DynamicView flex={1}>
      {isLoading && !refreshing && <DishSpinner />}
      <OrdersLists
        emptyTitle="No cancelled orders found!"
        listData={cancelOrders}
        onRefresh={onRefresh}
        isLoading={isLoading}
        refreshing={refreshing}
      />
    </DynamicView>
  );
};

export default React.memo(OrderCancelled);
