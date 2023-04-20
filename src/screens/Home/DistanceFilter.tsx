import React, { useState, useEffect } from 'react';
import { Icon, Text, HStack, VStack, Divider, Button } from 'native-base';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
// import Slider from '@react-native-community/slider'
import FilterContainer from './FilterContainer';
import Colors from '@/themes/colors';
import { Dimensions, useWindowDimensions } from 'react-native';
import { homeSelectors, setShowDistanceFilter } from '@/store/home';
import { useDispatch, useSelector } from 'react-redux';
import DishMapView from '@/components/DishMapView';
import { accountSelectors, setCurrentUserDistance } from '@/store/account';
import { DynamicText, DynamicView } from '@/components';
import DishSlider from '@/components/DishSlider';
import { DEFAULT_DISTANCE } from '@/constants';
import { fonts } from '@/themes';
import DishSpinner from '@/components/DishSpinner';
import { fetchRestaurant } from '@/store/restaurants/thunk';
import { restaurantSelectors } from '@/store/restaurants';
import { isArray, isNull } from 'lodash';
import { authSelectors } from '@/store/authentication';
import { IUser } from '@/api/user';
import { addressSelectors } from '@/store/address';
import { IAddress, IFindRestaurantParams } from '@/api/generic';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const DistanceFilter = () => {
  const dispatch = useDispatch<any>();
  const { width } = useWindowDimensions();

  const [isSaving, setIsSaving] = useState(false);
  const [distance, setDistance] = useState(DEFAULT_DISTANCE);
  const [latitudeDelta, setLatitudeDelta] = useState(0.05);
  const [longitudeDelta, setLongitudeDelta] = useState(
    0.05 * (screenWidth / screenHeight),
  );

  const currentLocation = useSelector(
    accountSelectors.selectCurrentUserLocation,
  );

  const dist: number = useSelector(accountSelectors.selectCurrentUserRadius);
  const showDistanceFilter = useSelector(homeSelectors.showDistanceFilter);
  const restaurants = useSelector(restaurantSelectors.selectRestaurants);
  const isAuthenticated = useSelector(authSelectors.isAuthenticated);
  const homeOrderType = useSelector(homeSelectors.showOrderType);
  const currentUser = useSelector(accountSelectors.selectCurrentUser) as IUser;
  const defaultAddress = useSelector(
    addressSelectors.selectDefaultAddress,
  ) as IAddress;

  useEffect(() => {
    setDistance(dist)
  }, []);

  const refreshRestaurant = async () => {
    if (currentLocation) {
      let params: IFindRestaurantParams = {
        Latitude: currentLocation?.latitude,
        Longitude: currentLocation?.longitude,
        RadiusMiles: distance,
        // IncludeOpenOnly: true,
      };

      if (!isNull(homeOrderType)) {
        params = {
          ...params,
          OrderType: homeOrderType,
        };
      } else {
        params = {
          ...params,
          IncludeCateringRestaurants: true,
        };
      }

      if (defaultAddress?.postCode) {
        dispatch(
          fetchRestaurant({
            ...params,
            PostCode: defaultAddress?.postCode,
          }),
        );
      } else {
        dispatch(fetchRestaurant(params));
      }
    }
  };

  const onDistanceChanged = async (v: number) => {
    let params: IFindRestaurantParams = {
      Latitude: currentLocation?.latitude,
      Longitude: currentLocation?.longitude,
      RadiusMiles: v && Math.floor(v),
      // IncludeOpenOnly: true,
    };

    if (!isNull(homeOrderType)) {
      params = {
        ...params,
        OrderType: homeOrderType,
        IncludeCateringRestaurants: false,
      };
    } else {
      params = {
        ...params,
        IncludeCateringRestaurants: true,
      };
    }

    if (defaultAddress?.postCode) {
      dispatch(
        fetchRestaurant({
          ...params,
          PostCode: defaultAddress?.postCode,
        }),
      );
    } else {
      dispatch(fetchRestaurant(params));
    }
  };

  const onUpdateRadius = async () => {
    setIsSaving(true);

    await dispatch(setCurrentUserDistance(distance));
    refreshRestaurant();
    setIsSaving(false);
    setTimeout(() => {
      dispatch(setShowDistanceFilter());
    }, 300);
  };

  const onChangeDistance = (v: number) => {
    let ltDelta = latitudeDelta;
    let lgDelta = latitudeDelta;

    const newDistance = Math.floor(v);
    setDistance(newDistance);

    if ([3, 6, 9, 15].includes(newDistance)) {
      if (distance < newDistance) {
        setLatitudeDelta(ltDelta * 2);
        setLongitudeDelta(lgDelta * 2);
      } else {
        setLatitudeDelta(ltDelta / 2);
        setLongitudeDelta(lgDelta / 2);
      }
    } else if (newDistance < 3) {
      setLatitudeDelta(0.05);
      setLongitudeDelta(0.05 * (screenWidth / screenHeight));
    }
  };

  return (
    <FilterContainer
      type="showDistanceFilter"
      homeState={showDistanceFilter}
      useDynamicHeight>
      {isSaving && <DishSpinner />}
      <VStack space={2} p={3}>
        <HStack space={2} alignItems="center">
          <Icon
            as={<SimpleLineIcons name="location-pin" />}
            size={5}
            color={Colors.ember}
          />
          <DynamicText
            fontSize={15}
            lineHeight={19}
            fontFamily={fonts.DMSans700Bold}>
            Collection Radius
          </DynamicText>
        </HStack>
        <DynamicView
          marginBottom={20}
          marginRight={20}
          marginLeft={20}
          marginTop={5}
          position="relative">
          <DishSlider
            value={Number(distance)}
            onChange={onChangeDistance}
            onChangeEnd={onDistanceChanged}
          />
        </DynamicView>
      </VStack>
      <DynamicView width={width} height={380}>
        {currentLocation && (
          <DishMapView
            showRadius={true}
            latitude={Number(currentLocation?.latitude)}
            longitude={Number(currentLocation?.longitude)}
            latitudeDelta={latitudeDelta}
            longitudeDelta={longitudeDelta}
            radius={distance}
            restaurants={
              isAuthenticated && isArray(restaurants) ? restaurants : []
            }
          />
        )}
      </DynamicView>
      <Divider bgColor={Colors.lightGrey} />
      <Button variant="link" onPress={onUpdateRadius}>
        <Text color={Colors.ember} fontSize={16}>
          Update radius
        </Text>
      </Button>
    </FilterContainer>
  );
};

export default DistanceFilter;
