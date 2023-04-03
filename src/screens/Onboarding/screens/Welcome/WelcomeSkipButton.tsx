import React from 'react';
import {DynamicText, DynamicView} from '@/components';
import {fonts} from '@/themes';

const WelcomeSkipButton = () => (
  <DynamicView
    marginLeft="auto"
    width={165}
    paddingVertical={10}
    alignItems="center"
    backgroundColor="#F2F4F5"
    borderRadius={100}
    position="absolute"
    justifyContent="center"
    top={0}
    right={0}>
    <DynamicText
      lineHeight={20}
      fontFamily={fonts.DMSans500Medium}
      fontWeight="500"
      color="green"
      letterSpacing={0.16}
      fontSize={15}>
      No thanks, hungry!
    </DynamicText>
  </DynamicView>
);

export default WelcomeSkipButton;
