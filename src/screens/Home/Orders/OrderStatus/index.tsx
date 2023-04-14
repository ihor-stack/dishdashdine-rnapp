import { ActivityIndicator, Platform, StatusBar, Linking } from 'react-native';
import React, { useEffect, useState } from 'react';

import AntDesign from 'react-native-vector-icons/AntDesign';
import isEmpty from 'lodash/isEmpty';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { showMessage } from 'react-native-flash-message';
import { useDispatch, useSelector } from 'react-redux';
import { filter } from 'lodash';
import moment from 'moment';
import {
  NavigationProp,
  StackActions,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import {
  DynamicImage,
  DynamicPressable,
  DynamicText,
  DynamicView,
} from '@/components';
import { Colors } from '@/themes';
import DishOrderProgress from '@/components/DishOrderProgress';
import DishButton from '@/components/DishButton';
import { IOrder } from '@/api/generic';
import styles from './styles';
import { ORDER_STATUS, ORDER_STATUS_ENUM, ORDER_TYPE } from '@/constants';
import OrderStatusHistory from '@/screens/Home/Orders/OrderStatus/OrderStatusHistory';
import { orderSelectors } from '@/store/order';
import { fetchOrderRestaurant } from '@/store/order/thunk';
import DishSpinner from '@/components/DishSpinner';

const chef = require('@/assets/images/chef.png');
const seasoning = require('@/assets/images/seasoning.png');
const cooking = require('@/assets/images/cooking.png');
const restaurant = require('@/assets/images/restaurant.png');
const delivery = require('@/assets/images/food-delivery.png');

const OrderStatus = () => {
  const [orderStatus, setOrderStatus] = useState<
    keyof typeof ORDER_STATUS | number
  >(0);
  const [isReadyCollection, setIsReadyCollection] = useState(false);
  const [isOutForDelivery, setIsOutForDelivery] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [timer, setTimer] = useState<any>();

  const { top } = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<any>>();
  const dispatch = useDispatch<any>();
  const params = useRoute().params as any;
  const orderId = params?.orderId;
  const isFrom = params?.isFrom;
  const order: IOrder = useSelector(orderSelectors.selectSelectedOrder);
  const isLoading: boolean = useSelector(orderSelectors.loadingSelectedOrder);

  useEffect(() => {
    if (orderId) {
      setIsRefreshing(false);
      dispatch(fetchOrderRestaurant(orderId));
    }
  }, [dispatch]);

  useEffect(() => {
    if (order) {
      setIsRefreshing(false);
    }
  }, [order]);


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

  useEffect(() => {
    if (!isEmpty(order) && !isEmpty(order?.statusHistory)) {
      setOrderStatus(order.orderStatus);
      renderHeaderTitle(order.orderStatus);

      if (order.orderStatus === ORDER_STATUS_ENUM.READY_FOR_COLLECTION) {
        setIsReadyCollection(true);
        setIsOutForDelivery(false);
        setIsCancelled(false);
      } else if (order.orderStatus === ORDER_STATUS_ENUM.OUT_FOR_DELIVERY) {
        setIsReadyCollection(false);
        setIsOutForDelivery(true);
        setIsCancelled(false);
      } else if (order.orderStatus === ORDER_STATUS_ENUM.COMPLETED) {
        setIsReadyCollection(false);
        setIsOutForDelivery(false);
        setIsCancelled(false);
      } else if (order.orderStatus === ORDER_STATUS_ENUM.CANCELLED) {
        setIsReadyCollection(false);
        setIsOutForDelivery(false);
        setIsCancelled(true);
      }
    }
  }, [order]);

  const triggerPhoneCall = () => {
    let phoneNumber = '';

    if (order.restaurant) {
      if (isEmpty(order.restaurant.phone)) {
        return showMessage({
          message: 'WARNING!',
          description:
            'Unable to initiate call as no restaurant contact number found!',
          type: 'warning',
        });
      }

      if (Platform.OS === 'android') {
        phoneNumber = `tel:${order.restaurant.phone}`;
      } else {
        phoneNumber = `telprompt:${order.restaurant.phone}`;
      }
    } else {
      return showMessage({
        message: 'WARNING!',
        description: 'No restaurant found associated to this order!',
        type: 'warning',
      });
    }

    Linking.openURL(phoneNumber);
  };

  const renderImage = () => {
    switch (orderStatus) {
      case 1:
        return <DynamicImage width={150} height={150} source={chef} />;
      case 2:
        return <DynamicImage width={150} height={150} source={seasoning} />;
      case 3:
        return <DynamicImage width={150} height={150} source={cooking} />;
      default:
        return <DynamicView width={150} height={150} />;
    }
  };

  const renderHeaderTitle = (status: keyof typeof ORDER_STATUS): string => {
    return ORDER_STATUS[status] as string;
  };

  const readyForCollectionView = () => {
    return (
      <>
        <DynamicImage width={150} height={150} source={restaurant} />
        <DynamicView paddingTop={33}>
          <DynamicText style={styles.orderStatusDesc}>
            Your order number is,{'\n'} {order?.reference?.slice(-6)}
          </DynamicText>
        </DynamicView>
        <DynamicView paddingTop={10}>
          <DynamicText style={styles.colorGreyText}>
            (Quote this when you arrive at the restaurant)
          </DynamicText>
        </DynamicView>
      </>
    );
  };

  const readyForDeliveryView = () => {
    return (
      <>
        <DynamicImage width={150} height={150} source={delivery} />
        <DynamicView paddingTop={33}>
          <DynamicText style={styles.orderStatusDesc}>
            Your delivery is on,{'\n'} its way
          </DynamicText>
        </DynamicView>
        <DynamicView paddingTop={10}>
          <DynamicText style={styles.colorGreyText}>
            (Estimated delivery time: 18:45)
          </DynamicText>
        </DynamicView>
      </>
    );
  };

  const orderCancelView = () => {
    return (
      <>
        <DynamicImage width={150} height={150} source={restaurant} />
        <DynamicView paddingTop={33}>
          <DynamicText style={styles.orderStatusDesc}>
            Your order has been cancelled
          </DynamicText>
        </DynamicView>
        <DynamicView paddingTop={10}>
          <DynamicText style={styles.colorGreyText}>
            We had to cancel your order; don't worry, you'll be be refunded.
            {'\n'} See you next time!
          </DynamicText>
        </DynamicView>
      </>
    );
  };

  const renderHeaderBarTitle = () => {
    return (
      <DynamicView
        style={{
          ...styles.headerContainerView,
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingTop: Math.max(top, 16),
          paddingHorizontal: 18,
        }}>
        <DynamicView flex={1}>
          <DynamicPressable
            onPress={() => {
              if (isFrom === 'order-payment') {
                navigation.dispatch(StackActions.popToTop());
              } else {
                navigation.goBack();
              }
            }}>
            <AntDesign size={23} name="close" color={Colors.black} />
          </DynamicPressable>
        </DynamicView>

        <DynamicView>
          <DynamicText style={styles.headerTitle}>
            {renderHeaderTitle(orderStatus as keyof typeof ORDER_STATUS)}
          </DynamicText>
        </DynamicView>
        <DynamicView flex={1} />
        <DynamicView />
      </DynamicView>
    );
  };

  const onNavigateOrderSummary = () => {
    navigation.navigate('OrderSummary', {
      order,
      orderId,
    });
  };

  return (
    <>
      <StatusBar barStyle={'dark-content'} />
      {isLoading && !isRefreshing ? (
        <DishSpinner />
      ) : (
        <DynamicView flex={1} backgroundColor={Colors.white}>
          {renderHeaderBarTitle()}
          <DynamicView
            alignItems="center"
            paddingTop={28}
            paddingBottom={48}
            backgroundColor={Colors.white}>
            {isReadyCollection
              ? readyForCollectionView()
              : isOutForDelivery
                ? readyForDeliveryView()
                : isCancelled
                  ? orderCancelView()
                  : renderImage()}
          </DynamicView>
          {!isReadyCollection && !isOutForDelivery && !isCancelled && (
            <>
              <DynamicView backgroundColor={Colors.white}>
                <DishOrderProgress steps={4} activeIndex={orderStatus - 1} />
                <DynamicView marginLeft={10} marginTop={21}>
                  <DynamicText style={styles.orderTitleText}>
                    {renderHeaderTitle(
                      orderStatus as keyof typeof ORDER_STATUS,
                    )}
                  </DynamicText>
                </DynamicView>
              </DynamicView>
              {!isEmpty(order) &&
                order.orderStatus !== ORDER_STATUS_ENUM.NEW && (
                  <OrderStatusHistory
                    statusHistory={filter(
                      order.statusHistory,
                      item => item.orderStatus !== ORDER_STATUS_ENUM.NEW,
                    )}
                  />
                )}
            </>
          )}
          <ActivityIndicator
            animating={isRefreshing}
            size="large"
            color={Colors.ember}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />
          <DynamicView
            paddingHorizontal={10}
            marginTop="auto"
            backgroundColor={Colors.white}
            paddingTop={81}>
            {!isReadyCollection && !isOutForDelivery && !isCancelled && (
              <DynamicView alignItems="center">
                {!isEmpty(order) && order.collectionTime && (
                  <DynamicText style={styles.colorGreyText}>
                    Estimated{' '}
                    {order.orderType === ORDER_TYPE.COLLECTION
                      ? 'collection'
                      : 'delivery'}
                    :{' '}
                    {moment(order.collectionTime)
                      .utc()
                      .format('DD/MM/YYYY, hh:mm a')}
                  </DynamicText>
                )}
              </DynamicView>
            )}
            <DynamicView paddingBottom={19}>
              <DishButton
                icon="arrowright"
                label="Order summary"
                onPress={onNavigateOrderSummary}
                variant="primary"
              />
              {!isEmpty(order) &&
                order.orderStatus !== ORDER_STATUS_ENUM.CANCELLED && (
                  <DishButton
                    icon="arrowright"
                    label="Call restaurant"
                    onPress={triggerPhoneCall}
                  />
                )}
            </DynamicView>
          </DynamicView>
        </DynamicView>
      )}
    </>
  );
};

export default OrderStatus;
