import {StyleSheet} from 'react-native';
import {Colors, fonts} from '@/themes';

export default StyleSheet.create({
  textLabelStyle: {
    fontFamily: fonts.DMSans700Bold,
    fontSize: 15,
    lineHeight: 20,
    color: Colors.black,
    marginLeft: 10,
  },
  textInputView: {
    marginTop: 4,
    marginBottom: 20,
    marginHorizontal: 10,
  },
  formControl: {
    backgroundColor: Colors.lightestGrey,
    height: 40,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 4,
  },
  textInputStyle: {
    fontFamily: fonts.DMSans400Regular,
    fontSize: 14,
    lineHeight: 18,
    borderRadius: 4,
    color: Colors.grey,
  },
  ImageBackground: {
    height: 200,
    marginTop: 20,
    position: 'relative',
  },
  ImageStyle: {
    borderRadius: 8,
  },
  checkBoxView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: 15,
    marginHorizontal: 10,
  },
  selectStyle: {
    height: 40,
    paddingHorizontal: 20,
    fontFamily: fonts.DMSans400Regular,
    fontSize: 14,
    lineHeight: 18,
    borderRadius: 4,
  },
  toggleSwitchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 18,
    marginBottom: 16,
  },
  checkBox: {
    width: 16,
    height: 16,
  },
});
