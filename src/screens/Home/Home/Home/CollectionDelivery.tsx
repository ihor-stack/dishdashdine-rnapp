import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DynamicPressable, DynamicText, DynamicView } from '@/components';
import { Colors, fonts } from '@/themes';
import { useSelector } from 'react-redux';
import { homeSelectors } from '@/store/home';

export interface CollectionDeliveryProps {
  onSelectedIndex?: (index: number | null) => void;
}

const CollectionDelivery = ({ onSelectedIndex }: CollectionDeliveryProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(0);
  const homeOrderType = useSelector(homeSelectors.showOrderType);

  return (
    <DynamicView
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      marginTop={20}
      marginBottom={10}>
      <DynamicPressable
        style={[
          styles.defaultStyle,
          homeOrderType === 0 ? styles.selectedStyle : styles.unSelectedStyle,
        ]}
        onPress={() => {
          onSelectedIndex && onSelectedIndex(0);
          setSelectedIndex(0);
        }}>
        <DynamicText
          style={styles.textStyle}
          color={homeOrderType === 0 ? Colors.white : Colors.black}>
          Collection
        </DynamicText>
      </DynamicPressable>
      <DynamicPressable
        style={[
          styles.defaultStyle,
          homeOrderType === 1 ? styles.selectedStyle : styles.unSelectedStyle,
        ]}
        onPress={() => {
          onSelectedIndex && onSelectedIndex(1);
          setSelectedIndex(1);
        }}>
        <DynamicText
          style={styles.textStyle}
          color={homeOrderType === 1 ? Colors.white : Colors.black}>
          Delivery
        </DynamicText>
      </DynamicPressable>
      <DynamicPressable
        style={[
          styles.defaultStyle,
          homeOrderType === null ? styles.selectedStyle : styles.unSelectedStyle,
        ]}
        onPress={() => {
          onSelectedIndex && onSelectedIndex(null);
          setSelectedIndex(null);
        }}>
        <DynamicText
          style={styles.textStyle}
          color={homeOrderType === null ? Colors.white : Colors.black}>
          Events
        </DynamicText>
      </DynamicPressable>
    </DynamicView>
  );
};

export default React.memo(CollectionDelivery);

const styles = StyleSheet.create({
  defaultStyle: {
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 17,
    paddingVertical: 3,
    marginHorizontal: 4,
    minWidth: 105,
  },
  unSelectedStyle: {
    borderColor: Colors.black,
    backgroundColor: Colors.white,
  },
  selectedStyle: {
    backgroundColor: Colors.ember,
    borderColor: Colors.ember,
  },
  textStyle: {
    fontFamily: fonts.DMSans500Medium,
    fontSize: 15,
    lineHeight: 19.53,
    textAlign: 'center',
  },
});
