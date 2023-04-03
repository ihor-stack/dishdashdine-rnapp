import React, {useEffect, useState} from 'react';
import {DynamicText, DynamicTextInput, DynamicView} from '@/components';
import {Colors, fonts} from '@/themes';
import DishButton from '@/components/DishButton';
import ActionSheet, {
  SheetManager,
  SheetProps,
} from 'react-native-actions-sheet';
import {useDispatch} from 'react-redux';
import {addOrderPromocode} from '@/store/order/thunk';
import {IOrder} from '@/api/generic';
import {useNavigation} from '@react-navigation/native';

export interface PromoCodeModalProps extends SheetProps {}

const PromoCodeModal = (props: PromoCodeModalProps) => {
  const navigation = useNavigation();
  const [value, setValue] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [selectedOrder, setSelectedOrder] = useState<IOrder>({});

  useEffect(() => {
    setValue(selectedOrder.id);
  }, []);

  const onApplyPromoCode = async () => {
    setIsLoading(true);
    await dispatch(
      addOrderPromocode({
        id: selectedOrder.id,
        data: {
          promoCode: value,
        },
      }),
    );

    setIsLoading(false);
    await SheetManager.hide('PromoCodeModal');
  };

  return (
    <ActionSheet
      id={'PromoCodeModal' || props.sheetId}
      gestureEnabled
      onBeforeShow={(data: any) => {
        setSelectedOrder(data?.order);
      }}>
      <DynamicView paddingHorizontal={12}>
        <DynamicView paddingVertical={15}>
          <DynamicText
            fontFamily={fonts.DMSans500Medium}
            fontSize={18}
            lineHeight={23.44}
            color={Colors.black}>
            Add Promo code
          </DynamicText>
        </DynamicView>
        <DynamicView>
          <DynamicTextInput
            testID="@test-id/login-input-email"
            placeholder="Promo Code"
            placeholderTextColor={Colors.grey}
            backgroundColor={Colors.lightestGrey}
            marginTop={4}
            borderRadius={4}
            paddingHorizontal={21}
            paddingVertical={11}
            fontSize={14}
            onChangeText={setValue}
            lineHeight={19}
            fontFamily={fonts.DMSans400Regular}
            fontWeight="400"
            color={Colors.black}
          />
        </DynamicView>
        <DynamicView marginTop={20} marginBottom={20}>
          <DishButton
            icon={'arrowright'}
            variant="primary"
            showSpinner={isLoading}
            onPress={onApplyPromoCode}
            label="Apply Promo Code"
          />
        </DynamicView>
      </DynamicView>
    </ActionSheet>
  );
};

export default PromoCodeModal;
