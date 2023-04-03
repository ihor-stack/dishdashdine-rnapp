import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {homeSelectors, setShowSortAndFilter} from '@/store/home';
import SortAndFilterView from './View';
import {fetchRestaurant} from '@/store/restaurants/thunk';
import {DEFAULT_DISTANCE} from '@/constants';
import {accountSelectors} from '@/store/account';

const SortAndFilter = () => {
  const [value, setValue] = useState('1');
  const [dietary, setDietary] = useState('');
  const [isVegan, setIsVegan] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(false);
  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const dispatch = useDispatch();
  const currentLocation = useSelector(
    accountSelectors.selectCurrentUserLocation,
  );
  const currentDistance = useSelector(accountSelectors.selectCurrentUserRadius);
  const showSortAndFilter = useSelector(homeSelectors.showSortAndFilter);
  const homeOrderType = useSelector(homeSelectors.showOrderType);

  const handleOnPressApply = async () => {
    dispatch(
      fetchRestaurant({
        Latitude: currentLocation?.latitude,
        Longitude: currentLocation?.longitude,
        RadiusMiles: currentDistance || DEFAULT_DISTANCE,
        OrderType: homeOrderType,
        // IncludeOpenOnly: true,
        Vegan: isVegan,
        Vegeterian: isVegetarian,
        GlutenFree: isGlutenFree,
        SortOption: Number(value),
      }),
    );
    dispatch(setShowSortAndFilter());
  };

  const getProps = () => {
    return {
      value,
      setValue,
      handleOnPressApply,
      isVegan,
      setIsVegan,
      isVegetarian,
      setIsVegetarian,
      isGlutenFree,
      setIsGlutenFree,
      dietary,
      setDietary,
      showSortAndFilter,
    };
  };

  return <SortAndFilterView {...getProps()} />;
};

export default SortAndFilter;
