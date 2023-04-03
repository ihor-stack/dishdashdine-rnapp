import React from 'react';
import {
  DynamicImage,
  DynamicPressable,
  DynamicText,
  DynamicView,
} from '@/components';
import {Colors, fonts} from '@/themes';
import {Checkbox, Spinner} from 'native-base';
import DishButton from '@/components/DishButton';

const whiteRightArrow = require('@/assets/images/myAccount/white-right-arrow.png');

export interface NotificationsViewProps {
  onSubmit?: any;
  showLoading?: boolean;
  offerNotifications: boolean;
  orderNotifications: boolean;
  otherNotifications: boolean;
  setOfferNotifications: any;
  setOrderNotifications: any;
  setOtherNotifications: any;
}

const NotificationsView = (props: NotificationsViewProps) => {
  const {
    onSubmit,
    showLoading,
    offerNotifications,
    orderNotifications,
    otherNotifications,
    setOfferNotifications,
    setOrderNotifications,
    setOtherNotifications,
  } = props;

  return (
    <DynamicView
      flex={1}
      backgroundColor="#fff"
      paddingVertical={20}
      paddingHorizontal={11}>
      <DynamicView
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        borderBottomColor={Colors.lightGrey}
        borderBottomWidth={1}
        paddingBottom={16}>
        <DynamicView>
          <DynamicText
            fontFamily={fonts.DMSans700Bold}
            lineHeight={20}
            fontSize={15}>
            Offers
          </DynamicText>
          <DynamicText
            fontFamily={fonts.DMSans400Regular}
            lineHeight={16}
            fontSize={13}
            marginTop={6}
            color={Colors.grey}>
            Discounts, offers, and promotions.
          </DynamicText>
        </DynamicView>
        <DynamicView>
          <Checkbox
            value=""
            // isChecked={!!user?.offerNotifications}
            isChecked={offerNotifications}
            onChange={() => setOfferNotifications(!offerNotifications)}
            accessibilityLabel="This is a dummy checkbox"
            colorScheme="danger"
          />
        </DynamicView>
      </DynamicView>
      <DynamicView
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        borderBottomColor={Colors.lightGrey}
        borderBottomWidth={1}
        paddingVertical={16}>
        <DynamicView>
          <DynamicText
            fontFamily={fonts.DMSans700Bold}
            lineHeight={20}
            fontSize={15}>
            Orders
          </DynamicText>
          <DynamicText
            fontFamily={fonts.DMSans400Regular}
            lineHeight={16}
            fontSize={13}
            marginTop={6}
            color={Colors.grey}>
            Upcoming and Completed orders
          </DynamicText>
        </DynamicView>
        <DynamicView>
          <Checkbox
            value=""
            isChecked={orderNotifications}
            onChange={() => setOrderNotifications(!orderNotifications)}
            accessibilityLabel="This is a dummy checkbox"
            colorScheme="danger"
          />
        </DynamicView>
      </DynamicView>
      <DynamicView
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        borderBottomColor={Colors.lightGrey}
        borderBottomWidth={1}
        paddingVertical={16}>
        <DynamicView>
          <DynamicText
            fontFamily={fonts.DMSans700Bold}
            lineHeight={20}
            fontSize={15}>
            Other
          </DynamicText>
          <DynamicText
            fontFamily={fonts.DMSans400Regular}
            lineHeight={16}
            fontSize={13}
            marginTop={6}
            color={Colors.grey}>
            Events, recommendations, and other messages.
          </DynamicText>
        </DynamicView>
        <DynamicView>
          <Checkbox
            value=""
            isChecked={otherNotifications}
            onChange={() => setOtherNotifications(!otherNotifications)}
            accessibilityLabel="This is a dummy checkbox"
            colorScheme="danger"
          />
        </DynamicView>
      </DynamicView>
      <DynamicView marginTop="auto">
        <DishButton
          icon="arrowright"
          label="Update notifications"
          onPress={onSubmit}
          showSpinner={showLoading}
          variant="primary"
        />
      </DynamicView>
    </DynamicView>
  );
};

export default NotificationsView;
