import {StyleSheet, Switch, Platform} from 'react-native';
import React, {useState} from 'react';
import {Colors, fonts} from '@/themes';
import {
  DynamicPressable,
  DynamicText,
  DynamicTextInput,
  DynamicView,
} from '@/components';
import DishDatePicker from '@/components/DishDatePicker';

export interface OpeningHourSchedulerProps {
  label?: string;
  tpOpenValue?: string;
  tpCloseValue?: string;
  isChecked?: boolean;
  onToggleSwith: any;
  onOpenChangeDate: any;
  onCloseChangeDate: any;
  openingDate: any;
  closingDate: any;
}

const OpeningHourScheduler = (props: OpeningHourSchedulerProps) => {
  const [opening, setOpening] = useState(false);
  const [closing, setClosing] = useState(false);

  return (
    <>
      <DynamicView
        flexDirection="row"
        justifyContent="space-evenly"
        marginBottom={12}>
        <DynamicView
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          flex={1}
          paddingRight={15}>
          <DynamicText style={styles.textDayStyle}>{props.label}</DynamicText>
          <Switch
            trackColor={{
              false: 'rgba(171, 187, 194, 0.26)',
              true: 'rgba(224, 4, 4, 0.25)',
            }}
            thumbColor={props.isChecked ? Colors.ember : Colors.darkGrey}
            onChange={props.onToggleSwith}
            value={props.isChecked}
            style={
              Platform.OS === 'ios'
                ? {transform: [{scaleX: 0.8}, {scaleY: 0.8}]}
                : {transform: [{scaleX: 1.2}, {scaleY: 1.2}]}
            }
          />
        </DynamicView>
        <DynamicPressable paddingRight={15} onPress={() => setOpening(true)}>
          <DynamicTextInput
            placeholder="0:00"
            placeholderTextColor={Colors.grey}
            style={styles.textInputStyle}
            value={props.tpOpenValue}
            editable={false}
            onBlur={() => {
              setOpening(false);
            }}
            onTouchStart={() => setOpening(true)}
          />
        </DynamicPressable>
        <DynamicPressable paddingRight={15} onPress={() => setClosing(true)}>
          <DynamicTextInput
            placeholder="0:00"
            placeholderTextColor={Colors.grey}
            value={props.tpCloseValue}
            style={styles.textInputStyle}
            paddingRight={17}
            editable={false}
            onBlur={() => setClosing(false)}
            onTouchStart={() => setClosing(true)}
          />
        </DynamicPressable>
      </DynamicView>
      <DishDatePicker
        mode="time"
        androidVariant="iosClone"
        date={props.openingDate}
        value={props.tpOpenValue}
        placeholder={undefined}
        open={opening}
        minuteInterval={15}
        onCancel={() => setOpening(false)}
        onConfirm={date => {
          setOpening(false);
          props.onOpenChangeDate(date);
        }}
        onDateChanged={props.onOpenChangeDate}
      />
      <DishDatePicker
        mode="time"
        androidVariant="iosClone"
        date={props.closingDate}
        value={props.tpCloseValue}
        placeholder={undefined}
        open={closing}
        minuteInterval={15}
        onCancel={() => setClosing(false)}
        onConfirm={date => {
          setOpening(false);
          props.onCloseChangeDate(date);
        }}
        onDateChanged={props.onOpenChangeDate}
      />
    </>
  );
};

export default OpeningHourScheduler;

const styles = StyleSheet.create({
  textDayStyle: {
    fontFamily: fonts.DMSans500Medium,
    fontSize: 14,
    lineHeight: 20,
    color: Colors.black,
  },
  textInputStyle: {
    width: 71,
    height: 40,
    marginHorizontal: 8,
    fontFamily: fonts.DMSans400Regular,
    fontSize: 14,
    lineHeight: 18,
    color: Colors.grey,
    backgroundColor: Colors.lightestGrey,
    textAlign: 'center',
  },
});
