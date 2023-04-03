import React from 'react';
import {
  Box,
  Button,
  Divider,
  HStack,
  Image,
  Pressable,
  Text,
  VStack,
} from 'native-base';
import {ms} from 'react-native-size-matters';
import Colors from '@/themes/colors';
import {OrderItem} from '@/models/orders';
import OrdersItem from '../../Orders/OrderItem';

export interface OrderHistoryItemProps {
  order: OrderItem;
}

export const OrderHistoryItem = ({}: OrderHistoryItemProps) => {
  return (
    <Box
      w={ms(256)}
      h={ms(146)}
      borderWidth={ms(0.5)}
      borderColor={Colors.lightGrey}
      m={2}>
      <OrdersItem showReview />
      <Divider bgColor={Colors.lightGrey} />
      <Button variant="link">
        <Text fontSize="xs" color={Colors.ember}>
          Re-order
        </Text>
      </Button>
    </Box>
  );
};
