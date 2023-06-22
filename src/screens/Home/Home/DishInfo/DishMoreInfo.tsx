import React, {useState} from 'react';
import {DynamicText, DynamicView} from '@/components';
import {Colors, fonts} from '@/themes';
import {Image, StyleSheet} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Divider} from 'native-base';
import RestaurantInfoAvatar from './RestaurantInfoAvatar';
import ActionSheet, {SheetProps} from 'react-native-actions-sheet';
import {IRestaurant} from '@/api/generic';
import {isEmpty} from 'lodash';
import moment from 'moment';
import DishFoodHygieneRating from '@/components/DishFoodHygieneRating';

export interface DishMoreInfoProps extends SheetProps {
  restaurant: any;
}

const DishMoreInfo = (props: DishMoreInfoProps) => {
  const rateImg = require('@/assets/images/rate.png');
  const [restaurant, setRestaurant] = useState<IRestaurant>({});
  const [distance, setDistance] = useState();

  const takingOrdersUntil = moment(restaurant.takingOrdersUntil).format(
    'hh:mma',
  );

  return (
    <ActionSheet
      id={'DishMoreInfo' || props.sheetId}
      onBeforeShow={(data: any) => {
        setRestaurant(data?.restaurant);
        setDistance(data?.distance);
      }}>
      <DynamicView position="relative" paddingTop={54}>
        <RestaurantInfoAvatar showProfile restaurant={restaurant} />
        <Divider bgColor={Colors.lightGrey} padding={1} />
        <DynamicView style={styles.descContainer}>
          <DynamicText
            fontFamily={fonts.DMSans400Regular}
            fontSize={13}
            lineHeight={16}
            textAlign="center"
            color={Colors.grey}>
            {restaurant.description}
          </DynamicText>
        </DynamicView>
        <DynamicView flexDirection="row" paddingLeft={60}>
          <DynamicView flexDirection="row" justifyContent="center">
            <DynamicView flexDirection="row" alignItems="center">
              <AntDesign name="star" color={'#E4A541'} size={27 / 2} />
              <DynamicView marginLeft={4}>
                <DynamicText
                  fontFamily={fonts.DMSans500Medium}
                  fontSize={13}
                  lineHeight={16}
                  color={Colors.black}>
                  {restaurant.averageRating}
                </DynamicText>
              </DynamicView>
            </DynamicView>
            <DynamicView marginHorizontal={25}>
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
                    color={Colors.black}>
                    Open until {takingOrdersUntil}
                  </DynamicText>
                </DynamicView>
              </DynamicView>
            </DynamicView>
          </DynamicView>
        </DynamicView>
        <DynamicView position="relative" alignItems="center" paddingTop={22}>
          {/*<Image source={rateImg} style={styles.rateImg} />*/}
          <DishFoodHygieneRating value={restaurant.hygieneRating} />
        </DynamicView>
      </DynamicView>
    </ActionSheet>
  );
};

export default DishMoreInfo;

const styles = StyleSheet.create({
  dishInfoLogo: {
    height: 74,
    width: 74,
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
