import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {ScrollView} from 'native-base';
import {DynamicText, DynamicTextInput, DynamicView} from '@/components';
import {Colors, fonts} from '@/themes';
import DishButton from '@/components/DishButton';
import {useNavigation} from '@react-navigation/native';
import {captureErrorException} from '@/utils/error-handler';
import DishSpinner from '@/components/DishSpinner';
import UserService from '@/api/user';

const DeleteAccountConfirm = () => {
  const navigation = useNavigation<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState<string>('');

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      await UserService.deleteUser(password);
      setIsLoading(false);
      navigation.navigate('DeleteAccountDeleted');
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
          Are you sure you want to delete your account?
        </DynamicText>
      </DynamicView>
      <DynamicView marginTop={9}>
        <DynamicText
          fontFamily={fonts.DMSans400Regular}
          lineHeight={16}
          fontSize={13}
          color={Colors.grey}>
          Your account can’t be restored after it’s been deleted. Are you sure
          you want to continue? If so, please confirm your password.
        </DynamicText>
      </DynamicView>
      <DynamicView
        marginTop={21}
        borderTopColor={Colors.lightGrey}
        borderTopWidth={1}
        paddingTop={20}>
        <DynamicText
          fontFamily={fonts.DMSans700Bold}
          fontSize={15}
          lineHeight={20}
          color="#303030">
          Your Password
        </DynamicText>
        <DynamicTextInput
          placeholder="Password"
          placeholderTextColor={Colors.grey}
          backgroundColor="#F8F8F8"
          marginTop={4}
          borderRadius={4}
          paddingHorizontal={21}
          paddingVertical={11}
          fontSize={14}
          lineHeight={19}
          fontFamily={fonts.DMSans400Regular}
          fontWeight="400"
          color="#303030"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </DynamicView>
      <DynamicView marginTop="auto">
        <DishButton
          icon="arrowright"
          variant="primary"
          label="Delete my account"
          onPress={onSubmit}
        />
      </DynamicView>
    </ScrollView>
  );
};

export default DeleteAccountConfirm;

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
