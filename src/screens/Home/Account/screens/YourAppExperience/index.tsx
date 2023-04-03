import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import YourAppExperienceView from './View';
import {captureErrorException} from '@/utils/error-handler';
import {useToast} from 'native-base';
import DishToast from '@/components/DishToast';
import {useNavigation} from '@react-navigation/native';
import AppExperienceService from '@/api/app-experience';
import {
  showSuccessMessage,
  showWarningMessage,
} from '@/components/DishFlashMessage';

type ReviewFormType = {
  message: string;
};

const YourAppExperience = () => {
  const [showLoading, setShowLoading] = useState(false);
  const toast = useToast();
  const navigation = useNavigation();

  const {
    reset,
    control,
    handleSubmit,
    formState: {errors},
    setError,
    clearErrors,
  } = useForm<any>({
    resolver: yupResolver(
      yup
        .object({
          message: yup.string().required('Message is required'),
        })
        .required(),
    ),
  });

  useEffect(() => {
    reset({
      message: '',
    });
  }, []);

  const onSubmit = async () => {
    if (showLoading) {
      return;
    }

    if (errors) {
      if (errors.message) {
        return showWarningMessage('Warning', String(errors.message?.message));
      }
    }

    handleSubmit(onUpdateNumber)();
  };

  const onUpdateNumber = async (data: ReviewFormType) => {
    setShowLoading(true);
    try {
      const response = await AppExperienceService.submitAppExperience(data);
      setShowLoading(false);
      toast.show({
        placement: 'top',
        duration: 2500,
        render: () => {
          return (
            showSuccessMessage(
              'Review submitted',
              'Thank you for submitting your review.',
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
      onSubmit,
      showLoading,
    };
  };

  return <YourAppExperienceView {...getProps()} />;
};

export default YourAppExperience;
