import React, {useEffect, useState} from 'react';
import {
  Box,
  Icon,
  Text,
  HStack,
  VStack,
  Divider,
  Button,
  useToast,
} from 'native-base';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '@/themes/colors';
import FilterContainer from './FilterContainer';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {homeSelectors, setShowAddressFilter} from '@/store/home';
import {
  accountSelectors,
  setCurrentUserAddress,
  setCurrentUserLocation,
} from '@/store/account';
import DishSpinner from '@/components/DishSpinner';
import {getUserCurrentAddress} from '@/store/account/thunk';
import {captureErrorException} from '@/utils/error-handler';
import {IAddress} from '@/api/generic';
import {addressSelectors} from '@/store/address';
import {getAddressTypeLabel} from '@/utils/common';
import {FlatList, StyleSheet} from 'react-native';
import DishCurrentLocation from '@/components/DishCurrentLocation';
import {DynamicPressable, DynamicText, DynamicView} from '@/components';
import EmptyState from '@/components/EmptyState';
import {isEmpty} from 'lodash';
import {fonts} from '@/themes';
import {IUser} from '@/api/user';
import DishRestaurantSearchBar from '@/components/DishRestaurantSearchBar';
import PlacesService, {PredictionType} from '@/api/google-places';
import {showSuccessMessage} from '@/components/DishFlashMessage';

