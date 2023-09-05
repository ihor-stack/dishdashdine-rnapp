import {ScrollView, useWindowDimensions} from 'react-native';
import React, {useRef, useState} from 'react';
import {DynamicText, DynamicTextInput, DynamicView} from '@/components';
import {Colors} from '@/themes';
import {Controller, UseFormGetValues, UseFormSetValue} from 'react-hook-form';
import styles from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DishButton from '@/components/DishButton';
import {CheckIcon, Divider, Icon, Radio, Select, Stack} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  IAdminRestaurantDelivery,
  IAdminRestaurantDeliveryDTO,
} from '@/api/admin_restaurant/model';
import DishMapView from '@/components/DishMapView';
import {useSelector} from 'react-redux';
import {accountSelectors} from '@/store/account';
import {DEFAULT_DISTANCE} from '@/constants';
import {isNumber} from 'lodash';
import DishSpinner from '@/components/DishSpinner';

export interface RestaurantDeliveryEntryViewProps {
  control?: any;
  showLoading?: boolean;
  onSubmit?: () => void;
  estDeliveryArr: any[];
  defaultAreaType?: number;
  action?: string;
  setDefaultAreaType: React.Dispatch<React.SetStateAction<string>>;
  setValue: UseFormSetValue<IAdminRestaurantDeliveryDTO>;
  distance: number;
  distance2: number;
  setDistance: React.Dispatch<React.SetStateAction<number>>;
  setDistance2: React.Dispatch<React.SetStateAction<number>>;
  onDeleteDelivery: () => Promise<void>;
  getValues: UseFormGetValues<IAdminRestaurantDeliveryDTO>;
}

const RestaurantDeliveryEntryView: React.FC<
  RestaurantDeliveryEntryViewProps
