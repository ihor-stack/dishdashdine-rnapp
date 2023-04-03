import React from 'react';
import {Colors, fonts} from '@/themes';
import {DynamicText, DynamicView} from '@/components';
import {ScrollView} from 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';

const PrivacyPolicy = () => {
  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollViewContainer}>
      <DynamicView marginTop={20}>
        <DynamicText
          fontFamily={fonts.DMSans400Regular}
          lineHeight={16}
          fontSize={13}
          color={Colors.grey}>
          Last Updated: 07/03/2022
        </DynamicText>
        <DynamicView marginTop={20}>
          <DynamicText
            fontFamily={fonts.DMSans500Medium}
            lineHeight={21}
            fontSize={16}
            color={Colors.black}>
            What information do we collect
          </DynamicText>
        </DynamicView>
        <DynamicView marginTop={9}>
          <DynamicText
            fontFamily={fonts.DMSans400Regular}
            lineHeight={16}
            fontSize={13}
            color={Colors.grey}>
            We collect personal information that you voluntarily provide to us
            when you register on the Website, express an interest in obtaining
            information about us or our products and Services, when you
            participate in activities on the Website or otherwise when you
            contact us. The personal information that we collect depends on the
            context of your interactions with us and the Website, the choices
            you make and the products and features you use. The personal
            information we collect may include the following: Personal
            Information Provided by You. We may collect names; phone numbers;
            email addresses; mailing addresses; job titles; contact preferences;
            data collected from surveys; usernames; passwords; contact or
            authentication data; information you provide when using our products
            (e.g., business name, business email, business address, business
            fax, company website, etc.); number of unique views and total number
            of visitors when you deploy your cookie banner using our consent
            management solution; information in blog comments; financial
            information (e.g., last four digits of your debit or credit card
            number, billing history, billing address, card type, issuing bank,
            expiration date, card origin by country); profile photo; and other
            similar information. Payment Data. We may collect data necessary to
            process your payment if you make purchases, such as your payment
            instrument number (such as a credit card number), and the security
            code associated with your payment instrument. All payment data is
            stored by Stripe. You may find their privacy notice link here.
            Social Media Login Data. We may provide you with the option to
            register with us using your existing social media account details,
            like your Facebook, Twitter or other social media account. If you
            choose to register in this way, we will collect the information
            described in the section called “HOW DO WE HANDLE YOUR SOCIAL
            LOGINS?” below. All personal information that you provide to us must
            be true, complete, and accurate, and you must notify us of any
            changes to such personal information.
          </DynamicText>
        </DynamicView>
      </DynamicView>
    </ScrollView>
  );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.white,
  },
  scrollViewContainer: {
    marginHorizontal: 11,
    paddingBottom: 20,
  },
});
