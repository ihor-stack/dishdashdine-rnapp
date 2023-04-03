import {homeSelectors, setShowOrderFilter} from '@/store/home';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import FilterOrderView from './View';
import {getAllRestaurantOrders} from '@/store/admin_restaurant/restaurant/thunk';

const FilterOrder = () => {
  const [filterBy, setFilterBy] = useState<string>('-1');
  const [restaurantID, setRestaurantID] = useState<string>('');
  const showOrderFilter = useSelector(homeSelectors.showOrderFilter);
  const dispatch = useDispatch<any>();

  const handleOnPressApply = async () => {
    let params: any = {};

    if (Number(filterBy) !== -1) {
      params.OrderType = Number(filterBy);
    }

    if (restaurantID) {
      params.RestaurantId = restaurantID;
      await dispatch(
        getAllRestaurantOrders({
          RestaurantId: restaurantID,
        }),
      );
    }

    await dispatch(setShowOrderFilter());
  };

  const getProps = () => {
    return {
      filterBy,
      setFilterBy,
      handleOnPressApply,
      showOrderFilter,
      restaurantID,
      setRestaurantID,
    };
  };

  return <FilterOrderView {...getProps()} />;
};

export default FilterOrder;
