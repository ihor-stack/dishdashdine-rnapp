import React from 'react';
import {Box} from 'native-base';
import RestaurantItem from '../../RestaurantItem';
import Recommendations from '../../Recommendations';
import {IAddress, IFindRestaurantParams, IRestaurant} from '@/api/generic';
import RestaurantService from '@/api/restaurant';
import {captureErrorException} from '@/utils/error-handler';
import DishToast from '@/components/DishToast';
import {fetchMyFavorites, fetchRestaurant} from '@/store/restaurants/thunk';
import {DEFAULT_DISTANCE, ORDER_TYPE} from '@/constants';
import {setSelectedRestaurant} from '@/store/restaurants';
import {isNull} from 'lodash';
import {showSuccessMessage} from '@/components/DishFlashMessage';

// import {SharedElement} from 'react-navigation-shared-element';

export interface RestaurantsProps {
  index: number;
  restaurant: IRestaurant;
  toast?: any;
  dispatch?: any;
  navigation?: any;
  currentLocation: any;
  currentDistance: number;
  homeOrderType: number;
  defaultAddress: IAddress;
}

export const Restaurants = ({
  restaurant,
  index,
  toast,
  dispatch,
  navigation,
  currentLocation,
  currentDistance,
  homeOrderType,
  defaultAddress,
}: RestaurantsProps) => {
  const onPressFavorite = async (
    restaurantId: string,
    isFavourite: boolean,
  ) => {
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
      const response = await RestaurantService.createRestaurantFavorite(
        restaurantId,
        {
          isFavourite: !isFavourite,
        },
      );

      if (response) {
        showSuccessMessage(
          isFavourite ? 'Remove to Favourite' : ' Added to Favourite',
          isFavourite
            ? 'Successfully removed to your favourites!'
            : 'Successfully added to your favourites!',
        );

        if (defaultAddress?.postCode) {
          await dispatch(
            fetchRestaurant({
              ...params,
              PostCode: defaultAddress?.postCode,
            }),
          );
        } else {
          await dispatch(fetchRestaurant(params));
        }

        await dispatch(fetchMyFavorites());
      }
    } catch (error: any) {
      captureErrorException(error);
    }
  };

  return (
    <Box key={`${index}-${restaurant?.restaurantId}`}>
      {/* <SharedElement id={`item.${restaurant?.restaurantId}.bannerImagePath`}> */}
      <RestaurantItem
        item={restaurant}
        onPressFavorite={() =>
          onPressFavorite(restaurant.restaurantId, restaurant.favourite)
        }
        onPressRestaurant={async () => {
          await dispatch(setSelectedRestaurant(restaurant));
          navigation.navigate('DishInfo', {id: restaurant?.restaurantId});
        }}
      />
      {/* </SharedElement> */}
      {/* {index === 4 && <Recommendations />} */}
    </Box>
  );
};
