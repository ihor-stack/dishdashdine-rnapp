import { FlatList, RefreshControl, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { DynamicText, DynamicView } from '@/components';
import { Colors, fonts } from '@/themes';
import { IAddress } from '@/api/generic';
import { useDispatch } from 'react-redux';
import { fetchAddress, getDefaultAddress } from '@/store/address/thunk';
import NoAddressAdded from './NoAddressAdded';
import { filter, isEmpty } from 'lodash';
import DishAddressItem from '@/components/DishAddressItem';
import DishButton from '@/components/DishButton';
import { AddressType } from '@/constants';
import { useNavigation } from '@react-navigation/native';

export interface ManageAddressesViewProps {
  myAddresses: IAddress[];
  defaultAddress: IAddress | any;
  refreshing: boolean;
  onRefresh: any;
}

const ManageAddressesView = (props: ManageAddressesViewProps) => {
  const { navigate } = useNavigation<any>();
  const { myAddresses, refreshing, onRefresh, defaultAddress } = props;
  const [currentAddress, setCurrentAddress] = useState<IAddress>({});

  useEffect(() => {
    if (!isEmpty(myAddresses)) {
      const address = myAddresses.find(
        (addr: IAddress) =>
          addr.addressType === AddressType.ComputedCurrentAddress.code,
      );
      if (address) {
        setCurrentAddress(address);
      }
    }
  }, [myAddresses]);

  const renderAddressItem = ({ item, index }) => {
    return (
      <DishAddressItem
        formattedAddress={item.formattedAddress}
        addressType={item.addressType}
        otherAddressType={item.otherAddressType}
        key={index}
        onPress={() =>
          navigate('AddNewAddress', {
            isFrom: 'my_address',
            action: 'update',
            address: item,
          })
        }
      />
    );
  };

  return (
    <>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListHeaderComponent={() => (
          <>
            {!isEmpty(defaultAddress) && (
              <DishAddressItem
                formattedAddress={defaultAddress.formattedAddress}
                addressType={AddressType.ComputedCurrentAddress.code}
                showDivider
              />
            )}
            {!isEmpty(myAddresses) ? (
              <DynamicView marginTop={22}>
                <DynamicText
                  fontFamily={fonts.DMSans700Bold}
                  fontSize={15}
                  lineHeight={19.53}
                  color={Colors.grey}>
                  Saved addresses
                </DynamicText>
              </DynamicView>
            ) : null}
          </>
        )}
        style={styles.Flatlist}
        data={filter(
          myAddresses,
          a => a.addressType !== AddressType.ComputedCurrentAddress.code,
        )}
        renderItem={renderAddressItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={() => <NoAddressAdded />}
      />

      <DynamicView
        backgroundColor={Colors.white}
        paddingHorizontal={11}
        paddingBottom={22}>
        <DishButton
          variant="primary"
          label="Add new address"
          icon="arrowright"
          onPress={() =>
            navigate('AddNewAddress', {
              isFrom: 'my_address',
              action: 'add',
            })
          }
        />
      </DynamicView>
    </>
  );
};

export default ManageAddressesView;
const styles = StyleSheet.create({
  Flatlist: {
    paddingHorizontal: 22,
    backgroundColor: Colors.white,
    paddingBottom: 72,
  },
});
