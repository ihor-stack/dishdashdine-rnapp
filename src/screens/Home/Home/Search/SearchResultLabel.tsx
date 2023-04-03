import React from 'react';
import {HStack, Text} from 'native-base';
import {isEmpty, size} from 'lodash';

export interface SearchResultLabelProps {
  SearchResults?: any[];
  searchText?: string;
  resultLabel?: string;
}

const SearchResultLabel = ({
  SearchResults,
  resultLabel,
  searchText,
}: SearchResultLabelProps) => {
  return (
    <HStack pt={5}>
      <Text fontSize="lg" bold>
        {`${
          size(SearchResults) < 1 ? `No` : `${size(SearchResults)}`
        } ${resultLabel} ${isEmpty(searchText) ? '' : searchText}`}
      </Text>
    </HStack>
  );
};

export default SearchResultLabel;
