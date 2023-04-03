import {
  DynamicView,
  DynamicText,
  DynamicPressable,
  DynamicImage,
} from '@/components';
import {Colors, fonts} from '@/themes';
import React from 'react';
import {useWindowDimensions} from 'react-native';
import {PaymentIcon} from 'react-native-payment-icons';

const cardDot = require('@/assets/images/myAccount/card-dot.png');
const masterCard = require('@/assets/images/myAccount/master-card.png');

export interface DishCardProps {
  last4?: string;
  expiryMonth?: string;
  expiryYear?: string;
  brand?: any | string;
  postalCode?: string;
  name?: string;
  cvc?: string;
}

const DishCard = (props: DishCardProps) => {
  const {width} = useWindowDimensions();
  const {last4, expiryMonth, expiryYear, brand, name, cvc} = props;

  return (
    <DynamicView
      borderRadius={8}
      backgroundColor="#fff"
      borderWidth={1}
      borderColor={Colors.black}
      height={200}
      paddingLeft={30}
      marginBottom={20}
      width={width - 22}>
      <DynamicView
        width={'100%'}
        flexDirection="row"
        justifyContent="space-between"
        paddingTop={20}
        paddingRight={20}
        marginTop={10}>
        {/* <DynamicImage
          source={masterCard}
          marginTop={10}
          width={48}
          height={30}
        /> */}
        <PaymentIcon type={brand} width={48} height={30} />
        <DynamicImage source={cardDot} width={4} height={17} />
      </DynamicView>
      <DynamicView marginTop={39} marginBottom={12}>
        <DynamicText
          fontFamily={fonts.DMSans500Medium}
          fontSize={18}
          lineHeight={24}
          color={Colors.black}>
          {last4 && '**** **** ****'} {last4}
        </DynamicText>
      </DynamicView>
      <DynamicView
        flexDirection="row"
        marginBottom={4}
        justifyContent="space-between"
        width={165}>
        <DynamicText
          lineHeight={16}
          fontSize={13}
          color={'rgba(48, 48, 48, 0.3)'}>
          Card Holder
        </DynamicText>
        <DynamicText
          lineHeight={16}
          fontSize={13}
          color={'rgba(48, 48, 48, 0.3)'}>
          Expires
        </DynamicText>
      </DynamicView>
      <DynamicView
        flexDirection="row"
        justifyContent="space-between"
        width={165}>
        <DynamicText
          lineHeight={16}
          fontSize={13}
          color={'background: rgba(48, 48, 48, 0.6)'}>
          {name}
        </DynamicText>
        <DynamicView width={38}>
          <DynamicText
            lineHeight={16}
            fontSize={13}
            color={'background: rgba(48, 48, 48, 0.6)'}>
            {expiryMonth}/{expiryYear}
          </DynamicText>
        </DynamicView>
      </DynamicView>
    </DynamicView>
  );
};

export default DishCard;
