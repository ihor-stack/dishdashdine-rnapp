import {useWindowDimensions, StyleSheet} from 'react-native';
import React from 'react';
import {DynamicText, DynamicView} from '@/components';
import {Image} from 'native-base';
import {Colors, fonts} from '@/themes';
import {useSelector} from 'react-redux';
import {restaurantSelectors} from '@/store/restaurants';
import {IRestaurant} from '@/api/generic';
import {isEmpty} from 'lodash';
import FastImage from 'react-native-fast-image';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const dishInfoLogo = require('@/assets/images/dish_info_logo.png');
const noProfile = require('@/assets/images/no-image.png');

interface RestaurantProps {
  showProfile?: boolean;
  showReviewTitle?: boolean;
  restaurant?: IRestaurant;
  showLoading?: boolean;
}

const RestaurantInfoAvatar = (props: RestaurantProps) => {
  const {showProfile, showReviewTitle, restaurant, showLoading} = props;
  const {width} = useWindowDimensions();

  const renderRestaurantAvatar = () => {
    return !isEmpty(restaurant?.bannerImagePath) ? (
      <FastImage
        source={{
          uri: restaurant?.bannerImagePath,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.cover}
        style={styles.dishInfoLogo}
      />
    ) : (
      <Image source={noProfile} style={styles.dishInfoLogo} alt="alt-image" />
    );
  };

  const renderLoadingRestaurantAvatar = () => {
    return (
      <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item width={80} height={80} borderRadius={999} />
      </SkeletonPlaceholder>
    );
  };

  const renderRestaurantProfile = () => (
    <DynamicView paddingBottom={20} alignItems="center">
      <DynamicText
        fontFamily={fonts.DMSans700Bold}
        fontSize={14}
        lineHeight={18}
        textAlign="center"
        color={Colors.black}>
        {restaurant?.name}
      </DynamicText>
      <DynamicText
        fontFamily={fonts.DMSans400Regular}
        fontSize={14}
        lineHeight={18}
        textAlign="center"
        color={Colors.black}>
        {restaurant?.streetAddress}, {`${restaurant?.city} `}
        {restaurant?.postcode}
      </DynamicText>
    </DynamicView>
  );

  const renderLoadingRestaurantProfile = () => (
    <DynamicView paddingBottom={20} alignItems="center">
      <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item justifyContent="center" alignItems="center">
          <SkeletonPlaceholder.Item width={80} height={20} borderRadius={4} />
          <SkeletonPlaceholder.Item
            marginTop={6}
            width={220}
            height={20}
            borderRadius={4}
          />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </DynamicView>
  );

  const renderRestaurantReview = () => (
    <DynamicView alignItems="center" paddingBottom={28} paddingHorizontal={12}>
      <DynamicText
        fontFamily={fonts.DMSans700Bold}
        fontSize={14}
        lineHeight={18.23}
        textAlign="center"
        color={Colors.black}>
        How was your order from{'\n'}
        {restaurant?.name}?
      </DynamicText>
      <DynamicView paddingTop={21}>
        <DynamicText
          fontFamily={fonts.DMSans400Regular}
          fontSize={13}
          lineHeight={15.62}
          textAlign="center"
          color={Colors.grey}>
          Thank you for shopping with Dish Dash Dine. We hope your order was
          delicious! Please take a moment to leave a review for{' '}
          {restaurant?.name}
          below.
        </DynamicText>
      </DynamicView>
    </DynamicView>
  );

  const renderLoadingRestaurantReview = () => (
    <DynamicView alignItems="center" paddingBottom={28} paddingHorizontal={12}>
      <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item justifyContent="center" alignItems="center">
          <SkeletonPlaceholder.Item width={100} height={20} borderRadius={4} />
          <SkeletonPlaceholder.Item
            marginTop={6}
            width={100}
            height={20}
            borderRadius={4}
          />
          <SkeletonPlaceholder.Item
            marginTop={6}
            width={220}
            height={20}
            borderRadius={4}
          />
          <SkeletonPlaceholder.Item
            marginTop={6}
            width={220}
            height={20}
            borderRadius={4}
          />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </DynamicView>
  );

  return (
    <DynamicView position="relative">
      <DynamicView
        alignItems="center"
        position="absolute"
        top={-90}
        width={width}>
        {showLoading
          ? renderLoadingRestaurantAvatar()
          : renderRestaurantAvatar()}
      </DynamicView>
      {showProfile &&
        (showLoading
          ? renderLoadingRestaurantProfile()
          : renderRestaurantProfile())}
      {showReviewTitle &&
        (showLoading
          ? renderLoadingRestaurantReview()
          : renderRestaurantReview())}
    </DynamicView>
  );
};

export default RestaurantInfoAvatar;

const styles = StyleSheet.create({
  dishInfoLogo: {
    height: 74,
    width: 74,
    backgroundColor: Colors.white,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: Colors.dark,
  },
  rateImg: {
    height: 77,
    width: 152,
  },
  descContainer: {
    paddingTop: 14,
    paddingRight: 11,
    paddingLeft: 10,
    paddingBottom: 14,
  },
});
