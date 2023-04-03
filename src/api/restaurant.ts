import API from './';

import {IEventCatering, IFindRestaurantParams} from './generic';

const RestaurantService = {
  createRestaurantFavorite(
    id: string,
    data: {
      isFavourite: boolean;
    },
  ) {
    return API({
      url: `/api/Restaurant/${id}/Favourite`,
      data,
      method: 'POST',
    });
  },
  getAllRestaurants(params: IFindRestaurantParams) {
    return API({
      url: '/api/Restaurant/Find',
      method: 'GET',
      params,
    });
  },
  getRestaurantMenus(id: string) {
    return API({
      url: `/api/Restaurant/${id}/Menus`,
      method: 'GET',
    });
  },
  getRestaurantPopularMenus(id: string, menuId: string) {
    return API({
      url: `/api/Restaurant/${id}/Menus/${menuId}/Popular`,
      method: 'GET',
    });
  },
  createEventCatering(restaurantId: string, data: IEventCatering) {
    return API({
      url: `/api/EventCatering/${restaurantId}`,
      data,
      method: 'POST',
    });
  },
  getEventCatering() {
    return API({
      url: `/api/EventCatering/My`,
      method: 'GET',
    });
  },
};

export default RestaurantService;
