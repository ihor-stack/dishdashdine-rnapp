import {
  ActionReducerMapBuilder,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import {RootState} from '..';
import {
  fetchMyFavorites,
  fetchRestaurant,
  getRestaurant,
  getRestaurantMenus,
  getRestaurantPopularMenus,
} from './thunk';
import {RestaurantStateType} from './types';

const initialState: RestaurantStateType = {
  restaurants: [],
  loadingRestaurant: false,
  restaurant: null,
  loadingResto: false,
  favorites: [],
  loadingFavorites: false,
};

const {actions, reducer} = createSlice({
  name: 'restaurant',
  initialState,
  reducers: {
    addOrderToRestaurant: (state: RestaurantStateType, {payload}) => {
      state.restaurant = {
        ...state.restaurant,
        order: {
          ...state.restaurant.order,
        },
      };
    },
    setSelectedRestaurant: (state: RestaurantStateType, {payload}) => {
      state.restaurant = {
        ...payload,
      };
    },
    clearRestaurants: () => initialState,
  },
  extraReducers: (builder: ActionReducerMapBuilder<RestaurantStateType>) => {
    builder.addCase(fetchRestaurant.pending, (state: RestaurantStateType) => {
      state.loadingRestaurant = true;
    });
    builder.addCase(
      fetchRestaurant.fulfilled,
      (state: RestaurantStateType, {payload}) => {
        state.loadingRestaurant = false;
        state.restaurants = payload as any;
      },
    );
    builder.addCase(fetchRestaurant.rejected, (state: RestaurantStateType) => {
      state.loadingRestaurant = false;
    });

    builder.addCase(getRestaurant.pending, (state: RestaurantStateType) => {
      state.loadingResto = true;
    });
    builder.addCase(
      getRestaurant.fulfilled,
      (state: RestaurantStateType, {payload}) => {
        state.loadingResto = false;
        state.restaurant = {
          ...payload[0],
          activeMenu: null,
          popularMenus: [],
        };
      },
    );
    builder.addCase(getRestaurant.rejected, (state: RestaurantStateType) => {
      state.loadingResto = false;
    });

    builder.addCase(
      getRestaurantMenus.pending,
      (state: RestaurantStateType) => {
        state.loadingResto = true;
      },
    );
    builder.addCase(
      getRestaurantMenus.fulfilled,
      (state: RestaurantStateType, {payload}) => {
        state.loadingResto = false;
        state.restaurant = {
          ...state.restaurant,
          menus: payload.menus,
          activeMenu: payload.activeMenu,
        };
      },
    );
    builder.addCase(
      getRestaurantMenus.rejected,
      (state: RestaurantStateType) => {
        state.loadingResto = false;
      },
    );

    builder.addCase(
      getRestaurantPopularMenus.pending,
      (state: RestaurantStateType) => {
        state.loadingResto = true;
      },
    );
    builder.addCase(
      getRestaurantPopularMenus.fulfilled,
      (state: RestaurantStateType, {payload}) => {
        state.loadingResto = false;
        state.restaurant = {
          ...state.restaurant,
          popularMenus: payload,
        };
      },
    );
    builder.addCase(
      getRestaurantPopularMenus.rejected,
      (state: RestaurantStateType) => {
        state.loadingResto = false;
      },
    );

    builder.addCase(fetchMyFavorites.pending, (state: RestaurantStateType) => {
      state.loadingFavorites = true;
    });
    builder.addCase(
      fetchMyFavorites.fulfilled,
      (state: RestaurantStateType, {payload}) => {
        state.loadingFavorites = false;
        state.favorites = payload as any;
      },
    );
    builder.addCase(fetchMyFavorites.rejected, (state: RestaurantStateType) => {
      state.loadingFavorites = false;
    });
  },
});

export const homeState = (state: RootState) => state.restaurant;
export const restaurantSelectors = {
  selectRestaurants: createSelector(homeState, state => state.restaurants),
  showLoadingRestaurant: createSelector(
    homeState,
    state => state.loadingRestaurant,
  ),
  selectRestaurant: createSelector(homeState, state => state.restaurant),
  selectRestaurantMenu: createSelector(
    homeState,
    state => state.restaurant?.activeMenu,
  ),
  showLoadingResto: createSelector(homeState, state => state.loadingResto),
  selectMyFavorites: createSelector(homeState, state => state.favorites),
  showLoadingFavorites: createSelector(
    homeState,
    state => state.loadingFavorites,
  ),
  selectPopularMenus: createSelector(
    homeState,
    state => state.restaurant.popularMenus,
  ),
};

export const {clearRestaurants, addOrderToRestaurant, setSelectedRestaurant} =
  actions;
export const restaurantReducer = reducer;
