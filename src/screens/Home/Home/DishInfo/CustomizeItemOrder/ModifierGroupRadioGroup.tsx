import React from 'react';
import {StyleSheet, useWindowDimensions} from 'react-native';
import {Colors, fonts} from '@/themes';
import {IOrderItemModifierGroupSelection} from '@/api/generic';
import {Checkbox, Stack} from 'native-base';
import {DynamicText, DynamicView} from '@/components';
import {Radio} from 'native-base';

export interface ModifierGroupRadioGroupProps {
  modifierGroup: IOrderItemModifierGroupSelection;
  onToggle?: (group: any, item: any) => void;
}

const ModifierGroupRadioGroup = ({
  modifierGroup,
  onToggle,
}: ModifierGroupRadioGroupProps) => {
  const {width} = useWindowDimensions();
  return (
    <Radio.Group>
      <Stack
        direction={{base: 'column', md: 'row'}}
        alignItems={{
          base: 'flex-start',
          md: 'center',
        }}
        paddingTop={2}
        space={1}>
        {modifierGroup.modifierGroupItems &&
          modifierGroup.modifierGroupItems.map((data, key) => {
            return (
              <DynamicView
                width={width - 24}
                borderBottomColor={Colors.lightGrey}
                borderBottomWidth={1}
                paddingBottom={13}>
                <Radio
                  value={data.modifierGroupItemId}
                  key={key}
                  // isDisabled={!data.isEnabled}
                  isDisabled
                  // onChange={() => {
                  //   onToggle && onToggle(modifierGroup, data);
                  // }}
                  my="1"
                  colorScheme="red"
                  size="sm">
                  <DynamicText style={styles.texts}>{data.name}</DynamicText>
                </Radio>
              </DynamicView>
            );
          })}
      </Stack>
    </Radio.Group>
  );
};

export default ModifierGroupRadioGroup;

const styles = StyleSheet.create({
  texts: {
    fontFamily: fonts.DMSans500Medium,
    fontSize: 13,
    lineHeight: 17,
    color: Colors.black,
  },
});
