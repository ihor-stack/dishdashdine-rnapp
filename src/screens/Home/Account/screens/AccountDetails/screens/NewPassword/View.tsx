import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  DynamicPressable,
  DynamicText,
  DynamicTextInput,
  DynamicView,
} from '@/components';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {fonts, Colors} from '@/themes';
import {Controller} from 'react-hook-form';
import DishButton from '@/components/DishButton';

export interface NewPasswordViewProps {
  showLoading: boolean;
  control?: any;
  currentPassword: boolean;
  setShowCurrentPassword: any;
  showNewPassword: any;
  setShowNewPassword: any;
  showConfirmPassword: boolean;
  setShowConfirmPassword: any;
  onSubmit: any;
}

const NewPassword = (props: NewPasswordViewProps, ref: any) => {
  const {
    control,
    currentPassword,
    showLoading,
    setShowCurrentPassword,
    showNewPassword,
    setShowNewPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    onSubmit,
  } = props;
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <ScrollView
        contentContainerStyle={styles.keyBoardContent}
        showsVerticalScrollIndicator={false}
        ref={ref}
        style={styles.container}>
        <DynamicView marginTop={21}>
          <DynamicText
            fontFamily={fonts.DMSans700Bold}
            fontSize={15}
            lineHeight={20}
            color="#303030">
            Current Password
          </DynamicText>
          <DynamicView
            justifyContent="center"
            position="relative"
            marginTop={4}>
            <Controller
              control={control}
              rules={{required: true}}
              render={({field: {onChange, onBlur, value}}) => (
                <DynamicTextInput
                  testID="@test-id/reg-input-currentPassword"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Password"
                  placeholderTextColor={Colors.grey}
                  backgroundColor="#F8F8F8"
                  borderRadius={4}
                  paddingHorizontal={21}
                  paddingVertical={11}
                  fontSize={14}
                  lineHeight={19}
                  fontFamily={fonts.DMSans400Regular}
                  fontWeight="400"
                  color="#303030"
                  secureTextEntry={!currentPassword}
                />
              )}
              name="currentPassword"
            />
            <DynamicPressable
              position="absolute"
              justifyContent="center"
              right={0}
              paddingRight={11}
              onPress={() => setShowCurrentPassword(!currentPassword)}>
              <AntDesign
                size={24}
                name={currentPassword ? 'eye' : 'eyeo'}
                color="#E00404"
              />
            </DynamicPressable>
          </DynamicView>
        </DynamicView>
        <DynamicView marginTop={21}>
          <DynamicText
            fontFamily={fonts.DMSans700Bold}
            fontSize={15}
            lineHeight={20}
            color="#303030">
            New Password
          </DynamicText>
          <DynamicView
            justifyContent="center"
            position="relative"
            marginTop={4}>
            <Controller
              control={control}
              rules={{required: true}}
              render={({field: {onChange, onBlur, value}}) => (
                <DynamicTextInput
                  testID="@test-id/reg-input-newPassword"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Password"
                  placeholderTextColor={Colors.grey}
                  backgroundColor="#F8F8F8"
                  borderRadius={4}
                  paddingHorizontal={21}
                  paddingVertical={11}
                  fontSize={14}
                  lineHeight={19}
                  fontFamily={fonts.DMSans400Regular}
                  fontWeight="400"
                  color="#303030"
                  secureTextEntry={!showNewPassword}
                />
              )}
              name="newPassword"
            />
            <DynamicPressable
              position="absolute"
              justifyContent="center"
              right={0}
              paddingRight={11}
              onPress={() => setShowNewPassword(!showNewPassword)}>
              <AntDesign
                size={24}
                name={showNewPassword ? 'eye' : 'eyeo'}
                color="#E00404"
              />
            </DynamicPressable>
          </DynamicView>
        </DynamicView>
        <DynamicView marginTop={21}>
          <DynamicText
            fontFamily={fonts.DMSans700Bold}
            fontSize={15}
            lineHeight={20}
            color="#303030">
            Confirm New Password
          </DynamicText>
          <DynamicView
            justifyContent="center"
            position="relative"
            marginTop={4}>
            <Controller
              control={control}
              rules={{required: true}}
              render={({field: {onChange, onBlur, value}}) => (
                <DynamicTextInput
                  testID="@test-id/reg-input-confirmPassword"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Password"
                  placeholderTextColor={Colors.grey}
                  backgroundColor="#F8F8F8"
                  borderRadius={4}
                  paddingHorizontal={21}
                  paddingVertical={11}
                  fontSize={14}
                  lineHeight={19}
                  fontFamily={fonts.DMSans400Regular}
                  fontWeight="400"
                  color="#303030"
                  secureTextEntry={!showConfirmPassword}
                />
              )}
              name="confirmPassword"
            />
            <DynamicPressable
              position="absolute"
              justifyContent="center"
              right={0}
              paddingRight={11}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <AntDesign
                size={24}
                name={showConfirmPassword ? 'eye' : 'eyeo'}
                color="#E00404"
              />
            </DynamicPressable>
          </DynamicView>
        </DynamicView>
        <DynamicView marginTop="auto" marginBottom={21}>
          <DishButton
            icon="arrowright"
            label="Update password"
            variant="primary"
            onPress={onSubmit}
            showSpinner={showLoading}
          />
        </DynamicView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default React.forwardRef(NewPassword);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 11,
  },
  keyBoardContent: {
    flexGrow: 1,
  },
});
