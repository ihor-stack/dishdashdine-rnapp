import React, {useCallback, useRef, useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {
  DynamicAnimatedView,
  DynamicImage,
  DynamicPressable,
  DynamicText,
  DynamicView,
} from '@/components';
import {ForwardedRefTextInput} from '@/components/DynamicTextInput';
import {Colors, fonts} from '@/themes';
import Card from './Card';
import {styles} from '../styles';
import {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Alert, StyleSheet, TextInput, useWindowDimensions} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import DishButton from '@/components/DishButton';
import {captureErrorException} from '@/utils/error-handler';
import {useDispatch} from 'react-redux';
import {getAllCards, removePaymentMethod} from '@/store/my-wallet/thunk';
import {ICard} from '@/api/generic';
import DishToast from '@/components/DishToast';
import {useToast} from 'native-base';
import DishSpinner from '@/components/DishSpinner';
import {showSuccessMessage} from '@/components/DishFlashMessage';

const whiteRightArrow = require('@/assets/images/myAccount/white-right-arrow.png');
const trash = require('@/assets/images/myAccount/trash.png');
const cardBack = require('@/assets/images/myAccount/card-back.png');

const EditCard = () => {
  const toast = useToast();
  const dispatch = useDispatch<any>();
  const isFocus = useSharedValue(0);
  const params = useRoute().params as any;
  const card: ICard = params?.card;
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const frontCardStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(isFocus.value, [0, 1], [0, 180]);
    return {
      transform: [{perspective: 1000}, {rotateY: `${rotateY}deg`}],
    };
  }, [isFocus.value]);

  const backCardStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(isFocus.value, [0, 1], [0, 180]);
    return {
      transform: [
        {perspective: 1000},
        {rotateY: `${rotateY}deg`},
        {rotateY: '180deg'},
      ],
    };
  }, [isFocus.value]);

  const {bottom, top} = useSafeAreaInsets();
  const {width} = useWindowDimensions();

  const flipCard = useCallback(() => {
    isFocus.value = withTiming(isFocus.value ? 0 : 1);
  }, [isFocus.value]);

  const editCardHolderRef = useRef<TextInput>(null);
  const editCardexpiryDateRef = useRef<TextInput>(null);
  const editCardsecurityCodeRef = useRef<TextInput>(null);

  const onDeleteCard = async () => {
    setIsLoading(true);
    try {
      await dispatch(removePaymentMethod(card.paymentMethodId)).unwrap();
      await dispatch(getAllCards());
      setIsLoading(false);
      toast.show({
        placement: 'top',
        duration: 2000,
        render: () => {
          return (
            showSuccessMessage(
              'Success',
              'Your card has been successfully remove',
            )
          );
        },
        onCloseComplete() {
          navigation.goBack();
        },
      });
    } catch (error) {
      setIsLoading(false);
      captureErrorException(error);
    }
  };

  return (
    <>
      {isLoading && <DishSpinner />}
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        extraScrollHeight={-(bottom + top)}
        style={styles.containter}
        contentContainerStyle={styles.contentContainerStyle}>
        <DynamicView height={200} width={width - 22} marginBottom={20}>
          <DynamicAnimatedView
            {...StyleSheet.absoluteFillObject}
            style={backCardStyle}>
            <DynamicImage
              resizeMode="stretch"
              source={cardBack}
              width={width - 22}
              height={200}
            />
          </DynamicAnimatedView>
          <DynamicAnimatedView
            backfaceVisibility="hidden"
            {...StyleSheet.absoluteFillObject}
            style={frontCardStyle}>
            <Card
              name={card.name}
              brand={card.brand}
              number={card.last4}
              expiry={`${card.expMonth}/${card.expYear}`}
              cvc="•••"
            />
          </DynamicAnimatedView>
        </DynamicView>
        {/* <ForwardedRefTextInput
        fontSize={14}
        lineHeight={19}
        onSubmitEditing={() => {
          editCardHolderRef.current?.focus();
        }}
        fontFamily={fonts.DMSans700Bold}
        marginTop={20}
        borderRadius={4}
        defaultValue={'1234 1234 1234 1234'}
        placeholder={'Card Number'}
        backgroundColor="#F8F8F8"
        paddingHorizontal={21}
        height={40}
        color="#303030"
      />
      <ForwardedRefTextInput
        ref={editCardHolderRef}
        fontSize={14}
        lineHeight={19}
        fontFamily={fonts.DMSans700Bold}
        marginTop={20}
        borderRadius={4}
        defaultValue={'Amy O’Hagan'}
        placeholder={'Card Number'}
        backgroundColor="#F8F8F8"
        paddingHorizontal={21}
        height={40}
        onSubmitEditing={() => {
          editCardexpiryDateRef.current?.focus();
        }}
        color="#303030"
      />
      <ForwardedRefTextInput
        ref={editCardexpiryDateRef}
        fontSize={14}
        lineHeight={19}
        fontFamily={fonts.DMSans700Bold}
        marginTop={20}
        borderRadius={4}
        defaultValue={'01/27'}
        placeholder={'Card Number'}
        backgroundColor="#F8F8F8"
        paddingHorizontal={21}
        height={40}
        color="#303030"
        onSubmitEditing={() => {
          editCardsecurityCodeRef.current?.focus();
        }}
      />
      <ForwardedRefTextInput
        ref={editCardsecurityCodeRef}
        onFocus={flipCard}
        onBlur={flipCard}
        fontSize={14}
        lineHeight={19}
        fontFamily={fonts.DMSans700Bold}
        marginTop={20}
        borderRadius={4}
        defaultValue={'123'}
        placeholder={'Card Number'}
        backgroundColor="#F8F8F8"
        paddingHorizontal={21}
        height={40}
        color="#303030"
      /> */}
        <DynamicView marginTop="auto">
          {/* <DynamicView marginBottom={10}>
          <DishButton variant="primary" icon="arrowright" label="Update Card" />
        </DynamicView> */}
          <DynamicView marginBottom={20}>
            <DishButton
              icon="delete"
              label="Delete Card"
              onPress={onDeleteCard}
            />
          </DynamicView>
        </DynamicView>
      </KeyboardAwareScrollView>
    </>
  );
};

export default EditCard;
