import React, {useCallback, useEffect, useState} from 'react';
import {DynamicPressable, DynamicText, DynamicView} from '@/components';
import {FlatList, RefreshControl, StyleSheet} from 'react-native';
import {Colors, fonts} from '@/themes';
import LinearGradient from 'react-native-linear-gradient';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  adminRestaurantSelectors,
  clearSelectedRestaurant,
} from '@/store/admin_restaurant/restaurant';
import FastImage from 'react-native-fast-image';
import {setSelectedRestaurant} from '@/store/admin_restaurant/restaurant';
import {ms} from 'react-native-size-matters';
import EmptyAdminState from '../../EmptyAdminState';
import {fetchAllRestaurants} from '@/store/admin_restaurant/restaurant/thunk';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import DishButton from '@/components/DishButton';
import {closeShowOrderFilter} from '@/store/home';

const FAKE_DATA = Array.from({
  length: 10,
});

const Restaurants = () => {
  const {navigate} = useNavigation<any>();
  const dispatch = useDispatch<any>();
  const [refreshing, setRefreshing] = useState(false);

  const restaurants: any[] = useSelector(
    adminRestaurantSelectors.selectRestaurants,
  );
  const isLoading: boolean = useSelector(
    adminRestaurantSelectors.showLoadingRestaurants,
  );

  useFocusEffect(
    useCallback(() => {
      dispatch(clearSelectedRestaurant());
      dispatch(closeShowOrderFilter());
    }, [dispatch]),
  );

  useEffect(() => {
    const init = async () => {
      await dispatch(fetchAllRestaurants());
    };

    init();
  }, [dispatch]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await dispatch(fetchAllRestaurants());
    setRefreshing(false);
  }, [dispatch]);

  const renderItem = ({item, index}) => {
    return (
      <DynamicPressable
        key={index}
        onPress={async () => {
          await dispatch(setSelectedRestaurant(item));
          navigate('RestaurantBottomNavStack', {
            restaurantId: item?.restaurantId,
            action: 'update',
          });
        }}>
        <FastImage
          key={index}
          style={{...styles.ImageBackground, width: '100%', height: ms(202)}}
          source={{
            uri: item?.bannerImagePath,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}>
          <LinearGradient
            colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)']}
            style={styles.linearGradient}>
            <DynamicView>
              <DynamicText
                style={{
                  ...styles.itemTextStyle,
                  fontFamily: fonts.DMSans700Bold,
                }}>
                {item.name}
              </DynamicText>
              <DynamicText
                style={{
                  ...styles.itemTextStyle,
                  fontFamily: fonts.DMSans400Regular,
                }}>
                {item.streetAddress} {item.city}
              </DynamicText>
            </DynamicView>
          </LinearGradient>
        </FastImage>
      </DynamicPressable>
    );
  };

  const renderLoadingItems = () => (
    <SkeletonPlaceholder>
      <SkeletonPlaceholder.Item
        borderRadius={8}
        height={220}
        flexDirection="row"
        alignItems="center"
        marginBottom={20}
      />
    </SkeletonPlaceholder>
  );

  return (
    <DynamicView flex={1}>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={{
          backgroundColor: Colors.lightGrey,
        }}
        data={isLoading ? FAKE_DATA : restaurants}
        contentContainerStyle={styles.container}
        renderItem={isLoading ? renderLoadingItems : renderItem}
        ListEmptyComponent={() => (
          <EmptyAdminState
            title="No Restaurants yet"
            message={'Hit the button down below to add \n a new restaurant'}
            messageStyle={{textAlign: 'center'}}
            showImage={true}
          />
        )}
      />
      <DynamicView marginBottom={30} marginLeft={22} marginRight={26}>
        <DishButton
          icon="arrowright"
          label="Add Restaurant"
          variant="primary"
          onPress={() => {
            navigate('RestaurantBasicInformation', {action: 'add'});
          }}
        />
      </DynamicView>
    </DynamicView>
  );
};

export default Restaurants;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 11,
    backgroundColor: Colors.lightGrey,
    paddingHorizontal: 14,
    paddingBottom: 20,
  },
  ImageStyle: {
    borderRadius: 8,
  },
  ImageBackground: {
    height: 200,
    marginTop: 20,
    position: 'relative',
    borderRadius: 8,
  },
  linearGradient: {
    position: 'absolute',
    paddingLeft: 15,
    paddingBottom: 13,
    left: 0,
    bottom: 0,
    right: 0,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    height: 97,
    justifyContent: 'flex-end',
  },
  itemTextStyle: {
    fontSize: 14,
    lineHeight: 18,
    color: Colors.white,
  },
});
