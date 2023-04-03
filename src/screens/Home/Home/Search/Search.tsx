import React, {useEffect, useState} from 'react';
import {Box, Divider, Icon, Input} from 'native-base';
import {useNavigation, useRoute} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import {SafeAreaViewContainer} from '@/components';
import {Colors} from '@/themes';
import {useDebounce} from '@/hooks/useDebounce';
import {useDispatch, useSelector} from 'react-redux';
import {
  clearRecentSearch,
  clearSearchResult,
  searchSelectors,
  setRecentSearch,
} from '@/store/search';
import {fetchSearchResult} from '@/store/search/thunk';
import DishSpinner from '@/components/DishSpinner';
import SearchRecentView from '@/screens/Home/Home/Search/SearchRecentView';
import SearchHeader from '@/screens/Home/Home/Search/SearchHeader';
import SearchResultLabel from '@/screens/Home/Home/Search/SearchResultLabel';
import {IAddress, IRestaurant} from '@/api/generic';
import {isEmpty} from 'lodash';
import SearchResultItem from '@/screens/Home/Home/Search/SearchResultItem';
import {FlatList} from 'react-native';
import {setSelectedRestaurant} from '@/store/restaurants';
import {DEFAULT_DISTANCE} from '@/constants';
import {accountSelectors} from '@/store/account';
import {homeSelectors} from '@/store/home';
import {addressSelectors} from '@/store/address';

const Search = () => {
  const navigation = useNavigation();
  const route: any = useRoute().params as any;
  const [searchText, setSearchText] = useState('' || route?.searchText);
  const [searchAction, setSearchAction] = useState('' || route?.searchAction);
  const [searchData, setSearchData] = useState('' || route?.data);

  const dispatch = useDispatch<any>();
  const showLoadingSearch = useSelector(searchSelectors.showLoadingSearch);
  const SearchResults: IRestaurant[] = useSelector(
    searchSelectors.selectSearchResult,
  ) as any;
  const currentLocation = useSelector(
    accountSelectors.selectCurrentUserLocation,
  );
  const currentDistance = useSelector(accountSelectors.selectCurrentUserRadius);
  const homeOrderType = useSelector(homeSelectors.showOrderType);
  const defaultAddress = useSelector(
    addressSelectors.selectDefaultAddress,
  ) as IAddress;

  const resultLabel = 'Results found for';

  useEffect(
    () =>
      navigation.addListener('beforeRemove', e => {
        // Prevent default behavior of leaving the screen
        dispatch(clearSearchResult());
        navigation.dispatch(e.data.action);
      }),
    [dispatch, navigation],
  );

  const saveRecentSearch = async () => {
    const params = {
      Latitude: currentLocation?.latitude,
      Longitude: currentLocation?.longitude,
      RadiusMiles: currentDistance || DEFAULT_DISTANCE,
      OrderType: homeOrderType,
    };

    if (searchText) {
      if (searchAction === 'query') {
        await dispatch(
          fetchSearchResult({
            ...params,
            SearchQuery: searchText,
          }),
        ).unwrap();
        await dispatch(setRecentSearch(searchText));
      } else if (searchAction === 'taxonomy') {
        await dispatch(
          fetchSearchResult({
            ...params,
            AssignedTaxonomy: String(searchData?.taxonomyId),
          }),
        ).unwrap();
      } else {
        await dispatch(
          fetchSearchResult({
            ...params,
            SearchQuery: searchText,
          }),
        ).unwrap();
        await dispatch(setRecentSearch(searchText));
      }
    } else {
      setSearchText('');
      dispatch(clearSearchResult());
    }
  };

  useDebounce(saveRecentSearch, 600, [searchText]);

  const onClearAll = () => {
    dispatch(clearRecentSearch());
  };

  const onSearchRecent = async (value: string) => {
    setSearchAction('query');
    setSearchText(value);
  };

  return (
    <SafeAreaViewContainer>
      {showLoadingSearch && <DishSpinner />}
      <SearchHeader />
      <Box flex={1} p={2}>
        <Input
          borderWidth={0}
          bgColor={Colors.lightestGrey}
          fontSize="sm"
          onChangeText={setSearchText}
          value={searchText}
          InputLeftElement={
            <Icon
              as={<Feather name="search" />}
              marginLeft={2}
              color={Colors.grey}
            />
          }
          py={4}
          placeholder="Restaurants, catering, pub grub, etc..."
        />
        {isEmpty(searchText) && (
          <SearchRecentView
            onPressRecentSearch={onSearchRecent}
            onClear={onClearAll}
          />
        )}
        {!showLoadingSearch && !isEmpty(searchText) && (
          <SearchResultLabel
            SearchResults={SearchResults}
            resultLabel={resultLabel}
            searchText={searchText}
          />
        )}
        <FlatList
          style={{
            marginTop: 22,
          }}
          contentContainerStyle={{flexGrow: 1}}
          data={SearchResults}
          renderItem={({item, index}) => (
            <Box key={`${index}`}>
              <SearchResultItem
                item={item}
                onPressRestaurant={async () => {
                  await dispatch(setSelectedRestaurant(item));
                  navigation.navigate('DishInfo', {id: item?.restaurantId});
                }}
              />
            </Box>
          )}
          ItemSeparatorComponent={() => <Divider bgColor={Colors.lightGrey} />}
        />
      </Box>
    </SafeAreaViewContainer>
  );
};

export default Search;
