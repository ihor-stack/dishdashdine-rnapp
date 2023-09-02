import {
  IRestaurant,
  IOrder,
  IOrderNewAddress,
  IOrderItem,
  IOrderCheckout,
} from '@/api/generic';
import OrderService from '@/api/order';
import RestaurantService from '@/api/restaurant';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {filter, isArray, size} from 'lodash';

export const fetchOrder = createAsyncThunk<IOrder[]>(
  'order/fetchOrder',
  async () => {
    const response: any = await OrderService.getOrder();
    console.log('fetchOrder response:', response);
    if (!isArray(response) && response?.$values) {
      return response.$values;
    } else if (isArray(response)) {
      let newData: IOrder[] = [];
      for (let i = 0; i < size(response); i++) {
        const resto: IRestaurant[] = await RestaurantService.getAllRestaurants({
          RestaurantId: response[i].restaurantId,
        });
        if (resto && isArray(resto)) {
          newData.push({
            ...response[i],
            restaurant: resto[0],
          });
        }
      }
      return newData;
    } else {
      return [];
    }
  },
);

export const fetchActiveOrder = createAsyncThunk<IOrder[]>(
  'order/fetchActiveOrder',
  async () => {
    const response: any = await OrderService.getOrder();
    console.log('fetchActiveOrder response:', response);
    if (!isArray(response) && response?.$values) {
      return response.$values;
    } else if (isArray(response)) {
      let newData: IOrder[] = [];
      let activeOrders = filter(
        response,
        order =>
          order.orderStatus !== 6 &&
          order.orderStatus !== 7 &&
          order.orderStatus !== 0,
      );
      for (let i = 0; i < size(activeOrders); i++) {
        const resto: IRestaurant[] = await RestaurantService.getAllRestaurants({
          RestaurantId: activeOrders[i].restaurantId,
        });
        if (resto && isArray(resto)) {
          newData.push({
            ...activeOrders[i],
            restaurant: resto[0],
          });
        }
      }
      return newData;
    } else {
      return [];
    }
  },
);

export const fetchUnpaidOrder = createAsyncThunk<IOrder[]>(
  'order/fetchUnpaidOrder',
  async () => {
    const response: any = await OrderService.getOrder();
    if (!isArray(response) && response?.$values) {
      return response.$values;
    } else if (isArray(response)) {
      let newData: IOrder[] = [];
      const unpaidOrders = filter(
        response,
        order => order.orderStatus === 0 || order.orderStatus === 1,
      );
      for (let i = 0; i < size(unpaidOrders); i++) {
        const resto: IRestaurant[] = await RestaurantService.getAllRestaurants({
          RestaurantId: unpaidOrders[i].restaurantId,
        });
        if (resto && isArray(resto)) {
          newData.push({
            ...unpaidOrders[i],
            restaurant: resto[0],
          });
        }
      }
      return newData;
    } else {
      return [];
    }
  },
);

export const fetchCompletedOrder = createAsyncThunk<IOrder[]>(
  'order/fetchCompletedOrder',
  async () => {
    const response: any = await OrderService.getOrder();
    console.log('fetchCompletedOrder response:', response);
    if (!isArray(response) && response?.$values) {
      return response.$values;
    } else if (isArray(response)) {
      let newData: IOrder[] = [];
      const completedOrders = filter(
        response,
        order => order.orderStatus === 6,
      );
      for (let i = 0; i < size(completedOrders); i++) {
        const resto: IRestaurant[] = await RestaurantService.getAllRestaurants({
          RestaurantId: completedOrders[i].restaurantId,
        });
        if (resto && isArray(resto)) {
          newData.push({
            ...completedOrders[i],
            restaurant: resto[0],
          });
        }
      }
      return newData;
    } else {
      return [];
    }
  },
);

export const fetchOrderRestaurant = createAsyncThunk<IOrder, string>(
  'order/fetchOrderRestaurant',
  async orderId => {
    let response: IOrder = await OrderService.getOrderById(orderId);
    if (response) {
      const resto: IRestaurant[] = await RestaurantService.getAllRestaurants({
        RestaurantId: response.restaurantId,
      });
      response = {
        ...response,
        restaurant: resto && resto[0],
      };
    }
    return response;
  },
);

export const fetchRestaurantOrder = createAsyncThunk<IOrder, string>(
  'order/fetchRestaurantOrder',
  async orderId => {
    const response: IOrder = await OrderService.getOrderById(orderId);
    return response;
  },
);

