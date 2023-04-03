import React from 'react';
import {HStack, VStack, Text} from 'native-base';
import {DynamicPressable} from '@/components';
import {Colors} from '@/themes';
import {useSelector} from 'react-redux';
import {searchSelectors} from '@/store/search';

export interface SearchRecentViewProps {
  onClear?: () => void | any;
  onPressRecentSearch?: (item: any) => void | any;
}

const SearchRecentView = ({
  onClear,
  onPressRecentSearch,
}: SearchRecentViewProps) => {
  const recentSearches = useSelector(searchSelectors.selectRecentSearch);

  return (
    <>
      <HStack pt={5} justifyContent="space-between" alignItems="center">
        <Text fontSize="lg" bold>
          Recent searches
        </Text>
        <DynamicPressable onPress={onClear}>
          <Text color={Colors.grey} fontSize="xs">
            {recentSearches && recentSearches.length < 1 ? '' : 'Clear all'}
          </Text>
        </DynamicPressable>
      </HStack>
      <VStack pt={3} space={3}>
        {recentSearches &&
          recentSearches.map((item, index) => {
            return (
              <DynamicPressable
                onPress={() => onPressRecentSearch && onPressRecentSearch(item)}
                key={index}>
                <Text color={Colors.ember} fontSize="lg">
                  {item}
                </Text>
              </DynamicPressable>
            );
          })}
      </VStack>
    </>
  );
};

export default SearchRecentView;
