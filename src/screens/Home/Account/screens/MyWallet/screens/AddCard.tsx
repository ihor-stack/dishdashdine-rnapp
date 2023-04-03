import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import React, {useState} from 'react';

import {NavigationProp, useNavigation} from '@react-navigation/native';
import {
  CardField,
  confirmSetupIntent,
  initStripe,
} from '@stripe/stripe-react-native';
import {useToast} from 'native-base';

import {DynamicTextInput, DynamicView} from '@/components';
import {MyWalletStackParamList} from '../navigation/Navigation';
import {styles} from '../styles';
import {useDispatch, useSelector} from 'react-redux';
import {accountSelectors} from '@/store/account';
import DishButton from '@/components/DishButton';
import {lowerCase} from 'lodash';
import {Colors, fonts} from '@/themes';
import DishSpinner from '@/components/DishSpinner';
import {captureErrorException} from '@/utils/error-handler';
import {cardSelectors} from '@/store/my-wallet';
import {getAllCards, initiateCardCapture} from '@/store/my-wallet/thunk';
import Card from './Card';
import {Merchant_Identifier} from '@/constants';
import {
  showErrorMessage,
  showSuccessMessage,
  showWarningMessage,
} from '@/components/DishFlashMessage';

const AddCard = () => {
  const {width} = useWindowDimensions();

  const user = useSelector(accountSelectors.selectCurrentUser);
  const cardCapture = useSelector(cardSelectors.selectCardCapture);
  const dispatch = useDispatch<any>();
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [cardBrand, setCardBrand] = useState<any>('');
  const [last4, setLast4] = useState<string>('');
  const [expiryMonth, setExpiryMonth] = useState<number>();
  const [expiryYear, setExpiryYear] = useState<number>();
  const [expiry, setExpiry] = useState<string>('');
  const [cardName, setCardName] = useState<string>('');
  const [cvc, setCVC] = useState<string>('');

  const {goBack} = useNavigation<NavigationProp<MyWalletStackParamList>>();

  const onAddCardPress = async () => {
    try {
      setIsLoading(true);

      const {setupIntentSecret, publishableKey} = await dispatch(
        initiateCardCapture(),
      ).unwrap();

      await initStripe({
        publishableKey: String(publishableKey),
        merchantIdentifier: Merchant_Identifier,
      });

      const {setupIntent, error} = await confirmSetupIntent(
        String(setupIntentSecret),
        {
          paymentMethodType: 'Card',
          paymentMethodData: {
            billingDetails: {
              name: cardName,
              email: user?.email,
              phone: user?.phoneNumber,
            },
          },
        },
      );
      setIsLoading(false);
      if (error) {
        captureErrorException(error);
        showWarningMessage(error.code, error.message);
        return;
      }

      await dispatch(getAllCards());

      toast.show({
        placement: 'top',
        duration: 2000,
        render: () =>
          showSuccessMessage(
            setupIntent.status,
            'Your card has been successfully added',
          ),
        onCloseComplete() {
          goBack();
        },
      });
    } catch (error: any) {
      captureErrorException(error);
      setIsLoading(false);
      showErrorMessage('Error', error.message);
    }
  };

  return (
    <>
      {isLoading && <DishSpinner />}
      <KeyboardAvoidingView
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.containter}
          contentContainerStyle={styles.contentContainerStyle}>
          <DynamicView height={200} width={width - 22} alignItems="center">
            <Card
              name={cardName}
              brand={lowerCase(cardBrand)}
              number={last4}
              expiry={expiry}
              cvc={cvc}
            />
          </DynamicView>

          <DynamicTextInput
            marginTop={50}
            borderRadius={4}
            placeholder={'Card Holder'}
            placeholderTextColor={Colors.grey}
            backgroundColor="#F8F8F8"
            paddingHorizontal={21}
            height={40}
            fontSize={14}
            lineHeight={18.23}
            fontFamily={fonts.DMSans700Bold}
            color="#303030"
            onChangeText={setCardName}
          />
          <CardField
            postalCodeEnabled={false}
            placeholders={{
              number: '•••• •••• •••• ••••',
            }}
            cardStyle={styles.cardStyle}
            style={styles.cardView}
            onCardChange={card => {
              if (card.validNumber === 'Valid' && card?.last4) {
                setLast4(card.last4);
              } else {
                setLast4('');
              }

              if (card?.brand) {
                if (card.brand === 'AmericanExpress') {
                  setCardBrand('american-express');
                } else {
                  setCardBrand(card.brand);
                }
              }

              if (card?.expiryMonth) {
                setExpiryMonth(card.expiryMonth);
              }

              if (card?.expiryYear) {
                setExpiryYear(card.expiryYear);
              }

              if (card.validExpiryDate === 'Valid') {
                setExpiry(`${card.expiryMonth}/${card.expiryYear}`);
              }
            }}
          />

          <DynamicView marginTop="auto" marginBottom={20} paddingVertical={12}>
            <DishButton
              variant="primary"
              label="Add Card"
              onPress={onAddCardPress}
              icon="arrowright"
            />
          </DynamicView>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default AddCard;
