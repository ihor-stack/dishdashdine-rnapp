import { ORDER_STATUS } from '@/constants';
import { number, string } from 'yup';

export interface NewResponseFormat {
  $id: string;
  $values: any[];
}

export interface ICategoryItem {
  id: string;
  created: string;
  updated: string;
  categoryId: string;
  itemId: string;
  category: string;
  item: string;
}

export interface ICategory {
  id: string;
  created: string;
  updated: string;
  name: string;
  normalisedName: string;
  notes: string;
  restaurantId: string;
  restaurant: string;
  menus: string[];
  items: ICategoryMenuItem[];
}

export interface ICategories {
  id: string;
  created: string;
  updated: string;
  menuId: string;
  categoryId: string;
  name: string;
  category: ICategory;
  description: string;
  items: ICategoryMenuItem[];
}

export interface IMenuAvailability {
  dayOfWeek: number;
  availabilityTimePeriods: {
    startTime: string;
    endTime: string;
  }[];
}

export interface IOpeningHours {
  dayOfWeek: number;
  open: boolean;
  openTime: string;
  closeTime: string;
}

export interface IPreparationTimes {
  preparationTimeMode: 0;
  enabled: true;
  prepTimeMin: 0;
  prepTimeMax: 0;
}

export interface IUserFavorites {
  id: string;
  created: string;
  updated: string;
  restaurantId: string;
  userId: string;
  restaurant: string;
  user: string;
}

export interface IAddress {
  id: string;
  created: string;
  updated: string;
  streetNumber: string;
  street: string;
  city: string;
  country: string;
  postCode: string;
  county: string;
  addressType: number;
  userAddresses: string[];
  latitude: number;
  longitude: number;
  formattedAddress: string;
}

export interface IUserAddress {
  id: string;
  created: string;
  updated: string;
  userId: string;
  addressId: string;
  user: string;
  address: IAddress;
}

export interface IReviews {
  id: string;
  created: string;
  updated: string;
  userId: string;
  orderId: string;
  rating: number;
  title: string;
  description: string;
  user: string;
  order: string;
}

export interface IAppPromo {
  title: string;
  body: string;
  link: string;
  imagePath: string;
}

export interface ISupportTickets {
  id: string;
  created: string;
  updated: string;
  orderId: string;
  userId: string;
  supportTicketType: number;
  subject: string;
  issue: string;
  order: string;
  user: string;
}

export interface IOwner {
  id: string;
  userName: string;
  normalizedUserName: string;
  email: string;
  normalizedEmail: string;
  emailConfirmed: true;
  passwordHash: string;
  securityStamp: string;
  concurrencyStamp: string;
  phoneNumber: string;
  phoneNumberConfirmed: boolean;
  twoFactorEnabled: boolean;
  lockoutEnd: string;
  lockoutEnabled: boolean;
  accessFailedCount: 0;
  firstName: string;
  lastName: string;
  normalisedFirstName: string;
  normalisedLastName: string;
  dateOfBirth: string;
  offerNotifications: boolean;
  otherNotifications: boolean;
  orderNotifications: boolean;
  stripeCustomerId: string;
  primaryUserRole: string;
  created: string;
  updated: string;
  restaurants: string[];
  userAddresses: IUserAddress[];
  userFavourites: IUserFavorites[];
  reviews: IReviews[];
  supportTickets: ISupportTickets[];
}

export interface IAddressResolveParams {
  Latitude?: number;
  Longitude?: number;
  StreetAddress?: string;
  IsReverseLookup?: boolean;
}

export interface IAddressResolveResponse {
  streetNumber: string;
  street: string;
  city: string;
  country: string;
  postCode: string;
  county: string;
  addressType: number;
  latitude: number;
  longitude: number;
  formattedAddress: string;
}

export interface IAddressResponse extends IAddressResolveResponse {
  id: string;
}

export interface ISupportTicket {
  rating: number;
  title: string;
  description: string;
}

export interface IAppExperience {
  rating: 0;
  title: string;
  description: string;
}

export interface IRestaurant {
  restaurantId: string;
  created: string;
  updated: string;
  name: string;
  normalisedName: string;
  description: string;
  phone: string;
  email: string;
  streetAddress: string;
  postcode: string;
  city: string;
  autoAcceptOrders: boolean;
  offersEventCatering: boolean;
  ownerId: string;
  hygieneRating: number;
  averageRating: number;
  currentMode: number;
  onboardingComplete: boolean;
  bannerImagePath: string;
  logoImagePath: string;
  openingHours: IOpeningHours;
  preparationTimes?: IPreparationTimes[];
  owner: IOwner;
  menus: string[];
  categories: ICategories;
  items: any[];
  orders: any[];
  userFavourites: IUserFavorites[];
  assignedTaxonomy: any[];
  promotions: any[];
  distanceMetres: number;
  favourite: boolean;
  timesOrdered: number;
  distanceMiles: number;
  prepTimeMin: number;
  prepTimeMax: number;
  takingOrders: boolean;
  takingOrdersUntil: string;
  latitude: number;
  longitude: number;
  order: IOrder;
  offersOrdering?: boolean;
}

