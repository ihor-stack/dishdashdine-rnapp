import {createSelector, createSlice} from '@reduxjs/toolkit';
import {RootState} from '..';
import {CartItemStateType} from './types';

const initialState: CartItemStateType = {
  myCart: [],
};

const {actions, reducer} = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, {payload}) => {
      const newData = [...state.myCart];
      newData.push(payload);
      state.myCart = newData;
    },
  },
});

const selectRoot = (state: RootState) => state.cart;
export const cartSelectors = {
  selectMyCart: createSelector(selectRoot, state => state.myCart),
};

export const {addToCart} = actions;
export const cartReducer = reducer;
