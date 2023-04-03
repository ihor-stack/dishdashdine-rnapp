import Config from 'react-native-config';

const burgerPng = require('@/assets/images/burger.png');
const pizzaPng = require('@/assets/images/pizza.png');
const soupPng = require('@/assets/images/soup.png');
const dessertsPng = require('@/assets/images/desserts.png');
const mexicanPng = require('@/assets/images/mexican.png');
const kebabPng = require('@/assets/images/kebab.png');
const breakfastPng = require('@/assets/images/breakfast.png');

export const AUTH_TOKEN = 'auth_token';
export const SET_IS_AUTHENTICATED = 'SET_IS_AUTHENTICATED';
// export const API_BASE_URL = 'https://dishdashdine-web-if92g.ondigitalocean.app';
// export const API_BASE_URL = 'https://staging.dishdashdine.com/';
// export const API_BASE_URL = __DEV__
//   ? 'https://staging.dishdashdine.com/'
//   : 'https://admin.dishdashdine.com/';
export const API_BASE_URL = Config.API_BASE_URL;
export const GOOGLE_API_KEY = 'AIzaSyA9vdYaeHTEDB_d8BwuR62eBBsCSgbHXec';
export const GOOGLE_PACES_API_BASE_URL =
  'https://maps.googleapis.com/maps/api/place';
export const GOOGLE_GEOCODE_API_BASE_URL =
  'https://maps.googleapis.com/maps/api/geocode';

export const Merchant_Identifier = 'merchant.com.dishdashdine.app';

export const IOS_CODEPUSH_KEY = '_HzFbeuklpJqNDMqMnpnSfJNvhV2A8Glri678'; // Staging
export const IOS_CODEPUSH_KEY_PROD = 'ZZoi1BstIdVTJB3Nj_yPRwJ55VeErxQr4i2qT'; // Production
export const ANDROID_CODEPUSH_KEY = 'G-Rj7zmI8jwtNK9QXUbIo_Q3dYWSk6-RcBTvL'; // Staging;
export const ANDROID_CODEPUSH_KEY_PROD =
  'zVgYwtU-zOO_XESDHTWw_hC5KML8mYEMvpDj4'; // Production;

export const DEFAULT_ZOOM = 12;
export const MIN_ZOOM = 8;
export const MAX_ZOOM = 17;
export const DEFAULT_PITCH = 2;
export const DEFAULT_HEADING = 20;
export const DEFAULT_ALTITUDE = 10000;
export const DEFAULT_DURATION = 1000;
export const DEFAULT_DISTANCE = 20;

export const AddressType = {
  ComputedCurrentAddress: {
    code: 1,
    name: 'Current Address',
  },
  Home: {
    code: 2,
    name: 'Home',
  },
  Work: {
    code: 3,
    name: 'Work',
  },
  Other: {
    code: 4,
    name: 'Other',
  },
};

export const ADDRESS_TYPE_ARR = [
  {
    code: 1,
    name: 'Current Address',
  },
  {
    code: 2,
    name: 'Home',
  },
  {
    code: 3,
    name: 'Work',
  },
  {
    code: 4,
    name: 'Other',
  },
];

export const TAXONOMIES = [
  {
    text: 'Fast Food',
    image: burgerPng,
  },
  {
    text: 'Pizza',
    image: pizzaPng,
  },
  {
    text: 'Chinese',
    image: soupPng,
  },
  {
    text: 'Desserts',
    image: dessertsPng,
  },
  {
    text: 'Mexican',
    image: mexicanPng,
  },
  {
    text: 'Kebab',
    image: kebabPng,
  },
  {
    text: 'Breakfast',
    image: breakfastPng,
  },
];

export const ORDER_STATUS_ENUM = {
  NEW: 0,
  SUBMITTED: 1,
  CONFIRMED: 2,
  PREPARING: 3,
  READY_FOR_COLLECTION: 4,
  OUT_FOR_DELIVERY: 5,
  COMPLETED: 6,
  CANCELLED: 7,
};

export const ORDER_STATUS = {
  1: 'Placing your order',
  2: 'Order confirmed',
  3: 'Preparing your order ',
  4: 'Ready for collection',
  5: 'Out for delivery',
  6: 'Completed',
  7: 'Cancelled',
};

export const ORDER_TABS = [
  {
    key: 'all',
    title: 'All',
  },
  {
    key: 'pending',
    title: 'Pending',
  },
  {
    key: 'active',
    title: 'Active',
  },
  {
    key: 'completed',
    title: 'Completed',
  },
  {
    key: 'cancelled',
    title: 'Cancelled',
  },
];

export const MENU_TABS = [
  {
    key: 'about',
    title: 'About',
  },
  {
    key: 'pricing',
    title: 'Pricing',
  },
  {
    key: 'modifiers',
    title: 'Modifiers',
  },
  {
    key: 'nutrition',
    title: 'Nutrition',
  },
];

export const ORDER_TYPE = {
  COLLECTION: 0,
  DELIVERY: 1,
};

export const PREPARATION_MODE = [
  {
    id: 0,
    mode: 'Normal',
  },
  {
    id: 1,
    mode: 'Busy',
  },
  {
    id: 2,
    mode: 'Chaos',
  },
];

export const DEFAULT_OPENING_HOURS = [
  {
    dayOfWeek: 0,
    open: false,
    openTime: '',
    closeTime: '',
  },
  {
    dayOfWeek: 1,
    open: false,
    openTime: '',
    closeTime: '',
  },
  {
    dayOfWeek: 2,
    open: false,
    openTime: '',
    closeTime: '',
  },
  {
    dayOfWeek: 3,
    open: false,
    openTime: '',
    closeTime: '',
  },
  {
    dayOfWeek: 4,
    open: false,
    openTime: '',
    closeTime: '',
  },
  {
    dayOfWeek: 5,
    open: false,
    openTime: '',
    closeTime: '',
  },
  {
    dayOfWeek: 6,
    open: false,
    openTime: '',
    closeTime: '',
  },
];

export const SUPPORT_TICKET_TYPE = [
  {
    code: 0,
    label: 'General',
  },
  {
    code: 1,
    label: 'Refund',
  },
];

export const DAYS = [
  {
    id: 0,
    day: 'Sunday',
  },
  {
    id: 1,
    day: 'Monday',
  },
  {
    id: 2,
    day: 'Tuesday',
  },
  {
    id: 3,
    day: 'Wednesday',
  },
  {
    id: 4,
    day: 'Thursday',
  },
  {
    id: 5,
    day: 'Friday',
  },
  {
    id: 6,
    day: 'Saturday',
  },
];
