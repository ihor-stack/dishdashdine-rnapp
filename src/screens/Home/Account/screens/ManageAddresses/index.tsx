import {useDispatch, useSelector} from 'react-redux';
import React, {useEffect, useState} from 'react';

import {IAddress} from '@/api/generic';
import {fetchAddress, deleteAddress, getDefaultAddress} from '@/store/address/thunk';
import {addressSelectors} from '@/store/address';

import ManageAddressesView from './View';

const Address = () => {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const myAddresses: IAddress[] = useSelector(
    addressSelectors.selectMyAddress,
  ) as any;
  const defaultAddress = useSelector(addressSelectors.selectDefaultAddress);

  useEffect(() => {
    dispatch(fetchAddress());
  }, []);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    dispatch(fetchAddress());
    dispatch(getDefaultAddress());
    setRefreshing(false);
  }, []);

  const onDelete = async (id: string) => {
    setRefreshing(true);
    // try {
    //   const response: any = await AddressService.deleteAddress(id);
    //   console.log('response:', response);
    // } catch (error) {
    //   console.log('error:', error);
    // }
    dispatch(fetchAddress());
    setRefreshing(false);
  };

  return (
    <ManageAddressesView
      refreshing={refreshing}
      onRefresh={onRefresh}
      onDelete={onDelete}
      myAddresses={myAddresses}
      defaultAddress={defaultAddress}
    />
  );
};

export default Address;
