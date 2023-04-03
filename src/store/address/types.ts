import {IAddress} from '@/api/generic';

export type AddressStateType = {
  myAddress: IAddress[];
  loadingAddress: boolean;
  defaultAddress: IAddress | null;
};
