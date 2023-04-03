import {View, Text, FlatList} from 'react-native';
import React from 'react';
import {DynamicText, DynamicView} from '@/components';
import {Colors, fonts} from '@/themes';
import {IPreparationTimes} from '@/api/generic';
import {ORDER_TYPE} from '@/constants';

export interface CollectNowProps {
  orderType: number;
  prepTimeMin: number;
  prepTimeMax: number;
}

const CollectNow = ({orderType, prepTimeMin, prepTimeMax}: CollectNowProps) => {
  const displayPrepTime = () => {
    let minTimeText = '';
    if (prepTimeMin < 60) {
      minTimeText += `${prepTimeMin}${prepTimeMax < 120 ? 'mins' : 'mins'}`;
    } else if (prepTimeMin > 60 && prepTimeMin < 1440) {
      const hrs = Math.trunc(prepTimeMin / 60);
      minTimeText += `${hrs > 1 ? hrs : prepTimeMin}${hrs > 1 ? '' : 'mins'}`;
    } else if (prepTimeMin >= 1440) {
      const days = Math.trunc(prepTimeMin / 1440);
      const hrs = Math.trunc(prepTimeMin / 60);
      minTimeText += `${days >= 1 ? days : hrs}${
        days >= 1 ? (days > 1 ? 'days' : 'day') : 'hrs'
      }`;
    }

    let maxTimeText = '';
    if (prepTimeMax < 60) {
      maxTimeText += `${prepTimeMax} mins`;
    } else if (prepTimeMax > 60 && prepTimeMax < 1440) {
      const hrs = Math.trunc(prepTimeMax / 60);
      maxTimeText += `${hrs}${hrs > 1 ? 'hrs' : 'hr'}`;
    } else if (prepTimeMax >= 1440) {
      const days = Math.trunc(prepTimeMax / 1440);
      const hrs = Math.trunc(prepTimeMax / 60);
      maxTimeText += `${days >= 1 ? days : hrs}${
        days >= 1 ? (days > 1 ? 'days' : 'day') : 'hrs'
      }`;
    }

    if (prepTimeMin === 0 && prepTimeMax === 0) {
      return '';
    }

    if (minTimeText !== '' && maxTimeText !== '') {
      return minTimeText + '-' + maxTimeText;
    } else if (minTimeText === '') {
      return maxTimeText;
    } else if (maxTimeText === '') {
      return minTimeText;
    }
    return '';
  };

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
        {orderType === ORDER_TYPE.COLLECTION ? displayPrepTime() : 'Delivery'}
      </DynamicText>
    </DynamicView>
  );
};

export default CollectNow;
