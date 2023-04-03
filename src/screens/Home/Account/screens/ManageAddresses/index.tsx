import {useDispatch, useSelector} from 'react-redux';
import React, {useEffect, useState} from 'react';
import {fetchAddress, getDefaultAddress} from '@/store/address/thunk';
import ManageAddressesView from './View';
import {addressSelectors} from '@/store/address';
import {IAddress} from '@/api/generic';

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
    await dispatch(fetchAddress());
    dispatch(getDefaultAddress());
    setRefreshing(false);
  }, []);

  return (
    <ManageAddressesView
      refreshing={refreshing}
      onRefresh={onRefresh}
      myAddresses={myAddresses}
      defaultAddress={defaultAddress}
    />
  );
};

export default Address;
