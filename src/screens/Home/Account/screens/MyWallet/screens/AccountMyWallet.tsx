import {
  FlatList,
  RefreshControl,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';

import React, {useCallback, useState} from 'react';
import {
  DynamicView,
  DynamicText,
  DynamicPressable,
  DynamicImage,
} from '@/components';
import {useNavigation} from '@react-navigation/native';

import {Colors, fonts} from '@/themes';

import {useDispatch, useSelector} from 'react-redux';
import {getAllCards} from '@/store/my-wallet/thunk';
import DishSpinner from '@/components/DishSpinner';
import {cardSelectors} from '@/store/my-wallet';
import {ICard} from '@/api/generic';
import Card from './Card';

const plus = require('@/assets/images/myAccount/plus.png');

const MyWallet = () => {
  const mywallets: ICard[] = useSelector(cardSelectors.selectMyWallet);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const dispatch = useDispatch<any>();
  const navigation = useNavigation<any>();
  const {width} = useWindowDimensions();

  const onAddCardPress = async () => {
    navigation.navigate('AddCard');
  };

  const onCardPress = useCallback(
    (card: ICard) => {
      // pass card info on navigate params in the future to display card info
      navigation.navigate('EditCard', {
        card,
      });
    },
    [navigation],
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await dispatch(getAllCards());
    setRefreshing(false);
  }, []);

  const renderItem = ({item, index}: {item: ICard; index: number}) => {
    return (
      <DynamicPressable
        width={width - 22}
        marginBottom={30}
        alignItems="center"
        onPress={() => onCardPress(item)}
        key={index}>
        <Card
          name={item.name}
          brand={item.brand}
          number={item.last4}
          expiry={`${item.expMonth}/${item.expYear}`}
          cvc="•••"
        />
        {/* <CardView
          name={item.name}
          brand={item.brand}
          number={`•••• •••• •••• ${item.last4}`}
          expiry={`${item.expMonth}/${item.expYear}`}
          cvc="•••"
          placeholder={{
            name: 'Card Holder',
            number: '•••• •••• •••• ••••',
            expiry: '••/••',
            cvc: '•••',
          }}
          scale={1.39}
        /> */}
        {/* <CreditCardDisplay
          number={`•••• •••• ••••${item.last4}`}
          cvc="•••"
          expiration={`${item.expMonth}/${item.expYear}`}
          name={item.name}
          // width={width - 22}
          borderRadius={8}
          // height={220}
          fontSize={20}
        /> */}
      </DynamicPressable>
    );
  };

  return (
    <>
      {isLoading && <DishSpinner />}
      <FlatList
        style={styles.Flatlist}
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={mywallets}
        renderItem={renderItem}
        ListFooterComponent={() => (
          <DynamicPressable alignItems="center" onPress={onAddCardPress}>
            <DynamicView
              borderRadius={8}
              height={200}
              backgroundColor="#F8F8F8"
              marginBottom={20}
              justifyContent="center"
              alignItems="center"
              width="100%">
              <DynamicImage
                source={plus}
                width={24}
                height={24}
                marginBottom={3}
              />
              <DynamicText
                fontSize={14}
                lineHeight={20}
                color={Colors.black}
                fontFamily={fonts.DMSans700Bold}>
                Add Card
              </DynamicText>
            </DynamicView>
          </DynamicPressable>
        )}
      />
    </>
  );
};

export default MyWallet;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 20,
    paddingHorizontal: 11,
  },
  Flatlist: {
    backgroundColor: '#fff',
  },
});
