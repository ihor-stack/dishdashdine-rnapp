import {
  SET_SHOW_ADDRESS_FILTER,
  SET_SHOW_DISTANCE_FILTER,
  SET_SHOW_SORT_AND_FILTER,
  SetShowAddressFilterType,
  SetShowDistanceFilterType,
  SetShowSortAndFilterType,
} from '@/store/home/types';

export const setShowAddressFilter = (
  showAddressFilter: boolean,
): SetShowAddressFilterType => ({
  type: SET_SHOW_ADDRESS_FILTER,
  payload: {showAddressFilter},
});

export const setShowDistanceFilter = (
  showDistanceFilter: boolean,
): SetShowDistanceFilterType => ({
  type: SET_SHOW_DISTANCE_FILTER,
  payload: {showDistanceFilter},
});

export const setShowSortAndFilter = (
  showSortAndFilter: boolean,
): SetShowSortAndFilterType => ({
  type: SET_SHOW_SORT_AND_FILTER,
  payload: {showSortAndFilter},
});
