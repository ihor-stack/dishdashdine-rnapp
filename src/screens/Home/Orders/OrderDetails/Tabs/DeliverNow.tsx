import React from 'react';
import {DynamicText, DynamicView} from '@/components';
import {Colors, fonts} from '@/themes';

const DeliverNow = () => {
  return (
    <DynamicView
      flexDirection="row"
      justifyContent="space-between"
      paddingHorizontal={12}
      alignItems="center"
      paddingTop={20}>
      <DynamicText
        fontFamily={fonts.DMSans500Medium}
        fontSize={18}
        lineHeight={23.44}
        color={Colors.black}>
        Estimated delivery time
      </DynamicText>
      <DynamicText
        fontFamily={fonts.DMSans500Medium}
        fontSize={18}
        lineHeight={23.44}
        color={Colors.black}>
        45-60 min(s)
      </DynamicText>
    </DynamicView>
  );
};

export default DeliverNow;
