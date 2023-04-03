import {View, Text, FlatList, RefreshControl, StyleSheet} from 'react-native';
import React, {useCallback} from 'react';
import {DynamicPressable, DynamicText, DynamicView} from '@/components';
import DishSpinner from '@/components/DishSpinner';
import {Colors, fonts} from '@/themes';
import DishRestaurantSearchBar from '@/components/DishRestaurantSearchBar';
import {Divider} from 'native-base';
import DishButton from '@/components/DishButton';
import {useNavigation} from '@react-navigation/native';
import EmptyAdminState from '@/screens/Restaurant/EmptyAdminState';
import {isEmpty} from 'lodash';

export interface RestaurantDeliveryViewProps {
  restaurantId: any;
  isLoading: boolean;
  refreshing: boolean;
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  onRefresh: () => void;
  deliveries: any[];
}

const RestaurantDeliveryView: React.FC<RestaurantDeliveryViewProps> = props => {
  const {
    restaurantId,
    isLoading,
    searchText,
    refreshing,
    setSearchText,
    onRefresh,
    deliveries,
  } = props;
  const navigation = useNavigation<any>();

  const ListHeader = () => {
    return (
      !isEmpty(deliveries) && (
        <DynamicView
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center">
          <DynamicText style={styles.flatlistHeader}>Name</DynamicText>
          <DynamicView alignItems="flex-start">
            <DynamicText style={styles.flatlistHeader}>
              Est. Delivery
            </DynamicText>
          </DynamicView>
          <DynamicView alignItems="flex-start">
            <DynamicText style={styles.flatlistHeader}>Cost</DynamicText>
          </DynamicView>
        </DynamicView>
      )
    );
  };

  const renderItem = useCallback(({item, index}) => {
    return (
      <DynamicPressable
        key={index}
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        paddingVertical={23}
        onPress={() => {
          navigation.navigate('RestaurantDeliveryEntry', {
            restaurantId: restaurantId,
            delivery: item,
            action: 'update',
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
        <DynamicView alignItems="flex-start" flex={0.7}>
          <DynamicText
            style={{
              color: Colors.black,
              ...styles.itemTextStyle,
            }}>
            {item.estimatedTime}
          </DynamicText>
        </DynamicView>
        <DynamicView alignItems="flex-start">
          <DynamicText
            style={{
              color: Colors.black,
              ...styles.itemTextStyle,
            }}>
            £{Number(item.cost).toFixed(2)}
          </DynamicText>
        </DynamicView>
      </DynamicPressable>
    );
  }, []);

  const emptyState = () => {
    return (
      <EmptyAdminState
        title="No Delivery Information yet"
        message={'Hit the button down below to \n add a new delivery'}
        showImage={true}
        messageStyle={{textAlign: 'center'}}
      />
    );
  };

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
        data={deliveries}
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
          label="Add New Delivery"
          variant="primary"
          onPress={() => {
            navigation.navigate('RestaurantDeliveryEntry', {
              restaurantId: restaurantId,
              action: 'add',
            });
          }}
        />
      </DynamicView>
    </DynamicView>
  );
};

export default RestaurantDeliveryView;

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
