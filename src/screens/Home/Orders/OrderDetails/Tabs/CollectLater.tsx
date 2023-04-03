import {DynamicView} from '@/components';
import { Text } from 'native-base';
import React, {useState} from 'react';
import DatePicker from 'react-native-date-picker';

export interface DatePickerProps {
  onChangeDate: (value: any) => void;
  value: any;
  prepTimeMin: number;
}

const CollectLater = ({onChangeDate, value, prepTimeMin}: DatePickerProps) => {
  const [date, setDate] = useState(
    new Date(Date.now() + prepTimeMin * 60 * 1000),
  );
  const maxDate = new Date(Date.now() + 20160 * 60 * 1000);

  return (
    <>
      <DynamicView alignItems="center">
        <DatePicker
          date={value || date}
          mode="datetime"
          onDateChange={_date => {
            setDate(_date);
            onChangeDate(_date);
          }}
          maximumDate={maxDate}
          minimumDate={date}
          minuteInterval={10}
        />
      </DynamicView>
    </>
  );
};

export default CollectLater;
