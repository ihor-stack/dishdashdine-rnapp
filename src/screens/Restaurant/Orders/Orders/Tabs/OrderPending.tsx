import React, {useCallback, useEffect, useState} from 'react';
import OrdersLists from '../OrdersLists';
import {DynamicView} from '@/components';
import {useDispatch, useSelector} from 'react-redux';
import {IAdminOrders, IAdminRestaurant} from '@/api/admin_restaurant/model';
import DishSpinner from '@/components/DishSpinner';
import {isEmpty} from 'lodash';
import {adminRestaurantSelectors} from '@/store/admin_restaurant/restaurant';
import {getAllRestaurantPendingOrders} from '@/store/admin_restaurant/restaurant/thunk';

export interface OrderPendingProps {
  searchText: string;
  restaurantId: string;
}

const OrderPending: React.FC<OrderPendingProps> = ({
  searchText,
  restaurantId,
}) => {
  const dispatch = useDispatch<any>();
  const [refreshing, setRefreshing] = useState(false);
  const [allOrders, setAllOrders] = useState<IAdminOrders[]>([]);
  const restaurant: IAdminRestaurant = useSelector(
    adminRestaurantSelectors.selectRestaurant,
  );
  const isLoading = useSelector(adminRestaurantSelectors.loadingPendingOrders);

  useEffect(() => {
    if (!isEmpty(restaurant)) {
      setAllOrders(restaurant?.pendingOrders);
    } else {
      setAllOrders([]);
    }
  }, [restaurant, restaurantId, searchText]);

  useEffect(() => {
    let params: any = {
      RestaurantId: restaurantId,
    };

    if (!isEmpty(searchText)) {
      params.SearchQuery = searchText;
    }

    dispatch(getAllRestaurantPendingOrders(params));
  }, [searchText, restaurantId, dispatch]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    let params: any = {
      RestaurantId: restaurantId,
    };

    if (searchText) {
      params.SearchQuery = searchText;
    }

    await dispatch(getAllRestaurantPendingOrders(params));

    setRefreshing(false);
  }, [dispatch, restaurantId, searchText]);

  return (
    <DynamicView flex={1}>
      {isLoading && !refreshing && <DishSpinner />}
      <OrdersLists
        emptyTitle="No pending orders found!"
        listData={allOrders}
        onRefresh={onRefresh}
        isLoading={isLoading}
        refreshing={refreshing}
      />
    </DynamicView>
  );
};

export default React.memo(OrderPending);
