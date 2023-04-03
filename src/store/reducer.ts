import {combineReducers} from 'redux';

import {accountReducer} from './account';
import {addressReducer} from './address';
import {adminRestaurantReducer} from './admin_restaurant/restaurant';
import {authReducer} from './authentication';
import {cartReducer} from './cart';
import {homeReducer} from './home';
import {reviewsReducer} from './my-reviews';
import {cardReducer} from './my-wallet';
import {orderReducer} from './order';
import {restaurantReducer} from './restaurants';
import {searchReducer} from './search';
import {taxonomyReducer} from './taxonomy';

const rootReducer = combineReducers({
  authentication: authReducer,
  accounts: accountReducer,
  home: homeReducer,
  reviews: reviewsReducer,
  restaurant: restaurantReducer,
  searches: searchReducer,
  address: addressReducer,
  taxonomy: taxonomyReducer,
  cart: cartReducer,
  order: orderReducer,
  cards: cardReducer,
  admin_restaurant: adminRestaurantReducer,
});
export default rootReducer;
