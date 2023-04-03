import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import UpdateNumberView from './View';
import {captureErrorException} from '@/utils/error-handler';
import {useDispatch, useSelector} from 'react-redux';
import {updateUser} from '@/store/account/thunk';
import {useToast} from 'native-base';
import DishToast from '@/components/DishToast';
import {useNavigation} from '@react-navigation/native';
import {accountSelectors} from '@/store/account';
import {
  showSuccessMessage,
  showWarningMessage,
} from '@/components/DishFlashMessage';

type UpdateNumberFormType = {phoneNumber: string};

const UpdateNumber = () => {
  const [showLoading, setShowLoading] = useState(false);
  const user = useSelector(accountSelectors.selectCurrentUser);
  const dispatch = useDispatch<any>();
  const toast = useToast();
  const navigation = useNavigation();

  const {
    reset,
    control,
    handleSubmit,
    formState: {errors},
    setError,
    clearErrors,
  } = useForm<UpdateNumberFormType>({
    resolver: yupResolver(
      yup
        .object({
          phoneNumber: yup.string().required('Phone number is required'),
        })
        .required(),
    ),
  });

  useEffect(() => {
    reset({
      phoneNumber: user?.phoneNumber,
    });
  }, [reset, user]);

  const onReset = () => {
    reset({
      phoneNumber: '',
    });
  };

  const onSubmit = async () => {
    if (showLoading) {
      return;
    }

    if (errors) {
      if (errors.phoneNumber) {
        return showWarningMessage(
          'Warning',
          String(errors.phoneNumber?.message),
        );
      }
    }

    handleSubmit(onUpdateNumber)();
  };

  const onUpdateNumber = async (data: UpdateNumberFormType) => {
    setShowLoading(true);
    try {
      await dispatch(updateUser(data)).unwrap();
      setShowLoading(false);

      toast.show({
        placement: 'top',
        duration: 2500,
        render: () => {
          return (
            showSuccessMessage(
              'Phone number updated',
              'You have successfully updated your number.',
            )
          );
        },
        onCloseComplete() {
          navigation.goBack();
        },
      });
    } catch (error: any) {
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
      onReset,
    };
  };

  return <UpdateNumberView {...getProps()} />;
};

export default UpdateNumber;
