import React, {useState} from 'react';
import {DynamicText, DynamicTextInput, DynamicView} from '@/components';
import RestaurantInfoAvatar from '../Home/DishInfo/RestaurantInfoAvatar';
import {Divider, useToast} from 'native-base';
import {Colors, fonts} from '@/themes';
import {
  Keyboard,
  TouchableWithoutFeedback,
  useWindowDimensions,
} from 'react-native';
import StarRating from '@/vendors/react-native-star-rating';
import {captureErrorException} from '@/utils/error-handler';
import ActionSheet, {
  SheetManager,
  SheetProps,
} from 'react-native-actions-sheet';
import DishButton from '@/components/DishButton';
import ReviewService from '@/api/review';
import {IOrder} from '@/api/generic';
import DishSpinner from '@/components/DishSpinner';
import DishToast from '@/components/DishToast';
import {showMessage} from 'react-native-flash-message';
import {fetchCompletedOrder} from '@/store/order/thunk';
import {useDispatch} from 'react-redux';
import {showSuccessMessage} from '@/components/DishFlashMessage';

const fullStar = require('@/assets/images/myAccount/full-star.png');
const emptyStar = require('@/assets/images/myAccount/empty-star.png');

export interface OrderReviewModalProps extends SheetProps {}

const OrderReviewModal = (props: OrderReviewModalProps) => {
  const [rating, setRating] = useState(5);
  const {width} = useWindowDimensions();
  const toast = useToast();
  const dispatch = useDispatch();
  const [orderId, setOrderId] = useState('');
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewDescription, setReviewDescription] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<IOrder>({});
  const [isLoading, setIsLoading] = useState(false);

  const submitReview = async () => {
    const handleSuccessToast = () => {
      toast.show({
        placement: 'top',
        duration: 2500,
        render: () => {
          return (
            // <DishToast
            //   title="Review submitted"
            //   message="Thank you for submitting your review."
            //   variant="success"
            // />
            showSuccessMessage(
              'Review submitted',
              'Thank you for submitting your review.',
            )
          );
        },
        onCloseComplete() {
          SheetManager.hide('OrderReviewModal');
        },
      });
    };

    try {
      setIsLoading(true);
      await ReviewService.createReview(orderId, {
        rating,
        title: reviewTitle,
        description: reviewDescription,
      });
      await dispatch(fetchCompletedOrder());
      handleSuccessToast();
      setIsLoading(false);
    } catch (e: any) {
      setIsLoading(false);
      captureErrorException(e);
      if (e && e['orderId']) {
        return showMessage({
          message: 'WARNING!',
          description: e['orderId'],
          type: 'warning',
        });
      }

      if (e && e.errors) {
        const err = e.errors;
        if (err && err['Description']) {
          return showMessage({
            message: 'WARNING!',
            description: err['Description'][0],
            type: 'warning',
          });
        }
      }
    }
  };

  const onStarRatingPress = (rating: number) => {
    setRating(rating);
  };

  return (
    <ActionSheet
      id="OrderReviewModal"
      gestureEnabled
      onBeforeShow={(data: any) => {
        setSelectedOrder(data?.order);
        setOrderId(data?.orderId);
      }}
      onClose={() => {
        setReviewTitle('');
        setReviewDescription('');
        setRating(5);
      }}>
      {isLoading && <DishSpinner />}
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <DynamicView paddingTop={54} paddingBottom={15}>
          <RestaurantInfoAvatar
            showReviewTitle
            restaurant={selectedOrder.restaurant}
          />
          <Divider bgColor={Colors.lightGrey} padding={1} />
          <DynamicView paddingTop={20} paddingHorizontal={11}>
            <DynamicView alignItems="center" paddingBottom={30}>
              <StarRating
                starStyle={{marginHorizontal: 5}}
                rating={rating}
                maxStars={5}
                starSize={30}
                emptyStar={emptyStar}
                fullStar={fullStar}
                selectedStar={(rating: any) => onStarRatingPress(rating)}
                fullStarColor={Colors.ember}
                emptyStarColor={Colors.grey}
              />
            </DynamicView>
            <DynamicView>
              <DynamicText
                fontFamily={fonts.DMSans700Bold}
                fontSize={15}
                lineHeight={19.53}
                color={Colors.black}>
                Review title
              </DynamicText>
              <DynamicTextInput
                backgroundColor={Colors.lightGrey}
                width={width - 22}
                paddingHorizontal={21}
                paddingVertical={11}
                fontSize={14}
                fontFamily={fonts.DMSans400Regular}
                lineHeight={18.23}
                marginTop={3}
                borderRadius={4}
                placeholder="Insane burger"
                value={reviewTitle}
                placeholderTextColor={Colors.grey}
                onChangeText={setReviewTitle}
              />
            </DynamicView>
            <DynamicView paddingTop={22}>
              <DynamicText
                fontFamily={fonts.DMSans700Bold}
                fontSize={15}
                lineHeight={19.53}
                color={Colors.black}>
                Description
              </DynamicText>
              <DynamicTextInput
                backgroundColor={Colors.lightGrey}
                width={width - 22}
                paddingHorizontal={21}
                paddingTop={10}
                fontSize={14}
                fontFamily={fonts.DMSans400Regular}
                lineHeight={18.23}
                marginTop={3}
                borderRadius={4}
                multiline
                placeholder="Out for the day at Hillsborough Honey Fair, starving and baby crying.
              I'm scowering through the food options when I come across The Hatch, sitting inconspicuously amongst the..."
                placeholderTextColor={Colors.grey}
                height={150}
                value={reviewDescription}
                onChangeText={setReviewDescription}
              />
            </DynamicView>
            <DynamicView paddingVertical={12} width={width - 22}>
              <DishButton
                variant="primary"
                icon="arrowright"
                label="Submit review"
                onPress={submitReview}
                showSpinner={isLoading}
              />
            </DynamicView>
          </DynamicView>
        </DynamicView>
      </TouchableWithoutFeedback>
    </ActionSheet>
  );
};

export default OrderReviewModal;
