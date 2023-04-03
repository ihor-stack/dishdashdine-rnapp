import {StyleSheet} from 'react-native';
import React from 'react';
import {Colors, fonts} from '@/themes';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {DynamicView} from '@/components';
import {Icon, Input} from 'native-base';

const OrderSearchBar = () => {
  return (
    <DynamicView style={styles.searchBarStyle}>
      <Input
        variant="unstyled"
        InputLeftElement={
          <Icon
            as={<AntDesign size={16} name="search1" color={Colors.grey} />}
            marginLeft={2}
          />
        }
        style={styles.searchTextStyle}
        placeholder="Search by a parameter"
      />
    </DynamicView>
  );
};

export default OrderSearchBar;

const styles = StyleSheet.create({
  searchBarStyle: {
    borderRadius: 4,
    marginHorizontal: 11,
    marginTop: 11,
    backgroundColor: Colors.white,
  },
  searchTextStyle: {
    minHeight: 40,
    paddingVertical: 11,
    fontFamily: fonts.DMSans400Regular,
    fontSize: 14,
    lineHeight: 18,
    color: Colors.grey,
  },
});
