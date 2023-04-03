import React, {useEffect, useState} from 'react';

import {SheetManager} from 'react-native-actions-sheet';
import {useDispatch, useSelector} from 'react-redux';
import {filter, isEmpty, isNull, isUndefined, sumBy} from 'lodash';
import {showMessage} from 'react-native-flash-message';
import {useRoute} from '@react-navigation/native';

import {restaurantSelectors} from '@/store/restaurants';
import CustomizeItemOrderView from './View';
import {
  fetchActiveOrder,
  fetchCompletedOrder,
  fetchOrderRestaurant,
  setOrderAddress,
} from '@/store/order/thunk';
import {
  IAddress,
  ICategoryMenuItem,
  IFindRestaurantParams,
  IMenu,
  IOrder,
  IOrderItem,
  IOrderItemModifierGroupSelection,
  IRestaurant,
} from '@/api/generic';
import RestaurantService from '@/api/restaurant';
import {fetchMyFavorites, fetchRestaurant} from '@/store/restaurants/thunk';
import {captureErrorException} from '@/utils/error-handler';
import {DEFAULT_DISTANCE} from '@/constants';
import {accountSelectors} from '@/store/account';
import {homeSelectors} from '@/store/home';
import {addressSelectors} from '@/store/address';
import OrderService from '@/api/order';
import {IUser} from '@/api/user';
import {
  showSuccessMessage,
  showWarningMessage,
} from '@/components/DishFlashMessage';

