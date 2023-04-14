import { IOrder, IRestaurant } from '@/api/generic';
import { DynamicPressable, DynamicText, DynamicView } from '@/components';
import NoOrder from '@/screens/Home/Orders/NoOrder';
import OrdersItem from '@/screens/Home/Orders/OrderItem';
import { orderSelectors } from '@/store/order';
import { restaurantSelectors } from '@/store/restaurants';
import { Colors, fonts } from '@/themes';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Divider } from 'native-base';
import React from 'react';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';

const HelpSupportOrder = () => {
  const Order: IOrder[] = useSelector(orderSelectors.selectCompletedOrder);
  const params = useRoute().params as any;
  const isFrom: any = params?.isFrom;
  const navigation = useNavigation<any>();

  const onSelectOrder = async (items: IOrder) => {
    if (isFrom !== 'refund') {
      navigation.navigate('HelpWithOrder', {
        order: items,
        orderId: items.id,
      });
    } else {
      navigation.navigate('RequestRefund', {
        order: items,
        orderId: items.id,
      });
    }
  };

  const renderItem = ({ item, index }: { item: IOrder; index: number }) => {
    return (
      <DynamicView backgroundColor={Colors.white} flex={1} key={index}>
        <DynamicPressable onPress={() => onSelectOrder(item)} key={index}>
          <DynamicView flexDirection="row" justifyContent="space-between">
            <DynamicView marginLeft={-10}>
              <OrdersItem showDate order={item} restaurant={item.restaurant} />
            </DynamicView>
            <DynamicView
              justifyContent="center"
              marginTop={-20}
              marginRight={11}>
              <DynamicText
                fontSize={15}
                fontFamily={fonts.DMSans700Bold}
                lineHeight={19.53}
                color={Colors.black}>
                £{Number(item.total).toFixed(2)}
              </DynamicText>
            </DynamicView>
          </DynamicView>
        </DynamicPressable>
      </DynamicView>
    );
  };

  return (
    <FlatList
      style={{ backgroundColor: Colors.white }}
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: 25,
      }}
      data={Order}
      renderItem={renderItem}
      ListHeaderComponent={() => (
        <>
          <DynamicView paddingVertical={15} alignItems="center">
            {isFrom === 'refund' ? (
              <DynamicText>Which order do you need refund with?</DynamicText>
            ) : (
              <DynamicText>Which order do you need help with?</DynamicText>
            )}
          </DynamicView>
          <Divider bgColor={Colors.lightGrey} />
        </>
      )}
      ItemSeparatorComponent={() => (
        <Divider bgColor={Colors.lightGrey} width={354} alignSelf="center" />
      )}
      ListEmptyComponent={() => <NoOrder showImage />}
    />
  );
};

export default HelpSupportOrder;
