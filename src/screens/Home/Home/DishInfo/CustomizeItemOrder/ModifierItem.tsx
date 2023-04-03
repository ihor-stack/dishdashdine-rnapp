import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';

import FastImage from 'react-native-fast-image';

import DishStepperButton from '@/components/DishStepperButton';
import {Colors, fonts} from '@/themes';
import {DynamicPressable, DynamicText, DynamicView} from '@/components';
import {radioSelected, radioUnselected} from '@/assets';
import {
  IOrderItemModifierGroupItemSelection,
  IOrderItemModifierGroupSelection,
} from '@/api/generic';
import _ from "lodash"

const {width} = Dimensions.get('window');

interface ModifierItem {
  item: IOrderItemModifierGroupItemSelection;
  modifierGroup: IOrderItemModifierGroupSelection;
  onAddQTYGroup?: (group: any, item: any, reset?: boolean) => void;
  onLessQTYGroup?: (group: any, item: any) => void;
  onToggleModifier?: (group: any, item: any) => void;
  hidePricing?: boolean;
  hideQtyStepper?: boolean;
  activeSelections: number;
}

const ModifierItem = ({
  hideQtyStepper,
  item,
  modifierGroup,
  onAddQTYGroup,
  onLessQTYGroup,
  onToggleModifier,
  hidePricing,
  activeSelections
}: ModifierItem) => {
  const onRadioBtnPress = () => {
    if (onAddQTYGroup) {
      onAddQTYGroup(modifierGroup, item, !Number(item.quantity));
    }
  };

  const getTotalItemOverAll = () => {
    let totalQuantity = 0;
    const { modifierGroupItems } = modifierGroup;
    for (const item in modifierGroupItems) {
      const { quantity } = modifierGroupItems[item];
      totalQuantity += quantity
    }
    return totalQuantity
  }

  return (
    <>
      {Number(modifierGroup.maxSelections) === 1 && hidePricing ? (
        <DynamicPressable
          disabled={Number(modifierGroup.maxSelections) !== 1}
          onPress={onRadioBtnPress}
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          width={width}
          borderBottomColor={Colors.lightGrey}
          borderBottomWidth={1}
          paddingVertical={10}
          style={styles.sectionPrices}>
          <DynamicView flexDirection="row">
            <FastImage
              source={item.quantity > 0 ? radioSelected : radioUnselected}
              style={styles.radio}
            />
            <DynamicText
              style={[styles.texts, item.quantity > 0 && {fontWeight: 'bold'}]}>
              {item.name}
            </DynamicText>
          </DynamicView>
          {hidePricing && Number(item.price) > 0 ? (
            <DynamicText style={styles.textPrice}>
              +£{Number(item.price).toFixed(2)} each
            </DynamicText>
          ) : null}
        </DynamicPressable>
      ) : (
        <DynamicView
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          width={width}
          borderBottomColor={Colors.lightGrey}
          borderBottomWidth={1}
          paddingVertical={10}
          style={styles.sectionPrices}>
          <DynamicView flexDirection="row" alignItems="center">
            {hideQtyStepper && _.isNull(modifierGroup?.maxSelections) ? (
              <DishStepperButton
                size="sm"
                minValue={item?.minSelections ? item?.minSelections : 1}
                value={item.quantity}
                isEnabled={item.isEnabled}
                onAddButtonPress={() =>
                  onAddQTYGroup && onAddQTYGroup(modifierGroup, item)
                }
                onLessButtonPress={() =>
                  onLessQTYGroup && onLessQTYGroup(modifierGroup, item)
                }
                onToggle={() =>{
                  onToggleModifier && onToggleModifier(modifierGroup, item)
                }}
              />
            ) :  
            <DishStepperButton
              size="sm"
              maxValue={item?.maxSelections}
              minValue={item?.minSelections ? item?.minSelections : 1}
              value={item.quantity}
              isEnabled={item.isEnabled}
              disabledPositive={getTotalItemOverAll() >= modifierGroup.maxSelections ? true : false}
              onAddButtonPress={() =>{
                if (getTotalItemOverAll() < modifierGroup.maxSelections) {
                  onAddQTYGroup && onAddQTYGroup(modifierGroup, item)
                }
              }}
              onLessButtonPress={() =>
                onLessQTYGroup && onLessQTYGroup(modifierGroup, item)
              }
              onToggle={() =>{
                if (getTotalItemOverAll() < modifierGroup.maxSelections) {
                  onToggleModifier && onToggleModifier(modifierGroup, item)
                }
              }}
            />
           }
            <DynamicText
              style={[
                styles.texts, 
                item.quantity > 0 && { fontWeight: 'bold' }, 
                getTotalItemOverAll() >= modifierGroup.maxSelections ? { opacity: 0.5 } : { opacity: 1 }
              ]}>
              {item.name}
            </DynamicText>
          </DynamicView>
          {hidePricing && Number(item.price) > 0 ? (
            <DynamicText style={styles.textPrice}>
              +£{Number(item.price).toFixed(2)} each
            </DynamicText>
          ) : null}
        </DynamicView>
      )}
    </>
  );
};

export default ModifierItem;

const styles = StyleSheet.create({
  title: {
    fontFamily: fonts.DMSans700Bold,
    fontSize: 15,
    lineHeight: 20,
    color: Colors.black,
  },
  subTitle: {
    fontFamily: fonts.DMSans400Regular,
    fontSize: 13,
    lineHeight: 17,
    color: Colors.grey,
  },
  sectionPrices: {
    paddingLeft: 11,
    paddingRight: 10,
  },
  texts: {
    fontFamily: fonts.DMSans500Medium,
    fontSize: 13,
    lineHeight: 17,
    color: Colors.black,
  },
  textPrice: {
    fontFamily: fonts.DMSans400Regular,
    fontSize: 12,
    lineHeight: 16,
    color: Colors.grey,
  },
  collapseBody: {
    backgroundColor: Colors.white,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  radio: {width: 20, height: 20, marginRight: 14},
});
