import {
  IAdminCategories,
  IAdminMenuItem,
  IAdminMenus,
  IAdminModifierGroups,
  IAdminOpeningHours,
  IAdminPreparationTimes,
  IAdminRestaurant,
  IAdminRestaurantDelivery,
} from '@/api/admin_restaurant/model';

export type RestaurantAdminStateType = {
  restaurants: IAdminRestaurant[];
  loadingRestaurants: boolean;
  restaurant: IAdminRestaurant | any | null;
  restaurantOrderType: number | null;
  loadingRestaurant: boolean;
  openingHours: IAdminOpeningHours[];
  loadingHours: boolean;
  preparationTimes: IAdminPreparationTimes[];
  loadingPrepTimes: boolean;
  menus: IAdminMenus[];
  loadingMenus: boolean;
  categories: IAdminCategories[];
  loadingCategories: boolean;
  modifiers: IAdminModifierGroups[];
  loadingModifiers: boolean;
  deliveries: IAdminRestaurantDelivery[];
  loadingDeliveries: boolean;
  item: IAdminMenuItem[];
  loadingItem: boolean;
  loadingOrders: boolean;
  loadingPendingOrders: boolean;
  loadingActiveOrders: boolean;
  loadingCompletedOrders: boolean;
  loadingCancelledOrders: boolean;
};
