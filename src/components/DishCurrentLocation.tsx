import React, {useState} from 'react';
import {ActivityIndicator} from 'react-native';
import {DynamicPressable, DynamicText, DynamicView} from '@/components/index';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors, fonts} from '@/themes';
import {
  getCurrentGeolocation,
  getCurrentLocationAddressByLatLng,
} from '@/utils/geolocation';
import {IAddressResolveResponse} from '@/api/generic';
import {captureErrorException} from '@/utils/error-handler';
import PlacesService from '@/api/google-places';
import {isEmpty} from 'lodash';
import {authSelectors} from '@/store/authentication';
import {useSelector} from 'react-redux';

interface IGeolocation {
  latitude: number;
  longitude: number;
}

export interface DishCurrentLocationProps {
  onPressLocation?: ({latitude, longitude}: IGeolocation) => void;
}

const DishCurrentLocation = ({onPressLocation}: DishCurrentLocationProps) => {
  const isAuthenticated = useSelector(authSelectors.isAuthenticated);
  const [geolocation, setGeolocation] = useState<IGeolocation>();
  const [curLocation, setCurrentLocation] = useState<IAddressResolveResponse>();
  const [isLoading, setIsLoading] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    initGeolocation();
  }, []);

  const initGeolocation = async () => {
    setIsLoading(true);
    try {
      const position: any = await getCurrentGeolocation();
      if (position) {
        const {latitude, longitude} = position.coords;
        setGeolocation({latitude, longitude});
        if (isAuthenticated) {
          const response = await getCurrentLocationAddressByLatLng(
            latitude,
            longitude,
          );
          setCurrentLocation(response);
        } else {
          const response = await PlacesService.getPlaceAddressByGeolocation(
            latitude,
            longitude,
          );
          if (response && response.results && !isEmpty(response.results)) {
            setCurrentLocation({
              city: '',
              latitude,
              longitude,
              formattedAddress: response.results[0].formatted_address,
              addressType: 0,
              country: '',
              county: '',
              postCode: '',
              street: '',
              streetNumber: '',
            });
          }
        }
      }
      setIsLoading(false);
    } catch (e) {
      captureErrorException(e);
      setIsLoading(false);
      setHasError(true);
    }
  };

  return (
    <DynamicPressable
      paddingVertical={22}
      paddingHorizontal={12}
      // borderBottomWidth={1}
      // borderBottomColor="#F2F4F5"
      backgroundColor={Colors.white}
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      onPress={() => {
        if (geolocation) {
          onPressLocation && onPressLocation(geolocation);
        }
      }}>
      <DynamicView flexDirection="row">
        <FontAwesome size={24} name="location-arrow" color={Colors.ember} />
        <DynamicView marginLeft={14}>
          <DynamicText
            fontFamily={fonts.DMSans500Medium}
            fontSize={15}
            lineHeight={18}
            color="#303030">
            Use Current Location
          </DynamicText>
          <DynamicText
            fontFamily={fonts.DMSans400Regular}
            fontWeight="400"
            fontSize={13}
            lineHeight={16}
            color="#818183">
            {/* 33 Sandbank Road, Hilltown, Newry BT34 5XU */}
            {curLocation?.formattedAddress}
          </DynamicText>
        </DynamicView>
      </DynamicView>
      {isLoading && <ActivityIndicator color={Colors.dark} />}
      {!isLoading && hasError && (
        <DynamicPressable onPress={initGeolocation}>
          <Ionicons size={24} name="refresh" color={Colors.ember} />
        </DynamicPressable>
      )}
    </DynamicPressable>
  );
};

export default DishCurrentLocation;
