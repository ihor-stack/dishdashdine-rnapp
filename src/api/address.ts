import API from './';
import {IAddressResolveParams} from './generic';

export interface IAddressData {
  streetNumber: string;
  street: string;
  city: string;
  country: string;
  postCode: string;
  addressType: number;
  id?: string;
  otherAddressType: string;
}

const AddressService = {
  getAddressResolve(params: IAddressResolveParams) {
    return API({
      url: '/api/Address/Resolve',
      method: 'GET',
      params,
    });
  },
  getAllAddress() {
    return API({
      url: '/api/Address',
      method: 'GET',
    });
  },
  createAddress(data: IAddressData) {
    return API({
      url: '/api/Address',
      method: 'POST',
      data,
    });
  },
  updateAddress(id: string, data: IAddressData) {
    return API({
      url: `/api/Address/${id}`,
      method: 'POST',
      data,
    });
  },
  deleteAddress(id: string) {
    return API({
      url: `/api/Address/${id}`,
      method: 'DELETE',
    });
  },
  getAddress(id: string) {
    return API({
      url: `/api/Address/${id}`,
      method: 'GET',
    });
  },
  setDefaultAddress(id: string) {
    return API({
      url: `/api/Address/${id}/Default`,
      method: 'POST',
    });
  },
  getDefaultAddress() {
    return API({
      url: `/api/Address/Default`,
      method: 'GET',
    });
  },
};

export default AddressService;
