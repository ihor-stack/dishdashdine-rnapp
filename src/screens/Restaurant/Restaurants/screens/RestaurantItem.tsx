import React, {useEffect, useState} from 'react';
import {
  DynamicImage,
  DynamicPressable,
  DynamicText,
  DynamicView,
} from '@/components';
import {Colors, fonts} from '@/themes';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {adminRestaurantSelectors} from '@/store/admin_restaurant/restaurant';
import UserService from '@/api/user';
import {forceSignOut} from '@/utils/app-actions';
import {captureErrorException} from '@/utils/error-handler';
import {accountSelectors, clearCurrentUser} from '@/store/account';
import {Divider} from 'native-base';
import DishSpinner from '@/components/DishSpinner';
import {fetchPreparationTimes} from '@/store/admin_restaurant/restaurant/thunk';
import {AnyAction} from 'redux';

const right = require('@/assets/images/right.png');
const spanner = require('@/assets/images/spanner.png');
const settings = require('@/assets/images/settings.png');
const clock = require('@/assets/images/clock.png');
const phoneService = require('@/assets/images/phone-service.png');
const delivery = require('@/assets/images/delivery.png');

const RestaurantItem = () => {
  const navigation = useNavigation<any>();
  const restaurant = useSelector(adminRestaurantSelectors.selectRestaurant);

  useEffect(() => {
    const handlePreparationTimes = async () => {
      setIsLoading(true);
      await dispatch(
        fetchPreparationTimes(restaurant.restaurantId) as unknown as AnyAction,
      );
      setIsLoading(false);
    };

    handlePreparationTimes();
  }, []);

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const pushNotificationToken = useSelector(
    accountSelectors.selectDevicePushToken,
  );

  const onSignOut = async () => {
    try {
      setIsLoading(true);
      if (pushNotificationToken) {
        await UserService.deletePushNotificationToken({
          deviceToken: pushNotificationToken,
        });
      }
      setIsLoading(false);
      await dispatch(clearCurrentUser());
      await forceSignOut(dispatch);
    } catch (error) {
      setIsLoading(false);
      captureErrorException(error);
      await dispatch(clearCurrentUser());
      await forceSignOut(dispatch);
    }
  };

  return (
    <>
      {isLoading && <DishSpinner />}
      <DynamicView flex={1} backgroundColor={Colors.white}>
        <DynamicView paddingTop={19} paddingHorizontal={12}>
          <DynamicText style={styles.restoNameStyle}>
            {restaurant?.name}
          </DynamicText>
        </DynamicView>
        <DynamicView paddingTop={24} paddingHorizontal={12}>
          <DynamicPressable
            style={styles.DynamicPressable}
            onPress={() => {
              navigation.navigate('RestaurantBasicInformation', {
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
              navigation.navigate('OpeningHours', {
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
              navigation.navigate('PreparationTime', {
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
          <DynamicPressable
            style={styles.DynamicPressable}
            onPress={() => {
              navigation.navigate('ModifierGroups', {
                restaurantId: restaurant.restaurantId,
              });
            }}>
            <DynamicView style={styles.imageView}>
              <DynamicImage
                source={spanner}
                style={styles.imageStyle}
                resizeMode="contain"
              />
            </DynamicView>
            <DynamicView flex={0.84}>
              <DynamicText style={styles.textItemStyle}>
                Modifier Groups
              </DynamicText>
            </DynamicView>
            <DynamicView flex={0.1} alignItems="center">
              <DynamicImage source={right} style={styles.arrowRighStyle} />
            </DynamicView>
          </DynamicPressable>
          <DynamicPressable
            style={styles.DynamicPressable}
            onPress={() => {
              navigation.navigate('RestaurantDelivery', {
                id: restaurant?.restaurantId,
              });
            }}>
            <DynamicView style={styles.imageView}>
              <DynamicImage
                source={delivery}
                style={styles.imageStyle}
                resizeMode="contain"
              />
            </DynamicView>
            <DynamicView flex={0.84}>
              <DynamicText style={styles.textItemStyle}>Delivery</DynamicText>
            </DynamicView>
            <DynamicView flex={0.1} alignItems="center">
              <DynamicImage source={right} style={styles.arrowRighStyle} />
            </DynamicView>
          </DynamicPressable>
          <Divider color={Colors.grey} />
          <DynamicPressable
            alignItems="center"
            flexDirection="row"
            justifyContent="space-between"
            paddingVertical={16}
            onPress={onSignOut}>
            <DynamicView flex={0.84}>
              <DynamicText
                marginBottom={5}
                fontSize={15}
                lineHeight={20}
                fontFamily={fonts.DMSans700Bold}>
                Sign out
              </DynamicText>
            </DynamicView>
            <DynamicView flex={0.1} alignItems="center">
              <DynamicImage source={right} style={styles.arrowRighStyle} />
            </DynamicView>
          </DynamicPressable>
        </DynamicView>
      </DynamicView>
    </>
  );
};

export default RestaurantItem;

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
    width: 8.13,
    height: 12.67,
  },
});
