import {IFindRestaurantParams} from '@/api/generic';
import RestaurantService from '@/api/restaurant';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {isArray} from 'lodash';

export const fetchRestaurant = createAsyncThunk<any, IFindRestaurantParams>(
  'restaurant/getAllRestaurants',
  async (params: IFindRestaurantParams) => {
    const response: any = await RestaurantService.getAllRestaurants(params);
    if (!isArray(response) && response?.$values) {
      return response.$values;
    } else {
      return response;
    }
  },
);

export const getRestaurant = createAsyncThunk(
  'restaurant/getRestaurant',
  async (id: string) => {
    const response: any = await RestaurantService.getAllRestaurants({
      RestaurantId: id,
    });
    if (!isArray(response) && response?.$values) {
      return response.$values;
    } else {
      return response;
    }
  },
);

export const getRestaurantMenus = createAsyncThunk(
  'restaurant/getRestaurantMenus',
  async (id: string) => {
    const response: any = await RestaurantService.getRestaurantMenus(id);
    if (!isArray(response) && response?.$values) {
      return response.$values;
    } else {
      return response;
    }
  },
);

export const getRestaurantPopularMenus = createAsyncThunk(
  'restaurant/getRestaurantPopularMenus',
  async (params: { id: string; menuId: string }) => {
    const response: any = await RestaurantService.getRestaurantPopularMenus(
      params.id,
      params.menuId,
    );
    if (!isArray(response) && response?.$values) {
      return response.$values;
    } else {
      return response;
    }
  },
);

export const fetchMyFavorites = createAsyncThunk<any>(
  'restaurant/getMyFavorites',
  async () => {
    const response: any = await RestaurantService.getAllRestaurants({
      FavouritesOnly: true,
    });
    if (!isArray(response) && response?.$values) {
      return response.$values;
    } else {
      return response;
    }
  },
);
