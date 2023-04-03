import {
  ActionReducerMapBuilder,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import {uniq} from 'lodash';
import {RootState} from '..';
import {fetchSearchResult} from './thunk';
import {SearchResultStateType} from './types';

const initialState: SearchResultStateType = {
  searchResult: [],
  loadingSearchResult: false,
  recentSearch: [],
};

const {actions, reducer} = createSlice({
  name: 'searches',
  initialState,
  reducers: {
    setRecentSearch: (state: SearchResultStateType, {payload}) => {
      const newData: any[] = [...state.recentSearch];
      newData.push(payload);
      state.recentSearch = uniq(newData);
    },
    clearRecentSearch: (state: SearchResultStateType) => {
      state.recentSearch = [];
    },
    clearSearchResult: (state: SearchResultStateType) => {
      state.searchResult = [];
    },
    clearSearchState: () => initialState,
  },
  extraReducers: (builder: ActionReducerMapBuilder<SearchResultStateType>) => {
    builder.addCase(
      fetchSearchResult.pending,
      (state: SearchResultStateType) => {
        state.loadingSearchResult = true;
      },
    );
    builder.addCase(
      fetchSearchResult.fulfilled,
      (state: SearchResultStateType, {payload}) => {
        state.loadingSearchResult = false;
        state.searchResult = payload as any;
      },
    );
    builder.addCase(
      fetchSearchResult.rejected,
      (state: SearchResultStateType) => {
        state.loadingSearchResult = false;
      },
    );
  },
});

export const homeState = (state: RootState) => state.searches;
export const searchSelectors = {
  selectRecentSearch: createSelector(homeState, state => state.recentSearch),
  selectSearchResult: createSelector(homeState, state => state.searchResult),
  showLoadingSearch: createSelector(
    homeState,
    state => state.loadingSearchResult,
  ),
};

export const {
  setRecentSearch,
  clearRecentSearch,
  clearSearchResult,
  clearSearchState,
} = actions;

export const searchReducer = reducer;
