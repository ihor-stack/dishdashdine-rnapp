import React from 'react';
import {Divider} from 'native-base';
import {Colors, fonts} from '@/themes';
import {
  DynamicImage,
  DynamicPressable,
  DynamicText,
  DynamicTextInput,
  DynamicView,
} from '@/components';
import styles from './styles';
import {Controller} from 'react-hook-form';
import {isEmpty} from 'lodash';
import RestaurantLogoCoverImage from '@/screens/Restaurant/Restaurants/screens/RestaurantBasicInformation/RestaurantLogoCoverImage';

const plus = require('@/assets/images/myAccount/plus.png');

export interface AboutDetailsProps {
  control: any;
  largeImagePath: string;
  onAddPhoto: () => void;
}

const AboutDetails: React.FC<AboutDetailsProps> = ({
  control,
  largeImagePath,
  onAddPhoto,
}) => {
  return (
    <>
      <Divider color={Colors.lightGrey} marginBottom={27} />
      <DynamicText style={styles.textLabelStyle}>Name</DynamicText>
      <DynamicView style={[styles.textInputView, styles.formControl]}>
        <Controller
          control={control}
          rules={{required: true}}
          render={({field: {onChange, onBlur, value}}) => (
            <DynamicTextInput
              placeholder="Please enter a name"
              placeholderTextColor={Colors.grey}
              fontSize={14}
              lineHeight={18.23}
              fontFamily={fonts.DMSans400Regular}
              color={Colors.black}
              style={styles.textInputStyle}
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
            />
          )}
          name="name"
        />
      </DynamicView>
      <DynamicText style={styles.textLabelStyle}>Description</DynamicText>
      <DynamicView style={[styles.textInputView, styles.formControl]}>
        <Controller
          control={control}
          rules={{required: true}}
          render={({field: {onChange, onBlur, value}}) => (
            <DynamicTextInput
              placeholder="Please enter a description"
              style={styles.textInputStyle}
              placeholderTextColor={Colors.grey}
              fontSize={14}
              lineHeight={18.23}
              fontFamily={fonts.DMSans400Regular}
              color={Colors.black}
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              // height={100}
            />
          )}
          name="description"
        />
      </DynamicView>
      <DynamicText style={styles.textLabelStyle}>Photo</DynamicText>
      <DynamicView style={styles.textInputView} marginBottom={27}>
        {!isEmpty(largeImagePath) ? (
          <RestaurantLogoCoverImage
            imagePathURI={largeImagePath}
            onPress={onAddPhoto}
          />
        ) : (
          <DynamicView
            marginTop={4}
            justifyContent="center"
            marginBottom={20}
            position="relative">
            <DynamicPressable onPress={onAddPhoto}>
              <DynamicView
                top={20}
                borderRadius={8}
                borderColor={Colors.black}
                borderWidth={1}
                height={200}
                backgroundColor={Colors.lightestGrey}
                marginBottom={20}
                justifyContent="center"
                alignItems="center"
                width="100%">
                <DynamicImage
                  source={plus}
                  width={24}
                  height={24}
                  marginBottom={3}
                />
                <DynamicText
                  fontSize={14}
                  lineHeight={20}
                  color={Colors.black}
                  fontFamily={fonts.DMSans700Bold}>
                  Add Photo
                </DynamicText>
              </DynamicView>
            </DynamicPressable>
          </DynamicView>
        )}
      </DynamicView>
    </>
  );
};

export default AboutDetails;
