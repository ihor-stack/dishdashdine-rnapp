import React from 'react';
import {Checkbox, Stack} from 'native-base';
import {DynamicText, DynamicView} from '@/components';
import {Colors, fonts} from '@/themes';
import {IOrderItemModifierGroupSelection} from '@/api/generic';
import {StyleSheet, useWindowDimensions} from 'react-native';

export interface ModifierGroupCheckboxProps {
  modifierGroup: IOrderItemModifierGroupSelection;
  onToggle?: (group: any, item: any) => void;
}

const ModifierGroupCheckbox = ({
  modifierGroup,
  onToggle,
}: ModifierGroupCheckboxProps) => {
  const {width} = useWindowDimensions();

  return (
    <Checkbox.Group>
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
                <Checkbox
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
                </Checkbox>
              </DynamicView>
            );
          })}
      </Stack>
    </Checkbox.Group>
  );
};

export default ModifierGroupCheckbox;

const styles = StyleSheet.create({
  texts: {
    fontFamily: fonts.DMSans500Medium,
    fontSize: 13,
    lineHeight: 17,
    color: Colors.black,
  },
});
