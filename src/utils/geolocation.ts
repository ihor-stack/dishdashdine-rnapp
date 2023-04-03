import AddressService from '@/api/address';
import {IAddressResolveResponse} from '@/api/generic';
import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid} from 'react-native';

export const requestGeolocationAuthorization =
  (): Promise<Geolocation.AuthorizationResult> => {
    return Geolocation.requestAuthorization('whenInUse');
  };

export const requestGeolocationAuthorizationAndroid = async () => {
  return PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );
};

export const getCurrentGeolocation = () => {
  return new Promise(function (resolve, reject) {
    Geolocation.getCurrentPosition(resolve, reject, {
      timeout: 60000,
      maximumAge: 10000,
      enableHighAccuracy: true,
    });
  });
};

export const getCurrentLocationAddressByLatLng = async (
  latitude: number,
  longitude: number,
): Promise<IAddressResolveResponse> => {
  const response: IAddressResolveResponse =
    await AddressService.getAddressResolve({
      Latitude: latitude,
      Longitude: longitude,
    });
  return response;
};

export const getCurrentLocationAddressByStreet = async (
  StreetAddress: string,
): Promise<IAddressResolveResponse> => {
  const response: IAddressResolveResponse =
    await AddressService.getAddressResolve({
      StreetAddress,
    });
  return response;
};
