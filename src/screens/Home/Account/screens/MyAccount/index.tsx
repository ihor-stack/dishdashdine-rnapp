import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useCallback, useRef, useState} from 'react';
import {MyAccountStackNavParamList} from '../../navigation/Navigation';
import {useDispatch, useSelector} from 'react-redux';
import {accountSelectors} from '@/store/account';
import ImagePicker from 'react-native-image-crop-picker';
import MyAccountView from '@/screens/Home/Account/screens/MyAccount/View';

const MyAccount = () => {
  const user = useSelector(accountSelectors.selectCurrentUser);
  const [ImageObject, setImageObject] = useState(null);
  const dispatch = useDispatch();
  const CustomActionSheet = useRef<any>();
  const {navigate} =
    useNavigation<NavigationProp<MyAccountStackNavParamList>>();

  const onAccountNavPress = useCallback(
    (route: keyof MyAccountStackNavParamList) => {
      navigate(route);
    },
    [navigate],
  );

  const showActionSheet = () => {
    CustomActionSheet.current?.show();
  };

  // const updateUserProfile = async (data, uri) => {
  //   try {
  //     const response = await UserService.updateUser(data);
  //     if (response && response.code === Success) {
  //       dispatch();
  //     }
  //   } catch (error) {}
  // };

  const singleFilePicker = async () => {
    const fileData = await ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(() => {
      console.log('image: ', fileData);
    });
  };

  const openCamera = async () => {
    const image = await ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      useFrontCamera: true,
    }).then(() => {
      console.log('camera: ', image);
    });
  };

  const getProps = () => {
    return {
      user,
      openCamera,
      singleFilePicker,
      showActionSheet,
      onAccountNavPress,
      CustomActionSheet,
    };
  };

  return <MyAccountView {...getProps()} />;
};

export default MyAccount;
