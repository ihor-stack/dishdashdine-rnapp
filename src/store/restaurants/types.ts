import {
  IEventCatering,
  IFindRestaurantParams,
  IRestaurant,
} from '@/api/generic';

export type RestaurantStateType = {
  restaurants: IRestaurant[];
  loadingRestaurant: boolean;
  restaurant: IRestaurant | any | null;
  loadingResto: boolean;
  favorites: IFindRestaurantParams[] | any;
  loadingFavorites: boolean;
  eventCatering: IEventCatering | any | null;
};
