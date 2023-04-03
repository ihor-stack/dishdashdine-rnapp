import React from 'react';
import {DynamicText, DynamicView} from '@/components';
import {StyleSheet} from 'react-native';
import {Colors, fonts} from '@/themes';
import {Divider} from 'native-base';
import {isEmpty} from 'lodash';
import AdminOrderStatus from './AdminOrderStatus';
import {IAdminOrders} from '@/api/admin_restaurant/model';
import moment from 'moment';
import MyOrderCollectionTime from '@/screens/Home/Orders/OrderSummary/MyOrderCollectionTime';
import Feather from 'react-native-vector-icons/Feather';
import {ORDER_TYPE} from '@/constants';

export interface OrderDetailsProps {
  order: IAdminOrders;
}

const OrderDetails = ({order}: OrderDetailsProps) => {
  return (
    <DynamicView marginTop={15} marginBottom={10}>
      <DynamicView
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center">
        <DynamicView>
          <DynamicText style={styles.orderNumText}>
            Order Number #{order.reference?.slice(-6)}
          </DynamicText>
          {order.submittedAt && (
            <DynamicText
              style={{
                ...styles.textLabelStyle,
                color: Colors.black,
              }}>
              {moment(order.submittedAt).format('DD/M/YYYY, HH:mm A')}
            </DynamicText>
          )}
        </DynamicView>
        <DynamicView>
          <AdminOrderStatus orderType={order.orderType} />
        </DynamicView>
      </DynamicView>

      <DynamicView style={styles.orderItemView}>
        <DynamicView
          flexDirection="row"
          alignItems="center"
          paddingVertical={20}>
          <Feather name="clock" color={Colors.ember} size={27} />
          <DynamicView marginLeft={11}>
            <DynamicText
              fontFamily={fonts.DMSans500Medium}
              fontSize={16}
              lineHeight={18}
              color={Colors.black}>
              {order?.orderType === ORDER_TYPE.COLLECTION
                ? 'Collection'
                : 'Delivery'}{' '}
              time
            </DynamicText>
          </DynamicView>
        </DynamicView>
        <DynamicText
          fontFamily={fonts.DMSans500Medium}
          fontSize={16}
          lineHeight={20.83}
          color={Colors.black}>
          {order?.collectionTime
            ? moment(order.collectionTime).format('MM/DD/YYYY HH:mm')
            : 'No collection time'}
        </DynamicText>
      </DynamicView>

      <DynamicView style={styles.orderItemView}>
        <DynamicText
          style={{
            ...styles.textLabelStyle,
            color: Colors.black,
          }}>
          Customer Name
        </DynamicText>
        <DynamicText
          style={{
            ...styles.textLabelStyle,
            color: Colors.grey,
          }}>
          {order.customerName}
        </DynamicText>
      </DynamicView>
      <DynamicView style={styles.orderItemView}>
        <DynamicText
          style={{
            ...styles.textLabelStyle,
            color: Colors.black,
          }}>
          Contact number
        </DynamicText>
        <DynamicText
          style={{
            ...styles.textLabelStyle,
            color: Colors.grey,
          }}>
          {order.customerPhoneNumber}
        </DynamicText>
      </DynamicView>
      <DynamicView
        marginTop={7}
        backgroundColor={Colors.lightGrey}
        paddingHorizontal={15}
        paddingVertical={11}>
        <DynamicText
          style={{
            ...styles.textLabelStyle,
            color: Colors.black,
          }}>
          Order Summary
        </DynamicText>
        {order.lineItemCount > 0 &&
          order?.lineItems.map((lineItem: any, index: number) => {
            return (
              <DynamicView key={index}>
                <DynamicView
                  flexDirection="row"
                  justifyContent="space-between"
                  marginTop={14}>
                  <DynamicText
                    style={{
                      ...styles.textLabelStyle,
                      color: Colors.grey,
                    }}>
                    {lineItem.quantity}x {lineItem?.itemName}
                  </DynamicText>
                  <DynamicText
                    style={{
                      ...styles.textLabelStyle,
                      color: Colors.grey,
                    }}>
                    £{Number(lineItem?.itemPrice).toFixed(2)}
                  </DynamicText>
                </DynamicView>
                <DynamicView marginLeft={28}>
                  {!isEmpty(lineItem?.specialInstructions) && (
                    <DynamicText
                      color={Colors.ember}
                      fontFamily={fonts.DMSans500Medium}
                      fontSize={13}
                      lineHeight={16}>
                      Notes: {lineItem?.specialInstructions}
                    </DynamicText>
                  )}
                </DynamicView>
                <DynamicView marginLeft={15} marginTop={2}>
                  {!isEmpty(lineItem.selectedModifierGroups) &&
                    lineItem.selectedModifierGroups?.map((modGroup: any) => {
                      return (
                        <DynamicView>
                          <DynamicText style={styles.addOnsHeader}>
                            {modGroup.modifierGroupName}:
                          </DynamicText>
                          {modGroup.selectedItems?.map((selectedItems: any) => {
                            if (selectedItems.quantity > 0) {
                              return (
                                <DynamicView>
                                  <DynamicText
                                    paddingLeft={5}
                                    fontFamily={fonts.DMSans400Regular}
                                    fontSize={13}
                                    color={Colors.grey}>
                                    {selectedItems.quantity}x {''}
                                    {selectedItems.modifierGroupItemName}
                                  </DynamicText>
                                </DynamicView>
                              );
                            }
                          })}
                        </DynamicView>
                      );
                    })}
                </DynamicView>
                {index !== order.lineItemCount - 1 && (
                  <Divider marginTop={14} color={Colors.lightGrey} />
                )}
              </DynamicView>
            );
          })}
      </DynamicView>
      <DynamicView style={styles.orderItemView}>
        <DynamicText
          style={{
            ...styles.textLabelStyle,
            color: Colors.black,
          }}>
          Payment
        </DynamicText>
        <DynamicText
          style={{
            ...styles.textLabelStyle,
            color: Colors.grey,
          }}>
          £{Number(order?.total).toFixed(2)}
        </DynamicText>
      </DynamicView>
    </DynamicView>
  );
};

export default OrderDetails;

const styles = StyleSheet.create({
  orderNumText: {
    fontFamily: fonts.DMSans500Medium,
    fontSize: 16,
    lineHeight: 21,
    color: Colors.black,
  },
  textLabelStyle: {
    fontFamily: fonts.DMSans500Medium,
    fontSize: 12,
    lineHeight: 16,
    color: Colors.black,
  },
  orderItemView: {
    backgroundColor: Colors.lightestGrey,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    minHeight: 45,
    marginTop: 7,
  },
  addOnsHeader: {
    fontFamily: fonts.DMSans700Bold,
    fontSize: 12,
    lineHeight: 16,
    color: Colors.darkGrey,
  },
  addOns: {
    fontFamily: fonts.DMSans400Regular,
    fontSize: 12,
    lineHeight: 16,
  },
});
