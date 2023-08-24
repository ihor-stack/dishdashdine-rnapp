import React, {useEffect} from 'react';
import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import {useDispatch, useSelector} from 'react-redux';
import BackgroundTimer from 'react-native-background-timer';
import notifee, {EventType} from '@notifee/react-native';
import {accountSelectors, setDevicePushToken} from '@/store/account';
import UserService, {IUser} from '@/api/user';
import {
  fetchActiveOrder,
  fetchCompletedOrder,
  fetchOrderRestaurant,
} from '@/store/order/thunk';
import {
  fetchPreparationTimes,
  getAllRestaurantActiveOrders,
  getAllRestaurantCancelledOrders,
  getAllRestaurantCompletedOrders,
  getAllRestaurantOrders,
  getAllRestaurantPendingOrders,
} from '@/store/admin_restaurant/restaurant/thunk';
import {adminRestaurantSelectors} from '@/store/admin_restaurant/restaurant';
import {IAdminRestaurant} from '@/api/admin_restaurant/model';
import {
  requestUserPermission,
  showPushNotification,
} from '@/utils/notification-helper';
import Sound from 'react-native-sound';

const MainScreen = () => {
  const dispatch = useDispatch<any>();
  const currentUser = useSelector(accountSelectors.selectCurrentUser) as IUser;
  const restaurant = useSelector(
    adminRestaurantSelectors.selectRestaurant,
  ) as IAdminRestaurant;

  const ding: any = new Sound('order_sound.mp3', Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
  });

  const fetchAdminRestaurantOrders = async () => {
    await Promise.all([
      dispatch(
        getAllRestaurantOrders({
          RestaurantId: restaurant.restaurantId,
        }),
      ),
      dispatch(
        getAllRestaurantPendingOrders({
          RestaurantId: restaurant.restaurantId,
        }),
      ),
      dispatch(
        getAllRestaurantActiveOrders({
          RestaurantId: restaurant.restaurantId,
        }),
      ),
      dispatch(
        getAllRestaurantCompletedOrders({
          RestaurantId: restaurant.restaurantId,
        }),
      ),
      dispatch(
        getAllRestaurantCancelledOrders({
          RestaurantId: restaurant.restaurantId,
        }),
      ),
      dispatch(fetchPreparationTimes(restaurant?.restaurantId)),
    ]);
  };

  useEffect(() => {
    requestUserPermission();

    BackgroundTimer.runBackgroundTimer(() => {
      console.log('BackgroundTimer.runBackgroundTimer');
      if (currentUser && !currentUser?.noAuth) {
        if (currentUser?.primaryUserRole === 'User') {
          // if (currentUser?.emailConfirmed) {
          //   dispatch(fetchActiveOrder());
          //   dispatch(fetchCompletedOrder());
          // }
        } else {
          if (restaurant && restaurant?.restaurantId) {
            fetchAdminRestaurantOrders();
          }
        }
      }
    }, 25000);

    messaging().onNotificationOpenedApp(remoteMessage => {
      if (__DEV__) {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage,
        );
      }
    });

    messaging().onTokenRefresh(async token => {
      if (__DEV__) {
        console.log('onTokenRefresh: ', token);
      }
      dispatch(setDevicePushToken(token));
      await UserService.savePushNotificationToken({
        deviceToken: token,
      });
    });

    return notifee.onForegroundEvent(({type, detail}) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log('User dismissed notification', detail);
          break;
        case EventType.PRESS:
          console.log('User pressed notification', detail);
          break;
      }
    });
  }, [dispatch]);

  useEffect(() => {
    async function onMessageReceived(remoteMessage: FirebaseMessagingTypes.RemoteMessage) {
      if (__DEV__) {
        console.log('onMessageReceived: ', remoteMessage);
      }
      ding.play();

      if (currentUser && !currentUser?.noAuth) {
        if (currentUser?.primaryUserRole === 'User') {
          if (currentUser?.emailConfirmed) {
            dispatch(fetchActiveOrder());
            dispatch(fetchCompletedOrder());
          }

          if (remoteMessage?.data) {
            const {id} = remoteMessage.data as any;
            dispatch(fetchOrderRestaurant(id));
          }
        } else {
          fetchAdminRestaurantOrders();
        }
      }
    }

    messaging().setBackgroundMessageHandler(onMessageReceived);

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      if (__DEV__) {
        console.log('A new FCM message arrived!', remoteMessage);
      }
      const notification = remoteMessage?.notification;
      showPushNotification(notification?.title, notification?.body);
      onMessageReceived(remoteMessage);
    });

    return () => {
      unsubscribe();
    };
  }, [currentUser, dispatch]);

  return <></>;
};

export default MainScreen;
