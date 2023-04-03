import React from 'react';
import {StyleSheet} from 'react-native';
import {DynamicView} from '@/components/index';
import {Icon, Input} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Colors, fonts} from '@/themes';
import {useDebouncedCallback} from 'use-debounce';

export interface DishRestaurantSearchBarProps {
  onSearchText?: any;
  searchText?: string;
  variant?: 'default' | 'alt' | undefined;
  placeholder?: string;
}

const DishRestaurantSearchBar: React.FC<DishRestaurantSearchBarProps> = ({
  // searchText,
  onSearchText,
  variant,
  placeholder,
}) => {
  const debounced = useDebouncedCallback(
    // function
    value => {
      onSearchText && onSearchText(value);
    },
    // delay in ms
    1000,
  );

  return (
    <DynamicView
      style={{
        backgroundColor: variant
          ? variant === 'alt'
            ? Colors.lightGrey
            : Colors.white
          : Colors.white,
        ...styles.searchBarStyle,
      }}>
      <Input
        variant="unstyled"
        // value={searchText}
        onChangeText={e => debounced(e)}
        InputLeftElement={
          <Icon
            as={<AntDesign size={16} name="search1" color={Colors.grey} />}
            marginLeft={2}
          />
        }
        style={styles.searchTextStyle}
        placeholder={placeholder ?? 'Search by a parameter'}
      />
    </DynamicView>
  );
};

export default DishRestaurantSearchBar;

const styles = StyleSheet.create({
  searchBarStyle: {
    borderRadius: 4,
    marginHorizontal: 11,
    marginVertical: 11,
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
