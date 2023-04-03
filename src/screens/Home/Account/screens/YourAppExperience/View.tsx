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
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import DishButton from '@/components/DishButton';

const whiteRightArrow = require('@/assets/images/myAccount/white-right-arrow.png');

export interface YourAppExperienceProps {
  control: any;
  onSubmit: any;
  showLoading: boolean;
}

const YourAppExperienceView = (props: YourAppExperienceProps) => {
  const {width} = useWindowDimensions();
  const {control, onSubmit, showLoading} = props;

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
        style={styles.TouchableWithoutFeedback}>
        <DynamicView>
          <DynamicText
            fontFamily={fonts.DMSans500Medium}
            fontSize={15}
            lineHeight={19.53}
            color={Colors.black}>
            Help us be the best
          </DynamicText>
          <DynamicView marginTop={7}>
            <DynamicText
              fontFamily={fonts.DMSans400Regular}
              fontSize={13}
              lineHeight={15.62}
              color={Colors.grey}>
              Please share your in-app experience and help us dish the best of
              takeaway!
            </DynamicText>
          </DynamicView>
        </DynamicView>
        <DynamicView marginTop={30} alignItems="flex-start">
          <DynamicText
            fontFamily={fonts.DMSans500Medium}
            fontSize={15}
            lineHeight={19.53}
            color={Colors.black}>
            Your app experience
          </DynamicText>
          <Controller
            control={control}
            defaultValue=""
            name="message"
            rules={{required: true}}
            render={({field: {onChange, onBlur, value}}) => (
              <DynamicTextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                multiline
                placeholder="Please describe your app experience"
                placeholderTextColor={Colors.grey}
                height={216}
                backgroundColor={Colors.lightGrey}
                width={width - 20}
                paddingTop={19}
                paddingLeft={21}
                marginTop={4}
                fontSize={14}
                lineHeight={19}
                fontFamily={fonts.DMSans400Regular}
                fontWeight="400"
              />
            )}
          />
        </DynamicView>
        <DynamicView marginTop="auto">
          <DishButton
            icon="arrowright"
            variant="primary"
            showSpinner={showLoading}
            label="Submit"
            onPress={onSubmit}
          />
        </DynamicView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default YourAppExperienceView;

const styles = StyleSheet.create({
  TouchableWithoutFeedback: {
    backgroundColor: Colors.white,
    paddingHorizontal: 11,
    paddingVertical: 20,
  },
});
