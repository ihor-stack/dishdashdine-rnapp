import {IAppPromo} from '@/api/generic';

export const SET_SHOW_ADDRESS_FILTER = 'SET_SHOW_ADDRESS_FILTER';
export const SET_SHOW_DISTANCE_FILTER = 'SET_SHOW_DISTANCE_FILTER';
export const SET_SHOW_SORT_AND_FILTER = 'SET_SHOW_SORT_AND_FILTER';

export type HomeStateType = {
  showAddressFilter: boolean;
  showDistanceFilter: boolean;
  showSortAndFilter: boolean;
  showOrderFilter: boolean;
  OrderType: number;
  appPromo: IAppPromo[];
  loadingAppPromo: boolean;
};

export type SetShowAddressFilterType = {
  type: typeof SET_SHOW_ADDRESS_FILTER;
  payload: {
    showAddressFilter: boolean;
  };
};

export type SetShowDistanceFilterType = {
  type: typeof SET_SHOW_DISTANCE_FILTER;
  payload: {
    showDistanceFilter: boolean;
  };
};

export type SetShowSortAndFilterType = {
  type: typeof SET_SHOW_SORT_AND_FILTER;
  payload: {
    showSortAndFilter: boolean;
  };
};

export type HomeActionTypes =
  | SetShowAddressFilterType
  | SetShowDistanceFilterType
  | SetShowSortAndFilterType;
