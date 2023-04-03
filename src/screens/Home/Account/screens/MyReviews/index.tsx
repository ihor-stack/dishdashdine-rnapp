import React, {useCallback, useEffect, useState} from 'react';
import MyReviewsView from './View';
import {useDispatch, useSelector} from 'react-redux';
import {fetchMyReviews} from '@/store/my-reviews/thunk';
import {myReviewsSelector} from '@/store/my-reviews';
import {IReviews} from '@/api/generic';

const MyReviews = () => {
  const dispatch = useDispatch();
  const myReviews: IReviews[] = useSelector(
    myReviewsSelector.selectMyReview,
  ) as any;
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(fetchMyReviews());
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await dispatch(fetchMyReviews());
    setRefreshing(false);
  }, []);

  return (
    <MyReviewsView
      myReviews={myReviews}
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  );
};

export default MyReviews;
