import API from '../';
import {IFindOrderParams} from './model';

const OrderAdminService = {
  getAllOrders(params: IFindOrderParams) {
    return API({
      url: '/api/admin/Order',
      method: 'GET',
      params,
    });
  },
  getAllPendingOrders(params: IFindOrderParams) {
    return API({
      url: '/api/admin/Order?OrderStatuses=0&OrderStatuses=1',
      method: 'GET',
      params,
    });
  },
  getAllActiveOrders(params: IFindOrderParams) {
    return API({
      url: '/api/admin/Order?OrderStatuses=2&OrderStatuses=3&OrderStatuses=4&OrderStatuses=5',
      method: 'GET',
      params,
    });
  },
  getAllCompletedOrders(params: IFindOrderParams) {
    return API({
      url: '/api/admin/Order?OrderStatuses=6',
      method: 'GET',
      params,
    });
  },
  getAllCancelledOrders(params: IFindOrderParams) {
    return API({
      url: '/api/admin/Order?OrderStatuses=7',
      method: 'GET',
      params,
    });
  },
  getOrder(id: string) {
    return API({
      url: `/api/admin/Order/${id}`,
      method: 'GET',
    });
  },
  acceptOrder(id: string) {
    return API({
      url: `/api/admin/Order/${id}/Accept`,
      method: 'POST',
    });
  },
  cancelOrder(id: string) {
    return API({
      url: `/api/admin/Order/${id}/Cancel`,
      method: 'POST',
    });
  },
  readyForCollection(id: string) {
    return API({
      url: `/api/admin/Order/${id}/ReadyForCollection`,
      method: 'POST',
    });
  },
  outForDelivery(id: string) {
    return API({
      url: `/api/admin/Order/${id}/OutForDelivery`,
      method: 'POST',
    });
  },
  orderCompleted(id: string) {
    return API({
      url: `/api/admin/Order/${id}/Completed`,
      method: 'POST',
    });
  },
};

export default OrderAdminService;
