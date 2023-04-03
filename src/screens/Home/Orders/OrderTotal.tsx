import {View, Text, TouchableOpacity} from 'react-native';
import React, { useState } from 'react';
import {DynamicText, DynamicView} from '@/components';
import {Colors, fonts} from '@/themes';
import Foundation from 'react-native-vector-icons/Foundation';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Tooltip from 'react-native-walkthrough-tooltip';

export interface OrderTotalProps {
  subTotal: string;
  tip: string;
  debit: string;
  total: string;
  showLoading?: boolean;
}

const OrderTotal = (props: OrderTotalProps) => {
  const {subTotal, tip, debit, total, showLoading} = props;
  const [isShowToolTip, setShowToolTip] = useState(false);

  const renderOrderTotalView = () => (
    <DynamicView paddingVertical={20} paddingHorizontal={12}>
      <DynamicView flexDirection="row" justifyContent="space-between">
        <DynamicText
          fontFamily={fonts.DMSans500Medium}
          fontSize={13}
          lineHeight={16.93}
          color={Colors.grey}>
          Subtotal:
        </DynamicText>
        <DynamicText
          fontFamily={fonts.DMSans500Medium}
          fontSize={13}
          lineHeight={16.93}
          color={Colors.grey}>
          £{subTotal}
        </DynamicText>
      </DynamicView>
      <DynamicView
        paddingTop={10}
        flexDirection="row"
        justifyContent="space-between">
        <DynamicText
          fontFamily={fonts.DMSans500Medium}
          fontSize={13}
          lineHeight={16.93}
          color={Colors.grey}>
          Restaurant Tip:
        </DynamicText>
        <DynamicText
          fontFamily={fonts.DMSans500Medium}
          fontSize={13}
          lineHeight={16.93}
          color={Colors.grey}>
          £{tip}
        </DynamicText>
      </DynamicView>
      <DynamicView
        paddingTop={10}
        flexDirection="row"
        justifyContent="space-between">
        <DynamicView flexDirection="row" alignItems="center">
          <DynamicText
            fontFamily={fonts.DMSans500Medium}
            fontSize={13}
            lineHeight={16.93}
            color={Colors.grey}>
            Dish Dash Debit
          </DynamicText>
          <Tooltip
            isVisible={isShowToolTip}
            content={<Text>Dish Dash Debit is our charge to you for using this service. We have to charge a fee to allow this app to run.</Text>}
            placement="bottom"
            childContentSpacing={0}
            closeOnChildInteraction={true}
            disableShadow={true}
            onClose={() => setShowToolTip(false)}
          >
            <TouchableOpacity style={{ flex: 1 }} onPress={(e) => {
              e.preventDefault()
              setShowToolTip(!isShowToolTip)
            }}>
              <DynamicView marginLeft={6}>
                <Foundation name="info" color={Colors.grey} size={18} />
              </DynamicView>
            </TouchableOpacity>
          </Tooltip>
    
        </DynamicView>
        <DynamicText
          fontFamily={fonts.DMSans500Medium}
          fontSize={13}
          lineHeight={16.93}
          color={Colors.grey}>
          £{debit}
        </DynamicText>
      </DynamicView>
      <DynamicView
        paddingTop={10}
        flexDirection="row"
        justifyContent="space-between">
        <DynamicText
          fontFamily={fonts.DMSans500Medium}
          fontSize={14}
          lineHeight={18.23}>
          Total:
        </DynamicText>
        <DynamicText
          fontFamily={fonts.DMSans500Medium}
          fontSize={14}
          lineHeight={18.23}>
          £{total}
        </DynamicText>
      </DynamicView>
    </DynamicView>
  );

  const renderOrderTotalLoading = () => (
    <SkeletonPlaceholder>
      <SkeletonPlaceholder.Item
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        paddingVertical={20}
        paddingHorizontal={12}>
        <SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item width={120} height={16} borderRadius={4} />
          <SkeletonPlaceholder.Item
            marginTop={6}
            width={80}
            height={16}
            borderRadius={4}
          />
          <SkeletonPlaceholder.Item
            marginTop={6}
            width={80}
            height={16}
            borderRadius={4}
          />
          <SkeletonPlaceholder.Item
            marginTop={6}
            width={80}
            height={16}
            borderRadius={4}
          />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item alignItems="flex-end">
          <SkeletonPlaceholder.Item width={120} height={16} borderRadius={4} />
          <SkeletonPlaceholder.Item
            marginTop={6}
            width={80}
            height={16}
            borderRadius={4}
          />
          <SkeletonPlaceholder.Item
            marginTop={6}
            width={80}
            height={16}
            borderRadius={4}
          />
          <SkeletonPlaceholder.Item
            marginTop={6}
            width={80}
            height={16}
            borderRadius={4}
          />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );

  return showLoading ? renderOrderTotalLoading() : renderOrderTotalView();
};

export default OrderTotal;
