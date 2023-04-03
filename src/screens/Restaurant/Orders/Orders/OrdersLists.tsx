import {FlatList, RefreshControl, StyleSheet} from 'react-native';
import React from 'react';
import {Colors} from '@/themes';
import {DynamicPressable} from '@/components';
import OrderDetails from './OrderDetails';
import {SheetManager} from 'react-native-actions-sheet';
import EmptyAdminState from '../../EmptyAdminState';
import {IAdminOrders} from '@/api/admin_restaurant/model';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export interface OrdersListsProps {
  listData: IAdminOrders[];
  isLoading?: boolean;
  refreshing: boolean;
  onRefresh: any;
  emptyTitle?: string;
  emptyMessage?: string;
}

const FAKE_DATA: any = Array.from({
  length: 10,
});

const OrdersLists = ({
  listData,
  refreshing,
  onRefresh,
  isLoading,
  emptyTitle,
  emptyMessage,
}: OrdersListsProps) => {
  const renderItem = ({item, index}: {item: IAdminOrders; index: number}) => {
    return (
      <DynamicPressable
        paddingHorizontal={14}
        style={styles.ListItem}
        key={index}
        backgroundColor={Colors.white}
        onPress={async () => {
          await SheetManager.show('AcceptOrderModal', {
            payload: {
              order: item,
            },
          });
        }}>
        <OrderDetails order={item} />
      </DynamicPressable>
    );
  };

  const renderLoadingItems = () => (
    <SkeletonPlaceholder>
      <SkeletonPlaceholder.Item
        borderRadius={4}
        height={320}
        flexDirection="row"
        alignItems="center"
        marginBottom={20}
        marginHorizontal={11}
      />
    </SkeletonPlaceholder>
  );

  return (
    <FlatList
      contentContainerStyle={{
        flexGrow: 1,
      }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      data={isLoading ? FAKE_DATA : listData}
      // keyExtractor={item => item?.id}
      renderItem={isLoading ? renderLoadingItems : renderItem}
      ListEmptyComponent={() => (
        <EmptyAdminState
          title={emptyTitle || 'No Orders Found'}
          message={
            emptyMessage || 'It looks like there are no orders here yet.'
          }
          messageStyle={{textAlign: 'center'}}
          showImage={true}
        />
      )}
    />
  );
};

export default React.memo(OrdersLists);

const styles = StyleSheet.create({
  ListItem: {
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    marginTop: 20,
  },
});
