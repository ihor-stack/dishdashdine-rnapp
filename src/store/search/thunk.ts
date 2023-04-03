import RestaurantService from '@/api/restaurant';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {SearchResultStateType} from './types';
import {number} from 'yup';

export interface ISearchResultParams {
  SearchQuery?: string;
  AssignedTaxonomy?: string;
  Latitude?: number;
  Longitude?: number;
  RadiusMiles?: number;
  OrderType?: number;
  PostCode?: string;
}

export const fetchSearchResult = createAsyncThunk<
  SearchResultStateType[],
  ISearchResultParams
>('searches/fetchSearchResult', async (params: ISearchResultParams) => {
  const response: SearchResultStateType[] =
    await RestaurantService.getAllRestaurants(params);
  return response;
});
