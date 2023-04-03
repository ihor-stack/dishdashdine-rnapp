import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Button, Icon} from 'native-base';

import {
  DynamicImageBackground,
  DynamicPressable,
  DynamicText,
  DynamicView,
} from '@/components';

import {Colors, fonts} from '@/themes';
import {DISH_ITEMS} from '@/constants/fakeData';
import {HomeStackParamList} from '@/navigation/types';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {useIsMounted} from '@/hooks/useIsMounted';
import NoDishes from './NoDishes';

const Dishes = () => {
  const {navigate} = useNavigation<StackNavigationProp<HomeStackParamList>>();
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useIsMounted();

  useEffect(() => {
    if (isMounted.current) {
      setIsLoading(true);
    }

    setTimeout(() => {
      if (isMounted.current) {
        setIsLoading(false);
      }
    }, 2000);
  }, []);

  const renderDishesLoading = (index: number) => {
    return (
      <SkeletonPlaceholder key={index}>
        <SkeletonPlaceholder.Item
          width={316}
          height={144}
          borderRadius={4}
          marginHorizontal={6}
        />
        <SkeletonPlaceholder.Item
          width={74}
          height={18}
          borderRadius={6}
          marginHorizontal={6}
          marginTop={11}
        />
        <View style={styles.viewContainer}>
          <SkeletonPlaceholder.Item
            width={38}
            height={15}
            borderRadius={6}
            marginHorizontal={6}
          />
          <SkeletonPlaceholder.Item
            width={69}
            height={15}
            borderRadius={6}
            marginHorizontal={6}
          />
          <SkeletonPlaceholder.Item
            width={69}
            height={15}
            borderRadius={6}
            marginHorizontal={6}
          />
        </View>
      </SkeletonPlaceholder>
    );
  };

  const renderDishesItem = (item: any, i: number) => {
    return (
      <DynamicView
        paddingRight={i === DISH_ITEMS.length - 1 ? 12 * 2 : 12}
        key={`dish:${i}`}>
        <DynamicPressable
          onPress={() => {
            navigate('DishInfo');
          }}>
          <DynamicImageBackground source={item.image} width={256} height={146}>
            <DynamicView
              backgroundColor="#fff"
              position="absolute"
              width={27}
              height={27}
              borderRadius={27 / 2}
              alignItems="center"
              justifyContent="center"
              right={13}
              top={10}>
              <AntDesign name="hearto" color={Colors.red} size={27 / 2} />
            </DynamicView>
          </DynamicImageBackground>
        </DynamicPressable>
        <DynamicView marginTop={11} marginBottom={6}>
          <DynamicText
            fontFamily={fonts.DMSans700Bold}
            fontSize={15}
            lineHeight={20}
            color={Colors.black}>
            {item.title}
          </DynamicText>
        </DynamicView>
        <DynamicView flexDirection="row">
          <DynamicView flexDirection="row" alignItems="center">
            <AntDesign name="star" color={'#E4A541'} size={27 / 2} />
            <DynamicView marginLeft={4}>
              <DynamicText
                fontFamily={fonts.DMSans500Medium}
                fontSize={13}
                lineHeight={16}
                color={Colors.black}>
                {item.rating}
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
                  {item.distance} miles
                </DynamicText>
              </DynamicView>
            </DynamicView>
          </DynamicView>
          <DynamicView>
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
                  {item.time} mins
                </DynamicText>
              </DynamicView>
            </DynamicView>
          </DynamicView>
        </DynamicView>
      </DynamicView>
    );
  };

  return (
    <DynamicView>
      <DynamicView
        flexDirection="row"
        alignItems="center"
        marginTop={27}
        marginBottom={10}
        justifyContent="space-between"
        marginHorizontal={11}>
        <DynamicText
          fontFamily={fonts.DMSans700Bold}
          fontSize={20}
          lineHeight={26}
          color={Colors.black}>
          Dish It
        </DynamicText>
        <Button variant="link" p={0}>
          <Icon
            as={<AntDesign name="arrowright" />}
            size={5}
            color={Colors.black}
          />
        </Button>
      </DynamicView>
      <ScrollView
        decelerationRate="fast"
        snapToInterval={256}
        bounces={false}
        showsHorizontalScrollIndicator={false}
        horizontal
        style={styles.contentContainer}>
        {isLoading
          ? DISH_ITEMS.map((_, index) => {
              return renderDishesLoading(index);
            })
          : DISH_ITEMS.map((item, index) => {
              return renderDishesItem(item, index);
            })}
      </ScrollView>
      {/* <NoDishes /> */}
    </DynamicView>
  );
};

export default Dishes;

const styles = StyleSheet.create({
  contentContainer: {
    flexDirection: 'row',
    paddingLeft: 11,
  },
  viewContainer: {
    marginTop: 9,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
});
