import {FlatList, StyleSheet} from 'react-native';
import React from 'react';
import {DynamicText, DynamicView} from '@/components';
import moment from 'moment';
import {ORDER_STATUS} from '@/constants';
import {IOrderStatusHistory} from '@/api/generic';
import {Colors, fonts} from '@/themes';

export interface OrderStatusHistoryProps {
  statusHistory: IOrderStatusHistory[];
}

const OrderStatusHistory = ({statusHistory}: OrderStatusHistoryProps) => {
  const renderItem = ({
    item,
    index,
  }: {
    item: IOrderStatusHistory;
    index: number;
  }) => {
    return (
      <DynamicView
        flexDirection="row"
        alignItems="flex-start"
        paddingTop={11}
        marginLeft={10}
        key={index}>
        <DynamicText style={styles.orderTimeText}>
          {moment(new Date(item.timestamp)).format('HH:mm').toString()}
        </DynamicText>
        <DynamicView marginLeft={14}>
          <DynamicText style={styles.orderDescription}>
            {ORDER_STATUS[item.orderStatus]}
          </DynamicText>
        </DynamicView>
      </DynamicView>
    );
  };
  return (
    <FlatList
      style={styles.scrollView}
      // data={filter(statusHistory, s => s.orderStatus !== ORDER_STATUS_ENUM.NEW)}
      data={statusHistory}
      renderItem={renderItem}
      keyExtractor={item => item.orderStatusHistoryId}
    />
  );
};

export default OrderStatusHistory;

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  orderTimeText: {
    fontFamily: fonts.DMSans400Regular,
    fontSize: 12,
    lineHeight: 16,
    color: Colors.grey,
  },
  orderDescription: {
    fontFamily: fonts.DMSans400Regular,
    fontSize: 12,
    lineHeight: 15,
    color: Colors.black,
  },
});
