import {
  ActionReducerMapBuilder,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import {RootState} from '..';
import {HomeStateType} from './types';
import {ORDER_TYPE} from '@/constants';
import {fetchAppPromo} from './thunk';

const initialState: HomeStateType = {
  showAddressFilter: false,
  showDistanceFilter: false,
  showSortAndFilter: false,
  showOrderFilter: false,
  OrderType: ORDER_TYPE.COLLECTION,
  appPromo: [],
  loadingAppPromo: false,
};

const {actions, reducer} = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setShowAddressFilter: (state: HomeStateType) => {
      state.showAddressFilter = !state.showAddressFilter;
    },
    setShowDistanceFilter: (state: HomeStateType) => {
      state.showDistanceFilter = !state.showDistanceFilter;
    },
    setShowSortAndFilter: (state: HomeStateType) => {
      state.showSortAndFilter = !state.showSortAndFilter;
    },
    setShowOrderFilter: (state: HomeStateType) => {
      state.showOrderFilter = !state.showOrderFilter;
    },
    setHomeOrderType: (state: HomeStateType, {payload}) => {
      state.OrderType = payload;
    },
    resetHomeState: () => initialState,
    closeShowOrderFilter: (state: HomeStateType) => {
      state.showOrderFilter = false;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<HomeStateType>) => {
    builder.addCase(fetchAppPromo.pending, (state: HomeStateType) => {
      state.loadingAppPromo = true;
    });
    builder.addCase(
      fetchAppPromo.fulfilled,
      (state: HomeStateType, {payload}) => {
        state.loadingAppPromo = false;
        state.appPromo = payload;
      },
    );
    builder.addCase(fetchAppPromo.rejected, (state: HomeStateType) => {
      state.loadingAppPromo = false;
    });
  },
});

export const selectHomeState = (state: RootState) => state.home;
export const homeSelectors = {
  showAddressFilter: createSelector(
    selectHomeState,
    state => state.showAddressFilter,
  ),
  showDistanceFilter: createSelector(
    selectHomeState,
    state => state.showDistanceFilter,
  ),
  showSortAndFilter: createSelector(
    selectHomeState,
    state => state.showSortAndFilter,
  ),
  showOrderFilter: createSelector(
    selectHomeState,
    state => state.showOrderFilter,
  ),
  showOrderType: createSelector(selectHomeState, state => state.OrderType),
  selectAppPromo: createSelector(selectHomeState, state => state.appPromo),
  showLoadingAppPromo: createSelector(
    selectHomeState,
    state => state.loadingAppPromo,
  ),
};
export const {
  setShowAddressFilter,
  setShowDistanceFilter,
  setShowSortAndFilter,
  setShowOrderFilter,
  resetHomeState,
  setHomeOrderType,
  closeShowOrderFilter,
} = actions;
export const homeReducer = reducer;
