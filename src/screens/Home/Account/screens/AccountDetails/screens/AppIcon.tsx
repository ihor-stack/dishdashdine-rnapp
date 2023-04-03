import React, {useEffect, useState} from 'react';
import {
  DynamicImage,
  DynamicPressable,
  DynamicText,
  DynamicView,
} from '@/components';
import {Colors, fonts} from '@/themes';
import {changeIcon, getIcon} from 'react-native-change-icon';
import {Platform} from 'react-native';

const appIconLG = require('@/assets/images/myAccount/main-app-icon.png');
const appIconDefault = require('@/assets/images/myAccount/default_app_icon.png');
const appIconLight = require('@/assets/images/myAccount/light_app_icon.png');
const appIconDark = require('@/assets/images/myAccount/dark_app_icon.png');

const AppIcon = () => {
  const [currentIconName, setCurrentIconName] = useState('');
  useEffect(() => {
    getIcon().then(name => {
      setCurrentIconName(name);
    });
  }, []);

  const renderImage = () => {
    switch (currentIconName) {
      case 'default':
        return appIconDefault;
      case 'dark':
        return appIconDark;
      case 'light':
        return appIconLight;
      default:
        return appIconDefault;
    }
  };

  return (
    <DynamicView flex={1} backgroundColor={Colors.white}>
      <DynamicView alignItems="center" marginHorizontal={21}>
        <DynamicImage
          source={renderImage()}
          width={105}
          height={105}
          marginVertical={20}
        />
        <DynamicText
          textAlign="center"
          fontFamily={fonts.DMSans400Regular}
          fontSize={13}
          lineHeight={12.62}
          color={Colors.grey}>
          We love that you’re part of the Dish Dash Dine experience, so we
          created different app icons for you to choose from to make your
          experience even better.{' '}
        </DynamicText>
      </DynamicView>
      <DynamicView
        borderBottomWidth={1}
        borderBottomColor={Colors.lightGrey}
        marginTop={20}
        marginHorizontal={11}
      />
      <DynamicView
        flexDirection="row"
        marginHorizontal={30}
        marginTop={21}
        justifyContent="space-between">
        <DynamicPressable
          onPress={() => {
            changeIcon(Platform.OS === 'ios' ? 'default' : 'ic_launcher')
              .then(setCurrentIconName);
          }}>
          <DynamicImage
            source={appIconDefault}
            width={75}
            height={75}
            marginBottom={9}
          />
          <DynamicText
            textAlign="center"
            fontFamily={fonts.DMSans700Bold}
            fontSize={15}
            lineHeight={19.53}>
            Default
          </DynamicText>
        </DynamicPressable>
        <DynamicPressable
          onPress={() => {
            changeIcon(Platform.OS === 'ios' ? 'light' : 'ic_launcher_light')
              .then(setCurrentIconName);
          }}>
          <DynamicImage
            source={appIconLight}
            width={75}
            height={75}
            marginBottom={9}
          />
          <DynamicText
            textAlign="center"
            fontFamily={fonts.DMSans700Bold}
            fontSize={15}
            lineHeight={19.53}>
            Light
          </DynamicText>
        </DynamicPressable>
        <DynamicPressable
          onPress={() => {
            changeIcon(Platform.OS === 'ios' ? 'dark' : 'ic_launcher_dark')
              .then(setCurrentIconName);
          }}>
          <DynamicImage
            source={appIconDark}
            width={75}
            height={75}
            marginBottom={9}
          />
          <DynamicText
            textAlign="center"
            fontFamily={fonts.DMSans700Bold}
            fontSize={15}
            lineHeight={19.53}>
            Dark
          </DynamicText>
        </DynamicPressable>
      </DynamicView>
    </DynamicView>
  );
};

export default AppIcon;
