import {Colors, fonts} from '@/themes';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  containter: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainerStyle: {
    flex: 1,
    paddingHorizontal: 11,
    paddingTop: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  cardStyle: {
    backgroundColor: '#F8F8F8',
    textColor: '#303030',
    fontFamily: fonts.DMSans700Bold,
    fontSize: 14,
  },
  cardView: {
    width: '100%',
    height: 40,
    marginVertical: 30,
  },
});