export const initiateOrder = createAsyncThunk<any, string>(
  'order/initiateOrder',
  async restaurantId => {
    const response = await OrderService.findOrCreateRestaurant(restaurantId);
    if (!isArray(response) && response?.$values) {
      return response.$values;
    } else {
      return response;
    }
  },
);

export const setOrderAddress = createAsyncThunk(
  'order/orderAddress',
  async (params: {id: string; data: IOrderNewAddress}) => {
    const response = await OrderService.setOrderAddress(params.id, params.data);
    if (!isArray(response) && response?.$values) {
      return response.$values;
    } else {
      return response;
    }
  },
);

export const addItemToOrder = createAsyncThunk<IOrder, any>(
  'order/addItemToOrder',
  async (params: {id: string; data: IOrderItem}) => {
    const response = await OrderService.addItemToOrder(params.id, params.data);
    if (!isArray(response) && response?.$values) {
      return response.$values;
    } else {
      return response;
    }
  },
);

export const updateItemToOrder = createAsyncThunk<IOrder, any>(
  'order/updateItemToOrder',
  async (params: {id: string; lineItemId: string; data: IOrderItem}) => {
    const response = await OrderService.updateItemToOrder(
      params.id,
      params.lineItemId,
      params.data,
    );
    if (!isArray(response) && response?.$values) {
      return response.$values;
    } else {
      return response;
    }
  },
);

export const addOrderTip = createAsyncThunk<IOrder, any>(
  'order/addOrderTip',
  async (params: {
    id: string;
    data: {
      tipAmount: number;
    };
  }) => {
    const response = await OrderService.addOrderTip(params.id, params.data);
    if (!isArray(response) && response?.$values) {
      return response.$values;
    } else {
      return response;
    }
  },
);

export const orderCollectionTime = createAsyncThunk<IOrder, any>(
  'order/orderCollectionTime',
  async (params: {
    id: string;
    data: {
      collectNow: boolean;
      collectLaterAt: string;
    };
  }) => {
    const response = await OrderService.setOrderCollectionTime(
      params.id,
      params.data,
    );
    if (!isArray(response) && response?.$values) {
      return response.$values;
    } else {
      return response;
    }
  },
);

export const addOrderPromocode = createAsyncThunk<IOrder, any>(
  'order/addOrderPromocode',
  async (params: {
    id: string;
    data: {
      promoCode: string;
    };
  }) => {
    const response = await OrderService.addOrderPromocode(
      params.id,
      params.data,
    );

    return response;
  },
);

export const checkOutOrder = createAsyncThunk<IOrderCheckout, string>(
  'order/addItemToOrder',
  async id => {
    const response = await OrderService.checkOutOrder(id);
    if (!isArray(response) && response?.$values) {
      return response.$values;
    } else {
      return response;
    }
  },
);

export const addOrderPaymentMethod = createAsyncThunk<IOrder, any>(
  'order/addOrderPaymentMethod',
  async (params: {
    id: string;
    data: {
      paymentMethodId: string;
    };
  }) => {
    const response = await OrderService.addOrderPaymentMethod(
      params.id,
      params.data,
    );
    if (!isArray(response) && response?.$values) {
      return response.$values;
    } else {
      return response;
    }
  },
);

export const addOrderPreferrence = createAsyncThunk<IOrder, any>(
  'order/addOrderPreferrence',
  async (params: {
    id: string;
    data: {
      utensils: boolean;
      napkins: boolean;
    };
  }) => {
    const response = await OrderService.addOrderPreferrence(
      params.id,
      params.data,
    );
    if (!isArray(response) && response?.$values) {
      return response.$values;
    } else {
      return response;
    }
  },
);

export const removeItemToOrder = createAsyncThunk<IOrder, any>(
  'order/removeItemToOrder',
  async (params: {id: string; lineItemId: string}) => {
    const response = await OrderService.removeItemToOrder(
      params.id,
      params.lineItemId,
    );
    if (!isArray(response) && response?.$values) {
      return response.$values;
    } else {
      return response;
    }
  },
);

export const setOrderOrderType = createAsyncThunk(
  'order/setOrderOrderType',
  async (params: {id: string; data: {orderType: number}}) => {
    const response = await OrderService.setOrderOrderType(
      params.id,
      params.data,
    );
    if (!isArray(response) && response?.$values) {
      return response.$values;
    } else {
      return response;
    }
  },
);
