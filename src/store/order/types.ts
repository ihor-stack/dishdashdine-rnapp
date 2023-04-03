import {IOrder} from '@/api/order';

export type OrdersStateType = {
  myOrder: IOrder[];
  myActiveOrders: IOrder[];
  myUnpaidOrders: IOrder[];
  myCompletedOrders: IOrder[];
  loadingMyOrder: boolean;
  initiateOrder: boolean;
  selectedOrder: IOrder;
  loadingSelectedOrder: boolean;
  loadingCompletedOrders: boolean;
};
