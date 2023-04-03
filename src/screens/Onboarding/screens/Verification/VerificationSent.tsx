import React, {useState} from 'react';
import MailBoxSVG from '@/assets/svg/mailbox.svg';
import DishSpinner from '@/components/DishSpinner';
import {Box, Center, Text, Pressable} from 'native-base';
import {Colors} from '@/themes';
import {useRoute} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Dimensions, Platform} from 'react-native';
import normalize from '@/themes/normalize';
import UserService from '@/api/user';
import {
  showErrorMessage,
  showSuccessMessage,
} from '@/components/DishFlashMessage';

const {width} = Dimensions.get('window');

const p = Platform.OS === 'ios' ? 28 : 0;

const VerificationSent = () => {
  const params = useRoute().params as any;
  const email = params?.email;
  const {bottom} = useSafeAreaInsets();
  const [showLoading, setShowLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const onResendPress = async (data: any) => {
    setShowLoading(true);
    try {
      await UserService.updateUser({
        email: params.email,
      });
      showSuccessMessage('Success', 'Email Verification Sent');
    } catch (e) {
      showErrorMessage('Error', 'Failed to send Verification');
    } finally {
      setShowLoading(false);
    }
  };

  return (
    <Box
      bgColor={Colors.white}
      opacity={showLoading ? 0.5 : 1}
      flex={1}
      pt={5}
      pb={bottom + p}
      justifyContent="center"
      alignItems="center">
      <Center marginTop={33} marginRight={60} marginLeft={60}>
        <MailBoxSVG />
        <Text
          fontSize={24}
          lineHeight={31}
          bold
          textAlign="center"
          marginTop={33}>
          Please verify your email address
        </Text>
        <Text
          textAlign="center"
          color={Colors.grey}
          fontWeight="600"
          fontSize={13}
          lineHeight={16}
          marginTop={6}>
          We have sent a verification link to {email}
        </Text>
        {showLoading ? <DishSpinner /> : null}
      </Center>
      <Pressable
        marginTop="auto"
        borderRadius={4}
        backgroundColor={Colors.red}
        width={width - 22}
        pt={normalize(12)}
        pb={normalize(12)}
        marginBottom={20}
        alignItems="center"
        disabled={showLoading}
        onPress={onResendPress}>
        <Text color="white">Resend verification email</Text>
      </Pressable>
    </Box>
  );
};

export default VerificationSent;
