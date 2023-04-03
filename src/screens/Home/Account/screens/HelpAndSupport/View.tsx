import React from 'react';
import {
  DynamicImage,
  DynamicPressable,
  DynamicText,
  DynamicView,
} from '@/components';
import {Colors, fonts} from '@/themes';

const arrowRight = require('@/assets/images/right.png');
const question = require('@/assets/images/myAccount/question.png');

export interface HelpAndSupportViewProps {
  onFAQsNavPress?: any;
  navigate: any;
}

const HelpAndSupportView = ({
  onFAQsNavPress,
  navigate,
}: HelpAndSupportViewProps) => {
  return (
    <DynamicView
      flex={1}
      paddingTop={20}
      paddingHorizontal={11}
      backgroundColor="#fff">
      <DynamicPressable
        alignItems="center"
        flexDirection="row"
        marginBottom={31}
        onPress={() =>
          navigate('HelpSupportOrder', {
            isFrom: 'issue',
          })
        }>
        <DynamicView
          alignItems="center"
          justifyContent="center"
          flex={0.06}
          marginRight={24}>
          <DynamicImage
            alignSelf="center"
            source={question}
            width={20}
            height={20}
          />
        </DynamicView>
        <DynamicView flex={0.84}>
          <DynamicText
            fontFamily={fonts.DMSans500Medium}
            fontSize={14}
            lineHeight={18}
            color={Colors.black}>
            Help with an order
          </DynamicText>
        </DynamicView>
        <DynamicView flex={0.1} alignItems="center">
          <DynamicImage source={arrowRight} width={8.13} height={12.67} />
        </DynamicView>
      </DynamicPressable>
      <DynamicPressable
        alignItems="center"
        flexDirection="row"
        marginBottom={31}
        onPress={() =>
          navigate('HelpSupportOrder', {
            isFrom: 'refund',
          })
        }>
        <DynamicView
          alignItems="center"
          justifyContent="center"
          flex={0.06}
          marginRight={24}>
          <DynamicImage
            alignSelf="center"
            source={question}
            width={20}
            height={20}
          />
        </DynamicView>
        <DynamicView flex={0.84}>
          <DynamicText
            fontFamily={fonts.DMSans500Medium}
            fontSize={14}
            lineHeight={18}
            color={Colors.black}>
            Request a refund
          </DynamicText>
        </DynamicView>
        <DynamicView flex={0.1} alignItems="center">
          <DynamicImage source={arrowRight} width={8.13} height={12.67} />
        </DynamicView>
      </DynamicPressable>
      <DynamicPressable
        onPress={() => onFAQsNavPress('FAQsListing')}
        alignItems="center"
        flexDirection="row"
        marginBottom={31}>
        <DynamicView
          alignItems="center"
          justifyContent="center"
          flex={0.06}
          marginRight={24}>
          <DynamicImage
            alignSelf="center"
            source={question}
            width={20}
            height={20}
          />
        </DynamicView>
        <DynamicView flex={0.84}>
          <DynamicText
            fontFamily={fonts.DMSans500Medium}
            fontSize={14}
            lineHeight={18}
            color={Colors.black}>
            FAQs
          </DynamicText>
        </DynamicView>
        <DynamicView flex={0.1} alignItems="center">
          <DynamicImage source={arrowRight} width={8.13} height={12.67} />
        </DynamicView>
      </DynamicPressable>
    </DynamicView>
  );
};

export default HelpAndSupportView;
