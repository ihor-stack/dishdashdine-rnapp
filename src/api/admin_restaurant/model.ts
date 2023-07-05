export interface IAdminRestaurant {
  bannerImagePath: string;
  city: string;
  description: string;
  email: string;
  logoImagePath: string;
  name: string;
  phone: string;
  postcode: string;
  restaurantId: string;
  streetAddress: string;
  openingHours?: IAdminOpeningHours[];
  preparationTimes?: IAdminPreparationTimes[];
  menus?: IAdminMenus[];
  categories?: IAdminCategories[];
  modifiers?: IAdminModifierGroups[];
  orders: IAdminOrders[];
  pendingOrders: IAdminOrders[];
  activeOrders: IAdminOrders[];
  completedOrders: IAdminOrders[];
  cancelledOrders: IAdminOrders[];
  autoAcceptOrders?: boolean;
  takingOrders?: boolean;
  offersOrdering?: boolean;
  offersCatering?: boolean;
}

export interface IAdminOpeningHours {
  dayOfWeek: string;
  open: boolean;
  openTime: string;
  openTimeDate: Date;
  closeTime: string;
  closeTimeDate: Date;
}

export interface IAdminPreparationTimes {
  preparationTimeMode: number;
  enabled: boolean;
  prepTimeMin: number;
  prepTimeMax: number;
}

export interface IBasicInformation {
  name?: string;
  description?: string;
  phone?: string;
  email?: string;
  streetAddress?: string;
  city?: string;
  postcode?: string;
  bannerImage?: IRestaurantBannerImage;
  logoImage?: IRestaurantLogoImage;
  latitude?: number;
  longitude?: number;
  hygieneRating?: number;
  currentMode?: number;
  autoAcceptOrders?: boolean;
  takingOrders?: boolean;
  offersOrdering?: boolean;
  offersCatering?: boolean;
}

export interface IRestaurantBannerImage {
  base64Payload: string;
  fileName: string;
  contentType: string;
}

export interface IRestaurantLogoImage {
  base64Payload: string;
  fileName: string;
  contentType: string;
}

export interface IMenuItemsDetailsImage {
  base64Payload: string;
  fileName: string;
  contentType: string;
}

export interface IAdminMenus {
  menuId: string;
  name: string;
  description: string;
  categories: string[];
  itemCount: number;
  displayMenuAvailability: string;
  displayCategories: string;
}

export interface IAdminMenu {
  menuId: string;
  name: string;
  description: string;
  menuAvailability: IMenuAvailability[];
  itemCount: number;
  assignedCategories: IMenuAssignedCategories[];
  displayMenuAvailability: string;
}

export interface IMenuAvailability {
  menuAvailabilityId: string;
  dayOfWeek: number;
  availabilityTimePeriods: IMenuAvailTimePeriods[];
}

export interface IMenuAvailTimePeriods {
  menuAvailabilityTimePeriodId: string;
  startTime: string;
  endTime: string;
}

export interface IMenuAssignedCategories {
  menuCategoryId: string;
  categoryId: string;
  menuId: string;
  categoryName: string;
  menuName: string;
}

export interface IAdminCategories {
  categoryId: string;
  categoryName?: string;
  name: string;
  description: string;
  itemCount: string;
  menus: string[];
  displayMenus: string;
}

export interface IAdminCategory {
  categoryId: string;
  name: string;
  description: string;
  displayMenus: string;
  itemCount: number;
  menus?: IAdminCategoryMenus[];
  items?: IAdminCategoryItems[];
}

export interface IAdminCategoryMenus {
  menuCategoryId: string;
  categoryId: string;
  menuId: string;
  categoryName: string;
  menuName: string;
}

export interface IAdminCategoryItems {
  categoryItemId: string;
  categoryId: string;
  categoryName: string;
  itemId: string;
  itemName: string;
  itemImagePath: string;
}

export interface IAdminModifierGroups {
  modifierGroupId: string;
  name: string;
  description: string;
  modifierGroupItems: string[];
  items: string[];
  displayModifierGroupItems: string;
  displayItems: string;
  modifierGroupName?: string;
}

