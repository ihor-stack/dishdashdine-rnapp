import React from 'react';
import {View, Text} from 'react-native';
import {Divider} from 'native-base';
import {Colors} from '@/themes';
import {DynamicPressable, DynamicText, DynamicView} from '@/components';
import styles from '@/screens/Restaurant/Menus/screens/MenuItemDetails/styles';
import DishChips from '@/components/DishChips';

export interface ModifiersDetailProps {
  onSelectModifiers: () => Promise<void>;
  menuItemModifiers: any[];
  onRemoveModifier: any;
}

const ModifiersDetail: React.FC<ModifiersDetailProps> = ({
  onSelectModifiers,
  menuItemModifiers,
  onRemoveModifier,
}) => {
  return (
    <>
      <Divider color={Colors.lightGrey} marginTop={27} />
      <DynamicView marginTop={22}>
        <DynamicText style={styles.textLabelStyle}>Modifier groups</DynamicText>
        <DynamicPressable
          style={styles.textInputView}
          onPress={onSelectModifiers}>
          <DynamicView style={styles.formControl}>
            <DynamicText style={styles.textInputStyle} textAlign="center">
              Add a modifier group
            </DynamicText>
          </DynamicView>
        </DynamicPressable>
        <DynamicView flexDirection="row">
          {menuItemModifiers &&
            menuItemModifiers.map((modifier, index) => {
              return (
                <DishChips
                  onPressRemove={() => onRemoveModifier(index)}
                  key={index}
                  name={modifier.modifierGroupName}
                />
              );
            })}
        </DynamicView>
      </DynamicView>
    </>
  );
};

export default ModifiersDetail;
