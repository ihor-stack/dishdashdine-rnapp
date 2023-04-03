import React, {useCallback} from 'react';
import {fonts} from '@/themes/fonts';
import {
  DynamicImage,
  DynamicPressable,
  DynamicText,
  DynamicView,
} from '@/components';
import {Colors} from '@/themes';
import {ScrollView} from 'react-native';
import {FAQs} from '@/constants/fakeData';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {MyAccountStackNavParamList} from '../../navigation/Navigation';

const arrowRight = require('@/assets/images/right.png');

const FAQsListing = () => {
  const {navigate} =
    useNavigation<NavigationProp<MyAccountStackNavParamList>>();

  const onFAQListNavPress = useCallback(
    (route: keyof MyAccountStackNavParamList) => {
      navigate(route);
    },
    [navigate],
  );
  return (
    <ScrollView>
      {FAQs.map(faq => {
        return (
          <DynamicView backgroundColor="#fff" marginBottom={6}>
            <DynamicView
              paddingTop={20}
              paddingHorizontal={11}
              backgroundColor="#fff"
              marginBottom={29}>
              <DynamicText
                fontFamily={fonts.DMSans700Bold}
                fontSize={15}
                lineHeight={20}
                color={Colors.black}>
                {faq.name}
              </DynamicText>
            </DynamicView>
            {faq.listings.map(list => {
              return (
                <DynamicPressable
                  onPress={() => onFAQListNavPress('FAQsDetail')}
                  alignItems="center"
                  flexDirection="row"
                  justifyContent="space-between"
                  marginBottom={29}
                  paddingLeft={11}
                  paddingRight={16}
                  backgroundColor="#fff">
                  <DynamicText
                    fontFamily={fonts.DMSans500Medium}
                    fontSize={13}
                    lineHeight={17}
                    color={Colors.black}
                    numberOfLines={1}>
                    {list.title}
                  </DynamicText>
                  <DynamicView flex={0.1} alignItems="flex-end">
                    <DynamicImage
                      source={arrowRight}
                      width={8.13}
                      height={12.67}
                    />
                  </DynamicView>
                </DynamicPressable>
              );
            })}
          </DynamicView>
        );
      })}
    </ScrollView>
  );
};

export default FAQsListing;

// scrollview styleing paddingTop={20} paddingHorizontal={11} backgroundColor="#fff"
