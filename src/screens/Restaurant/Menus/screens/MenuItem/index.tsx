import React, {useCallback, useEffect, useState} from 'react';
import {DynamicPressable, DynamicText, DynamicView} from '@/components';
import {Divider} from 'native-base';
import {Colors} from '@/themes';
import {FlatList} from 'react-native-gesture-handler';
import DishButton from '@/components/DishButton';
import {useNavigation, useRoute} from '@react-navigation/native';
import DishRestaurantSearchBar from '@/components/DishRestaurantSearchBar';
import {
  IAdminCategory,
  IAdminCategoryItems,
} from '@/api/admin_restaurant/model';
import {useDispatch} from 'react-redux';
import {
  fetchRestaurantCategory,
  fetchRestaurantMenus,
} from '@/store/admin_restaurant/restaurant/thunk';
import FastImage from 'react-native-fast-image';
import {filter, isEmpty, lowerCase} from 'lodash';
import styles from './styles';
import DishSpinner from '@/components/DishSpinner';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {RefreshControl} from 'react-native';
import {FAKE_DATA} from '@/screens/Restaurant/Menus/screens';

const MenuItem = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<any>();
  const params = useRoute().params as any;
  const restaurantId = params?.id;
  const categoryId = params.categoryId;
  const [categories, setCategories] = useState<IAdminCategory>([]);
  const [categoryItems, setCategoryItems] = useState<IAdminCategoryItems[]>([]);
  const [categoryItemsCopy, setCategoryItemsCopy] = useState<
    IAdminCategoryItems[]
  >([]);
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const menu = params?.menu;

  useEffect(() => {
    init();
  }, [restaurantId, categoryId, dispatch]);

  useEffect(() => {
    navigation.addListener('focus', () => {
      // The screen is focused, refresh menu items
      init();
    });
  }, [navigation]);

  useEffect(() => {
    const newData = [...categoryItemsCopy];
    if (!isEmpty(searchText)) {
      const filterValue = filter(newData, item => {
        return lowerCase(item.itemName).indexOf(lowerCase(searchText)) !== -1;
      });
      setCategoryItems(filterValue);
    } else {
      setCategoryItems(newData);
    }
  }, [categoryItemsCopy, searchText]);

  const init = async (isRefreshing = false) => {
    try {
      if (!isRefreshing) {
        setIsLoading(true);
      }
      const response = await dispatch(
        fetchRestaurantCategory({
          id: restaurantId,
          categoryId,
        }),
      ).unwrap();
      setIsLoading(false);
      if (response) {
        setCategories(response);
        if (!isEmpty(response?.items)) {
          setCategoryItems(response?.items);
          setCategoryItemsCopy(response?.items);
        }
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await init(true);
    setRefreshing(false);
  }, [init, dispatch]);

  const ListHeaderComponent = () => {
    return (
      <DynamicView marginTop={20}>
        <DynamicText style={styles.displayMenuName}>{menu.name}</DynamicText>
        <DynamicText style={styles.displayMenuAvailability}>
          {menu.displayMenuAvailability}
        </DynamicText>
        <DynamicView marginTop={22}>
          <DynamicText style={styles.menuItemsText}>Menu items</DynamicText>
        </DynamicView>
        <Divider bgColor={Colors.lightGrey} marginTop={5} />
      </DynamicView>
    );
  };

  const renderItem = ({item, index}) => {
    return (
      <DynamicPressable
        key={index}
        style={styles.renderItemView}
        onPress={() => {
          navigation.navigate('MenuItemDetails', {
            id: restaurantId,
            itemId: item.itemId,
            menu,
            menuItem: item,
          });
        }}>
        <DynamicView>
          <FastImage
            style={{width: 45, height: 45, borderRadius: 4}}
            source={{
              uri: item?.itemImagePath,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        </DynamicView>
        <DynamicView alignItems="flex-start" flex={1} paddingLeft={16}>
          <DynamicText style={styles.flatlistItem}>{item.itemName}</DynamicText>
        </DynamicView>
      </DynamicPressable>
    );
  };

  const renderLoadingItems = () => (
    <SkeletonPlaceholder>
      <SkeletonPlaceholder.Item
        flexDirection="row"
        alignItems="center"
        paddingVertical={10}>
        <SkeletonPlaceholder.Item width={45} height={45} borderRadius={4} />
        <SkeletonPlaceholder.Item marginLeft={20}>
          <SkeletonPlaceholder.Item width={200} height={16} borderRadius={4} />
          <SkeletonPlaceholder.Item
            marginTop={6}
            width={80}
            height={12}
            borderRadius={4}
          />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );

  return (
    <DynamicView flex={1}>
      {isLoading && <DishSpinner />}
      <DynamicView backgroundColor={Colors.lightGrey}>
        <DishRestaurantSearchBar
          searchText={searchText}
          onSearchText={setSearchText}
        />
      </DynamicView>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={isLoading ? FAKE_DATA : categoryItems}
        renderItem={isLoading ? renderLoadingItems : renderItem}
        contentContainerStyle={{
          marginTop: 15,
          ...styles.containerView,
        }}
        ItemSeparatorComponent={() => {
          return <Divider bgColor={Colors.lightGrey} />;
        }}
        ListHeaderComponent={ListHeaderComponent}
      />
      <DynamicView style={styles.listFooterStyle}>
        <DishButton
          icon="arrowright"
          label="Add New Menu Item"
          variant="primary"
          onPress={() => {
            navigation.navigate('MenuItemDetails', {
              restaurantId,
              itemId: menu.menuId,
              action: 'add',
            });
          }}
        />
      </DynamicView>
    </DynamicView>
  );
};

export default MenuItem;
