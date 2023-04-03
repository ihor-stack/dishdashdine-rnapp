import React from 'react';
import {DynamicText, DynamicTextInput, DynamicView} from '@/components';
import styles from './styles';
import {Divider, Radio} from 'native-base';
import CheckBox from '@react-native-community/checkbox';
import {Colors, fonts} from '@/themes';
import {Controller} from 'react-hook-form';
import {IAdminMenuItem} from '@/api/admin_restaurant/model';

export interface NutritionDetailsProps {
  menuDetails: IAdminMenuItem;
  control: any;
  isVegan: boolean;
  isVegetarian: boolean;
  isGlutenFree: boolean;

  temperature: number;
  setTemperature: React.Dispatch<React.SetStateAction<number>>;

  setIsVegetarian: React.Dispatch<React.SetStateAction<boolean>>;
  setIsVegan: React.Dispatch<React.SetStateAction<boolean>>;
  setIsGlutenFree: React.Dispatch<React.SetStateAction<boolean>>;
}

const NutritionDetails: React.FC<NutritionDetailsProps> = ({
  control,
  isVegan,
  isVegetarian,
  isGlutenFree,
  setIsVegetarian,
  setIsVegan,
  setIsGlutenFree,
  temperature,
  setTemperature,
}) => {
  const renderDietaryAttributes = () => {
    return (
      <DynamicView style={styles.checkBoxView} flex={1}>
        <DynamicView flexDirection="row" alignItems="center">
          <CheckBox
            style={styles.checkBox}
            boxType="square"
            tintColor={!isVegetarian ? Colors.black : Colors.ember}
            onTintColor={Colors.ember}
            onFillColor={Colors.ember}
            onCheckColor={Colors.white}
            value={isVegetarian}
            onValueChange={setIsVegetarian}
          />
          <DynamicText style={styles.textLabelStyle} marginRight={11}>
            Vegetarian
          </DynamicText>
        </DynamicView>
        <DynamicView flexDirection="row" alignItems="center">
          <CheckBox
            style={styles.checkBox}
            boxType="square"
            tintColor={!isVegan ? Colors.black : Colors.ember}
            onTintColor={Colors.ember}
            onFillColor={Colors.ember}
            onCheckColor={Colors.white}
            value={isVegan}
            onValueChange={setIsVegan}
          />
          <DynamicText style={styles.textLabelStyle} marginRight={11}>
            Vegan
          </DynamicText>
        </DynamicView>
        <DynamicView flexDirection="row" alignItems="center">
          <CheckBox
            style={styles.checkBox}
            boxType="square"
            tintColor={!isGlutenFree ? Colors.black : Colors.ember}
            onTintColor={Colors.ember}
            onFillColor={Colors.ember}
            onCheckColor={Colors.white}
            value={isGlutenFree}
            onValueChange={setIsGlutenFree}
          />
          <DynamicText style={styles.textLabelStyle} marginRight={11}>
            Gluten Free
          </DynamicText>
        </DynamicView>
      </DynamicView>
    );
  };

  const renderTemperature = () => {
    return (
      <Radio.Group
        colorScheme="red"
        style={styles.checkBoxView}
        value={String(temperature)}
        onChange={setTemperature}
        flex={1}
        name="myRadioGroup">
        <Radio value="0" my={1} colorScheme="red">
          <DynamicText style={styles.textLabelStyle} marginRight={11}>
            Cold
          </DynamicText>
        </Radio>
        <Radio value="1" my={1} colorScheme="red">
          <DynamicText style={styles.textLabelStyle} marginRight={11}>
            Unheated
          </DynamicText>
        </Radio>
        <Radio value="2" my={1} colorScheme="red">
          <DynamicText style={styles.textLabelStyle} marginRight={11}>
            Hot
          </DynamicText>
        </Radio>
      </Radio.Group>
    );
  };

  return (
    <>
      <Divider color={Colors.lightGrey} marginTop={25} />
      <DynamicView marginTop={22}>
        <DynamicText style={styles.textLabelStyle}>Energy values</DynamicText>
        <DynamicView
          style={styles.textInputView}
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center">
          <Controller
            control={control}
            rules={{required: true}}
            render={({field: {onChange, onBlur, value}}) => (
              <DynamicTextInput
                textAlign="right"
                placeholder="cal"
                width={165}
                placeholderTextColor={Colors.grey}
                fontSize={14}
                lineHeight={18.23}
                fontFamily={fonts.DMSans400Regular}
                color={Colors.black}
                style={[styles.textInputView, styles.formControl]}
                value={String(value)}
                onBlur={onBlur}
                onChangeText={onChange}
                keyboardType="number-pad"
              />
            )}
            name="energyValueCal"
          />
          <DynamicView alignItems="flex-end" flex={1}>
            <Controller
              control={control}
              rules={{required: true}}
              render={({field: {onChange, onBlur, value}}) => (
                <DynamicTextInput
                  textAlign="right"
                  placeholder="kcal"
                  width={165}
                  placeholderTextColor={Colors.grey}
                  fontSize={14}
                  lineHeight={18.23}
                  fontFamily={fonts.DMSans400Regular}
                  color={Colors.black}
                  style={[styles.textInputView, styles.formControl]}
                  value={String(value)}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  keyboardType="number-pad"
                />
              )}
              name="energyValueKCal"
            />
          </DynamicView>
        </DynamicView>
      </DynamicView>
      <Divider color={Colors.lightGrey} marginBottom={23} />
      <DynamicText style={styles.textLabelStyle}>
        Dietary attributes
      </DynamicText>
      <DynamicView>{renderDietaryAttributes()}</DynamicView>
      <Divider color={Colors.lightGrey} marginTop={37} marginBottom={23} />
      <DynamicText style={styles.textLabelStyle}>Temperature</DynamicText>
      <DynamicView style={styles.checkBoxView}>
        {renderTemperature()}
      </DynamicView>
    </>
  );
};

export default NutritionDetails;
