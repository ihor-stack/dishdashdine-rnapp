import React, {useCallback, useEffect, useId, useState} from 'react';
import {RefreshControl, StyleSheet} from 'react-native';

import {filter, isEmpty, lowerCase} from 'lodash';
import {Divider} from 'native-base';
import {FlatList} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';

import {
  IAdminModifierGroups,
  IAdminRestaurant,
} from '@/api/admin_restaurant/model';
import {DynamicPressable, DynamicText, DynamicView} from '@/components';
import DishButton from '@/components/DishButton';
import DishSpinner from '@/components/DishSpinner';
import {adminRestaurantSelectors} from '@/store/admin_restaurant/restaurant';
import {Colors, fonts} from '@/themes';
import EmptyAdminState from '../EmptyAdminState';
import DishRestaurantSearchBar from '@/components/DishRestaurantSearchBar';
import {useNavigation, useRoute} from '@react-navigation/native';
import {fetchRestaurantModifiers} from '@/store/admin_restaurant/restaurant/thunk';

const ModifierGroups = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<any>();
  const params = useRoute().params as any;
  const restaurantId = params?.restaurantId;
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState('');

  const restaurant: IAdminRestaurant = useSelector(
    adminRestaurantSelectors.selectRestaurant,
  );
  const [modifiers, setModifiers] = useState<IAdminModifierGroups[]>([]);
  const [modifiersCopy, setModifiersCopy] = useState<IAdminModifierGroups[]>(
    [],
  );

  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      await dispatch(fetchRestaurantModifiers(restaurant.restaurantId));
      setIsLoading(false);
    };
    init();
  }, [dispatch]);

  useEffect(() => {
    if (restaurant) {
      setModifiers(restaurant?.modifiers || []);
      setModifiersCopy(restaurant?.modifiers || []);
    }
  }, [restaurant]);

  useEffect(() => {
    const newData = [...modifiersCopy];
    if (!isEmpty(searchText)) {
      const filterValue = filter(newData, item => {
        return lowerCase(item.name).indexOf(lowerCase(searchText)) !== -1;
      });
      setModifiers(filterValue);
    } else {
      setModifiers(newData);
    }
  }, [modifiersCopy, searchText]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await dispatch(fetchRestaurantModifiers(restaurantId));
    setRefreshing(false);
  }, [dispatch, restaurantId]);

  const ListHeader = () =>
    !isEmpty(modifiers) ? (
      <DynamicPressable
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center">
        <DynamicText style={styles.flatlistHeader}>Name</DynamicText>
        <DynamicView alignItems="flex-start" flex={0.76}>
          <DynamicText style={styles.flatlistHeader}>Contains</DynamicText>
        </DynamicView>
      </DynamicPressable>
    ) : null;

  const modifierGroupsId = useId();

  const renderItem = ({
    item,
    index,
  }: {
    item: IAdminModifierGroups;
    index: number;
  }) => {
    const onItemPress = () => {
      navigation.navigate('ModifierGroupsEntry', {
        restaurantId: restaurantId,
        group: item,
        action: 'update',
      });
    };

    return (
      <DynamicPressable
        key={`${modifierGroupsId}-${index}`}
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        paddingVertical={23}
        onPress={onItemPress}>
        <DynamicView alignItems="flex-start" flex={0.5}>
          <DynamicText style={{color: Colors.ember, ...styles.itemTextStyle}}>
            {item.name}
          </DynamicText>
        </DynamicView>
        <DynamicView alignItems="flex-start" flex={1}>
          <DynamicText style={{color: Colors.black, ...styles.itemTextStyle}}>
            {item.displayModifierGroupItems}
          </DynamicText>
        </DynamicView>
      </DynamicPressable>
    );
  };

  const emptyState = () => (
    <EmptyAdminState
      title="No Modifiers Groups yet"
      message={'Hit the button down below to \n add a new modifier'}
      showImage={true}
      messageStyle={{textAlign: 'center'}}
    />
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
        data={modifiers}
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={renderItem}
        ItemSeparatorComponent={() => {
          return <Divider bgColor={Colors.lightGrey} />;
        }}
        ListHeaderComponent={ListHeader}
        ListHeaderComponentStyle={styles.listHeaderComponentStyle}
        ListEmptyComponent={emptyState}
      />
      <DynamicView marginBottom={21} marginHorizontal={21}>
        <DishButton
          icon="arrowright"
          label="Add New Modifier Group"
          variant="primary"
          onPress={() => {
            navigation.navigate('ModifierGroupsEntry', {
              restaurantId: restaurantId,
              action: 'add',
            });
          }}
        />
      </DynamicView>
    </DynamicView>
  );
};

export default ModifierGroups;

const styles = StyleSheet.create({
  container: {
    marginTop: 11,
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
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
});
