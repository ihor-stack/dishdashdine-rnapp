import React from 'react';
import {View, Text} from 'react-native';
import {DynamicText, DynamicView} from '@/components/index';
import {Colors, fonts} from '@/themes';

interface RatingViewProps {
  label: string;
  isSelected?: boolean;
}

const RatingView = ({label, isSelected}: RatingViewProps) => (
  <DynamicView
    backgroundColor={!isSelected ? Colors.white : Colors.black}
    width={!isSelected ? 25 : 40}
    height={!isSelected ? 25 : 40}
    borderRadius={999}
    alignItems="center"
    justifyContent="center"
    borderWidth={!isSelected ? 1 : 0}
    marginHorizontal={4}>
    <DynamicText
      fontFamily={fonts.DMSans500Medium}
      fontWeight="600"
      fontSize={!isSelected ? 16 : 28}
      textAlign="center"
      color={isSelected ? Colors.white : Colors.black}>
      {label}
    </DynamicText>
  </DynamicView>
);

interface DishFoodHygieneRatingProps {
  value: number;
}

const DishFoodHygieneRating = ({value}: DishFoodHygieneRatingProps) => {
  const RATING: any = {
    0: 'Urgent Improvement Necessary',
    1: 'Major Improvement Necessary',
    2: 'Improvement Necessary',
    3: 'Generally Satisfactory',
    4: 'Good',
    5: 'Very Good',
  };

  return (
    <DynamicView
      maxWidth={260}
      borderWidth={1}
      borderColor={Colors.black}
      borderRadius={6}
      backgroundColor="#d7e459">
      <DynamicView
        borderBottomColor={Colors.black}
        borderBottomWidth={1}
        paddingVertical={3}
        paddingHorizontal={6}>
        <DynamicText
          fontFamily={fonts.DMSans500Medium}
          textAlign="center"
          letterSpacing={2}
          textTransform="uppercase">
          Food Hygiene Rating
        </DynamicText>
      </DynamicView>
      <DynamicView
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        paddingVertical={12}
        paddingHorizontal={3}>
        <RatingView label="0" isSelected={value === 0} />
        <RatingView label="1" isSelected={value === 1} />
        <RatingView label="2" isSelected={value === 2} />
        <RatingView label="3" isSelected={value === 3} />
        <RatingView label="4" isSelected={value === 4} />
        <RatingView label="5" isSelected={value === 5} />
      </DynamicView>
      <DynamicView
        paddingVertical={6}
        paddingHorizontal={6}
        backgroundColor={Colors.black}>
        <DynamicText
          fontFamily={fonts.DMSans500Medium}
          textAlign="center"
          color={Colors.white}
          textTransform="uppercase">
          {RATING[value]}
        </DynamicText>
      </DynamicView>
    </DynamicView>
  );
};

export default DishFoodHygieneRating;
