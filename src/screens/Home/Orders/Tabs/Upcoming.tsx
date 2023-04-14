import React, { useState } from 'react';
import { FlatList, RefreshControl, StyleSheet } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { Button, Divider } from 'native-base';
import { useSelector } from 'react-redux';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import { IOrder } from '@/api/generic';
import { DynamicPressable, DynamicText, DynamicView } from '@/components';
import DishSpinner from '@/components/DishSpinner';
import { orderSelectors } from '@/store/order';
import { fetchActiveOrder } from '@/store/order/thunk';
import { Colors, fonts } from '@/themes';
import NoOrder from '../NoOrder';
import OrdersItem from '../OrderItem';
import { ORDER_STATUS_ENUM } from '@/constants';
import { useAppThunkDispatch } from '@/store';

const ItemLoader = ({ index }: { index: number }) => (
  <SkeletonPlaceholder key={`loading-items-${index}`}>
    <SkeletonPlaceholder.Item
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      paddingHorizontal={11}
      height={110}>
      <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
        <SkeletonPlaceholder.Item width={80} height={80} borderRadius={4} />
        <SkeletonPlaceholder.Item marginLeft={18}>
          <SkeletonPlaceholder.Item width={73} height={20} borderRadius={4} />
          <SkeletonPlaceholder.Item
            marginTop={4}
            width={100}
            height={16}
            borderRadius={4}
          />
          <SkeletonPlaceholder.Item
            marginTop={4}
            width={81}
            height={16}
            borderRadius={4}
          />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
      <SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item width={38} height={20} borderRadius={4} />
        <SkeletonPlaceholder.Item
          marginTop={6}
          width={50}
          height={16}
          borderRadius={4}
        />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder.Item>
  </SkeletonPlaceholder>
);

const UpcomingOders = () => {
  const dispatch = useAppThunkDispatch();

  const [refresher, serRefresher] = useState(false);

  let upcomingOrders = useSelector(orderSelectors.selectActiveOrder);
  upcomingOrders = [...upcomingOrders].sort(
    (a, b) =>
      new Date(b.collectionTime).getTime() -
      new Date(a.collectionTime).getTime(),
  );
  const isLoadingOrders = useSelector(orderSelectors.loadingOrders);

  const navigation = useNavigation();

  const onRefresh = async () => {
    serRefresher(true);
    await dispatch(fetchActiveOrder());
    serRefresher(false);
  };

  const onSelectOrder = async (item: IOrder) => {
    if (
      item.orderStatus === ORDER_STATUS_ENUM.COMPLETED ||
      item.orderStatus === ORDER_STATUS_ENUM.CANCELLED
    ) {
      navigation.navigate('OrderSummary', {
        order: item,
        orderId: item.id,
      });
    } else {
      navigation.navigate('OrderStatus', {
        orderId: item.id,
      });
    }
  };

  const renderItem = ({ item, index }: { item: IOrder; index: number }) => {
    if (!refresher && isLoadingOrders) {
      return <ItemLoader index={index} />;
    }

    return (
      <DynamicPressable
        onPress={() => onSelectOrder(item)}
        key={`order-item-${index}`}>
        <DynamicView
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between">
          <OrdersItem
            order={item}
            restaurant={item.restaurant}
            showCollection
          />
          <DynamicView marginRight={20} marginTop={-45}>
            <DynamicText
              fontSize={15}
              fontFamily={fonts.DMSans700Bold}
              lineHeight={19.53}
              color={Colors.black}>
              £{Number(item.total).toFixed(2)}
            </DynamicText>
            <DynamicView
              alignItems="flex-end"
              position="absolute"
              top={59}
              right={-10}
              width={203}>
              <Button
                variant="link"
                onPress={() =>
                  navigation.navigate('HelpSupportOrderEntry', {
                    restaurant: item.restaurant,
                    order: item,
                  })
                }>
                <DynamicText
                  fontSize={13}
                  fontFamily={fonts.DMSans500Medium}
                  lineHeight={15.62}
                  color={Colors.ember}>
                  Something wrong?
                </DynamicText>
              </Button>
            </DynamicView>
          </DynamicView>
        </DynamicView>
      </DynamicPressable>
    );
  };

  return (
    <>
      {isLoadingOrders && <DishSpinner />}
      <FlatList
        style={styles.listStyle}
        contentContainerStyle={styles.listContentContainerStyle}
        data={!refresher && isLoadingOrders ? FAKE_DATA : upcomingOrders}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={refresher} onRefresh={onRefresh} />
        }
        ItemSeparatorComponent={() => (
          <Divider bgColor={Colors.lightGrey} alignSelf="center" />
        )}
        ListEmptyComponent={() => <NoOrder showImage />}
      />
    </>
  );
};

export default UpcomingOders;

const styles = StyleSheet.create({
  listStyle: { backgroundColor: Colors.white },
  listContentContainerStyle: { flexGrow: 1, paddingBottom: 25 },
});

const FAKE_DATA: any[] = Array.from({
  length: 10,
});
