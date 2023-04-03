import React from 'react';

import {Flex, Text} from 'native-base';

import CheckBox, {CheckBoxProps} from './CheckBox';

interface TopTimeSectionProps extends CheckBoxProps {
  title: string;
}

const TopTimeSection = ({title, isChecked, onPress}: TopTimeSectionProps) => (
  <Flex px={10} direction="row" alignItems="center" mb="3">
    <CheckBox isChecked={isChecked} onPress={onPress} />
    <Text variant="pickerRightCheck">{title}</Text>
  </Flex>
);

export default TopTimeSection;
