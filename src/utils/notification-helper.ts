import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';

export const requestUserPermission = async () => {
  const status = await messaging().requestPermission();
  await notifee.requestPermission();
  if (
    status === messaging.AuthorizationStatus.AUTHORIZED ||
    status === messaging.AuthorizationStatus.PROVISIONAL
  ) {
    console.log('User has provisional notification permissions.');
  } else {
    console.log('User has notification permissions disabled');
  }
};

export const showPushNotification = async (title?: string, body?: string) => {
  const channelId = await notifee.createChannel({
    id: 'DishDashDine',
    name: 'DishDashDine',
  });

  // Display a notification
  await notifee.displayNotification({
    title,
    body,
    android: {
      channelId,
      // pressAction is needed if you want the notification to open the app when pressed
      pressAction: {
        id: 'default',
      },
    },
  });
};
