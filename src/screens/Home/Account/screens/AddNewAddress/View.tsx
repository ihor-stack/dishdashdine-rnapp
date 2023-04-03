import React, {useEffect, useState} from 'react';
import {DynamicText, DynamicTextInput, DynamicView} from '@/components';
import {Icon, Radio, Stack} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors, fonts} from '@/themes';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {KeyboardAvoidingView, Platform, StyleSheet} from 'react-native';
import {Controller} from 'react-hook-form';
import {ADDRESS_TYPE_ARR} from '@/constants';
import {ScrollView} from 'react-native-gesture-handler';
import DishSpinner from '@/components/DishSpinner';
import {IAddressResolveResponse} from '@/api/generic';
import DishCurrentLocation from '@/components/DishCurrentLocation';
import DishButton from '@/components/DishButton';
import {filter} from 'lodash';

export interface AddNewAddressProps {
  showLoading: boolean;
  control?: any;
  onSubmit: () => Promise<any>;
  addressType: number;
  setAddressType: any;
  setValue: any;
  currentLocation: any;
  curLocation?: IAddressResolveResponse;
  onUseCurrentLocation?: (geolocation: any) => void | any;
  isFrom: string;
  action: string;
  onSetDefaultAddress: () => void | any;
}

const AddNewAddress = (props: AddNewAddressProps, ref: any) => {
  const {
    control,
    onSubmit,
    showLoading,
    addressType,
    setAddressType,
    setValue,
    currentLocation,
    curLocation,
    onUseCurrentLocation,
    isFrom,
    action,
    onSetDefaultAddress,
  } = props;

  const [showOthersAddressName, setShowOthersAddressName] = useState(false);

  useEffect(() => {
    setTimeout(() => {}, 3000);
  }, []);

  return (
    <>
      <DynamicView
        borderBottomWidth={1}
        borderBottomColor="#F2F4F5"
        backgroundColor={Colors.white}>
        <DishCurrentLocation
          onPressLocation={({latitude, longitude}) =>
            onUseCurrentLocation && onUseCurrentLocation({latitude, longitude})
          }
        />
      </DynamicView>
      <KeyboardAvoidingView
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.container}
          ref={ref}>
          {showLoading && <DishSpinner />}
          <DynamicView paddingHorizontal={11} flex={1}>
            <DynamicView marginTop={21}>
              <DynamicText
                fontFamily={fonts.DMSans700Bold}
                fontSize={15}
                lineHeight={20}
                color={Colors.black}>
                Street Number
              </DynamicText>
              <Controller
                control={control}
                rules={{required: true}}
                render={({field: {onChange, onBlur, value}}) => (
                  <DynamicTextInput
                    testID="@test-id/reg-input-streetNo"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder={'Street Number'}
                    placeholderTextColor={Colors.grey}
                    backgroundColor="#F8F8F8"
                    marginTop={4}
                    borderRadius={4}
                    paddingHorizontal={21}
                    paddingVertical={11}
                    fontSize={14}
                    lineHeight={19}
                    fontFamily={fonts.DMSans400Regular}
                    fontWeight="400"
                    color={Colors.black}
                  />
                )}
                name="streetNumber"
              />
            </DynamicView>
            <DynamicView marginTop={21}>
              <DynamicText
                fontFamily={fonts.DMSans700Bold}
                fontSize={15}
                lineHeight={20}
                color={Colors.black}>
                Street Name
              </DynamicText>
              <Controller
                control={control}
                rules={{required: true}}
                render={({field: {onChange, onBlur, value}}) => (
                  <DynamicTextInput
                    testID="@test-id/reg-input-streetName"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder={'Street No.'}
                    placeholderTextColor={Colors.grey}
                    backgroundColor="#F8F8F8"
                    marginTop={4}
                    borderRadius={4}
                    paddingHorizontal={21}
                    paddingVertical={11}
                    fontSize={14}
                    lineHeight={19}
                    fontFamily={fonts.DMSans400Regular}
                    fontWeight="400"
                    color={Colors.black}
                  />
                )}
                name="street"
              />
            </DynamicView>
            <DynamicView marginTop={21}>
              <DynamicText
                fontFamily={fonts.DMSans700Bold}
                fontSize={15}
                lineHeight={20}
                color={Colors.black}>
                City
              </DynamicText>
              <Controller
                control={control}
                rules={{required: true}}
                render={({field: {onChange, onBlur, value}}) => (
                  <DynamicTextInput
                    testID="@test-id/reg-input-city"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder={'City'}
                    placeholderTextColor={Colors.grey}
                    backgroundColor="#F8F8F8"
                    marginTop={4}
                    borderRadius={4}
                    paddingHorizontal={21}
                    paddingVertical={11}
                    fontSize={14}
                    lineHeight={19}
                    fontFamily={fonts.DMSans400Regular}
                    fontWeight="400"
                    color={Colors.black}
                  />
                )}
                name="city"
              />
            </DynamicView>
            <DynamicView marginTop={21}>
              <DynamicText
                fontFamily={fonts.DMSans700Bold}
                fontSize={15}
                lineHeight={20}
                color={Colors.black}>
                Country
              </DynamicText>
              <Controller
                control={control}
                rules={{required: true}}
                render={({field: {onChange, onBlur, value}}) => (
                  <DynamicTextInput
                    testID="@test-id/reg-input-country"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder={'Country'}
                    placeholderTextColor={Colors.grey}
                    backgroundColor="#F8F8F8"
                    marginTop={4}
                    borderRadius={4}
                    paddingHorizontal={21}
                    paddingVertical={11}
                    fontSize={14}
                    lineHeight={19}
                    fontFamily={fonts.DMSans400Regular}
                    fontWeight="400"
                    color={Colors.black}
                  />
                )}
                name="country"
              />
            </DynamicView>
            <DynamicView marginTop={21}>
              <DynamicText
                fontFamily={fonts.DMSans700Bold}
                fontSize={15}
                lineHeight={20}
                color={Colors.black}>
                Postal Code
              </DynamicText>
              <Controller
                control={control}
                rules={{required: true}}
                render={({field: {onChange, onBlur, value}}) => (
                  <DynamicTextInput
                    testID="@test-id/reg-input-postal"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder={'Postal Code'}
                    placeholderTextColor={Colors.grey}
                    backgroundColor="#F8F8F8"
                    marginTop={4}
                    borderRadius={4}
                    paddingHorizontal={21}
                    paddingVertical={11}
                    fontSize={14}
                    lineHeight={19}
                    fontFamily={fonts.DMSans400Regular}
                    fontWeight="400"
                    color={Colors.black}
                  />
                )}
                name="postCode"
              />
            </DynamicView>
            <DynamicView marginTop={21}>
              <DynamicText
                fontFamily={fonts.DMSans700Bold}
                fontSize={15}
                lineHeight={20}
                color={Colors.black}>
                Address Type
              </DynamicText>
              <Radio.Group
                name="addressTypeGroup"
                value={String(addressType)}
                onChange={nextValue => {
                  setAddressType(String(nextValue));
                  setValue('addressType', String(nextValue));
                  setShowOthersAddressName(nextValue === '4');
                }}>
                <Stack
                  direction={{base: 'column', md: 'row'}}
                  alignItems={{
                    base: 'flex-start',
                    md: 'center',
                  }}
                  paddingTop={2}
                  space={1}
                  w="75%"
                  maxW="300px">
                  {filter(ADDRESS_TYPE_ARR, add => add.code !== 1).map(
                    (data, key) => {
                      return (
                        <Radio
                          value={String(data.code)}
                          key={key}
                          my="1"
                          colorScheme="red"
                          icon={
                            <Icon
                              as={<MaterialCommunityIcons name="circle" />}
                            />
                          }>
                          {data.name}
                        </Radio>
                      );
                    },
                  )}
                </Stack>
              </Radio.Group>
            </DynamicView>
            {showOthersAddressName && (
              <DynamicView marginTop={21}>
                <DynamicText
                  fontFamily={fonts.DMSans700Bold}
                  fontSize={15}
                  lineHeight={20}
                  color={Colors.black}>
                  Other's Address Name
                </DynamicText>
                <Controller
                  control={control}
                  rules={{required: true}}
                  render={({field: {onChange, onBlur, value}}) => (
                    <DynamicTextInput
                      testID="@test-id/reg-input-streetName"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      placeholder={'Address Name'}
                      placeholderTextColor={Colors.grey}
                      backgroundColor="#F8F8F8"
                      marginTop={4}
                      borderRadius={4}
                      paddingHorizontal={21}
                      paddingVertical={11}
                      fontSize={14}
                      lineHeight={19}
                      fontFamily={fonts.DMSans400Regular}
                      fontWeight="400"
                      color={Colors.black}
                    />
                  )}
                  name="otherAddressType"
                />
              </DynamicView>
            )}
            {/* onSubmit */}
          </DynamicView>
          <DynamicView marginTop="auto" marginBottom={21} marginHorizontal={11}>
            <DishButton
              variant="primary"
              icon="arrowright"
              showSpinner={showLoading}
              label="Save"
              onPress={onSubmit}
            />
            {isFrom !== 'register' && action === 'update' && (
              <DishButton
                showIcon={false}
                showSpinner={showLoading}
                label="Set as Default Address"
                onPress={onSetDefaultAddress}
              />
            )}
          </DynamicView>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default React.forwardRef(AddNewAddress);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});
