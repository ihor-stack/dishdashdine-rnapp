import React, {useEffect, useMemo, useState} from 'react';
import {useToast} from 'native-base';
import {useNavigation, useRoute} from '@react-navigation/native';
import BasicInformationView from './View';
import {useDispatch, useSelector} from 'react-redux';
import {adminRestaurantSelectors} from '@/store/admin_restaurant/restaurant';
import RestaurantService from '@/api/admin_restaurant/restaurant';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {captureErrorException} from '@/utils/error-handler';
import {
  fetchAllRestaurants,
  fetchBasicInformation,
} from '@/store/admin_restaurant/restaurant/thunk';
import {each, isEmpty} from 'lodash';
import {
  IRestaurantBannerImage,
  IRestaurantLogoImage,
} from '@/api/admin_restaurant/model';
import ImagePicker from 'react-native-image-crop-picker';
import {Platform} from 'react-native';
import moment from 'moment';
import {
  showSuccessMessage,
  showWarningMessage,
} from '@/components/DishFlashMessage';

type RestaurantBasicInformationFormType = {
  name: string;
  description: string;
  phone: string;
  email: string;
  streetAddress: string;
  city: string;
  postcode: string;
  bannerImage: IRestaurantBannerImage;
  logoImage: IRestaurantLogoImage;
};

