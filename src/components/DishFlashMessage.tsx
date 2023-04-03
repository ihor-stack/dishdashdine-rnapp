import React from 'react';
import {showMessage} from 'react-native-flash-message';
import {View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Colors, fonts} from '@/themes';
import {Icon} from 'native-base';
import FastImage from 'react-native-fast-image';
import DynamicView from './DynamicView';
const defaultLogo = require('@/assets/images/default_logo.png');

const styles: any = {
  backgroundColor: Colors.white,
  borderRadius: 12,
  borderWidth: 0.4,
  borderStyle: 'solid',
  padding: 11,
  alignItems: 'center',
  borderColor: '#0000001a',
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,

  elevation: 5,
};

const textStyle: any = {
  color: Colors.black,
  fontFamily: fonts.DMSans500Medium,
  fontSize: 11,
  lineHeight: 11,
};

const titleStyles: any = {
  color: Colors.black,
  fontFamily: fonts.DMSans500Medium,
  fontSize: 16,
  lineHeight: 20.83,
};

export const showSuccessMessage = (
  message: string,
  description: string,
  autoHide = true,
) => {
  return showMessage({
    message,
    description,
    floating: true,
    icon: 'success',
    style: styles,
    textStyle: textStyle,
    titleStyle: titleStyles,
    autoHide,
    renderFlashMessageIcon(icon = 'success', style = {}, iconProps = {}) {
      if (icon) {
        return (
          // Your icon here
          <DynamicView flexDirection="row" alignItems="center">
            <DynamicView
              borderLeftColor={Colors.success}
              borderLeftWidth={5}
              borderRadius={5}
              width={5}
              height={53}
              marginRight={16}
            />

            <DynamicView marginRight={16.8}>
              <AntDesign name="checkcircle" color={Colors.success} size={24} />
            </DynamicView>
          </DynamicView>
        );
      }
      return null;
    },
  });
};

export const showWarningMessage = (
  message: string,
  description: string,
  autoHide = true,
) => {
  return showMessage({
    message,
    description,
    floating: true,
    icon: 'warning',
    style: styles,
    textStyle: textStyle,
    titleStyle: titleStyles,
    autoHide,
    renderFlashMessageIcon(icon = 'warning', style = {}, iconProps = {}) {
      if (icon) {
        return (
          // Your icon here
          <DynamicView flexDirection="row" alignItems="center">
            <DynamicView
              borderLeftColor={Colors.warning}
              borderLeftWidth={5}
              borderRadius={5}
              width={5}
              height={53}
              marginRight={16}
            />

            <DynamicView marginRight={16.8}>
              <AntDesign
                name="exclamationcircle"
                color={Colors.warning}
                size={24}
              />
            </DynamicView>
          </DynamicView>
        );
      }
      return null;
    },
  });
};

export const showErrorMessage = (
  message: string,
  description: string,
  autoHide = true,
) => {
  return showMessage({
    message,
    description,
    floating: true,
    icon: 'danger',
    style: styles,
    textStyle: textStyle,
    titleStyle: titleStyles,
    autoHide,
    renderFlashMessageIcon(icon = 'danger', style = {}, iconProps = {}) {
      if (icon) {
        return (
          // Your icon here
          <DynamicView flexDirection="row" alignItems="center">
            <DynamicView
              borderLeftColor={Colors.red}
              borderLeftWidth={5}
              borderRadius={5}
              width={5}
              height={53}
              marginRight={16}
            />

            <DynamicView marginRight={16.8}>
              <AntDesign name="closecircle" color={Colors.red} size={24} />
            </DynamicView>
          </DynamicView>
        );
      }
      return null;
    },
  });
};

export const showDefaultMessage = (
  message: string,
  description: string,
  autoHide = true,
) => {
  return showMessage({
    message,
    description,
    floating: true,
    icon: 'default',
    style: styles,
    textStyle: textStyle,
    titleStyle: titleStyles,
    autoHide,
    renderFlashMessageIcon(icon = 'default', style = {}, iconProps = {}) {
      if (icon) {
        return (
          // Your icon here
          <DynamicView marginRight={17}>
            <FastImage source={defaultLogo} style={{width: 53, height: 53}} />
          </DynamicView>
        );
      }
      return null;
    },
  });
};
