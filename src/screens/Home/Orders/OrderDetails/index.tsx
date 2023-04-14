import React, {useEffect, useState} from 'react';
import {LogBox} from 'react-native';

import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {each, isEmpty} from 'lodash';
import {confirmPayment, initStripe} from '@stripe/stripe-react-native';
import {useToast} from 'native-base';

import {ICard, IOrder} from '@/api/generic';
import {
  addOrderPaymentMethod,
  addOrderPreferrence,
  addOrderTip,
  fetchActiveOrder,
  fetchCompletedOrder,
  fetchOrderRestaurant,
  orderCollectionTime,
  setOrderAddress,
  setOrderOrderType,
} from '@/store/order/thunk';
import {captureErrorException} from '@/utils/error-handler';
import {cardSelectors} from '@/store/my-wallet';
import {addressSelectors} from '@/store/address';
import {Merchant_Identifier} from '@/constants';
import {homeSelectors} from '@/store/home';
import OrderDetailsView from '@/screens/Home/Orders/OrderDetails/View';
import OrderService from '@/api/order';
import {orderSelectors} from '@/store/order';
import {
  showSuccessMessage,
  showWarningMessage,
} from '@/components/DishFlashMessage';
import {CardParams} from '@stripe/stripe-react-native/lib/typescript/src/types/PaymentMethod';

