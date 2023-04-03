import {AddressType} from '@/constants';

export const truncateText = (text: string, limit: number) => {
  return text?.length > limit ? text.substring(0, limit - 3) + '...' : text;
};

export const convertMilestoMeters = (miles: number): number => {
  return miles * 1609.344;
};

export const convertMetersToMiles = (meters: number): number => {
  return meters * 0.000621371192;
};

export const getAddressTypeLabel = (addressType: number): string => {
  switch (addressType) {
    case 1:
      return AddressType.ComputedCurrentAddress.name;
    case 2:
      return AddressType.Home.name;
    case 3:
      return AddressType.Work.name;
    case 4:
      return AddressType.Other.name;
    default:
      return AddressType.ComputedCurrentAddress.name;
  }
};

export const bytesToSize = (bytes: number) => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0';
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
  if (i === 0) return `${bytes} ${sizes[i]})`;
  return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`;
};
