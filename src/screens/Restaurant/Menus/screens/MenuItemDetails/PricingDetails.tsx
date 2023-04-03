import React from 'react';
import {View, Text} from 'react-native';
import {Colors, fonts} from '@/themes';
import {Divider} from 'native-base';
import {DynamicText, DynamicTextInput, DynamicView} from '@/components';
import styles from '@/screens/Restaurant/Menus/screens/MenuItemDetails/styles';
import {Controller} from 'react-hook-form';

export interface PricingDetailsProps {
  control: any;
}

const PricingDetails: React.FC<PricingDetailsProps> = ({control}) => {
  return (
    <>
      <Divider color={Colors.lightGrey} marginTop={26} marginBottom={28} />
      <DynamicView
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center">
        <DynamicText style={styles.textLabelStyle}>Price</DynamicText>
        <Controller
          control={control}
          rules={{required: true}}
          render={({field: {onChange, onBlur, value}}) => (
            <DynamicTextInput
              placeholder="£"
              placeholderTextColor={Colors.grey}
              minWidth={221}
              marginRight={11}
              style={[styles.textInputView, styles.formControl]}
              fontSize={14}
              lineHeight={18.23}
              fontFamily={fonts.DMSans400Regular}
              color={Colors.black}
              value={String(value)}
              onBlur={onBlur}
              onChangeText={onChange}
            />
          )}
          name="price"
        />
      </DynamicView>
      <DynamicView
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        marginTop={27}>
        <DynamicText style={styles.textLabelStyle}>VAT</DynamicText>
        <Controller
          control={control}
          rules={{required: true}}
          render={({field: {onChange, onBlur, value}}) => (
            <DynamicTextInput
              placeholder="%"
              placeholderTextColor={Colors.grey}
              width={221}
              marginRight={11}
              style={[styles.textInputView, styles.formControl]}
              fontSize={14}
              lineHeight={18.23}
              fontFamily={fonts.DMSans400Regular}
              color={Colors.black}
              value={String(value)}
              onBlur={onBlur}
              onChangeText={onChange}
            />
          )}
          name="vat"
        />
      </DynamicView>
    </>
  );
};

export default PricingDetails;
