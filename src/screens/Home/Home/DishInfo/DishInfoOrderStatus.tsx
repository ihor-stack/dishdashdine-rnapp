import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, fonts } from '@/themes';
import DishOrderProgress from '@/components/DishOrderProgress';
import { DynamicText, DynamicView } from '@/components';
import { ORDER_STATUS, ORDER_STATUS_ENUM } from '@/constants';
import DishButton from '@/components/DishButton';
import { IOrder } from '@/api/generic';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

export interface DishInfoOrderStatusProps {
  orderStatus: number;
  order: IOrder;
}

const DishInfoOrderStatus = ({
  orderStatus,
  order,
}: DishInfoOrderStatusProps) => {
  const navigation = useNavigation<any>();

  const renderHeaderTitle = (status: number): string => {
    return ORDER_STATUS[status] as string;
  };

  const renderHeaderTime = (status: number) => {
    return (
      order.statusHistory[status] &&
      moment(new Date(order.statusHistory[status]?.timestamp))
        .format('HH:mm')
        .toString()
    );
  };

  return (
    <DynamicView
      paddingHorizontal={12}
      paddingVertical={16}
      backgroundColor={Colors.white}
      style={styles.shadowContainer}>
      <DishOrderProgress steps={5} activeIndex={orderStatus} />
      <DynamicView marginTop={16} flexDirection="row" alignItems="center">
        <DynamicText style={styles.orderTimeText} paddingRight={14}>
          {renderHeaderTime(orderStatus)}{' '}
        </DynamicText>
        <DynamicText style={styles.orderTitleText}>
          {renderHeaderTitle(orderStatus)}
        </DynamicText>
      </DynamicView>
      {orderStatus !== ORDER_STATUS_ENUM.NEW &&
        orderStatus !== ORDER_STATUS_ENUM.COMPLETED &&
        orderStatus !== ORDER_STATUS_ENUM.CANCELLED && (
          <DishButton
            icon="arrowright"
            label={`Order Status`}
            onPress={() => {
              navigation.navigate('OrderStatus', {
                orderId: order.id,
              });
            }}
            variant="primary"
          />
        )}
    </DynamicView>
  );
};

export default DishInfoOrderStatus;

const styles = StyleSheet.create({
  orderTitleText: {
    fontFamily: fonts.DMSans500Medium,
    fontSize: 14,
    lineHeight: 21,
    color: Colors.black,
  },
  orderTimeText: {
    fontFamily: fonts.DMSans500Medium,
    fontSize: 14,
    lineHeight: 21,
    color: Colors.grey,
  },
  shadowContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
});
