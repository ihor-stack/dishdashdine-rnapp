import React, {useCallback, useState, useEffect} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Box, Divider, HStack, Icon, Input, Text} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import {
  DynamicPressable,
  DynamicText,
  DynamicView,
  SafeAreaViewContainer,
} from '@/components';
import {Colors, fonts} from '@/themes';
import SearchResultItem from './SearchResultItem';
import {HomeStackParamList} from '@/navigation/types';
import {IRestaurant} from '@/api/generic';
import {
  clearSearchResult,
  searchSelectors,
  setRecentSearch,
} from '@/store/search';
import {useDispatch, useSelector} from 'react-redux';
import {fetchSearchResult} from '@/store/search/thunk';
import {useDebounce} from '@/hooks/useDebounce';
import {FlatList} from 'react-native';
import DishSpinner from '@/components/DishSpinner';
import {setSelectedRestaurant} from '@/store/restaurants';
import {accountSelectors} from '@/store/account';
import {DEFAULT_DISTANCE} from '@/constants';

const SearchResult = () => {
  const route: any = useRoute().params as any;
  const dispatch = useDispatch<any>();
  const searchText = route?.searchText;
  const searchAction = route?.searchAction;
  const searchData = route?.data;

  const [isSearching, setIsSearching] = useState(true);
  const [search, setSearch] = useState(searchText);
  const navigation = useNavigation<any>();
  const SearchResults: IRestaurant[] = useSelector(
    searchSelectors.selectSearchResult,
  ) as any;
  const showLoadingSearch = useSelector(searchSelectors.showLoadingSearch);
  const currentLocation = useSelector(
    accountSelectors.selectCurrentUserLocation,
  );
  const currentDistance = useSelector(accountSelectors.selectCurrentUserRadius);

  const resultLabel = 'Results found for';

  useEffect(
    () =>
      navigation.addListener('beforeRemove', e => {
        // Prevent default behavior of leaving the screen
        dispatch(clearSearchResult());
        navigation.dispatch(e.data.action);
      }),
    [navigation],
  );

  const saveRecentSearch = async () => {
    setIsSearching(true);
    if (search) {
      if (searchAction === 'query') {
        await dispatch(setRecentSearch(search));
        await dispatch(
          fetchSearchResult({
            SearchQuery: search,
            Latitude: currentLocation?.latitude,
            Longitude: currentLocation?.longitude,
            RadiusMiles: currentDistance || DEFAULT_DISTANCE,
          }),
        ).unwrap();
        setIsSearching(false);
      } else if (searchAction === 'taxonomy') {
        await dispatch(
          fetchSearchResult({
            AssignedTaxonomy: String(searchData?.taxonomyId),
            Latitude: currentLocation?.latitude,
            Longitude: currentLocation?.longitude,
            RadiusMiles: currentDistance || DEFAULT_DISTANCE,
          }),
        ).unwrap();
        setIsSearching(false);
      }
    }
  };

  useDebounce(saveRecentSearch, 600, [search]);

  const onBackPress = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaViewContainer>
      {showLoadingSearch && <DishSpinner />}
      <DynamicView
        alignItems="center"
        justifyContent="center"
        borderBottomWidth={1}
        paddingVertical={20}
        backgroundColor="#fff"
        borderBottomColor="#F2F4F5">
        <DynamicText
          fontFamily={fonts.DMSans500Medium}
          fontWeight="500"
          color="#303030"
          fontSize={24}
          lineHeight={31}>
          Search Results
        </DynamicText>
        <DynamicPressable onPress={onBackPress} position="absolute" left={18}>
          <AntDesign size={24} name="arrowleft" color="#303030" />
        </DynamicPressable>
      </DynamicView>
      <Box flex={1} p={2}>
        <Input
          borderWidth={0}
          bgColor={Colors.lightestGrey}
          fontSize="sm"
          value={search}
          onChangeText={setSearch}
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
        <HStack pt={5}>
          {!showLoadingSearch && (
            <Text fontSize="lg" bold>
              {`${
                SearchResults.length < 1 ? `No` : `${SearchResults.length}`
              } ${resultLabel} ${search}`}
            </Text>
          )}
        </HStack>
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
                  navigation.navigate('DishInfo', {id: item.restaurantId});
                }}
              />
            </Box>
          )}
          ItemSeparatorComponent={() => (
            <Divider bgColor={Colors.lightGrey} paddingBottom={20} />
          )}
        />
      </Box>
    </SafeAreaViewContainer>
  );
};

export default SearchResult;
