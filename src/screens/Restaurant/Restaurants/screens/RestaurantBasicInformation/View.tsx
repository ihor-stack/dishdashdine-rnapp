import React, {useRef} from 'react';
import {
  DynamicImage,
  DynamicPressable,
  DynamicText,
  DynamicTextInput,
  DynamicView,
} from '@/components';
import {Colors, fonts} from '@/themes';
import {ScrollView} from 'react-native-gesture-handler';
import DishButton from '@/components/DishButton';
import {Controller} from 'react-hook-form';
import {isEmpty} from 'lodash';
import RestaurantLogoCoverImage from '@/screens/Restaurant/Restaurants/screens/RestaurantBasicInformation/RestaurantLogoCoverImage';
import styles from './styles';
import {useActionSheet} from '@expo/react-native-action-sheet';

const plus = require('@/assets/images/myAccount/plus.png');

export interface BasicInformationViewProps {
  showLoading: boolean;
  onSubmit: any;
  control: any;
  openCamera: (isBannerImage: boolean) => Promise<void>;
  singleFilePicker: (isBannerImage: boolean) => Promise<void>;
  bannerImagePath: string;
  logoImagePath: string;
  clearAssets: () => void;
}

const BasicInformationView = (props: BasicInformationViewProps) => {
  const {
    onSubmit,
    showLoading,
    control,
    openCamera,
    singleFilePicker,
    bannerImagePath,
    logoImagePath,
    clearAssets,
  } = props;
  const {showActionSheetWithOptions} = useActionSheet();

  const showActionSheet = (uploadType: string) => {
    const options = ['Take Photo', 'Photos Gallery', 'Cancel'];
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      selectedIndex => {
        switch (selectedIndex) {
          case 0:
            if (uploadType === 'banner') {
              openCamera(true);
            } else if (uploadType === 'logo') {
              openCamera(false);
            }
            break;
          case 1:
            if (uploadType === 'banner') {
              singleFilePicker(true);
            } else if (uploadType === 'logo') {
              singleFilePicker(false);
            }
            break;
          case cancelButtonIndex:
            clearAssets();
            break;
        }
      },
    );
  };

  return (
    <ScrollView
      style={{
        backgroundColor: Colors.white,
      }}
      contentContainerStyle={{
        flexGrow: 1,
      }}>
      <DynamicView paddingTop={19} paddingHorizontal={12}>
        <DynamicText style={styles.basicInfoHeader}>
          Basic Information
        </DynamicText>
      </DynamicView>
      <DynamicView paddingTop={24} paddingHorizontal={12}>
        <DynamicText style={styles.textLabelStyle}>Restaurant Name</DynamicText>
        <DynamicView style={styles.textInputView}>
          <Controller
            control={control}
            rules={{required: true}}
            render={({field: {onChange, onBlur, value}}) => (
              <DynamicTextInput
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
        <DynamicText style={styles.textLabelStyle}>
          Restaurant Description
        </DynamicText>
        <DynamicView style={styles.textInputView}>
          <Controller
            control={control}
            rules={{required: true}}
            render={({field: {onChange, onBlur, value}}) => (
              <DynamicTextInput
                style={styles.textInputStyle}
                fontSize={14}
                lineHeight={18.23}
                fontFamily={fonts.DMSans400Regular}
                color={Colors.black}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                height={130}
                multiline
              />
            )}
            name="description"
          />
        </DynamicView>
        <DynamicText style={styles.textLabelStyle}>Phone Number</DynamicText>
        <DynamicView style={styles.textInputView}>
          <Controller
            control={control}
            rules={{required: true}}
            render={({field: {onChange, onBlur, value}}) => (
              <DynamicTextInput
                fontSize={14}
                lineHeight={18.23}
                fontFamily={fonts.DMSans400Regular}
                color={Colors.black}
                style={styles.textInputStyle}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                keyboardType="numeric"
              />
            )}
            name="phone"
          />
        </DynamicView>
        <DynamicText style={styles.textLabelStyle}>Email Address</DynamicText>
        <DynamicView style={styles.textInputView}>
          <Controller
            control={control}
            rules={{required: true}}
            render={({field: {onChange, onBlur, value}}) => (
              <DynamicTextInput
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
            name="email"
          />
        </DynamicView>
        <DynamicText style={styles.textLabelStyle}>Address Line 1</DynamicText>
        <DynamicView style={styles.textInputView}>
          <Controller
            control={control}
            rules={{required: true}}
            render={({field: {onChange, onBlur, value}}) => (
              <DynamicTextInput
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
            name="streetAddress"
          />
        </DynamicView>
        <DynamicText style={styles.textLabelStyle}>Address Line 2</DynamicText>
        <DynamicView style={styles.textInputView}>
          <DynamicTextInput
            fontSize={14}
            lineHeight={18.23}
            fontFamily={fonts.DMSans400Regular}
            color={Colors.black}
            style={styles.textInputStyle}
          />
        </DynamicView>
        <DynamicText style={styles.textLabelStyle}>City</DynamicText>
        <DynamicView style={styles.textInputView}>
          <Controller
            control={control}
            rules={{required: true}}
            render={({field: {onChange, onBlur, value}}) => (
              <DynamicTextInput
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
            name="city"
          />
        </DynamicView>
        <DynamicText style={styles.textLabelStyle}>Postcode</DynamicText>
        <DynamicView style={styles.textInputView}>
          <Controller
            control={control}
            rules={{required: true}}
            render={({field: {onChange, onBlur, value}}) => (
              <DynamicTextInput
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
            name="postcode"
          />
        </DynamicView>
        <DynamicView>
          <DynamicText style={styles.textLabelStyle}>Cover Image</DynamicText>
          {!isEmpty(bannerImagePath) ? (
            <RestaurantLogoCoverImage
              imagePathURI={bannerImagePath}
              onPress={() => showActionSheet('banner')}
            />
          ) : (
            <DynamicView style={styles.textInputView}>
              <DynamicPressable
                alignItems="center"
                onPress={() => showActionSheet('banner')}>
                <DynamicView style={styles.addRestaurantView}>
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
                    Add Cover Image
                  </DynamicText>
                </DynamicView>
              </DynamicPressable>
            </DynamicView>
          )}
        </DynamicView>
        <DynamicView>
          <DynamicText style={styles.textLabelStyle}>Logo Image</DynamicText>
          {!isEmpty(logoImagePath) ? (
            <RestaurantLogoCoverImage
              imagePathURI={logoImagePath}
              onPress={() => showActionSheet('logo')}
            />
          ) : (
            <DynamicView style={styles.textInputView}>
              <DynamicPressable
                alignItems="center"
                onPress={() => showActionSheet('logo')}>
                <DynamicView style={styles.addRestaurantView}>
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
                    Add Logo Image
                  </DynamicText>
                </DynamicView>
              </DynamicPressable>
            </DynamicView>
          )}
        </DynamicView>
        <DynamicView paddingBottom={21}>
          <DishButton
            icon="arrowright"
            label="Save Settings"
            variant="primary"
            onPress={onSubmit}
            showSpinner={showLoading}
          />
        </DynamicView>
      </DynamicView>
    </ScrollView>
  );
};

export default BasicInformationView;