const CustomizeItemOrder = () => {
  const dispatch = useDispatch<any>();

  const params: any = useRoute().params;
  const menuItem: ICategoryMenuItem = params?.menuItem;
  const activeMenu: IMenu = params?.activeMenu;
  const activeOrder: IOrder = params?.activeOrder;
  const modifierGroups: IOrderItemModifierGroupSelection[] =
    menuItem?.modifierGroups;

  const restaurant: IRestaurant = useSelector(
    restaurantSelectors.selectRestaurant,
  );
  const currentLocation = useSelector(
    accountSelectors.selectCurrentUserLocation,
  );
  const currentDistance = useSelector(accountSelectors.selectCurrentUserRadius);
  const homeOrderType = useSelector(homeSelectors.showOrderType);
  const defaultAddress = useSelector(
    addressSelectors.selectDefaultAddress,
  ) as IAddress;
  const currentUser = useSelector(accountSelectors.selectCurrentUser) as IUser;
  const myAddresses = useSelector(addressSelectors.selectMyAddress);

  const [quantity, setQuantity] = useState(1);
  const [prices, setPrices] = useState(0);
  const [groupQuantity, setGroupQuantity] = useState(0);
  const [_modifierGroup, setModifierGroup] = useState([]);
  const [specialInstructions, setSpecialInstructions] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (myAddresses) {
      const _address = myAddresses.find((addr: any) => addr.default);

      setAddress(String(_address?.id));
    }
  }, [myAddresses]);

  useEffect(() => {
    const computed = Number(menuItem.price) * quantity;

    const totalPrice = sumBy(_modifierGroup, (o: any) => o.totalPrice);

    const _totalPrice = isUndefined(totalPrice) ? 0 : Number(totalPrice);

    const totalComputed = Number(computed) + _totalPrice;

    setPrices(totalComputed);
  }, [quantity, menuItem, _modifierGroup]);

  useEffect(() => {
    if (modifierGroups) {
      let newData: any = [...modifierGroups];

      newData = newData.map((group: any) => {
        let newItems = [...group.modifierGroupItems];

        newItems = newItems.map((item: any) => ({
          ...item,
          quantity: 0,
          isEnabled: false,
        }));

        return {
          ...group,
          totalPrice: 0,
          modifierGroupItems: newItems,
          modifierGroupItemSelections: newItems,
          isEnabled: false,
        };
      });

      setModifierGroup(newData);
    }
  }, [modifierGroups]);

  const handleErrorToast = (message: string) => {
    showWarningMessage('Warning', message);
  };

  const onPressFavorite = async () => {
    let params: IFindRestaurantParams = {
      Latitude: currentLocation?.latitude,
      Longitude: currentLocation?.longitude,
      RadiusMiles: currentDistance || DEFAULT_DISTANCE,
    };

    if (!isNull(homeOrderType)) {
      params = {
        ...params,
        OrderType: homeOrderType,
        IncludeCateringRestaurants: false,
      };
    } else {
      params = {...params, IncludeCateringRestaurants: true};
    }

    try {
      const response = await RestaurantService.createRestaurantFavorite(
        restaurant.restaurantId,
        {isFavourite: !restaurant.favourite},
      );

      if (response) {
        showSuccessMessage(
          restaurant.favourite ? 'Remove to Favourite' : 'Added to Favourite',
          restaurant.favourite
            ? 'Successfully removed to your favourites!'
            : 'Successfully added to your favourites!',
        );

        if (defaultAddress?.postCode) {
          await dispatch(
            fetchRestaurant({
              ...params,
              PostCode: defaultAddress?.postCode,
            }),
          );
        } else {
          await dispatch(fetchRestaurant(params));
        }

        await dispatch(fetchMyFavorites());
      }
    } catch (error: any) {
      captureErrorException(error);
    }
  };

  const onAddToCart = async () => {
    if (!currentUser?.emailConfirmed) {
      return showMessage({
        message: 'Please verify your account',
        description:
          'We noticed your account has not been verified. You must verify your account to continue using this app',
        type: 'warning',
        floating: true,
        duration: 2000,
      });
    }

    setIsLoading(true);

    let latestOrder: any = {};

    try {
      const response: IOrder = await OrderService.findOrCreateRestaurant(
        restaurant?.restaurantId,
      );

      if (response) {
        if (isEmpty(response?.address)) {
          // SET ADDRESS
          await dispatch(
            setOrderAddress({
              id: response.id,
              data: {existingAddressId: address},
            }),
          ).unwrap();
        }

      
        latestOrder = response;

        const orderItem: IOrderItem = {
          itemId: menuItem.itemId,
          menuId: activeMenu.menuId,
          quantity: quantity,
          specialInstructions,
          modifierGroupSelections: _modifierGroup,
          orderLineItemId: '',
          itemPrice: prices,
          itemTotal: quantity * prices,
        };


        const resp: IOrder = await OrderService.addItemToOrder(
          response.id,
          orderItem,
        );

        latestOrder = resp;

        if (resp) {
          await dispatch(fetchOrderRestaurant(resp.id));
        }
      }

      await dispatch(fetchActiveOrder());
      await dispatch(fetchCompletedOrder());

      setIsLoading(false);

      await SheetManager.show('CheckOutModal', {
        payload: {order: {...latestOrder, restaurant}, isFrom: 'dish-info'},
      });
    } catch (e: any) {
      captureErrorException(e);
      setIsLoading(false);
      if (e?.name === 'SyntaxError') {
        return handleErrorToast('WARNING: An unknown error has occured.');
      } else if (e?.ModifierGroupSelections) {
        return handleErrorToast(e?.ModifierGroupSelections[0]);
      }
    }
  };

  const computeModifierQuantities = (
    group: any,
    item: any,
    action: string,
    reset = false,
  ) => {
    if (_modifierGroup) {
      let newData: any = [..._modifierGroup];

      newData = newData.map((groupItem: any) => {
        if (group.modifierGroupId === groupItem.modifierGroupId) {
          let newItems = [...group.modifierGroupItems];

          newItems = newItems.map((items: any) => {
            if (item.modifierGroupItemId === items.modifierGroupItemId) {
              let qty: number = 0;
              let total: number = 0;

              if (action === 'add') {
                qty = items.quantity += 1;
                total = items.quantity * items.price;
              } else {
                if (items.quantity === 0) {
                  qty = 0;
                  total = 0;
                } else {
                  qty = items.quantity -= 1;
                  total = items.quantity * items.price;
                }
              }

              return {
                ...items,
                quantity: qty,
                total: total,
                isEnabled: !(qty <= 0),
              };
            } else {
              if (reset) {
                return {
                  ...items,
                  quantity: 0,
                  total: 0,
                  isEnabled: false,
                };
              }
              return {...items};
            }
          });

          const totalPrice = sumBy(newItems, o => o.quantity * o.price);

          return {
            ...groupItem,
            modifierGroupItems: newItems,
            modifierGroupItemSelections: newItems,
            totalPrice,
          };
        } else {
          return groupItem;
        }
      });

      setModifierGroup(newData);
    }
  };

  const onAddQTYGroup = (group: any, item: any, reset = false) => {
    computeModifierQuantities(group, item, 'add', reset);
  };

  const onLessQTYGroup = (group: any, item: any) => {
    computeModifierQuantities(group, item, 'minus');
  };

  const onToggleModifier = (group: any, item: any) => {
    let newData: any = [..._modifierGroup];

    newData = newData.map((groupItem: any) => {
      if (group.modifierGroupId === groupItem.modifierGroupId) {
        let newItems: any = [...groupItem.modifierGroupItems];

        const result = filter(
          groupItem.modifierGroupItems,
          (i: any) => i.quantity >= groupItem.maxSelectionsPerItem,
        );

        newItems = newItems.map((items: any) => {
          if (item.modifierGroupItemId === items.modifierGroupItemId) {
            return {
              ...items,
              quantity: isEmpty(result) ? 1 : 0,
              total: isEmpty(result)
                ? items.price
                : items.price * items.quantity,
              isEnabled: isEmpty(result),
            };
          } else {
            return items;
          }
        });

        const totalPrice = sumBy(newItems, o => o.quantity * o.price);

        return {
          ...groupItem,
          modifierGroupItems: newItems,
          modifierGroupItemSelections: newItems,
          totalPrice,
        };
      } else {
        return groupItem;
      }
    });

    setModifierGroup(newData);
  };

  const onToggleRemoveModifier = (group: any, item: any) => {};

  const onAddQTY = () => {
    setQuantity(quantity + 1);
  };

  const onLessQTY = () => {
    if (quantity <= 1) {
      return;
    }

    if (quantity && groupQuantity === 1) {
      return;
    }
    setQuantity(quantity - 1);
  };

  return (
    <CustomizeItemOrderView
      {...{
        _modifierGroup,
        activeMenu,
        groupQuantity,
        isLoading,
        menuItem,
        onAddQTY,
        onAddQTYGroup,
        onAddToCart,
        onLessQTY,
        onLessQTYGroup,
        onPressFavorite,
        prices,
        quantity,
        setSpecialInstructions,
        specialInstructions,
        onToggleModifier,
        onToggleRemoveModifier,
        activeOrder,
        restaurant,
      }}
    />
  );
};

export default CustomizeItemOrder;
