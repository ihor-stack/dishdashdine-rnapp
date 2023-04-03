import React, {useState} from 'react';
import {StyleProp} from 'react-native';
import FastImage, {FastImageProps, ImageStyle} from 'react-native-fast-image';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import DynamicView from './DynamicView';

const DynamicImage = ({
  resizeMode,
  backfaceVisibility,
  borderBottomLeftRadius,
  borderBottomRightRadius,
  backgroundColor,
  borderColor,
  borderRadius,
  borderTopLeftRadius,
  borderTopRightRadius,
  overlayColor,
  tintColor,
  opacity,
  alignContent,
  alignItems,
  alignSelf,
  aspectRatio,
  borderBottomWidth,
  borderEndWidth,
  borderLeftWidth,
  borderRightWidth,
  borderStartWidth,
  borderTopWidth,
  borderWidth,
  bottom,
  display,
  end,
  flex,
  flexBasis,
  flexDirection,
  flexGrow,
  flexShrink,
  flexWrap,
  height,
  justifyContent,
  left,
  margin,
  marginBottom,
  marginEnd,
  marginHorizontal,
  marginLeft,
  marginRight,
  marginStart,
  marginTop,
  marginVertical,
  maxHeight,
  maxWidth,
  minHeight,
  minWidth,
  overflow,
  padding,
  paddingBottom,
  paddingEnd,
  paddingHorizontal,
  paddingLeft,
  paddingRight,
  paddingStart,
  paddingTop,
  paddingVertical,
  position,
  right,
  start,
  top,
  width,
  zIndex,
  direction,
  shadowColor,
  shadowOffset,
  shadowOpacity,
  shadowRadius,
  transform,
  ...rest
}: ImageStyle & FastImageProps) => {
  const [loading, setLoading] = useState(false);
  return (
    <>
      {/* display loading indicator */}
      {loading && (
        <SkeletonPlaceholder>
          <DynamicView
            style={[
              {
                backfaceVisibility,
                borderBottomLeftRadius,
                borderBottomRightRadius,
                backgroundColor,
                borderColor,
                borderRadius,
                borderTopLeftRadius,
                borderTopRightRadius,
                opacity,
                alignContent,
                alignItems,
                alignSelf,
                aspectRatio,
                borderBottomWidth,
                borderEndWidth,
                borderLeftWidth,
                borderRightWidth,
                borderStartWidth,
                borderTopWidth,
                borderWidth,
                bottom,
                display,
                end,
                flex,
                flexBasis,
                flexDirection,
                flexGrow,
                flexShrink,
                flexWrap,
                height,
                justifyContent,
                left,
                margin,
                marginBottom,
                marginEnd,
                marginHorizontal,
                marginLeft,
                marginRight,
                marginStart,
                marginTop,
                marginVertical,
                maxHeight,
                maxWidth,
                minHeight,
                minWidth,
                overflow,
                padding,
                paddingBottom,
                paddingEnd,
                paddingHorizontal,
                paddingLeft,
                paddingRight,
                paddingStart,
                paddingTop,
                paddingVertical,
                position,
                right,
                start,
                top,
                width,
                zIndex,
                direction,
                shadowColor,
                shadowOffset,
                shadowOpacity,
                shadowRadius,
                transform,
              },
            ]}
          />
        </SkeletonPlaceholder>
      )}
      <FastImage
        resizeMode={resizeMode}
        style={[
          {
            backfaceVisibility,
            borderBottomLeftRadius,
            borderBottomRightRadius,
            backgroundColor,
            borderColor,
            borderRadius,
            borderTopLeftRadius,
            borderTopRightRadius,
            overlayColor,
            tintColor,
            opacity,
            alignContent,
            alignItems,
            alignSelf,
            aspectRatio,
            borderBottomWidth,
            borderEndWidth,
            borderLeftWidth,
            borderRightWidth,
            borderStartWidth,
            borderTopWidth,
            borderWidth,
            bottom,
            display,
            end,
            flex,
            flexBasis,
            flexDirection,
            flexGrow,
            flexShrink,
            flexWrap,
            height,
            justifyContent,
            left,
            margin,
            marginBottom,
            marginEnd,
            marginHorizontal,
            marginLeft,
            marginRight,
            marginStart,
            marginTop,
            marginVertical,
            maxHeight,
            maxWidth,
            minHeight,
            minWidth,
            overflow,
            padding,
            paddingBottom,
            paddingEnd,
            paddingHorizontal,
            paddingLeft,
            paddingRight,
            paddingStart,
            paddingTop,
            paddingVertical,
            position,
            right,
            start,
            top,
            width,
            zIndex,
            direction,
            shadowColor,
            shadowOffset,
            shadowOpacity,
            shadowRadius,
            transform,
            ...(loading && {display: 'none'}),
          } as StyleProp<ImageStyle>,
        ]}
        onProgress={() => setLoading(true)}
        onLoad={() => setLoading(false)}
        {...rest}
      />
    </>
  );
};

export default DynamicImage;
