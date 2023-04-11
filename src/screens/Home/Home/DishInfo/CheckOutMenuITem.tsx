import React, {Fragment, useEffect, useState} from 'react';
import {DynamicView} from '@/components';
import {Colors} from '@/themes';
import {Divider, useToast} from 'native-base';
import {isEmpty, size} from 'lodash';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import SwipeableFlatList from 'react-native-swipeable-list';
import {Pressable, StyleSheet, View} from 'react-native';
import {useDispatch} from 'react-redux';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {Animated} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {SheetManager} from 'react-native-actions-sheet';

import CheckoutMenutItemHeader from '@/screens/Home/Home/DishInfo/CheckoutMenutItemHeader';
import CheckoutMenutitemBody from '@/screens/Home/Home/DishInfo/CheckoutMenutitemBody';
import {
  addItemToOrder,
  fetchActiveOrder,
  fetchCompletedOrder,
  fetchOrderRestaurant,
  removeItemToOrder,
} from '@/store/order/thunk';
import {IOrder, IOrderLineItem} from '@/api/generic';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NoOrder from '../../Orders/NoOrder';
import DishSpinner from '@/components/DishSpinner';
import {captureErrorException} from '@/utils/error-handler';
import DishStepperButton from '@/components/DishStepperButton';
import {showWarningMessage} from '@/components/DishFlashMessage';

export interface CheckOutMenuITemProps {
  order?: IOrder;
  isListView?: boolean;
  showLoading?: boolean;
  disableSwipe?: boolean;
  onQuantityChanged?: any;
  modifierGroup?: any;
}

type UpdateQuantityParams = {
  itemId: string;
  menuId: string;
  quantity: number;
  orderLineItemId: string;
  modifierGroupSelections: {
    modifierGroupId: string;
    modifierGroupItemSelections: [
      {
        modifierGroupItemId: string;
        quantity: number;
      },
      {
        modifierGroupItemId: string;
        quantity: number;
      },
    ];
  }[];
};

const FAKE_DATA: any[] = Array.from({
  length: 5,
});

