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
import DishButton from '@/components/DishButton';
import {Colors} from '@/themes';
import {KeyboardAvoidingView, Platform, ScrollView} from 'react-native';
import {IUser} from '@/api/user';
import DishSpinner from '@/components/DishSpinner';

const {DMSans400Regular, DMSans500Medium, DMSans700Bold} = fonts;

export interface LoginViewProps {
  control: any;
  onLogin: any;
  showPassword: boolean;
  setShowPassword: any;
  handleSubmit: any;
  showLoading: boolean;
  onForgotPassword: () => void;
  currentUser: IUser;
  isFrom: any;
  onSubmit: any;
  onHungry: any;
}

const LoginView = ({
  control,
  showPassword,
  setShowPassword,
  showLoading,
  onForgotPassword,
  isFrom,
  onSubmit,
  onHungry,
}: LoginViewProps) => {
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        accessible={false}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        style={{backgroundColor: Colors.white, paddingHorizontal: 11}}>
        {showLoading && <DishSpinner />}
        <DynamicView marginTop={21}>
          <DynamicText
            fontFamily={DMSans700Bold}
            fontSize={15}
            lineHeight={20}
            color="#303030">
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
                placeholder={'email@address.com'}
                placeholderTextColor={Colors.grey}
                backgroundColor="#F8F8F8"
                marginTop={4}
                borderRadius={4}
                paddingHorizontal={21}
                paddingVertical={11}
                fontSize={14}
                lineHeight={19}
                fontFamily={DMSans400Regular}
                fontWeight="400"
                color="#818183"
                editable={!showLoading}
              />
            )}
            name="emailAddress"
          />
        </DynamicView>
        <DynamicView marginTop={21}>
          <DynamicView
            flexDirection="row"
            alignItems="baseline"
            justifyContent="space-between">
            <DynamicText
              fontFamily={DMSans700Bold}
              fontSize={15}
              lineHeight={20}
              color="#303030">
              Password
            </DynamicText>
            <DynamicPressable onPress={onForgotPassword}>
              <DynamicText
                fontFamily={DMSans400Regular}
                fontSize={13}
                lineHeight={16}
                color="#818183">
                Forgot Password?
              </DynamicText>
            </DynamicPressable>
          </DynamicView>
          <Controller
            control={control}
            rules={{required: true}}
            render={({field: {onChange, onBlur, value}}) => (
              <DynamicView
                justifyContent="center"
                position="relative"
                marginTop={4}>
                <DynamicTextInput
                  testID="@test-id/reg-input-password"
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
                  fontFamily={DMSans400Regular}
                  fontWeight="400"
                  color="#303030"
                  secureTextEntry={!showPassword}
                  editable={!showLoading}
                />
                <DynamicPressable
                  position="absolute"
                  justifyContent="center"
                  right={0}
                  paddingRight={11}
                  onPress={() => setShowPassword(!showPassword)}>
                  <AntDesign
                    size={24}
                    name={showPassword ? 'eye' : 'eyeo'}
                    color="#E00404"
                  />
                </DynamicPressable>
              </DynamicView>
            )}
            name="password"
          />
        </DynamicView>
        <DynamicView marginTop="auto" marginBottom={28}>
          <DishButton
            icon="arrowright"
            label="Login"
            variant="primary"
            showSpinner={showLoading}
            onPress={onSubmit}
          />
          {isFrom !== 'guest' && (
            <DynamicPressable
              flexDirection="row"
              width="100%"
              justifyContent="center"
              alignItems="center"
              marginTop={15}
              onPress={onHungry}>
              <DynamicText
                fontWeight="500"
                fontFamily={DMSans500Medium}
                lineHeight={20}
                fontSize={15}
                color={'#303030'}>
                No thanks, hungry!
              </DynamicText>
            </DynamicPressable>
          )}
        </DynamicView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginView;