> = props => {
  const {
    control,
    getValues,
    showLoading,
    distance,
    distance2,
    onSubmit,
    action,
    estDeliveryArr,
    defaultAreaType,
    setDefaultAreaType,
    setValue,
    setDistance,
    setDistance2,
    onDeleteDelivery,
  } = props;

  const {width, height} = useWindowDimensions();
  const latitudeDelta = useRef(0.05).current;
  const longitudeDelta = useRef(0.05 * (width / height)).current;
  const currentLocation = useSelector(
    accountSelectors.selectCurrentUserLocation,
  );

  return (
    <DynamicView flex={1} backgroundColor={Colors.white}>
      {showLoading && <DishSpinner />}
      <ScrollView
        style={{
          backgroundColor: Colors.white,
        }}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 11,
        }}>
        <DynamicView marginTop={22} marginBottom={10}>
          <DynamicText style={styles.categoryLabelStyle}>Title</DynamicText>
          <Controller
            control={control}
            rules={{required: true}}
            render={({field: {onChange, onBlur, value}}) => (
              <DynamicTextInput
                marginTop={4}
                placeholder="Please enter a name"
                placeholderTextColor={Colors.grey}
                style={styles.textInputStyle}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
              />
            )}
            name="name"
          />
        </DynamicView>
        <DynamicView marginTop={13} marginBottom={16}>
          <DynamicText style={styles.categoryLabelStyle}>
            Delivery method:
          </DynamicText>
        </DynamicView>
        <Radio.Group
          value={String(defaultAreaType)}
          name="sort-group"
          accessibilityLabel="sort"
          onChange={val => {
            setDefaultAreaType(val);
          }}>
          <Stack
            flexDirection={'row'}
            justifyContent="space-between"
            space={3}
            paddingRight={2}
            width="full">
            <Radio
              colorScheme="red"
              value="1"
              icon={<Icon as={<MaterialCommunityIcons name="circle" />} />}>
              By Miles Radius
            </Radio>
            <Radio
              colorScheme="red"
              value="2"
              icon={<Icon as={<MaterialCommunityIcons name="circle" />} />}>
              By Postcode
            </Radio>
          </Stack>
        </Radio.Group>
        <Divider marginTop={19} />
        {defaultAreaType === 1 ? (
          <>
            <DynamicView
              marginTop={18}
              marginBottom={10}
              flexDirection="row"
              justifyContent="space-between">
              <DynamicView flex={1} marginRight={4}>
                <DynamicText style={styles.categoryLabelStyle}>
                  Starting Miles
                </DynamicText>
                <Controller
                  control={control}
                  rules={{required: true}}
                  render={({field: {onChange, onBlur, value}}) => (
                    <DynamicTextInput
                      marginTop={4}
                      placeholder="0"
                      placeholderTextColor={Colors.grey}
                      style={styles.textInputStyle}
                      keyboardType="number-pad"
                      value={value?.toString()}
                      onBlur={onBlur}
                      onChangeText={val => {
                        onChange(val);
                        if (val) {
                          if (isNumber(Number(val))) {
                            setDistance(Number(val));
                          }
                        } else {
                          setDistance2(DEFAULT_DISTANCE);
                        }
                      }}
                    />
                  )}
                  name="mileRadiusMin"
                />
              </DynamicView>
              <DynamicView flex={1} marginLeft={4}>
                <DynamicText style={styles.categoryLabelStyle}>
                  End Miles
                </DynamicText>
                <Controller
                  control={control}
                  rules={{required: true}}
                  render={({field: {onChange, onBlur, value}}) => (
                    <DynamicTextInput
                      marginTop={4}
                      placeholder="0"
                      placeholderTextColor={Colors.grey}
                      style={styles.textInputStyle}
                      keyboardType="number-pad"
                      value={value?.toString()}
                      onBlur={onBlur}
                      onChangeText={val => {
                        onChange(val);
                        if (val) {
                          if (isNumber(Number(val))) {
                            setDistance2(Number(val));
                          }
                        } else {
                          setDistance2(DEFAULT_DISTANCE);
                        }
                      }}
                    />
                  )}
                  name="mileRadiusMax"
                />
              </DynamicView>
            </DynamicView>
            <DynamicView width={width - 22} height={260}>
              {currentLocation && (
                <DishMapView
                  latitude={Number(currentLocation?.latitude)}
                  longitude={Number(currentLocation?.longitude)}
                  latitudeDelta={latitudeDelta}
                  longitudeDelta={longitudeDelta}
                  radius={distance}
                  maxRadius={distance2}
                  restaurants={[]}
                  showRadius={distance !== DEFAULT_DISTANCE}
                  showMaxRadius={distance2 !== DEFAULT_DISTANCE}
                />
              )}
            </DynamicView>
          </>
        ) : (
          <DynamicView
            marginTop={13}
            marginBottom={10}
            flexDirection="row"
            justifyContent="space-between">
            <DynamicView flex={1} marginLeft={4}>
              <DynamicText style={styles.categoryLabelStyle}>
                By Postcode
              </DynamicText>
              <Controller
                control={control}
                rules={{required: true}}
                render={({field: {onChange, onBlur, value}}) => (
                  <DynamicTextInput
                    marginTop={4}
                    placeholder=""
                    placeholderTextColor={Colors.grey}
                    style={styles.textInputStyle}
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                  />
                )}
                name="postCode"
              />
            </DynamicView>
          </DynamicView>
        )}

        <DynamicView marginTop={13} marginBottom={10}>
          <DynamicText style={styles.categoryLabelStyle}>Cost</DynamicText>
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => {
              return (
                <DynamicTextInput
                  marginTop={4}
                  placeholder="£0.00"
                  placeholderTextColor={Colors.grey}
                  style={styles.textInputStyle}
                  keyboardType="decimal-pad"
                  value={value?.toString()}
                  onBlur={onBlur}
                  onChangeText={onChange}
                />
              );
            }}
            name="price"
          />
        </DynamicView>
        <Divider marginTop={19} />
        <DynamicView marginTop={13} marginBottom={10}>
          <DynamicText style={styles.categoryLabelStyle}>
            Estimated delivery time
          </DynamicText>
          <Select
            minWidth="200"
            style={styles.selectInputStyle}
            _selectedItem={{
              bg: Colors.lightGrey,
              endIcon: <CheckIcon size="5" />,
            }}
            selectedValue={getValues() ? getValues('estimatedTime') : undefined}
            onValueChange={itemValue => {
              setValue('estimatedTime', itemValue);
            }}
            mt={1}>
            {estDeliveryArr &&
              estDeliveryArr.map((item, index) => {
                return (
                  <Select.Item
                    label={item.label}
                    value={item.label}
                    key={index}
                  />
                );
              })}
          </Select>
        </DynamicView>
      </ScrollView>
      <DynamicView marginBottom={21} marginHorizontal={21}>
        <DishButton
          icon="arrowright"
          label="Save Delivery"
          variant="primary"
          showSpinner={showLoading}
          onPress={onSubmit}
        />
        {action === 'update' && (
          <DishButton
            showIcon={false}
            label="Delete Delivery"
            variant="lightGrey"
            onPress={onDeleteDelivery}
          />
        )}
      </DynamicView>
    </DynamicView>
  );
};

export default RestaurantDeliveryEntryView;
