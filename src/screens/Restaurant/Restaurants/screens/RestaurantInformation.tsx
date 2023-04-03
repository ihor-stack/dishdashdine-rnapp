import {StyleSheet} from 'react-native';
import React from 'react';
import {
  DynamicImage,
  DynamicPressable,
  DynamicText,
  DynamicView,
} from '@/components';
import {Colors, fonts} from '@/themes';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {adminRestaurantSelectors} from '@/store/admin_restaurant/restaurant';

const right = require('@/assets/images/right.png');
const settings = require('@/assets/images/settings.png');
const clock = require('@/assets/images/clock.png');
const phoneService = require('@/assets/images/phone-service.png');

const RestaurantInformation = () => {
  const {navigate} = useNavigation();
  const restaurant = useSelector(adminRestaurantSelectors.selectRestaurant);

  return (
    <DynamicView flex={1} backgroundColor={Colors.white}>
      <DynamicView paddingTop={19} paddingHorizontal={12}>
        <DynamicText style={styles.restoNameStyle}>
          {restaurant.name}
        </DynamicText>
      </DynamicView>
      <DynamicView paddingTop={24} paddingHorizontal={12}>
        <DynamicPressable
          style={styles.DynamicPressable}
          onPress={() => {
            navigate('RestaurantBasicInformation', {
              id: restaurant?.restaurantId,
              action: 'update',
            });
          }}>
          <DynamicView style={styles.imageView}>
            <DynamicImage
              source={settings}
              style={styles.imageStyle}
              resizeMode="contain"
            />
          </DynamicView>
          <DynamicView flex={0.84}>
            <DynamicText style={styles.textItemStyle}>
              Basic Settings
            </DynamicText>
          </DynamicView>
          <DynamicView flex={0.1} alignItems="center">
            <DynamicImage source={right} style={styles.arrowRighStyle} />
          </DynamicView>
        </DynamicPressable>
        <DynamicPressable
          style={styles.DynamicPressable}
          onPress={() => {
            navigate('OpeningHours', {
              id: restaurant?.restaurantId,
            });
          }}>
          <DynamicView style={styles.imageView}>
            <DynamicImage
              source={clock}
              style={styles.imageStyle}
              resizeMode="contain"
            />
          </DynamicView>
          <DynamicView flex={0.84}>
            <DynamicText style={styles.textItemStyle}>
              Opening Hours
            </DynamicText>
          </DynamicView>
          <DynamicView flex={0.1} alignItems="center">
            <DynamicImage source={right} style={styles.arrowRighStyle} />
          </DynamicView>
        </DynamicPressable>
        <DynamicPressable
          style={styles.DynamicPressable}
          onPress={() => {
            navigate('PreparationTime', {
              id: restaurant?.restaurantId,
            });
          }}>
          <DynamicView style={styles.imageView}>
            <DynamicImage
              source={phoneService}
              style={styles.imageStyle}
              resizeMode="contain"
            />
          </DynamicView>
          <DynamicView flex={0.84}>
            <DynamicText style={styles.textItemStyle}>
              Preparation Times
            </DynamicText>
          </DynamicView>
          <DynamicView flex={0.1} alignItems="center">
            <DynamicImage source={right} style={styles.arrowRighStyle} />
          </DynamicView>
        </DynamicPressable>
      </DynamicView>
    </DynamicView>
  );
};

export default RestaurantInformation;

const styles = StyleSheet.create({
  restoNameStyle: {
    fontFamily: fonts.DMSans500Medium,
    fontSize: 20,
    lineHeight: 26,
    color: Colors.black,
  },
  textItemStyle: {
    fontFamily: fonts.DMSans500Medium,
    fontSize: 14,
    lineHeight: 18,
    color: Colors.black,
  },
  imageView: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.06,
    marginRight: 24,
  },
  imageStyle: {
    alignSelf: 'center',
    width: 24,
    height: 20.95,
  },
  DynamicPressable: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 31,
  },
  arrowRighStyle: {
    width: 7.13,
    height: 11.67,
  },
});
