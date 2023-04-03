import API from '../';
import {
  IAdminMenuItem,
  IAdminOpeningHours,
  IAdminPreparationTimes,
  IAdminRestaurantCategoryParams,
  IAdminRestaurantDeliveryDTO,
  IAdminRestaurantMenuItemParams,
  IAdminRestaurantMenuParams,
  IAdminRestaurantModifierGroupParams,
  IBasicInformation,
} from './model';

const RestaurantService = {
  getAllRestaurants() {
    return API({
      url: '/api/admin/Restaurant',
      method: 'GET',
    });
  },
  getBasicInformation(id: string) {
    return API({
      url: `/api/admin/Restaurant/${id}/BasicInformation`,
      method: 'GET',
    });
  },
  getOpeningHours(id: string) {
    return API({
      url: `/api/admin/Restaurant/${id}/OpeningHours`,
      method: 'GET',
    });
  },
  updateOpeningHours(id: string, data: IAdminOpeningHours[]) {
    return API({
      url: `/api/admin/Restaurant/${id}/OpeningHours`,
      method: 'POST',
      data,
    });
  },
  getPreparationTimes(id: string) {
    return API({
      url: `/api/admin/Restaurant/${id}/PreparationTimes`,
      method: 'GET',
    });
  },
  updatePreparationTimes(id: string, data: IAdminPreparationTimes[]) {
    return API({
      url: `/api/admin/Restaurant/${id}/PreparationTimes`,
      method: 'POST',
      data,
    });
  },
  createRestaurant(data: IBasicInformation) {
    return API({
      url: `/api/admin/Restaurant`,
      method: 'POST',
      data,
    });
  },
  updateBasicInformation(id: string, data: IBasicInformation) {
    return API({
      url: `/api/admin/Restaurant/${id}/BasicInformation`,
      method: 'PATCH',
      data,
    });
  },
  getRestaurantMenus(id: string) {
    return API({
      url: `/api/admin/Restaurant/${id}/Menu`,
      method: 'GET',
    });
  },
  createRestaurantMenu(id: string, data: IAdminRestaurantMenuParams) {
    return API({
      url: `/api/admin/Restaurant/${id}/Menu`,
      method: 'POST',
      data,
    });
  },
  getRestaurantMenu(id: string, menuId: string) {
    return API({
      url: `/api/admin/Restaurant/${id}/Menu/${menuId}`,
      method: 'GET',
    });
  },
  updateRestaurantMenu(
    id: string,
    menuId: string,
    data: IAdminRestaurantMenuParams,
  ) {
    return API({
      url: `/api/admin/Restaurant/${id}/Menu/${menuId}`,
      method: 'POST',
      data,
    });
  },
  deleteRestaurantMenu(id: string, menuId: string) {
    return API({
      url: `/api/admin/Restaurant/${id}/Menu/${menuId}`,
      method: 'DELETE',
    });
  },
  getRestaurantCategories(id: string) {
    return API({
      url: `/api/admin/Restaurant/${id}/Category`,
      method: 'GET',
    });
  },
  getRestaurantCategory(id: string, categoryId: string) {
    return API({
      url: `/api/admin/Restaurant/${id}/Category/${categoryId}`,
      method: 'GET',
    });
  },
  updateRestaurantCategory(
    id: string,
    categoryId: string,
    data: IAdminRestaurantCategoryParams,
  ) {
    return API({
      url: `/api/admin/Restaurant/${id}/Category/${categoryId}`,
      method: 'POST',
      data,
    });
  },
  getRestaurantModifiers(id: string) {
    return API({
      url: `/api/admin/Restaurant/${id}/ModifierGroup`,
      method: 'GET',
    });
  },
  createRestaurantModifiers(
    id: string,
    data: IAdminRestaurantModifierGroupParams,
  ) {
    return API({
      url: `/api/admin/Restaurant/${id}/ModifierGroup`,
      method: 'POST',
      data,
    });
  },
  updateRestaurantModifierGroup(
    id: string,
    groupId: string,
    data: IAdminRestaurantModifierGroupParams,
  ) {
    const axiosOptions = {
      url: `/api/admin/Restaurant/${id}/ModifierGroup/${groupId}`,
      method: 'POST',
      data,
    };

    if (__DEV__) {
      console.log(
        'updateRestaurantModifierGroup ',
        JSON.stringify(axiosOptions),
      );
    }

    return API(axiosOptions);
  },
  getRestaurantModifierGroup(id: string, groupId: string) {
    return API({
      url: `/api/admin/Restaurant/${id}/ModifierGroup/${groupId}`,
      method: 'GET',
    });
  },
  getRestaurantMenuItemDetail(id: string, itemId: string) {
    return API({
      url: `/api/admin/Restaurant/${id}/Item/${itemId}`,
      method: 'GET',
    });
  },
  createRestaurantCategory(id: string, data: IAdminRestaurantCategoryParams) {
    return API({
      url: `/api/admin/Restaurant/${id}/Category`,
      method: 'POST',
      data,
    });
  },
  createRestaurantMenuItem(id: string, data: IAdminRestaurantMenuItemParams) {
    return API({
      url: `/api/admin/Restaurant/${id}/Item`,
      method: 'POST',
      data,
    });
  },
  updateRestaurantMenuItem(
    id: string,
    itemId: string,
    data: IAdminRestaurantMenuItemParams,
  ) {
    return API({
      url: `/api/admin/Restaurant/${id}/Item/${itemId}`,
      method: 'POST',
      data,
    });
  },
  getRestaurantMenuItems(id: string) {
    return API({
      url: `/api/admin/Restaurant/${id}/Item`,
      method: 'GET',
    });
  },
  deleteRestaurantMenuItem(id: string, itemId: string) {
    return API({
      url: `/api/admin/Restaurant/${id}/Item/${itemId}`,
      method: 'DELETE',
    });
  },
  getRestaurantDelivery(id: string) {
    return API({
      url: `/api/admin/Restaurant/${id}/Delivery`,
      method: 'GET',
    });
  },
  getRestaurantDeliveryArea(id: string, deliveryAreaId: string) {
    return API({
      url: `/api/admin/Restaurant/${id}/Delivery/${deliveryAreaId}`,
      method: 'GET',
    });
  },
  createRestaurantDelivery(id: string, data: IAdminRestaurantDeliveryDTO) {
    return API({
      url: `/api/admin/Restaurant/${id}/Delivery`,
      method: 'POST',
      data,
    });
  },
  updateRestaurantDelivery(
    id: string,
    deliveryAreaId: string,
    data: IAdminRestaurantDeliveryDTO,
  ) {
    return API({
      url: `/api/admin/Restaurant/${id}/Delivery/${deliveryAreaId}`,
      method: 'POST',
      data,
    });
  },
  deleteRestaurantDelivery(id: string, deliveryAreaId: string) {
    return API({
      url: `/api/admin/Restaurant/${id}/Delivery/${deliveryAreaId}`,
      method: 'DELETE',
    });
  },
};

export default RestaurantService;
