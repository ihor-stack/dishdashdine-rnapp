import API from './';

const CardService = {
  cardCapture() {
    return API({
      url: '/api/Card/StartCapture',
      method: 'POST',
    });
  },
  getAllCards() {
    return API({
      url: '/api/Card',
      method: 'GET',
    });
  },
  removeCard(paymentMethodId: string) {
    return API({
      url: `/api/Card/${paymentMethodId}`,
      method: 'DELETE',
    });
  },
};

export default CardService;
