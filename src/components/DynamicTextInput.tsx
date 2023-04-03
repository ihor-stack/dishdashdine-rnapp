import React from 'react';
import {StyleProp, TextInput, TextStyle, TextInputProps} from 'react-native';

type DynamicTextInputProps = TextStyle & TextInputProps;

export const ForwardedRefTextInput = React.forwardRef<
  TextInput,
  DynamicTextInputProps
>(
  (
    {
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
      style,
      ...rest
    },
    ref,
  ) => (
    <TextInput
      style={[
        {
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
        } as StyleProp<TextStyle>,
        style && style,
      ]}
      ref={ref}
      {...rest}>
      {children}
    </TextInput>
  ),
);

const DynamicTextInput = ({
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
  style,
  ...rest
}: DynamicTextInputProps) => (
  <TextInput
    style={[
      {
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
      } as StyleProp<TextStyle>,
      style && style,
    ]}
    {...rest}>
    {children}
  </TextInput>
);

export default DynamicTextInput;
