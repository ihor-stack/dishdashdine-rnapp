import {
  Platform,
  ScaledSize,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import React, {useState} from 'react';
import {DynamicText, DynamicView} from '@/components';
import {Checkbox, Radio} from 'native-base';
import {Colors, fonts} from '@/themes';
import {useDispatch} from 'react-redux';
import {addOrderPreferrence} from '@/store/order/thunk';
import {IOrder} from '@/api/generic';
import {useRoute} from '@react-navigation/native';

export interface OrderPreferrenceProps {
  onReqUtensils: (value: any) => void;
  onReqNapkins: (value: any) => void;
  utensils: boolean;
  napkins: boolean;
}

const OrderPreferrence = ({
  onReqUtensils,
  onReqNapkins,
  utensils,
  napkins,
}: OrderPreferrenceProps) => {
  const dispatch = useDispatch();
  const params = useRoute().params as any;
  const order: IOrder = params.order;
  const {width}: ScaledSize = useWindowDimensions();
  const ITEM_WIDTH = width / 1.7;

  return (
    <DynamicView paddingVertical={15} paddingHorizontal={10}>
      {/* <Radio.Group
        name="myRadioGroup"
        defaultValue="two"
        value={value}
        onChange={nextValue => {
          setValue(nextValue);
        }}></Radio.Group> */}
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        removeClippedSubviews={false}
        bounces={false}
        decelerationRate={Platform.OS === 'ios' ? 0 : 0.98}
        renderToHardwareTextureAndroid
        contentContainerStyle={{alignItems: 'center'}}
        snapToAlignment="start">
        {/* <DynamicView
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            paddingVertical={13}
            paddingHorizontal={15}
            marginHorizontal={5}
            borderRadius={2}
            width={ITEM_WIDTH}
            backgroundColor={Colors.lightestGrey}>
            <DynamicText
              fontFamily={fonts.DMSans500Medium}
              fontSize={16}
              lineHeight={20.83}
              color={Colors.black}>
              Request utensils
            </DynamicText>
            <Radio
              value="one"
              my="1"
              size="sm"
              colorScheme="red"
              accessibilityLabel="Request utensils"
            />
          </DynamicView> */}
        {/* <DynamicView
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            paddingHorizontal={15}
            paddingVertical={13}
            marginHorizontal={5}
            width={ITEM_WIDTH}
            backgroundColor={Colors.lightestGrey}>
            <DynamicText
              fontFamily={fonts.DMSans500Medium}
              fontSize={16}
              lineHeight={20.83}
              color={Colors.black}>
              Request napkins
            </DynamicText>
            <Radio
              value="two"
              my="1"
              size="sm"
              colorScheme="red"
              accessibilityLabel="Request napkins"
            />
          </DynamicView> */}
        <DynamicView
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          paddingHorizontal={15}
          paddingVertical={16}
          marginHorizontal={5}
          width={ITEM_WIDTH}
          backgroundColor={Colors.lightestGrey}>
          <DynamicView>
            <DynamicText
              fontFamily={fonts.DMSans500Medium}
              fontSize={16}
              lineHeight={20.83}
              color={Colors.black}>
              Request utensils
            </DynamicText>
          </DynamicView>
          <DynamicView>
            <Checkbox
              value=""
              isChecked={utensils}
              onChange={req => {
                onReqUtensils(req);
              }}
              accessibilityLabel="Request Utensils"
              colorScheme="red"
            />
          </DynamicView>
        </DynamicView>
        <DynamicView
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          paddingHorizontal={15}
          paddingVertical={16}
          marginHorizontal={5}
          width={ITEM_WIDTH}
          backgroundColor={Colors.lightestGrey}>
          <DynamicView>
            <DynamicText
              fontFamily={fonts.DMSans500Medium}
              fontSize={16}
              lineHeight={20.83}
              color={Colors.black}>
              Request napkins
            </DynamicText>
          </DynamicView>
          <DynamicView>
            <Checkbox
              value=""
              // isChecked={!!user?.offerNotifications}
              isChecked={napkins}
              onChange={reqNap => {
                onReqNapkins(reqNap);
              }}
              accessibilityLabel="Request napkins"
              colorScheme="red"
            />
          </DynamicView>
        </DynamicView>
      </ScrollView>
    </DynamicView>
  );
};

export default OrderPreferrence;
