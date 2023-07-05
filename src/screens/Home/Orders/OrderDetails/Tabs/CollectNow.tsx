import { View, Text, FlatList } from 'react-native';
import React from 'react';
import {DynamicText, DynamicView} from '@/components';
import {Colors, fonts} from '@/themes';
import {IPreparationTimes} from '@/api/generic';
import {ORDER_TYPE} from '@/constants';
import { displayPrepTimeFromRange } from '@/utils/restaurant';

export interface CollectNowProps {
  orderType: number;
  prepTimeMin: number;
  prepTimeMax: number;
}

const CollectNow = ({orderType, prepTimeMin, prepTimeMax}: CollectNowProps) => {
  return (
    <DynamicView
      flexDirection="row"
      justifyContent="space-between"
      paddingHorizontal={12}
      alignItems="center"
      paddingTop={16}>
      <DynamicText
        fontFamily={fonts.DMSans500Medium}
        fontSize={18}
        color={Colors.black}>
        {orderType === ORDER_TYPE.COLLECTION
          ? 'Collection Time'
          : 'Estimated delivery'}
      </DynamicText>
      <DynamicText
        fontFamily={fonts.DMSans500Medium}
        fontSize={18}
        color={Colors.black}>
        {orderType === ORDER_TYPE.COLLECTION ? displayPrepTimeFromRange([prepTimeMin, prepTimeMax]) : 'Delivery'}
      </DynamicText>
    </DynamicView>
  );
};

export default CollectNow;
