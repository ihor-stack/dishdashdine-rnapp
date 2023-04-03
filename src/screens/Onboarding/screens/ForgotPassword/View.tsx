import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  DynamicPressable,
  DynamicText,
  DynamicTextInput,
  DynamicView,
} from '@/components';
import {fonts} from '@/themes/fonts';
import {Controller} from 'react-hook-form';
import {Colors} from '@/themes';
import DishButton from '@/components/DishButton';
import {KeyboardAvoidingView, Platform, ScrollView} from 'react-native';

const {DMSans400Regular, DMSans500Medium, DMSans700Bold} = fonts;

export interface ForgotPasswordViewProps {
  control: any;
  onLogin: any;
  onResend: any;
  onResendPassword: () => void;
  showLoading: boolean;
}

const ForgotPasswordView = (props: ForgotPasswordViewProps) => {
  const {control, onLogin, onResendPassword, showLoading, onResend} = props;

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flexGrow: 1,
        }}
        style={{backgroundColor: Colors.white, paddingHorizontal: 11}}>
        <DynamicView marginTop={21}>
          <DynamicText
            fontFamily={DMSans700Bold}
            fontSize={15}
            lineHeight={20}
            color={Colors.black}>
            Email
          </DynamicText>
          <Controller
            control={control}
            rules={{required: true}}
            render={({field: {onChange, onBlur, value}}) => (
              <DynamicTextInput
                testID="@test-id/login-input-email"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder={'Email Address'}
                placeholderTextColor={Colors.grey}
                backgroundColor={Colors.lightestGrey}
                marginTop={4}
                borderRadius={4}
                paddingHorizontal={21}
                paddingVertical={11}
                fontSize={14}
                lineHeight={19}
                fontFamily={DMSans400Regular}
                fontWeight="400"
                color={Colors.black}
                editable={!showLoading}
              />
            )}
            name="emailAddress"
          />
        </DynamicView>
        <DynamicView marginTop={17}>
          <DynamicText
            fontFamily={DMSans400Regular}
            fontSize={13}
            lineHeight={16}
            color={Colors.grey}>
            Please provide your account’s email address for which you want to
            reset your password.
          </DynamicText>
          <DynamicPressable marginTop={10} onPress={onResend}>
            <DynamicText
              fontFamily={DMSans400Regular}
              fontSize={13}
              lineHeight={16}
              color={Colors.black}>
              Resend password reset link.
            </DynamicText>
          </DynamicPressable>
        </DynamicView>
        <DynamicView marginTop="auto">
          <DishButton
            icon="arrowright"
            label="Request password reset"
            variant="primary"
            onPress={onLogin}
          />
          <DynamicView
            flexDirection="row"
            width="100%"
            justifyContent="center"
            alignItems="center"
            marginTop={15}
            marginBottom={28}>
            <DynamicText
              fontWeight="500"
              fontFamily={DMSans500Medium}
              lineHeight={20}
              fontSize={15}
              color={Colors.red}>
              Cancel
            </DynamicText>
          </DynamicView>
        </DynamicView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ForgotPasswordView;
