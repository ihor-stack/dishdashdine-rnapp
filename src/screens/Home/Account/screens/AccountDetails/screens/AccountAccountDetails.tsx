import React, {useCallback, useState} from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';

import {
  DynamicImage,
  DynamicPressable,
  DynamicText,
  DynamicView,
} from '@/components';
import {fonts} from '@/themes/fonts';
import {AccountDetailsStackNavParamList} from '../navigation/Navigation';
import {useDispatch, useSelector} from 'react-redux';
import {accountSelectors} from '@/store/account';
import moment from 'moment';
import {forceSignOut} from '@/utils/app-actions';
import UserService from '@/api/user';
import DishSpinner from '@/components/DishSpinner';
import {captureErrorException} from '@/utils/error-handler';
import {ScrollView} from 'react-native';


const arrowRight = require('@/assets/images/right.png');

const AccountDetails = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector(accountSelectors.selectCurrentUser);
  const pushNotificationToken = useSelector(
    accountSelectors.selectDevicePushToken,
  );
  const navigation =
    useNavigation<NavigationProp<AccountDetailsStackNavParamList>>();

  const onNavStackPress = useCallback(
    (navKey: keyof AccountDetailsStackNavParamList, title?: string) => {
      if (title && navKey === 'UpdateNumber') {
        navigation.navigate(navKey);
      } else {
        navigation.navigate(navKey);
      }
    },
    [navigation],
  );

  const onSignOut = async () => {
    try {
      setIsLoading(true);
      if (pushNotificationToken) {
        await UserService.deletePushNotificationToken({
          deviceToken: pushNotificationToken,
        });
      }
      setIsLoading(false);
      await forceSignOut(dispatch, navigation);
    } catch (error) {
      setIsLoading(false);
      captureErrorException(error);
      await forceSignOut(dispatch, navigation);
    }
  };

  const onDeleteAccount = async () => {
    navigation.navigate('DeleteAccount');
  };

  return (
    <ScrollView>
      <DynamicView flex={1} backgroundColor="#fff">
        {isLoading && <DishSpinner />}
        <DynamicView
          paddingHorizontal={11}
          borderBottomWidth={1}
          borderBottomColor="#F2F4F5"
          paddingVertical={15}>
          <DynamicView marginBottom={5}>
            <DynamicText
              marginBottom={5}
              fontSize={15}
              lineHeight={20}
              fontFamily={fonts.DMSans700Bold}>
              Name
            </DynamicText>
          </DynamicView>
          <DynamicText
            fontSize={14}
            lineHeight={18}
            fontFamily={fonts.DMSans400Regular}>
            {user?.firstName} {user?.lastName}
          </DynamicText>
        </DynamicView>
        <DynamicView
          paddingHorizontal={11}
          borderBottomWidth={1}
          borderBottomColor="#F2F4F5"
          paddingVertical={15}>
          <DynamicPressable
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            onPress={() => onNavStackPress('UpdateEmail')}>
            <DynamicView>
              <DynamicView marginBottom={5}>
                <DynamicText
                  marginBottom={5}
                  fontSize={15}
                  lineHeight={20}
                  fontFamily={fonts.DMSans700Bold}>
                  Email
                </DynamicText>
              </DynamicView>
              <DynamicText
                fontSize={14}
                lineHeight={18}
                fontFamily={fonts.DMSans400Regular}>
                {user?.email}
              </DynamicText>
            </DynamicView>
            <DynamicView flexDirection="row" alignItems="center">
              <DynamicText
                fontSize={13}
                lineHeight={16}
                fontFamily={fonts.DMSans400Regular}
                color={user?.emailConfirmed ? '#9BCF1B' : '#FF9D60'}>
                {user?.emailConfirmed ? 'Verified' : 'Unverified'}
              </DynamicText>
              <DynamicImage
                marginLeft={14}
                marginRight={7}
                source={arrowRight}
                width={7.13}
                height={11.67}
              />
            </DynamicView>
          </DynamicPressable>
        </DynamicView>
        <DynamicView
          paddingHorizontal={11}
          borderBottomWidth={1}
          borderBottomColor="#F2F4F5"
          paddingVertical={15}>
          <DynamicPressable
            onPress={() => onNavStackPress('UpdateNumber')}
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center">
            <DynamicView>
              <DynamicView marginBottom={5}>
                <DynamicText
                  fontSize={15}
                  lineHeight={20}
                  fontFamily={fonts.DMSans700Bold}>
                  Number
                </DynamicText>
              </DynamicView>
              <DynamicText
                fontSize={14}
                lineHeight={18}
                fontFamily={fonts.DMSans400Regular}>
                {user?.phoneNumber}
              </DynamicText>
            </DynamicView>
            <DynamicView flexDirection="row" alignItems="center">
              <DynamicText
                fontSize={13}
                lineHeight={16}
                fontFamily={fonts.DMSans400Regular}
                color={user?.phoneNumberConfirmed ? '#9BCF1B' : '#FF9D60'}>
                {user?.phoneNumberConfirmed ? 'Verified' : 'Unverified'}
              </DynamicText>
              <DynamicImage
                marginLeft={14}
                marginRight={7}
                source={arrowRight}
                width={7.13}
                height={11.67}
              />
            </DynamicView>
          </DynamicPressable>
        </DynamicView>
        <DynamicView
          paddingHorizontal={11}
          borderBottomWidth={1}
          borderBottomColor="#F2F4F5"
          paddingVertical={15}>
          <DynamicView marginBottom={5}>
            <DynamicText
              fontSize={15}
              lineHeight={20}
              fontFamily={fonts.DMSans700Bold}>
              Date of birth
            </DynamicText>
          </DynamicView>
          <DynamicText
            fontSize={14}
            lineHeight={18}
            fontFamily={fonts.DMSans400Regular}>
            {moment(user?.dateOfBirth).format('DD-MM-YYYY')}
          </DynamicText>
        </DynamicView>
        <DynamicView
          paddingVertical={15}
          paddingHorizontal={11}
          borderBottomWidth={6}
          borderBottomColor="#F2F4F5">
          <DynamicPressable
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            onPress={() => onNavStackPress('NewPassword')}>
            <DynamicView>
              <DynamicView marginBottom={5}>
                <DynamicText
                  fontSize={15}
                  lineHeight={20}
                  fontFamily={fonts.DMSans700Bold}>
                  Password
                </DynamicText>
              </DynamicView>
              <DynamicText
                fontSize={14}
                lineHeight={18}
                fontFamily={fonts.DMSans400Regular}>
                *********
              </DynamicText>
            </DynamicView>
            <DynamicView flexDirection="row" alignItems="center">
              <DynamicImage
                marginLeft={14}
                marginRight={7}
                source={arrowRight}
                width={7.13}
                height={11.67}
              />
            </DynamicView>
          </DynamicPressable>
        </DynamicView>
        <DynamicView
          paddingHorizontal={11}
          borderBottomWidth={1}
          borderBottomColor="#F2F4F5"
          paddingVertical={15}>
          <DynamicPressable
            onPress={() => onNavStackPress('Notifications')}
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center">
            <DynamicText
              marginBottom={5}
              fontSize={15}
              lineHeight={20}
              fontFamily={fonts.DMSans700Bold}>
              Notifications
            </DynamicText>
            <DynamicImage
              marginLeft={14}
              marginRight={7}
              source={arrowRight}
              width={7.13}
              height={11.67}
            />
          </DynamicPressable>
        </DynamicView>
        <DynamicView
          paddingHorizontal={11}
          borderBottomWidth={1}
          borderBottomColor="#F2F4F5"
          paddingVertical={15}>
          <DynamicPressable
            onPress={() => onNavStackPress('AppIcon')}
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center">
            <DynamicText
              marginBottom={5}
              fontSize={15}
              lineHeight={20}
              fontFamily={fonts.DMSans700Bold}>
              App icon
            </DynamicText>
            <DynamicImage
              marginLeft={14}
              marginRight={7}
              source={arrowRight}
              width={7.13}
              height={11.67}
            />
          </DynamicPressable>
        </DynamicView>
        <DynamicView
          paddingHorizontal={11}
          borderBottomWidth={1}
          borderBottomColor="#F2F4F5"
          paddingVertical={15}>
          <DynamicPressable
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            onPress={onSignOut}>
            <DynamicText
              marginBottom={5}
              fontSize={15}
              lineHeight={20}
              fontFamily={fonts.DMSans700Bold}>
              Sign out
            </DynamicText>
            <DynamicImage
              marginLeft={14}
              marginRight={7}
              source={arrowRight}
              width={7.13}
              height={11.67}
            />
          </DynamicPressable>
        </DynamicView>
        <DynamicView
          paddingHorizontal={11}
          borderBottomWidth={1}
          borderBottomColor="#F2F4F5"
          paddingVertical={15}>
          <DynamicPressable
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            onPress={onDeleteAccount}>
            <DynamicText
              marginBottom={5}
              fontSize={15}
              lineHeight={20}
              fontFamily={fonts.DMSans700Bold}>
              Delete your account
            </DynamicText>
            <DynamicImage
              marginLeft={14}
              marginRight={7}
              source={arrowRight}
              width={7.13}
              height={11.67}
            />
          </DynamicPressable>
        </DynamicView>
      </DynamicView>
    </ScrollView>
  );
};

export default AccountDetails;
