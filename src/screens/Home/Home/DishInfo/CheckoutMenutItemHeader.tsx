import React from 'react';
import {DynamicText, DynamicView} from '@/components';
import {Colors, fonts} from '@/themes';

export interface CheckoutMenutItemHeaderProps {
  quantity?: number;
  itemName?: string;
  itemPrice?: number;
}

const CheckoutMenutItemHeader = ({
  quantity,
  itemName,
  itemPrice,
}: CheckoutMenutItemHeaderProps) => {
  return (
    <>
      <DynamicView flexDirection="row">
        <DynamicView paddingRight={14}>
          <DynamicText
            fontFamily={fonts.DMSans700Bold}
            fontSize={16}
            lineHeight={20.83}
            color={Colors.grey}>
            {quantity}x
          </DynamicText>
        </DynamicView>
        <DynamicText
          fontFamily={fonts.DMSans500Medium}
          fontSize={16}
          lineHeight={20.83}
          color={Colors.black}>
          {itemName}
        </DynamicText>
      </DynamicView>
      <DynamicText
        fontFamily={fonts.DMSans500Medium}
        fontSize={16}
        lineHeight={20.83}
        color={Colors.black}>
        £{Number(itemPrice).toFixed(2)}
      </DynamicText>
    </>
  );
};

export default CheckoutMenutItemHeader;
