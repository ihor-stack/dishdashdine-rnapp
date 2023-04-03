import React, {useCallback} from 'react';
import {LayoutRectangle, Platform} from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {
  DynamicAnimatedPressable,
  DynamicAnimatedView,
  AnimatedText,
} from '@/components';
import {Colors, fonts} from '@/themes';
import {ICategories} from '@/api/generic';

type CategoriesProps = {
  scrollYLayouts: Animated.SharedValue<LayoutRectangle[]>;
  scrollXLayouts: Animated.SharedValue<LayoutRectangle[]>;
  currentIndex: Animated.SharedValue<number>;
  scrollRef: React.RefObject<Animated.ScrollView>;
  scrollY: Animated.SharedValue<number>;
  horizontalRef: React.RefObject<Animated.ScrollView>;
  visibleHeight: Animated.SharedValue<number>;
  wholeHeight: Animated.SharedValue<number>;
  categories: ICategories[];
};

const Categories = ({
  scrollYLayouts,
  scrollXLayouts,
  currentIndex,
  scrollRef,
  scrollY,
  horizontalRef,
  visibleHeight,
  wholeHeight,
  categories,
}: CategoriesProps) => (
  <Animated.ScrollView
    showsHorizontalScrollIndicator={false}
    ref={horizontalRef}
    contentContainerStyle={{
      paddingHorizontal: 11,
    }}
    horizontal>
    {categories &&
      categories.map((c, i) => (
        <CategoryTab
          wholeHeight={wholeHeight}
          visibleHeight={visibleHeight}
          currentIndex={currentIndex}
          key={`abc:${i}`}
          scrollY={scrollY}
          i={i}
          scrollXLayouts={scrollXLayouts}
          scrollYLayouts={scrollYLayouts}
          scrollRef={scrollRef}
          horizontalRef={horizontalRef}
          title={c.name}
        />
      ))}
  </Animated.ScrollView>
);

type CategoryTabProps = {
  i: number;
  currentIndex: Animated.SharedValue<number>;
  scrollY: Animated.SharedValue<number>;
  scrollRef: React.RefObject<Animated.ScrollView>;
  title: string;
  scrollYLayouts: Animated.SharedValue<LayoutRectangle[]>;
  scrollXLayouts: Animated.SharedValue<LayoutRectangle[]>;
  horizontalRef: React.RefObject<Animated.ScrollView>;
  visibleHeight: Animated.SharedValue<number>;
  wholeHeight: Animated.SharedValue<number>;
};

const CategoryTab = ({
  i,
  currentIndex,
  scrollRef,
  title,
  scrollYLayouts,
  scrollXLayouts,
  horizontalRef,
  wholeHeight,
  visibleHeight,
}: CategoryTabProps) => {
  const tabBgStyle = useAnimatedStyle(
    () => ({
      backgroundColor: interpolateColor(
        currentIndex.value,
        [i, currentIndex.value],
        [Colors.black, '#fff'],
      ) as string,
    }),
    [currentIndex.value, i, Colors.black],
  );

  const tabTextStyle = useAnimatedStyle(
    () => ({
      fontSize: 15,
      lineHeight: 20,
      fontFamily: fonts.DMSans500Medium,
      color: currentIndex.value === i ? '#fff' : '#818183',
    }),
    [currentIndex.value, i],
  );

  const onTabPress = useCallback(() => {
    if (scrollYLayouts.value.length && scrollXLayouts.value.length) {
      currentIndex.value = i;
      const indicatorSize =
        wholeHeight.value > visibleHeight.value
          ? (visibleHeight.value * visibleHeight.value) / wholeHeight.value
          : visibleHeight.value;

      if (scrollYLayouts.value[i] && scrollYLayouts.value[i].y) {
        const condition = Platform.OS === 'ios';
        scrollRef.current?.scrollTo({
          y:
            scrollYLayouts.value[i].y -
            (condition ? indicatorSize : indicatorSize + 44),
          animated: false,
        });
      }

      if (
        scrollXLayouts.value[i] &&
        scrollXLayouts.value[i].x &&
        scrollXLayouts.value[i].width
      ) {
        horizontalRef.current?.scrollTo({
          x: scrollXLayouts.value[i].x - scrollXLayouts.value[i].width,
          animated: true,
        });
      }
    }
  }, [
    scrollYLayouts.value,
    wholeHeight.value,
    visibleHeight.value,
    scrollRef.current,
    horizontalRef.current,
    i,
  ]);

  return (
    <DynamicAnimatedPressable
      // when a tab is pressed, navigate to the scroll matching the index
      onPress={onTabPress}
      // measure width of tabs
      onLayout={({nativeEvent}) => {
        scrollXLayouts.value[i] = nativeEvent.layout;
        scrollXLayouts.value = [...scrollXLayouts.value];
      }}>
      <DynamicAnimatedView
        style={tabBgStyle}
        paddingHorizontal={18}
        paddingVertical={3}
        borderRadius={18}
        marginRight={12}>
        <AnimatedText style={tabTextStyle}>{title}</AnimatedText>
      </DynamicAnimatedView>
    </DynamicAnimatedPressable>
  );
};

export default Categories;
