import React from 'react';
import {Colors, fonts} from '@/themes';
import {Icon} from 'native-base';
import DynamicText from './DynamicText';
import DynamicView from './DynamicView';
import Entypo from 'react-native-vector-icons/Entypo';

const SeeMore = () => {
  return (
    <DynamicView flexDirection="row" alignItems="center" marginTop={10}>
      <DynamicText
        fontFamily={fonts.DMSans500Medium}
        fontSize={13}
        lineHeight={15.62}
        color={Colors.black}
        textDecorationLine="underline">
        Show more
      </DynamicText>
      <Icon
        as={<Entypo name="chevron-small-down" />}
        color={Colors.black}
        size={5}
      />
    </DynamicView>
  );
};

export default SeeMore;
