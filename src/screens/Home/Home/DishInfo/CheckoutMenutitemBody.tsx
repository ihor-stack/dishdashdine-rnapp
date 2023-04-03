import React, {useId} from 'react';
import {DynamicText, DynamicView} from '@/components';
import {Colors, fonts} from '@/themes';
import {IOrderItemModifierGroupSelection} from '@/api/generic';

export interface CheckoutMenutitemBodyProps {
  order: IOrderItemModifierGroupSelection[];
}

const CheckoutMenutitemBody = ({order}: CheckoutMenutitemBodyProps) => {
  const selectedModGroup = order;
  const id = useId();
  return (
    <DynamicView marginHorizontal={11} paddingTop={3}>
      {selectedModGroup.map((mod, index) => {
        return (
          <DynamicView key={`${id}-${index}-body`}>
            <DynamicText
              fontFamily={fonts.DMSans700Bold}
              fontSize={13}
              lineHeight={15.62}
              color={Colors.grey}>
              {mod.modifierGroupName}:
            </DynamicText>
            {mod.selectedItems?.map((modItems, index) => {
              if (modItems.quantity > 0) {
                return (
                  <DynamicView
                    key={`${id}-selectedItem-${index}`}
                    marginLeft={7}
                    marginVertical={3}
                    flexDirection="row"
                    justifyContent="space-between">
                    <DynamicText
                      fontFamily={fonts.DMSans400Regular}
                      fontSize={13}
                      lineHeight={15.62}
                      color={Colors.grey}>
                      {modItems.quantity}x {modItems.modifierGroupItemName}
                    </DynamicText>
                    {
                      modItems.total > 0 ? 
                        <DynamicText
                          fontFamily={fonts.DMSans400Regular}
                          fontSize={13}
                          lineHeight={15.62}
                          color={Colors.grey}>
                          + £{modItems.total.toFixed(2)}
                        </DynamicText> : null
                    }
                  </DynamicView>
                );
              } else {
                return null;
              }
            })}
          </DynamicView>
        );
      })}
    </DynamicView>
  );
};

export default CheckoutMenutitemBody;
