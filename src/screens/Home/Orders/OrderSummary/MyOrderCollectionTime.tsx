import React from 'react';
import {DynamicText, DynamicView} from '@/components';
import {Colors, fonts} from '@/themes';
import Feather from 'react-native-vector-icons/Feather';
import {IOrder} from '@/api/generic';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {ORDER_TYPE} from '@/constants';
import moment from 'moment';

export interface MyOrderCollectionTimeProps {
  order?: IOrder;
  showLoading?: boolean;
}

const MyOrderCollectionTime = ({
  order,
  showLoading,
}: MyOrderCollectionTimeProps) => {
  return (
    <DynamicView
      flex={1}
      flexDirection="row"
      justifyContent="space-between"
      paddingVertical={20}
      paddingHorizontal={12}
      alignItems="center"
      backgroundColor={Colors.lightGrey}>
      <DynamicView flexDirection="row" alignItems="center" paddingVertical={20}>
        <Feather name="clock" color={Colors.ember} size={27} />
        <DynamicView marginLeft={11}>
          <DynamicText
            fontFamily={fonts.DMSans500Medium}
            fontSize={16}
            lineHeight={18}
            color={Colors.black}>
            {order?.orderType === ORDER_TYPE.COLLECTION
              ? 'Collection'
              : 'Delivery'}
            time
          </DynamicText>
        </DynamicView>
      </DynamicView>
      {showLoading ? (
        <SkeletonPlaceholder>
          <SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item
              width={120}
              height={20}
              borderRadius={4}
            />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
      ) : (
        <DynamicText
          fontFamily={fonts.DMSans500Medium}
          fontSize={16}
          lineHeight={20.83}
          color={Colors.black}>
          {order?.collectionTime
            ? moment(order.collectionTime).format('MM/DD/YYYY HH:mm')
            : 'No collection time'}
        </DynamicText>
      )}
    </DynamicView>
  );
};

export default MyOrderCollectionTime;
