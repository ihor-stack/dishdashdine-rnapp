import {IAdminCategories, IAdminMenus} from '@/api/admin_restaurant/model';
import OrderAdminService from '@/api/admin_restaurant/order';
import RestaurantService from '@/api/admin_restaurant/restaurant';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {isArray, size} from 'lodash';

export const fetchAllRestaurants = createAsyncThunk(
  'admin/getAllRestaurants',
  async () => {
    const response: any = await RestaurantService.getAllRestaurants();
    if (!isArray(response) && response?.$values) {
      return response.$values;
    } else {
      return response;
    }
  },
);

export const fetchBasicInformation = createAsyncThunk(
  'admin/getBasicInformation',
  async (id: string) => {
    const response: any = await RestaurantService.getBasicInformation(id);
    if (!isArray(response) && response?.$values) {
      return response.$values;
    } else {
      return response;
    }
  },
);

export const fetchOpeningHours = createAsyncThunk(
  'admin/getOpeningHours',
  async (id: string) => {
    const response: any = await RestaurantService.getOpeningHours(id);
    if (!isArray(response) && response?.$values) {
      return response.$values;
    } else {
      return response;
    }
  },
);

export const fetchPreparationTimes = createAsyncThunk(
  'admin/getPreparationTimes',
  async (id: string) => {
    const response: any = await RestaurantService.getPreparationTimes(id);
    if (!isArray(response) && response?.$values) {
      return response.$values;
    } else {
      return response;
    }
  },
);

export const fetchRestaurantMenus = createAsyncThunk(
  'admin/getRestaurantMenus',
  async (id: string) => {
    const response: any = await RestaurantService.getRestaurantMenus(id);
    if (response) {
      let newData: IAdminMenus[] = [];
      for (let i = 0; i < size(response); i++) {
        const menuId = response[i].menuId;
        const menuItem: any = await RestaurantService.getRestaurantMenu(
          id,
          menuId,
        );
        newData.push({
          ...response[i],
          ...menuItem,
        });
      }
      return newData;
    } else {
      return [];
    }
  },
);

export const fetchRestaurantMenu = createAsyncThunk(
  'admin/getRestaurantMenu',
  async (params: {id: string; menuId: string}) => {
    const response: any = await RestaurantService.getRestaurantMenu(
      params.id,
      params.menuId,
    );
    return response;
  },
);

export const fetchRestaurantCategories = createAsyncThunk(
  'admin/getCategories',
  async (id: string) => {
    const response: any = await RestaurantService.getRestaurantCategories(id);
    if (response) {
      let newData: IAdminCategories[] = [];
      for (let i = 0; i < size(response); i++) {
        const categoryId = response[i].categoryId;

        const categoryItem: any = await RestaurantService.getRestaurantCategory(
          id,
          categoryId,
        );
        newData.push({
          ...response[i],
          ...categoryItem,
        });
      }
      return newData;
    } else {
      return [];
    }
  },
);

export const fetchRestaurantCategory = createAsyncThunk(
  'admin/getRestaurantCategory',
  async (params: {id: string; categoryId: string}) => {
    const response: any = await RestaurantService.getRestaurantCategory(
      params.id,
      params.categoryId,
    );
    return response;
  },
);

export const fetchRestaurantModifiers = createAsyncThunk(
  'admin/getRestaurantModifiers',
  async (id: string) => {
    const response: any = await RestaurantService.getRestaurantModifiers(id);
    if (!isArray(response) && response?.$values) {
      return response.$values;
    } else {
      return response;
    }
  },
);

export const fetchMenuItemDetail = createAsyncThunk(
  'admin/getMenuItemDetail',
  async (params: {id: string; itemId: string}) => {
    const response: any = await RestaurantService.getRestaurantMenuItemDetail(
      params.id,
      params.itemId,
    );
    if (!isArray(response) && response?.$values) {
      return response.$values;
    } else {
      return response;
    }
  },
);

