import {FlatList, StyleSheet, Dimensions} from 'react-native';
import React, {useRef, useState} from 'react';
import ActionSheet, {
  ActionSheetRef,
  SheetManager,
  SheetProps,
  useScrollHandlers,
} from 'react-native-actions-sheet';
import {DynamicPressable, DynamicText, DynamicView} from '@/components';
import {ICard, IOrder} from '@/api/generic';
import {cardSelectors, setDefaultPaymentMethod} from '@/store/my-wallet';
import {useDispatch, useSelector} from 'react-redux';
import CardListItem from '../Account/screens/MyWallet/screens/CardListItem';
import {Divider, useToast} from 'native-base';
import {Colors, fonts} from '@/themes';
import DishButton from '@/components/DishButton';
import {captureErrorException} from '@/utils/error-handler';
import {isEmpty} from 'lodash';
import {useNavigation} from '@react-navigation/native';

export interface PaymentMethodListModalProps extends SheetProps {}

const PaymentMethodListModal = (props: PaymentMethodListModalProps) => {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const scrollHandlers = useScrollHandlers<FlatList>(
    'scrollview-1',
    actionSheetRef,
  );
  const navigation = useNavigation<any>();
  const mywallets: ICard[] = useSelector(cardSelectors.selectMyWallet);
  const dispatch = useDispatch<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethodId, setPaymentMethodId] = useState<string>();
  const [wallets, setWallets] = useState<ICard[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<IOrder>({});

  const onAddPaymentMethod = async () => {
    if (isEmpty(mywallets)) {
      await SheetManager.hide('PaymentMethodListModal', {
        payload: paymentMethodId,
      });
      navigation.navigate('MyWallet');
    }

    if (isEmpty(paymentMethodId)) {
      return;
    }

    setIsLoading(true);
    try {
      await dispatch(setDefaultPaymentMethod(wallets));
      setTimeout(() => {
        setIsLoading(false);
        SheetManager.hide('PaymentMethodListModal', {
          payload: paymentMethodId,
        });
      }, 1000);
    } catch (error) {
      setIsLoading(false);
      captureErrorException(error);
    }
  };

  const onCardPress = (card: ICard) => {
    let newData = [...mywallets];
    newData = newData.map((item: ICard) => {
      if (item.paymentMethodId === card.paymentMethodId) {
        setPaymentMethodId(card.paymentMethodId);
        return {
          ...item,
          default: true,
        };
      } else {
        return {
          ...item,
          default: false,
        };
      }
    });
    setTimeout(() => {
      SheetManager.hide('PaymentMethodListModal', {
        payload: paymentMethodId,
      });
    }, 1000);
    setWallets(newData);
  };

  const renderItem = ({item, index}: {item: ICard; index: number}) => {
    return (
      <DynamicPressable onPress={() => onCardPress(item)} key={index}>
        <CardListItem
          name={item.name}
          brand={item.brand}
          number={item.last4}
          expiry={`${item.expMonth}/${item.expYear}`}
          cvc="•••"
          icon={item.default ? 'check' : null}
          iconColor={item.default ? Colors.success : null}
        />
      </DynamicPressable>
    );
  };

  return (
    <ActionSheet
      ref={actionSheetRef}
      id={'PaymentMethodListModal' || props.sheetId}
      onBeforeShow={(data: any) => {
        setSelectedOrder(data?.order);
        setWallets(mywallets);
      }}
      gestureEnabled>
      <FlatList
        {...scrollHandlers}
        style={styles.Flatlist}
        contentContainerStyle={styles.container}
        data={wallets}
        renderItem={renderItem}
        keyExtractor={item => item.paymentMethodId}
        ListHeaderComponent={() => (
          <DynamicView marginBottom={40} paddingHorizontal={11}>
            <DynamicText
              fontFamily={fonts.DMSans500Medium}
              fontSize={24}
              lineHeight={31.25}>
              Select a Payment Method
            </DynamicText>
          </DynamicView>
        )}
        ItemSeparatorComponent={() => <Divider bgColor={Colors.lightGrey} />}
      />
      <DynamicView marginTop="auto" marginBottom={20} paddingHorizontal={11}>
        <DishButton
          icon="arrowright"
          variant="primary"
          showSpinner={isLoading}
          onPress={onAddPaymentMethod}
          label="Add Payment Method"
        />
        <DishButton
          showIcon={false}
          onPress={() => {
            SheetManager.hide('PaymentMethodListModal');
          }}
          label="Close"
        />
      </DynamicView>
    </ActionSheet>
  );
};

export default PaymentMethodListModal;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 20,
    paddingHorizontal: 11,
  },
  Flatlist: {
    minHeight: Dimensions.get('window').height - 110,
    backgroundColor: '#fff',
  },
});
