import {DynamicText, DynamicView} from '@/components';
import {fonts} from '@/themes';
import React from 'react';
import {StyleSheet} from 'react-native';
import {ORDER_TYPE} from '@/constants';

export interface OrderStatusProps {
  orderType?: number;
}

const AdminOrderStatus = ({orderType}: OrderStatusProps) => {
  return (
    <DynamicView
      backgroundColor={
        orderType === ORDER_TYPE.COLLECTION
          ? 'rgba(23, 43, 133, 0.1)'
          : 'rgba(189, 0, 182, 0.1)'
      }
      width={90}
      height={24}
      justifyContent="center"
      borderRadius={70}
      paddingHorizontal={10}>
      <DynamicText
        style={styles.orderStatusText}
        color={orderType === ORDER_TYPE.COLLECTION ? '#172B85' : '#BD00B6'}>
        {orderType === ORDER_TYPE.COLLECTION ? 'Collection' : 'Delivery'}
      </DynamicText>
    </DynamicView>
  );
};

export default AdminOrderStatus;

const styles = StyleSheet.create({
  orderStatusText: {
    fontFamily: fonts.DMSans500Medium,
    fontSize: 14,
    lineHeight: 18,
    textAlign: 'center',
  },
});