export const getAllRestaurantOrders = createAsyncThunk(
  'admin/getAllRestaurantOrders',
  async (params: {
    RestaurantId?: string;
    OrderType?: number;
    SearchQuery?: string;
  }) => {
    const response: any = await OrderAdminService.getAllOrders({
      OrderStatuses: [0, 1, 2, 3, 4, 5, 6, 7],
      RestaurantId: params.RestaurantId,
      SearchQuery: params.SearchQuery,
      OrderType: params.OrderType,
    });
    if (!isArray(response) && response?.$values) {
      return response.$values;
    } else {
      return response;
    }
  },
);

export const getAllRestaurantPendingOrders = createAsyncThunk(
  'admin/getAllRestaurantPendingOrders',
  async (params: {RestaurantId?: string; SearchQuery?: string}) => {
    const response: any = await OrderAdminService.getAllPendingOrders({
      RestaurantId: params.RestaurantId,
      SearchQuery: params.SearchQuery,
    });
    if (!isArray(response) && response?.$values) {
      return response.$values;
    } else {
      return response;
    }
  },
);

export const getAllRestaurantActiveOrders = createAsyncThunk(
  'admin/getAllRestaurantActiveOrders',
  async (params: {RestaurantId?: string; SearchQuery?: string}) => {
    const response: any = await OrderAdminService.getAllActiveOrders({
      RestaurantId: params.RestaurantId,
      SearchQuery: params.SearchQuery,
    });
    if (!isArray(response) && response?.$values) {
      return response.$values;
    } else {
      return response;
    }
  },
);

export const getAllRestaurantCompletedOrders = createAsyncThunk(
  'admin/getAllRestaurantCompletedOrders',
  async (params: {RestaurantId?: string; SearchQuery?: string}) => {
    const response: any = await OrderAdminService.getAllCompletedOrders({
      RestaurantId: params.RestaurantId,
      SearchQuery: params.SearchQuery,
    });
    if (!isArray(response) && response?.$values) {
      return response.$values;
    } else {
      return response;
    }
  },
);

export const getAllRestaurantCancelledOrders = createAsyncThunk(
  'admin/getAllRestaurantCancelledOrders',
  async (params: {RestaurantId?: string; SearchQuery?: string}) => {
    const response: any = await OrderAdminService.getAllCancelledOrders({
      RestaurantId: params.RestaurantId,
      SearchQuery: params.SearchQuery,
    });
    if (!isArray(response) && response?.$values) {
      return response.$values;
    } else {
      return response;
    }
  },
);

export const removeRestaurantMenu = createAsyncThunk(
  'admin/removeRestaurantMenu',
  async (params: {restaurantId: string; menuId: string}) => {
    const response: any = await RestaurantService.deleteRestaurantMenu(
      params.restaurantId,
      params.menuId,
    );
    return response;
  },
);

export const fetchRestaurantMenuItems = createAsyncThunk(
  'admin/getRestaurantMenuItems',
  async (id: string) => {
    const response: any = await RestaurantService.getRestaurantMenuItems(id);
    if (!isArray(response) && response?.$values) {
      return response.$values;
    } else {
      return response;
    }
  },
);

export const removeRestaurantMenuItem = createAsyncThunk(
  'admin/removeRestaurantMenuItem',
  async (params: {id: string; itemId: string}) => {
    const response: any = await RestaurantService.deleteRestaurantMenuItem(
      params.id,
      params.itemId,
    );
    return response;
  },
);

export const fetchRestaurantDelivery = createAsyncThunk(
  'admin/getRestaurantDelivery',
  async (id: string) => {
    const response: any = await RestaurantService.getRestaurantDelivery(id);
    if (!isArray(response) && response?.$values) {
      return response.$values;
    } else {
      return response;
    }
  },
);

export const fetchRestaurantDeliveryArea = createAsyncThunk(
  'admin/getRestaurantDeliveryArea',
  async ({restaurantId, deliveryAreaId}: any) => {
    const response: any = await RestaurantService.getRestaurantDeliveryArea(
      restaurantId,
      deliveryAreaId,
    );
    if (!isArray(response) && response?.$values) {
      return response.$values;
    } else {
      return response;
    }
  },
);
