import {
  ActionReducerMapBuilder,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import {RootState} from '..';
import {fetchAddress, getDefaultAddress} from './thunk';
import {AddressStateType} from './types';

const initialState: AddressStateType = {
  myAddress: [],
  loadingAddress: false,
  defaultAddress: null,
};

const {actions, reducer} = createSlice({
  name: 'address',
  initialState,
  reducers: {
    clearAddresses: () => initialState,
  },
  extraReducers: (builder: ActionReducerMapBuilder<AddressStateType>) => {
    builder.addCase(fetchAddress.pending, (state: AddressStateType) => {
      state.loadingAddress = true;
    });
    builder.addCase(
      fetchAddress.fulfilled,
      (state: AddressStateType, {payload}) => {
        state.loadingAddress = false;
        state.myAddress = payload;
      },
    );
    builder.addCase(fetchAddress.rejected, (state: AddressStateType) => {
      state.loadingAddress = false;
    });
    builder.addCase(
      getDefaultAddress.fulfilled,
      (state: AddressStateType, {payload}) => {
        state.defaultAddress = payload;
      },
    );
  },
});

export const homeState = (state: RootState) => state.address;

export const addressSelectors = {
  selectMyAddress: createSelector(homeState, state => state.myAddress),
  selectDefaultAddress: createSelector(
    homeState,
    state => state.defaultAddress,
  ),
};

export const {clearAddresses} = actions;

export const addressReducer = reducer;
