import {RootState} from '@/store';
import {
  ActionReducerMapBuilder,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import {
  fetchAllRestaurants,
  fetchBasicInformation,
  fetchMenuItemDetail,
  fetchOpeningHours,
  fetchPreparationTimes,
  fetchRestaurantCategories,
  fetchRestaurantDelivery,
  fetchRestaurantMenus,
  fetchRestaurantModifiers,
  getAllRestaurantActiveOrders,
  getAllRestaurantCancelledOrders,
  getAllRestaurantCompletedOrders,
  getAllRestaurantOrders,
  getAllRestaurantPendingOrders,
} from './thunk';
import {RestaurantAdminStateType} from './types';

const initialState: RestaurantAdminStateType = {
  restaurants: [],
  loadingRestaurants: false,
  restaurant: null,
  restaurantOrderType: null,
  loadingRestaurant: false,
  openingHours: [],
  loadingHours: false,
  preparationTimes: [],
  loadingPrepTimes: false,
  menus: [],
  loadingMenus: false,
  categories: [],
  loadingCategories: false,
  modifiers: [],
  loadingModifiers: false,
  item: [],
  loadingItem: false,
  loadingOrders: false,
  loadingPendingOrders: false,
  loadingActiveOrders: false,
  loadingCompletedOrders: false,
  loadingCancelledOrders: false,
};

const {actions, reducer} = createSlice({
  name: 'admin_restaurant',
  initialState,
  reducers: {
    setSelectedRestaurant: (state: RestaurantAdminStateType, {payload}) => {
      state.restaurant = {
        ...payload,
      };
    },
    clearSelectedRestaurant: (state: RestaurantAdminStateType) => {
      state.restaurant = null;
    },
  },
  extraReducers: (
    builder: ActionReducerMapBuilder<RestaurantAdminStateType>,
  ) => {
    builder.addCase(
      fetchAllRestaurants.pending,
      (state: RestaurantAdminStateType) => {
        state.loadingRestaurants = true;
      },
    );
    builder.addCase(
      fetchAllRestaurants.fulfilled,
      (state: RestaurantAdminStateType, {payload}) => {
        state.loadingRestaurants = false;
        state.restaurants = payload as any;
      },
    );
    builder.addCase(
      fetchAllRestaurants.rejected,
      (state: RestaurantAdminStateType) => {
        state.loadingRestaurants = false;
      },
    );
    builder.addCase(
      fetchBasicInformation.pending,
      (state: RestaurantAdminStateType) => {
        state.loadingRestaurant = true;
      },
    );
    builder.addCase(
      fetchBasicInformation.fulfilled,
      (state: RestaurantAdminStateType, {payload}) => {
        state.loadingRestaurant = false;
        state.restaurant = {
          ...state.restaurant,
          ...payload,
        };
      },
    );
    builder.addCase(
      fetchBasicInformation.rejected,
      (state: RestaurantAdminStateType) => {
        state.loadingRestaurant = false;
      },
    );
    builder.addCase(
      fetchOpeningHours.pending,
      (state: RestaurantAdminStateType) => {
        state.loadingHours = true;
        state.loadingRestaurant = true;
      },
    );
    builder.addCase(
      fetchOpeningHours.fulfilled,
      (state: RestaurantAdminStateType, {payload}) => {
        state.loadingRestaurant = false;
        state.loadingRestaurant = false;
        state.restaurant = {
          ...state.restaurant,
          openingHours: payload,
        };
      },
    );
    builder.addCase(
      fetchOpeningHours.rejected,
      (state: RestaurantAdminStateType) => {
        state.loadingHours = false;
        state.loadingRestaurant = false;
      },
    );
    builder.addCase(
      fetchPreparationTimes.pending,
      (state: RestaurantAdminStateType) => {
        state.loadingPrepTimes = true;
        state.loadingRestaurant = true;
      },
    );
    builder.addCase(
      fetchPreparationTimes.fulfilled,
      (state: RestaurantAdminStateType, {payload}) => {
        state.loadingPrepTimes = false;
        state.loadingRestaurant = false;
        state.restaurant = {
          ...state.restaurant,
          preparationTimes: payload,
        };
      },
    );
    builder.addCase(
      fetchPreparationTimes.rejected,
      (state: RestaurantAdminStateType) => {
        state.loadingPrepTimes = false;
        state.loadingRestaurant = false;
      },
    );
    builder.addCase(
      fetchRestaurantMenus.pending,
      (state: RestaurantAdminStateType) => {
        state.loadingMenus = true;
        state.loadingRestaurant = true;
      },
    );
    builder.addCase(
      fetchRestaurantMenus.fulfilled,
      (state: RestaurantAdminStateType, {payload}) => {
        state.loadingMenus = false;
        state.loadingRestaurant = false;
        state.restaurant = {
          ...state.restaurant,
          menus: payload,
        };
      },
    );
    builder.addCase(
      fetchRestaurantMenus.rejected,
      (state: RestaurantAdminStateType) => {
        state.loadingMenus = false;
        state.loadingRestaurant = false;
      },
    );
    builder.addCase(
      fetchRestaurantCategories.pending,
      (state: RestaurantAdminStateType) => {
        state.loadingCategories = true;
        state.loadingRestaurant = true;
      },
    );
    builder.addCase(
      fetchRestaurantCategories.fulfilled,
      (state: RestaurantAdminStateType, {payload}) => {
        state.loadingCategories = false;
        state.loadingRestaurant = false;
        state.restaurant = {
          ...state.restaurant,
          categories: payload,
        };
      },
    );
    builder.addCase(
      fetchRestaurantCategories.rejected,
      (state: RestaurantAdminStateType) => {
        state.loadingCategories = false;
        state.loadingRestaurant = false;
      },
    );
    builder.addCase(
      fetchRestaurantModifiers.pending,
      (state: RestaurantAdminStateType) => {
        state.loadingModifiers = true;
        state.loadingRestaurant = true;
      },
    );
    builder.addCase(
      fetchRestaurantModifiers.fulfilled,
      (state: RestaurantAdminStateType, {payload}) => {
        state.loadingModifiers = false;
        state.loadingRestaurant = false;
        state.restaurant = {
          ...state.restaurant,
          modifiers: payload,
        };
      },
    );
    builder.addCase(
      fetchRestaurantModifiers.rejected,
      (state: RestaurantAdminStateType) => {
        state.loadingModifiers = false;
        state.loadingRestaurant = false;
      },
    );
    builder.addCase(
      fetchMenuItemDetail.pending,
      (state: RestaurantAdminStateType) => {
        state.loadingItem = true;
      },
    );
    builder.addCase(
      fetchMenuItemDetail.fulfilled,
      (state: RestaurantAdminStateType, {payload}) => {
        state.loadingItem = false;
        state.restaurant = {
          ...state.restaurant,
          item: payload,
        };
      },
    );
    builder.addCase(
      fetchMenuItemDetail.rejected,
      (state: RestaurantAdminStateType) => {
        state.loadingItem = false;
      },
    );

    // getAllRestaurantOrders
    builder.addCase(
      getAllRestaurantOrders.pending,
      (state: RestaurantAdminStateType) => {
        state.loadingRestaurant = true;
        state.loadingOrders = true;
      },
    );
    builder.addCase(
      getAllRestaurantOrders.fulfilled,
      (state: RestaurantAdminStateType, {payload}) => {
        state.loadingRestaurant = false;
        state.loadingOrders = false;
        state.restaurant = {
          ...state.restaurant,
          orders: payload,
        };
      },
    );
    builder.addCase(
      getAllRestaurantOrders.rejected,
      (state: RestaurantAdminStateType) => {
        state.loadingRestaurant = false;
        state.loadingOrders = false;
      },
    );
    // getAllRestaurantOrders

    builder.addCase(
      getAllRestaurantPendingOrders.pending,
      (state: RestaurantAdminStateType) => {
        state.loadingRestaurant = true;
        state.loadingPendingOrders = true;
      },
    );
    builder.addCase(
      getAllRestaurantPendingOrders.fulfilled,
      (state: RestaurantAdminStateType, {payload}) => {
        state.loadingRestaurant = false;
        state.loadingPendingOrders = false;
        state.restaurant = {
          ...state.restaurant,
          pendingOrders: payload,
        };
      },
    );
    builder.addCase(
      getAllRestaurantPendingOrders.rejected,
      (state: RestaurantAdminStateType) => {
        state.loadingRestaurant = false;
        state.loadingPendingOrders = false;
      },
    );

    builder.addCase(
      getAllRestaurantActiveOrders.pending,
      (state: RestaurantAdminStateType) => {
        state.loadingRestaurant = true;
        state.loadingActiveOrders = true;
      },
    );
    builder.addCase(
      getAllRestaurantActiveOrders.fulfilled,
      (state: RestaurantAdminStateType, {payload}) => {
        state.loadingRestaurant = false;
        state.loadingActiveOrders = false;
        state.restaurant = {
          ...state.restaurant,
          activeOrders: payload,
        };
      },
    );
    builder.addCase(
      getAllRestaurantActiveOrders.rejected,
      (state: RestaurantAdminStateType) => {
        state.loadingRestaurant = false;
        state.loadingActiveOrders = false;
      },
    );

    builder.addCase(
      getAllRestaurantCompletedOrders.pending,
      (state: RestaurantAdminStateType) => {
        state.loadingRestaurant = true;
        state.loadingCompletedOrders = true;
      },
    );
    builder.addCase(
      getAllRestaurantCompletedOrders.fulfilled,
      (state: RestaurantAdminStateType, {payload}) => {
        state.loadingRestaurant = false;
        state.loadingCompletedOrders = false;
        state.restaurant = {
          ...state.restaurant,
          completedOrders: payload,
        };
      },
    );
    builder.addCase(
      getAllRestaurantCompletedOrders.rejected,
      (state: RestaurantAdminStateType) => {
        state.loadingRestaurant = false;
        state.loadingCompletedOrders = false;
      },
    );

    builder.addCase(
      getAllRestaurantCancelledOrders.pending,
      (state: RestaurantAdminStateType) => {
        state.loadingRestaurant = true;
        state.loadingCancelledOrders = true;
      },
    );
    builder.addCase(
      getAllRestaurantCancelledOrders.fulfilled,
      (state: RestaurantAdminStateType, {payload}) => {
        state.loadingRestaurant = false;
        state.loadingCancelledOrders = false;
        state.restaurant = {
          ...state.restaurant,
          cancelledOrders: payload,
        };
      },
    );
    builder.addCase(
      getAllRestaurantCancelledOrders.rejected,
      (state: RestaurantAdminStateType) => {
        state.loadingRestaurant = false;
        state.loadingCancelledOrders = false;
      },
    );
    builder.addCase(
      fetchRestaurantDelivery.pending,
      (state: RestaurantAdminStateType) => {
        state.loadingDeliveries = true;
        state.loadingRestaurant = true;
      },
    );
    builder.addCase(
      fetchRestaurantDelivery.fulfilled,
      (state: RestaurantAdminStateType, {payload}) => {
        state.loadingDeliveries = false;
        state.loadingRestaurant = false;
        state.deliveries = payload;
        state.restaurant = {
          ...state.restaurant,
          deliveries: payload,
        };
      },
    );
    builder.addCase(
      fetchRestaurantDelivery.rejected,
      (state: RestaurantAdminStateType) => {
        state.loadingDeliveries = false;
        state.loadingRestaurant = false;
      },
    );
  },
});

export const homeState = (state: RootState) => state.admin_restaurant;
export const adminRestaurantSelectors = {
  selectRestaurants: createSelector(homeState, state => state.restaurants),
  selectRestaurant: createSelector(homeState, state => state.restaurant),
  selectMenuItemDetail: createSelector(homeState, state => state.item),
  showLoadingRestaurants: createSelector(
    homeState,
    state => state.loadingRestaurants,
  ),
  showLoadingData: createSelector(homeState, state => state.loadingRestaurant),
  showLoadingItem: createSelector(homeState, state => state.loadingItem),

  selectOrders: createSelector(homeState, state => state.restaurant.orders),
  showLoadingOrders: createSelector(homeState, state => state.loadingOrders),

  selectPendingOrders: createSelector(
    homeState,
    state => state.restaurant.pendingOrders,
  ),
  loadingPendingOrders: createSelector(
    homeState,
    state => state.loadingPendingOrders,
  ),

  selectActiveOrders: createSelector(
    homeState,
    state => state.restaurant.activeOrders,
  ),
  loadingActiveOrders: createSelector(
    homeState,
    state => state.loadingActiveOrders,
  ),

  selectCompletedOrders: createSelector(
    homeState,
    state => state.restaurant.completedOrders,
  ),
  loadingCompletedOrders: createSelector(
    homeState,
    state => state.loadingCompletedOrders,
  ),

  selectCancelledOrders: createSelector(
    homeState,
    state => state.restaurant.cancelledOrders,
  ),
  loadingCancelledOrders: createSelector(
    homeState,
    state => state.loadingCancelledOrders,
  ),
};

export const {setSelectedRestaurant, clearSelectedRestaurant} = actions;

export const adminRestaurantReducer = reducer;
