import {Colors, fonts} from '@/themes';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  basicInfoHeader: {
    fontFamily: fonts.DMSans500Medium,
    fontSize: 20,
    lineHeight: 26,
    color: Colors.black,
  },
  textLabelStyle: {
    fontFamily: fonts.DMSans700Bold,
    lineHeight: 20,
    fontSize: 15,
    color: Colors.black,
  },
  textInputView: {
    marginTop: 4,
    justifyContent: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  textInputStyle: {
    backgroundColor: Colors.lightestGrey,
    height: 40,
    paddingHorizontal: 20,
    fontFamily: fonts.DMSans400Regular,
    fontSize: 14,
    lineHeight: 18,
  },
  ImageBackground: {
    height: 200,
    marginTop: 20,
    position: 'relative',
    borderRadius: 8,
  },
  addRestaurantView: {
    top: 20,
    borderRadius: 8,
    borderColor: Colors.black,
    borderWidth: 1,
    height: 200,
    backgroundColor: Colors.lightestGrey,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  linearGradient: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    zIndex: 100,
  },
});
