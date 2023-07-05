import {ScrollView} from 'react-native';
import React, {useState} from 'react';
import {DynamicPressable, DynamicText} from '@/components';
import {Colors, fonts} from '@/themes';

const tipsArray = [
  {
    id: 1,
    label: 'Not \n now',
    value: 0,
    selected: true,
  },
  {
    id: 2,
    label: '5%',
    value: 0.05,
    selected: false,
  },
  {
    id: 3,
    label: '10%',
    value: 0.1,
    selected: false,
  },
  {
    id: 4,
    label: '15%',
    value: 0.15,
    selected: false,
  },
  {
    id: 5,
    label: '20%',
    value: 0.2,
    selected: false,
  },
  {
    id: 6,
    label: '25%',
    value: 0.25,
    selected: false,
  },
];

export interface OrderTipsProps {
  subTotal: number;
  onSelectedTip: (item: any) => number | any;
}

const OrderTips = ({subTotal, onSelectedTip}: OrderTipsProps) => {
  const [_tipsArray, setTipsArray] = useState(tipsArray);

  const computeTips = (tipPercent: number) => {
    return Number(tipPercent * subTotal).toFixed(2);
  };

  const onPressSelect = (item: any) => {
    let newData = [...tipsArray];
    newData = newData.map(m => {
      if (item.id === m.id) {
        const amount = item.value * subTotal;
        onSelectedTip(amount);
        return {
          ...m,
          selected: true,
        };
      } else {
        return m;
      }
    });
    setTipsArray(newData);
  };

  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      {_tipsArray.map((item, index) => {
        return (
          <DynamicPressable
            key={index}
            paddingHorizontal={14}
            paddingVertical={10}
            backgroundColor={Colors.lightGrey}
            borderRadius={2}
            marginHorizontal={5}
            borderColor={item.selected ? Colors.black : Colors.lightGrey}
            borderWidth={item.selected ? 1.5 : 0}
            onPress={() => onPressSelect(item)}>
            <DynamicText
              fontFamily={fonts.DMSans500Medium}
              fontSize={14}
              lineHeight={18}
              textAlign="center"
              color={Colors.black}>
              {item.label}

              {item.value > 0 && (
                <>
                  {'\n'}
                  <DynamicText
                    fontFamily={fonts.DMSans400Regular}
                    fontSize={13}
                    lineHeight={15.62}
                    color={Colors.grey}>
                    £{computeTips(item.value)}
                  </DynamicText>
                </>
              )}
            </DynamicText>
          </DynamicPressable>
        );
      })}
    </ScrollView>
  );
};

export default OrderTips;
