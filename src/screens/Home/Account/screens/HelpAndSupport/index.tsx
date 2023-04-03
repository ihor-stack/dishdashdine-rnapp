import React, {useCallback} from 'react';
import {MyAccountStackNavParamList} from '../../navigation/Navigation';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import HelpAndSupportView from '@/screens/Home/Account/screens/HelpAndSupport/View';

const HelpAndSupport = () => {
  const {navigate} =
    useNavigation<NavigationProp<MyAccountStackNavParamList>>();

  const onFAQsNavPress = useCallback(
    (route: keyof MyAccountStackNavParamList) => {
      navigate(route);
    },
    [navigate],
  );

  const getProps = () => {
    return {
      onFAQsNavPress,
      navigate,
    };
  };

  return <HelpAndSupportView {...getProps()} />;
};

export default HelpAndSupport;
