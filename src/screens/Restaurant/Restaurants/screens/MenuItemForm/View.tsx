import {
  AnimatedText,
  DynamicAnimatedView,
  DynamicText,
  DynamicTextInput,
  DynamicView,
} from '@/components';
import DishButton from '@/components/DishButton';
import {DIETARY_ATTRIBUTES, SLIDERS, TEMPERATURE} from '@/constants/fakeData';
import {Colors, fonts} from '@/themes';
import {Checkbox, Divider, Icon, Input, Select} from 'native-base';
import React, {useState} from 'react';
import {ImageBackground, StyleSheet, Switch} from 'react-native';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {interpolateColor, useAnimatedStyle} from 'react-native-reanimated';
import {Tab} from '@rneui/themed';

const burger = require('@/assets/images/restaurants/villa_vinci.png');

export interface MenuItemFormViewProps {
  onSubmit: any;
  showLoading: boolean;
}

const MenuItemFormView = (props: MenuItemFormViewProps) => {
  const [isSelected, setSelection] = useState(false);
  const [service, setService] = useState('');
  const {onSubmit, showLoading} = props;

  const HEADERS = () => {
    return (
      <DynamicView marginTop={15} marginLeft={12}>
        <DynamicText
          fontFamily={fonts.DMSans500Medium}
          fontSize={16}
          lineHeight={21}
          color={Colors.black}>
          The Original Beef
        </DynamicText>
        <DynamicText
          fontFamily={fonts.DMSans500Medium}
          fontSize={13}
          lineHeight={16}
          color={Colors.black}>
          All Day Menu
        </DynamicText>
      </DynamicView>
    );
  };

  const FlatlistItems = ({item, index}) => {
    return (
      <DynamicView key={index} paddingHorizontal={25}>
        <DynamicText
          fontFamily={fonts.DMSans500Medium}
          fontSize={15}
          lineHeight={20}>
          {item.name}
        </DynamicText>
      </DynamicView>
    );
  };

  const SLIDER = () => {
    return (
      <FlatList
        data={SLIDERS}
        contentContainerStyle={styles.container}
        renderItem={FlatlistItems}
        horizontal={true}
      />
    );
  };

  const renderDietaryAttributes = (item: any, i: number) => {
    return (
      <DynamicView marginHorizontal={10} key={i}>
        <Checkbox value="isSelected" colorScheme="red">
          <DynamicText style={styles.textLabelStyle} marginRight={11}>
            {item.type}
          </DynamicText>
        </Checkbox>
      </DynamicView>
    );
  };

  const renderTemperature = (item: any, i: number) => {
    return (
      <DynamicView marginHorizontal={10} key={i} flex={1}>
        <Checkbox value="isSelected" colorScheme="red">
          <DynamicText style={styles.textLabelStyle} marginRight={11}>
            {item.name}
          </DynamicText>
        </Checkbox>
      </DynamicView>
    );
  };

  const DETAILS = () => {
    return (
      <>
        <DynamicText style={styles.textLabelStyle}>Name</DynamicText>
        <DynamicView style={styles.textInputView}>
          <DynamicTextInput
            placeholder="The Original Beef"
            placeholderTextColor={Colors.grey}
            style={styles.textInputStyle}
          />
        </DynamicView>
        <DynamicText style={styles.textLabelStyle}>Description</DynamicText>
        <DynamicView style={styles.textInputView}>
          <DynamicTextInput
            placeholder="Day aged local Shorthorn Beef, Hatch Relish, Emmental Cheese, salad on pretzel bun."
            placeholderTextColor={Colors.grey}
            style={styles.textInputStyle}
            height={100}
            multiline={true}
          />
        </DynamicView>
        <DynamicText style={styles.textLabelStyle}>Photo</DynamicText>
        <DynamicView style={styles.textInputView} marginBottom={27}>
          <ImageBackground
            style={styles.ImageBackground}
            imageStyle={styles.ImageStyle}
            resizeMode="cover"
            source={burger}
          />
        </DynamicView>
        <Divider color={Colors.lightGrey} />
        <DynamicView marginTop={22} marginBottom={27}>
          <DynamicView flex={1}>
            <DynamicText style={styles.textLabelStyle}>Categories</DynamicText>
            <DynamicView
              style={styles.textInputView}
              flexDirection="row"
              alignItems="center">
              <DynamicTextInput
                placeholder="Burger"
                placeholderTextColor={Colors.grey}
                style={styles.textInputStyle}
                width={294}
                alignItems="flex-start"
              />
              <DynamicView alignItems="flex-end">
                <DishButton icon="arrowright" variant="primary" />
              </DynamicView>
            </DynamicView>
          </DynamicView>
          <DynamicView
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center">
            <DynamicText style={styles.textLabelStyle}>Price</DynamicText>
            <DynamicTextInput
              placeholder="£  6.50"
              placeholderTextColor={Colors.grey}
              style={styles.textInputStyle}
              width={221}
              marginRight={11}
            />
          </DynamicView>
          <DynamicView
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            marginTop={27}>
            <DynamicText style={styles.textLabelStyle}>VAT</DynamicText>
            <DynamicTextInput
              placeholder="20"
              placeholderTextColor={Colors.grey}
              style={styles.textInputStyle}
              width={221}
              marginRight={11}
            />
          </DynamicView>
        </DynamicView>
        <Divider color={Colors.lightGrey} />
        <DynamicView marginTop={22}>
          <DynamicText style={styles.textLabelStyle}>
            Modifier groups
          </DynamicText>
          <DynamicView style={styles.textInputView}>
            <Input
              InputLeftElement={
                <Icon
                  as={
                    <AntDesign size={16} name="search1" color={Colors.grey} />
                  }
                  marginLeft={2}
                />
              }
              style={styles.textInputStyle}
              placeholder="Add a modifier group"
            />
          </DynamicView>
        </DynamicView>
        <Divider color={Colors.lightGrey} />
        <DynamicView marginTop={22}>
          <DynamicText style={styles.textLabelStyle}>Energy values</DynamicText>
          <DynamicView
            style={styles.textInputView}
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center">
            <DynamicTextInput
              textAlign="right"
              placeholder="cal"
              style={styles.textInputStyle}
              width={165}
            />
            <DynamicView alignItems="flex-end" flex={1}>
              <DynamicTextInput
                textAlign="right"
                placeholder="kcal"
                placeholderTextColor={Colors.grey}
                style={styles.textInputStyle}
                width={165}
              />
            </DynamicView>
          </DynamicView>
        </DynamicView>
        <Divider color={Colors.lightGrey} />
        <DynamicView marginTop={22}>
          <DynamicText style={styles.textLabelStyle}>
            When is this item sold?
          </DynamicText>
          <DynamicView
            style={styles.textInputView}
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center">
            <Select
              selectedValue={service}
              minWidth="354"
              accessibilityLabel="Choose Service"
              placeholder="All day menu hours "
              mt={1}
              onValueChange={itemValue => setService(itemValue)}
              style={styles.selectStyle}
            />
          </DynamicView>
        </DynamicView>
        <Divider color={Colors.lightGrey} marginBottom={23} />
        <DynamicText style={styles.textLabelStyle}>
          Dietary attributes
        </DynamicText>
        <DynamicView style={styles.checkBoxView}>
          {DIETARY_ATTRIBUTES.map((item, index) => {
            return renderDietaryAttributes(item, index);
          })}
        </DynamicView>
        <Divider color={Colors.lightGrey} marginTop={37} marginBottom={23} />
        <DynamicText style={styles.textLabelStyle}>Temperature</DynamicText>
        <DynamicView style={styles.checkBoxView}>
          {TEMPERATURE.map((item, index) => {
            return renderTemperature(item, index);
          })}
        </DynamicView>
      </>
    );
  };

  return (
    <ScrollView
      contentContainerStyle={{
        backgroundColor: Colors.white,
        flexGrow: 1,
      }}>
      <DynamicView>
        <HEADERS />
        <Divider color={Colors.lightGrey} marginTop={14} />
        <SLIDER />
        {/* <Divider /> */}
        {/* <DynamicView>
          <DynamicText>Item is sold out</DynamicText>
          <Switch
            trackColor={{
              false: 'rgba(171, 187, 194, 0.26)',
              true: 'rgba(224, 4, 4, 0.25)',
            }}
            thumbColor={props.isChecked ? Colors.ember : Colors.darkGrey}
            ios_backgroundColor="red"
            onValueChange={props.onToggleSwith}
            value={props.isChecked}
            style={{transform: [{scaleX: 1.3}, {scaleY: 1.3}]}}
          />
        </DynamicView> */}
        <Divider color={Colors.lightGrey} marginTop={14} marginBottom={14} />
        <DETAILS />
      </DynamicView>
      <DynamicView flex={1} />
      <DynamicView marginTop={36} marginBottom={20} paddingHorizontal={12}>
        <DishButton
          icon="arrowright"
          label="Save Item"
          variant="primary"
          onPress={onSubmit}
          showSpinner={showLoading}
        />
        <DishButton icon="" label="Delete Item" />
      </DynamicView>
    </ScrollView>
  );
};

export default MenuItemFormView;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 11,
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    paddingBottom: 20,
  },
  textLabelStyle: {
    fontFamily: fonts.DMSans700Bold,
    fontSize: 15,
    lineHeight: 20,
    color: Colors.black,
    marginLeft: 10,
  },
  textInputView: {
    marginTop: 4,
    justifyContent: 'center',
    marginBottom: 20,
    marginHorizontal: 10,
  },
  textInputStyle: {
    backgroundColor: Colors.lightestGrey,
    height: 40,
    paddingHorizontal: 20,
    fontFamily: fonts.DMSans400Regular,
    fontSize: 14,
    lineHeight: 18,
    borderRadius: 4,
  },
  selectStyle: {
    height: 40,
    paddingHorizontal: 20,
    fontFamily: fonts.DMSans400Regular,
    fontSize: 14,
    lineHeight: 18,
    borderRadius: 4,
  },
  checkBoxView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingTop: 15,
  },
  ImageBackground: {
    height: 200,
    marginTop: 20,
    position: 'relative',
  },
  ImageStyle: {
    borderRadius: 8,
  },
  searchTextStyle: {
    fontFamily: fonts.DMSans400Regular,
    fontSize: 14,
    lineHeight: 18,
    color: Colors.grey,
  },
});