export enum SortOption {
  'One' = 1,
  'Two',
  'Three',
  'Four',
  'Five',
  'Six',
}

export interface IFindRestaurantParams {
  RestaurantId?: string;
  Latitude?: number;
  Longitude?: number;
  PostCode?: string;
  RadiusMiles?: number;
  SearchQuery?: string;
  Vegan?: boolean;
  Vegeterian?: boolean;
  GlutenFree?: boolean;
  FavouritesOnly?: boolean;
  AssignedTaxonomy?: string;
  SortOption?: number | SortOption;
  LocationQuery?: boolean | null;
  IncludeOpenOnly?: boolean;
  OrderType?: number;
  IncludeCateringRestaurants?: boolean | null;
  IncludeOrderRestaurants?: boolean | null;
}

export interface IMenu {
  categories: ICategories[];
  created: string;
  description: string;
  menuAvailability: IMenuAvailability[];
  menuId: string;
  name: string;
  restaurant: IRestaurant;
  restaurantId: string;
  updated: string;
}

export interface IMenus {
  menus: IMenu[];
  activeMenu: IMenu;
}

export interface ITaxonomy {
  iconPath: string;
  identifier: string;
  name: string;
  taxonomyId: string;
}

export interface ITaxonomies {
  taxonomies: ITaxonomy[];
  topPicks: ITaxonomy[];
}

export interface ICartItem {
  itemId: string;
  menuId: string;
  quantity: number;
  specialInstructions: string;
}

export interface ICategoryMenuItem {
  description: string;
  energyValCal: number;
  energyValKCal: number;
  glutenFree: boolean;
  itemId: string;
  largeImagePath: string;
  modifierGroups: IOrderItemModifierGroupSelection[];
  name: string;
  price: number;
  soldOut: boolean;
  temperature: number;
  vat: number;
  vegan: boolean;
  vegetarian: boolean;
}

export interface IOrderLineItem {
  itemId: string;
  itemName: string;
  itemPrice: number;
  itemTotal: number;
  menuId: string;
  menuName: string;
  modifierPrice: number;
  modifierTotal: number;
  orderLineItemId: string;
  quantity: number;
  selectedModifierGroups?: IOrderItemModifierGroupSelection[];
  total: number;
  specialInstructions?: string;
}

export interface IOrderStatusHistory {
  orderStatus: number;
  orderStatusHistoryId: string;
  timestamp: string;
}

export interface IOrder {
  address: IOrderAddress;
  collectionTime: string;
  id: string;
  lineItems: IOrderLineItem[];
  orderCollectionMode: number;
  orderStatus: keyof typeof ORDER_STATUS;
  orderType: number;
  paymentMethodId: string;
  promoCode: string;
  reviewLeft: boolean;
  requestUtensils: boolean;
  requestNapkins: boolean;
  restaurantId: string;
  serviceFee: number;
  subTotal: 0;
  submittedAt: string;
  tip: number;
  total: number;
  restaurant?: IRestaurant;
  lineItemCount?: number;
  statusHistory: IOrderStatusHistory[];
  reference: string;
}

export interface IOrderCheckout {
  customerId: string;
  customerEphemeralKey: string;
  customerEphemeralKeyExpiry: string;
  paymentIntentSecret: string;
  publishableKey: string;
}

export interface IOrderItemModifierGroupItemSelection {
  modifierGroupItemId: string;
  modifierGroupItemName: string;
  maxSelections: number;
  minSelections: number;
  quantity: number;
  name: string;
  price: number;
  itemPrice: number;
  total: number;
  isEnabled: boolean;
}

export interface IOrderItemModifierGroupSelection {
  modifierGroupId: string;
  name: string;
  modifierGroupName: string;
  description: string;
  maxSelections: number;
  maxSelectionsPerItem: number;
  minSelections: number;
  modifierGroupItemSelections: IOrderItemModifierGroupItemSelection[];
  selectedItems: IOrderItemModifierGroupItemSelection[];
  modifierGroupItems: IOrderItemModifierGroupItemSelection[];
}

export interface IOrderItem {
  orderLineItemId: string;
  itemId: string;
  menuId: string;
  quantity: number;
  itemPrice: number;
  itemTotal: number;
  specialInstructions?: string;
  modifierGroupSelections?: IOrderItemModifierGroupSelection[];
}

export interface IOrderNewAddress {
  existingAddressId: string;
  newAddress?: {
    streetNumber: string;
    street: string;
    city: string;
    country: string;
    postCode: string;
    county: string;
    addressType: number;
  };
}

export interface IOrderAddress {
  id: string;
  streetNumber: string;
  street: string;
  city: string;
  country: string;
  postCode: string;
  county: string;
  addressType: number;
  latitude: number;
  longitude: number;
  formattedAddress: string;
}

export interface ICardStartCapture {
  customerId: string;
  customerEphemeralKey: string;
  customerEphemeralKeyExpiry: string;
  setupIntentSecret: string;
  publishableKey: string;
}

export interface ICard {
  paymentMethodId: string;
  name: string;
  brand: string;
  last4: string;
  expMonth: number;
  expYear: number;
  default: boolean;
}

export interface IEventCatering {
  eventDate: string;
  numberOfAttendees: number;
  eventDescription: string;
}
