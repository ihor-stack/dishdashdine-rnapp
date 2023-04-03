import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {
  DynamicPressable,
  DynamicText,
  DynamicView,
  NavigationHeader,
} from '@/components';
import {RefreshControl, StyleSheet} from 'react-native';
import {Colors, fonts} from '@/themes';
import {FlatList} from 'react-native-gesture-handler';
import {Divider} from 'native-base';
import {useNavigation, useRoute} from '@react-navigation/native';
import EmptyAdminState from '../../EmptyAdminState';
import {filter, isEmpty, lowerCase} from 'lodash';
import {IAdminCategories, IAdminRestaurant} from '@/api/admin_restaurant/model';
import {useDispatch, useSelector} from 'react-redux';
import {adminRestaurantSelectors} from '@/store/admin_restaurant/restaurant';
import DishRestaurantSearchBar from '@/components/DishRestaurantSearchBar';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DishSpinner from '@/components/DishSpinner';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {FAKE_DATA} from '@/screens/Restaurant/Menus/screens/index';
import {fetchRestaurantMenus} from '@/store/admin_restaurant/restaurant/thunk';

const MenuCategories = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const params = useRoute().params as any;
  const restaurantId = params?.id;
  const menu = params?.menu;

  const restaurant: IAdminRestaurant = useSelector(
    adminRestaurantSelectors.selectRestaurant,
  );
  const isLoading: boolean = useSelector(
    adminRestaurantSelectors.showLoadingData,
  );
  const [categories, setCategories] = useState<IAdminCategories[]>([]);
  const [categoriesCopy, setCategoriesCopy] = useState<IAdminCategories[]>([]);
  const [searchText, setSearchText] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <NavigationHeader
          showBackButton
          restaurant
          title="Menu Details"
          slotEnd={
            <>
              <DynamicPressable onPress={onEditMenu}>
                <MaterialCommunityIcons
                  size={24}
                  name="pencil"
                  color={Colors.white}
                />
              </DynamicPressable>
            </>
          }
        />
      ),
    });
  }, [dispatch, navigation, params]);

  useEffect(() => {
    if (restaurant && restaurant?.categories) {
      setCategories(restaurant?.categories || []);
      setCategoriesCopy(restaurant?.categories || []);
    }
  }, [restaurant]);

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
    await dispatch(fetchRestaurantMenus(restaurant.restaurantId));
    setRefreshing(false);
  }, [restaurant, dispatch]);

  const onEditMenu = () => {
    navigation.navigate('MenuEntry', {
      restaurantId,
      menu,
      menuId: menu.menuId,
      action: 'update',
    });
  };

  const listHeaderColumn = () => {
    return (
      <>
        <DynamicView>
          <DynamicText style={styles.displayMenuName}>{menu.name}</DynamicText>
          <DynamicText style={styles.displayMenuAvailability}>
            {menu.displayMenuAvailability}
          </DynamicText>
          <Divider bgColor={Colors.lightGrey} marginTop={25} marginBottom={5} />
        </DynamicView>
        {!isEmpty(categories) && (
          <DynamicPressable
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center">
            <DynamicText style={styles.flatlistHeader}>Name</DynamicText>
          </DynamicPressable>
        )}
      </>
    );
  };

  const renderItem = ({item, index}) => {
    return (
      <DynamicPressable
        key={index}
        style={styles.renderItemView}
        onPress={() => {
          navigation.navigate('MenuItem', {
            id: restaurant.restaurantId,
            categoryId: item.categoryId,
            menu: menu,
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
    <>
      <DishRestaurantSearchBar
        searchText={searchText}
        onSearchText={setSearchText}
        placeholder={'Search menu details'}
      />
      <DynamicView flexGrow={1}>
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={isLoading ? FAKE_DATA : categories}
          style={styles.ListView}
          contentContainerStyle={styles.container}
          renderItem={isLoading ? renderLoadingItems : renderItem}
          ItemSeparatorComponent={() => {
            return <Divider bgColor={Colors.lightGrey} />;
          }}
          ListHeaderComponent={listHeaderColumn}
          ListHeaderComponentStyle={styles.listHeaderComponentStyle}
          ListEmptyComponent={emptyState}
        />
      </DynamicView>
    </>
  );
};

export default MenuCategories;

const styles = StyleSheet.create({
  ListView: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 11,
    paddingHorizontal: 14,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  container: {
    flexGrow: 1,
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
  displayMenuName: {
    fontFamily: fonts.DMSans500Medium,
    fontSize: 16,
    lineHeight: 21,
    color: Colors.black,
  },
  displayMenuAvailability: {
    fontFamily: fonts.DMSans500Medium,
    fontSize: 12,
    lineHeight: 16,
    color: Colors.black,
  },
  menuItemsText: {
    fontFamily: fonts.DMSans700Bold,
    fontSize: 14,
    lineHeight: 18,
    color: Colors.black,
  },
});
