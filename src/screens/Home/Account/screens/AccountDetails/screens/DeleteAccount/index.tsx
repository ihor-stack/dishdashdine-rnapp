import React from 'react';
import {StyleSheet} from 'react-native';
import {ScrollView} from 'native-base';
import {Colors, fonts} from '@/themes';
import {DynamicText, DynamicView} from '@/components';
import DishButton from '@/components/DishButton';
import {useNavigation} from '@react-navigation/native';

const DeleteAccount = () => {
  const navigation = useNavigation<any>();

  const onSubmit = () => {
    navigation.navigate('DeleteAccountConfirm');
  };

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollViewContainer}>
      <DynamicView marginTop={20}>
        <DynamicText
          fontFamily={fonts.DMSans500Medium}
          lineHeight={21}
          fontSize={16}
          color={Colors.black}>
          Permanently delete your account
        </DynamicText>
      </DynamicView>
      <DynamicView marginTop={9}>
        <DynamicText
          fontFamily={fonts.DMSans400Regular}
          lineHeight={16}
          fontSize={13}
          color={Colors.grey}>
          Sorry you’re leaving us! Remember, when you delete your account you’ll
          lose any saved addresses and perks. There’s no going back!
          {'\n\n'}Your account can’t be restored after it’s been deleted. Are
          you sure you want to continue?
        </DynamicText>
      </DynamicView>
      <DynamicView marginTop="auto">
        <DishButton
          icon="arrowright"
          variant="primary"
          label="Yes, confirm deletion"
          onPress={onSubmit}
        />
      </DynamicView>
    </ScrollView>
  );
};

export default DeleteAccount;

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
