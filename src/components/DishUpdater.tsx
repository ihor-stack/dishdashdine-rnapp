import {StyleSheet, ActivityIndicator, I18nManager} from 'react-native';
import React from 'react';
import ActionSheet from 'react-native-actions-sheet';
import DynamicView from '@/components/DynamicView';
import {Colors, fonts} from '@/themes';
import DynamicText from '@/components/DynamicText';
import {
  heightPixel,
  pixelSizeHorizontal,
  pixelSizeVertical,
  widthPixel,
} from '@/themes/normalize';
import {DynamicImage} from '@/components/index';
import {Images} from '@/assets';
import {bytesToSize} from '@/utils/common';

export interface DishUpdaterProps {
  receivedBytes: number;
  totalBytes: number;
  onUpdatePress: () => void;
  isDownloading: boolean;
  isInstalling: boolean;
  progress: number;
}

const DishUpdater: React.FC<DishUpdaterProps> = props => {
  return (
    <ActionSheet
      id="app_dev_updater"
      statusBarTranslucent
      bounceOnOpen
      gestureEnabled
      closable
      closeOnTouchBackdrop={false}
      closeOnPressBack={false}
      drawUnderStatusBar={false}
      bounciness={4}
      defaultOverlayOpacity={0.4}
      containerStyle={[styles.innerContainer]}
      {...props}>
      <DynamicView style={styles.viewContainer}>
        <ActivityIndicator size="large" color={Colors.ember} />
        <DynamicView style={styles.TextContainer}>
          <DynamicView style={styles.UpdateContainer}>
            <DynamicImage
              source={Images.appIconLight}
              resizeMode="cover"
              style={{
                height: heightPixel(80),
                width: widthPixel(80),
                // marginBottom: pixelSizeVertical(10),
              }}
            />
            <DynamicView>
              <DynamicText style={styles.TextTitle}>
                Updating Application
              </DynamicText>
              <DynamicText style={styles.SubTextTitle}>
                Updating {bytesToSize(props.receivedBytes)} /
                {bytesToSize(props.totalBytes)}
              </DynamicText>
            </DynamicView>
          </DynamicView>
        </DynamicView>
      </DynamicView>
    </ActionSheet>
  );
};
export default DishUpdater;

const styles = StyleSheet.create({
  flex: {
    backgroundColor: 'red',
  },
  innerContainer: {
    borderTopRightRadius: 21,
    borderTopLeftRadius: 21,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  viewContainer: {
    alignItems: 'center',
    marginTop: pixelSizeVertical(16),
    marginHorizontal: pixelSizeHorizontal(16),
  },
  TextTitle: {
    fontFamily: fonts.DMSans700Bold,
    color: Colors.black,
    textAlign: 'center',
    writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr',
  },
  SubTextTitle: {
    fontFamily: fonts.DMSans400Regular,
    color: Colors.black,
    textAlign: 'center',
    marginTop: pixelSizeVertical(6),
    writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr',
  },
  TextContainer: {
    // marginTop: pixelSizeVertical(10),
    marginBottom: pixelSizeVertical(30),
  },
  UpdateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
