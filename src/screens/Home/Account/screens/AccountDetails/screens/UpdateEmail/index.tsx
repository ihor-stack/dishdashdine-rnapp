import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import UpdateEmailView from './View';
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

type UpdateEmailFormType = {email: string};

const UpdateEmail = () => {
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
  } = useForm<UpdateEmailFormType>({
    resolver: yupResolver(
      yup
        .object({
          email: yup.string().required('Email is required'),
        })
        .required(),
    ),
  });

  useEffect(() => {
    reset({
      email: user?.email,
    });
  }, [reset, user]);

  const onReset = () => {
    reset({
      email: '',
    });
  };

  const onSubmit = async () => {
    if (showLoading) {
      return;
    }

    if (errors) {
      if (errors.email) {
        return showWarningMessage('Warning', String(errors.email?.message));
        //  toast.show({
        //   placement: 'top',
        //   duration: 2500,
        //   render: () => {
        //     return (
        //       <DishToast
        //         title="Warning"
        //         message={String(errors.email?.message)}
        //         variant="warning"
        //       />
        //     );
        //   },
        // });
      }
    }

    handleSubmit(onUpdateEmail)();
  };

  const onUpdateEmail = async (data: UpdateEmailFormType) => {
    setShowLoading(true);
    try {
      await dispatch(updateUser(data)).unwrap();
      setShowLoading(false);

      toast.show({
        placement: 'top',
        duration: 2500,
        render: () => {
          return (
            // <DishToast
            //   title="Email updated"
            //   message="You have successfully updated your email."
            //   variant="success"
            // />
            showSuccessMessage(
              'Email updated',
              'You have successfully updated your email.',
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

  return <UpdateEmailView {...getProps()} />;
};

export default UpdateEmail;
