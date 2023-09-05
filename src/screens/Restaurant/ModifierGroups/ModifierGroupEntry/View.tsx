import React, {useId, useRef} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {Controller} from 'react-hook-form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {Colors, fonts} from '@/themes';
import {
  DynamicPressable,
  DynamicText,
  DynamicTextInput,
  DynamicView,
} from '@/components';
import {ForwardedRefTextInput} from '@/components/DynamicTextInput';
import DishButton from '@/components/DishButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {IAdminRestaurantModifierGroupAvailableParams} from '@/api/admin_restaurant/model';
import AvailableOption from './AvailableOption';

export interface ModifierGroupEntryViewProps {
  control: any;
  onSubmit: any;
  groupItemName: string;
  setGroupItemName: any;
  groupItemPrice: string;
  setGroupItemPrice: any;
  onAddGroupItems: () => void;
  onRemoveGroupItems: (index: number) => void;
  showLoading: boolean;
  availableOptions: IAdminRestaurantModifierGroupAvailableParams[];
  setGroupItemMinSelections: React.Dispatch<React.SetStateAction<string>>;
  setGroupItemMaxSelections: React.Dispatch<React.SetStateAction<string>>;
  groupItemMinSelections: string;
  groupItemMaxSelections: string;
  updateRowItem: (
    index: number,
    key: keyof IAdminRestaurantModifierGroupAvailableParams,
    value: string,
  ) => void;
}

