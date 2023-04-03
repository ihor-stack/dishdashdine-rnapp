import {
  HomeActionTypes,
  HomeStateType,
  SET_SHOW_ADDRESS_FILTER,
  SET_SHOW_DISTANCE_FILTER,
  SET_SHOW_SORT_AND_FILTER,
} from '@/store/home/types';

const initialState: HomeStateType = {
  showAddressFilter: false,
  showDistanceFilter: false,
  showSortAndFilter: false,
  showOrderFilter: false,
};

const reducer = (
  state = initialState,
  action: HomeActionTypes,
): HomeStateType => {
  switch (action.type) {
    case SET_SHOW_ADDRESS_FILTER:
      return {
        ...state,
        showAddressFilter: action.payload.showAddressFilter,
      };
    case SET_SHOW_DISTANCE_FILTER:
      return {
        ...state,
        showDistanceFilter: action.payload.showDistanceFilter,
      };
    case SET_SHOW_SORT_AND_FILTER:
      return {
        ...state,
        showSortAndFilter: action.payload.showSortAndFilter,
      };
    default:
      return state;
  }
};

export default reducer;
