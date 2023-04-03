import React from 'react';
import {Box, HStack, Icon, Image, Text, VStack} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {ms} from 'react-native-size-matters';
import Colors from '@/themes/colors';
import {IPreparationTimes, IRestaurant} from '@/api/generic';
import FastImage from 'react-native-fast-image';
import {DynamicPressable, DynamicView} from '@/components';
import ChefHat from '@/assets/svg/chefHat.svg';

const logo = require('@/assets/images/restaurants/maghera_inn.png');

const moment = require('moment');

interface RestaurantItemProps {
  item: IRestaurant;
  onPressFavorite?: any;
  onPressRestaurant: any;
}

const RestaurantItem = ({
  item,
  onPressFavorite,
  onPressRestaurant,
}: RestaurantItemProps) => {
  const restaurant = item;

  const getDistance = () => {
    if (restaurant?.distanceMiles < 0.1) {
      return `${restaurant?.distanceMetres?.toFixed(1)} meters`;
    } else {
      return `${restaurant?.distanceMiles?.toFixed(1)} miles`;
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
    <DynamicPressable onPress={onPressRestaurant}>
      <VStack px={3} space={1} paddingBottom={25}>
        <DynamicPressable
          position="absolute"
          right={30}
          top={20}
          zIndex={10}
          onPress={onPressFavorite}>
          <Box bgColor={Colors.white} borderRadius="full" p={2}>
            <Icon
              as={<AntDesign name={item?.favourite ? 'heart' : 'hearto'} />}
              color={Colors.ember}
            />
          </Box>
        </DynamicPressable>
        {restaurant?.offersEventCatering && (
          <DynamicPressable
            position="absolute"
            right={30}
            bottom={100}
            zIndex={10}>
            <Box bgColor={Colors.ember} borderRadius="full" p={2}>
              <ChefHat width={18} height={18} />
            </Box>
          </DynamicPressable>
        )}
        {restaurant?.bannerImagePath !== '' ? (
          <FastImage
            borderRadius={4}
            style={{width: '100%', height: ms(202)}}
            source={{
              uri: restaurant?.bannerImagePath,
              priority: FastImage.priority.normal,
            }}
          />
        ) : (
          <Image
            borderRadius="lg"
            w={'100%'}
            h={'0'}
            source={logo}
            resizeMode="cover"
            alt={'Image-Alt'}
          />
        )}

        <DynamicView marginTop={8}>
          <Text fontFamily="heading" fontSize="lg" fontWeight={700}>
            {restaurant?.name}
          </Text>
        </DynamicView>
        <HStack space={6} alignItems="center">
          {restaurant?.averageRating! > 0 ? (
            <HStack space={1} alignItems="center">
              <Icon as={<FontAwesome name="star" />} color={Colors.gold} />
              <Text fontSize="sm" fontWeight="500">
                {restaurant?.averageRating}
              </Text>
            </HStack>
          ) : null}
          <HStack space={1} alignItems="center">
            <Icon
              as={<SimpleLineIcons name="location-pin" />}
              color={Colors.black}
            />
            <Text fontSize="sm" fontWeight="500">
              {getDistance()}
            </Text>
          </HStack>

          <HStack space={1} alignItems="center">
            <Icon as={<Feather name="clock" />} color={Colors.black} />

             <Text fontSize="sm" fontWeight="500">
              {displayPrepTime()}
            </Text>
          </HStack>
        </HStack>
      </VStack>
    </DynamicPressable>
  );
};

export default RestaurantItem;
