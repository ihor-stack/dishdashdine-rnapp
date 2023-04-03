import {Colors, fonts} from '@/themes';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  categoryLabelStyle: {
    fontFamily: fonts.DMSans700Bold,
    fontSize: 15,
    lineHeight: 20,
    color: Colors.black,
  },
  textInputStyle: {
    backgroundColor: Colors.lightestGrey,
    height: 40,
    paddingHorizontal: 20,
    fontFamily: fonts.DMSans400Regular,
    fontSize: 14,
    lineHeight: 18,
    borderRadius: 4,
  },
  AddRowButton: {
    width: 44,
    height: 40,
    backgroundColor: Colors.red,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  RemoveRowButton: {
    width: 44,
    height: 40,
    backgroundColor: Colors.darkGrey,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectInputStyle: {
    backgroundColor: Colors.lightestGrey,
    height: 40,
    paddingHorizontal: 20,
    fontFamily: fonts.DMSans400Regular,
    fontSize: 14,
    lineHeight: 18,
    borderRadius: 4,
    borderWidth: 0,
  },
});
