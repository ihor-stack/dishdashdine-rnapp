import React, {useId, useState} from 'react';
import {Dimensions, StyleSheet} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import {Stack} from 'native-base';
import FastImage from 'react-native-fast-image';

import {
  IOrderItemModifierGroupItemSelection,
  IOrderItemModifierGroupSelection,
} from '@/api/generic';
import {Colors, fonts} from '@/themes';
import {DynamicText, DynamicView} from '@/components';
import ModifierItem from './ModifierItem';

export interface ModefierGroupQuantityProps {
  title: string;
  description: string;
  modifierGroup: IOrderItemModifierGroupSelection;
  onAddQTYGroup?: (group: any, item: any) => void;
  onLessQTYGroup?: (group: any, item: any) => void;
  onToggleModifier?: (group: any, item: any) => void;
  hidePricing?: boolean;
  hideQtyStepper?: boolean;
}

const ModifierGroupQuantity = ({
  modifierGroup,
  onAddQTYGroup,
  onLessQTYGroup,
  title,
  description,
  onToggleModifier,
  hidePricing,
  hideQtyStepper,
}: ModefierGroupQuantityProps) => {
  const id = useId();
  const activeSelections = modifierGroup.modifierGroupItems.filter((x) => x.quantity > 0).length
  return (
    <Collapse isExpanded touchableOpacityProps={{activeOpacity: 1}}>
      <CollapseHeader
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        paddingVertical={15}
        paddingHorizontal={10}
        backgroundColor={Colors.lightGrey}>
        <DynamicView>
          <DynamicText style={styles.title}>{title}</DynamicText>
          <DynamicText style={styles.subTitle}>{description}</DynamicText>
        </DynamicView>
        <DynamicView paddingRight={11}>
          <AntDesign size={12} name="down" color={Colors.black} />
        </DynamicView>
      </CollapseHeader>
      <CollapseBody style={styles.collapseBody}>
        <Stack direction={{base: 'column', md: 'row'}} paddingTop={2} space={1}>
          {modifierGroup.modifierGroupItems &&
            modifierGroup.modifierGroupItems.map(
              (
                item: IOrderItemModifierGroupItemSelection,
                keyIndex: number,
              ) => (
                <ModifierItem
                  key={`${id}-${keyIndex}`}
                  item={item}
                  modifierGroup={modifierGroup}
                  onAddQTYGroup={onAddQTYGroup}
                  onLessQTYGroup={onLessQTYGroup}
                  onToggleModifier={onToggleModifier}
                  hidePricing={hidePricing}
                  hideQtyStepper={hideQtyStepper}
                  activeSelections={activeSelections}
                />
              ),
            )}
        </Stack>
      </CollapseBody>
    </Collapse>
  );
};

export default ModifierGroupQuantity;

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
