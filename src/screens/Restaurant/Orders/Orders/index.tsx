import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import {
  DynamicImage,
  DynamicPressable,
  DynamicText,
  DynamicView,
  NavigationHeader,
} from '@/components';
import {Colors, fonts} from '@/themes';
import {
  StatusBar,
  StyleSheet,
  Switch,
  useWindowDimensions,
  Platform,
} from 'react-native';
import {
  TabBar,
  TabView,
  SceneMap,
  SceneRendererProps,
  NavigationState,
} from 'react-native-tab-view';
import OrderAll from './Tabs/OrderAll';
import OrderPending from './Tabs/OrderPending';
import {ms} from 'react-native-size-matters';
import {ORDER_TABS} from '@/constants';
import {useToast} from 'native-base';
import DishToast from '@/components/DishToast';
import {setShowOrderFilter} from '@/store/home';
import {useDispatch, useSelector} from 'react-redux';
import DishRestaurantSearchBar from '@/components/DishRestaurantSearchBar';
import {StackActions, useNavigation, useRoute} from '@react-navigation/native';
import OrderActive from '@/screens/Restaurant/Orders/Orders/Tabs/OrderActive';
import OrderCompleted from '@/screens/Restaurant/Orders/Orders/Tabs/OrderCompleted';
import OrderCancelled from '@/screens/Restaurant/Orders/Orders/Tabs/OrderCancelled';
import AcceptOrderViewModal from '@/screens/Restaurant/Orders/Orders/AcceptOrderModal';
import {IAdminRestaurant} from '@/api/admin_restaurant/model';
import {adminRestaurantSelectors} from '@/store/admin_restaurant/restaurant';
import {captureErrorException} from '@/utils/error-handler';
import RestaurantService from '@/api/admin_restaurant/restaurant';
import {fetchBasicInformation} from '@/store/admin_restaurant/restaurant/thunk';
import {isEmpty} from 'lodash';

const filter = require('@/assets/images/filter.png');

