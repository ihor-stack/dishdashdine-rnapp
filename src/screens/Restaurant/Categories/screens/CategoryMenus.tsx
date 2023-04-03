import {DynamicText, DynamicView} from '@/components';
import DishButton from '@/components/DishButton';
import {showSuccessMessage} from '@/components/DishFlashMessage';
import DishToast from '@/components/DishToast';
import {Colors, fonts} from '@/themes';
import {useNavigation} from '@react-navigation/native';
import {Divider, Icon, Input, Image, useToast} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {FlatList} from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';

const deleteIcon = require('@/assets/images/delete.png');
export interface CategoryMenusProps {
  menus: any[];
}

const CategoryMenus = ({menus}: CategoryMenusProps) => {
  const toast = useToast();
  const navigation = useNavigation();

  const headerItem = () => {
    return (
      <>
        <DynamicView marginTop={20}>
          <DynamicText
            fontFamily={fonts.DMSans700Bold}
            fontSize={14}
            lineHeight={18}
            color={Colors.black}>
            Menu items
          </DynamicText>
        </DynamicView>
        <DynamicView marginTop={15}>
          <DynamicView style={styles.searchBarStyle}>
            <Input
              InputRightElement={
                <Icon
                  as={<AntDesign size={16} name="close" color={Colors.grey} />}
                  marginRight={15}
                />
              }
              style={styles.searchTextStyle}
              placeholder="Search"
            />
          </DynamicView>
        </DynamicView>
      </>
    );
  };

  const renderItem = ({item}) => {
    return (
      <DynamicView
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        paddingTop={15}
        paddingBottom={10}>
        <DynamicView>
          <FastImage
            style={{width: 45, height: 45, borderRadius: 4}}
            source={{
              uri: item?.itemImagePath,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        </DynamicView>
        <DynamicView alignItems="flex-start" flex={1} paddingLeft={16}>
          <DynamicText style={styles.flatlistItem}>{item.itemName}</DynamicText>
        </DynamicView>
        <Image source={deleteIcon} alt="image_" borderRadius={4} />
      </DynamicView>
    );
  };

  const onSaveCategory = async () => {
    toast.show({
      placement: 'top',
      duration: 2500,
      render: () => {
        return (
          showSuccessMessage(
            'Information updated',
            'Your information has been updated.',
          )
        );
      },
      onCloseComplete() {
        navigation.goBack();
      },
    });
  };

  const renderFooter = () => {
    return (
      <DynamicView>
        <DishButton
          icon="arrowright"
          label="Save category"
          variant="primary"
          onPress={onSaveCategory}
        />
        <DishButton
          showIcon={false}
          label="Delete Category"
          variant="lightGrey"
        />
      </DynamicView>
    );
  };

  return (
    <FlatList
      data={menus}
      renderItem={renderItem}
      ItemSeparatorComponent={() => {
        return <Divider bgColor={Colors.lightGrey} />;
      }}
      contentContainerStyle={{
        marginTop: 15,
        ...styles.containerView,
      }}
      ListHeaderComponent={headerItem}
      ListFooterComponent={renderFooter}
      ListFooterComponentStyle={styles.listFooterStyle}
    />
  );
};

export default CategoryMenus;

const styles = StyleSheet.create({
  containerView: {
    marginTop: 11,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  searchBarStyle: {
    backgroundColor: Colors.lightestGrey,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.lightestGrey,
  },
  searchTextStyle: {
    fontFamily: fonts.DMSans400Regular,
    fontSize: 14,
    lineHeight: 18,
    color: Colors.grey,
  },
  flatlistItem: {
    fontFamily: fonts.DMSans500Medium,
    fontSize: 14,
    lineHeight: 18,
    color: Colors.black,
  },
  listFooterStyle: {
    marginBottom: 21,
    marginTop: 25,
  },
});
