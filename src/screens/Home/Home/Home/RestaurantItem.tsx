import React from 'react';
import {Box, HStack, Icon, Image, Text, VStack} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {ms} from 'react-native-size-matters';
import FastImage from 'react-native-fast-image';

import Colors from '@/themes/colors';
import { IPreparationTimes, IRestaurant } from '@/api/generic';
import { DynamicPressable, DynamicView } from '@/components';
import ChefHat from '@/assets/svg/chefHat.svg';
import { displayPrepTime } from '@/utils/restaurant';
import { displayTimeFromMinutes } from '@/utils/time';

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
            style={{ width: '100%', height: ms(202) }}
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
              {displayPrepTime(restaurant)}
            </Text>
          </HStack>
        </HStack>
      </VStack>
    </DynamicPressable>
  );
};

export default RestaurantItem;
