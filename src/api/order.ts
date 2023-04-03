import API from './';
import {IOrderItem, IOrderNewAddress} from './generic';

const OrderService = {
  findOrCreateRestaurant(restaurantId: string) {
    return API({
      url: `/api/Order/FindOrCreate/${restaurantId}`,
      method: 'POST',
    });
  },
  getOrder() {
    return API({
      url: '/api/Order',
      method: 'GET',
    });
  },
  getOrderById(id: string) {
    return API({
      url: `/api/Order/${id}`,
      method: 'GET',
    });
  },
  setOrderAddress(id: string, data: IOrderNewAddress) {
    return API({
      url: `/api/Order/${id}/Address`,
      method: 'POST',
      data,
    });
  },
  addItemToOrder(id: string, data: IOrderItem) {
    return API({
      url: `/api/Order/${id}/Items`,
      data,
      method: 'POST',
    });
  },
  updateItemToOrder(id: string, lineItemId: string, data: IOrderItem) {
    return API({
      url: `/api/Order/${id}/Items/${lineItemId}`,
      data,
      method: 'POST',
    });
  },
  addOrderTip(
    id: string,
    data: {
      tipAmount: number;
    },
  ) {
    return API({
      url: `/api/Order/${id}/Tip`,
      data,
      method: 'POST',
    });
  },
  setOrderCollectionTime(
    id: string,
    data: {
      collectNow: boolean;
      collectLaterAt: string;
    },
  ) {
    return API({
      url: `/api/Order/${id}/CollectionTime`,
      data,
      method: 'POST',
    });
  },
  addOrderPromocode(
    id: string,
    data: {
      promoCode: string;
    },
  ) {
    return API({
      url: `/api/Order/${id}/PromoCode`,
      data,
      method: 'POST',
    });
  },
  addOrderPaymentMethod(
    id: string,
    data: {
      paymentMethodId: string;
    },
  ) {
    return API({
      url: `/api/Order/${id}/PaymentMethod`,
      data,
      method: 'POST',
    });
  },
  addOrderPreferrence(
    id: string,
    data: {
      utensils: boolean;
      napkins: boolean;
    },
  ) {
    return API({
      url: `/api/Order/${id}/Preferences`,
      data,
      method: 'POST',
    });
  },
  checkOutOrder(id: string) {
    return API({
      url: `/api/Order/${id}/Checkout`,
      method: 'POST',
    });
  },
  removeItemToOrder(id: string, lineItemId: string) {
    return API({
      url: `/api/Order/${id}/Items/${lineItemId}`,
      method: 'DELETE',
    });
  },
  setOrderOrderType(
    id: string,
    data: {
      orderType: number;
    },
  ) {
    return API({
      url: `/api/Order/${id}/OrderType`,
      data,
      method: 'POST',
    });
  },
};

export default OrderService;
