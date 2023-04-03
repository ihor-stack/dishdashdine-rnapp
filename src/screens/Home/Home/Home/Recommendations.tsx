import React, {useEffect, useState} from 'react';
import {
  Box,
  Button,
  FlatList,
  HStack,
  Image,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import {ms} from 'react-native-size-matters';
import Colors from '@/themes/colors';
import {categories1, categories2} from '@/fixtures/categories';
import {RECOMMENDED_DISHES} from '@/constants/fakeData';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {StyleSheet, View} from 'react-native';
import {useIsMounted} from '@/hooks/useIsMounted';

const Recommendations = () => {
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useIsMounted();

  const FAKE_DATA: any[] = Array.from({
    length: 10,
  });

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

  const renderRecosDishesLoading = (index: number) => {
    return (
      <SkeletonPlaceholder key={index}>
        <SkeletonPlaceholder.Item
          width={316}
          height={144}
          borderRadius={4}
          marginHorizontal={6}
        />
        <View style={styles.viewContainer}>
          <SkeletonPlaceholder.Item
            width={120}
            height={20}
            borderRadius={6}
            marginHorizontal={6}
          />
        </View>
        <View style={styles.viewContainer}>
          <SkeletonPlaceholder.Item
            width={253}
            height={16}
            borderRadius={6}
            marginHorizontal={6}
          />
        </View>
      </SkeletonPlaceholder>
    );
  };

  const renderCategoriesLoading = (index: number) => {
    return (
      <SkeletonPlaceholder key={index}>
        <SkeletonPlaceholder.Item
          width={148}
          height={44}
          borderRadius={4}
          marginHorizontal={6}
          marginTop={15}
        />
      </SkeletonPlaceholder>
    );
  };

  const renderRecosDishesItem = () => {
    return (
      <FlatList
        data={RECOMMENDED_DISHES}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => {
          return (
            <VStack key={`${index}-${item.name}`} marginRight={5}>
              <Image
                w={ms(256)}
                h={ms(146)}
                source={item.image}
                alt="recommended-dish"
              />
              <View style={styles.viewContainer}>
                <Text>{item.recommendedDish}</Text>
              </View>
              <View>
                <Text fontSize="xs" color={Colors.grey}>
                  {item.name}
                </Text>
              </View>
            </VStack>
          );
        }}
      />
    );
  };

  return (
    <Box bgColor={Colors.lightGrey} py={2}>
      <Box p={2} bgColor={Colors.white}>
        <Text
          fontFamily="heading"
          fontSize={20}
          fontWeight={500}
          marginBottom={3}>
          Recommended dishes
        </Text>
        <HStack>
          {isLoading
            ? FAKE_DATA.map((_, index) => {
                return renderRecosDishesLoading(index);
              })
            : renderRecosDishesItem()}
        </HStack>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <VStack pt={5}>
            <HStack>
              {isLoading
                ? FAKE_DATA.map((_, index) => {
                    return renderCategoriesLoading(index);
                  })
                : categories1.map((item, index) => {
                    return (
                      <Pressable
                        key={`${item.name}-${index}`}
                        w={ms(150)}
                        mb={2}
                        mr={2}
                        p={2}
                        px={4}
                        borderRadius="md"
                        flexDirection={'row'}
                        bgColor={Colors.lightGrey}
                        justifyContent="space-between">
                        <Text>{item.name}</Text>
                        <Image
                          source={item.image}
                          alt="category-icon"
                          resizeMode="cover"
                          size={ms(20)}
                        />
                      </Pressable>
                    );
                  })}
            </HStack>
            <HStack>
              {isLoading
                ? FAKE_DATA.map((_, index) => {
                    return renderCategoriesLoading(index);
                  })
                : categories2.map((item, index) => {
                    return (
                      <Pressable
                        key={`${item.name}-${index}`}
                        w={ms(150)}
                        mb={2}
                        mr={2}
                        p={2}
                        px={4}
                        borderRadius="md"
                        flexDirection={'row'}
                        bgColor={Colors.lightGrey}
                        justifyContent="space-between">
                        <Text>{item.name}</Text>
                        <Image
                          source={item.image}
                          alt="category-icon"
                          resizeMode="cover"
                          size={ms(20)}
                        />
                      </Pressable>
                    );
                  })}
            </HStack>
          </VStack>
        </ScrollView>
      </Box>
    </Box>
  );
};

export default Recommendations;

const styles = StyleSheet.create({
  viewContainer: {
    marginTop: 11,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
});