const OrderDetails = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<any>();
  const toast = useToast();
  const params = useRoute().params as any;
  const _order = params.order;

  const [order, setOrder] = useState<IOrder>({});
  const [tipAmount, setTipAmount] = useState<number>(0);
  const [collectDate, setCollectDate] = useState(new Date());
  const [collectionTime, setCollectionTime] = useState<any>({
    collectNow: true,
    collectLaterAt: null,
  });
  const [reqNapkins, setReqNapkins] = useState<boolean>(false);
  const [reqUtensils, setReqUtensils] = useState<boolean>(false);
  const [collectIndex, setCollectIndex] = useState<number>(1);
  const [paymentMethodId, setPaymentMethodId] = useState<string>();
  const [address, setAddress] = useState('');
  const mywallets: ICard[] = useSelector(cardSelectors.selectMyWallet);
  const myAddresses = useSelector(addressSelectors.selectMyAddress);
  const orderType = useSelector(homeSelectors.showOrderType);
  const selectedOrder = useSelector(orderSelectors.selectSelectedOrder);

  useEffect(() => {
    if (selectedOrder && selectedOrder?.restaurant) {
      const currentDate = new Date();
      const prepTimeMax = selectedOrder?.restaurant?.prepTimeMax;
      const prepTimeMin = selectedOrder?.restaurant?.prepTimeMax;
      const minutes = prepTimeMax || prepTimeMin || 0;
      currentDate.setMinutes(currentDate.getMinutes() + minutes);
      setCollectDate(currentDate);
    }
  }, [selectedOrder]);

  useEffect(() => {
    if (myAddresses) {
      const _address = myAddresses.find((addr: any) => addr.default);
      setAddress(String(_address?.id));
    }
  }, [myAddresses]);

  useEffect(() => {
    if (!isEmpty(_order) && _order.id === selectedOrder.id) {
      setOrder(selectedOrder);
      setTipAmount(selectedOrder.tip);
    }

  }, [selectedOrder, order]);

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

    initOrder();
  }, []);

  const onSelectedTip = async (amount: number) => {
    // setTipAmount(amount);
    try {
      setIsLoading(true);
      await dispatch(addOrderTip({id: order.id, data: {tipAmount: amount}}));
      await dispatch(fetchOrderRestaurant(order.id));
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      captureErrorException(e);
    }
  };

  const initOrder = async () => {
    await dispatch(fetchOrderRestaurant(_order.id)).unwrap();
  };

  const handleErrorToast = (message: string) => {
    showWarningMessage('Warning', message);
  };

  const onCheckOutOrder = async () => {
    if (isEmpty(myAddresses)) {
      showWarningMessage(
        'WARNING!',
        'An address must be set to complete the checkout',
      );
      return;
    }

    if (isEmpty(paymentMethodId)) {
      showWarningMessage(
        'WARNING!',
        'A Payment Method must be set to complete the checkout',
      );
      return;
    }

    if (isEmpty(mywallets)) {
      showWarningMessage(
        'WARNING!',
        'Please add a card to set as payment method for checkout',
      );
      return;
    }

    try {
      setIsLoading(true);
      // SET ADDRESS
      await dispatch(
        setOrderAddress({id: order.id, data: {existingAddressId: address}}),
      );

      // SET COLLECTION TIME
      await dispatch(orderCollectionTime({id: order.id, data: collectionTime}));

      // SET ORDER TYPE
      await dispatch(setOrderOrderType({id: order.id, data: {orderType}}));

      // SET PREFERRENCE
      await dispatch(
        addOrderPreferrence({
          id: order.id,
          data: {utensils: reqUtensils, napkins: reqNapkins},
        }),
      );

      // SET TIP ORDER
      // await dispatch(addOrderTip({id: order.id, data: {tip: tipAmount}}));

      // SET PAYMENT METHOD
      await dispatch(
        addOrderPaymentMethod({id: order.id, data: {paymentMethodId}}),
      ).unwrap();

      const response = await OrderService.checkOutOrder(order.id);

      if (response) {
        await initStripe({
          publishableKey: response?.publishableKey,
          merchantIdentifier: Merchant_Identifier,
        });

        const {error, paymentIntent} = await confirmPayment(
          response.paymentIntentSecret,
          {
            paymentMethodType: 'Card',
            paymentMethodData: {paymentMethodId},
          } as CardParams,
        );

        if (error) {
          captureErrorException(error);
          showWarningMessage(error.code, error.message);
        } else {
          await dispatch(fetchActiveOrder());
          await dispatch(fetchCompletedOrder());

          if (paymentIntent.status === 'Succeeded') {

            toast.show({
              placement: 'top',
              duration: 1500,
              render: () => {
                showSuccessMessage(
                  'Thanks for your order',
                  'You just completed your payment.',
                );

                return null;
              },
              onCloseComplete: () => {
                navigation.navigate('OrderStatus', {
                  orderId: order.id,
                  isFrom: 'order-payment',
                });
              },
            });
          }
        }
      }
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      captureErrorException(error);
      await dispatch(fetchActiveOrder());
      await dispatch(fetchCompletedOrder());
      if (error?.errors) {
        const errs = error.errors;
        each(
          errs,
          (
            {description}: {code: string; description: string},
            index: number,
          ) => {
            setTimeout(() => {
              handleErrorToast(description);
            }, 600 * index);
          },
        );
      } else {
        if (error['RestaurantId']) {
          return handleErrorToast(error['RestaurantId'][0]);
        } else if (error['OrderLineItems']) {
          return handleErrorToast(error['OrderLineItems'][0]);
        } else {
          return handleErrorToast(
            'An error occured while checking out the order',
          );
        }
      }
    }
  };

  return (
    <OrderDetailsView
      isLoading={isLoading}
      order={order}
      orderType={orderType}
      reqUtensils={reqUtensils}
      reqNapkins={reqNapkins}
      setReqUtensils={setReqUtensils}
      setReqNapkins={setReqNapkins}
      setTipAmount={setTipAmount}
      collectIndex={collectIndex}
      collectDate={collectDate}
      setCollectIndex={setCollectIndex}
      setCollectDate={setCollectDate}
      setCollectionTime={setCollectionTime}
      setPaymentMethodId={setPaymentMethodId}
      tipAmount={tipAmount}
      onCheckOutOrder={onCheckOutOrder}
      onSelectedTip={onSelectedTip}
    />
  );
};

export default OrderDetails;