const BasicInformation = () => {
  const [showLoading, setShowLoading] = useState(false);
  // const [isBannerImage, setIsBannerImage] = useState(false);
  // const [isLogoImage, setIsLogoImage] = useState(false);
  const details = useSelector(adminRestaurantSelectors.selectRestaurant);
  const dispatch = useDispatch<any>();
  const toast = useToast();
  const navigation = useNavigation();
  const params = useRoute().params as any;
  const action = params?.action;

  const [bannerImage, setBannerImage] = useState<IRestaurantBannerImage | any>(
    null,
  );
  const [bannerImagePath, setBannerImagePath] = useState<string | null>();

  const [logoImage, setLogoImage] = useState<IRestaurantLogoImage | any>(null);
  const [logoImagePath, setLogoImagePath] = useState<string | null>();

  const singleFilePicker = async (isBannerImage: boolean) => {
    const fileData = await ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
      writeTempFile: false,
    });
    const fileExtension = String(fileData.mime).substr(
      String(fileData.mime).indexOf('/') + 1,
    );

    if (isBannerImage) {
      setLogoImage(null);

      setBannerImage({
        base64Payload: fileData?.data,
        fileName:
          Platform.OS === 'ios'
            ? fileData?.filename
            : `Mobile_Upload_${moment().unix()}.${fileExtension}`,
        contentType: fileData?.mime,
      });
      setBannerImagePath(fileData?.path);
    } else {
      setBannerImage(null);

      setLogoImage({
        base64Payload: fileData?.data,
        fileName:
          Platform.OS === 'ios'
            ? fileData?.filename
            : `Mobile_Upload_${moment().unix()}.${fileExtension}`,
        contentType: fileData?.mime,
      });
      setLogoImagePath(fileData?.path);
    }
  };

  const openCamera = async (isBannerImage: boolean) => {
    const image: any = await ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
      writeTempFile: false,
    });
    const fileExtension = String(image.mime).substr(
      String(image.mime).indexOf('/') + 1,
    );

    if (isBannerImage) {
      setLogoImage(null);

      setBannerImage({
        base64Payload: image?.data,
        fileName:
          Platform.OS === 'ios'
            ? image?.filename
            : `Mobile_Upload_${moment().unix()}.${fileExtension}`,
        contentType: image?.mime,
      });
      setBannerImagePath(image?.path);
    } else {
      setBannerImage(null);

      setLogoImage({
        base64Payload: image?.data,
        fileName:
          Platform.OS === 'ios'
            ? image?.filename
            : `Mobile_Upload_${moment().unix()}.${fileExtension}`,
        contentType: image?.mime,
      });
      setLogoImagePath(image?.path);
    }
  };

  const clearAssets = () => {
    setLogoImage(null);
    setBannerImage(null);
  };

  const {
    reset,
    control,
    handleSubmit,
    formState: {errors},
    clearErrors,
  } = useForm<RestaurantBasicInformationFormType>({
    resolver: yupResolver(
      yup
        .object({
          email: yup.string().required('Email is required'),
          name: yup.string().required('Name is required'),
          description: yup.string().required('Description is required'),
          phone: yup.string().required('Phone is required'),
          streetAddress: yup.string().required('Street Address is required'),
          city: yup.string().required('City is required'),
          postcode: yup.string().required('Post Code is required'),
        })
        .required(),
    ),
  });

  useEffect(() => {
    clearErrors();

    if (action === 'update') {
      setBannerImagePath(details.bannerImagePath);
      setLogoImagePath(details.logoImagePath);
      reset(details);
    } else {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [action]);

  const handleErrorToast = (message: string) => {
    showWarningMessage('Warning', message);
  };

  const handleSuccessToast = () => {
    toast.show({
      placement: 'top',
      duration: 2500,
      render: () => {
        return (
          // <DishToast
          //   title={
          //     action === 'update' ? 'Information updated' : 'Restaurant created'
          //   }
          //   message={
          //     action === 'update'
          //       ? 'Your information has been updated.'
          //       : 'Your Restaurant has been created.'
          //   }
          //   variant="success"
          // />
          showSuccessMessage(
            action === 'update' ? 'Information updated' : 'Restaurant created',
            action === 'update'
              ? 'Your information has been updated.'
              : 'Your Restaurant has been created.',
          )
        );
      },
      onCloseComplete() {
        navigation.goBack();
      },
    });
  };

  const onCreateRestaurant = async (
    data: RestaurantBasicInformationFormType,
  ) => {
    setShowLoading(true);
    try {
      const respones = await RestaurantService.createRestaurant({
        ...data,
        bannerImage,
        logoImage,
      });
      if (respones) {
        await dispatch(fetchAllRestaurants()).unwrap();
        handleSuccessToast();
      } else {
        setShowLoading(false);
      }
    } catch (error: any) {
      const errs = error.errors;
      captureErrorException(error);
      setShowLoading(false);
      each(
        errs,
        ({description}: {code: string; description: string}, index: number) => {
          setTimeout(() => {
            handleErrorToast(description);
          }, 600 * index);
        },
      );
    }
  };

  const onUpdateBasicInformation = async (
    data: RestaurantBasicInformationFormType,
  ) => {
    setShowLoading(true);
    try {
      let payload: any = {
        ...data,
      };

      if (isEmpty(bannerImage)) {
        delete payload.bannerImagePath;
      } else {
        payload = {
          ...payload,
          bannerImage,
        };
      }

      if (isEmpty(logoImage)) {
        delete payload.logoImagePath;
      } else {
        payload = {
          ...payload,
          logoImage,
        };
      }

      delete payload.openingHours;
      delete payload.preparationTimes;

      const response = await RestaurantService.updateBasicInformation(
        details.restaurantId,
        payload,
      );

      if (response) {
        await dispatch(fetchBasicInformation(details.restaurantId)).unwrap();
        await dispatch(fetchAllRestaurants()).unwrap();
        handleSuccessToast();
      } else {
        setShowLoading(false);
      }

      setShowLoading(false);
    } catch (error: any) {
      const errs = error.errors;
      captureErrorException(error);
      setShowLoading(false);
      each(
        errs,
        ({description}: {code: string; description: string}, index: number) => {
          setTimeout(() => {
            handleErrorToast(description);
          }, 600 * index);
        },
      );
    }
  };

  const onSubmit = () => {
    if (showLoading) {
      return;
    }

    if (errors) {
      if (errors.name) {
        return handleErrorToast(String(errors.name?.message));
      } else if (errors.description) {
        return handleErrorToast(String(errors.description?.message));
      } else if (errors.email) {
        return handleErrorToast(String(errors.email?.message));
      } else if (errors.phone) {
        return handleErrorToast(String(errors.phone?.message));
      } else if (errors.streetAddress) {
        return handleErrorToast(String(errors.streetAddress?.message));
      } else if (errors.city) {
        return handleErrorToast(String(errors.city?.message));
      } else if (errors.postcode) {
        return handleErrorToast(String(errors.postcode?.message));
      }
    }

    if (action === 'update') {
      handleSubmit(onUpdateBasicInformation)();
    } else {
      handleSubmit(onCreateRestaurant)();
    }
  };

  const getProps = () => {
    return {
      onSubmit,
      showLoading,
      details,
      handleSubmit,
      control,
      openCamera,
      singleFilePicker,
      bannerImagePath,
      logoImagePath,
      action,
      clearAssets,
    };
  };

  return <BasicInformationView {...getProps()} />;
};

export default BasicInformation;
