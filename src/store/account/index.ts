import {DEFAULT_DISTANCE} from '@/constants';
import {
  ActionReducerMapBuilder,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import {RootState} from '..';
import {fetchCurrentUser, getUserCurrentAddress, updateUser} from './thunk';
import {AccountStateType} from './types';

const initialState: AccountStateType = {
  showAddCardSuccess: false,
  currentUser: null,
  loadingCurrentUser: false,
  isUpdatingUser: false,
  currentUserCoordinate: null,
  currentUserAddress: null,
  isLoadingCurrentUserAddress: false,
  currentUserDistance: DEFAULT_DISTANCE,
  deviceToken: '',
  willUpdate: true
};

const {actions, reducer} = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setWillUpdate: (state: AccountStateType, {payload}) => {
      state.willUpdate = payload;
    },
    setShowAddCardSuccess: (state: AccountStateType, {payload}) => {
      state.showAddCardSuccess = payload;
    },
    setCurrentUserLocation: (state: AccountStateType, {payload}) => {
      state.currentUserCoordinate = {
        ...payload,
      };
    },
    setCurrentUserDistance: (state: AccountStateType, {payload}) => {
      state.currentUserDistance = payload;
    },
    setCurrentUserAddress: (state: AccountStateType, {payload}) => {
      state.currentUserAddress = payload;
    },
    setDevicePushToken: (state: AccountStateType, {payload}) => {
      state.deviceToken = payload;
    },
    clearAccountStore: () => initialState,
    setNoAuthUser: (state: AccountStateType, {payload}) => {
      state.currentUser = {
        ...payload,
        noAuth: true,
        primaryUserRole: 'User',
      };
      state.deviceToken = null;
    },
    clearCurrentUser: (state: AccountStateType) => {
      state.currentUser = null;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<AccountStateType>) => {
    builder.addCase(fetchCurrentUser.pending, (state: AccountStateType) => {
      state.loadingCurrentUser = true;
    });
    builder.addCase(
      fetchCurrentUser.fulfilled,
      (state: AccountStateType, {payload}) => {
        state.loadingCurrentUser = false;
        state.currentUser = {
          ...payload,
          noAuth: false,
        };
      },
    );
    builder.addCase(fetchCurrentUser.rejected, (state: AccountStateType) => {
      state.loadingCurrentUser = false;
    });
    builder.addCase(updateUser.pending, (state: AccountStateType) => {
      state.isUpdatingUser = true;
    });
    builder.addCase(
      updateUser.fulfilled,
      (state: AccountStateType, {payload}) => {
        state.isUpdatingUser = false;
        state.currentUser = payload;
      },
    );
    builder.addCase(updateUser.rejected, (state: AccountStateType) => {
      state.isUpdatingUser = false;
    });
    builder.addCase(
      getUserCurrentAddress.pending,
      (state: AccountStateType) => {
        state.isLoadingCurrentUserAddress = true;
      },
    );
    builder.addCase(
      getUserCurrentAddress.fulfilled,
      (state: AccountStateType, {payload}) => {
        state.isLoadingCurrentUserAddress = false;
        state.currentUserAddress = payload.formattedAddress;
      },
    );
    builder.addCase(
      getUserCurrentAddress.rejected,
      (state: AccountStateType) => {
        state.isLoadingCurrentUserAddress = false;
      },
    );
  },
});

const selectRoot = (state: RootState) => state.accounts;
export const accountSelectors = {
  showAddCardSuccess: createSelector(
    selectRoot,
    state => state.showAddCardSuccess,
  ),
  willUpdate: createSelector(selectRoot, state => state.willUpdate),
  selectCurrentUser: createSelector(selectRoot, state => state.currentUser),
  selectCurrentUserLocation: createSelector(
    selectRoot,
    state => state?.currentUserCoordinate,
  ),
  selectCurrentUserAddress: createSelector(
    selectRoot,
    state => state?.currentUserAddress,
  ),
  selectCurrentUserRadius: createSelector(
    selectRoot,
    state => state?.currentUserDistance,
  ),
  selectDevicePushToken: createSelector(
    selectRoot,
    state => state?.deviceToken,
  ),
};
export const {
  setShowAddCardSuccess,
  setCurrentUserLocation,
  setCurrentUserDistance,
  clearAccountStore,
  setCurrentUserAddress,
  setDevicePushToken,
  setNoAuthUser,
  clearCurrentUser,
  setWillUpdate
} = actions;
export const accountReducer = reducer;