const AddressFilter = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [hasCurAddress, setHasCurAddress] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [address, setAddress] = useState('');
  const [curLocation, setCurLocation] = useState<any>({});
  const [searchLocation, setSearchLocation] = useState('');
  const [predictionsArr, setPredictions] = useState<PredictionType[]>([]);

  const curAddress: any = useSelector(
    accountSelectors.selectCurrentUserAddress,
  );
  const currentGeolocation: any = useSelector(
    accountSelectors.selectCurrentUserLocation,
  );
  const showAddressFilter = useSelector(homeSelectors.showAddressFilter);
  const myAddresses = useSelector(addressSelectors.selectMyAddress);
  const defaultAddress = useSelector(addressSelectors.selectDefaultAddress);
  const currentUser = useSelector(accountSelectors.selectCurrentUser) as IUser;

  const dispatch = useDispatch<any>();
  const navigation = useNavigation<any>();
  const toast = useToast();

  useEffect(() => {
    if (!isEmpty(curAddress)) {
      setHasCurAddress(true);
      setAddress(curAddress);
      setCurLocation(currentGeolocation);
    } else if (!isEmpty(myAddresses)) {
      if (!isEmpty(defaultAddress)) {
        setHasCurAddress(true);
        setAddress(defaultAddress.formattedAddress);
        dispatch(setCurrentUserAddress(defaultAddress.formattedAddress));
        dispatch(
          setCurrentUserLocation({
            latitude: defaultAddress.latitude,
            longitude: defaultAddress.longitude,
          }),
        );
        setCurLocation({
          latitude: defaultAddress.latitude,
          longitude: defaultAddress.longitude,
        });
      } else {
        const _address = myAddresses.find(
          (addr: IAddress) => addr.addressType === 1,
        );
        if (_address) {
          setHasCurAddress(true);
          setAddress(_address.formattedAddress);
          dispatch(setCurrentUserAddress(_address.formattedAddress));
          dispatch(
            setCurrentUserLocation({
              latitude: _address.latitude,
              longitude: _address.longitude,
            }),
          );
          setCurLocation({
            latitude: _address.latitude,
            longitude: _address.longitude,
          });
        }
      }
    } else {
      setHasCurAddress(false);
    }
  }, [myAddresses, curAddress, defaultAddress, currentGeolocation, dispatch]);

  useEffect(() => {
    if (!isEmpty(searchLocation)) {
      getPlacePredictions(searchLocation);
    } else {
      setPredictions([]);
    }
  }, [searchLocation]);

  const getPlacePredictions = async (searchText: string) => {
    setShowLoading(true);
    try {
      const response: any = await PlacesService.placePredictions(searchText);
      if (response && response?.predictions) {
        const {predictions} = response;
        setPredictions(predictions);
      }
      setShowLoading(false);
    } catch (e) {
      setShowLoading(false);
      captureErrorException(e);
    }
  };

  const getPlaceIdLocation = async (placeId: string) => {
    try {
      setShowLoading(true);
      const response = await PlacesService.getGeolocationByPlaceId(placeId);
      if (response) {
        const {
          result: {
            name,
            geometry: {location},
          },
        } = response;
        if (location) {
          const {lat, lng} = location;
          await dispatch(setCurrentUserAddress(name));
          await dispatch(
            setCurrentUserLocation({latitude: lat, longitude: lng}),
          );
          await dispatch(setShowAddressFilter());
          setSearchLocation('');
          setPredictions([]);
        }
        setShowLoading(false);
      }
      setShowLoading(false);
    } catch (error) {
      setShowLoading(false);
      captureErrorException(error);
    }
  };

  const onUpdateAddress = () => {
    dispatch(setShowAddressFilter());
    setTimeout(() => {
      navigation.navigate('AddNewAddress', {
        isFrom: 'home',
        action: 'add',
        geolocation: curLocation,
      });
    }, 300);
  };

  const onAddCurAddress = async (item: IAddress) => {
    if (currentUser?.noAuth) {
      return;
    }

    dispatch(setShowAddressFilter());
    setIsSaving(true);
    try {
      await dispatch(setCurrentUserAddress(item.formattedAddress));
      await dispatch(
        setCurrentUserLocation({
          latitude: item?.latitude,
          longitude: item?.longitude,
        }),
      );
      toast.show({
        placement: 'top',
        duration: 2500,
        render: () => {
          return showSuccessMessage(
            'Address updated',
            'You have successfully updated your address',
          );
        },
        onCloseComplete() {
          setIsSaving(false);
        },
      });
    } catch (error) {
      setIsSaving(false);
      captureErrorException(error);
    }
  };

  const onSaveCurrentLocation = async ({
    latitude,
    longitude,
  }: {
    latitude: number;
    longitude: number;
  }) => {
    setIsSaving(true);
    try {
      await dispatch(
        getUserCurrentAddress({
          Latitude: latitude,
          Longitude: longitude,
        }),
      );
      await dispatch(
        setCurrentUserLocation({
          latitude,
          longitude,
        }),
      );
      setIsSaving(false);

      toast.show({
        placement: 'top',
        duration: 2500,
        render: () => {
          return (
            // <DishToast
            //   title="Address updated"
            //   message="You have successfully updated your address"
            //   variant="success"
            // />
            showSuccessMessage(
              'Address updated',
              'You have successfully updated your address',
            )
          );
        },
        onCloseComplete() {
          dispatch(setShowAddressFilter());
        },
      });
    } catch (error) {
      setIsSaving(false);
      captureErrorException(error);
    }
  };

  const onSelectLocation = (place: PredictionType) => {
    let newData: any = [...predictionsArr];
    newData = newData.map((item: PredictionType) => {
      if (place.place_id === item.place_id) {
        getPlaceIdLocation(item.place_id);
        return {
          ...item,
          selected: true,
        };
      } else {
        return {
          ...item,
          selected: false,
        };
      }
    });
    setPredictions(newData);
  };

  const getAddressIcon = (addressType: number) => {
    switch (addressType) {
      case 1:
        return (
          <Icon
            as={<FontAwesome name="location-arrow" />}
            color={Colors.ember}
            size={5}
          />
        );
      case 2:
        return (
          <Icon as={<Feather name="home" />} color={Colors.ember} size={5} />
        );
      case 3:
        return (
          <Icon
            as={<MaterialIcons name="work-outline" />}
            color={Colors.ember}
            size={5}
          />
        );
      case 3:
        return (
          <Icon
            as={<AntDesign name="enviromento" />}
            color={Colors.ember}
            size={5}
          />
        );
      default:
        return (
          <Icon
            as={<FontAwesome name="location-arrow" />}
            color={Colors.ember}
            size={5}
          />
        );
    }
  };

  const renderAddressListitem = ({item}: {item: IAddress}) => {
    return (
      <HStack space={1} p={4}>
        {getAddressIcon(item.addressType)}
        <DynamicPressable onPress={() => onAddCurAddress(item)}>
          <Box>
            <Text>{getAddressTypeLabel(item.addressType)}</Text>
            <Text fontSize="xs" color={Colors.grey}>
              {item.formattedAddress}
            </Text>
          </Box>
        </DynamicPressable>
      </HStack>
    );
  };

  const predictedLocationItem = ({
    item,
    index,
  }: {
    item: PredictionType;
    index: number;
  }) => {
    return (
      <DynamicPressable
        flexDirection="row"
        key={index}
        borderBottomColor={Colors.lightGrey}
        borderBottomWidth={1}
        paddingVertical={16}
        style={item.selected && styles.selected}
        onPress={() => onSelectLocation(item)}>
        <DynamicView marginLeft={14}>
          <DynamicText
            fontFamily={fonts.DMSans400Regular}
            fontWeight="400"
            fontSize={15}
            lineHeight={18}
            color="#303030">
            {item.structured_formatting?.main_text}
          </DynamicText>
          <DynamicText
            fontFamily={fonts.DMSans400Regular}
            fontWeight="400"
            fontSize={13}
            lineHeight={16}
            color="#818183">
            {item.description}
          </DynamicText>
        </DynamicView>
      </DynamicPressable>
    );
  };

  return (
    <>
      {isSaving && <DishSpinner />}
      <FilterContainer
        type="showAddressFilter"
        homeState={showAddressFilter}
        useDynamicHeight>
        <VStack space={2} bgColor={Colors.lightGrey}>
          <DynamicPressable onPress={() => onSaveCurrentLocation(curLocation)}>
            <VStack space={1} bgColor={Colors.white} p={4}>
              <Text color={Colors.grey} bold>
                Current Address
              </Text>
              {!hasCurAddress ? (
                <HStack alignItems="center" space={1}>
                  <EmptyState
                    title="No current address found"
                    message={'Please select an address to use'}
                  />
                </HStack>
              ) : (
                <HStack alignItems="center" space={1} pt={1}>
                  <Icon
                    as={<SimpleLineIcons name="location-pin" />}
                    color={Colors.ember}
                    size={4}
                  />
                  <Text>{address}</Text>
                </HStack>
              )}
            </VStack>
          </DynamicPressable>
          {!currentUser?.noAuth && (
            <VStack space={1} bgColor={Colors.white} p={3}>
              <FlatList
                style={myAddresses?.length > 3 ? {height: 250} : {height: 'auto'}}
                data={myAddresses}
                keyExtractor={item => item.id}
                renderItem={renderAddressListitem}
                ListHeaderComponent={() => (
                  <Text color={Colors.grey} bold>
                    Saved addresses
                  </Text>
                )}
                ItemSeparatorComponent={() => (
                  <Divider bgColor={Colors.lightGrey} />
                )}
                ListEmptyComponent={() => (
                  <DynamicView paddingTop={5}>
                    <EmptyState
                      title="No address found"
                      message={'You have no saved addresses'}
                    />
                  </DynamicView>
                )}
              />
            </VStack>
          )}
          <VStack bgColor={Colors.white}>
            <VStack space={4} p={3}>
              <Text color={Colors.grey} bold>
                Add new address
              </Text>
            </VStack>
            {currentUser?.noAuth && (
              <DishRestaurantSearchBar
                variant="alt"
                placeholder="Start typing address or postcode"
                searchText={searchLocation}
                onSearchText={setSearchLocation}
              />
            )}
            <DishCurrentLocation
              onPressLocation={({latitude, longitude}) =>
                onSaveCurrentLocation({latitude, longitude})
              }
            />
            <Divider bgColor={Colors.lightGrey} />
            {!currentUser?.noAuth && (
              <DynamicView
                justifyContent="center"
                alignItems="center"
                paddingTop={10}
                paddingBottom={0}>
                <Button variant="link" onPress={onUpdateAddress}>
                  <DynamicText
                    fontFamily={fonts.DMSans500Medium}
                    fontSize={15}
                    lineHeight={19.53}
                    color={Colors.ember}
                    alignSelf="center">
                    Add new address
                  </DynamicText>
                </Button>
              </DynamicView>
            )}

            {currentUser?.noAuth && (
              <VStack space={1} bgColor={Colors.white} p={3}>
                {showLoading && <DishSpinner />}
                <FlatList
                  style={
                    predictionsArr?.length > 3
                      ? {height: 250}
                      : {height: 'auto'}
                  }
                  data={predictionsArr}
                  renderItem={predictedLocationItem}
                  keyExtractor={(item: PredictionType) => item.place_id}
                />
              </VStack>
            )}
          </VStack>
        </VStack>
      </FilterContainer>
    </>
  );
};

export default AddressFilter;

const styles = StyleSheet.create({
  selected: {
    backgroundColor: '#E0040425',
  },
});
