import {StyleSheet, View, Image, Dimensions} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import DynamicText from './DynamicText';
import {fonts} from '@/themes';

const {DMSans500Medium} = fonts;

export interface DishToastProps {
  variant: 'success' | 'warning' | 'error' | 'info' | undefined;
  title: string;
  message: string;
}

const DishToast = ({variant, title, message}: DishToastProps) => {
  const ToastSuccess = ['#449D4D', '#5FAF67'];
  const ToastError = ['#E00404', '#FF594B'];
  const ToastWarning = ['#E4A541', '#F8C445'];
  const ToastDefault = ['#6c757d', '#5c636a'];

  const renderVariantStyle = () => {
    switch (variant) {
      case 'success':
        return ToastSuccess;
      case 'error':
        return ToastError;
      case 'warning':
        return ToastWarning;
      default:
        return ToastDefault;
    }
  };

  const renderVariantTextColor = () => {
    switch (variant) {
      case 'success':
        return '#ffffff';
      case 'error':
        return '#ffffff';
      case 'warning':
        return '#ffffff';
      default:
        return '#ffffff';
    }
  };

  return (
    <LinearGradient colors={renderVariantStyle()} style={styles.ToastContainer}>
      {variant === 'success' && (
        <Image source={require('../assets/images/circle-check.png')} />
      )}
      {variant === 'warning' && (
        <Image source={require('../assets/images/circle-question.png')} />
      )}
      {variant === 'error' && (
        <Image source={require('../assets/images/circle-exclaim.png')} />
      )}
      <View style={styles.ToastContentContainer}>
        <DynamicText
          fontFamily={DMSans500Medium}
          fontSize={16}
          lineHeight={20.83}
          color={renderVariantTextColor()}>
          {title}
        </DynamicText>
        <DynamicText
          fontFamily={DMSans500Medium}
          fontSize={13}
          lineHeight={15.62}
          numberOfLines={4}
          paddingRight={50}
          flexWrap={'wrap'}
          color={renderVariantTextColor()}>
          {message}
        </DynamicText>
      </View>
    </LinearGradient>
  );
};

export default DishToast;

const styles = StyleSheet.create({
  ToastContainer: {
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: Dimensions.get('window').width - 20,
    paddingVertical: 9,
    paddingHorizontal: 15,
  },
  ToastContentContainer: {
    justifyContent: 'center',
    marginLeft: 15,
  },
});
