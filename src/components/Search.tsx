import React from 'react';
import {StyleSheet} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Box, HStack, Pressable, ScrollView, Text} from 'native-base';
import DynamicPressable from '@/components/DynamicPressable';
import DynamicText from '@/components/DynamicText';
import DynamicView from '@/components/DynamicView';
import Colors from '@/themes/colors';

export interface SearchProps {
  onSearchPress?: () => void;
}

const Search = ({onSearchPress}: SearchProps) => {
  return (
    <DynamicView borderBottomColor="#F2F4F5" borderBottomWidth={6}>
      <DynamicView
        paddingBottom={10}
        paddingTop={20}
        paddingHorizontal={11}
        flexDirection="row"
        alignItems="center">
        <DynamicPressable
          onPress={onSearchPress}
          backgroundColor="#F8F8F8"
          borderRadius={4}
          padding={11}
          flex={1}
          flexDirection="row"
          alignItems="center">
          <AntDesign size={16} name="search1" />
          <DynamicView marginLeft={10}>
            <DynamicText fontSize={14} lineHeight={18} color="#818183">
              Restaurants, catering, pub grub, etc...
            </DynamicText>
          </DynamicView>
        </DynamicPressable>
      </DynamicView>
      {/*<Box p={3}>*/}
      {/*  <ScrollView horizontal showsHorizontalScrollIndicator={false}>*/}
      {/*    <HStack space={5}>*/}
      {/*      <Pressable bgColor={Colors.black} px={3} py={1} borderRadius="2xl">*/}
      {/*        <Text color={Colors.white}>All</Text>*/}
      {/*      </Pressable>*/}
      {/*      <Pressable px={3} py={1}>*/}
      {/*        <Text color={Colors.grey}>Restaurants</Text>*/}
      {/*      </Pressable>*/}
      {/*      <Pressable px={3} py={1}>*/}
      {/*        <Text color={Colors.grey}>Grocery</Text>*/}
      {/*      </Pressable>*/}
      {/*      <Pressable px={3} py={1}>*/}
      {/*        <Text color={Colors.grey}>Alcohol</Text>*/}
      {/*      </Pressable>*/}
      {/*      <Pressable px={3} py={1}>*/}
      {/*        <Text color={Colors.grey}>Convenience</Text>*/}
      {/*      </Pressable>*/}
      {/*    </HStack>*/}
      {/*  </ScrollView>*/}
      {/*</Box>*/}
    </DynamicView>
  );
};

export default Search;

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: 27,
    paddingLeft: 19,
    paddingBottom: 20,
  },
});
