import {IAdminRestaurantDeliveryDTO} from '@/api/admin_restaurant/model';
import {yupResolver} from '@hookform/resolvers/yup';
import React, {useEffect, useState} from 'react';
import RestaurantDeliveryEntryView from './View';
import * as yup from 'yup';
import {useForm} from 'react-hook-form';
import {captureErrorException} from '@/utils/error-handler';
import RestaurantService from '@/api/admin_restaurant/restaurant';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  showSuccessMessage,
  showWarningMessage,
} from '@/components/DishFlashMessage';
import {DEFAULT_DISTANCE} from '@/constants';
import {useSelector} from 'react-redux';
import {adminRestaurantSelectors} from '@/store/admin_restaurant/restaurant';
import {useDispatch} from 'react-redux';
import {
  fetchRestaurantDelivery,
  fetchRestaurantDeliveryArea,
} from '@/store/admin_restaurant/restaurant/thunk';

const RestaurantDeliveryEntry = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<any>();
  const params = useRoute().params as any;

  const [estDeliveryArr, setEstDeliveryArr] = useState<any[]>([]);
  const [showLoading, setShowLoading] = useState(false);
  const [defaultAreaType, setDefaultAreaType] = useState<number>(1);
  const [distance, setDistance] = useState(DEFAULT_DISTANCE);
  const [distance2, setDistance2] = useState(DEFAULT_DISTANCE);

  const selectedRestaurant = useSelector(
    adminRestaurantSelectors.selectRestaurant,
  );
  const delivery = params?.delivery;
  const action = params?.action;
  const restaurantId = params?.restaurantId || selectedRestaurant?.restaurantId;

  const {
    control,
    handleSubmit,
    clearErrors,
    getValues,
    setValue,
    formState: {errors},
  } = useForm<IAdminRestaurantDeliveryDTO>({
    resolver: yupResolver(
      yup
        .object({
          name: yup.string().required('Delivery method name is required'),
          price: yup.number().required('Delivery estimated cost is required'),
          estimatedTime: yup
            .string()
            .required('Delivery estimated time is required'),
          mileRadiusMin: yup.number(),
          mileRadiusMax: yup.number(),
          postCode: yup.string(),
        })
        .required(),
    ),
  });

  useEffect(() => {
    const newData: any = [];
    for (let index = 5; index <= 60; index += 5) {
      newData.push({
        key: index,
        label: `${index} mins`,
      });
    }
    setEstDeliveryArr(newData);

    clearErrors();
  }, []);

  useEffect(() => {
    const init = async () => {
      setShowLoading(true);
      const response = await dispatch(
        fetchRestaurantDeliveryArea({
          restaurantId,
          deliveryAreaId: delivery?.deliveryAreaId,
        }),
      ).unwrap();
      setShowLoading(false);
      if (response) {
        setValue('price', Number(response.price));
        setValue('price', response.price);
        setValue('name', response.name);
        setValue('estimatedTime', response.estimatedTime);
        setDefaultAreaType(response.deliveryAreaType);

        if (response.deliveryAreaType === 2) {
          setValue('postCode', response.postcode);
        } else {
          setValue('mileRadiusMin', response.mileRadiusMin);
          setValue('mileRadiusMax', response.mileRadiusMax);
        }
      }
    };

    if (action === 'update' && restaurantId) {
      init();
    }
  }, [dispatch, restaurantId, action, delivery]);

  const handleErrorToast = (message: string) => {
    showWarningMessage('Warning', message);
  };

  const onSubmit = () => {
    if (showLoading) {
      return;
    }

    if (errors) {
      if (errors.name) {
        return handleErrorToast(String(errors.name?.message));
      } else if (errors.deliveryAreaType) {
        return handleErrorToast(String(errors.deliveryAreaType?.message));
      } else if (errors.price) {
        return handleErrorToast(String(errors.price?.message));
      } else if (errors.estimatedTime) {
        return handleErrorToast(String(errors.estimatedTime?.message));
      }
    }

    if (action === 'update') {
      handleSubmit(onUpdateDelivery)();
    } else {
      handleSubmit(onCreateDelivery)();
    }
  };

  const onCreateDelivery = async (data: IAdminRestaurantDeliveryDTO) => {
    setShowLoading(true);
    try {
      if (!data.postCode) {
        data.postCode = 'N/A';
      }

      data.deliveryAreaType = Number(defaultAreaType);
      const response = await RestaurantService.createRestaurantDelivery(
        restaurantId,
        data,
      );
      setShowLoading(false);
      if (response) {
        await dispatch(fetchRestaurantDelivery(restaurantId));
        navigation.goBack();
        return showSuccessMessage(
          'Success!',
          'Delivery Info successfully saved',
        );
      }
      navigation.goBack();
    } catch (error) {
      captureErrorException(error);
      setShowLoading(false);
    }
  };

  const onUpdateDelivery = async (data: IAdminRestaurantDeliveryDTO) => {
    setShowLoading(true);
    try {
      data.deliveryAreaType = Number(defaultAreaType);
      const response = await RestaurantService.updateRestaurantDelivery(
        restaurantId,
        delivery?.deliveryAreaId,
        data,
      );
      setShowLoading(false);
      if (response) {
        await dispatch(fetchRestaurantDelivery(restaurantId));
        navigation.goBack();
        return showSuccessMessage(
          'Success!',
          'Delivery Info successfully saved',
        );
      }
      navigation.goBack();
    } catch (error) {
      captureErrorException(error);
      setShowLoading(false);
    }
  };

  const onDeleteDelivery = async () => {
    try {
      setShowLoading(true);
      const response = await RestaurantService.deleteRestaurantDelivery(
        restaurantId,
        delivery?.deliveryAreaId,
      );
      setShowLoading(false);
      if (response) {
        await dispatch(fetchRestaurantDelivery(restaurantId));
        navigation.goBack();
        return showSuccessMessage(
          'Success!',
          'Delivery Info successfully deleted',
        );
      }
    } catch (error) {
      captureErrorException(error);
      setShowLoading(false);
    }
  };

  const getProps = () => {
    return {
      control,
      errors,
      estDeliveryArr,
      showLoading,
      defaultAreaType,
      distance,
      distance2,
      setDistance,
      setDistance2,
      setDefaultAreaType,
      onSubmit,
      setValue,
      action,
      onDeleteDelivery,
      getValues,
    };
  };

  return <RestaurantDeliveryEntryView {...getProps()} />;
};

export default RestaurantDeliveryEntry;
