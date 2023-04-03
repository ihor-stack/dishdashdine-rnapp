import React from 'react';
import {StyleSheet} from 'react-native';
import {DynamicTextInput, DynamicView} from '@/components';
import {Colors, fonts} from '@/themes';

export interface ModifierSpecialInstructionProps {
  value: string | undefined;
  onChangeText: ((text: string) => void) | undefined;
}

const ModifierSpecialInstruction = ({
  value,
  onChangeText,
}: ModifierSpecialInstructionProps) => {
  return (
    <DynamicView padding={20}>
      <DynamicTextInput
        style={styles.SpecialInstructions}
        multiline
        textAlign="left"
        textAlignVertical="top"
        value={value}
        onChangeText={onChangeText}
        placeholder="Please inform the restaurant of any dietary preferences, allergies, or
        even religious food restrictions."
        placeholderTextColor={Colors.grey}
      />
    </DynamicView>
  );
};

export default ModifierSpecialInstruction;

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
  Collapsible: {
    backgroundColor: Colors.white,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  SpecialInstructions: {
    height: 140,
    borderWidth: 1,
    borderRadius: 4,
    paddingTop: 15,
    paddingHorizontal: 15,
  },
});