const ModifierGroupEntryView: React.FC<ModifierGroupEntryViewProps> = ({
  control,
  onSubmit,
  groupItemName,
  setGroupItemName,
  groupItemPrice,
  setGroupItemPrice,
  onAddGroupItems,
  showLoading,
  availableOptions,
  onRemoveGroupItems,
  setGroupItemMinSelections,
  setGroupItemMaxSelections,
  groupItemMinSelections,
  groupItemMaxSelections,
  updateRowItem,
}) => {
  const optionId = useId();
  const descRef = useRef<TextInput>(null);
  const minRef = useRef<TextInput>(null);
  const maxRef = useRef<TextInput>(null);

  return (
    <KeyboardAwareScrollView
      style={styles.scroll}
      contentContainerStyle={styles.scrollContentContainerStyle}>
      <DynamicView marginTop={22} marginBottom={10}>
        <DynamicText style={styles.categoryLabelStyle}>Name</DynamicText>
        <Controller
          control={control}
          rules={{required: true}}
          render={({field: {onChange, onBlur, value}}) => (
            <DynamicTextInput
              marginTop={4}
              placeholder="Please enter a name"
              placeholderTextColor={Colors.grey}
              style={styles.textInputStyle}
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              onSubmitEditing={() => {
                if (descRef && descRef.current) {
                  descRef.current.focus();
                }
              }}
            />
          )}
          name="name"
        />
      </DynamicView>
      <DynamicView marginTop={13} marginBottom={10}>
        <DynamicText style={styles.categoryLabelStyle}>Description</DynamicText>
        <Controller
          control={control}
          rules={{required: true}}
          render={({field: {onChange, onBlur, value}}) => (
            <ForwardedRefTextInput
              marginTop={4}
              ref={descRef}
              placeholder="Please enter a description"
              placeholderTextColor={Colors.grey}
              style={styles.textInputStyle}
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              onSubmitEditing={() => {
                if (minRef && minRef.current) {
                  minRef.current.focus();
                }
              }}
            />
          )}
          name="description"
        />
      </DynamicView>
      <DynamicView
        marginTop={13}
        marginBottom={10}
        flexDirection="row"
        justifyContent="space-between">
        <DynamicView flex={1}>
          <DynamicText style={styles.categoryLabelStyle}>
            Min Selections
          </DynamicText>
          <Controller
            control={control}
            rules={{required: true}}
            render={({field: {onChange, onBlur, value}}) => (
              <ForwardedRefTextInput
                marginTop={4}
                placeholder=""
                placeholderTextColor={Colors.grey}
                style={styles.textInputStyle}
                value={`${value || ''}`}
                onBlur={onBlur}
                onChangeText={onChange}
                keyboardType="number-pad"
                ref={minRef}
                onSubmitEditing={() => {
                  if (maxRef && maxRef.current) {
                    maxRef.current.focus();
                  }
                }}
              />
            )}
            name="minSelections"
          />
        </DynamicView>
        <DynamicView flex={1} marginHorizontal={8}>
          <DynamicText style={styles.categoryLabelStyle}>
            Max Selections
          </DynamicText>
          <Controller
            control={control}
            rules={{required: true}}
            render={({field: {onChange, onBlur, value}}) => (
              <DynamicTextInput
                marginTop={4}
                placeholder=""
                placeholderTextColor={Colors.grey}
                style={styles.textInputStyle}
                value={`${value || ''}`}
                onBlur={onBlur}
                onChangeText={onChange}
                keyboardType="number-pad"
              />
            )}
            name="maxSelections"
          />
        </DynamicView>
        <DynamicView>
          <DynamicText style={styles.categoryLabelStyle}>
            Included in price
          </DynamicText>
          <Controller
            control={control}
            rules={{required: true}}
            render={({field: {onChange, onBlur, value}}) => (
              <DynamicTextInput
                marginTop={4}
                placeholder=""
                placeholderTextColor={Colors.grey}
                style={styles.textInputStyle}
                value={`${value || ''}`}
                onBlur={onBlur}
                onChangeText={onChange}
                keyboardType="number-pad"
              />
            )}
            name="includedInPrice"
          />
        </DynamicView>
      </DynamicView>
      <DynamicView marginTop={19}>
        <DynamicText style={styles.categoryLabelStyle}>
          Add Group items:
        </DynamicText>
        <DynamicView
          marginTop={23}
          marginBottom={30}
          flexDirection="row"
          alignItems="flex-end"
          justifyContent="space-between">
          <DynamicView flex={1} marginRight={4}>
            <DynamicText style={styles.categoryLabelStyle}>Name</DynamicText>
            <DynamicTextInput
              marginTop={4}
              placeholder=""
              textAlignVertical="center"
              placeholderTextColor={Colors.grey}
              style={[styles.textInputStyle, styles.rowName]}
              multiline
              value={groupItemName}
              onChangeText={setGroupItemName}
            />
          </DynamicView>
          <DynamicView flex={1} marginLeft={4}>
            <DynamicText style={styles.categoryLabelStyle}>Price</DynamicText>
            <DynamicTextInput
              marginTop={4}
              placeholder=""
              placeholderTextColor={Colors.grey}
              style={styles.textInputStyle}
              value={groupItemPrice}
              onChangeText={setGroupItemPrice}
              keyboardType="decimal-pad"
            />
          </DynamicView>
          <DynamicView flex={1} marginLeft={4}>
            <DynamicText style={styles.categoryLabelStyle}>
              {`Min\nSelections`}
            </DynamicText>
            <DynamicTextInput
              marginTop={4}
              placeholder=""
              placeholderTextColor={Colors.grey}
              style={styles.textInputStyle}
              value={groupItemMinSelections}
              onChangeText={setGroupItemMinSelections}
              keyboardType="number-pad"
            />
          </DynamicView>
          <DynamicView flex={1} marginLeft={4}>
            <DynamicText style={styles.categoryLabelStyle}>
              {`Max\nSelections`}
            </DynamicText>
            <DynamicTextInput
              marginTop={4}
              placeholder=""
              placeholderTextColor={Colors.grey}
              style={styles.textInputStyle}
              value={groupItemMaxSelections}
              onChangeText={setGroupItemMaxSelections}
              keyboardType="number-pad"
            />
          </DynamicView>
          <DynamicPressable
            marginLeft={8}
            style={styles.AddRowButton}
            onPress={onAddGroupItems}>
            <Ionicons size={24} name="add" color={Colors.white} />
          </DynamicPressable>
        </DynamicView>
        {availableOptions && availableOptions.length > 0
          ? availableOptions.map((item, index) => (
              <AvailableOption
                key={`${optionId}-${index}`}
                item={item}
                index={index}
                onRemoveGroupItems={onRemoveGroupItems}
                updateRowItem={updateRowItem}
              />
            ))
          : null}
      </DynamicView>
      <DynamicView marginTop="auto" marginBottom={21} marginHorizontal={21}>
        <DishButton
          icon="arrowright"
          label="Save Group"
          variant="primary"
          showSpinner={showLoading}
          onPress={onSubmit}
        />
      </DynamicView>
    </KeyboardAwareScrollView>
  );
};

export default ModifierGroupEntryView;

const styles = StyleSheet.create({
  rowName: {
    paddingTop: 12,
    paddingBottom: 8,
  },
  scroll: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  scrollContentContainerStyle: {
    flexGrow: 1,
    paddingHorizontal: 11,
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
