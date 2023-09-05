import React from 'react';
import {HStack, Icon, Image, Text, VStack} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Colors from '@/themes/colors';
import {ms} from 'react-native-size-matters';
import {IRestaurant} from '@/api/generic';
import FastImage from 'react-native-fast-image';
import {DynamicPressable} from '@/components';

import {displayPrepTime} from '@/utils/restaurant';

const logo = require('@/assets/images/restaurants/maghera_inn.png');

interface Props {
  item: IRestaurant;
  onPressRestaurant: any;
}

const SearchResultItem = ({item, onPressRestaurant}: Props) => {
  const restaurant = item;

  const getDistance = () => {
    if (item.distanceMiles) {
      if (item.distanceMiles < 0.1) {
        return `${item.distanceMetres?.toFixed(1)} meters`;
      } else {
        return `${item.distanceMiles?.toFixed(1)} miles`;
      }
    } else {
      return '0 mile';
    }
  };

  return (
    <DynamicPressable onPress={onPressRestaurant} paddingVertical={20}>
      <HStack space={3} alignItems="center">
        {restaurant.bannerImagePath !== '' ? (
          <FastImage
            style={{width: ms(80), height: ms(80), borderRadius: 4}}
            source={{
              uri: restaurant.bannerImagePath,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        ) : (
          <Image
            borderRadius="md"
            w={ms(80)}
            h={ms(80)}
            source={logo}
            resizeMode="cover"
            alt="image-alt"
          />
        )}
        {/* </SharedElement> */}
        <VStack>
          <Text bold>{restaurant.name}</Text>
          <HStack space={6} alignItems="center">
            {restaurant.averageRating > 0 ? (
              <HStack space={1} alignItems="center">
                <Icon as={<FontAwesome name="star" />} color={Colors.gold} />
                <Text fontSize="xs">{restaurant.averageRating}</Text>
              </HStack>
            ) : null}
            <HStack space={1} alignItems="center">
              <Icon as={<SimpleLineIcons name="location-pin" />} />
              <Text fontSize="xs">{getDistance()}</Text>
            </HStack>

            <HStack space={1} alignItems="center">
              <Icon as={<Feather name="clock" />} />
              <Text fontSize="xs">{displayPrepTime(restaurant)}</Text>
            </HStack>
          </HStack>
        </VStack>
      </HStack>
    </DynamicPressable>
  );
};

export default SearchResultItem;
