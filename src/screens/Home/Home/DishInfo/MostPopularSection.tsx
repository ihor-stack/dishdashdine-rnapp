import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {
  DynamicImage,
  DynamicPressable,
  DynamicText,
  DynamicView,
} from '@/components';
import {Colors, fonts} from '@/themes';
import {IMenu, IRestaurant} from '@/api/generic';
import {isEmpty} from 'lodash';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {SharedElement} from 'react-navigation-shared-element';
import {accountSelectors, clearCurrentUser} from '@/store/account';
import {IUser} from '@/api/user';
import {useDispatch, useSelector} from 'react-redux';
import {setIsAuthenticated} from '@/store/authentication';

const noImage = require('@/assets/images/no-image.png');

interface CustomizeItemOrderProps {
  onPressCustomOrder?: any;
  restaurants: IRestaurant;
  popularMenus: any[];
  activeMenu: IMenu;
  showLoading?: boolean;
}

const FAKE_DATA: any[] = Array.from({
  length: 10,
});

const MostPopularSection = ({
  popularMenus,
  activeMenu,
  showLoading,
  restaurants,
}: CustomizeItemOrderProps) => {
  const dispatch = useDispatch<any>();
  const navigation = useNavigation<any>();
  const currentUser = useSelector(accountSelectors.selectCurrentUser) as IUser;

  const renderItem = ({item, index}) => {
    return (
      <DynamicPressable
        key={`mp:${index}`}
        width={256}
        marginRight={12}
        onPress={async () => {
          if (!currentUser?.noAuth) {
            navigation.navigate('CustomizeItemOrder', {
              restaurantId: restaurants.restaurantId,
              itemId: item.itemId,
              menuItem: item,
              activeMenu,
            });
          } else {
            // await dispatch(setIsAuthenticated(false));
            // await dispatch(clearCurrentUser());
            navigation.navigate('Register', {
              // screen: 'Register',
              params: {
                isFrom: 'guest',
              },
            });
          }
        }}>
        <SharedElement id={`item.${item?.itemId}.photo`}>
          {!isEmpty(item.largeImagePath) ? (
            <FastImage
              style={{width: 256, height: 146, borderRadius: 4}}
              source={{
                uri: item.largeImagePath,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
          ) : (
            <DynamicImage width={256} height={146} source={noImage} />
          )}
        </SharedElement>
        <DynamicView marginTop={11} marginBottom={12}>
          <DynamicText
            fontSize={15}
            lineHeight={20}
            color={Colors.black}
            fontFamily={fonts.DMSans700Bold}>
            {item.name}
          </DynamicText>
        </DynamicView>
        <DynamicText
          fontSize={13}
          lineHeight={16}
          fontFamily={fonts.DMSans400Regular}
          color="#818183"
          numberOfLines={2}>
          {item.description}
        </DynamicText>
      </DynamicPressable>
    );
  };

  const renderLoadingSkeleton = () => (
    <SkeletonPlaceholder>
      <SkeletonPlaceholder.Item marginHorizontal={6.5}>
        <SkeletonPlaceholder.Item height={146} width={256} borderRadius={4} />
        <SkeletonPlaceholder.Item marginTop={6}>
          <SkeletonPlaceholder.Item width={120} height={20} borderRadius={4} />
          <SkeletonPlaceholder.Item
            marginTop={6}
            width={200}
            height={16}
            borderRadius={4}
          />
          <SkeletonPlaceholder.Item
            marginTop={6}
            width={200}
            height={16}
            borderRadius={4}
          />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );

  return (
    <DynamicView paddingTop={29}>
      {!isEmpty(popularMenus) && (
        <DynamicView marginLeft={11} marginBottom={15}>
          <DynamicText
            color={Colors.black}
            fontFamily={fonts.DMSans700Bold}
            fontSize={24}
            lineHeight={31}>
            Most Popular
          </DynamicText>
        </DynamicView>
      )}

      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerStyle={styles.ScrollViewContainerStyle2}
        data={showLoading ? FAKE_DATA : popularMenus}
        // keyExtractor={item => item.id}
        renderItem={showLoading ? renderLoadingSkeleton : renderItem}
      />
    </DynamicView>
  );
};

export default MostPopularSection;

const styles = StyleSheet.create({
  ScrollViewContainerStyle: {
    paddingLeft: 11,
    paddingBottom: 18,
  },
  ScrollViewContainerStyle2: {
    flexDirection: 'row',
    paddingLeft: 11,
    paddingBottom: 18,
    marginBottom: 18,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGrey,
  },
});
