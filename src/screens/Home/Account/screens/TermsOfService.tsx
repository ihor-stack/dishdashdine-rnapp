import React from 'react';
import {Colors, fonts} from '@/themes';
import {DynamicText, DynamicView} from '@/components';
import {ScrollView} from 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';

const TermsOfService = () => {
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
            Agreement to terms
          </DynamicText>
        </DynamicView>
        <DynamicView marginTop={9}>
          <DynamicText
            fontFamily={fonts.DMSans400Regular}
            lineHeight={16}
            fontSize={13}
            color={Colors.grey}>
            We are Termly Inc., doing business as Termly (“Termly,” “we,” “us,”
            or “our”), a company registered in the State of Delaware. We operate
            the website https://termly.io (the “Website”) through which we
            provide you our services, (collectively, the “Services” which
            include the provision and use of the Website). You can contact us by
            phone at (855) 234-5020, by email at info@termly.io, or by post to
            Termly Inc., 8 The Grn Ste B, Dover, DE 19901. These Terms of Use
            constitute a legally binding agreement made between you, whether
            personally or on behalf of an entity (“you”) and concerning your
            access to and use of the Website and the Services. You agree that by
            accessing the Services, you have read, understood, and agree to be
            bound by all of these Terms of Use. IF YOU DO NOT AGREE WITH ALL OF
            THESE TERMS OF USE, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE
            SERVICES AND YOU MUST DISCONTINUE USE IMMEDIATELY. Supplemental
            terms and conditions or documents that may be posted on the Website
            from time to time are hereby expressly incorporated herein by
            reference. We reserve the right, in Termly’s sole discretion, to
            make changes or modifications to these Terms of Use from time to
            time. We will alert you about any changes by updating the “Last
            updated” date of these Terms of Use, and you waive any right to
            receive specific notice of each such change. It is your
            responsibility to periodically review these Terms of Use to stay
            informed as each time you access the Services, you will be subject
            to, and will be deemed to have been made aware of and to have
            accepted, the then applicable Terms of Use. The Services are
            intended for business users who are at least 18 years old. Persons
            under the age of 18 are not permitted to use or register for the
            Services.
          </DynamicText>
        </DynamicView>
      </DynamicView>
    </ScrollView>
  );
};

export default TermsOfService;

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.white,
  },
  scrollViewContainer: {
    marginHorizontal: 11,
    paddingBottom: 20,
  },
});
