import React, {useCallback, useEffect, useState} from 'react';
import {DynamicPressable, DynamicText, DynamicView} from '@/components';
import {RefreshControl, StyleSheet} from 'react-native';
import {Colors, fonts} from '@/themes';
import {FlatList} from 'react-native-gesture-handler';
import {Divider} from 'native-base';
import DishButton from '@/components/DishButton';
import {useNavigation, useRoute} from '@react-navigation/native';
import EmptyAdminState from '../../EmptyAdminState';
import {filter, isEmpty, lowerCase} from 'lodash';
import {IAdminCategories, IAdminRestaurant} from '@/api/admin_restaurant/model';
import {useDispatch, useSelector} from 'react-redux';
import {adminRestaurantSelectors} from '@/store/admin_restaurant/restaurant';
import DishRestaurantSearchBar from '@/components/DishRestaurantSearchBar';
import {fetchRestaurantCategories} from '@/store/admin_restaurant/restaurant/thunk';

const RestaurantCategories = () => {
  const {navigate} = useNavigation<any>();
  const dispatch = useDispatch();
  const params = useRoute().params as any;
  const restaurantId = params?.id;
  const restaurant: IAdminRestaurant = useSelector(
    adminRestaurantSelectors.selectRestaurant,
  );
  const isLoading: boolean = useSelector(
    adminRestaurantSelectors.showLoadingData,
  );
  const [categories, setCategories] = useState<IAdminCategories[]>([]);
  const [categoriesCopy, setCategoriesCopy] = useState<IAdminCategories[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState('');

  const fetchAdminRestaurantCategorys = useCallback(async () => {
    return await dispatch(fetchRestaurantCategories(restaurant.restaurantId));
  }, [restaurant, dispatch]);

  useEffect(() => {
    fetchAdminRestaurantCategorys();
  }, []);

  useEffect(() => {
    if (!isEmpty(restaurant?.categories)) {
      setCategories(restaurant?.categories || []);
      setCategoriesCopy(restaurant?.categories || []);
    }
  }, [restaurantId, restaurant]);

  useEffect(() => {
    const newData = [...categoriesCopy];
    if (!isEmpty(searchText)) {
      const filterValue = filter(newData, item => {
        return lowerCase(item.name).indexOf(lowerCase(searchText)) !== -1;
      });
      setCategories(filterValue);
    } else {
      setCategories(newData);
    }
  }, [categoriesCopy, searchText]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchAdminRestaurantCategorys();
    setRefreshing(false);
  }, [dispatch, restaurantId]);

  const listHeaderColumn = () => {
    return (
      !isEmpty(categories) && (
        <DynamicPressable
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center">
          <DynamicText style={styles.flatlistHeader}>Name</DynamicText>
          <DynamicView alignItems="flex-start" flex={0.76}>
            <DynamicText style={styles.flatlistHeader}>
              Menus Included
            </DynamicText>
          </DynamicView>
        </DynamicPressable>
      )
    );
  };

  const renderItem = ({item, index}) => {
    return (
      <DynamicPressable
        key={index}
        style={styles.renderItemView}
        onPress={() => {
          navigate('CategoryDetails', {
            restaurantId: restaurant.restaurantId,
            categoryId: item.categoryId,
            category: item,
            action: 'view',
          });
        }}>
        <DynamicView alignItems="flex-start" flex={0.5}>
          <DynamicText
            style={{
              color: Colors.ember,
              ...styles.itemTextStyle,
            }}>
            {item.name}
          </DynamicText>
        </DynamicView>
        <DynamicView alignItems="flex-start" flex={1}>
          <DynamicText
            style={{
              color: Colors.black,
              ...styles.itemTextStyle,
            }}>
            {item.displayMenus}
          </DynamicText>
        </DynamicView>
      </DynamicPressable>
    );
  };

  const emptyState = () => {
    return (
      <EmptyAdminState
        title="No Categories yet"
        message={'Hit the button down below to add \n a new category'}
        showImage={true}
        messageStyle={{textAlign: 'center'}}
      />
    );
  };

  return (
    <DynamicView flex={1} backgroundColor={Colors.white}>
      <DynamicView backgroundColor={Colors.lightGrey}>
        <DishRestaurantSearchBar
          searchText={searchText}
          onSearchText={setSearchText}
          placeholder={'Search for a category'}
        />
      </DynamicView>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={categories}
        style={styles.ListView}
        contentContainerStyle={styles.container}
        renderItem={renderItem}
        ItemSeparatorComponent={() => {
          return <Divider bgColor={Colors.lightGrey} />;
        }}
        ListHeaderComponent={listHeaderColumn}
        ListHeaderComponentStyle={styles.listHeaderComponentStyle}
        ListEmptyComponent={emptyState}
      />
      <DynamicView marginBottom={21} marginHorizontal={21}>
        <DishButton
          icon="arrowright"
          label="Add New Category"
          variant="primary"
          onPress={() => {
            navigate('CategoryEntry', {restaurantId: restaurant.restaurantId, action: 'add'});
          }}
        />
      </DynamicView>
    </DynamicView>
  );
};

export default RestaurantCategories;

const styles = StyleSheet.create({
  ListView: {
    backgroundColor: '#fff',
    marginTop: 11,
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 14,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    // borderBottomWidth: 1,
    // borderBottomColor: Colors.border,
  },
  listHeaderComponentStyle: {
    borderBottomColor: Colors.lightGrey,
    borderBottomWidth: 1,
    paddingVertical: 23,
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
  renderItemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 23,
  },
});
