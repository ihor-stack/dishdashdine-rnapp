import {Colors} from '@/themes';
import {Box, Center, Text} from 'native-base';
import React from 'react';

const NoFavorite = () => {
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
          No Favourites Yet!
        </Text>
        <Text textAlign="center" color={Colors.grey} fontFamily="mono">
          Mark your favourite dish or restaurant {'\n'}
          and always have them here.
        </Text>
      </Center>
    </Box>
  );
};

export default NoFavorite;
