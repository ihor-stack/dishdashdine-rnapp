export interface ICartItemGroup {
  modifierGroupId: string;
  modifierGroupItemSelections: ICartItemGroupItems[];
}

export interface ICartItemGroupItems {
  modifierGroupItemId: string;
  quantity: number;
}

export interface ICartItems {
  itemId: string;
  menuId: string;
  quantity: number;
  specialInstructions: string;
  addons: ICartItemGroup[];
}

export interface ICartData {
  restaurantId: string;
  subTotal: number;
  tip: number;
  serviceFee: number;
  total: number;
  promoCode: string;
  cartItems: ICartItems[];
}
