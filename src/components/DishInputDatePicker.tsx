import React, {useState} from 'react';
import {
  NativeSyntheticEvent,
  TextInputFocusEventData,
  useWindowDimensions,
} from 'react-native';
import {
  DynamicPressable,
  DynamicText,
  DynamicTextInput,
  DynamicView,
} from '@/components/index';
import {Colors, fonts} from '@/themes';
import {Controller, Control} from 'react-hook-form';
import DishDatePicker from '@/components/DishDatePicker';
import {isEmpty} from 'lodash';

export interface DishInputDatePickerProps {
  label: string;
  placeholder: string;
  dateValue?: string | any;
  onDateChanged?: any;
}

const DishInputDatePicker: React.FC<DishInputDatePickerProps> = ({
  label,
  placeholder,
  dateValue,
  onDateChanged,
}) => {
  const {width} = useWindowDimensions();
  const [open, setOpen] = useState(false);
  const [curDate, setCurDate] = useState<any>(new Date(dateValue));
  const [formatted, setFormatted] = useState<string>('');

  return (
    <>
      <DynamicText
        fontFamily={fonts.DMSans700Bold}
        fontSize={15}
        lineHeight={19.53}
        color={Colors.black}>
        {label}
      </DynamicText>
      <DynamicPressable
        onPress={() => setOpen(true)}
        backgroundColor={Colors.lightGrey}
        width={width - 22}
        paddingHorizontal={21}
        paddingVertical={11}
        marginTop={3}
        borderRadius={4}>
        <DynamicText
          fontSize={14}
          fontFamily={fonts.DMSans400Regular}
          lineHeight={18.23}
          color={isEmpty(formatted) ? Colors.grey : Colors.black}>
          {isEmpty(formatted) ? placeholder : formatted}
        </DynamicText>
      </DynamicPressable>
      <DishDatePicker
        date={curDate}
        value={curDate}
        open={open}
        placeholder={undefined}
        placeholderTextColor={Colors.grey}
        onCancel={() => {
          setOpen(false);
        }}
        onDateChanged={(val: any) => {
          setCurDate(val.date);
          setOpen(false);
          onDateChanged && onDateChanged(val);
          setFormatted(val.formatted);
          // setValue('eventDate', val.formatted);
        }}
      />
    </>
  );
};

export default DishInputDatePicker;