const CheckOutMenuITem = ({
  order,
  isListView,
  showLoading,
  disableSwipe,
  onQuantityChanged,
}: CheckOutMenuITemProps) => {
  const toast = useToast();
  const [disableBtn, setDisableBtn] = useState(false);
  const [orderLineItems, setOrderLineItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch<any>();
  let row: Array<any> = [];
  let prevOpenedRow: any;

  useEffect(() => {
    if (!isEmpty(order?.lineItems)) {
      setOrderLineItems(order?.lineItems || []);
    }
  }, [order]);

  const handleErrorToast = (message: string) => {
    showWarningMessage('Warning', message);
  };

  const updateOrderItems = async (_order: UpdateQuantityParams) => {
    try {
      const result = await dispatch(
        addItemToOrder({
          id: order?.id,
          data: _order,
        }),
      ).unwrap();

      if (__DEV__) {
        console.log('success updateItemToOrder', JSON.stringify(result));
      }

      onQuantityChanged();
    } catch (e: any) {
      captureErrorException(e);
    }
  };

  const handleQuantity = async (
    item: IOrderLineItem,
    type: 'add' | 'subtract',
  ) => {
    if (disableBtn || (type === 'subtract' && Number(item.quantity) <= 1)) {
      return;
    }

    let newData: IOrderLineItem[] = [...orderLineItems];

    let newItem = orderLineItems.find(
      i => i.orderLineItemId === item.orderLineItemId,
    );

    const isAdd = type === 'add';

    const quantity = isAdd
      ? Number(item.quantity) + 1
      : Number(item.quantity) - 1;

    const total = Number(item.itemPrice + item.modifierPrice) * quantity;

    newData = newData.map(i => {
      if (i.orderLineItemId === item.orderLineItemId && i.itemId === item.itemId) {
        newItem = {...i, quantity, total};

        return newItem;
      } else {
        return i;
      }
    });

    setOrderLineItems(newData);
    setDisableBtn(true);
    const modifierGroupSelections = newItem.selectedModifierGroups?.map((i: { modifierGroupId: any; selectedItems: any[]; }) => {
      return {
        modifierGroupId: i.modifierGroupId,
        modifierGroupItemSelections: i.selectedItems.map((j: { modifierGroupItemId: any; quantity: any; }) => ({
          modifierGroupItemId: j.modifierGroupItemId,
          quantity: j.quantity,
        })),
      };
    });
    await updateOrderItems({
      itemId: newItem.itemId,
      menuId: newItem.menuId,
      quantity: isAdd ? 1 : -1,
      orderLineItemId: newItem.orderLineItemId,
      modifierGroupSelections,
    });
    setDisableBtn(false);
  };

  const onRemoveOrderItem = async (item: IOrderLineItem, index: number) => {
    if (disableSwipe) {
      return;
    }

    try {
      setIsLoading(true);
      let newData = [...orderLineItems];
      newData.splice(index, 1);
      await dispatch(
        removeItemToOrder({
          id: order?.id,
          lineItemId: item.orderLineItemId,
        }),
      ).unwrap();
      await dispatch(fetchOrderRestaurant(String(order?.id))).unwrap();
      // await dispatch(fetchActiveOrder());
      // await dispatch(fetchCompletedOrder());
      setOrderLineItems(newData);
      setIsLoading(false);
      if (!newData.length) {
        await SheetManager.hide('CheckOutModal');
      }
    } catch (e) {
      setIsLoading(false);
      captureErrorException(e);
      if (e) {
      } else {
        return handleErrorToast('Warning: An unknown error has occurred.');
      }
    }
  };

  const renderCartItems = (item: IOrderLineItem, index: number) => {
    return (
      <Fragment key={`Fragment_${index}`}>
        <Collapse key={index}>
          <CollapseHeader
            flexDirection="row"
            justifyContent="space-between"
            paddingVertical={12}
            paddingHorizontal={11}
            backgroundColor={Colors.white}>
            {/* {!isEmpty(item.itemName) && ( */}
            <CheckoutMenutItemHeader
              quantity={item?.quantity}
              itemName={item?.itemName}
              itemPrice={item?.total}
            />
            {/* )} */}
          </CollapseHeader>
          <CollapseBody marginLeft={30} marginBottom={15} marginTop={-15}>
            {!isEmpty(item.selectedModifierGroups) && (
              <CheckoutMenutitemBody
                order={item.selectedModifierGroups}
                key={index}
              />
            )}
          </CollapseBody>
        </Collapse>
      </Fragment>
    );
  };

  const QuickActions = (index: number, qaItem: IOrderLineItem) => {
    return (
      <View style={styles.qaContainer} key={`QuickActions_${index}`}>
        {!disableSwipe && (
          <Pressable
            style={styles.button}
            onPress={() => onRemoveOrderItem(qaItem, index)}>
            <Ionicons name="trash-outline" color={Colors.white} size={20} />
          </Pressable>
        )}
      </View>
    );
  };

  const QuantityActions = (index: number, qaItem: IOrderLineItem) => {
    return (
      <View style={styles.qaContainer} key={`QuantityActions_${index}`}>
        {!disableSwipe && (
          <DishStepperButton
            size="sm"
            isEnabled
            minValue={1}
            disabled={disableBtn}
            onAddButtonPress={() => handleQuantity(qaItem, 'add')}
            onLessButtonPress={() => handleQuantity(qaItem, 'subtract')}
            value={qaItem.quantity}
          />
        )}
      </View>
    );
  };

  const closeRow = (index: number) => {
    if (prevOpenedRow && prevOpenedRow !== row[index]) {
      prevOpenedRow.close();
    }
    prevOpenedRow = row[index];
  };

  const renderSwipableCartItems = (item: IOrderLineItem, index: number) => {
    return (
      <>
        <GestureHandlerRootView>
          <Swipeable
              key={`Swipeable_${index}`}
              renderRightActions={() => {
                return (
                  <Animated.View style={{width: disableSwipe ? 0 : 60}}>
                    {QuickActions(index, item)}
                  </Animated.View>
                );
              }}
              renderLeftActions={() => {
                return (
                  <Animated.View
                    style={{
                      width: disableSwipe ? 0 : 90,
                      alignItems: 'center',
                    }}>
                    {QuantityActions(index, item)}
                  </Animated.View>
                );
              }}
              enabled={disableSwipe}
              onSwipeableWillOpen={() => closeRow(index)}
              rightThreshold={0}
              leftThreshold={0}
              overshootRight={false}
              ref={ref => (row[index] = ref)}>
              {renderCartItems(item, index)}
          </Swipeable>
        </GestureHandlerRootView>

        {index !== size(orderLineItems) - 1 && (
          <Divider bgColor={Colors.lightGrey} padding={0.1} marginBottom={4} />
        )}
      </>
    );
  };

  const renderFlatList = () => (
    <SwipeableFlatList
      keyExtractor={(item: any) => item.orderLineItemId}
      data={orderLineItems}
      renderItem={({item, index}: any) => renderCartItems(item, index)}
      maxSwipeDistance={disableSwipe ? 0 : 60}
      renderQuickActions={({index, item}: any) => QuickActions(index, item)}
      contentContainerStyle={styles.contentContainerStyle}
      shouldBounceOnMount={true}
      ItemSeparatorComponent={() => (
        <Divider bgColor={Colors.lightGrey} padding={0.1} marginBottom={4} />
      )}
      ListEmptyComponent={() => <NoOrder />}
    />
  );

  const renderBasicView = () => {
    return (
      orderLineItems &&
      orderLineItems.map((item, index) => renderSwipableCartItems(item, index))
    );
  };

  const showLoadingItems = () =>
    FAKE_DATA.map((_: any, index: number) => {
      return (
        <SkeletonPlaceholder key={`SkeletonPlaceholder_${index}`}>
          <SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              paddingVertical={12}>
              <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
                <SkeletonPlaceholder.Item
                  marginTop={6}
                  width={60}
                  height={16}
                  borderRadius={4}
                />
                <SkeletonPlaceholder.Item marginLeft={20}>
                  <SkeletonPlaceholder.Item
                    width={120}
                    height={16}
                    borderRadius={4}
                  />
                  <SkeletonPlaceholder.Item
                    marginTop={6}
                    width={80}
                    height={10}
                    borderRadius={4}
                  />
                </SkeletonPlaceholder.Item>
              </SkeletonPlaceholder.Item>
              <SkeletonPlaceholder.Item
                width={60}
                height={20}
                borderRadius={4}
              />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
      );
    });

  const renderListing = () => {
    return isListView ? renderFlatList() : renderBasicView();
  };

  return (
    <>
      {isLoading && <DishSpinner />}
      <DynamicView paddingVertical={17}>
        {showLoading ? showLoadingItems() : renderListing()}
      </DynamicView>
    </>
  );
};

export default CheckOutMenuITem;

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
    backgroundColor: Colors.white,
  },
  qaContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.ember,
  },
});
