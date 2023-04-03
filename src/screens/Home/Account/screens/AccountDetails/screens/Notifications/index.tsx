import {showSuccessMessage} from '@/components/DishFlashMessage';
import {accountSelectors, setWillUpdate} from '@/store/account';
import {updateUser,} from '@/store/account/thunk';
import {captureErrorException} from '@/utils/error-handler';
import {useNavigation} from '@react-navigation/native';
import {useToast} from 'native-base';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import NotificationsView from './View';

interface NotificationFormType {
  offerNotifications: boolean;
  otherNotifications: boolean;
  orderNotifications: boolean;
}

const Notifications = () => {
  const user = useSelector(accountSelectors.selectCurrentUser);
  const [showLoading, setShowLoading] = useState(false);
  const [offerNotifications, setOfferNotifications] = useState<boolean>(
    user?.offerNotifications || false,
  );
  const [orderNotifications, setOrderNotifications] = useState<boolean>(
    user?.orderNotifications || false,
  );
  const [otherNotifications, setOtherNotifications] = useState<boolean>(
    user?.otherNotifications || false,
  );
  const dispatch = useDispatch<any>();
  const toast = useToast();
  const navigation = useNavigation();

  const getProps = () => {
    return {
      showLoading,
      offerNotifications,
      orderNotifications,
      otherNotifications,
      setOfferNotifications,
      setOrderNotifications,
      setOtherNotifications,
      onSubmit,
    };
  };

  const onSubmit = async () => {
    setShowLoading(true);
    const data: NotificationFormType = {
      offerNotifications,
      orderNotifications,
      otherNotifications,
    };

    try {
      await dispatch(setWillUpdate(false));
      await dispatch(updateUser(data)).unwrap();
      setShowLoading(false);

      toast.show({
        placement: 'top',
        duration: 2500,
        render: () => {
          return (
            showSuccessMessage(
              'Notifications updated',
              'You have successfully updated your settings.',
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

  return <NotificationsView {...getProps()} />;
};

export default Notifications;
