import {DynamicView} from '@/components';
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import ActionSheet, {
  SheetManager,
  SheetProps,
} from 'react-native-actions-sheet';
import MenuItems from './MenuItems';

export interface ItemModalProps extends SheetProps {}

const ItemModal = (props: ItemModalProps) => {
  const [restaurantId, setRestaurantId] = useState<string>('');
  const [itemType, setItemType] = useState<string>('');

  const onSelectedCategory = async (category: any) => {
    SheetManager.hide('ItemModal', {
      payload: category,
    });
  };

  return (
    <ActionSheet
      id={'ItemModal' || props.sheetId}
      gestureEnabled
      containerStyle={styles.containerStyle}
      onBeforeShow={(data: any) => {
        setRestaurantId(data?.restaurantId);
        setItemType(data?.itemType);
      }}>
      {/* {isLoading && <DishSpinner />} */}
      <DynamicView marginHorizontal={12} paddingBottom={80}>
        <MenuItems onSelectedItem={onSelectedCategory} itemType={itemType} />
      </DynamicView>
    </ActionSheet>
  );
};

export default ItemModal;

const styles = StyleSheet.create({
  containerStyle: {
    marginTop: 15,
    paddingBottom: 80,
  },
});
