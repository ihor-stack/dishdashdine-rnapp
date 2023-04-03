import {topPicks} from '@/fixtures/categories';
import {
  ActionReducerMapBuilder,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import {isArray} from 'lodash';
import {RootState} from '..';
import {fetchTaxonomy} from './thunk';
import {taxonomyStateType} from './types';

const initialState: taxonomyStateType = {
  taxonomy: [],
  topPicks: [],
  loadingTaxonomy: false,
};

const {actions, reducer} = createSlice({
  name: 'taxonomy',
  initialState,
  reducers: {
    clearTaxonomy: () => initialState,
  },
  extraReducers: (builder: ActionReducerMapBuilder<taxonomyStateType>) => {
    builder.addCase(fetchTaxonomy.pending, (state: taxonomyStateType) => {
      state.loadingTaxonomy = true;
    });
    builder.addCase(
      fetchTaxonomy.fulfilled,
      (state: taxonomyStateType, {payload}) => {
        state.loadingTaxonomy = false;

        if (isArray(payload.taxonomies)) {
          state.taxonomy = payload.taxonomies as any;
        } else {
          state.topPicks = payload.taxonomies?.$values as any;
        }

        if (isArray(payload.topPicks)) {
          state.topPicks = payload.topPicks as any;
        } else {
          state.topPicks = payload.topPicks?.$values as any;
        }
      },
    );
    builder.addCase(fetchTaxonomy.rejected, (state: taxonomyStateType) => {
      state.loadingTaxonomy = false;
    });
  },
});

export const homeState = (state: RootState) => state.taxonomy;

export const taxonomySelectors = {
  selectTaxonomies: createSelector(homeState, state => state.taxonomy),
  selectTopTaxonomies: createSelector(homeState, state => state.topPicks),
  selectLoadingTaxonomies: createSelector(
    homeState,
    state => state.loadingTaxonomy,
  ),
};

export const {clearTaxonomy} = actions;
export const taxonomyReducer = reducer;