export interface IAdminOrders {
  address: IAdminOrderAddress;
  collectionTime: string;
  id: string;
  lineItemCount: number;
  lineItems: IAdminOrderLineItems[];
  orderCollectionMode: number;
  orderStatus: number;
  orderType: number;
  paymentMethodId: string;
  promoCode: string;
  reference: string;
  requestNapkins: boolean;
  requestUtensils: boolean;
  restaurantId: string;
  serviceFee: number;
  statusHistory: IAdminOrderStatusHistory[];
  subTotal: number;
  submittedAt: string;
  tip: number;
  total: number;
  customerName: string;
  customerPhoneNumber: string;
}

export interface IAdminOrderAddress {
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
  default: boolean;
}

export interface IAdminOrderLineItems {
  orderLineItemId: string;
  itemId: string;
  itemName: string;
  menuId: string;
  menuName: string;
  itemPrice: number;
  modifierPrice: number;
  quantity: number;
  itemTotal: number;
  modifierTotal: number;
  total: number;
  selectedModifierGroups: IAdminModifierGroups[];
}

export interface IAdminOrderModifiers {
  selectedModifierGroupId: string;
  total: number;
  selectionCount: number;
  modifierGroupId: string;
  modifierGroupName: string;
  minSelections: number;
  maxSelections: number;
  maxSelectionsPerItem: number;
  selectedItems: IAdminOrderSelectedItems[];
}

export interface IAdminOrderSelectedItems {
  selectedModifierGroupItemId: string;
  modifierGroupItemId: string;
  modifierGroupItemName: string;
  itemPrice: number;
  quantity: number;
  total: number;
}

export interface IAdminOrderStatusHistory {
  orderStatusHistoryId: string;
  orderStatus: number;
  timestamp: string;
}

export interface IFindOrderParams {
  SearchQuery?: string;
  RestaurantId?: string;
  OrderStatuses?: number[];
  OrderType?: number;
}

export interface IAdminMenuItem {
  itemId: string;
  soldOut: boolean;
  name: string;
  description: string;
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  energyValueCal: number;
  energyValueKCal: number;
  temperature: number;
  price: number;
  vat: number;
  largeImagePath: string;
  assignedCategories: IAdminItemAssignedCategories[];
  assignedModifierGroups: IAdminItemModifierGroups[];
}

export interface IAdminItemAssignedCategories {
  categoryItemId: string;
  categoryId: string;
  categoryName: string;
  itemId: string;
  itemName: string;
  itemImagePath: string;
}

export interface IAdminItemModifierGroups {
  itemModifierGroupId: string;
  itemId: string;
  itemName: string;
  modifierGroupId: string;
  modifierGroupName: string;
}

export interface IAdminRestaurantMenuItemParams {
  soldOut: boolean;
  name: string;
  description: string;
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  otherDietaryRequirement: string;
  energyValueCal: number;
  energyValueKCal: number;
  temperature: number;
  price: number;
  vat: number;
  largeImage: {
    base64Payload: string;
    fileName: string;
    contentType: string;
  };
  assignedCategories: string[];
  assignedModifierGroups: string[];
}

export interface IAdminRestaurantMenuParams {
  name: string;
  description: string;
  assignedCategories: string[];
  menuAvailability: IAdminRestaurantMenuAvailability[];
}

export interface IAdminRestaurantMenuAvailability {
  day: number;
  open: string;
  close: string;
}

export interface IAdminRestaurantCategoryParams {
  name: string;
  description: string;
  assignedMenus?: string[];
  assignedItems?: string[];
}

export interface IAdminRestaurantModifierGroupAvailableParams {
  modifierGroupItemId?: string;
  name: string;
  price: number | string;
  minSelections: number;
  maxSelections: number;
}

export interface IAdminRestaurantModifierGroupParams {
  name: string;
  description: string;
  minSelections: number;
  maxSelections: number;
  availableOptions: IAdminRestaurantModifierGroupAvailableParams[];
}

export interface IAdminRestaurantDeliveryDTO {
  name: string;
  deliveryAreaType: number;
  price: number;
  estimatedTime: string;
  mileRadiusMin?: number;
  mileRadiusMax?: number;
  postCode?: string;
}

export interface IAdminRestaurantDelivery {
  deliveryAreaId: string;
  name: string;
  area: string;
  cost: number;
  estimatedTime: string;
}
