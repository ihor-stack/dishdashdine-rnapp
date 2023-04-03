import {
  Dimensions,
  LayoutRectangle,
  Platform,
  Pressable,
  StyleSheet,
} from 'react-native';
import React, {ComponentClass, useId} from 'react';

import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  scrollTo,
  useAnimatedProps,
  useAnimatedReaction,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import FastImage, {
  FastImageProps,
  FastImageStaticProperties,
} from 'react-native-fast-image';
import {isEmpty} from 'lodash';
import {SharedElement} from 'react-navigation-shared-element';

import {
  AnimatedText,
  DynamicAnimatedView,
  DynamicPressable,
  DynamicText,
  DynamicView,
} from '@/components';
import DishStepperButton from '@/components/DishStepperButton';
import DishButton from '@/components/DishButton';

import {Colors, fonts} from '@/themes';
import {
  ICategoryMenuItem,
  IMenu,
  IOrder,
  IOrderItemModifierGroupSelection,
  IRestaurant,
} from '@/api/generic';
import ModifierGroupQuantity from '@/screens/Home/Home/DishInfo/CustomizeItemOrder/ModifierGroupQuantity';
import ModifierSpecialInstruction from '@/screens/Home/Home/DishInfo/CustomizeItemOrder/ModifierSpecialInstruction';
import ModifierGroupSelect from '@/screens/Home/Home/DishInfo/CustomizeItemOrder/ModifierGroupSelect';
import {ORDER_STATUS_ENUM} from '@/constants';

const noImage = require('@/assets/images/no-image.png');

const AnimatedAntDesign = Animated.createAnimatedComponent(AntDesign);
const AnimatedFastImage = Animated.createAnimatedComponent(
  FastImage as ComponentClass<FastImageProps> & FastImageStaticProperties,
);

const {width} = Dimensions.get('window');

export interface CustomizeItemOrderViewProps {
  _modifierGroup: IOrderItemModifierGroupSelection[];
  activeMenu: IMenu;
  groupQuantity: number;
  isLoading?: boolean;
  menuItem?: ICategoryMenuItem;
  onAddQTY?: () => void;
  onAddQTYGroup?: (group: any, item: any) => void;
  onAddToCart?: () => void;
  onLessQTY?: () => void;
  onLessQTYGroup?: (group: any, item: any) => void;
  onToggleModifier?: (group: any, item: any) => void;
  onToggleRemoveModifier?: (group: any, item: any) => void;
  onPressFavorite?: any;
  prices: number;
  quantity?: number;
  setSpecialInstructions?: any;
  specialInstructions?: string;
  activeOrder: IOrder;
  restaurant?: IRestaurant;
}
const isIos = Platform.OS === 'ios';

const headerHeight = isIos ? 62 : 53;

