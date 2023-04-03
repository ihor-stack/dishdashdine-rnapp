import {adminRestaurantSelectors} from '@/store/admin_restaurant/restaurant';
import {fetchRestaurantDelivery} from '@/store/admin_restaurant/restaurant/thunk';
import {useRoute} from '@react-navigation/native';
import {filter, isEmpty, lowerCase} from 'lodash';
import React, {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

import {useDispatch} from 'react-redux';
import RestaurantDeliveryView from './View';

const RestaurantDelivery = () => {
  const dispatch = useDispatch<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState('');

  const [deliveries, setDeliveries] = useState<any[]>([]);
  const [deliveriesCopy, setDeliveriesCopy] = useState<any[]>([]);

  const params = useRoute().params as any;
  const selectedRestaurant = useSelector(
    adminRestaurantSelectors.selectRestaurant,
  );
  const restaurantId = params?.restaurantId || selectedRestaurant?.restaurantId;
  const deliveriesData = selectedRestaurant?.deliveries;

  useEffect(() => {
    setDeliveries(deliveriesData);
    setDeliveriesCopy(deliveriesData);
  }, [deliveriesData]);

  useEffect(() => {
    const init = async () => {
      await dispatch(fetchRestaurantDelivery(restaurantId));
    };

    init();
  }, [dispatch, restaurantId]);

  useEffect(() => {
    const newData = [...deliveriesCopy];
    if (!isEmpty(searchText)) {
      const filterValue = filter(newData, item => {
        return lowerCase(item.name).indexOf(lowerCase(searchText)) !== -1;
      });
      setDeliveries(filterValue);
    } else {
      setDeliveries(newData);
    }
  }, [deliveriesCopy, searchText]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await dispatch(fetchRestaurantDelivery(restaurantId));
    setRefreshing(false);
  }, [dispatch, restaurantId]);

  const getProps = () => {
    return {
      restaurantId,
      isLoading,
      refreshing,
      onRefresh,
      searchText,
      setSearchText,
      deliveries,
    };
  };

  return <RestaurantDeliveryView {...getProps()} />;
};

export default RestaurantDelivery;
