import React from 'react';
import {Divider} from 'native-base';
import {Colors} from '@/themes';
import {DynamicPressable, DynamicText, DynamicView} from '@/components';
import styles from '@/screens/Restaurant/Menus/screens/MenuItemDetails/styles';
import DishChips from '@/components/DishChips';

export interface CategoriesDetailsProps {
  onSelectCategories: () => Promise<void>;
  itemCategories: any[];
  onRemoveCategory: any;
}

const CategoriesDetails: React.FC<CategoriesDetailsProps> = ({
  onSelectCategories,
  itemCategories,
  onRemoveCategory,
}) => {
  return (
    <>
      <Divider color={Colors.lightGrey} marginBottom={22} />
      <DynamicView>
        <DynamicText style={styles.textLabelStyle}>Categories</DynamicText>
        <DynamicPressable
          style={styles.textInputView}
          onPress={onSelectCategories}>
          <DynamicView style={styles.formControl}>
            <DynamicText style={styles.textInputStyle} textAlign="center">
              Select Categories
            </DynamicText>
          </DynamicView>
        </DynamicPressable>
        <DynamicView flexDirection="row" flexWrap="wrap">
          {itemCategories &&
            itemCategories.map((category, index) => {
              return (
                <DishChips
                  onPressRemove={() => onRemoveCategory(index)}
                  key={index}
                  name={category.categoryName}
                />
              );
            })}
        </DynamicView>
      </DynamicView>
    </>
  );
};

export default CategoriesDetails;
