import AddressService from '@/api/address';
import {IAddressResolveParams, IAddressResolveResponse} from '@/api/generic';
import UserService, {IUser, IUserData} from '@/api/user';
import {createAsyncThunk} from '@reduxjs/toolkit';

export const fetchCurrentUser = createAsyncThunk<IUser>(
  'account/getUser',
  async () => {
    const response: IUser = await UserService.getUser();
    return response;
  },
);

export const updateUser = createAsyncThunk<IUser, IUserData>(
  'account/updateUser',
  async (data: IUserData) => {
    const response: IUser = await UserService.updateUser(data);
    return response;
  },
);

export const getUserCurrentAddress = createAsyncThunk<
  IAddressResolveResponse,
  IAddressResolveParams
>('account/getUserCurrentAddress', async (params: IAddressResolveParams) => {
  const response: IAddressResolveResponse =
    await AddressService.getAddressResolve(params);
  return response;
});
