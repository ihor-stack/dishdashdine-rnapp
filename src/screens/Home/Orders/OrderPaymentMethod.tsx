import React, {useEffect, useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import {DynamicPressable, DynamicText, DynamicView} from '@/components';
import {Colors, fonts} from '@/themes';
import {ICard} from '@/api/generic';
import {useSelector} from 'react-redux';
import {cardSelectors} from '@/store/my-wallet';
import {SheetManager} from 'react-native-actions-sheet';
import {PaymentIcon} from 'react-native-payment-icons';
import {captureErrorException} from '@/utils/error-handler';
import {isEmpty} from 'lodash';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export interface OrderPaymentMethodProps {
  onSelectedPaymentMethod?: (item: any) => any;
  allowChangePaymentMethod?: boolean;
  paymentMethodId?: string;
  showLoading?: boolean;
}

const OrderPaymentMethod = ({
  onSelectedPaymentMethod,
  allowChangePaymentMethod,
  paymentMethodId,
  showLoading,
}: OrderPaymentMethodProps) => {
  const [last4, setLast4] = useState<string>('****');
  const [brand, setBrand] = useState<string>('');
  const mywallets: ICard[] = useSelector(cardSelectors.selectMyWallet);

  const onChangePaymentMethod = async () => {
    try {
      const result: any = await SheetManager.show('PaymentMethodListModal');
      const def = mywallets.find(card => card.default);
      if (def) {
        setLast4(String(def?.last4));
        setBrand(String(def?.brand));
      }
      if (onSelectedPaymentMethod) {
        onSelectedPaymentMethod(result);
      }
    } catch (error) {
      captureErrorException(error);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!isEmpty(paymentMethodId)) {
      if (!isEmpty(mywallets)) {
        const def = mywallets.find(
          card => card.paymentMethodId === paymentMethodId,
        );
        if (def) {
          setLast4(String(def?.last4));
          setBrand(String(def?.brand));
        }
        if (onSelectedPaymentMethod) {
          onSelectedPaymentMethod(paymentMethodId);
        }
      }
    } else {
      if (!isEmpty(mywallets)) {
        const def = mywallets.find(card => card.default);
        if (def) {
          setLast4(String(def?.last4));
          setBrand(String(def?.brand));
        } else {
          setLast4(String(mywallets[0]?.last4));
          setBrand(String(mywallets[0]?.brand));

          if (onSelectedPaymentMethod) {
            onSelectedPaymentMethod(mywallets[0].paymentMethodId);
          }
        }
      }
    }
  });

  const renderPaymentMethodView = () => (
    <DynamicView alignItems="center" flexDirection="row">
      <DynamicView marginRight={8}>
        <PaymentIcon width={48} height={30} type={brand} marginRight={8} />
      </DynamicView>
      <DynamicText
        fontFamily={fonts.DMSans500Medium}
        fontSize={18}
        lineHeight={23.44}>
        **** **** **** {!isEmpty(last4) ? last4 : ''}
      </DynamicText>
    </DynamicView>
  );

  const renderPaymentMethodLoading = () => (
    <SkeletonPlaceholder>
      <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
        <SkeletonPlaceholder.Item width={60} height={40} borderRadius={4} />
        <SkeletonPlaceholder.Item marginLeft={8}>
          <SkeletonPlaceholder.Item width={220} height={20} borderRadius={4} />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );

  return (
    <DynamicView paddingVertical={20} paddingHorizontal={12}>
      <DynamicView
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center">
        <DynamicText
          fontFamily={fonts.DMSans500Medium}
          fontSize={16}
          lineHeight={20.83}>
          Payment method
        </DynamicText>
        {allowChangePaymentMethod && (
          <DynamicPressable onPress={onChangePaymentMethod}>
            <DynamicText
              fontFamily={fonts.DMSans500Medium}
              fontSize={13}
              lineHeight={15.62}
              color={Colors.ember}>
              Change payment method
            </DynamicText>
          </DynamicPressable>
        )}
      </DynamicView>
      <DynamicView
        flexDirection="row"
        justifyContent="space-between"
        marginTop={16}>
        {showLoading ? renderPaymentMethodLoading() : renderPaymentMethodView()}
        {allowChangePaymentMethod && (
          <DynamicView
            backgroundColor={Colors.lightGrey}
            borderRadius={999}
            width={32}
            height={32}
            justifyContent="center"
            alignItems="center">
            <Entypo
              name="chevron-small-right"
              color={Colors.black}
              size={29}
              onPress={onChangePaymentMethod}
            />
          </DynamicView>
        )}
      </DynamicView>
    </DynamicView>
  );
};

export default OrderPaymentMethod;
