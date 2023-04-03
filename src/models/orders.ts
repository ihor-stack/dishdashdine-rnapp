import {ImageSourcePropType} from 'react-native';

export type OrderItem = {
  thumbnail?: ImageSourcePropType;
  restaurant?: string;
  totalItems: number;
  date: string;
  favorite?: boolean;
};
