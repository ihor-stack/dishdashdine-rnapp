import {RefreshControl, FlatList, StyleSheet} from 'react-native';
import React from 'react';
import {DynamicText, DynamicView} from '@/components';
import {Colors, fonts} from '@/themes';
import SeeMore from '@/components/DishSeeMore';
import {IReviews} from '@/api/generic';
import FastImage from 'react-native-fast-image';
import NoReviews from './NoReviews';
import {Divider} from 'native-base';
import StarRating from '@/vendors/react-native-star-rating';

const profile_logo = require('@/assets/images/no-image.png');
const fullStar = require('@/assets/images/myAccount/full-star.png');
const emptyStar = require('@/assets/images/myAccount/empty-star.png');

export interface MyReviewsViewProps {
  myReviews: IReviews[];
  refreshing: boolean;
  onRefresh: any;
}

const MyReviewsView = (props: MyReviewsViewProps) => {
  const {myReviews, refreshing, onRefresh} = props;

  const renderReviews = ({item, index}) => {
    return (
      <DynamicView
        key={index}
        paddingHorizontal={12}
        paddingVertical={20}
        backgroundColor={Colors.white}
        borderBottomWidth={1}
        borderBottomLeftRadius={15}
        borderBottomRightRadius={15}
        borderBottomColor={Colors.lightGrey}>
        <DynamicView
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          marginBottom={11}>
          <DynamicView flexDirection="row" alignItems="center">
            <FastImage source={profile_logo} style={styles.dishInfoLogo} />
            {/*<DynamicView paddingLeft={20} paddingRight={60}>*/}
            {/*  <DynamicText>{item.order}</DynamicText>*/}
            {/*  <DynamicText>Reviewed {item.created}</DynamicText>*/}
            {/*</DynamicView>*/}
          </DynamicView>
          <StarRating
            starStyle={{marginHorizontal: 5, width: 14, height: 14}}
            rating={item.rating}
            maxStars={5}
            starSize={30}
            emptyStar={emptyStar}
            fullStar={fullStar}
            fullStarColor={Colors.ember}
            emptyStarColor={Colors.grey}
            disabled
          />
        </DynamicView>
        <DynamicView>
          <DynamicView marginBottom={6}>
            <DynamicText
              fontFamily={fonts.DMSans400Regular}
              fontSize={14}
              lineHeight={18.23}
              color={Colors.black}>
              {item.title}
            </DynamicText>
          </DynamicView>
          <DynamicText
            fontFamily={fonts.DMSans400Regular}
            fontSize={13}
            lineHeight={15.62}
            color={Colors.grey}>
            {item.description}
          </DynamicText>
        </DynamicView>
        {/*<SeeMore />*/}
      </DynamicView>
    );
  };

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={{flex: 1}}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      data={myReviews}
      renderItem={renderReviews}
      keyExtractor={item => item.id}
      ListEmptyComponent={() => <NoReviews />}
      ItemSeparatorComponent={() => <Divider bgColor={Colors.lightGrey} />}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    paddingHorizontal: 11,
  },
  dishInfoLogo: {
    height: 50,
    width: 50,
    backgroundColor: Colors.white,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: Colors.dark,
  },
});

export default MyReviewsView;
