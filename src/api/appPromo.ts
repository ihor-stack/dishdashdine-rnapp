import API from './';

const AppPromoService = {
  getAppPromo() {
    return API({
      url: '/api/AppPromo',
      method: 'GET',
    });
  },
};

export default AppPromoService;
