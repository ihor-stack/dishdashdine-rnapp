import {useState} from 'react';
import {Alert} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {AnyAction} from 'redux';
import {useDispatch} from 'react-redux';
import {useToast} from 'native-base';

import {
  IAdminPreparationTimes,
  IAdminRestaurant,
} from '@/api/admin_restaurant/model';
import RestaurantService from '@/api/admin_restaurant/restaurant';
import {fetchPreparationTimes} from '@/store/admin_restaurant/restaurant/thunk';
import {showSuccessMessage} from '@/components/DishFlashMessage';
import {captureErrorException} from '@/utils/error-handler';

type SubmitErrors = {[key: string]: string[] | undefined};

type SubmitError = {errors?: SubmitErrors};

const useUpdatePreparationTime = (restaurant: IAdminRestaurant) => {
  const dispatch = useDispatch();

  const toast = useToast();

  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const onSubmit = async (payload: IAdminPreparationTimes[]) => {
    setLoading(true);

    try {
      const response = await RestaurantService.updatePreparationTimes(
        restaurant.restaurantId,
        payload,
      );

      await dispatch(
        fetchPreparationTimes(restaurant.restaurantId) as unknown as AnyAction,
      ).unwrap();

      if (response) {
        toast.show({
          placement: 'top',
          duration: 2500,
          render: () =>
            showSuccessMessage(
              'Information updated',
              'Your information has been updated.',
            ),
          onCloseComplete: () => {
            navigation.goBack();
          },
        });
      }
    } catch (error) {
      const e = (error as unknown as SubmitError).errors as SubmitErrors;

      const errors = Object.keys(e)
        ?.map(i => e[i]?.flat())
        ?.flat();

      if (errors.length) {
        Alert.alert('Error', `${errors.map(i => `${i}\n`)}`.replace(',', ''));
      }

      captureErrorException(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    onSubmit,
  };
};

export default useUpdatePreparationTime;
