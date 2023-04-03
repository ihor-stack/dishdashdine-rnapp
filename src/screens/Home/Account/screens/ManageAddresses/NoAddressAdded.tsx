import {Icons} from '@/assets';
import {Colors} from '@/themes';
import {Box, Center, Image, Text} from 'native-base';
import React from 'react';

const NoAddressAdded = () => {
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
        <Text textAlign="center" fontSize="2xl" bold>
          You've not added any {'\n'} address yet
        </Text>
        <Text textAlign="center" color={Colors.grey} fontFamily="mono">
          Would you like to add one now?
        </Text>
      </Center>
    </Box>
  );
};

export default NoAddressAdded;
