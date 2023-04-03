import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {IAdminOrders, IAdminRestaurant} from '@/api/admin_restaurant/model';
import {DynamicView} from '@/components';
import OrdersLists from '@/screens/Restaurant/Orders/Orders/OrdersLists';
import DishSpinner from '@/components/DishSpinner';
import {adminRestaurantSelectors} from '@/store/admin_restaurant/restaurant';
import {isEmpty} from 'lodash';
import {getAllRestaurantActiveOrders} from '@/store/admin_restaurant/restaurant/thunk';

export interface OrderActiveProps {
  searchText: string;
  restaurantId: string;
}

const OrderActive: React.FC<OrderActiveProps> = ({
  searchText,
  restaurantId,
}) => {
  const dispatch = useDispatch<any>();
  const [activeOrders, setActiveOrders] = useState<IAdminOrders[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const restaurant: IAdminRestaurant = useSelector(
    adminRestaurantSelectors.selectRestaurant,
  );
  const isLoading = useSelector(adminRestaurantSelectors.loadingActiveOrders);

  useEffect(() => {
    if (!isEmpty(restaurant)) {
      setActiveOrders(restaurant?.activeOrders);
    } else {
      setActiveOrders([]);
    }
  }, [restaurant, restaurantId]);

  useEffect(() => {
    let params: any = {
      RestaurantId: restaurantId,
    };

    if (!isEmpty(searchText)) {
      params.SearchQuery = searchText;
    }

    dispatch(getAllRestaurantActiveOrders(params));
  }, [searchText, restaurantId, dispatch]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    let params: any = {
      RestaurantId: restaurantId,
    };

    if (!isEmpty(searchText)) {
      params.SearchQuery = searchText;
    }

    await dispatch(getAllRestaurantActiveOrders(params));
    setRefreshing(false);
  }, [dispatch, restaurantId, searchText]);

  return (
    <DynamicView flex={1}>
      {isLoading && !refreshing && <DishSpinner />}
      <OrdersLists
        emptyTitle="No active orders found!"
        listData={activeOrders}
        onRefresh={onRefresh}
        isLoading={isLoading}
        refreshing={refreshing}
      />
    </DynamicView>
  );
};

export default React.memo(OrderActive);
