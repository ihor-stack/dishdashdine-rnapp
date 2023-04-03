import 'react-native-gesture-handler';

import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {Image, Linking, Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import RNBootSplash from 'react-native-bootsplash';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FastImage from 'react-native-fast-image';
import {PersistGate} from 'redux-persist/integration/react';

import RootNavigator from '@/navigation/root-navigator';
import {store, persistor} from './store';
import {NativeBaseProvider} from 'native-base';
import {theme} from '@/themes/customTheme';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SheetProvider} from 'react-native-actions-sheet';
import FlipperAsyncStorage from 'rn-flipper-async-storage-advanced';

import FlashMessage from 'react-native-flash-message';
import {
  ANDROID_CODEPUSH_KEY,
  ANDROID_CODEPUSH_KEY_PROD,
  IOS_CODEPUSH_KEY,
  IOS_CODEPUSH_KEY_PROD,
} from '@/constants';

import codePush from 'react-native-code-push';
import MainScreen from '@/screens/Main';
import Orientation from 'react-native-orientation-locker';
import DishSpinner from '@/components/DishSpinner';
import Config from 'react-native-config';
import {ActionSheetProvider} from '@expo/react-native-action-sheet';
import AxiosProviders from './AxiosProviders';

const homeActive = require('@/assets/images/home-active.png');
const homeInActive = require('@/assets/images/home-inactive.png');
const browseActive = require('@/assets/images/browse-active.png');
const browseInActive = require('@/assets/images/browse-inactive.png');
const favouritesActive = require('@/assets/images/favourites-active.png');
const favouritesInActive = require('@/assets/images/favourites-inactive.png');
const ordersActive = require('@/assets/images/orders-active.png');
const ordersInActive = require('@/assets/images/orders-inactive.png');
const accountActive = require('@/assets/images/account-active.png');
const accountInActive = require('@/assets/images/account-inactive.png');
const initialBg = require('@/assets/images/initial_bg.png');
const initialAppIcon = require('@/assets/images/initial_app_icon.png');
const downIcon = require('@/assets/images/down.png');
const optionsIcon = require('@/assets/images/options.png');
const burgerPng = require('@/assets/images/burger.png');
const pizzaPng = require('@/assets/images/pizza.png');
const soupPng = require('@/assets/images/soup.png');
const dessertsPng = require('@/assets/images/desserts.png');
const mexicanPng = require('@/assets/images/mexican.png');
const kebabPng = require('@/assets/images/kebab.png');
const breakfastPng = require('@/assets/images/breakfast.png');

const images = [
  optionsIcon,
  downIcon,
  initialAppIcon,
  homeActive,
  homeInActive,
  browseActive,
  browseInActive,
  favouritesActive,
  favouritesInActive,
  ordersActive,
  ordersInActive,
  accountActive,
  accountInActive,
  initialBg,
  burgerPng,
  pizzaPng,
  soupPng,
  dessertsPng,
  mexicanPng,
  kebabPng,
  breakfastPng,
];

// get local images uri
const uris = images.map(image => ({
  uri: Image.resolveAssetSource(image).uri,
}));

// initialize fonts
AntDesign.loadFont();
Ionicons.loadFont();
Entypo.loadFont();
SimpleLineIcons.loadFont();
EvilIcons.loadFont();
Fontisto.loadFont();
Octicons.loadFont();
FontAwesome.loadFont();

declare const global: any;

let App = () => {
  const config = {
    screens: {
      Onboarding: {
        screens: {
          VerifyAccount: {
            path: 'ConfirmAccount',
            exact: true,
          },
        },
      },
    },
  };

  const linking = {
    prefixes: [
      'dishdashdine://',
      'https://admin.dishdashdine.com',
      'https://admin.dishdashdine.com/Identity/Account/ConfirmAccount',
    ],
    async getInitialURL() {
      return await Linking.getInitialURL();
    },
    subscribe(listener: any) {
      // Listen to incoming links from deep linking
      Linking.addEventListener('url', ({url}) => {
        listener(url);
      });
    },
    config,
  };

  useEffect(() => {
    Orientation.lockToPortrait();
  }, []);

  useEffect(() => {
    const initialize = async () => {
      // save images on cache
      FastImage.preload(uris);
    };

    initialize().finally(async () => {
      await RNBootSplash.hide({fade: true});
    });

    (global as any).dispath = store.dispatch;
  }, []);

  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer linking={linking} fallback={<DishSpinner />}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            {__DEV__ && <FlipperAsyncStorage />}
            <GestureHandlerRootView style={{flex: 1}}>
              <AxiosProviders>
                <ActionSheetProvider>
                  <SheetProvider>
                    <FlashMessage position="top" />
                    <RootNavigator />
                    <MainScreen />
                  </SheetProvider>
                </ActionSheetProvider>
              </AxiosProviders>
            </GestureHandlerRootView>
          </PersistGate>
        </Provider>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.MANUAL,
  installMode: codePush.InstallMode.IMMEDIATE,
  mandatoryInstallMode: codePush.InstallMode.IMMEDIATE,
  deploymentKey:
    Platform.OS === 'ios'
      ? Config.PRODUCTION
        ? IOS_CODEPUSH_KEY_PROD
        : IOS_CODEPUSH_KEY
      : Config.PRODUCTION
      ? ANDROID_CODEPUSH_KEY_PROD
      : ANDROID_CODEPUSH_KEY,
};

if (__DEV__) {
  if (
    global.location &&
    (global.location?.pathname?.includes('/debugger-ui') ||
      global.location?.pathname?.includes('Debugger'))
  ) {
    global.XMLHttpRequest = global.originalXMLHttpRequest
      ? global.originalXMLHttpRequest
      : global.XMLHttpRequest;
    global.FormData = global.originalFormData
      ? global.originalFormData
      : global.FormData;
  }
} else {
  App = codePush(codePushOptions)(App);
}

// App = codePush(codePushOptions)(App);

export default App;
