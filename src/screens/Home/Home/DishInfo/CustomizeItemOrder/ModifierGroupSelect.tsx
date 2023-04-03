import React from 'react';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Colors, fonts} from '@/themes';
import {DynamicText, DynamicView} from '@/components';
import {StyleSheet, useWindowDimensions} from 'react-native';
import {Stack, Radio, Checkbox} from 'native-base';
import {IOrderItemModifierGroupSelection} from '@/api/generic';
import ModifierGroupRadioGroup from '@/screens/Home/Home/DishInfo/CustomizeItemOrder/ModifierGroupRadioGroup';
import ModifierGroupCheckbox from '@/screens/Home/Home/DishInfo/CustomizeItemOrder/ModifierGroupCheckbox';
import {isNull} from 'lodash';

export interface ModifierGroupSelectProps {
  title: string;
  description: string;
  modifierGroup: IOrderItemModifierGroupSelection;
  onToggle?: any;
}

const ModifierGroupSelect = ({
  title,
  description,
  modifierGroup,
  onToggle,
}: ModifierGroupSelectProps) => {
  return (
    <Collapse
      isExpanded
      touchableOpacityProps={{
        activeOpacity: 1,
      }}>
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
      <CollapseBody
        style={{
          backgroundColor: Colors.white,
          paddingHorizontal: 10,
        }}>
        {modifierGroup.maxSelections === 1 &&
          isNull(modifierGroup.maxSelectionsPerItem) && (
            <ModifierGroupRadioGroup
              modifierGroup={modifierGroup}
              onToggle={onToggle}
            />
          )}

        {modifierGroup.maxSelections > 1 &&
          !isNull(modifierGroup.maxSelectionsPerItem) && (
            <ModifierGroupCheckbox
              modifierGroup={modifierGroup}
              onToggle={onToggle}
            />
          )}
      </CollapseBody>
    </Collapse>
  );
};

export default ModifierGroupSelect;

const styles = StyleSheet.create({
  title: {
    fontFamily: fonts.DMSans700Bold,
    fontSize: 15,
    lineHeight: 20,
    color: Colors.black,
  },
  subTitle: {
    fontFamily: fonts.DMSans400Regular,
    fontWeight: '500',
    fontSize: 13,
    lineHeight: 17,
    color: Colors.grey,
  },
  sectionPrices: {
    paddingLeft: 11,
    paddingRight: 10,
  },
  textPrice: {
    fontFamily: fonts.DMSans400Regular,
    fontSize: 12,
    lineHeight: 16,
    color: Colors.grey,
  },
});
