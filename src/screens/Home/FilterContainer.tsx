import React, {ReactNode, useEffect} from 'react';
import {useWindowDimensions, ViewStyle} from 'react-native';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {DynamicAnimatedView} from '@/components';
import FilterHeader from './FilterHeader';
import {useDispatch} from 'react-redux';
import {
  setShowAddressFilter,
  setShowDistanceFilter,
  setShowOrderFilter,
  setShowSortAndFilter,
} from '@/store/home';

type Props = {
  useDynamicHeight?: boolean;
  homeState?: boolean;
  children: ReactNode;
  type:
    | 'showDistanceFilter'
    | 'showAddressFilter'
    | 'showSortAndFilter'
    | 'showOrderFilter';
};

const FilterContainer = ({
  useDynamicHeight = false,
  homeState = false,
  type,
  children,
}: Props) => {
  const dispatch = useDispatch();
  const {width, height} = useWindowDimensions();
  const {top} = useSafeAreaInsets();
  const display = useSharedValue<ViewStyle['display']>('flex');

  useEffect(() => {
    if (homeState) {
      display.value = 'flex';
    }
  }, [display, homeState]);

  const containerStyle = useAnimatedStyle(
    () => ({
      opacity: withTiming(homeState ? 1 : 0, {}, () => {
        display.value = homeState ? 'flex' : 'none';
      }),
      display: display.value,
    }),
    [homeState, display],
  );

  const modalStyle = useAnimatedStyle(
    () => ({
      transform: [
        {
          translateY: withTiming(homeState ? 0 : -height * 0.8),
        },
      ],
    }),
    [homeState, height],
  );

  const toggler = async () => {
    if (type === 'showAddressFilter') {
      await dispatch(setShowAddressFilter());
    } else if (type === 'showDistanceFilter') {
      await dispatch(setShowDistanceFilter());
    } else if (type === 'showOrderFilter') {
      await dispatch(setShowOrderFilter());
    } else {
      await dispatch(setShowSortAndFilter());
    }
  };

  const handleTitle = () => {
    if (type === 'showAddressFilter') {
      return 'Address';
    } else if (type === 'showDistanceFilter') {
      return 'Distance';
    } else if (type === 'showOrderFilter') {
      return 'Filter';
    } else {
      return 'Sort & Filter';
    }
  };

  return (
    <DynamicAnimatedView
      width={width}
      height={height + top}
      backgroundColor="rgba(0, 0, 0, 0.4)"
      position="absolute"
      style={containerStyle}>
      <DynamicAnimatedView
        width={width}
        {...(useDynamicHeight === false && {height: height * 0.8})}
        backgroundColor="#fff"
        borderBottomLeftRadius={8}
        borderBottomRightRadius={8}
        paddingTop={top}
        style={modalStyle}>
        <FilterHeader toggler={toggler} title={handleTitle()} />
        {children}
      </DynamicAnimatedView>
    </DynamicAnimatedView>
  );
};

export default FilterContainer;
