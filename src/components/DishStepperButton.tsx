import React from 'react';
import DynamicView from './DynamicView';
import DynamicPressable from './DynamicPressable';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DynamicText from './DynamicText';
import {Colors, fonts} from '@/themes';

export interface DishStepperButtonProps {
  size?: 'sm' | 'md' | 'lg';
  value?: number;
  maxValue?: number;
  minValue?: number;
  onAddButtonPress?: (e?: any) => void | any;
  onLessButtonPress?: (e?: any) => void | any;
  onToggle?: () => void;
  isEnabled?: boolean;
  disabled?: boolean;
  disabledPositive?: boolean;
}

const DishStepperButton = ({
  size,
  value = 1,
  maxValue = 100,
  minValue = 0,
  onAddButtonPress,
  onLessButtonPress,
  isEnabled,
  onToggle,
  disabled = false,
  disabledPositive = false
}: DishStepperButtonProps) => {

  const getButtonSize = (): number => {
    if (size === 'sm') {
      return 21;
    } else if (size === 'md') {
      return 25;
    } else if (size === 'lg') {
      return 30;
    } else {
      return 25;
    }
  };

  const getInputStepperSpacing = (): number => {
    if (size === 'sm') {
      return 12;
    } else if (size === 'md') {
      return 23;
    } else if (size === 'lg') {
      return 31;
    } else {
      return 23;
    }
  };

  const getInputStepperStyling = () => {
    if (size === 'sm') {
      return {
        fontSize: 13,
        lineHeight: 17,
      };
    } else if (size === 'md') {
      return {
        fontSize: 24,
        lineHeight: 31,
      };
    } else if (size === 'lg') {
      return {
        fontSize: 32,
        lineHeight: 48,
      };
    } else {
      return {
        fontSize: 24,
        lineHeight: 31,
      };
    }
  };

  const renderToggleButton = () => (
    <DynamicPressable disabled={disabled} onPress={onToggle}>
      <AntDesign
        size={getButtonSize()}
        name="pluscircleo"
        color={Colors.grey}
      />
    </DynamicPressable>
  );

  const renderStepperButton = () => (
    <>
      <DynamicPressable onPress={onLessButtonPress}>
        <AntDesign
          size={getButtonSize()}
          name="minuscircleo"
          color={Colors.ember}
        />
      </DynamicPressable>
      <DynamicView
        paddingHorizontal={getInputStepperSpacing()}
        alignItems="center">
        <DynamicText
          fontFamily={fonts.DMSans500Medium}
          color={Colors.black}
          fontSize={getInputStepperStyling().fontSize}
          lineHeight={getInputStepperStyling().lineHeight}>
          {value}
        </DynamicText>
      </DynamicView>
      <DynamicPressable
        onPress={onAddButtonPress}
        disabled={disabled || value >= maxValue || disabledPositive}>
        <AntDesign
          size={getButtonSize()}
          name="pluscircleo"
          color={value >= maxValue || disabledPositive ? '#E0040440' : Colors.ember}
        />
      </DynamicPressable>
    </>
  );

  return (
    <DynamicView flexDirection="row" alignItems="center" marginRight={6}>
      {isEnabled ? renderStepperButton() : renderToggleButton()}
    </DynamicView>
  );
};

export default DishStepperButton;
