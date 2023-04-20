import React from 'react';
import { Colors, fonts } from '@/themes';
import { Platform, StyleSheet } from 'react-native';
import { ISliderProps, Slider } from 'native-base';
import { DynamicText, DynamicView } from '@/components';

export interface DishSliderProps extends ISliderProps {
  value: number;
}

const androidThumbImage = require('@/assets/images/slider-logo@3.png');
const iosThumbImage = require('@/assets/images/slider-logo.png');

const DishSlider = (props: DishSliderProps) => {
  const thumbImage = Platform.OS === 'ios' ? iosThumbImage : androidThumbImage;
  return (
    <Slider
      step={1}
      minValue={0}
      maxValue={20}
      size="md"
      colorScheme="red"
      {...props}>
      <Slider.Track backgroundColor={Colors.lightGrey}>
        <Slider.FilledTrack backgroundColor={Colors.red} />
      </Slider.Track>
      <Slider.Thumb bg={Colors.red}>
        <DynamicView style={styles.SliderThumb}>
          <DynamicText style={styles.sliderText}>
            {props.value} {Number(props.value) < 2 ? 'mile' : 'miles'}
          </DynamicText>
        </DynamicView>
      </Slider.Thumb>
    </Slider>
  );
};
export default DishSlider;

const styles = StyleSheet.create({
  sliderText: {
    fontFamily: fonts.DMSans400Regular,
    color: Colors.black,
    height: 16,
    width: '100%',
    lineHeight: 16,
    fontSize: 11,
    fontWeight: '700'
  },
  SliderThumb: {
    position: 'absolute',
    alignItems: 'center',
    top: 15,
    left: -12,
  },
});
