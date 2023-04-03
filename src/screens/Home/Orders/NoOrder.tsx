import React from 'react';
import {Text, Box, Image, Center} from 'native-base';
import {Colors} from '@/themes';
import {Icons} from '@/assets';

export interface NoOrderProps {
  showImage?: boolean;
}

const NoOrder = ({showImage}: NoOrderProps) => {
  return (
    <Box
      bgColor={Colors.white}
      flex={1}
      pt={5}
      pb={5}
      justifyContent="center"
      alignItems="center">
      <Center>
        {showImage && (
          <Image source={Icons.ordersList} alt="order list" mb={5} />
        )}
        <Text fontSize="xl" bold>
          You have no orders
        </Text>
        <Text textAlign="center" color={Colors.grey} fontFamily="mono">
          You have no previous orders to display.
        </Text>
      </Center>
    </Box>
  );
};

export default NoOrder;
