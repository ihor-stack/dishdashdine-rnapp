import React from 'react';
import LottieLoader from '@/vendors/react-native-lottie-loader';

const DishSpinner = () => {
  return (
    <LottieLoader
      visible
      animationType="fade"
      source={require('@/assets/spinner-loading.json')}
      loop
      animationStyle={{
        height: 63,
        width: 63,
        opacity: 1,
      }}
      style={{
        backgroundColor: '#00000009',
      }}
      speed={2}
    />
  );
};

export default DishSpinner;
