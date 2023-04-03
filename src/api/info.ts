import API from './';

const InfoService = {
  getInfo() {
    return API({
      url: '/api/Info',
      method: 'GET',
    });
  },
};

export default InfoService;
