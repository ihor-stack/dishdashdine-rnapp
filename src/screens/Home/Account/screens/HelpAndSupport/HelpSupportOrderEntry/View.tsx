import React from 'react';
import {ScrollView, ImageBackground, StyleSheet} from 'react-native';
import {DynamicText, DynamicTextInput, DynamicView} from '@/components';
import {Colors, fonts} from '@/themes';
import DishButton from '@/components/DishButton';
import {Image} from 'native-base';
import {IRestaurant} from '@/api/generic';
import {isEmpty} from 'lodash';
import FastImage from 'react-native-fast-image';
import {Controller} from 'react-hook-form';

const noProfile = require('@/assets/images/no-image.png');

export interface HelpSupportOrderEntryViewProps {
  restaurant: IRestaurant;
  onSubmit: any;
  control: any;
  showLoading: boolean;
}

const HelpSupportOrderEntryView = ({
  restaurant,
  control,
  onSubmit,
  showLoading,
}: HelpSupportOrderEntryViewProps) => {
  const bgSource = !isEmpty(restaurant?.bannerImagePath)
    ? {
        uri: restaurant?.bannerImagePath,
        priority: FastImage.priority.high,
      }
    : noProfile;

  return (
    <ScrollView
      style={{
        backgroundColor: Colors.white,
      }}
      contentContainerStyle={{
        paddingBottom: 25,
        flexGrow: 1,
      }}>
      <ImageBackground
        source={bgSource}
        resizeMode="cover"
        style={styles.ImageBackground}>
        {!isEmpty(restaurant?.bannerImagePath) ? (
          <FastImage
            source={{
              uri: restaurant?.bannerImagePath,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
            style={styles.dishInfoLogo}
          />
        ) : (
          <Image
            source={noProfile}
            style={styles.dishInfoLogo}
            alt="alt-image"
          />
        )}
      </ImageBackground>
      <DynamicView paddingHorizontal={11}>
        <DynamicText
          fontFamily={fonts.DMSans500Medium}
          fontWeight="500"
          fontSize={15}
          lineHeight={19.53}
          color={Colors.black}>
          Help with an order{'\n'}
        </DynamicText>
        <DynamicText
          fontFamily={fonts.DMSans400Regular}
          fontWeight="400"
          fontSize={13}
          lineHeight={15.62}
          color={Colors.grey}>
          Please describe your issue in as much detail as possible. Our
          compliance team will look into this further and update you as soon as
          we can. Each incident is individual and may require follow-up with the
          relevant merchant.{'\n\n'} Please allow up to 72 hours to respond.
        </DynamicText>
      </DynamicView>
      <DynamicView paddingHorizontal={11}>
        <DynamicView marginTop={21}>
          <DynamicText
            fontFamily={fonts.DMSans700Bold}
            fontSize={15}
            lineHeight={20}
            color="#303030">
            Subject
          </DynamicText>
          <Controller
            control={control}
            rules={{required: true}}
            render={({field: {onChange, onBlur, value}}) => (
              <DynamicTextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder={'Food safety issues'}
                placeholderTextColor={Colors.grey}
                backgroundColor="#F8F8F8"
                marginTop={4}
                borderRadius={4}
                paddingHorizontal={21}
                paddingVertical={11}
                fontSize={14}
                lineHeight={19}
                fontFamily={fonts.DMSans400Regular}
                fontWeight="400"
                color="#303030"
              />
            )}
            name="subject"
          />
        </DynamicView>
        <DynamicView marginTop={21}>
          <DynamicText
            fontFamily={fonts.DMSans700Bold}
            fontSize={15}
            lineHeight={20}
            color="#303030">
            Describe your issue
          </DynamicText>
          <Controller
            control={control}
            rules={{required: true}}
            render={({field: {onChange, onBlur, value}}) => (
              <DynamicTextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder={'Please describe your issue '}
                placeholderTextColor={Colors.grey}
                backgroundColor="#F8F8F8"
                marginTop={4}
                borderRadius={4}
                paddingHorizontal={21}
                paddingVertical={11}
                minHeight={216}
                fontSize={14}
                lineHeight={19}
                fontFamily={fonts.DMSans400Regular}
                textAlignVertical="top"
                multiline
                fontWeight="400"
                color="#303030"
              />
            )}
            name="issue"
          />
        </DynamicView>
      </DynamicView>
      <DynamicView flex={1} />
      <DynamicView paddingHorizontal={11} paddingTop={20}>
        <DishButton
          onPress={onSubmit}
          variant="primary"
          label="Submit your issue"
          icon="arrowright"
          showSpinner={showLoading}
        />
      </DynamicView>
    </ScrollView>
  );
};

export default HelpSupportOrderEntryView;

const styles = StyleSheet.create({
  ImageBackground: {
    height: 196,
    position: 'relative',
    alignItems: 'center',
    marginBottom: 40,
  },
  dishInfoLogo: {
    height: 74,
    width: 74,
    backgroundColor: Colors.white,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: Colors.dark,
    position: 'absolute',
    bottom: -20,
    zIndex: 100,
  },
});
