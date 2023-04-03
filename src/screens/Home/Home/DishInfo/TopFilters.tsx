import React, {RefObject} from 'react'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {
  DynamicText,
  DynamicAnimatedView,
  DynamicAnimatedPressable,
} from '@/components'
import {fonts} from '@/themes'
import {categories} from './DishInfo'

type Props = {
  scrollYMeasurements: Animated.SharedValue<{y: number; height: number}[]>
  scrollRef: RefObject<Animated.ScrollView>
  scrollTabMeasurements: Animated.SharedValue<{x: number; width: number}[]>
  currentIndex: Animated.SharedValue<number>
  y: Animated.SharedValue<number>
}

const TopFilters = ({
  currentIndex,
  scrollRef,
  scrollYMeasurements,
  scrollTabMeasurements,
  y,
}: Props) => {
  const {top} = useSafeAreaInsets()

  const width = useSharedValue(0)

  const abcStyle = useAnimatedStyle(() => {
    return {
      opacity:
        y.value !== 0 && width.value
          ? withTiming(y.value <= width.value - top ? 0 : 1)
          : 0,
    }
  })

  return (
    <DynamicAnimatedView
      style={abcStyle}
      width="100%"
      backgroundColor="#fff"
      justifyContent="center"
      // paddingTop={top * 2}
      padding={30}
      position="absolute">
      <DynamicText
        fontSize={14}
        lineHeight={17}
        fontFamily={fonts.DMSans500Medium}>
        This is a Test Text asd asdas dasd
      </DynamicText>
      {categories.map((c, i) => (
        <DynamicAnimatedPressable
          key={`abc:${i}`}
          // when a tab is pressed, navigate to the scroll matching the index
          onPress={() => {
            currentIndex.value = i
            scrollRef.current?.scrollTo({
              y: scrollYMeasurements.value[i].y + 100,
              animated: true,
            })
          }}
          // measure width of tabs
          onLayout={({nativeEvent}) => {
            scrollTabMeasurements.value[i] = {
              width: nativeEvent.layout.width + nativeEvent.layout.x,
              x: nativeEvent.layout.x,
            }
            // check if categoriesY has been set, if not, set Y value of categories tabs
          }}>
          <DynamicAnimatedView
            paddingHorizontal={18}
            paddingVertical={3}
            borderRadius={18}
            marginRight={12}>
            <DynamicText
              fontSize={15}
              lineHeight={20}
              fontFamily={fonts.DMSans500Medium}
              color="#fff">
              {c.title}
            </DynamicText>
          </DynamicAnimatedView>
        </DynamicAnimatedPressable>
      ))}
    </DynamicAnimatedView>
  )
}

export default TopFilters
