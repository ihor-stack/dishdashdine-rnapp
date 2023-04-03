import React from 'react';
import {Pressable, Text} from 'native-base';
import {ms} from 'react-native-size-matters';
import Colors from '@/themes/colors';
import {useNavigation} from '@react-navigation/core';
import {useWindowDimensions} from 'react-native';
import {DynamicImage, DynamicView} from '@/components';
import {isEmpty} from 'lodash';
import FastImage from 'react-native-fast-image';
import {ITaxonomy} from '@/api/generic';
import {fonts} from '@/themes';

const noImageFound = require('@/assets/images/no-image-found.jpeg');

export interface TopPicksProps {
  categories: any[];
}

const TopPicks = ({categories}: TopPicksProps) => {
  const {width} = useWindowDimensions();
  const navigation = useNavigation<any>();

  const handleOnPressCategory = (taxonomy: ITaxonomy) => {
    navigation.navigate('BrowseSearch', {
      searchText: taxonomy.name,
      searchAction: 'taxonomy',
      data: taxonomy,
    });
  };

  const renderItem = (item: any, index: number) => {
    return (
      <Pressable
        key={`${item.name}-${index}`}
        mb={4}
        // mr={2}
        p={2}
        px={4}
        width={width / 2.199}
        borderRadius="md"
        flexDirection="row"
        bgColor={Colors.lightGrey}
        alignItems="center"
        justifyContent="space-between"
        onPress={() => handleOnPressCategory(item)}>
        <Text
          fontFamily={fonts.DMSans700Bold}
          fontSize={15}
          lineHeight={19.53}
          fontWeight={700}>
          {item.name}
        </Text>
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
      </Pressable>
    );
  };

  return (
    <DynamicView
      flex={1}
      flexDirection="row"
      alignItems="flex-start"
      justifyContent="space-between"
      flexWrap="wrap">
      {categories &&
        categories.map((item, index) => {
          return renderItem(item, index);
        })}
    </DynamicView>
  );
};

export default TopPicks;
