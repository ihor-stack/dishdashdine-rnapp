import React from 'react';
import {
  DynamicImage,
  DynamicPressable,
  DynamicText,
  DynamicView,
} from '@/components';
import {Colors, fonts} from '@/themes';
import ActionSheet from '@alessiocancian/react-native-actionsheet';
import {IUser} from '@/api/user';
import {ScrollView} from 'react-native';
import moment from 'moment';

const my_wallet = require('@/assets/images/myAccount/my_wallet.png');
const phone = require('@/assets/images/myAccount/phone.png');
const privacy = require('@/assets/images/myAccount/privacy.png');
const question = require('@/assets/images/myAccount/question.png');
const star = require('@/assets/images/myAccount/star.png');
const location = require('@/assets/images/location.png');
const right = require('@/assets/images/right.png');
const accountActive = require('@/assets/images/account-active.png');
const profilePicture = require('@/assets/images/myAccount/profile_picture.png');
const editIcon = require('@/assets/images/myAccount/edit-icon.png');

export interface MyAccountViewProps {
  user: IUser | null;
  openCamera: any;
  singleFilePicker: any;
  showActionSheet: any;
  onAccountNavPress: any;
  CustomActionSheet: any;
}

const MyAccountView = ({
  user,
  openCamera,
  singleFilePicker,
  CustomActionSheet,
  onAccountNavPress,
}: MyAccountViewProps) => {
  return (
    <ScrollView
      style={{
        backgroundColor: Colors.white,
      }}
      contentContainerStyle={{
        paddingHorizontal: 11,
        flexGrow: 1,
        paddingTop: 20,
      }}>
      <DynamicView
        flexDirection="row"
        alignItems="center"
        borderBottomWidth={1}
        borderBottomColor="#F2F4F5"
        paddingBottom={18}
        marginBottom={20}>
        <DynamicView marginLeft={15}>
          <DynamicText
            fontFamily={fonts.DMSans700Bold}
            fontSize={18}
            lineHeight={23}
            color={Colors.black}>
            {user?.firstName} {user?.lastName}
          </DynamicText>
          <DynamicText
            fontSize={14}
            lineHeight={18}
            fontFamily={fonts.DMSans400Regular}
            color={Colors.black}>
            Joined {moment(user?.dateJoined).format('MMMM YYYY')}
          </DynamicText>
        </DynamicView>
      </DynamicView>
      <DynamicPressable
        alignItems="center"
        flexDirection="row"
        onPress={() => onAccountNavPress('AccountDetails')}
        marginBottom={31}>
        <DynamicView
          alignItems="center"
          justifyContent="center"
          flex={0.06}
          marginRight={24}>
          <DynamicImage
            alignSelf="center"
            source={accountActive}
            width={14.67}
            height={19.25}
          />
        </DynamicView>
        <DynamicView flex={0.84}>
          <DynamicText
            fontFamily={fonts.DMSans500Medium}
            fontSize={14}
            lineHeight={18}
            color={Colors.black}>
            Account Details
          </DynamicText>
        </DynamicView>
        <DynamicView flex={0.1} alignItems="center">
          <DynamicImage source={right} width={8.13} height={12.67} />
        </DynamicView>
      </DynamicPressable>
      <DynamicPressable
        onPress={() => onAccountNavPress('MyWallet')}
        alignItems="center"
        flexDirection="row"
        marginBottom={31}>
        <DynamicView
          alignItems="center"
          justifyContent="center"
          flex={0.06}
          marginRight={24}>
          <DynamicImage source={my_wallet} width={19.25} height={16.5} />
        </DynamicView>
        <DynamicView flex={0.84}>
          <DynamicText
            fontFamily={fonts.DMSans500Medium}
            fontSize={14}
            lineHeight={18}
            color={Colors.black}>
            My Wallet
          </DynamicText>
        </DynamicView>
        <DynamicView flex={0.1} alignItems="center">
          <DynamicImage source={right} width={8.13} height={12.67} />
        </DynamicView>
      </DynamicPressable>
      <DynamicPressable onPress={() => onAccountNavPress('ManageAddresses')}>
        <DynamicView alignItems="center" flexDirection="row" marginBottom={31}>
          <DynamicView
            alignItems="center"
            justifyContent="center"
            flex={0.06}
            marginRight={24}>
            <DynamicImage
              alignSelf="center"
              source={location}
              width={17.1}
              height={20.17}
            />
          </DynamicView>
          <DynamicView flex={0.84}>
            <DynamicText
              fontFamily={fonts.DMSans500Medium}
              fontSize={14}
              lineHeight={18}
              color={Colors.black}>
              Manage Address
            </DynamicText>
          </DynamicView>
          <DynamicView flex={0.1} alignItems="center">
            <DynamicImage source={right} width={8.13} height={12.67} />
          </DynamicView>
        </DynamicView>
      </DynamicPressable>
      <DynamicPressable
        onPress={() => onAccountNavPress('MyReviews')}
        alignItems="center"
        flexDirection="row"
        marginBottom={31}>
        <DynamicView alignItems="center" flexDirection="row">
          <DynamicView
            alignItems="center"
            justifyContent="center"
            flex={0.06}
            marginRight={24}>
            <DynamicImage source={star} width={20} height={18} />
          </DynamicView>
          <DynamicView flex={0.84}>
            <DynamicText
              fontFamily={fonts.DMSans500Medium}
              fontSize={14}
              lineHeight={18}
              color={Colors.black}>
              My Reviews
            </DynamicText>
          </DynamicView>
          <DynamicView flex={0.1} alignItems="center">
            <DynamicImage source={right} width={8.13} height={12.67} />
          </DynamicView>
        </DynamicView>
      </DynamicPressable>
      <DynamicPressable
        onPress={() => onAccountNavPress('HelpAndSupport')}
        alignItems="center"
        flexDirection="row"
        marginBottom={31}>
        <DynamicView
          alignItems="center"
          justifyContent="center"
          flex={0.06}
          marginRight={24}>
          <DynamicImage source={question} width={19.25} height={16.5} />
        </DynamicView>
        <DynamicView flex={0.84}>
          <DynamicText
            fontFamily={fonts.DMSans500Medium}
            fontSize={14}
            lineHeight={18}
            color={Colors.black}>
            Help & Support
          </DynamicText>
        </DynamicView>
        <DynamicView flex={0.1} alignItems="center">
          <DynamicImage source={right} width={8.13} height={12.67} />
        </DynamicView>
      </DynamicPressable>
      <DynamicPressable
        onPress={() => onAccountNavPress('YourAppExperience')}
        alignItems="center"
        flexDirection="row">
        <DynamicView alignItems="center" flexDirection="row" marginBottom={31}>
          <DynamicView
            flex={0.06}
            marginRight={24}
            alignItems="center"
            justifyContent="center">
            <DynamicImage
              source={phone}
              width={13.62}
              height={22}
              margin="auto"
            />
          </DynamicView>
          <DynamicView flex={0.84}>
            <DynamicText
              fontFamily={fonts.DMSans500Medium}
              fontSize={14}
              lineHeight={18}
              color={Colors.black}>
              Your app experience
            </DynamicText>
          </DynamicView>
          <DynamicView flex={0.1} alignItems="center">
            <DynamicImage source={right} width={8.13} height={12.67} />
          </DynamicView>
        </DynamicView>
      </DynamicPressable>
      <DynamicPressable
        onPress={() => onAccountNavPress('TermsOfService')}
        alignItems="center"
        flexDirection="row"
        marginBottom={31}>
        <DynamicView
          alignItems="center"
          justifyContent="center"
          flex={0.06}
          marginRight={24}>
          <DynamicImage source={question} width={19.25} height={16.5} />
        </DynamicView>
        <DynamicView flex={0.84}>
          <DynamicText
            fontFamily={fonts.DMSans500Medium}
            fontSize={14}
            lineHeight={18}
            color={Colors.black}>
            Terms of Service
          </DynamicText>
        </DynamicView>
        <DynamicView flex={0.1} alignItems="center">
          <DynamicImage source={right} width={8.13} height={12.67} />
        </DynamicView>
      </DynamicPressable>
      <DynamicPressable
        onPress={() => onAccountNavPress('PrivacyPolicy')}
        alignItems="center"
        flexDirection="row"
        marginBottom={31}>
        <DynamicView alignItems="center" flexDirection="row" marginBottom={31}>
          <DynamicView
            flex={0.06}
            marginRight={24}
            alignItems="center"
            justifyContent="center">
            <DynamicImage source={privacy} width={18.33} height={18.33} />
          </DynamicView>
          <DynamicView flex={0.84}>
            <DynamicText
              fontFamily={fonts.DMSans500Medium}
              fontSize={14}
              lineHeight={18}
              color={Colors.black}>
              Privacy Policy
            </DynamicText>
          </DynamicView>
          <DynamicView flex={0.1} alignItems="center">
            <DynamicImage source={right} width={8.13} height={12.67} />
          </DynamicView>
        </DynamicView>
      </DynamicPressable>
      <ActionSheet
        ref={CustomActionSheet}
        options={['Take Photo', 'Photos Gallery', 'Cancel']}
        cancelButtonIndex={2}
        onPress={index => {
          if (index === 0) {
            openCamera();
          } else if (index === 1) {
            singleFilePicker();
          }
        }}
      />
    </ScrollView>
  );
};

export default MyAccountView;
