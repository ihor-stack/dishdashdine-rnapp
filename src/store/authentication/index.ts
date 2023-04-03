import {createSelector, createSlice} from '@reduxjs/toolkit';
import {RootState} from '..';
import {AuthenticationStateType} from './types';

const initialState: AuthenticationStateType = {
  isAuthenticated: false,
};

const {actions, reducer} = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setIsAuthenticated: (state: AuthenticationStateType, {payload}) => {
      state.isAuthenticated = payload;
    },
  },
});

const selectRoot = (state: RootState) => state.authentication;
export const authSelectors = {
  isAuthenticated: createSelector(selectRoot, state => state.isAuthenticated),
};
export const {setIsAuthenticated} = actions;
export const authReducer = reducer;
