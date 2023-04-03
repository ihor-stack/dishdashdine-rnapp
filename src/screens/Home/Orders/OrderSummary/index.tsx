import {Linking, Platform, RefreshControl, StyleSheet} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {DynamicText, DynamicView} from '@/components';
import OrderInfoAvatar from '../OrderInfoAvatar';
import {ScrollView} from 'react-native-gesture-handler';
import {Divider} from 'native-base';
import {Colors, fonts} from '@/themes';
import CheckOutMenuITem from '../../Home/DishInfo/CheckOutMenuITem';
import OrderPaymentMethod from '../OrderPaymentMethod';
import OrderTotal from '../OrderTotal';
import {SheetManager} from 'react-native-actions-sheet';
import DishButton from '@/components/DishButton';
import {useRoute} from '@react-navigation/native';
import MyOrderCollectionTime from './MyOrderCollectionTime';
import {fetchOrderRestaurant} from '@/store/order/thunk';
import {useDispatch, useSelector} from 'react-redux';
import {orderSelectors} from '@/store/order';
import {IOrder} from '@/api/generic';
import {ORDER_STATUS_ENUM} from '@/constants';
import isEmpty from 'lodash/isEmpty';
import {showMessage} from 'react-native-flash-message';

const OrderSummary = () => {
  const dispatch = useDispatch<any>();
  const params = useRoute().params as any;
  const orderId = params?.orderId;
  const order: IOrder = useSelector(orderSelectors.selectSelectedOrder);
  const isLoading = useSelector(orderSelectors.loadingSelectedOrder);
  const [refreshing, setRefreshing] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [timer, setTimer] = useState<any>();

  useEffect(() => {
    if (orderId) {
      setIsRefreshing(false);
      dispatch(fetchOrderRestaurant(orderId));
    }
  }, [orderId, dispatch]);

  useEffect(() => {
    const oneSecInterval = setInterval(() => {
      if (orderId) {
        setIsRefreshing(true);
        dispatch(fetchOrderRestaurant(orderId));
      }
    }, 10000);
    setTimer(oneSecInterval);

    return () => {
      clearInterval(oneSecInterval);
      clearInterval(timer);
    };
  }, [orderId, dispatch]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await dispatch(fetchOrderRestaurant(orderId));
    setRefreshing(false);
  }, [dispatch, orderId]);

  const triggerPhoneCall = async () => {
    let phoneNumber: string = '';
    if (order?.restaurant) {
      if (isEmpty(order?.restaurant.phone)) {
        return showMessage({
          message: 'WARNING!',
          description:
            'Unable to initiate call as no restaurant contact number found!',
          type: 'warning',
        });
      }

      if (Platform.OS === 'android') {
        phoneNumber = `tel:${order?.restaurant.phone}`;
      } else {
        phoneNumber = `telprompt:${order?.restaurant.phone}`;
      }
    } else {
      return showMessage({
        message: 'WARNING!',
        description: 'No restaurant found associated to this order!',
        type: 'warning',
      });
    }
    await Linking.openURL(phoneNumber);
  };

  const openMaps = async () => {
    const lat = order?.restaurant?.latitude;
    const lng = order?.restaurant?.longitude;
    const label = order?.restaurant?.name;
    const scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:';
    const url = scheme + `${lat},${lng}?q=${label}`;
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        return Linking.openURL(url);
      } else {
        const browser_url =
          'https://www.google.de/maps/@' + lat + ',' + lng + '?q=' + label;
        return Linking.openURL(browser_url);
      }
    });
  };

  const renderOrderNumberView = () => (
    <DynamicView alignItems="center" marginTop={20} paddingBottom={20}>
      <DynamicText
        textAlign="center"
        fontFamily={fonts.DMSans500Medium}
        fontSize={24}
        lineHeight={31.25}>
        Your order number is,{'\n'} {order?.reference?.slice(-6)}
      </DynamicText>
      <DynamicText
        textAlign="center"
        fontFamily={fonts.DMSans500Medium}
        fontSize={13}
        lineHeight={15.62}
        color={Colors.grey}>
        (Quote this when you arrive at the restaurant)
      </DynamicText>
    </DynamicView>
  );

  const renderOrderCancelledView = () => (
    <DynamicView alignItems="center" marginTop={20} paddingBottom={20}>
      <DynamicText
        textAlign="center"
        fontFamily={fonts.DMSans500Medium}
        fontSize={24}
        lineHeight={31.25}>
        Your order has been cancelled{'\n'}
      </DynamicText>
      <DynamicText
        textAlign="center"
        fontFamily={fonts.DMSans500Medium}
        fontSize={13}
        lineHeight={15.62}
        color={Colors.grey}>
        We had to cancel your order; don't worry, you'll be be refunded.
        {'\n'} See you next time!
      </DynamicText>
    </DynamicView>
  );

  const onSheetCloseReview = (data: undefined) => {
    dispatch(fetchOrderRestaurant(orderId));
  }

  return (
    <>
      <ScrollView
        style={styles.container}
        keyboardDismissMode="interactive"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <OrderInfoAvatar
          restaurant={order?.restaurant}
          showLoading={isLoading && !refreshing && !isRefreshing}
        />
        <Divider bgColor={Colors.lightGrey} height={2} />
        {order?.orderStatus !== ORDER_STATUS_ENUM.CANCELLED
          ? renderOrderNumberView()
          : renderOrderCancelledView()}
        <MyOrderCollectionTime
          order={order}
          showLoading={isLoading && !isRefreshing}
        />
        <DynamicView marginTop={20} paddingHorizontal={12}>
          <DynamicText
            fontFamily={fonts.DMSans500Medium}
            fontSize={16}
            lineHeight={20.83}>
            Order Summary
          </DynamicText>
          <CheckOutMenuITem
            isListView={false}
            disableSwipe={true}
            order={order}
            showLoading={isLoading && !isRefreshing}
          />
        </DynamicView>
        <Divider bgColor={Colors.lightGrey} height={2} />
        <OrderPaymentMethod
          allowChangePaymentMethod={false}
          paymentMethodId={order?.paymentMethodId}
          showLoading={isLoading && !isRefreshing}
        />
        <Divider bgColor={Colors.lightGrey} />
        <OrderTotal
          showLoading={isLoading && !isRefreshing}
          subTotal={Number(order?.subTotal).toFixed(2)}
          tip={Number(order?.tip).toFixed(2)}
          debit={Number(order?.serviceFee).toFixed(2)}
          total={Number(order?.total).toFixed(2)}
        />
        <Divider bgColor={Colors.lightGrey} />
        {order?.orderStatus !== ORDER_STATUS_ENUM.CANCELLED && (
          <DynamicView paddingHorizontal={12} paddingVertical={20}>
            {order?.orderStatus !== ORDER_STATUS_ENUM.COMPLETED && (
              <DishButton
                icon="arrowright"
                variant="primary"
                label="Get directions"
                onPress={openMaps}
              />
            )}
            {order?.orderStatus === ORDER_STATUS_ENUM.COMPLETED && !order?.reviewLeft && (
              <DishButton
                icon="arrowright"
                variant="primary"
                label="Leave a review"
                onPress={async () => {
                  await SheetManager.show('OrderReviewModal', {
                    payload: {
                      order,
                      orderId: order?.id,
                    },
                    onClose: onSheetCloseReview
                  });
                }}
              />
            )}
            {order?.orderStatus !== ORDER_STATUS_ENUM.COMPLETED && (
              <DishButton
                icon="arrowright"
                label="Call restaurant"
                onPress={triggerPhoneCall}
              />
            )}
          </DynamicView>
        )}
      </ScrollView>
    </>
  );
};

export default OrderSummary;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
  },
});
