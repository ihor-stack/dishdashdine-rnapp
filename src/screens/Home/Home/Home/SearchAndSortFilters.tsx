import React, {useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  DynamicImage,
  DynamicPressable,
  DynamicText,
  DynamicView,
} from '@/components';
import {HomeStackParamList} from '@/navigation/types';
import {useDispatch} from 'react-redux';
import {setHomeOrderType, setShowSortAndFilter} from '@/store/home';
import CollectionDelivery from '@/screens/Home/Home/Home/CollectionDelivery';
import Taxonomies from '@/screens/Home/Home/Home/Taxonomies';

const optionsPng = require('@/assets/images/options.png');

const SearchAndSortFilters = () => {
  const dispatch = useDispatch();
  const {navigate} = useNavigation<StackNavigationProp<HomeStackParamList>>();

  const toggler = () => {
    dispatch(setShowSortAndFilter());
  };

  const onSearchPress = useCallback(() => {
    navigate('Search');
  }, [navigate]);

  return (
    <DynamicView borderBottomColor="#F2F4F5" borderBottomWidth={6}>
      <CollectionDelivery
        onSelectedIndex={index => {
          dispatch(setHomeOrderType(index));
        }}
      />
      <DynamicView
        marginTop={10}
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
          alignItems="center"
          marginRight={14}>
          <AntDesign size={16} name="search1" />
          <DynamicView marginLeft={10}>
            <DynamicText fontSize={14} lineHeight={18} color="#818183">
              Restaurants, catering, pub grub, etc...
            </DynamicText>
          </DynamicView>
        </DynamicPressable>
        <DynamicPressable marginRight={8} onPress={toggler}>
          <DynamicImage source={optionsPng} width={22} height={19} />
        </DynamicPressable>
      </DynamicView>
      <Taxonomies />
    </DynamicView>
  );
};

export default SearchAndSortFilters;
