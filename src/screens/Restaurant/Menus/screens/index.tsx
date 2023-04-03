import {IAdminMenus, IAdminRestaurant} from '@/api/admin_restaurant/model';
import {DynamicPressable, DynamicText, DynamicView} from '@/components';
import DishButton from '@/components/DishButton';
import {useDispatch, useSelector} from 'react-redux';
import {adminRestaurantSelectors} from '@/store/admin_restaurant/restaurant';
import {Colors, fonts} from '@/themes';
import {useNavigation, useRoute} from '@react-navigation/native';
import {filter, isEmpty, lowerCase, rest} from 'lodash';
import {Divider} from 'native-base';

import { useIsFocused } from '@react-navigation/native';
import React, {useCallback, useEffect} from 'react';
import {RefreshControl, StyleSheet} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import EmptyAdminState from '../../EmptyAdminState';
import {useState} from 'react';
import DishRestaurantSearchBar from '@/components/DishRestaurantSearchBar';
import {fetchRestaurantMenus} from '@/store/admin_restaurant/restaurant/thunk';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export const FAKE_DATA = Array.from({
  length: 10,
});

const RestaurantMenus = () => {
  const {navigate} = useNavigation<any>();
  const dispatch = useDispatch<any>();
  const params = useRoute().params as any;

  const isFocused = useIsFocused();

  const restaurantId = params?.id;
  const restaurant: IAdminRestaurant = useSelector(
    adminRestaurantSelectors.selectRestaurant,
  );
  const isLoading: boolean = useSelector(
    adminRestaurantSelectors.showLoadingData,
  );
  const [menusData, setMenusData] = useState<IAdminMenus[]>([]);
  const [menusDataCopy, setMenusDataCopy] = useState<IAdminMenus[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [isInitialized, setInitilaized] = useState(false);


  const fetchAdminRestaurantMenus = useCallback(async () => {
    return await dispatch(fetchRestaurantMenus(restaurant.restaurantId));
  }, [restaurant, dispatch]);

  useEffect(() => {
    if (!isInitialized) {
      fetchAdminRestaurantMenus();
      setInitilaized(true)
    }
  }, []);

  useEffect(() => {
    if (isFocused && isInitialized) {
      fetchAdminRestaurantMenus();
    }
  },[isFocused]);

  useEffect(() => {
    if (!isEmpty(restaurant?.menus)) {
      setMenusData(restaurant?.menus || []);
      setMenusDataCopy(restaurant?.menus || []);
    }
  }, [restaurant, dispatch]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchAdminRestaurantMenus();
    setRefreshing(false);
  }, [restaurant, dispatch]);

  useEffect(() => {
    const newData = [...menusDataCopy];
    if (!isEmpty(searchText)) {
      const filterValue = filter(newData, item => {
        return lowerCase(item.name).indexOf(lowerCase(searchText)) !== -1;
      });
      setMenusData(filterValue);
    } else {
      setMenusData(newData);
    }
  }, [menusDataCopy, searchText]);

  const ListHeader = () => {
    return (
      !isEmpty(menusData) && (
        <DynamicPressable
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center">
          <DynamicText style={styles.flatlistHeader}>Name</DynamicText>
          <DynamicView alignItems="flex-start" flex={0.76}>
            <DynamicText style={styles.flatlistHeader}>Menus hours</DynamicText>
          </DynamicView>
        </DynamicPressable>
      )
    );
  };

  const renderItem = ({item, index}) => {
    return (
      <DynamicPressable
        key={index}
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        paddingVertical={23}
        onPress={() => {
          navigate('MenuCategories', {
            id: restaurant.restaurantId,
            menu: item,
          });
        }}>
        <DynamicView
          alignItems="flex-start"
          justifyContent="flex-start"
          flex={0.5}>
          <DynamicText
            style={{
              color: Colors.ember,
              ...styles.itemTextStyle,
            }}>
            {item.name}
          </DynamicText>
        </DynamicView>
        <DynamicView
          alignItems="flex-start"
          justifyContent="flex-start"
          flex={1}>
          <DynamicText
            style={{
              color: Colors.black,
              ...styles.itemTextStyle,
            }}>
            {item.displayMenuAvailability}
          </DynamicText>
        </DynamicView>
      </DynamicPressable>
    );
  };

  const renderLoadingItems = () => (
    <SkeletonPlaceholder>
      <SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item
          flexDirection="row"
          alignItems="center"
          justifyContent="flex-start"
          paddingVertical={12}>
          <SkeletonPlaceholder.Item
            marginTop={6}
            width={120}
            height={16}
            borderRadius={4}
          />
          <SkeletonPlaceholder.Item marginLeft={20}>
            <SkeletonPlaceholder.Item
              width={200}
              height={16}
              borderRadius={4}
            />
            <SkeletonPlaceholder.Item
              marginTop={6}
              width={100}
              height={10}
              borderRadius={4}
            />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );

  return (
    <DynamicView flex={1} backgroundColor={Colors.white}>
      <DynamicView backgroundColor={Colors.lightGrey}>
        <DishRestaurantSearchBar
          searchText={searchText}
          onSearchText={setSearchText}
          placeholder={'Search for a menu'}
        />
      </DynamicView>
      <FlatList
        data={isLoading ? FAKE_DATA : menusData}
        style={styles.Flatlist}
        contentContainerStyle={styles.container}
        renderItem={isLoading ? renderLoadingItems : renderItem}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ItemSeparatorComponent={() => {
          return <Divider bgColor={Colors.lightGrey} />;
        }}
        ListHeaderComponent={ListHeader}
        ListHeaderComponentStyle={styles.listHeaderComponentStyle}
        ListEmptyComponent={() => (
          <EmptyAdminState
            title="No Menus yet"
            message={'Hit the button down below to add a new menu'}
            showImage={true}
            messageStyle={{textAlign: 'center'}}
          />
        )}
      />
      <DynamicView marginBottom={21} marginHorizontal={21}>
        <DishButton
          icon="arrowright"
          label="Add New Menu"
          variant="primary"
          onPress={() => {
            navigate('MenuEntry', {restaurantId, action: 'add'});
          }}
        />
      </DynamicView>
    </DynamicView>
  );
};

export default RestaurantMenus;

const styles = StyleSheet.create({
  Flatlist: {
    backgroundColor: '#fff',
  },
  container: {
    flexGrow: 1,
    marginTop: 11,
    paddingHorizontal: 14,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    // borderBottomWidth: 1,
    // borderBottomColor: Colors.border,
  },
  listHeaderComponentStyle: {
    borderBottomColor: Colors.lightGrey,
    borderBottomWidth: 1,
    paddingVertical: 20,
  },
  itemTextStyle: {
    fontFamily: fonts.DMSans500Medium,
    fontSize: 14,
    lineHeight: 18,
  },
  flatlistHeader: {
    fontFamily: fonts.DMSans700Bold,
    fontSize: 14,
    lineHeight: 18,
    color: Colors.black,
  },
});
