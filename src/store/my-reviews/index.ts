import {
  ActionReducerMapBuilder,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import {RootState} from '..';
import {fetchMyAppExperience, fetchMyReviews} from './thunk';
import {MyReviewsStateType} from './types';

const initialState: MyReviewsStateType = {
  myReviews: [],
  loadingMyReviews: false,
  appExperiences: [],
  loadingMyAppExperience: false,
};

const {actions, reducer} = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    clearMyReviews: () => initialState,
  },
  extraReducers: (builder: ActionReducerMapBuilder<MyReviewsStateType>) => {
    builder.addCase(fetchMyReviews.pending, (state: MyReviewsStateType) => {
      state.loadingMyReviews = true;
    });
    builder.addCase(
      fetchMyReviews.fulfilled,
      (state: MyReviewsStateType, {payload}) => {
        state.loadingMyReviews = false;
        state.myReviews = payload;
      },
    );
    builder.addCase(fetchMyReviews.rejected, (state: MyReviewsStateType) => {
      state.loadingMyReviews = false;
    });
    builder.addCase(
      fetchMyAppExperience.pending,
      (state: MyReviewsStateType) => {
        state.loadingMyAppExperience = true;
      },
    );
    builder.addCase(
      fetchMyAppExperience.fulfilled,
      (state: MyReviewsStateType, {payload}) => {
        state.loadingMyAppExperience = false;
        state.appExperiences = payload;
      },
    );
    builder.addCase(
      fetchMyAppExperience.rejected,
      (state: MyReviewsStateType) => {
        state.loadingMyAppExperience = false;
      },
    );
  },
});

export const homeState = (state: RootState) => state.reviews;
export const myReviewsSelector = {
  selectMyReview: createSelector(homeState, state => state.myReviews),
  showLoadingReview: createSelector(homeState, state => state.loadingMyReviews),
};

export const {clearMyReviews} = actions;

export const reviewsReducer = reducer;
