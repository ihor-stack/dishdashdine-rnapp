import React, {useCallback} from 'react';
import {DynamicPressable, DynamicText, DynamicView} from '@/components';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Colors, fonts} from '@/themes';
import {useNavigation} from '@react-navigation/native';

const SearchHeader = () => {
  const {goBack} = useNavigation<any>();

  const onBackPress = useCallback(() => {
    goBack();
  }, [goBack]);

  return (
    <DynamicView borderBottomWidth={1} borderBottomColor="#F2F4F5">
      <DynamicView
        paddingHorizontal={16}
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        marginBottom={20}>
        <DynamicPressable position="absolute" left={16} onPress={onBackPress}>
          <AntDesign size={24} color={Colors.black} name="arrowleft" />
        </DynamicPressable>
        <DynamicView>
          <DynamicText
            fontFamily={fonts.DMSans500Medium}
            fontSize={24}
            lineHeight={31}
            color={Colors.black}>
            Search
          </DynamicText>
        </DynamicView>
      </DynamicView>
    </DynamicView>
  );
};

export default SearchHeader;
