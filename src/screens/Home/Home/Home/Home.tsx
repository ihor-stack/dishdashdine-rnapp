import React, {useCallback, useState, useEffect} from 'react';
import {Box, Text, useToast, VStack} from 'native-base';
import {DynamicView, SafeAreaViewContainer} from '@/components';
import Colors from '@/themes/colors';
import Cards from './Cards';
import Header from './Header';
import SearchAndSortFilters from './SearchAndSortFilters';
import {FlatList, RefreshControl, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {restaurantSelectors} from '@/store/restaurants';
import {accountSelectors} from '@/store/account';
import {DEFAULT_DISTANCE} from '@/constants';
import {fetchMyFavorites, fetchRestaurant} from '@/store/restaurants/thunk';
import {isEmpty, rest, size} from 'lodash';
import NoRestaurants from './NoRestaurants';
import {RestaurantsLoading} from '../Home/Orders/Restaurants/RestaurantsLoading';
import {Restaurants} from '../Home/Orders/Restaurants';
import {useNavigation} from '@react-navigation/core';
import {fetchTaxonomy} from '@/store/taxonomy/thunk';
import {fetchActiveOrder, fetchCompletedOrder} from '@/store/order/thunk';
import {fetchAddress, getDefaultAddress} from '@/store/address/thunk';
import AddressFilter from '@/screens/Home/AddressFilter';
import DistanceFilter from '@/screens/Home/DistanceFilter';
import SortAndFilter from '@/screens/Home/SortAndFilter';
import {homeSelectors} from '@/store/home';
import {IAddress} from '@/api/generic';
import {IUser} from '@/api/user';
import {addressSelectors} from '@/store/address';
import {fetchAppPromo} from '@/store/home/thunk';
import {fetchMyReviews} from '@/store/my-reviews/thunk';

const FAKE_DATA: any[] = Array.from({
  length: 10,
});

const Home = () => {
  const dispatch = useDispatch<any>();
  const toast = useToast();
  const navigation = useNavigation<any>();

  const [refreshing, setRefreshing] = useState(false);
  const restaurants: any[] = useSelector(restaurantSelectors.selectRestaurants);

  const currentLocation = useSelector(
    accountSelectors.selectCurrentUserLocation,
  );
  const currentDistance = useSelector(accountSelectors.selectCurrentUserRadius);
  const isLoading: boolean = useSelector(
    restaurantSelectors.showLoadingRestaurant,
  );
  const homeOrderType: number | null = useSelector(homeSelectors.showOrderType);
  const currentUser = useSelector(accountSelectors.selectCurrentUser) as IUser;
  const defaultAddress = useSelector(
    addressSelectors.selectDefaultAddress,
  ) as IAddress;

  const appPromo: any[] = useSelector(homeSelectors.selectAppPromo);

  useEffect(() => {
    if (!refreshing) {
      getData(currentLocation);
    }
  }, [currentLocation, homeOrderType]);

  const onRefresh = useCallback(async () => {
    await getData(currentLocation);
  }, [currentLocation, currentDistance, dispatch, currentUser, homeOrderType]);

  const onPullToRefresh = useCallback(async () => {
    await getDataRefresh(currentLocation);
  }, [currentLocation, currentDistance, dispatch, currentUser, homeOrderType]);

  /**
   * Get restaurant data for the current locations
   */
  const getData = async (currentLocationProps: any) => {
    if (currentLocationProps) {
      await dispatch(
        fetchRestaurant({
          Latitude: currentLocationProps.latitude,
          Longitude: currentLocationProps.longitude,
          RadiusMiles: currentDistance || DEFAULT_DISTANCE,
          OrderType: homeOrderType,
          // IncludeOpenOnly: true,
          IncludeOrderRestaurants: homeOrderType === 0 ? true : null,
          IncludeCateringRestaurants: homeOrderType === null ? true : null,
          LocationQuery: homeOrderType === 0 || homeOrderType === 1 ? true : null,
        }),
      );
    }

    if (!currentUser?.noAuth) {
      await dispatch(fetchMyFavorites());
      await dispatch(fetchAppPromo());

      await dispatch(fetchAddress());
      await dispatch(getDefaultAddress());

      await dispatch(fetchTaxonomy());
      await dispatch(fetchMyReviews());

      if (currentUser?.emailConfirmed) {
        await dispatch(fetchActiveOrder());
        await dispatch(fetchCompletedOrder());
      }
    }
  };

  const getDataRefresh = async (currentLocationProps: any) => {
    setRefreshing(true);
    try {
      await dispatch(
        fetchRestaurant({
          Latitude: currentLocationProps.latitude,
          Longitude: currentLocationProps.longitude,
          RadiusMiles: currentDistance || DEFAULT_DISTANCE,
          OrderType: homeOrderType,
          // IncludeOpenOnly: true,
          IncludeOrderRestaurants: homeOrderType === 0 ? true : null,
          IncludeCateringRestaurants: homeOrderType === null ? true : null,
          LocationQuery:
            homeOrderType === 0 || homeOrderType === 1 ? true : null,
        }),
      );

      if (!currentUser?.noAuth) {
        await dispatch(fetchMyFavorites());
        await dispatch(fetchAppPromo());

        await dispatch(fetchAddress());
        await dispatch(getDefaultAddress());

        await dispatch(fetchTaxonomy());
        await dispatch(fetchMyReviews());

        if (currentUser?.emailConfirmed) {
          await Promise.allSettled([
            dispatch(fetchActiveOrder()),
            dispatch(fetchCompletedOrder()),
          ]);
        }
      }

      setRefreshing(false);
    } catch (e) {
      setRefreshing(false);
    }
  };

  const ListHeaderComponent = () => (
    <VStack bgColor={Colors.lightGrey} space={3}>
      <Box bgColor={Colors.white} pb={!isEmpty(appPromo) ? 5 : 0}>
        <SearchAndSortFilters />
        {!isEmpty(appPromo) ? <Cards /> : null}
      </Box>

      <Box bgColor={Colors.white}>
        <DynamicView marginHorizontal={14} marginBottom={15}>
          {size(restaurants) > 0 && (
            <Text
              pt={3}
              fontFamily="body"
              fontSize={20}
              fontWeight={700}
              marginBottom={2}>
              {size(restaurants)}{' '}
              {homeOrderType != 2 ? 'open restaurant' : 'offering catering'}
              {size(restaurants) > 1 && homeOrderType != 2 ? 's' : null}
            </Text>
          )}
        </DynamicView>
      </Box>
    </VStack>
  );

  // @ts-ignore
  const renderLoadingItem = ({_, index}) => {
    return RestaurantsLoading(index);
  };

  // @ts-ignore
  const renderItem = ({item, index}) => {
    return Restaurants({
      restaurant: item,
      index,
      toast,
      dispatch,
      navigation,
      currentLocation,
      currentDistance,
      homeOrderType,
      defaultAddress,
      onRefresh,
    });
  };

  const renderFlatList = () => {
    if (isLoading && refreshing) {
      // @ts-ignore
      return (
        <FlatList
          style={styles.FlatList}
          contentContainerStyle={styles.FlatListContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onPullToRefresh} />
          }
          data={FAKE_DATA}
          ListHeaderComponent={ListHeaderComponent}
          renderItem={renderLoadingItem}
          ListEmptyComponent={() => <NoRestaurants />}
        />
      );
    } else {
      return (
        <FlatList
          style={styles.FlatList}
          contentContainerStyle={styles.FlatListContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onPullToRefresh} />
          }
          data={restaurants}
          ListHeaderComponent={ListHeaderComponent}
          renderItem={renderItem}
          ListEmptyComponent={() => <NoRestaurants />}
        />
      );
    }
  };

  return (
    <>
      <SafeAreaViewContainer>
        <DynamicView flex={1} backgroundColor="#fff">
          <Header />
          {renderFlatList()}
        </DynamicView>
      </SafeAreaViewContainer>
      <AddressFilter />
      <DistanceFilter />
      <SortAndFilter />
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  FlatList: {
    backgroundColor: Colors.lightGrey,
  },
  FlatListContainer: {
    marginBottom: 15,
    backgroundColor: Colors.white,
  },
});
