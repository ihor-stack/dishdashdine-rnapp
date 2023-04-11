import {StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  IAdminCategories,
  IAdminModifierGroups,
  IAdminRestaurant,
} from '@/api/admin_restaurant/model';
import {adminRestaurantSelectors} from '@/store/admin_restaurant/restaurant';
import {useSelector} from 'react-redux';
import {DynamicPressable, DynamicText, DynamicView} from '@/components';
import {FlatList} from 'react-native-gesture-handler';
import {Divider} from 'native-base';
import {Colors, fonts} from '@/themes';
import DishRestaurantSearchBar from '@/components/DishRestaurantSearchBar';
import {filter, isEmpty, lowerCase} from 'lodash';

export interface MenuItemsProps {
  onSelectedItem: any;
  itemType: any;
}

const MenuItems: React.FC<MenuItemsProps> = ({onSelectedItem, itemType}) => {
  const [searchText, setSearchText] = useState('');
  const [categoryItems, setCategoryItems] = useState<IAdminCategories[]>([]);
  const [categoryItemsCopy, setCategoryItemsCopy] = useState<
    IAdminCategories[]
  >([]);
  const [modifiers, setModifiers] = useState<IAdminModifierGroups[]>([]);
  const [modifiersCopy, setModifiersCopy] = useState<IAdminModifierGroups[]>(
    [],
  );
  const restaurant: IAdminRestaurant = useSelector(
    adminRestaurantSelectors.selectRestaurant,
  );

  useEffect(() => {
    if (itemType === 'categories') {
      if (!isEmpty(restaurant?.categories)) {
        setCategoryItems(restaurant?.categories || []);
        setCategoryItemsCopy(restaurant?.categories || []);
      }
    } else {
      if (!isEmpty(restaurant?.modifiers)) {
        setModifiers(restaurant?.modifiers || []);
        setModifiersCopy(restaurant?.modifiers || []);
      }
    }
  }, [itemType, restaurant]);

  useEffect(() => {
    const newDataCategories = [...categoryItemsCopy];
    const newDataModifiers = [...modifiersCopy];
    if (!isEmpty(searchText)) {
      if (itemType === 'categories') {
        const filterValue = filter(newDataCategories, item => {
          return lowerCase(item.name).indexOf(lowerCase(searchText)) !== -1;
        });
        setCategoryItems(filterValue);
      } else {
        const filterValue = filter(newDataModifiers, item => {
          return lowerCase(item.name).indexOf(lowerCase(searchText)) !== -1;
        });
        setModifiers(filterValue);
      }
    } else {
      setCategoryItems(newDataCategories);
      setModifiers(newDataModifiers);
    }
  }, [itemType, categoryItemsCopy, modifiersCopy, searchText]);

  const renderItem = ({item, index}) => {
    return (
      <DynamicPressable
        key={index}
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        paddingTop={15}
        paddingBottom={10}
        onPress={() => onSelectedItem(item)}>
        <DynamicView alignItems="flex-start" flex={1} paddingLeft={16}>
          <DynamicText>{item.name}</DynamicText>
        </DynamicView>
      </DynamicPressable>
    );
  };

  const items = itemType === 'categories' ? categoryItems : modifiers;

  return (
    <DynamicView>
      <DynamicView backgroundColor={Colors.white}>
        <DishRestaurantSearchBar
          variant="alt"
          searchText={searchText}
          onSearchText={setSearchText}
        />
      </DynamicView>
      <FlatList
        data={items}
        renderItem={renderItem}
        ItemSeparatorComponent={() => {
          return <Divider bgColor={Colors.lightGrey} />;
        }}
        contentContainerStyle={{
          marginTop: 15,
          ...styles.containerView,
        }}
      />
    </DynamicView>
  );
};

export default MenuItems;

const styles = StyleSheet.create({
  containerView: {
    marginTop: 11,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingBottom: 20,
    // borderTopWidth: 1,
    // borderTopColor: Colors.border,
    // borderBottomWidth: 1,
    // borderBottomColor: Colors.border,
  },
  searchBarStyle: {
    backgroundColor: Colors.lightestGrey,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.lightestGrey,
  },
  searchTextStyle: {
    fontFamily: fonts.DMSans400Regular,
    fontSize: 14,
    lineHeight: 18,
    color: Colors.grey,
  },
});
