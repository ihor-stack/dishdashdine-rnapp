import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {ITaxonomy} from '@/api/generic';
import {DynamicImage, DynamicPressable, DynamicText} from '@/components';
import {isEmpty} from 'lodash';
import FastImage from 'react-native-fast-image';
import {ms} from 'react-native-size-matters';
import {fonts} from '@/themes';
import {taxonomySelectors} from '@/store/taxonomy';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const FAKE_DATA: any[] = Array.from({
  length: 10,
});

const noImageFound = require('@/assets/images/no-image-found.jpeg');

const Taxonomies = () => {
  const {navigate} = useNavigation<any>();
  const taxonomies = useSelector(taxonomySelectors.selectTaxonomies);
  const loadingTaxonomy = useSelector(
    taxonomySelectors.selectLoadingTaxonomies,
  );

  const onFilterTaxonomy = (taxonomy: ITaxonomy) => {
    navigate('Search', {
      searchText: taxonomy.name,
      searchAction: 'taxonomy',
      data: taxonomy,
    });
  };

  const renderFilterLoading = (index: number) => {
    return (
      <SkeletonPlaceholder key={index}>
        <SkeletonPlaceholder.Item
          width={70}
          height={70}
          borderRadius={6}
          marginHorizontal={6}
        />
        <SkeletonPlaceholder.Item
          width={70}
          height={15}
          borderRadius={6}
          marginHorizontal={6}
          marginTop={5}
        />
      </SkeletonPlaceholder>
    );
  };

  const renderFilterItem = (item: ITaxonomy, i: number) => {
    return (
      <DynamicPressable
        key={`food-cat:${i}`}
        justifyContent="center"
        alignItems="center"
        marginRight={taxonomies.length - 1 === i ? 38 / 2 : 38}
        onPress={() => onFilterTaxonomy(item)}>
        {isEmpty(item.iconPath) ? (
          <DynamicImage
            source={noImageFound}
            width={40}
            height={40}
            marginBottom={8}
          />
        ) : (
          <FastImage
            style={{width: ms(40), height: ms(40), marginBottom: 8}}
            source={{
              uri: item.iconPath,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
        )}
        <DynamicText
          fontSize={12}
          lineHeight={16}
          fontFamily={fonts.DMSans500Medium}
          fontWeight="500">
          {item.name}
        </DynamicText>
      </DynamicPressable>
    );
  };

  return (
    <ScrollView
      bounces={false}
      decelerationRate="fast"
      snapToInterval={80}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}>
      {loadingTaxonomy
        ? FAKE_DATA.map((_, index) => {
            return renderFilterLoading(index);
          })
        : taxonomies.map((item, index) => {
            return renderFilterItem(item, index);
          })}
    </ScrollView>
  );
};

export default Taxonomies;

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: 27,
    paddingLeft: 19,
    paddingBottom: 20,
  },
});