const CustomizeItemOrderView = ({
  isLoading,
  quantity,
  menuItem,
  onAddToCart,
  onAddQTY,
  onLessQTY,
  setSpecialInstructions,
  specialInstructions,
  _modifierGroup,
  prices,
  onAddQTYGroup,
  onLessQTYGroup,
  onToggleModifier,
  onToggleRemoveModifier,
  activeOrder,
  restaurant,
}: CustomizeItemOrderViewProps) => {
  const navigation = useNavigation();

  const {top} = useSafeAreaInsets();

  const scrollY = useSharedValue(0);
  const currentIndex = useSharedValue(0);
  const wholeHeight = useSharedValue(0);
  const visibleHeight = useSharedValue(0);
  const scrollYLayouts = useSharedValue<LayoutRectangle[]>([]);
  const scrollXLayouts = useSharedValue<LayoutRectangle[]>([]);

  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const horizontalRef = useAnimatedRef<Animated.ScrollView>();

  const arrowLeftStyle = useAnimatedProps(
    () => ({
      color: interpolateColor(
        scrollY.value,
        [0, headerHeight],
        ['#fff', Colors.black],
      ),
    }),
    [scrollY.value, Colors.black, Platform.OS],
  );

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

  const topImgStyle = useAnimatedStyle(() => {
    const inputRange = [0, isIos ? 96 : 96 - 10];

    const height = interpolate(
      scrollY.value,
      inputRange,
      [196, 0],
      Extrapolate.CLAMP,
    );

    const opacity = interpolate(
      scrollY.value,
      inputRange,
      [1, 0],
      Extrapolate.CLAMP,
    );

    return {
      opacity,
      height,
    };
  }, [scrollY.value]);

  const id = useId();

  // "offersOrdering": true, --- Click & Collect
  // "offersEventCatering": true, --- Events & Catering
  // "takingOrders": true, --- Taking Orders
  const handleDisablePricingAndOrdering = () => {
    if (!!restaurant?.offersEventCatering) {
      if (!!restaurant?.offersOrdering && !!restaurant?.takingOrders)
        return true;
      else return false;
    }
    if (!!restaurant?.takingOrders) {
      return true;
    } else {
      return false;
    }
  };

  const disablePricingAndOrdering = handleDisablePricingAndOrdering();

  return (
    <DynamicView flex={1} backgroundColor={Colors.white}>
      <Animated.ScrollView
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
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContentStyling}>
        <DynamicView position="relative">
          <SharedElement id={`item.${menuItem?.itemId}.photo`}>
            {!isEmpty(menuItem?.largeImagePath) ? (
              <AnimatedFastImage
                style={[topImgStyle, styles.imageBg]}
                source={{
                  uri: menuItem?.largeImagePath,
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
            ) : (
              <Animated.Image
                source={noImage}
                style={[topImgStyle, styles.imageBg]}
              />
            )}
          </SharedElement>
          <DynamicAnimatedView
            flexDirection="row"
            justifyContent="space-between"
            position="absolute"
            width={width}
            paddingTop={44}
            paddingHorizontal={10}>
            <DynamicPressable
              backgroundColor="#ffffff09"
              height={32}
              width={32}
              borderRadius={999}
              justifyContent="center"
              alignItems="center"
              onPress={() => navigation.goBack()}>
              <AntDesign size={23} name="arrowleft" color={Colors.white} />
            </DynamicPressable>
          </DynamicAnimatedView>
        </DynamicView>
        <DynamicView backgroundColor={Colors.white}>
          <DynamicView style={styles.menuTitle}>
            <DynamicText
              fontFamily={fonts.DMSans700Bold}
              fontSize={26}
              lineHeight={31}
              letterSpacing={-0.5}
              color={Colors.black}>
              {menuItem?.name}
            </DynamicText>
          </DynamicView>
          <DynamicView style={styles.menuDesc}>
            <DynamicText
              fontFamily={fonts.DMSans400Regular}
              fontSize={13}
              lineHeight={16}
              letterSpacing={-0.08}
              textAlign="left"
              color={Colors.grey}>
              {menuItem?.description}
            </DynamicText>
          </DynamicView>
        </DynamicView>
        {_modifierGroup &&
          _modifierGroup.map(
            (data: IOrderItemModifierGroupSelection, key: number) => {
              const maxSelections = Number(data.maxSelections);

              const description =
                data.description || `Choose up to ${maxSelections}`;

              if (data.maxSelectionsPerItem === null) {
                return (
                  <ModifierGroupSelect
                    title={data.name}
                    description={description}
                    key={`${id}-${key}`}
                    modifierGroup={data}
                    onToggle={onToggleRemoveModifier}
                  />
                );
              } else {
                return maxSelections >= 1 ? (
                  <ModifierGroupQuantity
                    key={`${id}-${key}`}
                    title={data.name}
                    description={description}
                    modifierGroup={data}
                    onAddQTYGroup={onAddQTYGroup}
                    onLessQTYGroup={onLessQTYGroup}
                    onToggleModifier={onToggleModifier}
                    hidePricing={disablePricingAndOrdering}
                    hideQtyStepper={disablePricingAndOrdering}
                  />
                ) : null;
              }
            },
          )}
        <ModifierSpecialInstruction
          value={specialInstructions}
          onChangeText={setSpecialInstructions}
        />
      </Animated.ScrollView>
      {disablePricingAndOrdering &&
      Number(prices) > 0 &&
      (isEmpty(activeOrder) ||
        (activeOrder && activeOrder.orderStatus === ORDER_STATUS_ENUM.NEW)) ? (
        <DynamicView paddingVertical={11} paddingHorizontal={11}>
          <DynamicView alignItems="center" paddingVertical={22}>
            <DishStepperButton
              value={quantity}
              minValue={1}
              onAddButtonPress={onAddQTY}
              onLessButtonPress={onLessQTY}
              isEnabled
            />
          </DynamicView>
          <DishButton
            onPress={onAddToCart}
            variant="primary"
            label={`Add for £${Number(prices).toFixed(2)}`}
            icon="arrowright"
            showSpinner={isLoading}
          />
        </DynamicView>
      ) : null}
      <DynamicAnimatedView
        borderBottomWidth={1}
        position="absolute"
        width="100%"
        style={useAnimatedStyle(() => {
          const condition = scrollY.value >= headerHeight;
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
            const condition = scrollY.value >= headerHeight;
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
                [0, headerHeight],
                [Colors.black, '#fff'],
              ) as string;

              return {backgroundColor};
            })}>
            <Pressable
              onPress={() => {
                navigation.goBack();
              }}>
              <AnimatedAntDesign
                size={23}
                name="arrowleft"
                animatedProps={arrowLeftStyle}
              />
            </Pressable>
          </DynamicAnimatedView>
          <AnimatedText
            style={useAnimatedStyle(() => {
              const condition = scrollY.value >= headerHeight;

              return {
                fontFamily: fonts.DMSans500Medium,
                fontSize: 24,
                lineHeight: 31,
                color: Colors.black,
                display: condition ? 'flex' : 'none',
              };
            })}>
            {menuItem?.name}
          </AnimatedText>
        </DynamicAnimatedView>
      </DynamicAnimatedView>
    </DynamicView>
  );
};

export default CustomizeItemOrderView;

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.white,
    paddingBottom: 26,
  },
  scrollViewContentStyling: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingBottom: 25,
  },
  imageBg: {
    width,
    height: 232,
  },
  menuTitle: {
    paddingTop: 25,
    paddingLeft: 10,
  },
  menuDesc: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 11,
    paddingBottom: 25,
  },
  sectionPrices: {
    paddingLeft: 11,
    paddingRight: 10,
  },
  headerOptions: {
    paddingLeft: 11,
  },
});
