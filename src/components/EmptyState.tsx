import React from 'react';
import {Box, Center, Image, Text} from 'native-base';
import {Colors} from '@/themes';
import {Icons} from '@/assets';
import {StyleProp, TextStyle} from 'react-native';
import {isEmpty} from 'lodash';

export interface EmptyStateProps {
  showImage?: boolean;
  title?: string;
  message?: string;
  titleStyle?: StyleProp<TextStyle>;
  messageStyle?: StyleProp<TextStyle>;
}

const EmptyState = ({
  title,
  message,
  showImage,
  titleStyle,
  messageStyle,
}: EmptyStateProps) => {
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
        {!isEmpty(title) && (
          <Text fontSize="lg" bold style={titleStyle}>
            {title}
          </Text>
        )}
        {!isEmpty(message) && (
          <Text
            textAlign="center"
            color={Colors.grey}
            fontFamily="mono"
            style={messageStyle}>
            {message}
          </Text>
        )}
      </Center>
    </Box>
  );
};

export default EmptyState;
