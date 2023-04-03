import crashlytics from '@react-native-firebase/crashlytics';

export const captureErrorException = (error: any) => {
  crashlytics().recordError(new Error(error));
  crashlytics().log(`captureErrorException: ${error}`);
};

export const captureLogging = (message: string) => {
  crashlytics().recordError(new Error(JSON.stringify(message)));
  crashlytics().log(`captureLogging: ${message}`);
};
