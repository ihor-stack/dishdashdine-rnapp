import React from 'react';
import {StyleSheet} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import {DynamicPressable, DynamicTextInput, DynamicView} from '@/components';
import {Colors, fonts} from '@/themes';
import {IAdminRestaurantModifierGroupAvailableParams} from '@/api/admin_restaurant/model';

type AvailableOptionProps = {
  item: IAdminRestaurantModifierGroupAvailableParams;
  onRemoveGroupItems: (index: number) => void;
  index: number;
  updateRowItem: (
    index: number,
    key: keyof IAdminRestaurantModifierGroupAvailableParams,
    value: string,
  ) => void;
};
const AvailableOption = ({
  item,
  onRemoveGroupItems,
  index,
  updateRowItem,
}: AvailableOptionProps) => {
  return (
    <DynamicView
      marginBottom={10}
      flexDirection="row"
      alignItems="flex-end"
      justifyContent="space-between">
      <DynamicView flex={1} marginRight={4}>
        <DynamicTextInput
          placeholder=""
          style={[styles.textInputStyle, styles.rowName]}
          multiline
          textAlignVertical="center"
          value={item.name}
          onChangeText={text => updateRowItem(index, 'name', text)}
        />
      </DynamicView>
      <DynamicView flex={1} marginLeft={4}>
        <DynamicTextInput
          placeholder=""
          placeholderTextColor={Colors.grey}
          style={styles.textInputStyle}
          value={String(item.price)}
          onChangeText={text => updateRowItem(index, 'price', text)}
        />
      </DynamicView>
      <DynamicView flex={1} marginLeft={4}>
        <DynamicTextInput
          placeholder=""
          placeholderTextColor={Colors.grey}
          style={styles.textInputStyle}
          value={String(item.minSelections)}
          onChangeText={text => updateRowItem(index, 'minSelections', text)}
        />
      </DynamicView>
      <DynamicView flex={1} marginLeft={4}>
        <DynamicTextInput
          placeholder=""
          placeholderTextColor={Colors.grey}
          style={styles.textInputStyle}
          value={String(item.maxSelections)}
          onChangeText={text => updateRowItem(index, 'maxSelections', text)}
        />
      </DynamicView>
      <DynamicPressable
        marginLeft={8}
        style={styles.RemoveRowButton}
        onPress={() => onRemoveGroupItems(index)}>
        <Ionicons size={24} name="close" color={Colors.white} />
      </DynamicPressable>
    </DynamicView>
  );
};

export default AvailableOption;

const styles = StyleSheet.create({
  rowName: {
    paddingTop: 12,
    paddingBottom: 8,
  },
  categoryLabelStyle: {
    fontFamily: fonts.DMSans700Bold,
    fontSize: 15,
    lineHeight: 20,
    color: Colors.black,
  },
  textInputStyle: {
    backgroundColor: Colors.lightestGrey,
    paddingHorizontal: 20,
    fontFamily: fonts.DMSans400Regular,
    fontSize: 14,
    lineHeight: 18,
    borderRadius: 4,
    minHeight: 40,
  },
  AddRowButton: {
    width: 44,
    height: 40,
    backgroundColor: Colors.red,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  RemoveRowButton: {
    width: 44,
    height: 40,
    backgroundColor: Colors.darkGrey,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
