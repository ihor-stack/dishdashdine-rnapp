import AddressService from '@/api/address';
import {IAddress} from '@/api/generic';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {isArray} from 'lodash';

export const fetchAddress = createAsyncThunk<IAddress[]>(
  'address/getAllAddress',
  async () => {
    const response: any = await AddressService.getAllAddress();
    if (!isArray(response) && response?.$values) {
      return response.$values;
    } else {
      return response;
    }
  },
);
export const getDefaultAddress = createAsyncThunk<IAddress>(
  'address/getDefaultAddress',
  async () => {
    const response: any = await AddressService.getDefaultAddress();
    console.log('getDefaultAddress response:', response);
    if (!isArray(response) && response?.$values) {
      return response.$values;
    } else {
      return response;
    }
  },
);
