import React from 'react';
import {useNavigation} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {SafeAreaView, Platform, StatusBar} from 'react-native';
import DynamicView from './DynamicView';
import DynamicPressable from './DynamicPressable';
import DynamicText from './DynamicText';

import {Colors, fonts} from '@/themes';

type NavigationHeaderProps = {
  title: string;
  showBackButton?: boolean;
  restaurant?: boolean;
  onGoBackPress?: () => void;
  slotStart?: JSX.Element;
  slotEnd?: JSX.Element;
};

const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  title,
  onGoBackPress,
  showBackButton,
  restaurant,
  slotEnd,
  slotStart,
}) => {
  const {goBack} = useNavigation<StackNavigationProp<any>>();

  const onPress = () => {
    if (!onGoBackPress) {
      goBack();
    } else {
      onGoBackPress();
    }
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: restaurant ? Colors.ember : Colors.white,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
      }}>
      <DynamicView
        position="relative"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        borderBottomWidth={1}
        paddingVertical={showBackButton ? 20 : 32}
        paddingHorizontal={18}
        backgroundColor={restaurant ? Colors.ember : Colors.white}
        borderBottomColor={restaurant ? Colors.ember : '#F2F4F5'}>
        <DynamicView
          flexDirection="row"
          alignItems="center"
          justifyContent="flex-start"
          zIndex={10}>
          {!!showBackButton && (
            <DynamicPressable onPress={onPress}>
              <AntDesign
                size={24}
                name="arrowleft"
                color={restaurant ? Colors.white : '#303030'}
              />
            </DynamicPressable>
          )}
          {slotStart}
        </DynamicView>
        <DynamicView
          position="absolute"
          left={0}
          right={0}
          flexDirection="row"
          alignItems="center"
          justifyContent="center">
          <DynamicText
            fontFamily={fonts.DMSans500Medium}
            fontWeight="500"
            color={restaurant ? Colors.white : '#303030'}
            fontSize={24}
            lineHeight={31}>
            {title}
          </DynamicText>
        </DynamicView>
        <DynamicView
          flexDirection="row"
          alignItems="center"
          justifyContent="flex-end"
          zIndex={10}>
          {slotEnd}
        </DynamicView>
      </DynamicView>
    </SafeAreaView>
  );
};

export default NavigationHeader;
