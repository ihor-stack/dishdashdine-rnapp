import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ForgotPasswordView from './View';
import DishSpinner from '@/components/DishSpinner';
import {useToast} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import IdentityService from '@/api/identity';
import {captureErrorException} from '@/utils/error-handler';
import {
  showSuccessMessage,
  showWarningMessage,
} from '@/components/DishFlashMessage';

interface LoginFormType {
  emailAddress: string;
}

const ForgotPassword = () => {
  const [showLoading, setShowLoading] = useState(false);
  const toast = useToast();
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<LoginFormType>({
    resolver: yupResolver(
      yup
        .object({
          emailAddress: yup.string().required('Email Address is required'),
        })
        .required(),
    ),
  });

  const handleSuccessToast = () => {
    toast.show({
      placement: 'top',
      duration: 2500,
      render: () => {
        return showSuccessMessage(
          'Password reset link sent',
          'Please check your email for your reset link.',
        );
      },
      onCloseComplete: () => {
        navigation.goBack();
      },
    });
  };

  const onLogin = async () => {
    if (showLoading) {
      return;
    }
    if (errors) {
      if (errors.emailAddress) {
        return showWarningMessage(
          'Warning',
          String(errors.emailAddress?.message),
        );
      }
    }

    handleSubmit(onSubmit)();
  };

  const onResend = async () => {
    if (showLoading) {
      return;
    }
    if (errors) {
      if (errors.emailAddress) {
        return showWarningMessage(
          'Warning',
          String(errors.emailAddress?.message),
        );
      }
    }

    handleSubmit(onResendPassword)();
  };

  const onSubmit = async (data: LoginFormType) => {
    setShowLoading(true);
    try {
      const response = await IdentityService.resetPassword(data);
      if (response) {
        setShowLoading(false);
        handleSuccessToast();
      } else {
        setShowLoading(false);
        return;
      }
    } catch (error: any) {
      captureErrorException(error);
      setShowLoading(false);
      if (error && error.errors) {
        const errs = error.errors;
        if (errs?.EmailAddress) {
          return showWarningMessage('Warning', String(errs.EmailAddress[0]));
        }
      }
    }
  };

  const onResendPassword = () => {
    setShowLoading(true);
    setTimeout(() => {
      setShowLoading(false);
      handleSuccessToast();
    }, 2000);
  };

  const getProps = () => {
    return {
      control,
      onLogin,
      showLoading,
      onResendPassword,
      onResend,
    };
  };

  return (
    <>
      {showLoading && <DishSpinner />}
      <ForgotPasswordView {...getProps()} />
    </>
  );
};

export default ForgotPassword;
