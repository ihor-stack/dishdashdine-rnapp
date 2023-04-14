import React from 'react';
import { StyleSheet } from 'react-native';

import { HStack, Image, Pressable, Text, VStack } from 'native-base';
import { isEmpty } from 'lodash';
import FastImage from 'react-native-fast-image';
import moment from 'moment';

import { Colors, fonts } from '@/themes';
import { DynamicText } from '@/components';
import { IOrder, IRestaurant } from '@/api/generic';

const noProfile = require('@/assets/images/no-profile.png');

interface OrdersItemProps {
  restaurant?: IRestaurant;
  order?: IOrder;
  showReview?: boolean;
  showCollection?: boolean;
  onPressReview?: any;
  showDate?: any;
}

const OrdersItem = (props: OrdersItemProps) => {
  const {
    showReview,
    showCollection,
    onPressReview,
    restaurant,
    order,
    showDate,
  } = props;

  const momentDate = moment(order?.collectionTime).utc();

  return (
    <HStack p={5}>
      {!isEmpty(restaurant?.bannerImagePath) ? (
        <FastImage
          source={{
            uri: restaurant?.bannerImagePath,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
          style={styles.dishInfoLogo}
        />
      ) : (
        <Image source={noProfile} style={styles.dishInfoLogo} alt="alt-image" />
      )}
      <VStack ml={1} p={2} space="1" justifyContent="center">
        <Text bold>{restaurant?.name}</Text>
        <HStack space={2}>
          <Text fontSize="xs" color={Colors.grey}>
            {order?.lineItemCount} items
          </Text>
          {showDate && (
            <>
              <Text fontSize="xs" color={Colors.grey}>
                &bull;
              </Text>
              <Text fontSize="xs" color={Colors.grey}>
                25 Sep
              </Text>
            </>
          )}
        </HStack>
        {showReview && !order?.reviewLeft && (
          <Pressable onPress={onPressReview}>
            <Text fontSize="xs" underline>
              Leave a review
            </Text>
          </Pressable>
        )}
        {showCollection && order?.collectionTime && (
          <Pressable>
            <Text fontSize="xs">
              Collection: <DynamicText
                fontFamily={fonts.DMSans500Medium}
                textDecorationLine="underline">
                {momentDate.isSame(new Date(), 'day')
                  ? 'Today'
                  : `${momentDate.format('DD/MM/YYYY, hh:mm a')}`}
              </DynamicText>
            </Text>
          </Pressable>
        )}
      </VStack>
    </HStack>
  );
};

export default OrdersItem;

const styles = StyleSheet.create({
  dishInfoLogo: {
    height: 80,
    width: 80,
    backgroundColor: Colors.white,
    borderRadius: 4,
  },
});
