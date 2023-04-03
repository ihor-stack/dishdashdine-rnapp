import {Colors} from '@/themes';
import React from 'react';
import DynamicView from './DynamicView';

export interface DishOrderProgressProps {
  steps: number;
  activeIndex: number;
}

const DishOrderProgress = (props: DishOrderProgressProps) => {
  const stepsLength = Array.from({
    length: props.steps,
  });

  return (
    <>
      <DynamicView
        flexDirection="row"
        alignItems="center"
        justifyContent="flex-start">
        {stepsLength.map((_, index) => (
          <DynamicView
            flex={1}
            marginHorizontal={4}
            height={6}
            backgroundColor={
              props.activeIndex >= index ? Colors.ember : Colors.lightestGrey
            }
            key={index}
          />
        ))}
      </DynamicView>
    </>
  );
};

export default DishOrderProgress;
