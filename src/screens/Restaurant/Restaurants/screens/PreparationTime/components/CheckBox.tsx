import React from 'react';

import {Pressable} from 'native-base';
import FAIcon from 'react-native-vector-icons/FontAwesome';

export interface CheckBoxProps {
  isChecked: boolean;
  onPress: () => void;
}

const CheckBox = ({isChecked, onPress}: CheckBoxProps) => {
  const name = isChecked ? 'check-square' : 'square-o';

  return (
    <Pressable width={30} onPress={onPress}>
      <FAIcon name={name} size={24} color="#E00404" />
    </Pressable>
  );
};

export default CheckBox;
