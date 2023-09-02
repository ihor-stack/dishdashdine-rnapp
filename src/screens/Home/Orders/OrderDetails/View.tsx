import React, { useState } from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import DishSpinner from '@/components/DishSpinner';
import OrderInfoAvatar from '@/screens/Home/Orders/OrderInfoAvatar';
import {Divider} from 'native-base';
import {Colors, fonts} from '@/themes';
import OrderDetailsLists from '@/screens/Home/Orders/OrderDetails/OrderDetailsLists';
import {DynamicImage, DynamicPressable, DynamicText, DynamicView} from '@/components';
import OrderPreferrence from '@/screens/Home/Orders/OrderDetails/OrderPreferrence';
import AddPromoCode from '@/screens/Home/Orders/OrderDetails/AddPromoCode';
import Entypo from 'react-native-vector-icons/Entypo';
import OrderTips from '@/screens/Home/Orders/OrderTips';
import OrderCollectionTime from '@/screens/Home/Orders/OrderCollectionTime';
import OrderPaymentMethod from '@/screens/Home/Orders/OrderPaymentMethod';
import OrderTotal from '@/screens/Home/Orders/OrderTotal';
import DishButton from '@/components/DishButton';
import {IOrder} from '@/api/generic';

const heartHouse = require('@/assets/images/bi-house-heart.png');

export interface OrderDetailsViewProps {
  isLoading: boolean;
  order: IOrder;
  orderType: number;
  reqUtensils: boolean;
  reqNapkins: boolean;
  setReqUtensils: React.Dispatch<React.SetStateAction<boolean>>;
  setReqNapkins: React.Dispatch<React.SetStateAction<boolean>>;
  collectIndex: number;
  collectDate: Date;
  setCollectIndex: React.Dispatch<React.SetStateAction<number>>;
  setCollectDate: React.Dispatch<React.SetStateAction<Date>>;
  setCollectionTime: React.Dispatch<React.SetStateAction<any>>;
  setPaymentMethodId: React.Dispatch<React.SetStateAction<string>>;
  tipAmount: number;
  onCheckOutOrder: () => Promise<void>;
  onSelectedTip: (amount: number) => Promise<void>;
}

const OrderDetailsView = (props: OrderDetailsViewProps) => {
  const {
    isLoading,
    order,
    orderType,
    reqUtensils,
    reqNapkins,
    setReqUtensils,
    setReqNapkins,
    collectIndex,
    collectDate,
    setCollectIndex,
    setCollectDate,
    setCollectionTime,
    setPaymentMethodId,
    tipAmount,
    onCheckOutOrder,
    onSelectedTip,
  } = props;

  const [displayTip, setDisplayTip] = useState(false);

  return (
    <>
      {isLoading && <DishSpinner />}
      <ScrollView style={styles.container}>
        <OrderInfoAvatar restaurant={order.restaurant} />
        <Divider bgColor={Colors.lightGrey} height={2} />
        <OrderDetailsLists restaurant={order.restaurant} order={order} />
        <Divider bgColor={Colors.lightGrey} height={2} />
        <DynamicView paddingVertical={15} paddingHorizontal={10}>
          <Divider bgColor={Colors.lightGrey} />
          <OrderPreferrence
            utensils={reqUtensils}
            napkins={reqNapkins}
            onReqUtensils={setReqUtensils}
            onReqNapkins={setReqNapkins}
          />
          <Divider bgColor={Colors.lightGrey} />
          <AddPromoCode order={order} />
          <Divider bgColor={Colors.lightGrey} />
          <DynamicView paddingVertical={15} paddingHorizontal={10}>
            <DynamicView
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between">
              <DynamicView flexDirection="row" alignItems="center">
                <DynamicImage source={heartHouse} width={24} height={24} />
                <DynamicView marginLeft={10}>
                  <DynamicText
                    fontFamily={fonts.DMSans500Medium}
                    fontSize={15}
                    lineHeight={18}
                    color={Colors.black}>
                    Add a tip to say thanks
                  </DynamicText>
                </DynamicView>
              </DynamicView>
              <DynamicPressable onPress={() => setDisplayTip(!displayTip)}>
                {displayTip && (
                  <DynamicView
                    backgroundColor={Colors.lightGrey}
                    borderRadius={100}>
                    <Entypo
                      name="chevron-small-down"
                      color={Colors.black}
                      size={29}
                    />
                  </DynamicView>
                ) || (
                  <DynamicView
                    backgroundColor={Colors.lightGrey}
                    borderRadius={100}>
                    <Entypo
                      name="chevron-small-right"
                      color={Colors.black}
                      size={29}
                    />
                  </DynamicView>
                )}
              </DynamicPressable>
            </DynamicView>
          </DynamicView>
          {displayTip && (
            <DynamicView paddingTop={15}>
              <OrderTips
                subTotal={order.subTotal}
                onSelectedTip={onSelectedTip}
              />
            </DynamicView>
          )}
        </DynamicView>
        <Divider bgColor={Colors.lightGrey} />
        <OrderCollectionTime
          orderType={orderType}
          defaultTabIndex={collectIndex}
          collectDate={collectDate}
          prepTimeMax={Number(order?.restaurant?.prepTimeMax)}
          prepTimeMin={Number(order?.restaurant?.prepTimeMin)}
          onChangeDate={date => {
            setCollectDate(date);
            if (collectIndex === 0) {
              setCollectionTime({
                collectNow: false,
                collectLaterAt: new Date(date).toISOString(),
              });
            }
          }}
          onTabChanged={tabIndex => {
            setCollectIndex(tabIndex);
            if (tabIndex === 0) {
              setCollectionTime({
                collectNow: false,
                collectLaterAt: new Date(collectDate).toISOString(),
              });
            } else {
              setCollectionTime({
                collectNow: true,
                collectLaterAt: new Date().toISOString(),
              });
            }
          }}
        />
        <Divider bgColor={Colors.lightGrey} />
        <OrderPaymentMethod
          allowChangePaymentMethod
          onSelectedPaymentMethod={id => {
            setPaymentMethodId(id);
          }}
        />
        <Divider bgColor={Colors.lightGrey} />
        <OrderTotal
          subTotal={Number(order?.subTotal).toFixed(2)}
          tip={Number(tipAmount).toFixed(2) || Number(order?.tip).toFixed(2)}
          debit={Number(order?.serviceFee).toFixed(2)}
          total={Number(order?.subTotal + order?.serviceFee + tipAmount).toFixed(2)}
        />
        <Divider bgColor={Colors.lightGrey} />
        <DynamicView paddingHorizontal={12} paddingVertical={20}>
          <DishButton
            icon="arrowright"
            label={`Pay £${Number(order?.subTotal + order?.serviceFee + tipAmount).toFixed(2)} now`}
            variant="primary"
            showSpinner={isLoading}
            onPress={onCheckOutOrder}
          />
        </DynamicView>
      </ScrollView>
    </>
  );
};

export default OrderDetailsView;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
});
