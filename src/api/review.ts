import API from './';
import {ISupportTicket} from './generic';

const ReviewService = {
  createReview(orderId: string, data: ISupportTicket) {
    return API({
      url: `/api/Review/Submit/${orderId}`,
      data,
      method: 'POST',
    });
  },
  getAllReviews() {
    return API({
      url: '/api/Review/My',
      method: 'GET',
    });
  },
};

export default ReviewService;
