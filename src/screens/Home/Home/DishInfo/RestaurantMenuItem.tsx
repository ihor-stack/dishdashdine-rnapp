import {Image, StyleSheet} from 'react-native';
import React from 'react';
import {DynamicText, DynamicView} from '@/components';
import {Colors, fonts} from '@/themes';
import {ScrollView} from 'react-native-gesture-handler';

const burger = require('@/assets/images/burger_1.png');

const RestaurantMenuItem = () => {
  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <DynamicView
        borderColor={Colors.lightGrey}
        borderRadius={5}
        borderWidth={1}
        marginTop={15}
        marginRight={10}
        flexDirection="row"
        alignItems="center"
        paddingLeft={8}
        paddingRight={15}
        paddingVertical={8}>
        <Image source={burger} style={styles.burger_img} />
        <DynamicView marginLeft={10}>
          <DynamicText
            fontFamily={fonts.DMSans500Medium}
            fontSize={14}
            lineHeight={18.23}
            color={Colors.black}>
            Texas Belly Burger
          </DynamicText>
          <DynamicView marginTop={5}>
            <DynamicText
              fontFamily={fonts.DMSans400Regular}
              fontSize={13}
              lineHeight={18}
              color={Colors.grey}>
              from £6.50
            </DynamicText>
          </DynamicView>
        </DynamicView>
      </DynamicView>
      <DynamicView
        borderColor={Colors.lightGrey}
        borderRadius={5}
        borderWidth={1}
        marginTop={15}
        flexDirection="row"
        alignItems="center"
        paddingLeft={8}
        paddingRight={15}
        paddingVertical={8}>
        <Image source={burger} style={styles.burger_img} />
        <DynamicView marginLeft={10}>
          <DynamicText
            fontFamily={fonts.DMSans500Medium}
            fontSize={14}
            lineHeight={18.23}
            color={Colors.black}>
            Texas Belly Burger
          </DynamicText>
          <DynamicView marginTop={5}>
            <DynamicText
              fontFamily={fonts.DMSans400Regular}
              fontSize={13}
              lineHeight={18}
              color={Colors.grey}>
              from £6.50
            </DynamicText>
          </DynamicView>
        </DynamicView>
      </DynamicView>
    </ScrollView>
  );
};

export default RestaurantMenuItem;

const styles = StyleSheet.create({
  burger_img: {
    width: 80,
    height: 60,
  },
});
