import React from 'react';
import {
  Box,
  Divider,
  HStack,
  Icon,
  Image,
  Pressable,
  Text,
  VStack,
} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Colors} from '@/themes';
import {ms} from 'react-native-size-matters';
import {IAddress, IFindRestaurantParams, IRestaurant} from '@/api/generic';
import RestaurantService from '@/api/restaurant';
import DishToast from '@/components/DishToast';
import {fetchMyFavorites, fetchRestaurant} from '@/store/restaurants/thunk';
import {captureErrorException} from '@/utils/error-handler';
import {DEFAULT_DISTANCE, ORDER_TYPE} from '@/constants';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import {isEmpty, isNull} from 'lodash';
import {setSelectedRestaurant} from '@/store/restaurants';
import {useSelector} from 'react-redux';
import {homeSelectors} from '@/store/home';
import {addressSelectors} from '@/store/address';
import {showSuccessMessage} from '@/components/DishFlashMessage';

const logo = require('@/assets/images/restaurants/maghera_inn.png');

interface Props {
  item: IRestaurant;
  toast?: any;
  dispatch?: any;
  currentLocation?: any;
  currentDistance?: number;
}

const FavoriteItem = ({
  item,
  toast,
  dispatch,
  currentLocation,
  currentDistance,
}: Props) => {
  const navigation = useNavigation();
  const homeOrderType = useSelector(homeSelectors.showOrderType);
  const defaultAddress = useSelector(
    addressSelectors.selectDefaultAddress,
  ) as IAddress;

  const onPressFavorite = async (id: string) => {
    let params: IFindRestaurantParams = {
      Latitude: currentLocation?.latitude,
      Longitude: currentLocation?.longitude,
      RadiusMiles: currentDistance || DEFAULT_DISTANCE,
      // IncludeOpenOnly: true,
    };

    if (!isNull(homeOrderType)) {
      params = {
        ...params,
        OrderType: homeOrderType,
        IncludeCateringRestaurants: false,
      };
    } else {
      params = {
        ...params,
        IncludeCateringRestaurants: true,
      };
    }

    try {
      const response = await RestaurantService.createRestaurantFavorite(id, {
        isFavourite: false,
      });

      if (response) {
        showSuccessMessage(
          'Remove to Favourite',
          'Successfully removed to your favourites!',
        );

        if (defaultAddress?.postCode) {
          dispatch(
            fetchRestaurant({
              ...params,
              PostCode: defaultAddress?.postCode,
            }),
          );
        } else {
          dispatch(fetchRestaurant(params));
        }
        await dispatch(fetchMyFavorites());
      }
    } catch (error: any) {
      captureErrorException(error);
    }
  };

  return (
    <>
      <Box marginY={2}>
        <HStack space={5}>
          {!isEmpty(item?.bannerImagePath) ? (
            <FastImage
              style={{width: ms(80), height: ms(80)}}
              source={{
                uri: item?.bannerImagePath,
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
              alt={'Image-Alt'}
            />
          )}
          <VStack space={2}>
            <Text>{item.name}</Text>
            <Text>Ordered {item.timesOrdered} items</Text>
            <Pressable
              p={0}
              m={0}
              onPress={async () => {
                await dispatch(setSelectedRestaurant(item));
                navigation.navigate('DishInfo', {id: item?.restaurantId});
              }}>
              <Text underline>View Menu</Text>
            </Pressable>
          </VStack>

          <Pressable
            position="absolute"
            right={3}
            top={4}
            zIndex={1}
            onPress={() => onPressFavorite(item?.restaurantId)}>
            <Box bgColor={Colors.white} borderRadius="full" p={2}>
              <Icon
                as={<AntDesign name={item?.favourite ? 'heart' : 'hearto'} />}
                color={Colors.ember}
              />
            </Box>
          </Pressable>
        </HStack>
      </Box>
      <Divider bgColor={Colors.lightestGrey} />
    </>
  );
};

export default FavoriteItem;
