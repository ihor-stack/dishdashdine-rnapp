import {View, Text, useWindowDimensions} from 'react-native';
import React from 'react';
import {DynamicImage, DynamicText, DynamicView} from '@/components';
import {Colors, fonts} from '@/themes';
import {PaymentIcon} from 'react-native-payment-icons';

const cardDot = require('@/assets/images/myAccount/card-dot.png');
const masterCard = require('@/assets/images/myAccount/master-card.png');

export interface CardProps {
  name: string;
  brand: string;
  number: string;
  expiry: string;
  cvc: string;
  showMenu?: boolean;
}

const Card = ({name, brand, number, expiry, cvc, showMenu}: CardProps) => {
  const {width} = useWindowDimensions();

  return (
    <DynamicView
      borderRadius={8}
      backgroundColor="#fff"
      borderWidth={1}
      borderColor={Colors.black}
      height={220}
      paddingLeft={30}
      width={width - 22}>
      <DynamicView
        width={'100%'}
        flexDirection="row"
        justifyContent="space-between"
        paddingTop={20}
        paddingRight={20}>
        <PaymentIcon marginTop={10} width={48} height={30} type={brand} />
        {showMenu && <DynamicImage source={cardDot} width={4} height={17} />}
      </DynamicView>
      <DynamicView marginTop={39} marginBottom={12}>
        <DynamicText
          fontFamily={fonts.DMSans500Medium}
          fontSize={18}
          lineHeight={24}
          color={Colors.black}>
          **** **** **** {number}
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
          color={Colors.grey}
          fontFamily={fonts.DMSans500Medium}
          fontWeight="500">
          Card Holder
        </DynamicText>
        <DynamicText
          lineHeight={16}
          fontSize={13}
          color={Colors.grey}
          fontFamily={fonts.DMSans500Medium}
          fontWeight="500">
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
          color={Colors.grey}
          fontFamily={fonts.DMSans500Medium}
          fontWeight="500">
          {name}
        </DynamicText>
        <DynamicView>
          <DynamicText
            lineHeight={16}
            fontSize={13}
            color={Colors.grey}
            fontFamily={fonts.DMSans500Medium}
            fontWeight="500">
            {expiry}
          </DynamicText>
        </DynamicView>
      </DynamicView>
    </DynamicView>
  );
};

export default Card;
