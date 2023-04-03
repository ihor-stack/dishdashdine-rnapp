import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {yupResolver} from '@hookform/resolvers/yup';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';

import {CommonActions, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {OnboardingStackNavParamList} from '../../navigation/Navigation';

import IdentityService, {IRegister} from '@/api/identity';
import {captureErrorException} from '@/utils/error-handler';

import {fakeRegistration} from '@/constants/fakeData';
import storage from '@/utils/storage';
import {AUTH_TOKEN} from '@/constants';
import {useToast} from 'native-base';
import {each, isEmpty} from 'lodash';
import RegisterView from './View';
import moment from 'moment';
import {resetHomeState} from '@/store/home';
import {clearAccountStore} from '@/store/account';
import {useDispatch, useSelector} from 'react-redux';
import {setIsAuthenticated} from '@/store/authentication';
import {IRestaurant} from '@/api/generic';
import {NavigationHeader} from '@/components';
import {restaurantSelectors} from '@/store/restaurants';
import {
  showSuccessMessage,
  showWarningMessage,
} from '@/components/DishFlashMessage';

interface RegisterFormType extends IRegister {
  confirmPassword: string;
  restaurant: IRestaurant;
}

const Register = (props: any) => {
  const dispatch = useDispatch<any>();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirnPassword, setShowConfirmPassword] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [curDate, setCurDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const navigation =
    useNavigation<StackNavigationProp<OnboardingStackNavParamList>>();
  const toast = useToast();
  const params = useRoute().params as any;
  const isFrom: any = params?.isFrom;
  const {goBack, navigate} = useNavigation<StackNavigationProp<any>>();
  const restaurant = useSelector(restaurantSelectors.selectRestaurant);

  const onOnboardingNavPress = useCallback(
    (route: keyof OnboardingStackNavParamList) => {
      navigation.navigate(route);
    },
    [navigation],
  );

  const onGoBackRegister = () => {
    if (isFrom === 'guest') {
      navigate('DishInfo', {id: restaurant.restaurantId});
    } else {
      goBack();
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <NavigationHeader
          onGoBackPress={onGoBackRegister}
          showBackButton
          title="Register"
        />
      ),
    });
  }, [navigation]);

  const ref = useRef<KeyboardAwareScrollView>(null);
  const {
    reset,
    control,
    handleSubmit,
    formState: {errors},
    clearErrors,
    setValue,
    getValues,
  } = useForm<RegisterFormType>({
    resolver: yupResolver(
      yup
        .object({
          firstName: yup.string().required('First Name is required'),
          lastName: yup.string().required('Last Name is required'),
          email: yup
            .string()
            .email('Please enter a valid Email address')
            .required('Email Address is required'),
          phoneNumber: yup.string().required('Phone Number is required'),
          dateOfBirth: yup.string().required('Date Of Birth is required'),
          password: yup.string().required('Password is required'),
          confirmPassword: yup
            .string()
            .required('Confirm Password is required'),
        })
        .required(),
    ),
  });

  useEffect(() => {
    clearErrors();

    if (__DEV__) {
      reset({
        ...fakeRegistration,
        dateOfBirth: moment(curDate).format('DD-MM-YYYY'),
      });
    } else {
      reset();
    }
  }, []);

  const handleErrorToast = (message: string) => {
    showWarningMessage('Warning', message);
  };

  const handleSuccessToast = () => {
    toast.show({
      placement: 'top',
      duration: 2500,
      render: () => {
        return (
          showSuccessMessage(
            'Registration Successful!',
            'Your registration has been successfully completed.',
          )
        );
      },
      onCloseComplete: async () => {
        const {email} = getValues();

        if (isFrom === 'guest') {
          await dispatch(setIsAuthenticated(true));
          navigation.navigate('DishInfo');
        } else {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'VerificationSent', params: {email}}],
            }),
          );
        }
      },
    });
  };

  const onRegister = async (data: RegisterFormType) => {
    if (showLoading) {
      return;
    }

    setShowLoading(true);
    try {
      const response = await IdentityService.register({
        ...data,
        dateOfBirth: curDate.toISOString(),
      });
      await storage.setItem(AUTH_TOKEN, response);
      await dispatch(resetHomeState());

      if (isFrom !== 'guest') {
        await dispatch(clearAccountStore());
      }

      handleSuccessToast();
      setShowLoading(false);
    } catch (error: any) {
      const errs = error.errors;
      each(
        errs,
        ({description}: {code: string; description: string}, index: number) => {
          setTimeout(() => {
            handleErrorToast(description);
          }, 600 * index);
        },
      );
      setShowLoading(false);
      captureErrorException(error);
    }
  };

  const onSubmit = async () => {
    if (showLoading) {
      return;
    }

    if (errors) {
      if (errors.firstName) {
        return handleErrorToast(String(errors.firstName?.message));
      } else if (errors.lastName) {
        return handleErrorToast(String(errors.lastName?.message));
      } else if (errors.email) {
        return handleErrorToast(String(errors.email?.message));
      } else if (errors.phoneNumber) {
        return handleErrorToast(String(errors.phoneNumber?.message));
      } else if (errors.dateOfBirth) {
        return handleErrorToast(String(errors.dateOfBirth?.message));
      } else if (errors.password) {
        return handleErrorToast(String(errors.password?.message));
      } else if (errors.confirmPassword) {
        return handleErrorToast(String(errors.confirmPassword?.message));
      }
    }

    handleSubmit(onRegister)();
  };

  const onLogin = async () => {
    const authToken = await storage.getItem(AUTH_TOKEN);
    if (!isEmpty(authToken)) {
      await dispatch(setIsAuthenticated(true));
      return;
    }
    props.navigation.navigate("Onboarding", {screen: "Login"})
  };

  const getProps = () => {
    return {
      ref,
      showLoading,
      onSubmit,
      control,
      showPassword,
      setShowPassword,
      showConfirnPassword,
      setShowConfirmPassword,
      onLogin,
      curDate,
      setCurDate,
      open,
      setOpen,
      setValue,
      onOnboardingNavPress,
    };
  };

  return <RegisterView {...getProps()} />;
};

export default Register;