const RestaurantOrder = () => {
  const navigation = useNavigation();
  const {width} = useWindowDimensions();
  const [isChecked, setIsChecked] = useState(false);
  const [isTakingOrder, setIsTakingOrder] = useState(false);
  const [isOffersOrdering, setIsOffersOrdering] = useState(false);
  const [isOffersCatering, setIsOffersCatering] = useState(false);
  const [index, setIndex] = useState(0);
  const [searchText, setSearchText] = useState<string>('');
  const [routes] = useState(ORDER_TABS);
  const toast = useToast();
  const dispatch = useDispatch<any>();
  const params = useRoute().params as any;
  const restaurantId = params?.id;

  const restaurant: IAdminRestaurant = useSelector(
    adminRestaurantSelectors.selectRestaurant,
  );

  const transformIOSStyle = {
    transform: [{scaleX: 0.8}, {scaleY: 0.8}],
    marginLeft: 10,
  };

  const transformAndroidStyle = {
    transform: [{scaleX: 1.2}, {scaleY: 1.2}],
    marginLeft: 10,
  };

  const switchTrackColors = {
    false: 'rgba(171, 187, 194, 0.26)',
    true: 'rgba(224, 4, 4, 0.25)',
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <NavigationHeader
          showBackButton
          restaurant
          title="Orders"
          onGoBackPress={() => {
            navigation.dispatch(StackActions.popToTop());
          }}
          slotEnd={
            <DynamicPressable
              onPress={async () => {
                await dispatch(setShowOrderFilter());
              }}>
              <DynamicImage source={filter} width={40} height={40} />
            </DynamicPressable>
          }
        />
      ),
    });
  }, [navigation, dispatch, restaurantId]);

  useEffect(() => {
    dispatch(fetchBasicInformation(restaurant.restaurantId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    if (!isEmpty(restaurant)) {
      setIsChecked(!!restaurant?.autoAcceptOrders);
      setIsTakingOrder(!!restaurant?.takingOrders);
      setIsOffersCatering(!!restaurant?.offersCatering);
      setIsOffersOrdering(!!restaurant?.offersOrdering);
    }
  }, [restaurant]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const renderScene = useCallback(
    SceneMap({
      all: () => (
        <OrderAll
          searchText={index === 0 ? searchText : ''}
          restaurantId={restaurantId || restaurant.restaurantId}
        />
      ),
      pending: () => (
        <OrderPending
          searchText={index === 1 ? searchText : ''}
          restaurantId={restaurantId || restaurant.restaurantId}
        />
      ),
      active: () => (
        <OrderActive
          searchText={index === 2 ? searchText : ''}
          restaurantId={restaurantId || restaurant.restaurantId}
        />
      ),
      completed: () => (
        <OrderCompleted
          searchText={index === 3 ? searchText : ''}
          restaurantId={restaurantId || restaurant.restaurantId}
        />
      ),
      cancelled: () => (
        <OrderCancelled
          searchText={index === 4 ? searchText : ''}
          restaurantId={restaurantId || restaurant.restaurantId}
        />
      ),
    }),
    [],
  );

  const showSuccessToast = (title: string, message: string) => {
    showSuccessToast(title, message);
  };

  const onAcceptOrder = async (autoAcceptOrders: boolean) => {
    try {
      await RestaurantService.updateBasicInformation(
        restaurantId || restaurant.restaurantId,
        {
          autoAcceptOrders,
        },
      );
      dispatch(fetchBasicInformation(restaurant.restaurantId));
      showSuccessToast(
        'Auto Accept Orders',
        'Restaurant is now auto accepting orders',
      );
    } catch (e) {
      captureErrorException(e);
      setIsChecked(false);
    }
  };

  const onTakeOrders = async (takingOrders: boolean) => {
    try {
      await RestaurantService.updateBasicInformation(
        restaurantId || restaurant.restaurantId,
        {
          takingOrders,
        },
      );
      dispatch(fetchBasicInformation(restaurant.restaurantId));
      showSuccessToast('Taking Orders', 'Restaurant is now taking orders');
    } catch (e) {
      captureErrorException(e);
      setIsTakingOrder(false);
    }
  };

  const onOffersOrdering = async (offersOrdering: boolean) => {
    try {
      await RestaurantService.updateBasicInformation(
        restaurantId || restaurant.restaurantId,
        {
          offersOrdering,
        },
      );
      dispatch(fetchBasicInformation(restaurant.restaurantId));
      showSuccessToast('Taking Orders', 'Restaurant is now taking orders');
    } catch (e) {
      captureErrorException(e);
      setIsTakingOrder(false);
    }
  };

  const onOffersCatering = async (offersCatering: boolean) => {
    try {
      await RestaurantService.updateBasicInformation(
        restaurantId || restaurant.restaurantId,
        {
          offersCatering,
        },
      );
      dispatch(fetchBasicInformation(restaurant.restaurantId));
      showSuccessToast('Taking Orders', 'Restaurant is now taking orders');
    } catch (e) {
      captureErrorException(e);
      setIsTakingOrder(false);
    }
  };

  const OrderAllTabBar = (
    props: SceneRendererProps & {
      navigationState: NavigationState<{key: string; title: string}>;
    },
  ) => (
    <TabBar
      {...props}
      scrollEnabled
      pressColor={Colors.white}
      indicatorStyle={styles.indicatorStyle}
      tabStyle={{
        width: ms(width / 3.5),
      }}
      style={styles.tabBarStyle}
      renderLabel={({route}) => (
        <DynamicText
          fontFamily={fonts.DMSans500Medium}
          fontSize={15}
          lineHeight={20}
          color={Colors.black}>
          {route.title}
        </DynamicText>
      )}
    />
  );

  return (
    <DynamicView flex={1}>
      <StatusBar barStyle={'dark-content'} />
      <DishRestaurantSearchBar
        onSearchText={setSearchText}
        placeholder={'Search an order'}
      />
      <DynamicView
        flexDirection="row"
        justifyContent="space-around"
        alignItems="center"
        marginVertical={11}>
        <DynamicView
          flexDirection="row"
          alignItems="center"
          marginLeft={18}
          justifyContent="space-between">
          <DynamicText
            fontFamily={fonts.DMSans700Bold}
            fontSize={14}
            lineHeight={20}
            color={Colors.black}>
            Taking Orders
          </DynamicText>
          <Switch
            trackColor={switchTrackColors}
            thumbColor={isTakingOrder ? Colors.ember : Colors.darkGrey}
            value={isTakingOrder}
            onValueChange={() => onTakeOrders(!isTakingOrder)}
            style={
              Platform.OS === 'ios' ? transformIOSStyle : transformAndroidStyle
            }
          />
        </DynamicView>
        <DynamicView
          flexDirection="row"
          alignItems="center"
          marginLeft={4}
          justifyContent="space-between">
          <DynamicText
            fontFamily={fonts.DMSans700Bold}
            fontSize={14}
            lineHeight={20}
            color={Colors.black}>
            Auto-Accept
          </DynamicText>
          <Switch
            trackColor={switchTrackColors}
            thumbColor={isChecked ? Colors.ember : Colors.darkGrey}
            value={isChecked}
            onValueChange={() => onAcceptOrder(!isChecked)}
            style={
              Platform.OS === 'ios' ? transformIOSStyle : transformAndroidStyle
            }
          />
        </DynamicView>
      </DynamicView>
      <DynamicView
        flexDirection="row"
        justifyContent="space-around"
        alignItems="center"
        marginVertical={10}
        marginHorizontal={11}>
        <DynamicView
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between">
          <DynamicText
            fontFamily={fonts.DMSans700Bold}
            fontSize={14}
            lineHeight={20}
            color={Colors.black}>
            Click and Collect
          </DynamicText>
          {/* restaurant?.offersOrdering */}
          <Switch
            trackColor={switchTrackColors}
            thumbColor={isOffersOrdering ? Colors.ember : Colors.darkGrey}
            value={isOffersOrdering}
            onValueChange={() => onOffersOrdering(!isOffersOrdering)}
            style={
              Platform.OS === 'ios' ? transformIOSStyle : transformAndroidStyle
            }
          />
        </DynamicView>
        <DynamicView
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between">
          <DynamicText
            fontFamily={fonts.DMSans700Bold}
            fontSize={14}
            lineHeight={20}
            color={Colors.black}>
            Events & Catering
          </DynamicText>
          <Switch
            trackColor={switchTrackColors}
            thumbColor={isOffersCatering ? Colors.ember : Colors.darkGrey}
            value={isOffersCatering}
            onValueChange={() => onOffersCatering(!isOffersCatering)}
            style={
              Platform.OS === 'ios' ? transformIOSStyle : transformAndroidStyle
            }
          />
        </DynamicView>
      </DynamicView>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        renderTabBar={OrderAllTabBar}
        onIndexChange={setIndex}
      />

      <AcceptOrderViewModal sheetId="AcceptOrderModal" />
    </DynamicView>
  );
};

export default RestaurantOrder;

export const styles = StyleSheet.create({
  headerBarView: {
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 46,
    paddingBottom: 20,
    backgroundColor: Colors.ember,
    flexDirection: 'row',
    paddingTop: 40,
  },
  tabBarStyle: {
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  indicatorStyle: {
    backgroundColor: Colors.ember,
    height: 2,
    borderRadius: 3
  },
});
