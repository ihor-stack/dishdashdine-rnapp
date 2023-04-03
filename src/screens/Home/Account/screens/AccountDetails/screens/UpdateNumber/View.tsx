import React from 'react';

import {
  DynamicImage,
  DynamicPressable,
  DynamicText,
  DynamicTextInput,
  DynamicView,
} from '@/components';
import {Colors, fonts} from '@/themes';
import {Spinner} from 'native-base';
import {Controller} from 'react-hook-form';
import DishButton from '@/components/DishButton';
import {KeyboardAvoidingView, Platform, ScrollView} from 'react-native';

const inputX = require('@/assets/images/input-x.png');
const whiteRightArrow = require('@/assets/images/myAccount/white-right-arrow.png');

export interface UpdateNumberViewProps {
  control: any;
  handleSubmit: any;
  onSubmit: any;
  showLoading: boolean;
  onReset: any;
}

const UpdateNumberView = (props: UpdateNumberViewProps) => {
  const {
    control,
    // handleSubmit,
    onSubmit,
    showLoading,
    onReset,
  } = props;

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        accessible={false}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        style={{
          backgroundColor: Colors.white,
          paddingHorizontal: 11,
          paddingVertical: 20,
        }}>
        <DynamicView>
          <DynamicText
            fontFamily={fonts.DMSans700Bold}
            lineHeight={20}
            fontSize={15}>
            Number
          </DynamicText>
          <DynamicView marginTop={3} justifyContent="center" marginBottom={20}>
            <Controller
              control={control}
              rules={{required: true}}
              render={({field: {onChange, onBlur, value}}) => (
                <DynamicTextInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Phone Number"
                  placeholderTextColor={Colors.grey}
                  backgroundColor="#F8F8F8"
                  height={40}
                  paddingHorizontal={20}
                  fontSize={14}
                  lineHeight={19}
                  fontFamily={fonts.DMSans400Regular}
                  fontWeight="400"
                  keyboardType="numeric"
                />
              )}
              name="phoneNumber"
            />
            <DynamicPressable right={20} position="absolute" onPress={onReset}>
              <DynamicImage source={inputX} width={9} height={9} />
            </DynamicPressable>
          </DynamicView>
          <DynamicText
            fontFamily={fonts.DMSans400Regular}
            lineHeight={16}
            fontSize={13}>
            Please check your messages, you will receieve an message with a
            verification link.
          </DynamicText>
        </DynamicView>
        <DynamicView marginTop="auto">
          <DishButton
            icon="arrowright"
            label="Update number"
            variant="primary"
            onPress={onSubmit}
            showSpinner={showLoading}
          />
        </DynamicView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default UpdateNumberView;
