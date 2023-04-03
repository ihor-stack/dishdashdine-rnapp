import React, {useCallback, useEffect, useState} from 'react';
import OrdersLists from '../OrdersLists';
import {DynamicView} from '@/components';
import {IAdminOrders, IAdminRestaurant} from '@/api/admin_restaurant/model';
import {useDispatch, useSelector} from 'react-redux';
import {
  getAllRestaurantActiveOrders,
  getAllRestaurantCancelledOrders,
  getAllRestaurantCompletedOrders,
  getAllRestaurantOrders,
  getAllRestaurantPendingOrders,
} from '@/store/admin_restaurant/restaurant/thunk';
import {adminRestaurantSelectors} from '@/store/admin_restaurant/restaurant';
import {isEmpty} from 'lodash';

export interface OrderAllProps {
  searchText: string;
  restaurantId: string;
}

const OrderAll: React.FC<OrderAllProps> = ({searchText, restaurantId}) => {
  const dispatch = useDispatch<any>();
  const [allOrders, setAllOrders] = useState<IAdminOrders[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [showLoading, setShowLoading] = useState(true);
  const restaurant: IAdminRestaurant = useSelector(
    adminRestaurantSelectors.selectRestaurant,
  );
  const isLoading = useSelector(adminRestaurantSelectors.showLoadingOrders);

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        setShowLoading(false);
      }, 1000);
    } else {
      setShowLoading(true);
    }
  }, [isLoading]);

  useEffect(() => {
    if (!isEmpty(restaurant)) {
      setAllOrders(restaurant?.orders);
    } else {
      setAllOrders([]);
    }
  }, [restaurant, searchText]);

  useEffect(() => {
    let params: any = {
      RestaurantId: restaurantId,
    };

    if (!isEmpty(searchText)) {
      params.SearchQuery = searchText;
    }
    dispatch(getAllRestaurantOrders(params));
  }, [searchText, restaurantId, dispatch]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);

    let params: any = {
      RestaurantId: restaurantId,
    };

    if (!isEmpty(searchText)) {
      params.SearchQuery = searchText;
    }

    await dispatch(getAllRestaurantOrders(params));
    await Promise.allSettled([
      dispatch(getAllRestaurantPendingOrders(params)),
      dispatch(getAllRestaurantActiveOrders(params)),
      dispatch(getAllRestaurantCompletedOrders(params)),
      dispatch(getAllRestaurantCancelledOrders(params)),
    ]);

    setRefreshing(false);
  }, [dispatch, restaurantId, searchText]);

  return (
    <DynamicView flex={1}>
      {/*{isLoading && !refreshing && <DishSpinner />}*/}
      <OrdersLists
        listData={allOrders}
        onRefresh={onRefresh}
        isLoading={showLoading}
        refreshing={refreshing}
      />
    </DynamicView>
  );
};

export default React.memo(OrderAll);
