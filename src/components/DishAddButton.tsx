import React from 'react';
import DynamicPressable from './DynamicPressable';
import AntDesign from 'react-native-vector-icons/AntDesign';

const DishAddButton = () => {
  return (
    <DynamicPressable>
      <AntDesign size={21} name="pluscircleo" />
    </DynamicPressable>
  );
};

export default DishAddButton;
