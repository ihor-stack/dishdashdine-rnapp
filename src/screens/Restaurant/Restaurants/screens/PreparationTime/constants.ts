import {Platform, StyleSheet} from 'react-native';

const minutesAnHour = 60;

const getTotalMinutes = (hours: number, minutes: number) =>
  hours * minutesAnHour + minutes;

const convertMinsToHrsMins = (minutes: number | undefined) => {
  let totalHours = 0,
    totalMinutes = 0;

  if (!minutes) {
    return {totalHours, totalMinutes};
  }

  totalHours = Math.floor(minutes / minutesAnHour);
  totalMinutes = minutes % minutesAnHour;

  return {totalHours, totalMinutes};
};

const scrollViewProps = {nestedScrollEnabled: true};

const isPlatformIos = Platform.OS === 'ios';

const zIndexBoxes = {
  1: isPlatformIos ? 3000 : undefined,
  2: isPlatformIos ? 2000 : undefined,
  3: isPlatformIos ? 1000 : undefined,
};

const hours = [...Array(121).keys()].map(i => ({label: `${i}`, value: i}));

const minutes = [
  {label: '0', value: 0},
  {label: '15', value: 15},
  {label: '30', value: 30},
  {label: '45', value: 45},
];

const styles = StyleSheet.create({
  scroll: {flex: 1},
  contentContainerStyle: {paddingVertical: 20, flexGrow: 1},
  dropDownContainerStyle: {
    backgroundColor: '#F8F8F8',
    borderColor: '#E2E2E2',
    overflow: 'scroll',
  },
  dropDownStyle: {
    backgroundColor: '#F8F8F8',
    borderWidth: 0,
    overflow: 'scroll',
  },
  textStyle: {color: '#6B6B6B', fontSize: 14, lineHeight: 18.23},
});

export {
  convertMinsToHrsMins,
  scrollViewProps,
  zIndexBoxes,
  hours,
  minutes,
  styles,
  getTotalMinutes,
};
