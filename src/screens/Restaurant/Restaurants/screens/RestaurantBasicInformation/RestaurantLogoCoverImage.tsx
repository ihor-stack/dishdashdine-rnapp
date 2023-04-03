import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import {DynamicPressable, DynamicText, DynamicView} from '@/components';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors, fonts} from '@/themes';

export interface RestaurantLogoCoverImageProps {
  onPress?: any;
  imagePathURI: string;
}

const RestaurantLogoCoverImage: React.FC<RestaurantLogoCoverImageProps> = ({
  onPress,
  imagePathURI,
}) => {
  return (
    <DynamicPressable style={styles.textInputView} onPress={onPress}>
      <FastImage
        style={styles.ImageBackground}
        source={{
          uri: imagePathURI,
          priority: FastImage.priority.high,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
      <DynamicView style={styles.EditImageContainer}>
        <MaterialCommunityIcons name="pencil" color={Colors.white} size={20} />
        <DynamicText style={styles.EditImageText}>Edit Image</DynamicText>
      </DynamicView>
      <LinearGradient
        colors={['rgba(0, 0, 0,0.3)', 'rgba(0, 0, 0,0.3)']}
        style={styles.linearGradient}
      />
    </DynamicPressable>
  );
};

export default RestaurantLogoCoverImage;

const styles = StyleSheet.create({
  textInputView: {
    marginTop: 4,
    justifyContent: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  EditImageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 10,
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
  EditImageText: {
    fontFamily: fonts.DMSans700Bold,
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 18.63,
    color: Colors.white,
    marginLeft: 12,
  },
  ImageBackground: {
    height: 200,
    marginTop: 20,
    position: 'relative',
    borderRadius: 8,
  },
  linearGradient: {
    height: 200,
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    borderRadius: 8,
    zIndex: 1,
  },
});
