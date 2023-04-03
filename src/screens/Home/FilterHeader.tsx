import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {DynamicPressable, DynamicText, DynamicView} from '@/components';
import {Colors, fonts} from '@/themes';

type Props = {
  toggler: () => void;
  title: string;
};

const FilterHeader = ({toggler, title}: Props) => (
  <DynamicView borderBottomWidth={1} borderBottomColor="#F2F4F5">
    <DynamicView
      paddingHorizontal={16}
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      marginBottom={20}>
      <DynamicPressable position="absolute" left={16} onPress={toggler}>
        <AntDesign size={24} color={Colors.black} name="close" />
      </DynamicPressable>
      <DynamicView>
        <DynamicText
          fontFamily={fonts.DMSans500Medium}
          fontSize={24}
          lineHeight={31}
          color={Colors.black}>
          {title}
        </DynamicText>
      </DynamicView>
    </DynamicView>
  </DynamicView>
);

export default FilterHeader;
