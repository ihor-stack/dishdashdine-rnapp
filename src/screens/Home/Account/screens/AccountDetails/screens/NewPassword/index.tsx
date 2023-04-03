import {yupResolver} from '@hookform/resolvers/yup';
import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import DishToast from '@/components/DishToast';
import {updateUser} from '@/store/account/thunk';

import NewPasswordView from './View';
import {useDispatch} from 'react-redux';
import {useToast} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {captureErrorException} from '@/utils/error-handler';
import {fakeNewPassword} from '@/constants/fakeData';
import {
  showSuccessMessage,
  showWarningMessage,
} from '@/components/DishFlashMessage';
interface NewPasswordFormType {
  currentPassword: string;
  confirmPassword: string;
  newPassword: string;
  emailAddress: string;
}

const NewPassword = () => {
  const [showLoading, setShowLoading] = useState(false);
  const [currentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch<any>();
  const toast = useToast();
  const navigation = useNavigation();

  const {
    reset,
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<NewPasswordFormType>({
    resolver: yupResolver(
      yup
        .object({
          currentPassword: yup
            .string()
            .required('Current Password is required'),
          newPassword: yup.string().required('New Password is required'),
          confirmPassword: yup
            .string()
            .required('Confirm Password is required'),
        })
        .required(),
    ),
  });

  useEffect(() => {
    reset({
      ...fakeNewPassword,
    });
  }, [reset]);

  const onSubmit = () => {
    if (showLoading) {
      return;
    }

    if (errors) {
      if (errors.currentPassword) {
        return showWarningMessage(
          'Warning',
          String(errors.currentPassword?.message),
        );
      }
      if (errors.newPassword) {
        return showWarningMessage(
          'Warning',
          String(errors.newPassword?.message),
        );
      }
      if (errors.confirmPassword) {
        return showWarningMessage(
          'Warning',
          String(errors.confirmPassword?.message),
        );
      }
    }

    handleSubmit(onUpdateEmail)();
  };

  const onUpdateEmail = async (data: NewPasswordFormType) => {
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
              'Password Updated',
              'You have successfully updated your password',
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
      showLoading,
      reset,
      onSubmit,
      control,
      currentPassword,
      setShowCurrentPassword,
      showNewPassword,
      setShowNewPassword,
      showConfirmPassword,
      setShowConfirmPassword,
      setShowLoading,
    };
  };

  return <NewPasswordView {...getProps()} />;
};

export default NewPassword;
