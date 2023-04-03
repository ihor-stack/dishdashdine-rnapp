import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {DynamicText, DynamicView} from '@/components';
import DishButton from '@/components/DishButton';
import {StyleSheet} from 'react-native';
import {Colors, fonts} from '@/themes';
import OpeningHourScheduler from './OpeningHourScheduler';
import {
  IAdminOpeningHours,
  IAdminRestaurant,
} from '@/api/admin_restaurant/model';
import moment from 'moment';

export interface OpeningHoursViewProps {
  onSubmit: any;
  showLoading: boolean;
  schedules?: IAdminOpeningHours[];
  onToggleSwith: any;
  onOpenChangeDate: any;
  onCloseChangeDate: any;
}

const OpeningHoursView = (props: OpeningHoursViewProps) => {
  const {
    onSubmit,
    showLoading,
    schedules,
    onToggleSwith,
    onOpenChangeDate,
    onCloseChangeDate,
  } = props;
  return (
    <ScrollView
      style={{
        backgroundColor: Colors.white,
      }}
      contentContainerStyle={{
        flexGrow: 1,
      }}>
      <DynamicView paddingTop={19} paddingHorizontal={12}>
        <DynamicText style={styles.basicInfoHeader}>Opening Hours</DynamicText>
      </DynamicView>
      <DynamicView style={styles.container}>
        <DynamicText
          style={{
            ...styles.textHeaderStyle,
            marginHorizontal: 0,
          }}>
          Day
        </DynamicText>
        <DynamicView style={styles.headerView}>
          <DynamicText style={styles.textHeaderStyle}>Open</DynamicText>
          <DynamicText style={styles.textHeaderStyle}>Close</DynamicText>
        </DynamicView>
      </DynamicView>
      <DynamicView paddingHorizontal={17}>
        {schedules &&
          schedules.map((item, index) => {
            return (
              <OpeningHourScheduler
                key={index}
                label={moment().day(item.dayOfWeek).format('dddd').toString()}
                openingDate={item.openTimeDate ? item.openTimeDate : new Date()}
                tpOpenValue={
                  item.openTime
                    ? moment(item.openTime).format('HH:mm').toString()
                    : '-'
                }
                onOpenChangeDate={(date: any) => onOpenChangeDate(date, index)}
                tpCloseValue={
                  item.closeTime
                    ? moment(item.closeTime).format('HH:mm').toString()
                    : '-'
                }
                closingDate={
                  item.closeTimeDate ? item.closeTimeDate : new Date()
                }
                onCloseChangeDate={(date: any) =>
                  onCloseChangeDate(date, index)
                }
                isChecked={item.open ? true : false}
                onToggleSwith={() => onToggleSwith(item, index)}
              />
            );
          })}
      </DynamicView>
      <DynamicView flex={1} />
      <DynamicView marginBottom={21} marginHorizontal={22}>
        <DishButton
          icon="arrowright"
          label="Save Settings"
          variant="primary"
          onPress={onSubmit}
          showSpinner={showLoading}
        />
      </DynamicView>
    </ScrollView>
  );
};

export default OpeningHoursView;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 12,
    paddingHorizontal: 17,
    marginTop: 25,
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flex: 1,
  },
  basicInfoHeader: {
    fontFamily: fonts.DMSans500Medium,
    fontSize: 20,
    lineHeight: 26,
    color: Colors.black,
  },
  textHeaderStyle: {
    fontFamily: fonts.DMSans700Bold,
    fontSize: 15,
    lineHeight: 20,
    color: Colors.black,
    flex: 1,
    marginHorizontal: 8,
  },
});
