import React, { useEffect, useState } from 'react';
import {Dimensions, Platform, StyleSheet} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {
  AnimatedText,
  DynamicAnimatedView,
  DynamicPressable,
  DynamicText,
  DynamicView,
} from '@/components';
import {Colors, fonts} from '@/themes';
import {IPreparationTimes, IRestaurant} from '@/api/generic';
import {SheetManager} from 'react-native-actions-sheet';
import moment from 'moment';
import {isEmpty} from 'lodash';
import FastImage from 'react-native-fast-image';
import {SharedElement} from 'react-navigation-shared-element';
import ChefHat from '@/assets/svg/chefHat.svg';
import { VStack, Text } from 'native-base';

const noProfile = require('@/assets/images/no-image-found.jpeg');
const noBanner = require('@/assets/images/blank.jpg');
const AnimatedFastImage = Animated.createAnimatedComponent(FastImage);
const {width} = Dimensions.get('window');

type TopSectionProps = {
  y: Animated.SharedValue<number>;
  restaurant: IRestaurant;
};

const TopSection = ({y, restaurant}: TopSectionProps) => {
  const [distance, setDistance] = useState<string>("");
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  const takingOrdersUntil = moment(restaurant.takingOrdersUntil).format(
    'hh:mma',
  );

  useEffect(() => {
    if (!isInitialized) {
      if (restaurant?.distanceMiles) {
        if (restaurant?.distanceMiles < 0.1) {
          setDistance(`${restaurant?.distanceMetres?.toFixed(1)} meters`)
        } else {
          setDistance(`${restaurant?.distanceMiles?.toFixed(1)} miles`)
        }
      } else {
        setDistance('0 miles');
      }
    }
    setIsInitialized(true)
  }, [restaurant]);

  const displayPrepTime = () => {
    const { preparationTimes } = restaurant;
    let prepTimeMin = restaurant.prepTimeMin
    let prepTimeMax = restaurant.prepTimeMax
    const enabledTime = preparationTimes.filter((item: IPreparationTimes) => {
      return item.enabled
    })

    if (enabledTime.length > 0) {
      prepTimeMin = enabledTime[0].prepTimeMin
      prepTimeMax = enabledTime[0].prepTimeMax
    }

    let minTimeText = ""
    if (prepTimeMin < 60) {
      minTimeText += `${prepTimeMin}${prepTimeMax < 120 ? "mins" : "mins"}`
    } else if (prepTimeMin > 60 && prepTimeMin < 1440) {
      const hrs = Math.trunc(prepTimeMin / 60)
      minTimeText += `${hrs > 1 ? hrs : prepTimeMin}${hrs > 1 ? "" : "mins"}`
    } else if (prepTimeMin >= 1440) {
      const days = Math.trunc(prepTimeMin / 1440)
      const hrs = Math.trunc(prepTimeMin / 60)
      minTimeText += `${days >= 1 ? days : hrs}${days >= 1 ? days > 1 ? "days" : "day" : "hrs"}`
    }
    
    let maxTimeText = ""
    if (prepTimeMax < 60) {
      maxTimeText += `${prepTimeMax} mins`
    } else if (prepTimeMax > 60 && prepTimeMax < 1440) {
      const hrs = Math.trunc(prepTimeMax / 60)
      maxTimeText += `${hrs}${hrs > 1 ? "hrs" : "hr"}`
    } else if (prepTimeMax >= 1440) {
      const days = Math.trunc(prepTimeMax / 1440)
      const hrs = Math.trunc(prepTimeMax / 60)
      maxTimeText += `${days >= 1 ? days : hrs}${days >= 1 ? days > 1 ? "days" : "day" : "hrs"}`
    }

    if (prepTimeMin === 0 && prepTimeMax === 0) {
      return ""
    }

    if (minTimeText !== "" && maxTimeText !== "") {
      return minTimeText + "-" + maxTimeText
    } else  if (minTimeText === "") {
      return maxTimeText
    } else if (maxTimeText === "") {
      return minTimeText
    }
    return ""
  };
  
  const topImgStyle = useAnimatedStyle(() => {
    const inputRange = [0, Platform.OS === 'ios' ? 96 : 96 - 10];
    const height = interpolate(
      y.value,
      inputRange,
      [196, 0],
      Extrapolate.CLAMP,
    );
    const opacity = interpolate(y.value, inputRange, [1, 0], Extrapolate.CLAMP);
    return {
      opacity,
      height,
    };
  }, [y.value]);

  const dishInfoLogoStyle = useAnimatedStyle(() => {
    const inputRange = [0, 53];
    const top = interpolate(y.value, inputRange, [139, 60], Extrapolate.CLAMP);
    const opacity = interpolate(y.value, inputRange, [1, 0], Extrapolate.CLAMP);
    return {
      top,
      opacity,
    };
  }, [y.value]);

  const textWidth = useSharedValue(0);

  return (
    <DynamicView>
      <SharedElement id={`item.${restaurant?.restaurantId}.bannerImagePath`}>
        {!isEmpty(restaurant?.bannerImagePath) ? (
          <AnimatedFastImage
            style={[topImgStyle, styles.topImg]}
            source={{
              uri: restaurant.bannerImagePath,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        ) : (
          <Animated.Image
            source={noBanner}
            style={[topImgStyle, styles.topImg]}
          />
        )}
        {!isEmpty(restaurant?.logoImagePath) ? (
          <AnimatedFastImage
            source={{
              uri: restaurant?.logoImagePath,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
            style={[dishInfoLogoStyle, styles.dishInfoLogo]}
          />
        ) : (
          <Animated.Image
            source={noProfile}
            style={[dishInfoLogoStyle, styles.dishInfoLogo]}
          />
        )}
      </SharedElement>
      <DynamicAnimatedView
        paddingHorizontal={11}
        borderBottomWidth={6}
        borderBottomColor="#F2F4F5"
        paddingBottom={19}>
        <DynamicView alignItems="flex-start" marginBottom={11}>
          <AnimatedText
            style={useAnimatedStyle(() => {
              return {
                color: Colors.black,
                fontFamily: fonts.DMSans700Bold,
                fontSize: interpolate(y.value, [0, 53], [40, 24]),
                lineHeight: interpolate(y.value, [0, 53], [43, 31]),
                left: interpolate(
                  y.value,
                  [0, 53],
                  [0, (width - 22) / 2 - textWidth.value / 2 - 11],
                ),
              };
            })}
            onLayout={({nativeEvent}) => {
              textWidth.value = nativeEvent.layout.width;
            }}>
            {restaurant?.name}
          </AnimatedText>
        </DynamicView>
        <DynamicView flexDirection="row">
          <DynamicView flexDirection="row">
            {restaurant?.averageRating > 0 && (
              <DynamicView flexDirection="row" alignItems="center">
                <AntDesign name="star" color={'#E4A541'} size={27 / 2} />
                <DynamicView marginLeft={4}>
                  <DynamicText
                    fontFamily={fonts.DMSans500Medium}
                    fontSize={13}
                    lineHeight={16}
                    color={Colors.black}>
                    {restaurant?.averageRating}
                  </DynamicText>
                </DynamicView>
              </DynamicView>
            )}
            <DynamicView
              marginHorizontal={restaurant?.averageRating > 0 ? 25 : 0}
              marginRight={restaurant?.averageRating > 0 ? 0 : 25}>
              <DynamicView flexDirection="row" alignItems="center">
                <AntDesign
                  name="enviromento"
                  color={Colors.black}
                  size={27 / 2}
                />
                <DynamicView marginLeft={4}>
                  <DynamicText
                    fontFamily={fonts.DMSans500Medium}
                    fontSize={13}
                    lineHeight={16}
                    color={Colors.black}>
                    {distance}
                  </DynamicText>
                </DynamicView>
              </DynamicView>
            </DynamicView>
            <DynamicView marginRight={25}>
                <DynamicView flexDirection="row" alignItems="center">
                  <AntDesign
                    name="clockcircleo"
                    color={Colors.black}
                    size={27 / 2}
                  />
                  <DynamicView marginLeft={4}>
                    <DynamicText
                      fontFamily={fonts.DMSans500Medium}
                      fontSize={13}
                      lineHeight={16}
                      marginTop={0}
                      color={Colors.black}>
                        {displayPrepTime()}
                    </DynamicText>
                  </DynamicView>
                </DynamicView>
              </DynamicView>
            <DynamicView>
              <DynamicView flexDirection="row" alignItems="center">
                <AntDesign
                  name="infocirlceo"
                  color={Colors.black}
                  size={27 / 2}
                />
                <DynamicPressable
                  marginLeft={4}
                  onPress={() => {
                    SheetManager.show('DishMoreInfo', {
                      payload: {
                        restaurant,
                      },
                    });
                  }}>
                  <DynamicText
                    fontFamily={fonts.DMSans500Medium}
                    fontSize={13}
                    lineHeight={16}
                    textDecorationLine="underline"
                    color={Colors.black}>
                    More Info
                  </DynamicText>
                </DynamicPressable>
              </DynamicView>
            </DynamicView>
          </DynamicView>
        </DynamicView>
        <DynamicView marginTop={24} marginBottom={11}>
          <DynamicText
            fontFamily={fonts.DMSans400Regular}
            color="#818183"
            fontSize={13}
            lineHeight={16}>
            {restaurant?.description}
          </DynamicText>
        </DynamicView>
        {restaurant?.takingOrders && (
          <DynamicView flexDirection="row" alignItems="center">
            <MaterialIcons size={12} name="stop-circle" color="#12E767" />
            <DynamicView marginLeft={9}>
              <DynamicText
                fontFamily={fonts.DMSans400Regular}
                color={Colors.black}
                fontSize={13}
                lineHeight={16}>
                Taking orders until{' '}
                {!isEmpty(restaurant.takingOrdersUntil)
                  ? takingOrdersUntil
                  : '--:--'}
              </DynamicText>
            </DynamicView>
          </DynamicView>
        )}
        {restaurant.offersEventCatering && (
          <DynamicPressable
            backgroundColor={Colors.ember}
            flexDirection="row"
            width={190}
            minHeight={30}
            justifyContent="space-evenly"
            paddingVertical={10}
            paddingHorizontal={19}
            borderRadius={4}
            marginTop={17}
            alignItems="center"
            onPress={async () => {
              await SheetManager.show('EventsCateringModal');
            }}>
            <DynamicView marginRight={12}>
              <ChefHat width={18} height={18} />
            </DynamicView>
            <DynamicText
              color={Colors.white}
              fontFamily={fonts.DMSans500Medium}
              fontSize={14}
              lineHeight={18}>
              Events & Catering
            </DynamicText>
          </DynamicPressable>
        )}
      </DynamicAnimatedView>
    </DynamicView>
  );
};

export default TopSection;

const styles = StyleSheet.create({
  topImg: {
    width,
    marginBottom: 40,
  },
  dishInfoLogo: {
    top: -443,
    height: 75,
    width: 75,
    position: 'absolute',
    left: 11,
    justifyContent: 'center',
    backgroundColor: Colors.lightestGrey,
    borderWidth: 1,
    borderColor: Colors.darkGrey,
    borderRadius: 999,
  },
});
