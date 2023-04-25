import React, { useLayoutEffect, useState } from 'react';

import { useNavigation, useRoute } from '@react-navigation/native';
import storage from '@/utils/storage';
import { AUTH_TOKEN } from '@/constants';
import { useDispatch } from 'react-redux';
import { setIsAuthenticated } from '@/store/authentication';
import { setCurrentUserLocation } from '@/store/account';
import { captureErrorException } from '@/utils/error-handler';
import { useToast } from 'native-base';
import DishToast from '@/components/DishToast';
import { IAddressResolveResponse } from '@/api/generic';
import PlacesService, { PredictionType } from '@/api/google-places';
import AddressView from './View';
import { NavigationHeader } from '@/components';
import { useDebounce } from '@/hooks/useDebounce';
import { getCurrentLocationAddressByLatLng } from '@/utils/geolocation';
import { showSuccessMessage } from '@/components/DishFlashMessage';
import { isEmpty } from 'lodash';
import { fetchCurrentUser } from '@/store/account/thunk';

const Address = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [geolocation, setGeolocation] = useState<any>({});
  const [curLocation, setCurrentLocation] = useState<IAddressResolveResponse>();
  const [searchText, setSearchText] = useState('');
  const [selectedPlaceId, setSelectedPlaceId] = useState('');
  const [selectedPlace, setSelectedPlace] = useState('');
  const [predictionsArr, setPredictions] = useState<PredictionType[]>([]);
  const dispatch = useDispatch<any>();
  const navigation = useNavigation<any>();
  const params = useRoute<any>().params;
  const toast = useToast();

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <NavigationHeader
          showBackButton={params?.isFrom !== 'register'}
          title="Address"
          onGoBackPress={async () => {
            const authToken = await storage.getItem(AUTH_TOKEN);
            if (authToken) {
              if (params?.isFrom) {
                navigation.goBack();
              } else {
                dispatch(setIsAuthenticated(true));
              }
            } else {
              navigation.goBack();
            }
          }}
        />
      ),
    });
  }, [dispatch, navigation, params]);

  const getPlacePredictions = async () => {
    if (searchText) {
      setShowLoading(true);
      try {
        const response: any = await PlacesService.placePredictions(searchText);
        if (response && response?.predictions) {
          const { predictions } = response;
          setPredictions(predictions);
        }
        setShowLoading(false);
      } catch (e) {
        setShowLoading(false);
        captureErrorException(e);
      }
    }
  };

  useDebounce(getPlacePredictions, 1000, [searchText]);

  const onSaveCurrentLocation = async ({ latitude, longitude }) => {
    setIsSaving(true);
    try {
      setGeolocation({ latitude, longitude });
      const response = await getCurrentLocationAddressByLatLng(
        latitude,
        longitude,
      );
      setIsSaving(false);
      navigation.navigate('AddNewAddress', {
        description: response.formattedAddress,
        country: response.country,
        postCode: response.postCode,
        city: response.city,
        streetNumber: response.streetNumber,
        isFrom: 'register',
        action: 'add',
        geolocation: { latitude, longitude },
      });
    } catch (error) {
      setIsSaving(false);
      captureErrorException(error);
    }
  };

  const renderButtonLabel = (): string => {
    if (params) {
      if (params.isFrom === 'home' || params.isFrom === 'register') {
        return 'Next';
      } else if (params.isFrom === 'my_address') {
        return 'Select address';
      }
    } else {
      return 'Add new address';
    }

    return 'Update address';
  };

  const onSelectLocation = (place: PredictionType) => {
    let newData: any = [...predictionsArr];
    newData = newData.map((item: PredictionType) => {
      if (place.place_id === item.place_id) {
        getPlaceIdLocation(item.place_id);
        setSelectedPlaceId(item.place_id);
        setSelectedPlace(item.description);
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

  const getPlaceIdLocation = async (placeId: string) => {
    try {
      const response = await PlacesService.getGeolocationByPlaceId(placeId);
      if (response) {
        const {
          result: {
            geometry: { location },
          },
        } = response;
        if (location) {
          const { lat, lng } = location;
          setGeolocation({ latitude: lat, longitude: lng });
        }
      }
    } catch (error) { }
  };

  const onSaveAddress = async () => {
    if (params && params.isFrom === 'my_address') {
      navigation.navigate('AddNewAddress', {
        description: selectedPlace,
      });
    } else if (params && params.isFrom === 'register') {
      navigation.navigate('AddNewAddress', {
        description: selectedPlace,
        isFrom: 'register',
        action: 'add',
        geolocation,
      });
    } else if (params.isFrom === 'home') {
      await dispatch(setCurrentUserLocation(geolocation));
      onToastSuccess();
    } else {
      getPlaceIdLocation(selectedPlaceId);
      navigation.navigate('Distance');
    }
  };

  const onToastSuccess = () => {
    toast.show({
      placement: 'top',
      duration: 2500,
      render: () => {
        return (
          // <DishToast
          //   title="Address updated"
          //   message="You have successfully updated your address/location"
          //   variant="success"
          // />
          showSuccessMessage(
            'Address updated',
            'You have successfully updated your address/location',
          )
        );
      },
      onCloseComplete() {
        navigation.goBack();
      },
    });
  };

  const onLogin = async () => {
    setShowLoading(true);
    const authToken = await storage.getItem(AUTH_TOKEN);
    if (!isEmpty(authToken)) {
      await dispatch(fetchCurrentUser()).unwrap();
      await dispatch(setIsAuthenticated(true));
      setShowLoading(false);
    } else {
      setShowLoading(false);
      return navigation.navigate('Login');
    }
  };

  const getProps = () => {
    return {
      navigation,
      isSaving,
      searchText,
      curLocation,
      params,
      predictionsArr,
      showLoading,
      renderButtonLabel,
      onSaveCurrentLocation,
      onSelectLocation,
      onSaveAddress,
      setSearchText,
      onLogin,
    };
  };

  // Get address by lat + long
  // https://stackoverflow.com/questions/19511597/how-to-get-address-location-from-latitude-and-longitude-in-google-map
  return <AddressView {...getProps()} />;
};

export default Address;
