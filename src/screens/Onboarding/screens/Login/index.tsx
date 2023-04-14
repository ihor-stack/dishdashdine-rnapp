import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

import LoginView from './View';
import {fakeLogin} from '@/constants/fakeData';
import {captureErrorException} from '@/utils/error-handler';
import IdentityService from '@/api/identity';
import storage from '@/utils/storage';
import {AUTH_TOKEN} from '@/constants';
import {useToast} from 'native-base';
import {setIsAuthenticated} from '@/store/authentication';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';
import {fetchCurrentUser} from '@/store/account/thunk';
import {resetHomeState} from '@/store/home';
import {
  accountSelectors,
  clearAccountStore,
  setDevicePushToken,
  setNoAuthUser,
} from '@/store/account';
import UserService from '@/api/user';
import messaging from '@react-native-firebase/messaging';
import {IUser} from '@/api/user';
import {showErrorMessage} from '@/components/DishFlashMessage';

interface LoginFormType {
  emailAddress: string;
  password: string;
}

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const pushNotificationToken = useSelector(
    accountSelectors.selectDevicePushToken,
  );
  const dispatch = useDispatch<any>();
  const toast = useToast();
  const navigation = useNavigation<any>();
  const currentUser = useSelector(accountSelectors.selectCurrentUser) as IUser;
  const params = useRoute().params as any;
  const isFrom: any = params?.isFrom;

  const {reset, control, handleSubmit, clearErrors} = useForm<LoginFormType>({
    resolver: yupResolver(
      yup
        .object({
          emailAddress: yup.string().required('New Pin is required'),
          password: yup.string().required('Password is required'),
        })
        .required(),
    ),
  });

  useEffect(() => {
    messaging()
      .getToken()
      .then(token => {
        dispatch(setDevicePushToken(token));
      });

    clearErrors();
    if (__DEV__) {
      reset(fakeLogin);
    } else {
      reset();
    }
  }, [dispatch]);

  const showErrorToast = () => {
    // toast.show({
    //   placement: 'top',
    //   duration: 2500,
    //   render: () => {
    //     return (
    //       <DishToast
    //         title="Warning"
    //         message="Username or Password is invalid"
    //         variant="error"
    //       />
    //     );
    //   },
    // });
    showErrorMessage('Warning', 'Username or Password is invalid');
  };

  const onSubmit = () => {
    if (showLoading) {
      return;
    }

    handleSubmit(onLogin)();
  };

  const onLogin = async (data: LoginFormType) => {
    if (showLoading) {
      return;
    }

    setShowLoading(true);
    try {
      await dispatch(resetHomeState());
      // await dispatch(clearAccountStore());

      const response = await IdentityService.authenticate(data);
      if (response) {
        setShowLoading(false);
        await storage.setItem(AUTH_TOKEN, response);
        await dispatch(fetchCurrentUser()).unwrap();
        await dispatch(setIsAuthenticated(true));

        if (pushNotificationToken) {
          await UserService.savePushNotificationToken({
            deviceToken: pushNotificationToken,
          });
        }
      } else {
        showErrorToast();
        setShowLoading(false);
        return;
      }
    } catch (error) {
      captureErrorException(error);
      setShowLoading(false);
      await dispatch(setIsAuthenticated(false));

      if (error === 'invalid_grant') {
        showErrorToast();
        return;
      }
    }
  };

  const onForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  const onHungry = async () => {
    await storage.setItem(AUTH_TOKEN, null);
    await dispatch(resetHomeState());
    await dispatch(clearAccountStore());
    await dispatch(setNoAuthUser(null));
    await dispatch(setIsAuthenticated(true));

    navigation.navigate('HomeRoot');
  };

  const getProps = () => {
    return {
      control,
      onLogin,
      showPassword,
      setShowPassword,
      handleSubmit,
      showLoading,
      onForgotPassword,
      currentUser,
      isFrom,
      onSubmit,
      onHungry,
    };
  };

  return <LoginView {...getProps()} />;
};

export default Login;
