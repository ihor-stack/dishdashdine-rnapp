import {DynamicView} from '@/components';
import React, {useState} from 'react';
import DatePicker from 'react-native-date-picker';

const DeliverLater = () => {
  const [date, setDate] = useState(new Date());

  return (
    <DynamicView alignItems="center">
      <DatePicker date={date} onDateChange={setDate} />
    </DynamicView>
  );
};

export default DeliverLater;
