import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {IAdminOrders, IAdminRestaurant} from '@/api/admin_restaurant/model';
import {DynamicView} from '@/components';
import OrdersLists from '@/screens/Restaurant/Orders/Orders/OrdersLists';
import DishSpinner from '@/components/DishSpinner';
import {adminRestaurantSelectors} from '@/store/admin_restaurant/restaurant';
import {isEmpty} from 'lodash';
import {getAllRestaurantCompletedOrders} from '@/store/admin_restaurant/restaurant/thunk';

export interface OrderActiveProps {
  searchText: string;
  restaurantId: string;
}

const OrderCompleted: React.FC<OrderActiveProps> = ({
  searchText,
  restaurantId,
}) => {
  const dispatch = useDispatch<any>();
  const [refreshing, setRefreshing] = useState(false);
  const [allOrders, setAllOrders] = useState<IAdminOrders[]>([]);
  const restaurant: IAdminRestaurant = useSelector(
    adminRestaurantSelectors.selectRestaurant,
  );
  const isLoading = useSelector(
    adminRestaurantSelectors.loadingCompletedOrders,
  );

  useEffect(() => {
    if (!isEmpty(restaurant)) {
      setAllOrders(restaurant?.completedOrders);
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

    dispatch(getAllRestaurantCompletedOrders(params));
  }, [searchText, restaurantId, dispatch]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);

    let params: any = {
      RestaurantId: restaurantId,
    };

    if (!isEmpty(searchText)) {
      params.SearchQuery = searchText;
    }

    await dispatch(getAllRestaurantCompletedOrders(params));
    setRefreshing(false);
  }, [dispatch, restaurantId, searchText]);

  return (
    <DynamicView flex={1}>
      {isLoading && !refreshing && <DishSpinner />}
      <OrdersLists
        emptyTitle="No completed orders found!"
        listData={allOrders}
        onRefresh={onRefresh}
        isLoading={isLoading}
        refreshing={refreshing}
      />
    </DynamicView>
  );
};

export default React.memo(OrderCompleted);
