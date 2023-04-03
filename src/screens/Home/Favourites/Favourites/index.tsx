import React, {useCallback, useState} from 'react';
import {Box, useToast} from 'native-base';
import {Colors} from '@/themes';
import FavoriteItem from '../favorite-item';
import {useDispatch, useSelector} from 'react-redux';
import {restaurantSelectors} from '@/store/restaurants';
import {accountSelectors} from '@/store/account';
import NoFavorite from '../NoFavorite';
import {FlatList, RefreshControl} from 'react-native';
import {fetchMyFavorites} from '@/store/restaurants/thunk';

const Favourites = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const favorites = useSelector(restaurantSelectors.selectMyFavorites);
  const currentLocation = useSelector(
    accountSelectors.selectCurrentUserLocation,
  );
  const currentDistance = useSelector(accountSelectors.selectCurrentUserRadius);
  const [refresher, serRefresher] = useState(false);

  const onRefresh = useCallback(async () => {
    serRefresher(true);
    await dispatch(fetchMyFavorites());
    serRefresher(false);
  }, [dispatch]);

  const renderItem = ({item, index}) => {
    return (
      <FavoriteItem
        key={`${index}-${item.restaurantId}`}
        item={item}
        toast={toast}
        dispatch={dispatch}
        currentLocation={currentLocation}
        currentDistance={currentDistance}
      />
    );
  };

  return (
    <Box flex={1} bgColor={Colors.white} p={2}>
      <FlatList
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 25,
        }}
        refreshControl={
          <RefreshControl refreshing={refresher} onRefresh={onRefresh} />
        }
        data={favorites}
        renderItem={renderItem}
        keyExtractor={item => item.restaurantId}
        ListEmptyComponent={() => <NoFavorite />}
      />
    </Box>
  );
};

export default Favourites;
