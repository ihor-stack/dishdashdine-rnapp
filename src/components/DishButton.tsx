import {Colors, fonts} from '@/themes';
import React from 'react';
import DynamicPressable from './DynamicPressable';
import DynamicText from './DynamicText';
import DynamicView from './DynamicView';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Spinner} from 'native-base';
import normalize, {pixelSizeVertical} from '@/themes/normalize';

export interface DishButtonProps {
  onPress?: any;
  iconType?: string;
  icon?: string;
  label?: string;
  variant?:
    | 'primary'
    | 'light'
    | 'default'
    | 'success'
    | 'lightGrey'
    | 'blue'
    | undefined;
  showSpinner?: boolean;
  showIcon?: boolean;
}

const DishButton = (props: DishButtonProps) => {
  const {onPress, label, variant, icon, showSpinner, showIcon = true} = props;

  const getColor = () => {
    if (variant === 'primary') {
      return {
        bgColor: Colors.ember,
        color: Colors.white,
      };
    } else if (variant === 'light') {
      return {
        bgColor: Colors.lightGrey,
        color: Colors.black,
      };
    } else if (variant === 'success') {
      return {
        bgColor: '#58AA60',
        color: Colors.white,
      };
    } else if (variant === 'blue') {
      return {
        bgColor: '#6666FF',
        color: Colors.white,
      };
    }else {
      return {
        bgColor: Colors.lightGrey,
        color: Colors.black,
      };
    }
  };

  return (
    <DynamicPressable
      marginTop={pixelSizeVertical(15)}
      paddingVertical={pixelSizeVertical(12)}
      alignItems="center"
      justifyContent="center"
      backgroundColor={getColor().bgColor}
      borderRadius={4}
      onPress={onPress}>
      {showSpinner ? (
        <Spinner color="#fff" />
      ) : (
        <DynamicText
          fontWeight="500"
          lineHeight={26}
          fontFamily={fonts.DMSans500Medium}
          fontSize={normalize(20)}
          color={getColor().color}>
          {label}
        </DynamicText>
      )}

      {showIcon && (
        <DynamicView position="absolute" right={18}>
          <AntDesign size={24} name={String(icon)} color={getColor().color} />
        </DynamicView>
      )}
    </DynamicPressable>
  );
};

export default DishButton;
