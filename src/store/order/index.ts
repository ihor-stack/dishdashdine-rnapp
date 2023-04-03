import {
  ActionReducerMapBuilder,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import {RootState} from '..';
import {
  fetchActiveOrder,
  fetchCompletedOrder,
  fetchOrder,
  fetchOrderRestaurant,
  fetchUnpaidOrder,
} from './thunk';
import {OrdersStateType} from './types';
import {filter} from 'lodash';

const initialState: OrdersStateType = {
  myOrder: [],
  myActiveOrders: [],
  myUnpaidOrders: [],
  initiateOrder: false,
  selectedOrder: null,
  loadingMyOrder: false,
  loadingSelectedOrder: false,
  loadingCompletedOrders: false,
};

const {actions, reducer} = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearMyOrders: () => initialState,
  },
  extraReducers: (builder: ActionReducerMapBuilder<OrdersStateType>) => {
    builder.addCase(fetchOrder.pending, (state: OrdersStateType) => {
      state.loadingMyOrder = true;
    });
    builder.addCase(
      fetchOrder.fulfilled,
      (state: OrdersStateType, {payload}) => {
        state.loadingMyOrder = false;
        state.myOrder = payload;
      },
    );
    builder.addCase(fetchOrder.rejected, (state: OrdersStateType) => {
      state.loadingMyOrder = false;
    });

    builder.addCase(
      fetchActiveOrder.fulfilled,
      (state: OrdersStateType, {payload}) => {
        state.loadingMyOrder = false;
        state.myActiveOrders = payload;
      },
    );

    builder.addCase(
      fetchUnpaidOrder.fulfilled,
      (state: OrdersStateType, {payload}) => {
        state.loadingMyOrder = false;
        state.myUnpaidOrders = payload;
      },
    );

    builder.addCase(fetchCompletedOrder.pending, (state: OrdersStateType) => {
      state.loadingCompletedOrders = true;
    });
    builder.addCase(
      fetchCompletedOrder.fulfilled,
      (state: OrdersStateType, {payload}) => {
        state.loadingCompletedOrders = false;
        state.myCompletedOrders = payload;
      },
    );
    builder.addCase(fetchCompletedOrder.rejected, (state: OrdersStateType) => {
      state.loadingCompletedOrders = false;
    });

    builder.addCase(fetchOrderRestaurant.pending, (state: OrdersStateType) => {
      state.loadingSelectedOrder = true;
    });
    builder.addCase(
      fetchOrderRestaurant.fulfilled,
      (state: OrdersStateType, {payload}) => {
        state.loadingSelectedOrder = false;
        state.selectedOrder = {
          ...payload,
        };
      },
    );
    builder.addCase(fetchOrderRestaurant.rejected, (state: OrdersStateType) => {
      state.loadingSelectedOrder = false;
    });
  },
});

const selectRoot = (state: RootState) => state.order;
export const orderSelectors = {
  selectActiveOrder: createSelector(selectRoot, state => state.myActiveOrders),
  selectMyOrder: createSelector(selectRoot, state =>
    filter(
      state.myOrder,
      order =>
        order.orderStatus === 2 &&
        order.orderStatus === 3 &&
        order.orderStatus === 4 &&
        order.orderStatus === 5,
    ),
  ),
  selectUnpaidOrder: createSelector(selectRoot, state => state.myUnpaidOrders),
  selectCompletedOrder: createSelector(
    selectRoot,
    state => state.myCompletedOrders,
  ),
  loadingOrders: createSelector(selectRoot, state => state.loadingMyOrder),
  // selectMyOrder: createSelector(selectRoot, state => state.myOrder),
  selectSelectedOrder: createSelector(selectRoot, state => state.selectedOrder),
  // selectSelectedOrder: createSelector(selectRoot, state => state.selectedOrder),
  loadingSelectedOrder: createSelector(
    selectRoot,
    state => state.loadingSelectedOrder,
  ),
};

export const {clearMyOrders} = actions;

export const orderReducer = reducer;
