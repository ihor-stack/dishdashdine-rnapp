import {showSuccessMessage} from '@/components/DishFlashMessage';
import DishToast from '@/components/DishToast';
import {useNavigation} from '@react-navigation/native';
import {useToast} from 'native-base';
import React, {useState} from 'react';
import MenuItemFormView from './View';

const MenuItemForm = () => {
  const [showLoading, setShowLoading] = useState(false);

  const toast = useToast();
  const navigation = useNavigation();

  const onUpdateMenuItem = async () => {
    toast.show({
      placement: 'top',
      duration: 2500,
      render: () => {
        return (
          // <DishToast
          //   title="Information updated"
          //   message="Your information has been updated."
          //   variant="success"
          // />
          showSuccessMessage(
            'Information updated',
            'Your information has been updated.',
          )
        );
      },
      onCloseComplete() {
        navigation.goBack();
      },
    });
  };

  const onSubmit = () => {
    onUpdateMenuItem();
  };

  const getProps = () => {
    return {
      onSubmit,
      showLoading,
    };
  };

  return <MenuItemFormView {...getProps()} />;
};

export default MenuItemForm;
