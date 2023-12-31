import {useWindowDimensions} from 'react-native';
import React, {useState} from 'react';
import {SheetManager} from 'react-native-actions-sheet';
import {IEventCatering} from '@/api/generic';
import {useToast} from 'native-base';
import RestaurantService from '@/api/restaurant';
import {captureErrorException} from '@/utils/error-handler';
import {useDispatch, useSelector} from 'react-redux';
import RestaurantEventCateringModalView from './View';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {getRestaurant} from '@/store/restaurants/thunk';
import {restaurantSelectors} from '@/store/restaurants';
import {
  showSuccessMessage,
  showWarningMessage,
} from '@/components/DishFlashMessage';

interface RestaurantEventCateringModalFormType extends IEventCatering {
  eventDate: string;
  numberOfAttendees: number;
  eventDescription: string;
}

const RestaurantEventCateringModal = () => {
  const {width} = useWindowDimensions();
  const dispatch = useDispatch<any>();
  const restaurant = useSelector(restaurantSelectors.selectRestaurant);
  const [eventDate, setEventDate] = useState('');
  const [numberAttend, setNumberAttend] = useState(0);
  const [eventDescription, setEventDescription] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [curDate, setCurDate] = useState(new Date());
  const toast = useToast();

  const {
    reset,
    control,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm<RestaurantEventCateringModalFormType>({
    resolver: yupResolver(
      yup
        .object({
          // eventDate: yup.string().required('Event Date is required'),
          numberOfAttendees: yup
            .number()
            .required('Number Of Attendees  is required'),
          eventDescription: yup
            .string()
            .required('Event Description is required'),
        })
        .required(),
    ),
  });
  const handleErrorToast = (message: string) => {
    showWarningMessage('Warning', message);
  };

  const handleSuccessToast = () => {
    toast.show({
      placement: 'top',
      duration: 2500,
      render: () => {
        return showSuccessMessage(
          'Form submitted',
          'Thank you for submitting your form.',
        );
      },
    });
  };

  const submitForm = async (data: RestaurantEventCateringModalFormType) => {
    setIsChecked(true);
    if (isLoading) {
      return;
    }

    setIsLoading(true);
    try {
      await RestaurantService.createEventCatering(restaurant?.restaurantId, {
        ...data,
        eventDate: curDate.toISOString(),
      });
      setIsLoading(false);
      await SheetManager.hide('EventsCateringModal');
      handleSuccessToast();
    } catch (e: any) {
      setIsLoading(false);
      captureErrorException(e);
      // await SheetManager.hide('EventsCateringModal');
      if (e && e.status === 404) {
        return handleErrorToast(String(e.title));
      }
    }
  };

  const onSubmit = async () => {
    if (isLoading) {
      return;
    }

    if (errors) {
      if (errors.eventDate) {
        return handleErrorToast(String(errors.eventDate?.message));
      } else if (errors.eventDescription) {
        return handleErrorToast(String(errors.eventDescription?.message));
      } else if (errors.numberOfAttendees) {
        return handleErrorToast(String(errors.numberOfAttendees?.message));
      }
    }
    await handleSubmit(submitForm)();
  };

  const getProps = () => {
    return {
      width,
      restaurant,
      restaurantId: restaurant?.restaurantId,
      eventDate,
      setEventDate,
      numberAttend,
      setNumberAttend,
      eventDescription,
      setEventDescription,
      isChecked,
      setIsChecked,
      isLoading,
      setIsLoading,
      curDate,
      setCurDate,
      dispatch,
      onSubmit,
      setValue,
      control,
      reset,
    };
  };

  return <RestaurantEventCateringModalView {...getProps()} />;
};

export default RestaurantEventCateringModal;
