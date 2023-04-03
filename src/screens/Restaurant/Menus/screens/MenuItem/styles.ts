import {StyleSheet} from 'react-native';
import {Colors, fonts} from '@/themes';

export default StyleSheet.create({
  containerView: {
    marginTop: 11,
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  flatlistItem: {
    fontFamily: fonts.DMSans500Medium,
    fontSize: 14,
    lineHeight: 18,
    color: Colors.black,
  },
  displayMenuName: {
    fontFamily: fonts.DMSans500Medium,
    fontSize: 16,
    lineHeight: 21,
    color: Colors.black,
  },
  displayMenuAvailability: {
    fontFamily: fonts.DMSans500Medium,
    fontSize: 12,
    lineHeight: 16,
    color: Colors.black,
  },
  menuItemsText: {
    fontFamily: fonts.DMSans700Bold,
    fontSize: 14,
    lineHeight: 18,
    color: Colors.black,
  },
  renderItemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    paddingBottom: 10,
  },
  listFooterStyle: {
    marginBottom: 21,
    marginTop: 25,
    marginHorizontal: 22,
  },
});
