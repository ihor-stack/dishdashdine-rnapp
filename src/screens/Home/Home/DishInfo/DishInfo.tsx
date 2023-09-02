import React, {useCallback, useEffect, useState} from 'react';
import {
  LayoutRectangle,
  Platform,
  RefreshControl,
  StyleSheet,
} from 'react-native';

import Animated, {
  interpolate,
  interpolateColor,
  scrollTo,
  useAnimatedProps,
  useAnimatedReaction,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {Pressable} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {flattenDeep, isEmpty} from 'lodash';
import FastImage from 'react-native-fast-image';
import {SheetManager} from 'react-native-actions-sheet';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {SharedElement} from 'react-navigation-shared-element';

import {
  AnimatedText,
  DynamicAnimatedView,
  DynamicImage,
  DynamicPressable,
  DynamicText,
  DynamicView,
} from '@/components';
import {Colors, fonts} from '@/themes';
import DishButton from '@/components/DishButton';
import TopSection from './TopSection';
import MostPopularSection from './MostPopularSection';
import Categories from './Categories';
import {
  getRestaurant,
  getRestaurantMenus,
  getRestaurantPopularMenus,
} from '@/store/restaurants/thunk';
import {restaurantSelectors} from '@/store/restaurants';
import {IMenus, IOrder, IRestaurant} from '@/api/generic';
import DishSpinner from '@/components/DishSpinner';
import DishInfoOrderStatus from '@/screens/Home/Home/DishInfo/DishInfoOrderStatus';
import {
  fetchActiveOrder,
  fetchCompletedOrder,
  fetchRestaurantOrder,
  initiateOrder,
} from '@/store/order/thunk';
import {accountSelectors} from '@/store/account';
import {IUser} from '@/api/user';
import {ORDER_STATUS_ENUM} from '@/constants';

const AnimatedAntDesign = Animated.createAnimatedComponent(AntDesign);
const noImage = require('@/assets/images/no-image.png');

const FAKE_DATA: any[] = Array.from({
  length: 10,
});

const DishInfo = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const {top} = useSafeAreaInsets();
  const params = useRoute().params as any;
  const isFrom: any = params?.isFrom;
  // initialize y to calculate where the user is scrolling vertically
  const scrollY = useSharedValue(0);
  const currentIndex = useSharedValue(0);
  const wholeHeight = useSharedValue(0);
  const visibleHeight = useSharedValue(0);
  const scrollYLayouts = useSharedValue<LayoutRectangle[]>([]);
  const scrollXLayouts = useSharedValue<LayoutRectangle[]>([]);

  const [activeOrder, setActiveOrder] = useState<IOrder | any>({});
  const [popularMenus, setPopularMenus] = useState([]);
  const [orderStatus, setOrderStatus] = useState<number>(0);
  const [refreshing, setRefreshing] = useState(false);
  const restaurant: IRestaurant = useSelector(
    restaurantSelectors.selectRestaurant,
  );
  const loadingRestaurant = useSelector(restaurantSelectors.showLoadingResto);
  const activeMenu = useSelector(restaurantSelectors.selectRestaurantMenu);
  const currentUser = useSelector(accountSelectors.selectCurrentUser) as IUser;
  // y scrollYLayouts scroll ref
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  // x scrollXLayouts scroll ref
  const horizontalRef = useAnimatedRef<Animated.ScrollView>();
  const restaurantID = params?.id;
  const dispatch = useDispatch<any>();

  // watch scrollY offset changes
  useAnimatedReaction(
    () => scrollY,
    scrollY => {
      if (
        wholeHeight.value &&
        visibleHeight.value &&
        scrollY.value &&
        scrollXLayouts.value.length &&
        scrollYLayouts.value.length
      ) {
        // get scroll indicator size
        const indicatorSize =
          wholeHeight.value > visibleHeight.value
            ? (visibleHeight.value * visibleHeight.value) / wholeHeight.value
            : visibleHeight.value;

        // watch where the current scroll is at and get the index
        const x = Math.round(
          interpolate(
            scrollY.value,
            scrollYLayouts.value
              .filter(e => !!e && !!e.y)
              .map(e => e.y - indicatorSize / 2),
            scrollYLayouts.value.map((_, i) => i),
          ),
        );

        // when x index is true, react top tab scroll
        if (scrollXLayouts.value.length && x > -1 && scrollXLayouts.value[x]) {
          currentIndex.value = x;
          scrollTo(horizontalRef, scrollXLayouts.value[x].x, 0, true);
        }
      }
    },
  );

  const init = async () => {
    await dispatch(getRestaurant(restaurantID));
    const response: IMenus = await dispatch(
      getRestaurantMenus(restaurantID),
    ).unwrap();

    if (response && response.activeMenu) {
      await dispatch(
        getRestaurantPopularMenus({
          id: restaurantID,
          menuId: response.activeMenu?.menuId,
        }),
      );
    }

    if (!currentUser?.noAuth) {
      const _order: IOrder = await dispatch(
        initiateOrder(restaurantID),
      ).unwrap();

      if (!isEmpty(_order)) {
        const hasOrder: IOrder = await dispatch(
          fetchRestaurantOrder(_order.id),
        ).unwrap();
        if (!isEmpty(hasOrder)) {
          setActiveOrder(hasOrder);
          setOrderStatus(hasOrder.orderStatus);
        }
      }
      // dispatch(fetchOrder());
      Promise.allSettled([
        dispatch(fetchActiveOrder()),
        dispatch(fetchCompletedOrder()),
      ]);
      // await dispatch(setSelectedRestaurant(restaurant));
    }
  };

  useFocusEffect(
    useCallback(() => {
      init();
    }, [dispatch, currentUser, restaurantID]),
  );

  useEffect(() => {
    if (activeMenu) {
      const popMenus = activeMenu.categories.map((cat: any) => {
        return cat.items.map((item: any) => {
          return {
            ...item,
          };
        });
      });
      setPopularMenus(flattenDeep(popMenus));
    }
  }, [activeMenu]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await init();
    setRefreshing(false);
  }, [dispatch]);

  const filterStyle = useAnimatedStyle(() => {
    // show tabs filters when scrollY reaches the 1st layout
    const indicatorSize =
      wholeHeight.value > visibleHeight.value
        ? (visibleHeight.value * visibleHeight.value) / wholeHeight.value
        : 0;

    return {
      opacity:
        scrollYLayouts.value[0] &&
        scrollYLayouts.value[0].height &&
        scrollYLayouts.value[0].y
          ? withTiming(
              scrollY.value >= scrollYLayouts.value[0].y - indicatorSize / 2
                ? 1
                : 0,
            )
          : 0,
      borderBottomWidth: 1,
      borderBottomColor: Colors.lightGrey,
    };
  }, [scrollYLayouts.value, wholeHeight.value, visibleHeight.value]);

  const arrowLeftStyle = useAnimatedProps(
    () => ({
      color: interpolateColor(
        scrollY.value,
        [0, Platform.OS === 'ios' ? 62 : 53],
        ['#fff', Colors.black],
      ),
    }),
    [scrollY.value, Colors.black, Platform.OS],
  );

  const handleOnBackPress = () => {
    if (isFrom === 'guest') {
      navigation.navigate('HomeStack');
    } else {
      navigation.goBack();
    }
  };

  const onSheetCloseReview = async(data: undefined) => {
    await init()
  }

  const onViewBasket = async () => {
    if (activeOrder) {
      if (activeOrder.orderStatus !== ORDER_STATUS_ENUM.NEW) {
        navigation.navigate('OrderStatus', {
          orderId: activeOrder.id,
        });
      } else {
        const shouldRefresh = await SheetManager.show('CheckOutModal', {
          payload: {
            order: activeOrder,
            isFrom: 'dish-info',
            orderId: activeOrder.id,
          },
          onClose: onSheetCloseReview
        });

        if (shouldRefresh) {
          init();
        }
      }
    }
  };

  const renderCategoryItems = (category: any, i: number, k: number, j: any) => {
    return (
      <DynamicPressable
        key={`j:${i}:${k}`}
        flexDirection="row"
        marginBottom={25}
        borderBottomWidth={1}
        borderBottomColor="#F2F4F5"
        paddingBottom={25}
        onPress={async () => {
          if (!currentUser?.noAuth) {
            navigation.navigate('CustomizeItemOrder', {
              restaurantId: restaurantID || restaurant.id,
              itemId: j.itemId,
              menuItem: j,
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
        <DynamicView flex={1}>
          <DynamicText
            fontFamily={fonts.DMSans500Medium}
            lineHeight={18}
            fontSize={15}>
            {j.name}
          </DynamicText>
          <DynamicView marginTop={5} marginBottom={10} paddingRight={6}>
            <DynamicText
              lineHeight={16}
              fontSize={13}
              fontFamily={fonts.DMSans400Regular}
              color="#818183">
              {j.description}
            </DynamicText>
          </DynamicView>
          {!restaurant?.offersEventCatering && (
            <>
              {j.price > 0 && (
                <DynamicText
                  fontSize={13}
                  fontFamily={fonts.DMSans500Medium}
                  lineHeight={18}
                  color={Colors.black}>
                  {`from £${j.price.toFixed(2)}`}
                </DynamicText>
              )}
            </>
          )}
        </DynamicView>
        <SharedElement id={`item.${j?.itemId}.photo`}>
          {!isEmpty(j.largeImagePath) ? (
            <FastImage
              style={{width: 85, height: 64, borderRadius: 4}}
              source={{
                uri: j.largeImagePath,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
          ) : (
            <DynamicImage width={85} height={65} source={noImage} />
          )}
        </SharedElement>
      </DynamicPressable>
    );
  };

  const loadingCategoryItems = (index: number) => {
    return (
      <SkeletonPlaceholder key={index}>
        <SkeletonPlaceholder.Item
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          paddingHorizontal={11}
          marginBottom={25}>
          <SkeletonPlaceholder.Item marginRight={20}>
            <SkeletonPlaceholder.Item
              width={120}
              height={20}
              borderRadius={4}
            />
            <SkeletonPlaceholder.Item
              marginTop={6}
              width={200}
              height={8}
              borderRadius={4}
            />
            <SkeletonPlaceholder.Item
              marginTop={6}
              width={200}
              height={8}
              borderRadius={4}
            />
            <SkeletonPlaceholder.Item
              marginTop={6}
              width={200}
              height={8}
              borderRadius={4}
            />
          </SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item width={85} height={65} borderRadius={4} />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    );
  };

  const renderCategoryView = () => {
    return (
      activeMenu &&
      activeMenu?.categories.map((category: any, i: number) => {
        return (
          <DynamicAnimatedView
            key={`cat:abc:${i}`}
            onLayout={({nativeEvent: {layout}}) => {
              scrollYLayouts.value[i] = layout;
              scrollYLayouts.value = [...scrollYLayouts.value];
            }}
            paddingHorizontal={11}>
            <DynamicView marginBottom={25}>
              <DynamicText
                fontFamily={fonts.DMSans500Medium}
                lineHeight={27}
                fontSize={24}>
                {category.name}
              </DynamicText>
            </DynamicView>
            {category.items &&
              category.items.map((j, k) => {
                return renderCategoryItems(category, i, k, j);
              })}
          </DynamicAnimatedView>
        );
      })
    );
  };

  return (
    <>
      <Animated.ScrollView
        showsVerticalScrollIndicator
        scrollEventThrottle={16}
        onContentSizeChange={(_, height) => {
          wholeHeight.value = height;
        }}
        onLayout={({nativeEvent}) => {
          visibleHeight.value = nativeEvent.layout.height;
        }}
        bounces={false}
        onScroll={({nativeEvent}) => {
          scrollY.value = nativeEvent.contentOffset.y;
        }}
        ref={scrollRef}
        contentContainerStyle={styles.ScrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {restaurant && <TopSection y={scrollY} restaurant={restaurant} />}
        {restaurant && (
          <MostPopularSection
            restaurants={restaurant}
            popularMenus={popularMenus}
            activeMenu={activeMenu}
            showLoading={loadingRestaurant}
          />
        )}
        {loadingRestaurant
          ? FAKE_DATA.map((_, index) => loadingCategoryItems(index))
          : renderCategoryView()}
      </Animated.ScrollView>
      {activeOrder &&
        activeOrder.orderStatus === ORDER_STATUS_ENUM.NEW &&
        Number(activeOrder.lineItemCount) > 0 && (
          <DynamicView
            paddingHorizontal={12}
            paddingBottom={12}
            backgroundColor="white">
            <DishButton
              icon="arrowright"
              label={`View basket (${activeOrder.lineItemCount})`}
              onPress={onViewBasket}
              variant="primary"
            />
          </DynamicView>
        )}
      {activeOrder &&
        !isEmpty(activeOrder.paymentMethodId) &&
        Number(activeOrder.lineItemCount) > 0 &&
        orderStatus !== ORDER_STATUS_ENUM.NEW &&
        orderStatus !== ORDER_STATUS_ENUM.COMPLETED &&
        orderStatus !== ORDER_STATUS_ENUM.CANCELLED && (
          <DishInfoOrderStatus orderStatus={orderStatus} order={activeOrder} />
        )}

      {!isEmpty(popularMenus) && (
        <DynamicAnimatedView
          marginTop={top + 42}
          paddingVertical={10}
          backgroundColor="#fff"
          width="100%"
          position="absolute"
          style={filterStyle}>
          <Categories
            wholeHeight={wholeHeight}
            visibleHeight={visibleHeight}
            horizontalRef={horizontalRef}
            scrollRef={scrollRef}
            scrollY={scrollY}
            scrollXLayouts={scrollXLayouts}
            scrollYLayouts={scrollYLayouts}
            currentIndex={currentIndex}
            categories={activeMenu?.categories}
          />
        </DynamicAnimatedView>
      )}

      <DynamicAnimatedView
        borderBottomWidth={1}
        position="absolute"
        width="100%"
        style={useAnimatedStyle(() => {
          const condition = scrollY.value >= (Platform.OS === 'ios' ? 62 : 53);
          return {
            paddingTop: top,
            backgroundColor: condition ? '#fff' : 'transparent',
            borderBottomColor: condition ? Colors.lightGrey : 'transparent',
          };
        })}>
        <DynamicAnimatedView
          flexDirection="row"
          alignItems="baseline"
          justifyContent="center"
          paddingBottom={10}
          style={useAnimatedStyle(() => {
            const condition =
              scrollY.value >= (Platform.OS === 'ios' ? 62 : 53);
            return {
              backgroundColor: condition ? '#fff' : 'transparent',
            };
          })}>
          <DynamicAnimatedView
            width={32}
            position="absolute"
            height={32}
            borderRadius={16}
            left={10}
            alignItems="center"
            justifyContent="center"
            style={useAnimatedStyle(() => {
              const backgroundColor = interpolateColor(
                scrollY.value,
                [0, Platform.OS === 'ios' ? 62 : 53],
                [Colors.black, '#fff'],
              ) as string;
              return {backgroundColor};
            })}>
            <Pressable onPress={handleOnBackPress}>
              <AnimatedAntDesign
                size={23}
                name="arrowleft"
                animatedProps={arrowLeftStyle}
              />
            </Pressable>
          </DynamicAnimatedView>
          <AnimatedText
            style={useAnimatedStyle(() => {
              const condition =
                scrollY.value >= (Platform.OS === 'ios' ? 62 : 53);
              return {
                fontFamily: fonts.DMSans500Medium,
                fontSize: 24,
                lineHeight: 31,
                color: Colors.black,
                display: condition ? 'flex' : 'none',
              };
            })}>
            {restaurant?.name}
          </AnimatedText>
        </DynamicAnimatedView>
      </DynamicAnimatedView>
    </>
  );
};

export default React.memo(DishInfo);

const styles = StyleSheet.create({
  ScrollView: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingBottom: 25,
  },
});
