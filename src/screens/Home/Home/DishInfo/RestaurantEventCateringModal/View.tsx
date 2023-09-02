import React from 'react';
import ActionSheet from 'react-native-actions-sheet';
import DishSpinner from '@/components/DishSpinner';
import {DynamicText, DynamicTextInput, DynamicView} from '@/components';
import RestaurantInfoAvatar from '../RestaurantInfoAvatar';
import {Colors, fonts} from '@/themes';
import {Checkbox, Divider, ScrollView} from 'native-base';
import DishButton from '@/components/DishButton';
import {Controller} from 'react-hook-form';
import DishInputDatePicker from '@/components/DishInputDatePicker';

export interface RestaurantEventCateringModalProps {
  width: any;
  restaurant: any;
  restaurantId: any;
  isChecked: any;
  setIsChecked: any;
  isLoading: any;
  setIsLoading: any;
  curDate: any;
  setCurDate: any;
  dispatch: any;
  onSubmit: any;
  setValue: any;
  control: any;
  reset: any;
}

const RestaurantEventCateringModalView = (
  props: RestaurantEventCateringModalProps,
) => {
  const {
    width,
    restaurant,
    isChecked,
    setIsChecked,
    isLoading,
    onSubmit,
    curDate,
    setCurDate,
    control,
    reset,
  } = props;
  return (
    <ActionSheet
      id={'EventsCateringModal'}
      gestureEnabled
      indicatorStyle={{
        height: 0,
      }}
      containerStyle={{
        paddingTop: 54,
      }}
      onBeforeShow={() => {
        setCurDate(new Date());
      }}
      onClose={() => {
        reset && reset();
      }}>
      {isLoading && <DishSpinner />}
      <RestaurantInfoAvatar restaurant={restaurant} />
      <ScrollView
        position="relative"
        keyboardShouldPersistTaps={'never'}
        contentContainerStyle={{
          flexGrow: 1,
        }}>
        <DynamicView
          alignItems="center"
          paddingBottom={36}
          paddingHorizontal={10}>
          <DynamicText
            fontFamily={fonts.DMSans700Bold}
            fontSize={14}
            lineHeight={18}
            textAlign="center"
            color={Colors.black}>
            Interested in our events & {'\n'} catering service?
          </DynamicText>
          <DynamicView marginTop={29}>
            <DynamicText
              fontFamily={fonts.DMSans400Regular}
              fontSize={13}
              lineHeight={16}
              textAlign="center"
              color={Colors.grey}>
              Thank you for your interest. Please take a moment to fill out the
              form below and we will be in contact with you.
            </DynamicText>
          </DynamicView>
        </DynamicView>
        <Divider bgColor={Colors.lightGrey} padding={1} />
        <DynamicView paddingHorizontal={11} paddingVertical={23}>
          <DishInputDatePicker
            label="Event date & time"
            placeholder="Event date & time"
            dateValue={curDate}
            onDateChanged={(val: any) => setCurDate(val.date)}
          />
          <DynamicView paddingTop={22}>
            <DynamicText
              fontFamily={fonts.DMSans700Bold}
              fontSize={15}
              lineHeight={19.53}
              color={Colors.black}>
              Number of attendees
            </DynamicText>
            <Controller
              control={control}
              rules={{required: true}}
              render={({field: {onChange, onBlur, value}}) => (
                <DynamicTextInput
                  testID="@test-id/reg-input-numberOfAttendees"
                  onBlur={() => onBlur()}
                  backgroundColor={Colors.lightGrey}
                  width={width - 22}
                  paddingHorizontal={21}
                  paddingVertical={11}
                  fontSize={14}
                  fontFamily={fonts.DMSans400Regular}
                  lineHeight={18.23}
                  marginTop={3}
                  borderRadius={4}
                  placeholder="How many people are attending?"
                  value={value}
                  placeholderTextColor={Colors.grey}
                  onChangeText={onChange}
                  keyboardType={'number-pad'}
                />
              )}
              name="numberOfAttendees"
            />
          </DynamicView>
          <DynamicView paddingTop={22}>
            <DynamicText
              fontFamily={fonts.DMSans700Bold}
              fontSize={15}
              lineHeight={19.53}
              color={Colors.black}>
              Description
            </DynamicText>
            <Controller
              control={control}
              rules={{required: true}}
              render={({field: {onChange, onBlur, value}}) => (
                <DynamicTextInput
                  testID="@test-id/reg-input-eventDescription"
                  onBlur={() => onBlur()}
                  backgroundColor={Colors.lightGrey}
                  width={width - 22}
                  paddingHorizontal={21}
                  paddingVertical={11}
                  fontSize={14}
                  fontFamily={fonts.DMSans400Regular}
                  lineHeight={18.23}
                  marginTop={3}
                  borderRadius={4}
                  placeholder="Please provide details on your event here"
                  value={value}
                  placeholderTextColor={Colors.grey}
                  onChangeText={onChange}
                  multiline
                  height={150}
                />
              )}
              name="eventDescription"
            />
          </DynamicView>

          <DynamicView
            flexDirection="row"
            alignItems="center"
            marginTop={20}
            marginBottom={26}>
            <DynamicView marginRight={11}>
              <Checkbox
                value=""
                // isChecked={!!user?.offerNotifications}
                isChecked={isChecked}
                onChange={c => {
                  setIsChecked(c);
                }}
                accessibilityLabel="checkbox"
                colorScheme="danger"
              />
            </DynamicView>
            <DynamicView>
              <DynamicText
                fontFamily={fonts.DMSans700Bold}
                fontSize={15}
                lineHeight={20}
                color={Colors.black}>
                I am happy to be contacted by {restaurant?.name}
              </DynamicText>
            </DynamicView>
          </DynamicView>

          <DishButton
            label="Submit form"
            variant="primary"
            showIcon={false}
            showSpinner={isLoading}
            onPress={onSubmit}
          />
        </DynamicView>
      </ScrollView>
    </ActionSheet>
  );
};

export default RestaurantEventCateringModalView;
