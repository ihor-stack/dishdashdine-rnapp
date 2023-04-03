import React from 'react';
import {Colors, fonts} from '@/themes';
import {DynamicPressable, DynamicText, DynamicView} from '@/components/index';
import Ionicons from 'react-native-vector-icons/Ionicons';

export interface DishChipsProps {
  name: string;
  onPressRemove: any;
}

const DishChips: React.FC<DishChipsProps> = ({name, onPressRemove}) => {
  return (
    <DynamicView
      backgroundColor="rgba(224, 4, 4, 0.1)"
      marginHorizontal={5}
      marginVertical={5}
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      height={50}
      borderRadius={4}
      paddingHorizontal={12}
      paddingVertical={11}
      minWidth={100}
      borderColor={Colors.ember}
      borderWidth={0.5}>
      <DynamicText
        fontFamily={fonts.DMSans400Regular}
        fontSize={14}
        lineHeight={16}
        color={Colors.ember}>
        {name}
      </DynamicText>
      <DynamicPressable onPress={onPressRemove}>
        <Ionicons size={16} name="close" color={Colors.ember} />
      </DynamicPressable>
    </DynamicView>
  );
};

export default DishChips;
