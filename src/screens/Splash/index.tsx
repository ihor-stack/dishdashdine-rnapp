import React, {useEffect, useState} from 'react';
import * as Progress from 'react-native-progress';
import {DynamicImage, DynamicView} from '@/components';
import {Colors} from '@/themes';
import {ActivityIndicator} from 'react-native';
import codePush from 'react-native-code-push';
import RNBootSplash from 'react-native-bootsplash';
import {captureErrorException} from '@/utils/error-handler';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {isEmpty} from 'lodash';
import {useSelector} from 'react-redux';
import {authSelectors} from '@/store/authentication';
import {accountSelectors} from '@/store/account';

const SplashScreen = () => {
  const navigation = useNavigation();
  const isAuthenticated = useSelector(authSelectors.isAuthenticated);
  const currentUser = useSelector(accountSelectors.selectCurrentUser);

  const [, setPushStatus] = useState('');
  const [, setReceivedBytes] = useState(0);
  const [, setTotalBytes] = useState(0);
  const [appProgress, setAppProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [, setIsInstalling] = useState(false);

  useEffect(() => {
    RNBootSplash.hide(); // just hide the splash screen after navigation ready
    if (!__DEV__) {
      codePush
        .checkForUpdate()
        .then(update => {
          if (update) {
            syncAndUpdateApp();
          } else {
            setTimeout(() => {
              gotoApp();
            }, 600);
          }
        })
        .catch(error => {
          setIsDownloading(true);
          captureErrorException(error);
          setTimeout(() => {
            gotoApp();
          }, 600);
        });
    } else {
      setIsDownloading(true);
      setTimeout(() => {
        gotoApp();
      }, 600);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const gotoApp = () => {
    const resetToOnboarding = () => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Onboarding', params: {screen: 'Welcome'}}],
        }),
      );
    };
    
    if (isAuthenticated) {
      if (!isEmpty(currentUser)) {
        if (currentUser?.primaryUserRole === 'User') {
          // navigation.navigate('HomeRoot');
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'HomeRoot'}],
            }),
          );
        } else {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'AdminRootRestaurants'}],
            }),
          );
        }
      } else {
        resetToOnboarding();
      }
    } else {
      resetToOnboarding();
    }
  };

  const codePushStatusDidChange = status => {
    switch (status) {
      case codePush.SyncStatus.CHECKING_FOR_UPDATE:
        setIsDownloading(false);
        setPushStatus('Checking for updates.');
        break;
      case codePush.SyncStatus.DOWNLOADING_PACKAGE:
        setPushStatus('Downloading package.');
        // SheetManager.show('app_dev_updater');
        setIsDownloading(true);
        break;
      case codePush.SyncStatus.INSTALLING_UPDATE:
        setPushStatus('Installing update.');
        setIsDownloading(false);
        setIsInstalling(true);
        break;
      case codePush.SyncStatus.SYNC_IN_PROGRESS:
        setPushStatus('Syncing update in progress...');
        setIsDownloading(false);
        break;
      case codePush.SyncStatus.UP_TO_DATE:
        setIsDownloading(true);
        setPushStatus('Up-to-date.');
        break;
      case codePush.SyncStatus.UPDATE_INSTALLED:
        setPushStatus('Update installed.');
        setIsDownloading(true);
        // SheetManager.hideAll();
        codePush.restartApp(true);
        break;
    }
  };

  const codePushDownloadDidProgress = (progress: any) => {
    if (progress) {
      const percent_complete =
        (Number(progress.receivedBytes) / Number(progress.totalBytes)) * 100;

      const percent_progress =
        Number(progress.receivedBytes) / Number(progress.totalBytes);

      setReceivedBytes(progress.receivedBytes);
      setTotalBytes(progress.totalBytes);
      setAppProgress(percent_progress);
    }
  };

  const syncAndUpdateApp = () => {
    codePush.sync(
      {
        installMode: codePush.InstallMode.IMMEDIATE,
        updateDialog: false,
      },
      codePushStatusDidChange,
      codePushDownloadDidProgress,
    );
  };

  return (
    <DynamicView
      backgroundColor={Colors.ember}
      flex={1}
      alignItems="center"
      justifyContent="center">
      <DynamicImage
        source={require('@/assets/bootsplash_logo.png')}
        resizeMode="cover"
        height={144}
        width={164}
      />
      {isDownloading && (
        <ActivityIndicator
          color={Colors.white}
          size="large"
          style={{
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
      )}
      {appProgress > 0 && (
        <Progress.Bar
          progress={appProgress}
          width={200}
          height={3}
          color={Colors.white}
          style={{
            marginTop: 20,
          }}
        />
      )}
    </DynamicView>
  );
};

export default SplashScreen;
