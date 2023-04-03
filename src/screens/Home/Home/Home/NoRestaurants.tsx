import React from 'react';
import {Text, Box, Image, Center} from 'native-base';
import {Colors} from '@/themes';
import {Icons} from '@/assets';

const NoRestaurants = () => {
  return (
    <Box bgColor={Colors.white} flex={1} pt={20} pb={20}>
      <Center>
        {/* <Image source={Icons.ordersList} alt="order list" mb={5} /> */}
        <Text fontSize="2xl" bold>
          We're not in your area yet
        </Text>
        <Text textAlign="center" color={Colors.grey} fontFamily="mono">
          No restaurants currently offer delivery in your area. {'\n'} Try with
          a different address.
        </Text>
      </Center>
    </Box>
  );
};

export default NoRestaurants;
