import React from 'react';
import {HStack, Icon, Image, Text, VStack} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Colors from '@/themes/colors';
import {ms} from 'react-native-size-matters';
import {IPreparationTimes, IRestaurant} from '@/api/generic';
import FastImage from 'react-native-fast-image';
import {DynamicPressable, DynamicView} from '@/components';
// import {SharedElement} from 'react-navigation-shared-element';
const moment = require('moment');

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

  const displayPrepTime = () => {
    const { preparationTimes } = restaurant;
    let prepTimeMin = restaurant.prepTimeMin
    let prepTimeMax = restaurant.prepTimeMax
    const enabledTime = preparationTimes.filter((item: IPreparationTimes) => {
      return item.enabled
    })

    if (enabledTime.length > 0) {
      prepTimeMin = enabledTime[0].prepTimeMin
      prepTimeMax = enabledTime[0].prepTimeMax
    }

    let minTimeText = ""
    if (prepTimeMin < 60) {
      minTimeText += `${prepTimeMin}${prepTimeMax < 120 ? "mins" : "mins"}`
    } else if (prepTimeMin > 60 && prepTimeMin < 1440) {
      const hrs = Math.trunc(prepTimeMin / 60)
      minTimeText += `${hrs > 1 ? hrs : prepTimeMin}${hrs > 1 ? "" : "mins"}`
    } else if (prepTimeMin >= 1440) {
      const days = Math.trunc(prepTimeMin / 1440)
      const hrs = Math.trunc(prepTimeMin / 60)
      minTimeText += `${days >= 1 ? days : hrs}${days >= 1 ? days > 1 ? "days" : "day" : "hrs"}`
    }
    
    let maxTimeText = ""
    if (prepTimeMax < 60) {
      maxTimeText += `${prepTimeMax} mins`
    } else if (prepTimeMax > 60 && prepTimeMax < 1440) {
      const hrs = Math.trunc(prepTimeMax / 60)
      maxTimeText += `${hrs}${hrs > 1 ? "hrs" : "hr"}`
    } else if (prepTimeMax >= 1440) {
      const days = Math.trunc(prepTimeMax / 1440)
      const hrs = Math.trunc(prepTimeMax / 60)
      maxTimeText += `${days >= 1 ? days : hrs}${days >= 1 ? days > 1 ? "days" : "day" : "hrs"}`
    }

    if (prepTimeMin === 0 && prepTimeMax === 0) {
      return ""
    }

    if (minTimeText !== "" && maxTimeText !== "") {
      return minTimeText + "-" + maxTimeText
    } else  if (minTimeText === "") {
      return maxTimeText
    } else if (maxTimeText === "") {
      return minTimeText
    }
    return ""
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
              <Text fontSize="xs">{displayPrepTime()}</Text>
            </HStack>
          </HStack>
        </VStack>
      </HStack>
    </DynamicPressable>
  );
};

export default SearchResultItem;
