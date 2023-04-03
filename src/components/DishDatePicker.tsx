import React from 'react';
import {GestureResponderEvent, StyleProp, ViewStyle} from 'react-native';
import ModalDatePicker, {DatePickerProps} from 'react-native-date-picker';
import moment from 'moment';

export interface IAppDatePickerContentProps {
  value: string | undefined;
  placeholder: string | undefined;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
}

export interface IAppDatePickerProps
  extends DatePickerProps,
    IAppDatePickerContentProps {
  style?: StyleProp<ViewStyle> | undefined;
  onDateChanged?: any;
}

const DishDatePicker = ({style, ...props}: IAppDatePickerProps) => {
  return (
    <>
      <ModalDatePicker
        modal
        mode="date"
        style={style}
        open={props.open}
        onConfirm={date => {
          props?.onDateChanged &&
            props?.onDateChanged({
              date: date,
              formatted: moment(date).format('DD-MM-YYYY'),
              year: moment(date).format('YYYY'),
              month: moment(date).format('MM'),
              day: moment(date).format('DD'),
            });
        }}
        {...props}
      />
    </>
  );
};

export default DishDatePicker;
