import React, {useCallback, useState} from 'react';
import {StatusBar} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  DynamicImage,
  DynamicPressable,
  DynamicText,
  DynamicView,
} from '@/components';
import {Colors, fonts} from '@/themes';
import {setShowAddressFilter, setShowDistanceFilter} from '@/store/home';
import {useDispatch, useSelector} from 'react-redux';
import {accountSelectors} from '@/store/account';
import {truncateText} from '@/utils/common';
import {isEmpty} from 'lodash';

const arrowDown = require('@/assets/images/down.png');

const Header = () => {
  const dispatch = useDispatch();

  const address: any = useSelector(accountSelectors.selectCurrentUserAddress);
  const radius: number = useSelector(accountSelectors.selectCurrentUserRadius);

  const toggleShowAddress = useCallback(() => {
    dispatch(setShowAddressFilter());
  }, [dispatch]);

  const toggleShowDistance = useCallback(() => {
    dispatch(setShowDistanceFilter());
  }, [dispatch]);

  return (
    <DynamicView
      flexDirection="row"
      alignItems="flex-end"
      paddingHorizontal={14}
      paddingVertical={19}
      borderBottomColor="#F2F4F5"
      borderBottomWidth={1}
      justifyContent="space-between">
      <StatusBar barStyle="dark-content" />
      <DynamicView flexDirection="row" alignItems="flex-end">
        <AntDesign size={18.33} name="enviromento" color={Colors.red} />
        <DynamicPressable marginLeft={10.5} onPress={toggleShowAddress}>
          <DynamicView marginBottom={2}>
            <DynamicText
              fontSize={13}
              lineHeight={16}
              fontWeight="500"
              fontFamily={fonts.DMSans500Medium}
              color={Colors.red}>
              Where
            </DynamicText>
          </DynamicView>
          <DynamicView flexDirection="row" justifyContent="space-between">
            {!isEmpty(address) ? (
              <DynamicText
                fontFamily={fonts.DMSans700Bold}
                color={Colors.black}
                fontSize={15}
                lineHeight={20}>
                {truncateText(address, 25)}
              </DynamicText>
            ) : (
              <DynamicText
                fontFamily={fonts.DMSans700Bold}
                color={Colors.black}
                fontSize={15}
                lineHeight={20}>
                - Set location -
              </DynamicText>
            )}
            <DynamicImage
              source={arrowDown}
              width={8.5}
              height={4.5}
              marginTop={6.5}
              marginLeft={9.5}
            />
          </DynamicView>
        </DynamicPressable>
      </DynamicView>
      <DynamicPressable onPress={toggleShowDistance}>
        <DynamicView marginBottom={2}>
          <DynamicText
            fontSize={13}
            lineHeight={16}
            fontWeight="500"
            fontFamily={fonts.DMSans500Medium}
            color={Colors.red}>
            Distance
          </DynamicText>
        </DynamicView>
        <DynamicView flexDirection="row">
          <DynamicText
            fontFamily={fonts.DMSans700Bold}
            color={Colors.black}
            fontSize={15}
            lineHeight={20}>
            {radius} miles
          </DynamicText>
          <DynamicImage
            source={arrowDown}
            width={8.5}
            height={4.5}
            marginTop={6.5}
            marginLeft={9.5}
          />
        </DynamicView>
      </DynamicPressable>
    </DynamicView>
  );
};

export default Header;
