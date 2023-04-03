import {Text, TextStyle, TextProps, StyleProp} from 'react-native';
import React from 'react';

const DynamicText = ({
  children,
  color,
  fontFamily,
  fontSize,
  fontStyle,
  fontWeight,
  lineHeight,
  textAlign,
  textDecorationLine,
  textShadowColor,
  textShadowOffset,
  textShadowRadius,
  textTransform,
  fontVariant,
  letterSpacing,
  textDecorationColor,
  textDecorationStyle,
  writingDirection,
  textAlignVertical,
  includeFontPadding,
  paddingRight,
  paddingLeft,
  marginTop,
  marginBottom,
  style,
  ...rest
}: TextStyle & TextProps) => (
  <Text
    style={[
      {
        marginTop,
        marginBottom,
        color,
        fontFamily,
        fontSize,
        fontStyle,
        fontWeight,
        lineHeight,
        textAlign,
        textDecorationLine,
        textShadowColor,
        textShadowOffset,
        textShadowRadius,
        textTransform,
        fontVariant,
        letterSpacing,
        textDecorationColor,
        textDecorationStyle,
        writingDirection,
        textAlignVertical,
        includeFontPadding,
        paddingRight,
        paddingLeft,
      } as StyleProp<TextStyle>,
      style && style,
    ]}
    {...rest}>
    {children}
  </Text>
);

export default DynamicText;
