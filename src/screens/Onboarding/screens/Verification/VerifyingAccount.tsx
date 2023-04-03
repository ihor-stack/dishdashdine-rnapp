import React, {useEffect, useState} from 'react';
import {CommonActions, useNavigation, useRoute} from '@react-navigation/native';
import {Box, Center, Text, View} from 'native-base';
import {Colors} from '@/themes';
import DishSpinner from '@/components/DishSpinner';
import {captureErrorException} from '@/utils/error-handler';
import UserService from '@/api/user';
import {DynamicView, NavigationHeader} from '@/components';
import DishButton from '@/components/DishButton';

import VerifyFailSVG from '@/assets/svg/verify-fail.svg';
import VerifySuccessSVG from '@/assets/svg/verify-success.svg';
import {fetchCurrentUser} from '@/store/account/thunk';
import {setIsAuthenticated} from '@/store/authentication';
import {useDispatch} from 'react-redux';
import storage from '@/utils/storage';
import {AUTH_TOKEN} from '@/constants';
import {isEmpty} from 'lodash';

const VerifyingAccount = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<any>();
  const params = useRoute().params as any;
  const token = params?.token;
  const id = params?.id;

  const [isValidating, setIsValidating] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [buttonText, setButtonText] = useState('Continue to restaurants');

  useEffect(() => {
    const validate = async () => {
      setIsValidating(true);
      navigation.setOptions({
        header: () => null,
      });

      try {
        const response = await UserService.confirmUser({
          token,
        });
        setIsValidating(false);
        setIsSuccess(true);
        setButtonText('Continue to restaurants');
      } catch (e) {
        captureErrorException(e);
        setIsSuccess(false);
        setIsValidating(false);
        setButtonText('Resend Verification');

        navigation.setOptions({
          header: () => (
            <NavigationHeader
              showBackButton
              title="Verification"
              onGoBackPress={handleBackButton}
            />
          ),
        });
      }
    };

    validate();
  }, [token]);

  const handleBackButton = async () => {
    const authToken = await storage.getItem(AUTH_TOKEN);
    if (!isEmpty(authToken)) {
      await dispatch(fetchCurrentUser()).unwrap();
      await dispatch(setIsAuthenticated(true));
    } else {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Onboarding', params: {screen: 'Welcome'}}],
        }),
      );
    }
  };

  const onHandleButtonPress = async () => {
    if (isSuccess && !isValidating) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Address', params: {isFrom: 'register'}}],
        }),
      );
    } else if (!isSuccess && !isValidating) {
    }
  };

  return (
    <View flex={1}>
      <Box
        bgColor={Colors.white}
        flex={1}
        justifyContent="center"
        alignItems="center">
        <Center marginRight={60} marginLeft={60}>
          {isValidating && <DishSpinner />}
          {isValidating && (
            <>
              <Text
                fontSize={24}
                lineHeight={31}
                bold
                textAlign="center"
                color={Colors.black}
                marginTop={5}>
                Verifying...
              </Text>
              <Text
                color={Colors.grey}
                fontWeight="600"
                fontSize={13}
                lineHeight={16}
                marginTop={33}>
                Please wait while your information is being verified.
              </Text>
            </>
          )}
          {!isValidating && isSuccess && (
            <>
              <VerifySuccessSVG />
              <Text
                fontSize={24}
                lineHeight={31}
                bold
                textAlign="center"
                color={Colors.black}
                marginTop={5}>
                Verified!
              </Text>
              <Text
                textAlign="center"
                color={Colors.grey}
                fontWeight="600"
                fontSize={13}
                lineHeight={16}
                marginTop={3}>
                You have sucessfully verified your email address. It’s finally
                time to check out some tasty grub!
              </Text>
            </>
          )}
          {!isValidating && !isSuccess && (
            <>
              <VerifyFailSVG />
              <Text
                fontSize={24}
                lineHeight={31}
                bold
                color={Colors.black}
                textAlign="center"
                marginTop={5}>
                Whoops!
              </Text>
              <Text
                textAlign="center"
                color={Colors.grey}
                fontWeight="600"
                fontSize={13}
                lineHeight={16}
                marginTop={3}>
                Unable to verify your email address, {'\n'}
                please try again.
              </Text>
            </>
          )}
        </Center>
      </Box>
      <DynamicView
        backgroundColor={Colors.white}
        paddingHorizontal={11}
        paddingBottom={42}>
        {!isValidating && (
          <DishButton
            variant="primary"
            label={buttonText}
            icon="arrowright"
            onPress={onHandleButtonPress}
          />
        )}
      </DynamicView>
    </View>
  );
};

export default VerifyingAccount;
