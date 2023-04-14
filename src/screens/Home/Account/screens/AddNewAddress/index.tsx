import {yupResolver} from '@hookform/resolvers/yup';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import DishToast from '@/components/DishToast';

import AddNewAddressView from './View';
import {useDispatch} from 'react-redux';
import {useToast} from 'native-base';
import {useNavigation, useRoute} from '@react-navigation/native';
import {captureErrorException} from '@/utils/error-handler';
import AddressService, {IAddressData} from '@/api/address';
import {IAddress, IAddressResolveResponse} from '@/api/generic';
import {fetchAddress, getDefaultAddress} from '@/store/address/thunk';
import {getCurrentLocationAddressByLatLng} from '@/utils/geolocation';
import {NavigationHeader} from '@/components';
import {isEmpty} from 'lodash';
import {setCurrentUserLocation} from '@/store/account';
import {
  showSuccessMessage,
  showWarningMessage,
} from '@/components/DishFlashMessage';

const AddNewAddress = () => {
  const [showLoading, setShowLoading] = useState(false);
  const [addressType, setAddressType] = useState(1);
  const [curLocation, setCurrentLocation] = useState<IAddressResolveResponse>();
  const [currentLocation, setCurrentUserLocations] = useState<any>({});

  const dispatch = useDispatch<any>();
  const toast = useToast();
  const navigation = useNavigation<any>();
  const params = useRoute().params as any;
  const action: any = params?.action;
  const isFrom: any = params?.isFrom;
  const address: any = params?.address;

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <NavigationHeader
          showBackButton
          title={action === 'add' ? 'Add New Address' : 'Update Address'}
        />
      ),
    });
  }, [dispatch, navigation, params]);

  const {
    reset,
    control,
    handleSubmit,
    formState: {errors},
    formState,
    setValue,
  } = useForm<any>({
    resolver: yupResolver(
      yup
        .object({
          streetNumber: yup.string().required('Street number is required'),
          street: yup.string().required('Street name is required'),
          city: yup.string().required('City is required'),
          country: yup.string().required('Country is required'),
          postCode: yup.string().required('Postal code is required'),
          // addressType: yup.string().required('Address type is required'),
        })
        .required(),
    ),
  });

  useEffect(() => {
    if (params) {
      if (params.description) {
        setValue('street', String(params?.description) as any);
        setValue('addressType', Number(addressType));
      }
      if (params.country) {
        setValue('country', String(params?.country) as any);
      }
      if (params.postCode) {
        setValue('postCode', String(params?.postCode) as any);
      }
      if (params.city) {
        setValue('city', String(params?.city) as any);
      }
      if (params.streetNumber) {
        setValue('streetNumber', String(params?.streetNumber) as any);
      }

      if (address && action === 'update') {
        reset(address);
      }
    }
  }, [params]);

  useEffect(() => {
    const init = async () => {
      const {latitude, longitude} = currentLocation as any;
      const response = await getCurrentLocationAddressByLatLng(
        latitude,
        longitude,
      );
      setCurrentLocation(response);
    };

    if (!isEmpty(currentLocation)) {
      init();
    }
  }, [currentLocation]);

  const onUseCurrentLocation = async ({latitude, longitude}) => {
    setShowLoading(true);
    try {
      const response = await getCurrentLocationAddressByLatLng(
        latitude,
        longitude,
      );
      setCurrentLocation(response);
      setShowLoading(false);
      if (response) {
        setValue('street', response.street);
        setValue('addressType', Number(addressType));
        setValue('streetNumber', response.streetNumber);
        setValue('city', response.city);
        setValue('country', response.country);
        setValue('postCode', response.postCode);
        setAddressType(response.addressType);
      }
    } catch (error) {
      captureErrorException(error);
      setShowLoading(false);
    }
  };

  const onValidateInputs = () => {
    if (errors) {
      if (errors.streetNo) {
        return showWarningMessage('Warning', String(errors.streetNo?.message));
        // toast.show({
        //   placement: 'top',
        //   duration: 2500,
        //   render: () => {
        //     return (
        //       // <DishToast
        //       //   title="Warning"
        //       //   message={String(errors.streetNo?.message)}
        //       //   variant="warning"
        //       // />

        //     );
        //   },
        // });
      }
      if (errors.streetName) {
        return showWarningMessage(
          'Warning',
          String(errors.streetName?.message),
        );
        // toast.show({
        //   placement: 'top',
        //   duration: 2500,
        //   render: () => {
        //     return (
        //       // <DishToast
        //       //   title="Warning"
        //       //   message={String(errors.streetName?.message)}
        //       //   variant="warning"
        //       // />

        //     );
        //   },
        // });
      }
      if (errors.city) {
        return showWarningMessage('Warning', String(errors.city?.message));
        // toast.show({
        //   placement: 'top',
        //   duration: 2500,
        //   render: () => {
        //     return (
        //       // <DishToast
        //       //   title="Warning"
        //       //   message={String(errors.city?.message)}
        //       //   variant="warning"
        //       // />

        //     );
        //   },
        // });
      }
      if (errors.country) {
        return showWarningMessage('Warning', String(errors.country?.message));
        // toast.show({
        //   placement: 'top',
        //   duration: 2500,
        //   render: () => {
        //     return (
        //       // <DishToast
        //       //   title="Warning"
        //       //   message={String(errors.country?.message)}
        //       //   variant="warning"
        //       // />

        //     );
        //   },
        // });
      }
      if (errors.postCode) {
        return showWarningMessage('Warning', String(errors.postCode?.message));
        // toast.show({
        //   placement: 'top',
        //   duration: 2500,
        //   render: () => {
        //     return (
        //       // <DishToast
        //       //   title="Warning"
        //       //   message={String(errors.postCode?.message)}
        //       //   variant="warning"
        //       // />

        //     );
        //   },
        // });
      }
      if (errors.addressType) {
        return showWarningMessage(
          'Warning',
          String(errors.addressType?.message),
        );
        // toast.show({
        //   placement: 'top',
        //   duration: 2500,
        //   render: () => {
        //     return (
        //       // <DishToast
        //       //   title="Warning"
        //       //   message={String(errors.addressType?.message)}
        //       //   variant="warning"
        //       // />

        //     );
        //   },
        // });
      }
    }
  };

  const onSubmit = async () => {
    if (showLoading) {
      return;
    }
    onValidateInputs();
    await handleSubmit(onAddNewAddress)();
  };

  const onAddNewAddress = async (data: IAddressData) => {
    setShowLoading(true);
    try {
      let response: IAddress | any = null;
      if (action === 'add') {
        response = await AddressService.createAddress({
          ...data,
          addressType: Number(addressType),
        });
      } else if (action === 'update') {
        response = await AddressService.updateAddress(data.id || address.id, {
          city: data.city,
          country: data.country,
          postCode: data.postCode,
          street: data.street,
          streetNumber: data.streetNumber,
          addressType: Number(addressType),
          otherAddressType: data.otherAddressType,
        });
      } else {
        response = await AddressService.createAddress({
          ...data,
          addressType: Number(addressType),
        });
      }

      if (response) {
        if ((isFrom === 'register' || isFrom === 'home') && action === 'add') {
          await AddressService.setDefaultAddress(response.id);
          await dispatch(
            setCurrentUserLocation({
              latitude: Number(response.latitude),
              longitude: Number(response.longitude),
            }),
          );
        }

        await dispatch(getDefaultAddress()).unwrap();
        await dispatch(fetchAddress()).unwrap();

        setShowLoading(false);

        toast.show({
          placement: 'top',
          duration: 2500,
          render: () => {
            return (
              // <DishToast
              //   title="New Address"
              //   message="You have successfully added the new address."
              //   variant="success"
              // />
              showSuccessMessage(
                'New Address',
                'You have successfully added the new address.',
              )
            );
          },
          onCloseComplete() {
            if (isFrom === 'register') {
              navigation.navigate('Distance');
            } else if (isFrom === 'home') {
              navigation.goBack();
            } else {
              navigation.navigate('ManageAddresses');
            }
          },
        });
      } else {
        setShowLoading(false);
      }
    } catch (error: any) {
      setShowLoading(false);
      captureErrorException(error);

      showWarningMessage('Warning', error.message);
      // toast.show({
      //   placement: 'top',
      //   duration: 1500,
      //   render: () => {
      //     return (
      //       // <DishToast
      //       //   title="Warning"
      //       //   message={error.message}
      //       //   variant="error"
      //       // />

      //     );
      //   },
      // });
    }
  };

  const onSetDefaultAddress = async () => {
    setShowLoading(true);
    try {
      const response = await AddressService.setDefaultAddress(address.id);
      if (response) {
        await dispatch(getDefaultAddress()).unwrap();
        await dispatch(fetchAddress()).unwrap();

        toast.show({
          placement: 'top',
          duration: 2500,
          render: () => {
            return (
              // <DishToast
              //   title="Default Address set!"
              //   message="You have successfully set a default address."
              //   variant="success"
              // />
              showSuccessMessage(
                'Default Address set!',
                'You have successfully set a default address.',
              )
            );
          },
          onCloseComplete() {
            if (isFrom === 'register') {
              navigation.navigate('Distance');
            } else {
              navigation.navigate('ManageAddresses');
            }
          },
        });
      }

      setShowLoading(false);
    } catch (error) {
      setShowLoading(false);
      captureErrorException(error);
    }
  };

  const getProps = () => {
    return {
      control,
      handleSubmit,
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
    };
  };

  return <AddNewAddressView {...getProps()} />;
};

export default AddNewAddress;
