import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import {DynamicText, DynamicTextInput, DynamicView} from '@/components';
import {Controller} from 'react-hook-form';
import {Colors, fonts} from '@/themes';
import DishButton from '@/components/DishButton';
import {ICard, IOrder, IRestaurant} from '@/api/generic';
import moment from 'moment';

export interface HelpSupportRefundViewProps {
  control: any;
  restaurant?: IRestaurant;
  order: IOrder;
  activeCard?: ICard;
  onSubmit: any;
}

const HelpSupportRefundView = ({
  control,
  restaurant,
  order,
  activeCard,
  onSubmit,
}: HelpSupportRefundViewProps) => {
  return (
    <ScrollView
      style={{
        backgroundColor: Colors.white,
        paddingHorizontal: 11,
      }}
      contentContainerStyle={{
        flexGrow: 1,
      }}>
      <DynamicView>
        <DynamicView marginTop={18} marginBottom={7}>
          <DynamicText
            fontSize={15}
            fontFamily={fonts.DMSans500Medium}
            lineHeight={19.53}
            color={Colors.black}>
            Request a refund
          </DynamicText>
        </DynamicView>
        <DynamicView>
          <DynamicText
            fontSize={13}
            fontFamily={fonts.DMSans400Regular}
            lineHeight={16}
            color={Colors.grey}>
            If you have had an issue with a previous order and would like to
            request a refund, we recommend you contact the seller directly. If
            you are unsatisfied with their feedback, please fill our the form
            below.
          </DynamicText>
          <DynamicView marginTop={20}>
            <DynamicText
              fontSize={13}
              fontFamily={fonts.DMSans400Regular}
              lineHeight={16}
              color={Colors.grey}>
              Order satisfaction is a top priority for us. Dish Dash Dine will
              investigate the matter and get back to you within 72 hours.
            </DynamicText>
          </DynamicView>
        </DynamicView>
      </DynamicView>
      <DynamicView>
        <DynamicView marginTop={25}>
          <DynamicText
            fontFamily={fonts.DMSans700Bold}
            fontSize={15}
            lineHeight={20}
            color="#303030">
            Order
          </DynamicText>
          <DynamicView
            backgroundColor={Colors.lightestGrey}
            paddingVertical={11}
            paddingHorizontal={21}
            justifyContent="center"
            borderRadius={4}>
            <DynamicText
              fontSize={14}
              lineHeight={19}
              fontFamily={fonts.DMSans400Regular}
              color={Colors.grey}>
              {restaurant?.name} ({moment(order.submittedAt).format('DD MMM')})
              - £{Number(order?.total).toFixed(2)}
            </DynamicText>
          </DynamicView>
        </DynamicView>
        <DynamicView marginTop={25}>
          <DynamicText
            fontFamily={fonts.DMSans700Bold}
            fontSize={15}
            lineHeight={20}
            color="#303030">
            Card used
          </DynamicText>
          <DynamicView
            backgroundColor={Colors.lightestGrey}
            paddingVertical={11}
            paddingHorizontal={21}
            justifyContent="center"
            borderRadius={4}>
            <DynamicText
              fontSize={14}
              lineHeight={19}
              fontFamily={fonts.DMSans400Regular}
              color={Colors.grey}>
              **** **** **** {activeCard?.last4}
            </DynamicText>
          </DynamicView>
        </DynamicView>
        <DynamicView marginTop={25}>
          <DynamicText
            fontFamily={fonts.DMSans700Bold}
            fontSize={15}
            lineHeight={20}
            color="#303030">
            Describe your issue
          </DynamicText>
          <Controller
            control={control}
            rules={{required: true}}
            render={({field: {onChange, onBlur, value}}) => (
              <DynamicTextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder={'Please describe your issue '}
                backgroundColor="#F8F8F8"
                marginTop={4}
                borderRadius={4}
                paddingHorizontal={21}
                paddingVertical={11}
                minHeight={216}
                fontSize={14}
                lineHeight={19}
                fontFamily={fonts.DMSans400Regular}
                textAlignVertical="top"
                multiline
                fontWeight="400"
                color="#303030"
              />
            )}
            name="issue"
          />
        </DynamicView>
      </DynamicView>
      <DynamicView marginTop="auto" marginBottom={21}>
        <DishButton
          label="Submit your issue"
          variant="primary"
          icon="arrowright"
          onPress={() => onSubmit()}
        />
      </DynamicView>
    </ScrollView>
  );
};

export default HelpSupportRefundView;
