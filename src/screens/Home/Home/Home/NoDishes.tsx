import React from 'react';
import {Box, Center, Text} from 'native-base';
import {Colors} from '@/themes';
import {Icons} from '@/assets';

const NoDishes = () => {
  return (
    <Box
      bgColor={Colors.white}
      flex={1}
      pt={5}
      pb={5}
      justifyContent="center"
      alignItems="center">
      <Center>
        <Text fontSize="2xl" bold>
          No Dishes available
        </Text>
        <Text textAlign="center" color={Colors.grey} fontFamily="mono">
          Theres no dishes to display.
        </Text>
      </Center>
    </Box>
  );
};

export default NoDishes;
