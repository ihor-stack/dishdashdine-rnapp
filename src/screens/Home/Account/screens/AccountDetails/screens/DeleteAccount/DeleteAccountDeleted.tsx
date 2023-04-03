import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ScrollView} from 'native-base';
import {DynamicText, DynamicView} from '@/components';
import {Colors, fonts} from '@/themes';
import DishButton from '@/components/DishButton';
import {forceSignOut} from '@/utils/app-actions';
import {useDispatch} from 'react-redux';
import DishSpinner from '@/components/DishSpinner';
import {captureErrorException} from '@/utils/error-handler';
import {useNavigation} from '@react-navigation/native';

const DeleteAccountDeleted = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isForceOut, setIsForceOut] = useState(false);

  React.useEffect(
    () =>
      navigation.addListener('beforeRemove', e => {
        if (isForceOut) {
          navigation.dispatch(e.data.action);
          return;
        }
        // Prevent default behavior of leaving the screen
        e.preventDefault();
      }),
    [navigation, isForceOut],
  );

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      setIsForceOut(true);
      await forceSignOut(dispatch, navigation);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      captureErrorException(error);
    }
  };

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollViewContainer}>
      {isLoading && <DishSpinner />}
      <DynamicView marginTop={20}>
        <DynamicText
          fontFamily={fonts.DMSans500Medium}
          lineHeight={21}
          fontSize={16}
          color={Colors.black}>
          Your account has been deleted
        </DynamicText>
      </DynamicView>
      <DynamicView marginTop={9}>
        <DynamicText
          fontFamily={fonts.DMSans400Regular}
          lineHeight={16}
          fontSize={13}
          color={Colors.grey}>
          Your account had been deleted from our system. We hope to see you
          again in the future.
          {'\n\n'}
          Best wishes from the Dish Dash Dine team.
        </DynamicText>
      </DynamicView>
      <DynamicView marginTop="auto" marginBottom={30}>
        <DishButton
          icon="arrowright"
          variant="primary"
          label="Got it, thanks"
          onPress={onSubmit}
        />
      </DynamicView>
    </ScrollView>
  );
};

export default DeleteAccountDeleted;

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.white,
  },
  scrollViewContainer: {
    marginHorizontal: 11,
    paddingBottom: 20,
    flexGrow: 1,
  },
});
