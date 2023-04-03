import React from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  DynamicPressable,
  DynamicText,
  DynamicTextInput,
  DynamicView,
} from '@/components';
import {Colors, fonts} from '@/themes';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from './styles';
import {Controller} from 'react-hook-form';
import DishDatePicker from '@/components/DishDatePicker';
import DishButton from '@/components/DishButton';

const {DMSans400Regular, DMSans500Medium, DMSans700Bold} = fonts;

export interface RegisterViewProps {
  showLoading: boolean;
  onSubmit: any;
  control: any;
  showPassword: boolean;
  setShowPassword: any;
  showConfirnPassword: boolean;
  setShowConfirmPassword: any;
  onLogin: any;
  curDate: any;
  setCurDate: any;
  open: boolean;
  setOpen: any;
  setValue: any;
  onOnboardingNavPress: any;
}

const RegisterView = (props: RegisterViewProps, ref: any) => {
  const {
    showLoading,
    control,
    onSubmit,
    showPassword,
    setShowPassword,
    showConfirnPassword,
    setShowConfirmPassword,
    onLogin,
    curDate,
    setCurDate,
    open,
    setOpen,
    setValue,
    onOnboardingNavPress,
  } = props;

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.keyBoardContent}
      showsVerticalScrollIndicator={false}
      ref={ref}
      style={styles.container}>
      <DynamicView paddingHorizontal={11} flex={1}>
        <DynamicView marginTop={21}>
          <DynamicText
            fontFamily={DMSans700Bold}
            fontSize={15}
            lineHeight={20}
            color="#303030">
            First Name
          </DynamicText>
          <Controller
            control={control}
            rules={{required: true}}
            render={({field: {onChange, onBlur, value}}) => (
              <DynamicTextInput
                testID="@test-id/reg-input-first-name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder={`First Name`}
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
                color="#303030"
              />
            )}
            name="firstName"
          />
        </DynamicView>
        <DynamicView marginTop={21}>
          <DynamicText
            fontFamily={DMSans700Bold}
            fontSize={15}
            lineHeight={20}
            color="#303030">
            Last Name
          </DynamicText>
          <Controller
            control={control}
            rules={{required: true}}
            render={({field: {onChange, onBlur, value}}) => (
              <DynamicTextInput
                testID="@test-id/reg-input-last-name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder={`Last Name`}
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
                color="#303030"
              />
            )}
            name="lastName"
          />
        </DynamicView>
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
                testID="@test-id/reg-input-email"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder={'Email Address'}
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
                color="#303030"
              />
            )}
            name="email"
          />
        </DynamicView>
        <DynamicView marginTop={21}>
          <DynamicText
            fontFamily={DMSans700Bold}
            fontSize={15}
            lineHeight={20}
            color="#303030">
            Number
          </DynamicText>
          <Controller
            control={control}
            rules={{required: true}}
            render={({field: {onChange, onBlur, value}}) => (
              <DynamicTextInput
                testID="@test-id/reg-input-number"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder={'Phone Number'}
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
                color="#303030"
                keyboardType="numeric"
              />
            )}
            name="phoneNumber"
          />
        </DynamicView>
        <DynamicView marginTop={21}>
          <DynamicView flexDirection="row" justifyContent="space-between">
            <DynamicText
              fontFamily={DMSans700Bold}
              fontSize={15}
              lineHeight={20}
              color="#303030">
              Date of birth
            </DynamicText>
            <DynamicText
              fontFamily={DMSans400Regular}
              fontWeight="400"
              fontSize={13}
              lineHeight={16}
              color="#818183">
              Used to verify age on restricted items
            </DynamicText>
          </DynamicView>
          <Controller
            control={control}
            rules={{required: true}}
            render={({field: {onChange, onBlur, value}}) => (
              <DynamicTextInput
                testID="@test-id/reg-input-dateOfBirth"
                onBlur={() => {
                  onBlur();
                  setOpen(false);
                }}
                onChangeText={onChange}
                value={value}
                placeholder="Birth Date"
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
                color="#303030"
                onTouchStart={() => setOpen(true)}
                onFocus={() => setOpen(true)}
              />
            )}
            name="dateOfBirth"
          />
        </DynamicView>
        <DynamicView marginTop={21}>
          <DynamicText
            fontFamily={DMSans700Bold}
            fontSize={15}
            lineHeight={20}
            color="#303030">
            Password
          </DynamicText>
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
        <DynamicView marginTop={21}>
          <DynamicText
            fontFamily={DMSans700Bold}
            fontSize={15}
            lineHeight={20}
            color="#303030">
            Confirm Password
          </DynamicText>
          <Controller
            control={control}
            rules={{required: true}}
            render={({field: {onChange, onBlur, value}}) => (
              <DynamicView
                justifyContent="center"
                position="relative"
                marginTop={4}>
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
                  fontFamily={DMSans400Regular}
                  fontWeight="400"
                  color="#303030"
                  secureTextEntry={!showConfirnPassword}
                />
                <DynamicPressable
                  position="absolute"
                  justifyContent="center"
                  right={0}
                  paddingRight={11}
                  onPress={() => setShowConfirmPassword(!showConfirnPassword)}>
                  <AntDesign
                    size={24}
                    name={showConfirnPassword ? 'eye' : 'eyeo'}
                    color="#E00404"
                  />
                </DynamicPressable>
              </DynamicView>
            )}
            name="confirmPassword"
          />
        </DynamicView>

        {/* onSubmit */}
        <DynamicView marginTop="auto">
          <DynamicView marginVertical={18}>
            <DynamicView flexDirection="row" flexWrap="wrap">
              <DynamicText
                color="#818183"
                fontSize={13}
                lineHeight={16}
                fontFamily={DMSans400Regular}>
                By Signing up, you agree to the
              </DynamicText>
              <DynamicPressable
                marginHorizontal={3}
                onPress={() => onOnboardingNavPress('TermsOfService')}>
                <DynamicText
                  fontFamily={DMSans400Regular}
                  color="#303030"
                  fontSize={13}
                  lineHeight={16}>
                  Terms of Service
                </DynamicText>
              </DynamicPressable>
              <DynamicView marginRight={3}>
                <DynamicText
                  fontFamily={DMSans400Regular}
                  color="#818183"
                  fontSize={13}
                  lineHeight={16}>
                  and
                </DynamicText>
              </DynamicView>
              <DynamicPressable
                onPress={() => onOnboardingNavPress('PrivacyPolicy')}>
                <DynamicText
                  fontFamily={DMSans400Regular}
                  color="#303030"
                  fontSize={13}
                  lineHeight={16}>
                  Privacy Policy
                </DynamicText>
              </DynamicPressable>
            </DynamicView>
          </DynamicView>
          <DishButton
            icon="arrowright"
            onPress={onSubmit}
            variant="primary"
            showSpinner={showLoading}
            label="Next"
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
              color={'#303030'}>
              Already have an account?
            </DynamicText>
            <DynamicPressable marginLeft={6} onPress={onLogin}>
              <DynamicText
                fontWeight="500"
                fontFamily={DMSans500Medium}
                lineHeight={20}
                fontSize={15}
                color={'#E00404'}>
                Login
              </DynamicText>
            </DynamicPressable>
          </DynamicView>
        </DynamicView>
      </DynamicView>
      <DishDatePicker
        date={curDate}
        value={curDate}
        open={open}
        placeholder={undefined}
        placeholderTextColor={Colors.grey}
        onCancel={() => {
          setOpen(false);
        }}
        onDateChanged={(val: any) => {
          setCurDate(val.date);
          setValue('dateOfBirth', val.formatted);
        }}
      />
    </KeyboardAwareScrollView>
  );
};

export default React.forwardRef(RegisterView);
