import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/core';

import {
  DynamicImageBackground,
  DynamicPressable,
  DynamicText,
  DynamicView,
} from '@/components';
import {fonts} from '@/themes/fonts';
import {useIsMounted} from '@/hooks/useIsMounted';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {Colors} from '@/themes';
import {isEmpty} from 'lodash';
import {IAppPromo} from '@/api/generic';

type Props = {
  appPromo: IAppPromo[];
};

const AppPromoCard = (props: Props) => {
  const {appPromo} = props;

  const navigation = useNavigation<any>();

  const FAKE_DATA: any[] = Array.from({
    length: 10,
  });
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useIsMounted();

  const renderCardItem = (item: IAppPromo, index: number) => {
    return (
      <DynamicImageBackground
        key={index}
        source={{uri: item.imagePath}}
        resizeMode="cover"
        aspectRatio={316 / 144}
        width={316}
        height={144}
        borderRadius={4}
        marginHorizontal={11}>
        <DynamicView width={316 * 0.75} padding={16} justifyContent="center">
          <DynamicText
            fontFamily={fonts.DMSans700Bold}
            fontSize={20}
            height="100%"
            lineHeight={22}
            color="#fff">
            {item.title}
          </DynamicText>
          <DynamicView marginTop={6} marginBottom={15}>
            <DynamicText
              fontFamily={fonts.DMSans500Medium}
              fontSize={13}
              lineHeight={16}
              color="#fff">
              {item.body}
            </DynamicText>
          </DynamicView>
          <DynamicPressable
            width="43%"
            flexDirection="row"
            justifyContent="space-between"
            onPress={() => {
              navigation.navigate('DishInfo', {id: item.restaurantId});
            }}
            alignItems="center">
            <DynamicText
              fontFamily={fonts.DMSans700Bold}
              fontSize={13}
              lineHeight={14}
              color="#fff">
              Explore now
            </DynamicText>
            <AntDesign name="arrowright" size={14} color="#fff" />
          </DynamicPressable>
        </DynamicView>
      </DynamicImageBackground>
    );
  };

  const renderCardLoading = (index: number) => {
    return (
      <SkeletonPlaceholder key={index}>
        <SkeletonPlaceholder.Item
          width={316}
          height={144}
          borderRadius={4}
          marginHorizontal={6}
        />
      </SkeletonPlaceholder>
    );
  };

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

  return (
    <ScrollView
      decelerationRate="fast"
      snapToInterval={316}
      bounces={false}
      showsHorizontalScrollIndicator={false}
      horizontal
      style={styles.contentContainer}>
      {isLoading
        ? FAKE_DATA.map((_, index) => {
          return renderCardLoading(index);
        })
        : !isEmpty(appPromo) &&
          appPromo?.map((item, index) => {
            return renderCardItem(item, index);
          })}
    </ScrollView>
  );
};

export default AppPromoCard;

const styles = StyleSheet.create({
  contentContainer: {
    flexDirection: 'row',
    paddingTop: 20,
  },
  FlatList: {
    backgroundColor: Colors.black,
  },
  FlatListContainer: {
    marginBottom: 15,
    backgroundColor: Colors.white,
  },
});
