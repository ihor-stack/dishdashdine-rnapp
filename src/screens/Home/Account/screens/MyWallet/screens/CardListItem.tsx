import React from 'react';
import {DynamicText, DynamicView} from '@/components';
import {PaymentIcon} from 'react-native-payment-icons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Colors, fonts} from '@/themes';
import {capitalize} from 'lodash';

export interface CardListItemProps {
  name: string;
  brand: string;
  number: string;
  expiry: string;
  cvc: string;
  icon?: string | null;
  iconColor?: string | null;
}

const CardListItem = ({
  name,
  brand,
  number,
  expiry,
  cvc,
  icon,
  iconColor,
}: CardListItemProps) => {
  return (
    <DynamicView
      backgroundColor={Colors.white}
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      paddingHorizontal={12}
      paddingVertical={16}>
      <DynamicView flexDirection="row" alignItems="center">
        <PaymentIcon width={60} height={40} type={brand} marginRight={12} />
        <DynamicView>
          <DynamicText
            fontFamily={fonts.DMSans500Medium}
            fontSize={16}
            lineHeight={20.83}>
            {capitalize(brand)}
          </DynamicText>
          <DynamicText
            fontFamily={fonts.DMSans400Regular}
            fontSize={13}
            lineHeight={15.62}
            color={Colors.darkGrey}>
            {`•••• •••• •••• ${number}`}
          </DynamicText>
        </DynamicView>
      </DynamicView>
      <AntDesign
        size={23}
        name={icon || 'right'}
        color={iconColor || Colors.black}
      />
    </DynamicView>
  );
};

export default CardListItem;
