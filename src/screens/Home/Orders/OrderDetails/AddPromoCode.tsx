import React from 'react';
import {DynamicPressable, DynamicText, DynamicView} from '@/components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {Colors, fonts} from '@/themes';
import {SheetManager} from 'react-native-actions-sheet';
import {IOrder} from '@/api/generic';

export interface AddPromoCodeProps {
  order: IOrder;
}

const AddPromoCode = ({order}: AddPromoCodeProps) => {
  const onAddPromoCode = async () => {
    SheetManager.show('PromoCodeModal', {
      payload: {
        order,
      },
    });
  };

  return (
    <DynamicPressable
      flexDirection="row"
      justifyContent="space-between"
      paddingVertical={20}
      paddingHorizontal={12}
      alignItems="center"
      onPress={onAddPromoCode}>
      <DynamicView flexDirection="row" alignItems="center">
        <Ionicons name="pricetag" color={Colors.ember} size={20} />
        <DynamicView marginLeft={11}>
          <DynamicText
            fontFamily={fonts.DMSans500Medium}
            fontSize={15}
            lineHeight={18}
            color={Colors.black}>
            Add promo code
          </DynamicText>
        </DynamicView>
      </DynamicView>
      <DynamicView backgroundColor={Colors.lightGrey} borderRadius={100}>
        <Entypo name="chevron-small-right" color={Colors.black} size={29} />
      </DynamicView>
    </DynamicPressable>
  );
};

export default AddPromoCode;
