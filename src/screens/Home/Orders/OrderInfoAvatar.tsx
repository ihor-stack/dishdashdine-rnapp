import React, {useEffect, useState} from 'react';
import {DynamicImage, DynamicText, DynamicView} from '@/components';
import {Colors, fonts} from '@/themes';

const profile = require('@/assets/images/myAccount/Profilelogo.png');
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import {restaurantSelectors} from '@/store/restaurants';
import {StyleSheet, useWindowDimensions} from 'react-native';
import moment from 'moment';
import {IOpeningHours, IRestaurant} from '@/api/generic';
import {isArray, isEmpty} from 'lodash';
import FastImage from 'react-native-fast-image';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const noProfile = require('@/assets/images/no-profile.png');

export interface OrderInfoAvatarProps {
  restaurant?: IRestaurant;
  showLoading?: boolean;
}

const OrderInfoAvatar = ({restaurant, showLoading}: OrderInfoAvatarProps) => {
  const [openingHours, setOpeningHours] = useState<IOpeningHours>();
  const {width} = useWindowDimensions();
  const date = moment();
  const dayOfWeek = date.day();

  useEffect(() => {
    if (restaurant) {
      const _openingHours = isArray(restaurant?.openingHours)
        ? restaurant?.openingHours
        : restaurant?.openingHours?.$values;

      if (_openingHours) {
        const value = _openingHours.find(
          (item: IOpeningHours) => item.dayOfWeek === dayOfWeek,
        );
        if (value) {
          setOpeningHours(value);
        }
      }
    }
  }, [restaurant, dayOfWeek]);

  const renderLoadingView = () => (
    <SkeletonPlaceholder>
      <SkeletonPlaceholder.Item
        flexDirection="row"
        alignItems="center"
        paddingVertical={18}
        paddingHorizontal={10}>
        <SkeletonPlaceholder.Item width={80} height={80} borderRadius={50} />
        <SkeletonPlaceholder.Item marginLeft={23}>
          <SkeletonPlaceholder.Item width={100} height={20} borderRadius={4} />
          <SkeletonPlaceholder.Item
            marginTop={6}
            width={220}
            height={16}
            borderRadius={4}
          />
          <SkeletonPlaceholder.Item
            marginTop={6}
            width={150}
            height={12}
            borderRadius={4}
          />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );

  const renderResturantView = () => (
    <DynamicView
      flexDirection="row"
      alignItems="center"
      paddingVertical={18}
      paddingHorizontal={10}
      backgroundColor={Colors.white}>
      {!isEmpty(restaurant?.bannerImagePath) ? (
        <FastImage
          source={{
            uri: restaurant?.bannerImagePath,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
          style={styles.dishInfoLogo}
        />
      ) : (
        <DynamicImage source={noProfile} style={styles.dishInfoLogo} />
      )}
      <DynamicView marginLeft={20} paddingRight={11}>
        <DynamicText
          fontFamily={fonts.DMSans700Bold}
          fontSize={14}
          lineHeight={18.23}
          color={Colors.black}>
          {restaurant?.name}
        </DynamicText>
        <DynamicView width={width - 100} paddingRight={11}>
          <DynamicText
            fontFamily={fonts.DMSans400Regular}
            fontSize={14}
            lineHeight={18.23}
            color={Colors.black}>
            {restaurant?.streetAddress}, {`${restaurant?.city} `}
            {restaurant?.postcode}
          </DynamicText>
        </DynamicView>
        <DynamicView flexDirection="row" alignItems="center" paddingTop={7}>
          <AntDesign name="clockcircleo" color={Colors.black} size={27 / 2} />
          <DynamicView marginLeft={4}>
            <DynamicText
              fontFamily={fonts.DMSans500Medium}
              fontSize={13}
              lineHeight={16}
              color={Colors.black}>
              Open: {moment.utc(openingHours?.openTime).format('hh:mma')} -{' '}
              {moment.utc(openingHours?.closeTime).format('hh:mma')}
            </DynamicText>
          </DynamicView>
        </DynamicView>
      </DynamicView>
    </DynamicView>
  );

  return showLoading ? renderLoadingView() : renderResturantView();
};

export default OrderInfoAvatar;

const styles = StyleSheet.create({
  dishInfoLogo: {
    height: 74,
    width: 74,
    backgroundColor: Colors.white,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: Colors.dark,
  },
});
