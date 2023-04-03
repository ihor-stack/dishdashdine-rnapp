import React, {useState} from 'react';
import {Box, ScrollView, Text, VStack} from 'native-base';
import {Search} from '@/components';
import TopPicks from '@/components/TopPicks';
import Colors from '@/themes/colors';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {taxonomySelectors} from '@/store/taxonomy';
import {isEmpty} from 'lodash';

const Browse = () => {
  const taxonomies = useSelector(taxonomySelectors.selectTaxonomies);
  const topTaxonomies = useSelector(taxonomySelectors.selectTopTaxonomies);
  const navigation = useNavigation<any>();
  const [searchText, setSearchText] = useState('');

  const onSearchPress = async () => {
    navigation.navigate('BrowseSearch', {
      searchText,
    });
    setSearchText('');
  };

  return (
    <VStack flex={1} bgColor={Colors.white}>
      <Box bgColor={Colors.white}>
        <Search onSearchPress={onSearchPress} />
      </Box>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box p={3}>
          {!isEmpty(topTaxonomies) && (
            <Box bgColor={Colors.white} pb={4}>
              <Text fontFamily="heading" fontSize={20} bold pb={4}>
                Your top picks
              </Text>
              <TopPicks categories={topTaxonomies} />
            </Box>
          )}
          <Box bgColor={Colors.white}>
            <Text fontFamily="heading" fontSize={20} bold pb={4}>
              All Categories
            </Text>
            <TopPicks categories={taxonomies} />
          </Box>
        </Box>
      </ScrollView>
    </VStack>
  );
};

export default Browse;
