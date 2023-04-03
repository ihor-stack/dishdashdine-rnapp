import {DynamicView} from '@/components';
import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export interface RestaurantsLoadingProps {
  item?: any;
  index: number;
}

export const RestaurantsLoading = ({index}: RestaurantsLoadingProps) => {
  const {width} = Dimensions.get('window');

  return (
    <DynamicView marginBottom={15}>
      <SkeletonPlaceholder key={index}>
        <SkeletonPlaceholder.Item
          width={width - 22}
          height={144}
          borderRadius={4}
          marginHorizontal={11}
        />
        <SkeletonPlaceholder.Item
          width={75}
          height={20}
          borderRadius={4}
          marginHorizontal={10}
          marginTop={13}
        />
        <View style={styles.viewContainer}>
          <SkeletonPlaceholder.Item
            width={38}
            height={16}
            borderRadius={4}
            marginHorizontal={10}
            marginTop={6}
          />
          <SkeletonPlaceholder.Item
            width={38}
            height={16}
            borderRadius={4}
            marginHorizontal={6}
            marginTop={6}
          />
          <SkeletonPlaceholder.Item
            width={38}
            height={16}
            borderRadius={4}
            marginHorizontal={6}
            marginTop={6}
          />
        </View>
      </SkeletonPlaceholder>
    </DynamicView>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    marginTop: 9,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
});
