import React from 'react';
import {Text, Box, Image, Center} from 'native-base';
import {Colors} from '@/themes';
import {Icons} from '@/assets';

const NoReviews = () => {
  return (
    <Box
      bgColor={Colors.white}
      flex={1}
      pt={5}
      pb={5}
      justifyContent="center"
      alignItems="center">
      <Center>
        <Image source={Icons.ordersList} alt="order list" mb={5} />
        <Text fontSize="2xl" bold>
          No Reviews yet
        </Text>
        <Text textAlign="center" color={Colors.grey} fontFamily="mono">
          You do not have any reviews to display
        </Text>
      </Center>
    </Box>
  );
};

export default NoReviews;
