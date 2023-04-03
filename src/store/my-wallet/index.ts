import {
  ActionReducerMapBuilder,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import {RootState} from '..';
import {getAllCards, initiateCardCapture} from './thunk';
import {CardState} from './types';

const initialState: CardState = {
  myWallet: [],
  cardCapture: null,
  loadingWallet: false,
};

const {actions, reducer} = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    setDefaultPaymentMethod: (state, {payload}) => {
      state.myWallet = payload;
    },
    clearWallets: () => initialState,
  },
  extraReducers: (builder: ActionReducerMapBuilder<CardState>) => {
    builder.addCase(initiateCardCapture.pending, (state: CardState) => {
      state.loadingWallet = true;
    });
    builder.addCase(
      initiateCardCapture.fulfilled,
      (state: CardState, {payload}) => {
        state.loadingWallet = false;
        state.cardCapture = payload;
      },
    );
    builder.addCase(initiateCardCapture.rejected, (state: CardState) => {
      state.loadingWallet = false;
    });
    builder.addCase(getAllCards.pending, (state: CardState) => {
      state.loadingWallet = true;
    });
    builder.addCase(getAllCards.fulfilled, (state: CardState, {payload}) => {
      state.loadingWallet = false;
      state.myWallet = payload;
    });
    builder.addCase(getAllCards.rejected, (state: CardState) => {
      state.loadingWallet = false;
    });
  },
});

const selectRoot = (state: RootState) => state.cards;
export const cardSelectors = {
  selectMyWallet: createSelector(selectRoot, state => state.myWallet),
  selectCardCapture: createSelector(selectRoot, state => state.cardCapture),
};

export const {setDefaultPaymentMethod, clearWallets} = actions;

export const cardReducer = reducer;
