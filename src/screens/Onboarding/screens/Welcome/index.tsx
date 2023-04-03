import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect} from 'react';
import {
  StatusBar,
  useWindowDimensions,
  Platform,
  PermissionsAndroid,
  PermissionStatus,
  Image,
  StyleSheet,
} from 'react-native';
import FastImage from 'react-native-fast-image';

import {DynamicPressable, DynamicText, DynamicView} from '@/components';
import {fonts} from '@/themes/fonts';
import messaging from '@react-native-firebase/messaging';
import {
  getCurrentGeolocation,
  requestGeolocationAuthorization,
  requestGeolocationAuthorizationAndroid,
} from '@/utils/geolocation';
import {AuthorizationResult} from 'react-native-geolocation-service';
import {useDispatch} from 'react-redux';
import {
  clearAccountStore,
  setCurrentUserLocation,
  setNoAuthUser,
  setDevicePushToken,
} from '@/store/account';
import {captureErrorException} from '@/utils/error-handler';
import DishButton from '@/components/DishButton';
import {heightPixel, widthPixel} from '@/themes/normalize';
import storage from '@/utils/storage';
import {AUTH_TOKEN} from '@/constants';
import {resetHomeState} from '@/store/home';
import {setIsAuthenticated} from '@/store/authentication';
import {ScrollView} from 'react-native';
import {Colors} from '@/themes';

const Welcome = () => {
  const dispatch = useDispatch();
  const {width, height} = useWindowDimensions();
  const navigation = useNavigation<any>();

  useEffect(() => {
    const requestIOSPermission = async () => {
      try {
        const response: AuthorizationResult =
          await requestGeolocationAuthorization();
        if (response === 'granted') {
          initGeolocation();
        }
      } catch (error) {
        captureErrorException(error);
      }
    };

    const requestAndroidPermission = async () => {
      try {
        const response: PermissionStatus =
          await requestGeolocationAuthorizationAndroid();
        if (response === PermissionsAndroid.RESULTS.GRANTED) {
          initGeolocation();
        }
      } catch (error) {
        captureErrorException(error);
      }
    };

    if (Platform.OS === 'ios') {
      requestIOSPermission();
    } else {
      requestAndroidPermission();
    }
  }, []);

  useEffect(() => {
    messaging()
      .getToken()
      .then(token => {
        dispatch(setDevicePushToken(token));
      });
  }, [dispatch]);

  const initGeolocation = async () => {
    try {
      const position: any = await getCurrentGeolocation();
      if (position) {
        const {latitude, longitude} = position.coords;
        // const {latitude, longitude} = fakeGeolocation;
        dispatch(
          setCurrentUserLocation({
            latitude,
            longitude,
          }),
        );
      }
    } catch (error) {
      captureErrorException(error);
    }
  };

  const onPress = useCallback(
    (route: 'Register' | 'Login') => {
      navigation.navigate(route);
    },
    [navigation],
  );

  const onHurry = async () => {
    await storage.setItem(AUTH_TOKEN, null);
    await dispatch(resetHomeState());
    await dispatch(clearAccountStore());
    await dispatch(setNoAuthUser(null));
    await dispatch(setIsAuthenticated(true));

    navigation.navigate('HomeRoot');
  };

  return (
    <ScrollView style={{flexGrow: 1, backgroundColor: Colors.white}}>
      <StatusBar translucent barStyle="light-content" />
      <DynamicView
        position="relative"
        backgroundColor="#fff"
        flex={1}
        width={width}
        height={'100%'}>
        <DynamicView style={styles.container}>
          <DynamicView style={styles.background}></DynamicView>
        </DynamicView>
        <FastImage
          style={styles.image}
          resizeMode="cover"
          source={require('@/assets/initial_bg_v3.png')}
        />
        <DynamicView flex={1} />
        <DynamicView
          flex={1}
          // paddingTop={20}
          paddingBottom={30}
          marginHorizontal={11}
          position="relative">
          <FastImage
            resizeMode="contain"
            style={{
              width: widthPixel(75),
              height: heightPixel(75),
            }}
            source={require('@/assets/images/dish-dash-icon.png')}
          />
          <DynamicView paddingTop={5} paddingBottom={5} width={'100%'}>
            <DynamicText
              fontWeight="500"
              fontFamily={fonts.DMSans700Bold}
              lineHeight={28.64}
              fontSize={22}
              color={'#303030'}>
              Get started with
            </DynamicText>
          </DynamicView>
          <FastImage
            resizeMode="contain"
            style={{
              width: widthPixel(213),
              height: heightPixel(25.17),
            }}
            source={require('@/assets/images/dish-dash-dine-font.png')}
          />
          <DynamicView paddingTop={10} width={'100%'}>
            <DishButton
              variant="primary"
              label="Create an account"
              icon="arrowright"
              onPress={() => onPress('Register')}
            />
          </DynamicView>
          <DynamicView width={'100%'}>
            <DishButton
              variant="light"
              label="In a hurry, dash now"
              icon="arrowright"
              onPress={onHurry}
            />
          </DynamicView>
          <DynamicView
            flexDirection="row"
            width="100%"
            justifyContent="center"
            alignItems="center"
            marginTop={15}>
            <DynamicText
              fontWeight="500"
              fontFamily={fonts.DMSans500Medium}
              lineHeight={20}
              fontSize={15}
              color={'#303030'}>
              Already have an account?
            </DynamicText>
            <DynamicPressable marginLeft={6} onPress={() => onPress('Login')}>
              <DynamicText
                fontWeight="500"
                fontFamily={fonts.DMSans500Medium}
                lineHeight={20}
                fontSize={15}
                color={'#E00404'}>
                Login
              </DynamicText>
            </DynamicPressable>
          </DynamicView>
        </DynamicView>
      </DynamicView>
    </ScrollView>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    height: heightPixel(355),
  },
  image: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    left: 0,
    bottom: 0,
  },
});